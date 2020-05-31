import { AppStore, User } from '@types';
import autobind from 'autobind-decorator';
import { sec } from 'lib';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import LoginRepo from 'org/dlog/comn/LoginRepo';
import React from 'react';
import ConatinerComp from 'org/dlog/comn/ContainerComp';


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
        console.log(user)
        if(user === undefined) {
            alert("사용자 아이디와 비밀번호를 입력하십시오.")
            return false;
        }

        if(this.isEmpty(user.LoginID)) {
            alert("사용자 아이디는 반드시 입력하십시오.");
            return false;
        }

        if(this.isEmpty(user.Password)) {
            alert("비밀번호는 반드시 입력하십시오.");
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
    
    callback(res:any, error:any) {
        console.log(`res \n${res}`);
        console.log(`res \n${error}`);
    }

    @autobind
    private onClickTest(): void {
        sec.post('api/get/postlist', {"category": {CtgID: "1"}});
    }

    public render():JSX.Element {
        return (
            <ConatinerComp width="1000">
                <div><input type="text" placeholder="사용자 ID" onChange={this.onChangeID} /></div>
                <div><input type="password" placeholder="패스워든" onChange={this.onChangePWD}/></div>
                <div><button onClick={this.onLoginBtnClick}>로그인</button></div>
                <div><button onClick={this.onClickTest}>테스트</button></div>
            </ConatinerComp>
        )
    }
}

 export default LoginComp;