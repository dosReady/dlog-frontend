import React from 'react';
import { ReactSVG } from 'react-svg';
import bgimg from 'resources/img/bg_login.png';
import Logo from 'resources/img/do.svg';
import styled, { createGlobalStyle } from 'styled-components';
import LoginForm from 'components/LoginForm';

const GlobalStyle  = createGlobalStyle`
    body {
        background-color:#fff;
        user-select: none;
    }  
`
const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${bgimg});
    background-position: 0 -17%;
    background-repeat: no-repeat;
`
const HeadLine = styled.div`
    padding: 40px 20px;
    svg {
        width: 40px;
        background-color: #fff;
        border-radius: 5px;
        path {
            fill:#23282e;
        }
    }
`


class DlogLoginPage extends React.Component<{},{}> {

    async procLogin():Promise<void> {
        
    }


    render():JSX.Element {
        return (
            <>
                <GlobalStyle/>
                <Wrap>
                    <HeadLine>
                        <ReactSVG src={Logo} />
                    </HeadLine>
                    <LoginForm procLogin={this.procLogin}/>
                </Wrap>
            </>
        )
    }
}

export default DlogLoginPage;