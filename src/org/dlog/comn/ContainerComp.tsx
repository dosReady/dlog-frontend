import autobind from 'autobind-decorator';
import { ContentsWrap, HeaderTop, HTSrchBarWrap, HTSrchInput } from 'org/dlog/comn/ContainerStyledComp';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AppStore } from '@types';

const LinkWrap = styled.div`
    margin-left: 10px;
    color:white;
    button {
        :hover {
        background-color: #456582;
        box-shadow: 1px 1px 2px 0px #0c1217;
    }
`
@inject('appStore') 
@observer
class ConatinerComp extends React.Component<RouteComponentProps&{width: string, appStore?: AppStore}, {}> {

    @autobind
    onClickLogo():void {
        this.props.history.push("/");
    }

    @autobind
    goWritePage():void {
        this.props.history.push("/blog/write");
    }

    @autobind
    goSrchPage(event: React.KeyboardEvent<HTMLInputElement>):void {
        if(event.keyCode === 13) {
            const paramStr:string = event.currentTarget.value;
            this.props.appStore?.setSrchText(paramStr)
            this.props.history.push("/blog/srch");
        }
    }

    render():JSX.Element {
        return (
            <main>
                <HeaderTop>
                    <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                    <HTSrchBarWrap>
                        <i className="fas fa-search"></i>
                        <HTSrchInput type="text" placeholder="검색어를 입력하세요." onKeyDown={this.goSrchPage}></HTSrchInput>
                    </HTSrchBarWrap>
                    <LinkWrap>
                        <button onClick={this.goWritePage}>WRITE</button>
                    </LinkWrap>
                </HeaderTop>
                <ContentsWrap width={this.props.width}>{this.props.children}</ContentsWrap>
            </main>
        )
    }
}

export default withRouter(ConatinerComp);