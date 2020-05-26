import styled from "styled-components"

export const CtgContainer = styled.div<{isFiexd:boolean}>`
${props => {
    if(!props.isFiexd) 
    return `
        margin-top:1.5rem;
        width: 14rem;
    `
    else return `
        position: fixed;
        top: 2rem;
        width: 14rem;
    `
}}
`

export const CtgTitle = styled.div`
font-size: 1.5rem;
font-weight: bold;
padding-bottom: 4px;
border-bottom: 6px solid rgb(0,61,84);
margin-bottom: 15px;
`
export const CtgList = styled.div`
margin-top: 1rem;
max-width: 300px;
`
export const CtgWrap = styled.div`
padding: 0.3rem 0.5rem;
background-color: rgb(0, 61, 84);
color: white;
border-radius: 4px;
cursor:pointer;
margin-bottom:0.5rem;
`

export const CtgWrapNoSelected = styled.div`
padding: 0.3rem 0.5rem;
color: black;
border-radius: 4px;
cursor:pointer;
margin-bottom:0.5rem;
&:hover {
    background-color: rgb(0, 61, 84);
    color:white;
}
`