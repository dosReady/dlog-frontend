import React from 'react';
import ContentLoader from 'react-content-loader';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled, { createGlobalStyle } from 'styled-components';



const BackgroundStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;
const HeaderTop = styled.header`
    background-color: #2A3D4E;
`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 900px;
    padding: 0 20px;
    margin: 0 auto;
    height: 250px;
    ul {
        color: white;
        li {
            :hover {
                background-color: #456582;
                box-shadow: 1px 1px 2px 0px #0c1217;
            }
            border-radius: 4px;
            cursor:pointer;
            margin-bottom: 4px;
            padding:2px;
        }
    }
`;

const MainTitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .logo {
        margin-right: 10px;
        div{
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
    }
    strong {
        color: white;
        font-size: 33px;
        margin-right: 10px;
    }

    button:hover {
        background-color: #456582;
        box-shadow: 1px 1px 2px 0px #0c1217;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    height: 700px;
    margin: 0 auto;
    font-size: 16px;
    padding: 30px 20px;
`


class BlogDetailFakeView extends React.Component<{},{}> {
    
    render():JSX.Element {
        return (
            <div>
                <BackgroundStyle/>
                <HeaderTop>
                    <HeaderDiv>
                        <MainTitleWrap>
                            <ReactSVG src={Logo} className="logo"/>
                            <ContentLoader width="300px" height="50px" backgroundColor="#D7D9D9">
                                    <rect x="0" y="10" rx="0" ry="10" width="900" height="30" /> 
                            </ContentLoader>
                        </MainTitleWrap>
                    </HeaderDiv>
                </HeaderTop>
                <ContentContainer>
                    <ContentLoader width="100%" height="100%" backgroundColor="#C7CDCD">
                        <rect x="0" y="10" rx="0" ry="10" width="900" height="300" /> 
                        <rect x="0" y="330" rx="0" ry="10" width="300" height="30" /> 
                        <rect x="0" y="370" rx="0" ry="10" width="900" height="30" /> 
                        <rect x="0" y="410" rx="0" ry="10" width="900" height="30" /> 
                        <rect x="0" y="450" rx="0" ry="10" width="900" height="30" />                         
                        <rect x="0" y="490" rx="0" ry="10" width="900" height="30" />                         
                    </ContentLoader>
                </ContentContainer>
            </div>
        )
    }
}

export default BlogDetailFakeView;