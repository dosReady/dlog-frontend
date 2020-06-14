import { AppStore, PostDTO, Tag } from '@types';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';
import BlogRepo from '../blog/BlogRepo';
import BlogViewComp from '../blog/BlogViewCmp';

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
        }
`
@inject('appStore') 
@observer
class BlogDetailView extends React.Component<RouteComponentProps<{postid: string}> & {appStore?:AppStore},{}> {
    public async loadPost(): Promise<void> {
        const postID= this.props.match.params.postid;
        await BlogRepo.srchPost(postID);
    }

    @autobind
    onClickLogo():void {
        this.props.history.push("/");
    }

    public componentDidMount():void {
        this.props.appStore?.setColor("#fff");
        this.loadPost();
    }

    render():JSX.Element {
        const info:PostDTO = BlogRepo.getInfo;
        return (
                <main>
                    <HeaderTop>
                        <MainTitleWrap>
                            <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                            <strong>{info.post.MainTitle}</strong>
                        </MainTitleWrap>
                        <ul>
                            {info.tags.map(
                                (tag:Tag, i:any) => (
                                <li key={i}># {tag.TagName}</li>
                            ))}
                        </ul>
                    </HeaderTop>
                    <BlogViewComp info={info}/>
                </main>
        )
    }
}

export default withRouter(BlogDetailView);