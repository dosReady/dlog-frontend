import React from 'react';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import { RouteComponentProps } from 'react-router-dom';
import BlogRepo from 'org/dlog/blog/BlogRepo';
import { Post } from '@types';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import 'github-markdown-css';
import '@toast-ui/editor/dist/toastui-editor.css';

@observer
class BlogViewComp extends React.Component<RouteComponentProps<{postid: string}>, {}> {
    private viewerEl = React.createRef<HTMLDivElement>();
    @observable private post:Post = {
        PostID: 0,
        Content: "",
        CreatedAt: new Date(),
        MainTitle: "",
        UpdatedAt: new Date()
    };

    public async loadPost(): Promise<void> {
        
        this.post.PostID = parseInt(this.props.match.params.postid);
        const post:Post = await BlogRepo.srchPost(this.post);
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

    public componentDidMount():void {
        this.loadPost();
    }

    render():JSX.Element {
        return (
            <ConatinerComp width="1000">
                <div ref={this.viewerEl}></div>
            </ConatinerComp>
        )
    }
}

export default BlogViewComp;