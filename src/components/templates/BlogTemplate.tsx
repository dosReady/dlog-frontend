import React from 'react';
import styled from 'styled-components';
interface Props {
}

const Layout = styled.main`
    width: 768px;
    margin-right:auto;
    margin-left:auto;
`
const SecProfile = styled.section`
    background-color: #024770;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,.15);
    padding: 6rem 3rem 0 3rem;
    color:white;
`
const DivInfoWrap = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const DivInfoThumb = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    overflow:hidden;
    img {
        width: 100%;
        height: 100%;
    }
`

const MenuWrap = styled.div`
    display:flex;
    div {
        flex:1;
        text-align: center;
        cursor:pointer;
        padding-bottom:1rem;
        font-weight: 900;
    }
`


class BlogTemplate extends React.Component<Props> {

   render = ():JSX.Element => {
       return (
            <Layout>
                <SecProfile>
                    <DivInfoWrap>
                        <DivInfoThumb><img src="/profile.jpg" alt="도오성"/></DivInfoThumb>
                        <h3>개발자 마운틴</h3>
                        <h4>#대구 #웹개발자 #Java #SQL #Javascript #php #python #go language #ReactJs #VueJs</h4>
                    </DivInfoWrap>
                    <MenuWrap>
                        <div>글</div>
                        <div>카테고리</div>
                        <div>경력</div>
                    </MenuWrap>
                </SecProfile>
                {this.props.children}
            </Layout>
       )
   }
}

export default BlogTemplate;