import { AppStore, User } from '@types';
import autobind from 'autobind-decorator';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { ContainerMenu, ContainerMenuWrap, ContentsWrap, HeaderTop, HTSrchBarWrap, HTSrchInput } from 'org/dlog/comn/ContainerStyledComp';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import LoginSrvc from './LoginSrvc';

@inject('appStore') 
@observer
class ConatinerComp extends React.Component<RouteComponentProps&{width: string, marginTop: string, appStore?: AppStore}, {}> {

    @autobind
    onClickLogo():void {
        this.props.history.push("/");
    }

    @autobind
    goWritePage():void {
        this.props.history.push("/blog/write");
    }

    @autobind
    onClickBtnLogout():void {
        const user = this.props.appStore?.getUser();
        
        if(user !== undefined && user !== ({} as User)) { 
            console.log(toJS(user))
            this.props.appStore?.setUser({} as User);
            LoginSrvc.logout(user);
        }
    }

    @autobind
    goSrchPage(event: React.KeyboardEvent<HTMLInputElement>):void {
        if(event.keyCode === 13) {
            const paramStr:string = event.currentTarget.value;
            this.props.appStore?.setSrchText(paramStr)
            this.props.history.push("/blog/srch");
        }
    }

    @autobind
    onClickMenu(event: React.MouseEvent<HTMLDivElement>): void {
        const btnComp = event.currentTarget.firstElementChild;
        const menuComp = event.currentTarget.lastElementChild;
        if(btnComp?.nodeName === "I" && menuComp?.nodeName === "DIV") {
            let strClass = btnComp.className;         
            
            if(btnComp.className.indexOf("up") > -1) {
                strClass = strClass.replace("up", "down");
                menuComp?.setAttribute("style", "display:none");
            } else {
                strClass = strClass.replace("down", "up");
                menuComp?.removeAttribute("style");
            }

            btnComp.className = strClass;
        }
        
    }

    render():JSX.Element {
        return (
            <main>
                <HeaderTop>
                    <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                    {/* <HTSrchBarWrap>
                        <i className="fas fa-search"></i>
                        <HTSrchInput type="text" placeholder="검색어를 입력하세요." onKeyDown={this.goSrchPage}></HTSrchInput>
                    </HTSrchBarWrap> */}
                    <span>오늘도.log</span>
                    <ContainerMenuWrap onClick={this.onClickMenu}>
                        <i className="fas fa-angle-down"></i> 
                        <ContainerMenu style= {{display: "none"}}>
                            <ul>
                                <li onClick={this.goWritePage}>
                                    기록하기
                                </li>
                                <li onClick={this.onClickBtnLogout}>
                                    로그아웃
                                </li>
                            </ul>
                        </ContainerMenu>
                    </ContainerMenuWrap>
                </HeaderTop>
                <ContentsWrap width={this.props.width} marginTop={this.props.marginTop}>{this.props.children}</ContentsWrap>
            </main>
        )
    }
}

export default withRouter(ConatinerComp);