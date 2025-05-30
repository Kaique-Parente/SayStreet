'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Tabela from "@/components/MUI/Tabela";
import useUsers from "@/hooks/useUsers";
import Link from "next/link";
import Image from "next/image";
import useProdutos from "@/hooks/useProdutos";
import { Rating } from "@mui/material";
import ModalView from "@/components/ModalView";
import { CarouselWithIndicatorsBack } from "@/components/CoreUI/CarouselWithIndicatorsBack";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border: 1px solid white;

    gap: 30px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    height: 20px;
    margin: 20px 0px 35px 0px;

    font-size: 18px;
`
const CreateContainer = styled.div`
   a{
        background-color: #3B8C6E;

        display: flex;
        align-items: center;
        padding: 8px;
        
        border-radius: 4px;

   }

   a:hover {
        background-color: #2F7359; 
    }

    span{
        text-decoration: underline;
        color: white;
    }
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    position: relative;

    input{
        border: 0.5px solid black;
        border-radius: 4px;

        width: 300px;
        padding: 8px 8px 8px 35px;
    }
`

const SearchIcon = styled(Image)`
  position: absolute;
  left: 10px;
`;

const TextModal = styled.div`
    margin: 50px;

    h3 {
        text-align: center;
        font-size: 25px;
        color: black;
    }

    .botoes {
        display: flex;
        justify-content: center;
        margin-top: 60px;

        gap: 40px;
    }

    .botoes button {
        width: 150px;
        height: 50px;

        border: none;
        border-radius: 8px;
        background-color: green;

        cursor: pointer;
    }

    .botoes button:nth-child(1) {
        background-color: red;
    }
`

const ViewContainerCarousel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 300px;
`

const ViewContainerContent = styled.div`
    button {
        background-color: gray;
        color: white;

        border: none;
        border-radius: 12px;

        padding: 8px;
    }
`

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;

    position: absolute;
    top: 30px;
    left: 20px;

    background-color:rgb(128, 227, 85);

    border: none;
    border-radius: 8px;
    
    cursor: pointer;

    &:hover{
        background-color:rgb(84, 149, 56);
    }

    span{
        font-weight: bold;
        font-size: 14px;
    }
`


export default function Produtos() {

    const {
        produtos,
        hiddenModel,
        lastStatus,
        lastProdutoChange,
        idUpdateProduto,
        nomeFiltro,
        hiddenView,
        viewImages,
        produtoView,
        setProdutos,
        setHiddenModel,
        setLastStatus,
        setLastProdutoChange,
        setIdUpdateProduto,
        setNomeFiltro,
        setHiddenView,
        setViewImages,
        setProdutoView,
        atualizarTabela,
        handleConfirmModel,
        handleCloseModel,
        handleNomeFiltro,
        handleAlternarStatus,
        handleViewProduto
    } = useProdutos();

    const tableHeaderSetores = [
        {
            id: 'id',
            numeric: true,
            disablePadding: false,
            label: 'Id',
        },
        {
            id: 'nome',
            numeric: false,
            disablePadding: false,
            label: 'Nome',
        },
        {
            id: 'qtd',
            numeric: true,
            disablePadding: false,
            label: 'Quantidade',
        },
        {
            id: 'preco',
            numeric: true,
            disablePadding: false,
            label: 'Preço',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'opcoes',
            numeric: false,
            disablePadding: false,
            label: 'Opções',
        },
    ];

    const [setor, setSetor] = useState('');
    const [viewButtonVisible, setViewButtonVisible] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleAlterarProduto = async (id) => {
        const produtoEncontrado = produtos.find((produto) => produto.id === id);
        console.log(produtos);

        if (produtoEncontrado) {
            router.push(`./alterar-produto?id=${produtoEncontrado.id}&setor=${setor}`);
        }
    };

    useEffect(() => {
        atualizarTabela();
        const setor = searchParams.get('setor');
        setSetor(setor);
    }, [])


    useEffect(() => {
        if (setor == 'admin') {
            setViewButtonVisible(true);
        }
    }, [setor])

    useEffect(() => {
        if (produtoView !== null) {
            const images = produtoView.imagens?.map(item => item.url) || [];
            console.log('Produto View: ' + produtoView);
            setViewImages(images);
        }
    }, [produtoView])

    return (
        <Container>
            <BackButton onClick={() => router.push(`./home?setor=${setor}`)}>
                <Image width={24} height={24} src={'/backoffice/voltar.svg'} alt="Seta para a esquerda" />
                <span>Voltar</span>
            </BackButton>
            <ContentContainer>
                <div>
                    <h1>Lista de Produtos</h1>
                </div>

                <InputContainer>
                    <CreateContainer>
                        <Link
                            href={`./cadastrar-produto?setor=${setor}`}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",

                                cursor: "pointer"
                            }}
                        >
                            <Image width={14} height={14} alt='Um icone de mais' src="/backoffice/mais.png" />
                            <span>Novo Produto</span>
                        </Link>
                    </CreateContainer>

                    <SearchContainer>
                        <SearchIcon width={18} height={18} alt='Um icone de lupa' src="/backoffice/pesquisar.png" />
                        <input type="text" id="nome" placeholder="Pesquisar por Nome:"
                            value={nomeFiltro} onChange={handleNomeFiltro}
                        />
                    </SearchContainer>
                </InputContainer>

                <div>
                    <Modal isOpen={!hiddenModel} onClose={() => setHiddenModel(true)}>
                        <TextModal>
                            <h3>Você tem certeza que deseja
                                <span style={{ fontWeight: "bold", color: lastStatus === "Ativar" ? "green" : "red" }}> {lastStatus}
                                </span>
                                <span> este produto?</span></h3>

                            <div className="botoes">
                                <button onClick={handleCloseModel}>Cancelar</button>
                                <button onClick={handleConfirmModel}>Confirmar</button>
                            </div>
                        </TextModal>
                    </Modal>
                    <ModalView isOpen={!hiddenView} onClose={() => setHiddenView(true)}>
                        <ViewContainerCarousel>
                            <h1>{produtoView ? produtoView.produtoNome : ""}</h1>
                            <CarouselWithIndicatorsBack images={viewImages} />
                        </ViewContainerCarousel>
                        <ViewContainerContent>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span>Avaliação: </span>
                                <Rating
                                    name="simple-uncontrolled"
                                    className="input-styles"
                                    disabled={true}
                                    value={produtoView ? produtoView.produtoAvaliacao : 0.5}
                                    precision={0.5}
                                    defaultValue={0.5}
                                    size="large"
                                />
                            </div>

                            <p>Preço: R$ {produtoView ? produtoView.produtoPreco : 0.0}</p>
                            <p>Quantidade disponível: {produtoView ? produtoView.produtoQtd : 0}</p>
                            <button disabled>Comprar</button>
                        </ViewContainerContent>

                    </ModalView>
                    <Tabela
                        title="Produtos"
                        tableHeader={tableHeaderSetores}
                        rows={produtos}
                        nomeFiltro={nomeFiltro}
                        campoFiltro={"nome"}
                        fontHeader={12}
                        visibilityDense={false}
                        disableHead={true}
                        disableDelete={true}
                        height={580}
                        rowsPerPage={15}
                        viewButton={viewButtonVisible}
                        handleAlterarRow={handleAlterarProduto}
                        handleViewRow={handleViewProduto}
                        handleAlternarStatus={handleAlternarStatus}
                    />
                </div>
            </ContentContainer>
        </Container>
    );
}