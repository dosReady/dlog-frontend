import React from 'react';
import styled from 'styled-components';
import Logo from 'resources/img/do.svg';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

const HeaderComp = styled.header`
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    border-bottom: 1px solid #3a3649;
    backdrop-filter: blur(16px);
`;

const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    max-width: 1024px;
    margin: 0 auto;
`;

const LinkWrap = styled.div`
    display: flex;
    align-items: center;   
    a {
        font-size: 13.5px;
        margin-right: 8px;
        div {
            svg {
                width:30px;
                background-color: #282d35   ;
                border-radius: 5px;
                path {
                    fill: white;
                }    
            }
        }
    }
`


const MainConatiner = styled.main`
    position:relative;
    flex:1;
`

class CommonConatiner extends React.Component<{}, {}> {
    render():JSX.Element {
        return (
            <>
                <HeaderComp>
                    <HeaderContainer>
                        <LinkWrap>
                            <Link to="/"><ReactSVG src={Logo}/></Link>
                            <Link to="/">오늘도.log</Link>
                        </LinkWrap>
                        <LinkWrap>
                            <Link to="/">Article</Link>
                            <Link to="/">Code</Link>
                            <Link to="/">Recipe</Link>
                        </LinkWrap>
                        
                    </HeaderContainer>
                </HeaderComp>
                <MainConatiner>{this.props.children}</MainConatiner>
            </>
        )
    }
}

export default CommonConatiner;