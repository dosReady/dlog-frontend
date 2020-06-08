import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Post, PostDTO } from '@types';
import 'github-markdown-css';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import BlogRepo from 'org/dlog/blog/BlogRepo';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

@observer
class BlogViewComp extends React.Component<RouteComponentProps<{postid: string}>, {}> {
    private viewerEl = React.createRef<HTMLDivElement>();
    @observable private post:Post = {
        PostID: "",
        Content: "",
        SubTitle: "",
        CreatedAt: new Date(),
        MainTitle: "",
        UpdatedAt: new Date()
    };

    public async loadPost(): Promise<void> {
        
        this.post.PostID = this.props.match.params.postid;
        const data:PostDTO = await BlogRepo.srchPost(this.post);
        const target = this.viewerEl.current;
        if(target !== null)  {
            new Viewer({
                el: target,
                initialValue: data.post.Content
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
                <Link to={`/blog/write/${this.props.match.params.postid}`}>글쓰기</Link>
                <div ref={this.viewerEl}></div>
            </ConatinerComp>
        )
    }
}

export default BlogViewComp;