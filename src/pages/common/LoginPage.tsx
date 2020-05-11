import React from 'react';
import styled from 'styled-components';
import {observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import BasicTemplate from 'components/templates/BasicTemplate';

const LoginContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 30rem;
`

type AppStore = {
    setLoginID: (loginID:string) => void,
    getLoginID: () => string,
    setPwd: (password:string) => void,
    getPwd: () => string
}

interface Props {
    appStore?: AppStore;
}


@inject('appStore') 
@observer
// this를 바인드 시키기위해 bind 함수를 이용하여 this를 연결하였지만, arrow function으로 사용하면 autobind가 되어 
// this를 자동으로 연결해줬다. arrow function 이나 bind 함수를 생성자 적기 싫으면 데코레이더 autobind를 사용하자.
@autobind 
class LoginPage extends React.Component<Props, {}> {

    onLoginClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const {appStore} = this.props
        appStore?.setLoginID('qweweqw');
    }

    render ():JSX.Element {
        const {appStore} = this.props
        return (
            <BasicTemplate>
                <LoginContainer>
                    {appStore?.getLoginID}
                    <input type="text"></input>
                    <input type="password"></input>
                    <button onClick={this.onLoginClick}>로그인</button>
                </LoginContainer>
            </BasicTemplate>
        )
    }
}

export default LoginPage;