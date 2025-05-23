'use client'

import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import EscolherTamanho from "@/components/ClientComponents/EscolherTamanho";
import Footer from "@/components/ClientComponents/Footer";
import NavBar from "@/components/ClientComponents/NavBar";
import { CarouselWithIndicators } from "@/components/CoreUI/CarouselWithIndicators";
import { useCarrinho } from "@/context/CarrinhoContext";
import { encontrarProdutoId } from "@/services/ProdutoService";
import normalizeSlug from "@/utils/normalizeSlug";
import { assignRef } from "@coreui/react/dist/esm/hooks/useForkedRef";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    padding-top: 80px;
`

const ProductContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;

    padding: 100px 0px;
    gap: 50px;

    flex-grow: 1;
`

const DescribeContainer = styled.div`
    width: 350px;

    h1{
        font-size: 30px;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    padding-top: 20px;

    button:nth-child(2){
        width: 110px;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
`

const DetailsContainer = styled.div`
    max-width: 1200px;

    margin: 0px auto;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    padding: 0px 115px;

    p{
        word-wrap: break-word; /* Quebra palavras longas */
        white-space: pre-wrap; /* Mantém quebras de linha do texto */
        overflow-wrap: break-word; /* Garante a quebra em navegadores modernos */
    }
`

export default function ProdutoDetalhes({ params }) {

    const { adicionarItem } = useCarrinho();

    const [id, setId] = useState(null);
    const [produto, setProduto] = useState(null);
    const [tamanho, setTamanho] = useState(0);
    const [images, setImages] = useState([]);
    const [erro, setErro] = useState([]);

    const handleAlterarTamanho = (value) => {
        setTamanho(value);
    }

    const handleProcurarProduto = async (e) => {
        console.log(id);
        try {
            const response = await encontrarProdutoId(id);
            if (response != null) {
                setProduto(response);
            } else {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }

    const router = useRouter();
    const resolvedParams = use(params);
    const slug = resolvedParams?.slug;

    useEffect(() => {
        if (slug) {
            const produtoId = slug.split('-').pop();
            setId(produtoId);
        }
    }, [slug]);

    useEffect(() => {
        if (id) {
            handleProcurarProduto();
        }
    }, [id])

    useEffect(() => {
        console.log(produto);

        if (produto) {
            const imageArray = produto.imagens.map((img) => img.url);
            setImages(imageArray);
        }
    }, [produto])

    useEffect(() => {
        console.log('TAMANHO: ' + tamanho);
    }, [tamanho])


    const handleAdicionarCarrinho = () => {

        if (tamanho === 0) {
            alert("Selecione um tamanho!")
        } else {
            adicionarItem({
                produtoId: produto.produtoId,
                produtoNome: produto.produtoNome,
                produtoPreco: produto.produtoPreco,
                produtoTamanho: tamanho,
                imagem: (produto.imagens.filter(img => img.principal))[0],
                quantidade: 1
            })
        }
    }

    const handleComprarProduto = () => {
        if (tamanho === 0) {
            alert("Selecione um tamanho!")
        } else {
            adicionarItem({
                produtoId: produto.produtoId,
                produtoNome: produto.produtoNome,
                produtoPreco: produto.produtoPreco,
                produtoTamanho: tamanho,
                imagem: (produto.imagens.filter(img => img.principal))[0],
                quantidade: 1
            })
            router.push("./carrinho");
        }  
    }

    return (
        <>
            <NavBar />
            <Container>

                <ProductContainer>
                    <div style={{ maxWidth: 570 }}>
                        <CarouselWithIndicators images={images} />
                    </div>
                    <DescribeContainer>
                        <h1>{produto?.produtoNome || "Carregando..."}</h1>
                        <span>R$ {produto?.produtoPreco || "Carregando..."}</span>
                        <div>
                            <label className="label" htmlFor="avaliacao">Avaliação:</label>
                            <Rating
                                name="simple-uncontrolled"
                                className="input-styles"
                                value={produto?.produtoAvaliacao || 5}
                                precision={0.5}
                                defaultValue={0.5}
                                disabled
                                size="large"
                            />
                        </div>

                        <div>
                            <h4>Escolher Tamanho:</h4>
                            <EscolherTamanho
                                tamanhoSelecionado={tamanho}
                                handleAlterarTamanho={handleAlterarTamanho}
                            />
                        </div>

                        <ButtonContainer>
                            <BotaoPersonalizado
                                width={"250px"}
                                height={"45px"}
                                color="amarelo"
                                onClick={handleComprarProduto}
                            >
                                Comprar Agora
                            </BotaoPersonalizado>
                            <button onClick={handleAdicionarCarrinho}>
                                <Image width={18} height={18} src={'./web/sacola.svg'} alt="Icone de uma sacola" />
                                <span>+</span>
                            </button>
                        </ButtonContainer>
                    </DescribeContainer>

                </ProductContainer>

                <DetailsContainer>
                    <h3>Detalhes do Produto</h3>
                    <p>{produto?.produtoDesc || "Carregando..."}</p>
                </DetailsContainer>

                <button onClick={() => router.back("")}>VOLTAR</button>

                <Footer />
            </Container>
        </>
    );
}