import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { PostDTO } from '@types';
import 'github-markdown-css';
import React from 'react';
import styled from 'styled-components';

const ViewContentWrap = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    font-size: 16px;
    padding: 30px 20px;
}
`

class BlogViewComp extends React.Component<{info:PostDTO}, {}> {
    private viewerEl = React.createRef<HTMLDivElement>();

    public async loadPost(info:PostDTO): Promise<void> {
        const {post} = info;
        const target = this.viewerEl.current;
        if(target !== null)  {
            new Viewer({
                el: target,
                initialValue: post.Content
            });

            var tgtIndexs = target.children[0].getElementsByTagName("h1")

            if (tgtIndexs.length > 0 ) {
                this.setState({
                    indexs: tgtIndexs
                })
            }
            
            
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<{info:PostDTO}>, nexContext:any):void {
        this.loadPost(nextProps.info);
    }

    render():JSX.Element {
        return (
            <ViewContentWrap ref={this.viewerEl}></ViewContentWrap>
        )
    }
}

export default BlogViewComp;