import { PostDTO, Tag } from '@types';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled, { createGlobalStyle } from 'styled-components';
import BlogRepo from 'org/dlog/blog/BlogRepo';
import BlogViewComp from 'org/dlog/blog/BlogViewCmp';
import LoginSrvc from 'org/dlog/comn/LoginSrvc';



const BackgroundStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;
const HeaderTop = styled.header`
    background-color: #2A3D4E;
`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 900px;
    padding: 0 20px;
    margin: 0 auto;
    height: 250px;
    ul {
        color: white;
        li {
            :hover {
                background-color: #456582;
                box-shadow: 1px 1px 2px 0px #0c1217;
            }
            border-radius: 4px;
            cursor:pointer;
            margin-bottom: 4px;
            padding:2px;
        }
    }
`;

const MainTitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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

    button:hover {
        background-color: #456582;
        box-shadow: 1px 1px 2px 0px #0c1217;
    }
`

const HeaderButtonWrap = styled.div`
    @media screen and (max-width: 900px) {
        display: none;
    }
`

const FooterWrap = styled.footer`
    
`

const EditorWrap = styled.div`
    display:flex;
    max-width: 900px;
    margin: 40rem auto;
    padding: 10px 20px;
    background-color: #c0bfde;
    .logo {
        margin-right: 10px;
        div{
            cursor:pointer;
            width: 60px;
            height: 60px;
            svg {
                border-radius: 5px;
                path {
                    fill: white;
                }    
            }
        }
    }
    strong {
        color: white;
        align-self: center;
    }
`


@inject('appStore') 
@observer
class BlogDetailView extends React.Component<RouteComponentProps<{postid: string}>,{}> {
    async loadPost(): Promise<void> {
        const postID= this.props.match.params.postid;
        await BlogRepo.srchPost(postID);
    }

    async delPost(): Promise<void> {
        const postID= this.props.match.params.postid;
        await BlogRepo.delPost(postID);

        this.props.history.replace("/");
    }

    @autobind
    onClickLogo():void {
        this.props.history.push("/");
    }

    @autobind
    goEditPage():void {
        this.props.history.push(`/blog/write/${this.props.match.params.postid}`);
    }

    @autobind
    onClickDelete(): void {
        this.delPost();
    }

    public componentDidMount():void {
        const user = LoginSrvc.getLocalStorage();
        if(user === null) {
            this.props.history.replace("/login");
        }

        this.loadPost();
    }

    render():JSX.Element {
        const info:PostDTO = BlogRepo.getInfo;
        return (
            <div>
                <BackgroundStyle/>
                <HeaderTop>
                    <HeaderDiv>
                        <MainTitleWrap>
                            <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                            <strong>{info.post.MainTitle}</strong>
                            <HeaderButtonWrap>
                                <button onClick={this.goEditPage}>EDIT</button>
                                <button onClick={this.onClickDelete}>DELETE</button>
                            </HeaderButtonWrap>
                            
                        </MainTitleWrap>
                        <ul>
                            {info.tags.map(
                                (tag:Tag, i:any) => (
                                <li key={i}># {tag.TagName}</li>
                            ))}
                        </ul>
                    </HeaderDiv>
                </HeaderTop>
                <BlogViewComp info={info}/>
                <FooterWrap>
                    <EditorWrap>
                        <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                        <strong>개발자 DOS</strong>
                    </EditorWrap>
                </FooterWrap>
            </div>
        )
    }
}

export default withRouter(BlogDetailView);