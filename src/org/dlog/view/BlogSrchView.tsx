import { AppStore } from '@types';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled, { createGlobalStyle } from 'styled-components';
import BlogSrchListComp from '../blog/BlogSrchListComp';

const BackgroundStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;

const HeaderTop = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: #2A3D4E;
    height: 250px;
    padding: 0 400px;
    ul {
        color: white;
        padding: 10px;
        li {
            :hover {
                background-color: #456582;
                box-shadow: 1px 1px 2px 0px #0c1217;
            }
            border-radius: 4px;
            cursor:pointer;
            margin-bottom: 4px;
            padding:2px 10px;
        }
    }
`

const MainTitleWrap = styled.div`
    display: flex;
    align-items: center;
        .logo div {
            cursor:pointer;
            width: 70px;
            height: 40px;
            svg {
                width: 100%;
                height: 100%;
                background-color: #2A3D4E;
                border-radius: 5px;
                path {
                    fill: white
                }    
            }
        }
        strong {
            color: white;
            font-size: 33px;
            margin-bottom: 7px;
            margin-right: 10px;
        }

        button:hover {
            background-color: #456582;
            box-shadow: 1px 1px 2px 0px #0c1217;
        }
`
@inject('appStore') 
@observer
class BlogSrchView extends React.Component<RouteComponentProps & {appStore: AppStore}, {}> {

    @autobind
    onClickLogo() :void {
        this.props.history.push("/");
    }
    render():JSX.Element {

        return (
            <div>
                <BackgroundStyle/>
                <HeaderTop>
                    <MainTitleWrap>
                        <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                        <strong>검색어: {this.props.appStore?.getSrchText()}</strong>
                    </MainTitleWrap>
                </HeaderTop>
                <BlogSrchListComp srchText={this.props.appStore?.getSrchText()}/>
            </div>
        )
    }
}

export default withRouter(BlogSrchView);