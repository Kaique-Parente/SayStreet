import { cadastrarProduto } from "@/services/ProdutoService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useCadastroProduto() {
  const [hostedUrl, setHostedUrl] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [estoque, setEstoque] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [avaliacao, setAvaliacao] = useState(0.5);
  const [erro, setErro] = useState("");

  const handleNomeChange = (event) => setNome(event.target.value);
  const handlePrecoChange = (event) => setPreco(parseFloat(event.target.value) || 0);
  const handleEstoqueChange = (event) => setEstoque(parseInt(event.target.value) || 0);
  const handleDescricaoChange = (event) => setDescricao(event.target.value);
  const handleAvaliacaoChange = (event) => setAvaliacao(parseFloat(event.target.value) || 0);

  const handleSuccessFile = (results) => {
    setHostedUrl((prevHostedUrl) => [
      ...prevHostedUrl,
      { url: results?.info?.url, principal: prevHostedUrl.length === 0 },
    ]);
  };

  return {
    hostedUrl,
    nome,
    preco,
    estoque,
    descricao,
    avaliacao,
    setHostedUrl,
    setNome,
    setPreco,
    setEstoque,
    setDescricao,
    setAvaliacao,
    handleNomeChange,
    handlePrecoChange,
    handleEstoqueChange,
    handleDescricaoChange,
    handleAvaliacaoChange,
    handleSuccessFile
  }
}

