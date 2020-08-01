import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { PostModel } from 'api/model/PostModels';
import React from 'react';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';

const ViewerWrap = styled.div`
    .tui-scrollsync , .tui-toolbar-divider{
        display:none!important;
    }
    .tui-editor-contents * {
        color: #F3F3F3;
    }

    .tui-editor-contents {
        blockquote {
            background-color: transparent; 
        }

        h1,h2,h3{
            border:none;
        }

        pre {
            overflow-y:scroll;
            background-color:#294854;
        }
    }
    
`

const PostWrap = styled.div`
    margin-top: 4rem;
    display:flex;
    justify-content:space-between;
`

const PostLeftWrap = styled.div`
    max-width: 750px;
    flex: 1 1 0%;
    padding: 0 1rem;
`

const PostRightWrap = styled.div`
    margin-left: 1.5rem;
    padding: 0rem 1rem 0;
    width: 300px;
`

const FooterWrap = styled.div`
    display:felx;
    padding: 0 1rem;
    margin-top: 25rem;
    padding-top: 6rem;
    padding-bottom: 3rem;
    border-top: 1px solid #3a3649;
    svg {
        width:30px;
        background-color: #282d35   ;
        border-radius: 5px;
        margin-right:1rem;  
        path {
            fill: white;
        }    
    }
`

const CopyrightWrap = styled.div`
   font-size: 0.8rem;
`

const CopyrightDomain = styled.div`
    margin-bottom: 0.5rem;
`


class PostView extends React.Component<{info:PostModel}, {}> {
    private viewerEl = React.createRef<HTMLDivElement>();

    initialize():void {
        const post:PostModel = this.props.info;
        const target = this.viewerEl.current!;
        new Viewer({
            el: target,
            initialValue: post.Content 
        })
    }

    componentDidMount():void {
        this.initialize();
    }

    render():JSX.Element {
        return (
            <>
            <PostWrap>
                <PostLeftWrap>
                    <ViewerWrap ref={this.viewerEl}></ViewerWrap>
                </PostLeftWrap>
                <PostRightWrap>
                </PostRightWrap>
            </PostWrap>
            <FooterWrap>
                <ReactSVG src={Logo}/>
                <CopyrightWrap>
                    <CopyrightDomain>dosready.github.io</CopyrightDomain>
                    <div>© 2020 DOS</div>
                </CopyrightWrap>
            </FooterWrap>
            </>
        )
    }
}

export default PostView;