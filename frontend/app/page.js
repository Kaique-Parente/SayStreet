'use client'

import { Button } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

const NavBar = styled.div`
    background-color: rgba(255, 227, 23, 95);
    width: 100%;
    height: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;

    position: fixed;
    z-index: 1;

    padding: 5px 130px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    img, a{
        cursor: pointer;
    }
`
const LinksNavBar = styled.div`
    display: flex;
    text-align: center;
    gap: 20px;

    font-size: 14px;
    font-weight: 500;
    color: #005C53;

    a {
        border-bottom: 2px solid transparent;
        transition: border-color 0.3s ease;
    }

    a:hover{
        border-bottom: 2px solid #005C53;
    }
`

const ActionsNavBar = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const SearchBar = styled.div`
    display: flex;
    padding: 5px 8px;
    gap: 8px;

    border: 1px solid #005C53;
    border-radius: 4px;

    img {
        margin-top: 2px;
    }

    input {
        background: none;
        border: none;
        outline: none;

        color: #005C53;
    }      

    input:focus {
        border: none;
    }
`

const Destaque = styled.div`
    display: flex;
    justify-content: center;

    position: relative;
    z-index: 1;

    width: 100%;
    height: 360px;
    background-color: rgba(4, 41, 64, 95);

    padding: 0px 130px;

    h1 {
        font-size: 24px;
        color: #CFCFCF;

        padding: 30px 0px;
    }
`

const CardDestaque = styled.div`
    margin-top: 100px;
    padding: 20px 10px;
    border: 1px solid black;
    border-radius: 4px;

    cursor: pointer;
    transition: border 0.3s ease-in-out;
    transition: transform 3.2 ease-in-out;
    
    &:hover {
        border-color: rgba(255, 227, 23, 0.95);
        transform: scale(1.02) translateY(-15px);

        img {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
        }
    }

    transition: transform 0.3s ease-in-out, border 0.3s ease-in-out;
    
`

const TextCardDestaque = styled.div`
    position: absolute;
    text-align: center;
    bottom: 40px;
    right: 0;
    left: 0;
`

const SpanCardDestaque = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 10px;

    span:nth-child(1){
        font-weight: bold;
    }
`

const Novidade = styled.div`

    display: flex;
    justify-content: center;

    margin: 70px 0px;
    padding: 5px 130px;

    h2{
        margin-bottom: 30px;
    }
`

const ConhecaTambem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 0px 130px;

    h2{
        margin-bottom: 30px;
    }
`

const CardConheca = styled.div`
    position: relative;

    width: 292px;
    height: 450px;
    margin-bottom: 70px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;

    /* Filtro escuro sobre a imagem */
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        background: rgba(0, 0, 0, 0.5); /* Fundo escuro */
        z-index: 1; /* Garante que fique sobre a imagem */
        transition: background 0.3s ease-in-out;
    }

    &:hover::before {
        background: rgba(0, 0, 0, 0.3); /* Clareia no hover */
    }

    /* Garante que a imagem fique no fundo */
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0; /* Imagem no fundo */
    }

    /* Texto e botão sobre a imagem */
    .content {
        position: relative;
        z-index: 2; /* Acima do filtro */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    button {
        background-color: #ffcc00;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background-color: #e6b800;
        }
    }
`


export default function LadingPage() {
    return (
        <>
            <NavBar>
                <Image style={{ marginLeft: "25px" }} width={80} height={80} src={'/web/logo.svg'} alt="Logo Say Street" />
                <LinksNavBar>
                    <a>NOVIDADES</a>
                    <a>TÊNIS</a>
                    <a>ROUPAS</a>
                    <a>ACESSÓRIOS</a>
                </LinksNavBar>
                <ActionsNavBar>
                    <SearchBar>
                        <label htmlFor="pesquisa">
                            <Image width={14} height={14} src={'/web/procurar.svg'} alt="Ícone Lupa" />
                        </label>
                        <input id="pesquisa" type="text" placeholder="Pesquisar" />
                    </SearchBar>
                    <Image width={18} height={18} src={'/web/pessoa.svg'} alt="Ícone pessoa" />
                    <Image width={18} height={18} src={'/web/sacola.svg'} alt="Ícone sacola" />
                </ActionsNavBar>
            </NavBar>
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                    }}
                >
                    <source src="/web/videos/video-fundo.mp4" type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            </div>

            <div style={{ height: 536 }}>

                <Destaque>
                    <h1>DESTAQUES</h1>
                    <div style={{ position: "absolute", display: "flex" }}>
                        <CardDestaque style={{ position: "relative" }}>
                            <Image
                                width={372}
                                height={390}
                                src={'/web/destaque1.png'}
                                alt="Ícone Lupa"
                                style={{ objectFit: "contain" }}
                            />
                            <TextCardDestaque>
                                <h3>Tênis Puma MB.04 Masculino</h3>
                                <SpanCardDestaque>
                                    <span>R$ 1.799,99</span>
                                    <span>10x R$ 179,99</span>
                                </SpanCardDestaque>
                            </TextCardDestaque>
                        </CardDestaque>

                        <CardDestaque style={{ position: "relative", marginLeft: "15px" }}>
                            <Image
                                style={{ objectFit: "contain" }}
                                width={372}
                                height={390}
                                src={'/web/destaque2.png'}
                                alt="Ícone Lupa"
                            />
                            <TextCardDestaque>
                                <h3>Tênis Air Jordan 5 Retro Og Masculino</h3>
                                <SpanCardDestaque>
                                    <span>R$ 1.799,99</span>
                                    <span>10x R$ 179,99</span>
                                </SpanCardDestaque>
                            </TextCardDestaque>
                        </CardDestaque>
                    </div>

                </Destaque>
            </div>

            {/* Conteúdo de Novidades */}
            <Novidade>
                <h2>NOVIDADES</h2>
                <div>
                    <Image
                        style={{ objectFit: "contain" }}
                        width={372}
                        height={390}
                        src={'/web/destaque2.png'}
                        alt="Ícone Lupa"
                    />
                    <Image
                        style={{ objectFit: "contain" }}
                        width={372}
                        height={390}
                        src={'/web/destaque2.png'}
                        alt="Ícone Lupa"
                    />
                </div>
            </Novidade>

            {/* 
            <div style={{display: "flex", justifyContent: "center"}}>
            <ConhecaTambem>
                <h2>CONHEÇA TAMBÉM</h2>

                <div style={{ display: "flex", gap: 20 }}>
                    <CardConheca>
                        <Image
                            width={240}
                            height={380}
                            src={'/web/conhecaTambem.avif'}
                            alt="Ícone Lupa"
                        />
                        <div className="content">
                            <p>Conheça também</p>
                            <button>Saiba mais</button>
                        </div>
                    </CardConheca>
                    <CardConheca>

                    </CardConheca>
                </div>
                

            </ConhecaTambem>
            </div>
            */}
        </>
    );
}