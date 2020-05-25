import styled from "styled-components";

export const HeaderTop = styled.div`
background-color: #2F4F4F;
height: 65px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 400px;
`

export const HeaderTopLogo = styled.div`
font-size: 30px;
font-weight: bold;
background-color: #fff;
width: 40px;
height: 36px;
text-align: center;
`

export const HTSrchBarWrap = styled.div`
background-color: #fff;
width: 300px;
height: 30px;
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


export const ContentsWrap = styled.div`
box-sizing: border-box;
max-width: 1000px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
`