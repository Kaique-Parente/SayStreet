import styled from "styled-components";

const Botao = styled.button`
    width: ${(props) => props.width || '150px'}; 
    height: ${(props) => props.height || '45px'};
    background-color:${(props) => (props.color === "amarelo" ? "rgba(255, 227, 23, 95)" : props.color === "marrom" ? "#005C53" : "#FF2600")};
    color: ${(props) => (props.color === "amarelo" ? "#005C53" : props.color === "marrom" ? "#faebd7" : "#584439")};

    border-radius: 8px;
    padding: 8px 12px;
    border: none;
    
    font-size: 18px;
    font-weight: bold;
    
    cursor: pointer;

    &:hover{
        background-color:${(props) => (props.color === "amarelo" ? "#B3A010" : props.color === "marrom" ? "#023933" : "#911600")};
    }
`

export default function BotaoPersonalizado(props){
    return(
        <Botao style={props.style} width={props.width} height={props.height} type={props.type} onClick={props.onClick} color={props.color}>{props.children}</Botao>
    );
}