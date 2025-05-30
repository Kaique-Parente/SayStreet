"use client"

import styled from "styled-components";

const InputStyle = styled.input`
   
    margin-bottom: 15px;
    padding: 15px 18px;

    border: 1px solid #584439;
    border-radius: 6px;

    font-size: 14px;

    background: ${(props) => props.disabled ? "#716b6b9c" : "none"};
    
    &:focus{
        border: 2px solid rgb(43, 34, 29);
    }
`

export default function InputPersonalizado(props){
    return(
        <InputStyle 
            required={props.isRequired || false}
            disabled={props.disabled}
            id={props.id} 
            value={props.value || ""}
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            min={props.min}
            max={props.max}
        />
    );
}