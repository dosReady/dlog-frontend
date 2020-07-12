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
    padding: 0 30px;
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


export const ContentsWrap = styled.section<{width: string, marginTop: string}>`
max-width: ${props => props.width}px;
margin-left: auto;
margin-right: auto;
margin-top: ${props => props.marginTop.length === 0 ? '30' : props.marginTop}px;
padding: 0 30px;

@media screen and (max-width: 1030px) {
    padding: 0 10px;
    #tagList {
        display:none;
    }
    #blogList {
        width: 100%!important;
    }
}
`


export const ContainerMenuWrap = styled.div`
    color: white;
    margin-left: 30px;
    font-size: 35px;
    position:relative;
    i {
        cursor: pointer;
    }
    @media screen and (max-width: 1030px) {
        margin-left: auto;
    }
`

export const ContainerMenu = styled.div`
    position:absolute;
    width: 150px;
    padding: 15px;
    color: black;
    font-size: 16px;
    margin-top: 5px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
    background-color: white;
    z-index: 5;
    ul {
        li {
            cursor: pointer;
            margin-bottom: 20px;
        }
        li:last-child {
            margin-bottom: 0;
        }
    }
    @media screen and (max-width: 1030px) {
        right: 0;
    }
`