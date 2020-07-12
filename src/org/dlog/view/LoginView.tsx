import React from 'react';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';
import LoginComp from '../comn/LoginComp';

const LoginViewConatiner = styled.div`
    max-width: 400px;
    margin: 65px auto;
    padding: 0 10px;
    .logo {
        width: 100%;
        background-color: #2A3D4E;
        padding: 10px 0;
        margin-bottom: 20px;
        div {
            width: 150px;
            margin: 0 auto;
            svg {
                background-color: #2A3D4E;
                border-radius: 5px;
                path {
                    fill: white;
                }    
            }
        }
       
    }
`;

class LoginView extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <LoginViewConatiner>
                <ReactSVG src={Logo} className="logo" />
                <LoginComp/>
            </LoginViewConatiner>
        )
    }
}

export default LoginView;