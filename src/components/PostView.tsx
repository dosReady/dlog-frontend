import React from 'react';
import { Post } from 'api/model/PostModels';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
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


class PostView extends React.Component<{info:Post}, {}> {
    private viewerEl = React.createRef<HTMLDivElement>();

    initialize():void {
        const post:Post = this.props.info;
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
            <div>
                <ViewerWrap ref={this.viewerEl}></ViewerWrap>
            </div>
        )
    }
}

export default PostView;