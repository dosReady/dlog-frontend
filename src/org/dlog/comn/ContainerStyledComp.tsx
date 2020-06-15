import styled from "styled-components";

export const HeaderTop = styled.header`
background-color: #2A3D4E;
height: 65px;
display: flex;
align-items: center;
justify-content: center;
    .logo div{
        cursor:pointer;
        width: 70px;
        height: 40px;
        svg {
            width: 100%;
            height: 100%;
            background-color: #2A3D4E;
            border-radius: 5px;
            path {
                fill: white
            }    
        }
    }


`

export const HTSrchBarWrap = styled.div`
background-color: #fff;
width: 500px;
height: 40px;
display: flex;
align-items: center;
position: relative;
i {
    position: absolute;
    left: 10px;
}
`

export const HTSrchInput = styled.input`
border: none;
width: inherit;
height: inherit;
box-sizing: border-box;
padding: 0 0.3rem 0 2rem;
`


export const ContentsWrap = styled.section<{width: string}>`
box-sizing: border-box;
max-width: ${props => props.width}px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
padding: 0 30px;
`