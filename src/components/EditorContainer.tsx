import { HeaderComp, MainConatiner } from 'components/CommonContainer';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';


const HeaderContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 1024px;
    margin: 0 auto;
`;

const LinkWrap = styled.div`
    display: flex;
    align-items: center;   
    flex: 1;
    a {
        font-size: 13.5px;
        margin-right: 20px;
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
        :hover {
            text-decoration: underline;
        }
    }
`

const EditorTitle = styled.span`
    flex:1;
    font-weight:bold;
`


const PageConatiner = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:5rem;
    max-width:1024px;
    margin-left: auto;
    margin-right: auto;
    height: calc( 100vh - 5rem );
`

class EditorConatiner extends React.Component<RouteComponentProps<{category:string}> & {}, {}> {
    render():JSX.Element {
        return (
            <>
                <HeaderComp>
                    <HeaderContainer>
                        <LinkWrap>
                            <a href="/dlog"><ReactSVG src={Logo}/></a>
                            <a href="/dlog">오늘도.log</a>
                        </LinkWrap>
                        <EditorTitle>{this.props.match.params.category}</EditorTitle>
                    </HeaderContainer>
                </HeaderComp>
                <MainConatiner>
                    <PageConatiner>
                        {this.props.children}
                    </PageConatiner>
                </MainConatiner>
            </>
        )
    }
}

export default withRouter(EditorConatiner);