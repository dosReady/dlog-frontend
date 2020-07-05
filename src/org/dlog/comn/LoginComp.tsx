import { AppStore, User } from '@types';
import autobind from 'autobind-decorator';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import LoginRepo from 'org/dlog/comn/LoginRepo';
import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';

const LoginTitleDiv = styled.div`
    span {
        font-size: 30px;
        font-weight: 700;
        display: block;
        margin-bottom: 8px;
    }

    div {
        background-color: rgb(248,249,250);
        margin-bottom: 8px;
        padding: 8px 12px;
        border-left: 5px solid #2A3D4E;
        line-height: 1.25;
    }
    margin-bottom: 16px;
`;

const LoginWrapDiv = styled.div`
    span {
        display: block;
        font-size: 15px;
        margin-bottom: 4px;
    }
    input {
        :focus {
            border: 0.0625rem solid #2A3D4E;
            box-shadow: inset 0 0 0 0.0625rem #2A3D4E;
        }
        width: 100%;
        padding: 8px 12px;
        background-color: #FBFBFD;
        border: 1px solid #D7E2EB;
        border-radius: 0.25rem;
        transition-duration: 0.08s;
        transition-property: all;
        transition-timing-function: ease-in-out;
        transition-delay: initial;
        font-size: 16px;
        margin-bottom: 8px;
    }

    button {
        width: 100%;
        background-color: #2A3D4E;
        height:35px;
        font-size: 18px;
        :hover 
            background-color : #476886;
        }
    }
`;

@inject('appStore') 
@observer
class LoginComp extends React.Component<{appStore?:AppStore}, {}> {
    // PART 1 변수
    // PART 2 사용자함수

    isEmpty(value:string):boolean {
        if(value === undefined) return true
        if(value === null) return true
        if(value.length === 0) return true
        if(value === " ") return true
        
        return false
    }


    private isValidated(user:User|undefined): boolean {
        if(user === undefined) {
            toast.error("사용자 아이디와 비밀번호를 입력하십시오.");
            return false;
        }

        if(this.isEmpty(user.LoginID)) {
            toast.error("사용자 아이디는 반드시 입력하십시오.");
            return false;
        }

        if(this.isEmpty(user.Password)) {
            toast.error("비밀번호는 반드시 입력하십시오.");
            return false;
        }
            
        return true
    }

    // PART 3 이벤트 함수
    @autobind
    private onLoginBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const {appStore} = this.props;
        const user = toJS(appStore?.getUser())

        if(this.isValidated(user)) {
            LoginRepo.login(appStore!.getUser());
        }
    }

    @autobind
    private onChangeID(event: React.ChangeEvent<HTMLInputElement>): void {
        const {appStore} = this.props;
        appStore?.setLoginID(event.target.value);
    }
    
    @autobind
    private onChangePWD(event: React.ChangeEvent<HTMLInputElement>): void {
        const {appStore} = this.props;
        appStore?.setPwd(event.target.value);
    } 

    public render():JSX.Element {
        return (
            <ConatinerComp width="500" marginTop="80">
                <LoginTitleDiv>
                    <span>로그인</span>
                    <div>
                        <p>* 안내문</p>
                        <p>관리자전용 로그인 기능입니다.</p>
                        <p>추후 신규 기능을 구현하게 되면 관리자가 초대한 사용자만 로그인 기능을 사용할 수 있을 예정입니다.</p>   
                    </div>
                </LoginTitleDiv>
                <LoginWrapDiv>
                    <span>사용자 ID</span>
                    <input type="text" placeholder="사용자 ID" onChange={this.onChangeID} />
                    <span>비밀번호</span>
                    <input type="password" placeholder="비밀번호" onChange={this.onChangePWD}/>
                    <button onClick={this.onLoginBtnClick}>로그인</button>
                </LoginWrapDiv>
            </ConatinerComp>
        )
    }
}

 export default LoginComp;