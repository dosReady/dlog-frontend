import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 30rem;
`

class LoginPage extends React.Component {

    onLoginClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }    
    render = ():JSX.Element => {
        return (
            <LoginContainer>
                <input type="text"></input>
                <input type="password"></input>
                <button onClick={this.onLoginClick}>로그인</button>
            </LoginContainer>
        )
    }
}

export default LoginPage;