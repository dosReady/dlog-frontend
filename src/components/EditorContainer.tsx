import { HeaderComp, HeaderContainer, LinkWrap, MainConatiner } from 'components/CommonContainer';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';


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
                            <a href="/"><ReactSVG src={Logo}/></a>
                            <a href="/">오늘도.log</a>
                        </LinkWrap>
                        {this.props.match.params.category}
                        <LinkWrap>
                            <a href="/post">Post</a>
                            <a href="/code">Code</a>
                            <a href="/recipe">Recipe</a>
                        </LinkWrap>
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