import styled from "styled-components";

export const HeaderTop = styled.header`
background-color: #2A3D4E;
height: 65px;
display: flex;
align-items: center;
justify-content: center;
    .logo div{
        cursor:pointer;
        width: 40px;
        height: 40px;
        svg {
            background-color: #2A3D4E;
            border-radius: 5px;
            path {
                fill: white
            }    
        }
    }

@media screen and (max-width: 1030px) {
    justify-content: flex-start;
    padding-left: 30px;
}

`

export const HTSrchBarWrap = styled.div`
background-color: #fff;
width: 500px;
height: 40px;
display: flex;
align-items: center;
position: relative;
margin-left: 10px;
i {
    position: absolute;
    left: 10px;
}

@media screen and (max-width: 1030px) {
    display: none;
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
max-width: ${props => props.width}px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
padding: 0 30px;

@media screen and (max-width: 1030px) {
    #tagList {
        display:none;
    }
    #blogList {
        width: 100%!important;
    }
}
`
export const LinkWrap = styled.div`
    margin-left: 10px;
    color:white;
    button {
        :hover {
        background-color: #456582;
        box-shadow: 1px 1px 2px 0px #0c1217;
    }
    @media screen and (max-width: 1030px) {
        display: none;
    }
`