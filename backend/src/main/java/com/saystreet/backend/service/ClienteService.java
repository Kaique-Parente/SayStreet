package com.saystreet.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.dto.EnderecosDto;
import com.saystreet.backend.exceptions.InvalidNameException;
import com.saystreet.backend.exceptions.InvalidPasswordException;
import com.saystreet.backend.exceptions.UnauthorizedAccessException;
import com.saystreet.backend.exceptions.UserInactiveException;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.EnderecoModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.security.CpfValidator;
import com.saystreet.backend.security.NameValidator;
import com.saystreet.backend.security.PasswordEncryptionUtil;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    public ClienteModel login(ClienteModel user) throws Exception {
        Optional<ClienteModel> clienteOpt = clienteRepository.findByEmail(user.getEmail());
        System.out.println("EMAILLLL:" + user.getEmail());

        if (clienteOpt.isEmpty()) {
            throw new UnauthorizedAccessException("Acesso negado! E-mail não encontrado.");
        }

        ClienteModel existingClient = clienteOpt.get();

        // Criptografa a senha fornecida e compara com a armazenada no banco
        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getSenha());

        if (!existingClient.getSenha().equals(encryptedPassword)) {
            throw new InvalidPasswordException("Senha incorreta!");
        }

        // Verifica se o usuário está ativo
        if (!existingClient.isStatus()) {
            throw new UserInactiveException("Usuário inativado.");
        }

        return existingClient;
    }

    public ResponseEntity<String> create(ClienteDto clienteDto) throws Exception {

        Optional<ClienteModel> clienteOpt = clienteRepository.findByEmail(clienteDto.getEmail());
        if (clienteOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail já cadastrado no sistema.");
        }

        clienteOpt = clienteRepository.findByCpf(clienteDto.getCpf());
        if (clienteOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Esse CPF já está cadastrado no sistema!");
        }

        if (!CpfValidator.isValidCPF(clienteDto.getCpf())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Este CPF não é válido. Por favor, digite um CPF válido.");
        }

        if (!NameValidator.validaNome(clienteDto.getNome())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Este nome não é válido. Por favor, digite um nome válido.");
        }

        String encryptedPassword = PasswordEncryptionUtil.encrypt(clienteDto.getSenha());

        ClienteModel cliente = ClienteModel.builder()
                .nome(clienteDto.getNome())
                .cpf(clienteDto.getCpf())
                .genero(clienteDto.getGenero())
                .dataNascimento(clienteDto.getDataNascimento())
                .email(clienteDto.getEmail())
                .senha(encryptedPassword)
                .status(true)
                .build();

        EnderecoModel enderecoFatura = converterDtoParaModel(clienteDto.getEnderecoFatura());
        cliente.setEnderecoFatura(enderecoFatura);

        List<EnderecoModel> enderecos = new ArrayList<>();
        boolean temPradrao = false;

        if (clienteDto.getEnderecos() != null && !clienteDto.getEnderecos().isEmpty()) {
            for (EnderecosDto enderecoDTO : clienteDto.getEnderecos()) {
                boolean isPrincipal = enderecoDTO.isEnderecoPadrao();

                if (isPrincipal) {
                    if (temPradrao) {
                        throw new IllegalArgumentException("Só pode haver um endereço padrão.");
                    }
                    temPradrao = true;
                }

                enderecos.add(EnderecoModel.builder()
                        .cep(enderecoDTO.getCep())
                        .logradouro(enderecoDTO.getLogradouro())
                        .complemento(enderecoDTO.getComplemento())
                        .bairro(enderecoDTO.getBairro())
                        .localidade(enderecoDTO.getLocalidade())
                        .uf(enderecoDTO.getUf())
                        .estado(enderecoDTO.getEstado())
                        .numero(enderecoDTO.getNumero())
                        .enderecoPadrao(isPrincipal)
                        .build());
            }
        }

        if (!temPradrao && !enderecos.isEmpty()) {
            cliente.getEnderecoFatura().setEnderecoPadrao(true);
        }

        cliente.setEnderecos(enderecos);
        clienteRepository.save(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente cadastrado com sucesso!");
    }

    // Método para buscar um cliente pelo id
    public ClienteModel buscarCliente(Long id) throws Exception {
        Optional<ClienteModel> clienteExistente = clienteRepository.findById(id);

        if (clienteExistente.isPresent()) {
            ClienteModel newCliente = clienteExistente.get();
            return newCliente;
        }
        throw new Exception("Cliente não encontrado");
    }

    // Método para editar um cliente
    public String editCliente(Long id, ClienteDto dto) throws Exception {

        ClienteModel cliente = buscarCliente(id);

        if (dto.getNome() != null) {
            if (!NameValidator.validaNome(dto.getNome())) {
                throw new InvalidNameException("Este nome não é válido. Por favor, digite um nome válido.");
            }
            cliente.setNome(dto.getNome());
        }

        if (dto.getDataNascimento() != null) {
            cliente.setDataNascimento(dto.getDataNascimento());
        }

        if (dto.getGenero() != null) {
            cliente.setGenero(dto.getGenero());
        }

        if (dto.getSenha() != null && !dto.getSenha().equals("")) {
            String encryptedPassword = PasswordEncryptionUtil.encrypt(dto.getSenha());
            cliente.setSenha(encryptedPassword);
        }

        if (dto.getEnderecoFatura() != null) {
            EnderecoModel enderecoFatura = converterDtoParaModel(dto.getEnderecoFatura());
            cliente.setEnderecoFatura(enderecoFatura);
        }

        cliente.setStatus(!dto.isStatus());

        cliente.getEnderecos().clear();

        if (dto.getEnderecos() != null && !dto.getEnderecos().isEmpty()) {
            for (EnderecosDto enderecoDTO : dto.getEnderecos()) {
                boolean isPrincipal = enderecoDTO.isEnderecoPadrao();

                EnderecoModel endereco = EnderecoModel.builder()
                        .cep(enderecoDTO.getCep())
                        .logradouro(enderecoDTO.getLogradouro())
                        .complemento(enderecoDTO.getComplemento())
                        .bairro(enderecoDTO.getBairro())
                        .localidade(enderecoDTO.getLocalidade())
                        .uf(enderecoDTO.getUf())
                        .estado(enderecoDTO.getEstado())
                        .numero(enderecoDTO.getNumero())
                        .enderecoPadrao(isPrincipal)
                        .cliente(cliente)
                        .build();

                cliente.getEnderecos().add(endereco);
            }
        }

        clienteRepository.save(cliente);

        return "Cliente atualizado com sucesso!";
    }

    // Método para listar
    public List<ClienteModel> listAll() {
        return this.clienteRepository.findAll();
    }

    // Método para converter o EnderecoDto para EnderecoModel para que assim eu
    // passe na criação do Objeto
    public EnderecoModel converterDtoParaModel(EnderecosDto dto) {
        if (dto == null) {
            return null;
        }

        return EnderecoModel.builder()
                .cep(dto.getCep())
                .logradouro(dto.getLogradouro())
                .complemento(dto.getComplemento())
                .bairro(dto.getBairro())
                .localidade(dto.getLocalidade())
                .uf(dto.getUf())
                .estado(dto.getEstado())
                .numero(dto.getNumero())
                .enderecoPadrao(dto.isEnderecoPadrao())
                .build();
    }
}