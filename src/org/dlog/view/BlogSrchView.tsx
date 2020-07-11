import { AppStore } from '@types';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';
import BlogListComp from 'org/dlog/blog/BlogListComp';
import LoginSrvc from 'org/dlog/comn/LoginSrvc';

const HeaderTop = styled.header`
    background-color: #2A3D4E;
`

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: #2A3D4E;
    max-width: 1100px;
    height: 250px;
    margin: 0 auto;
    padding: 0 20px;
    button:hover {
        background-color: #456582;
        box-shadow: 1px 1px 2px 0px #0c1217;
    }
`

const MainTitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .logo {
            margin-right: 10px;
            div{
            cursor:pointer;
            width: 40px;
            height: 40px;
            svg {
                background-color: #2A3D4E;
                border-radius: 5px;
                path {
                    fill: white
                }    
            }
        }
    }
    strong {
        color: white;
        font-size: 33px;
        margin-right: 10px;
    }
`

const BlogListWrap = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 30px 20px;
`

@inject('appStore') 
@observer
class BlogSrchView extends React.Component<RouteComponentProps & {appStore: AppStore}, {}> {

    @autobind
    onClickLogo() :void {
        this.props.history.push("/");
    }

    @autobind
    onClickBack(): void {
        this.props.history.goBack();
    }

    componentDidMount():void {
        const user = LoginSrvc.getLocalStorage();
        if(user === null) {
            this.props.history.replace("/login");
        }
    }

    render():JSX.Element {

        return (
            <div>
                <HeaderTop>
                    <HeaderDiv>
                        <MainTitleWrap>
                            <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                            <strong>검색어: {this.props.appStore?.getSrchText()}</strong>
                        </MainTitleWrap>
                        <button onClick={this.onClickBack}>뒤로가기</button>
                    </HeaderDiv>
                </HeaderTop>
                <BlogListWrap>
                    <BlogListComp srchText={this.props.appStore?.getSrchText()}/>
                </BlogListWrap>
            </div>
        )
    }
}

export default withRouter(BlogSrchView);