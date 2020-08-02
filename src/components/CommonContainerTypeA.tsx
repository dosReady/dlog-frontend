import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';
import { StringUtlz } from 'lib/Utlz';

export const HeaderComp = styled.header`
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    border-bottom: 1px solid #3a3649;
    backdrop-filter: blur(16px);
`;

export const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    max-width: 1024px;
    margin: 0 auto;
`;

export const LinkWrap = styled.div`
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


export const MainConatiner = styled.main`
    position:relative;
    flex:1;
`

export const PageConatiner = styled.div`
    margin-top:8rem;
    max-width:1024px;
    margin-left: auto;
    margin-right: auto;
`

export const  PageHeader = styled.header`
    padding: 0 1rem;
    p {
        margin-top: 1rem;
        border-left: 4px solid #dddddd;
        padding: 0 15px;
    }
`

class CommonContainerTypeA extends React.Component<{title?:string, subTitle?:string}, {}> {
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
                            <Link to="/">Post</Link>
                            <Link to="/">Code</Link>
                            <Link to="/">Recipe</Link>
                        </LinkWrap>
                    </HeaderContainer>
                </HeaderComp>
                <MainConatiner>
                    <PageConatiner>
                        <PageHeader>
                            <h1>{this.props.title}</h1>
                            {!StringUtlz.isEmpty(this.props.subTitle) ? (<p>{this.props.subTitle}</p>) : ""}
                        </PageHeader>
                        {this.props.children}
                    </PageConatiner>
                </MainConatiner>
            </>
        )
    }
}

export default CommonContainerTypeA;