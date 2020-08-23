import { ILoginInfo } from 'api/model/UserModels';
import UserService from 'api/service/UserService';
import autobind from 'autobind-decorator';
import LoginForm from 'components/LoginForm';
import { StringUtlz } from 'lib/Utlz';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import bgimg from 'resources/img/bg_login.png';
import Logo from 'resources/img/do.svg';
import styled, { createGlobalStyle } from 'styled-components';

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
    background-position: 0 -10%;
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
@inject("userservice")
@observer
class DlogLoginPage extends React.Component<RouteComponentProps & {
    userservice?:UserService
},{}> {

    @autobind
    async procLogin(loginInfo:ILoginInfo):Promise<void> {
        if(StringUtlz.isEmpty(loginInfo.LoginID)) {
            toast.error("ID를 입력하세요");
            return;
        }

        if(StringUtlz.isEmpty(loginInfo.LoginID)) {
            toast.error("ID를 입력하세요");
            return;
        }

        this.props.userservice?.reqLogin(loginInfo, this.props);
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

export default withRouter(DlogLoginPage);