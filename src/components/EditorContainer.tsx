import React from 'react';
import { HeaderComp, HeaderContainer, LinkWrap, MainConatiner } from 'components/CommonContainer';
import { Link } from 'react-router-dom';
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

class EditorConatiner extends React.Component<{}, {}> {
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
                        {this.props.children}
                    </PageConatiner>
                </MainConatiner>
            </>
        )
    }
}

export default EditorConatiner;