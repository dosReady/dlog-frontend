import { UserLoginInfo } from 'api/model/UserModels';
import autobind from 'autobind-decorator';
import React from 'react';
import styled from 'styled-components';

const LoginFormDivWrap = styled.div`
    margin-top:18vh;
`

const LoginFormDiv = styled.div`
    max-width: 350px;
    margin: 0 auto;
    strong {
        color: #000;
        display: block;
        font-weight: normal;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.6px;
        text-align: center;
    }
`
const LoginButton = styled.button`
    margin: 20px 0 0;
    width: 100%;
    height: 48px;
    border-radius: 3px;
    font-size: 16px;
    color: #000;
    background-color: #fff;
    border: 1px solid #23282e;
`
const InputDivWrap = styled.div`
    margin: 35px 0 0;
    border: 1px solid #23282e;
    border-radius: 3px;
    background-color: #fff;
`

const InputDiv1 = styled.div`
    padding: 18px 19px 19px;
    color: #000;
    font-size: 13px;
`

const InputDiv2 = styled.div`
    padding: 18px 19px 19px;
    color: #000;
    font-size: 13px;
    border-top: 1px solid #23282e;
`


class LoginForm extends React.Component<{
    procLogin: (loginInfo:UserLoginInfo) => Promise<void>
}, {
    loginInfo: UserLoginInfo
}> {

    readonly state = {
        loginInfo: {} as UserLoginInfo
    }

    @autobind
    onClickLogin():void {
        this.props.procLogin(this.state.loginInfo);
    }

    @autobind
    onChangeId(event: React.ChangeEvent<HTMLInputElement>):void {
        const value = event.currentTarget.value;

        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                LoginID:value
            }
        });
    }

    @autobind
    onChangePwd(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.currentTarget.value;
        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                Password:value
            }
        });
    }

    render():JSX.Element {
        return  (
            <LoginFormDivWrap>
                <LoginFormDiv>
                    <strong>로그인하세요</strong>
                    <form>
                    <InputDivWrap>
                        <InputDiv1>
                            <input type="text" placeholder="ID" onChange={this.onChangeId} value={this.state.loginInfo.LoginID || ''}/>
                        </InputDiv1>
                        <InputDiv2>
                            <input type="Password" placeholder="Password" onChange={this.onChangePwd} value={this.state.loginInfo.Password || ''}/>
                        </InputDiv2>
                    </InputDivWrap>
                    </form>
                    <LoginButton onClick={this.onClickLogin}>로그인</LoginButton>
                </LoginFormDiv>
            </LoginFormDivWrap>
        )
    }
}

export default LoginForm;