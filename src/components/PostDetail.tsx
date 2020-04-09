import React from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { TbPost } from 'modules/Types';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import 'github-markdown-css';
import '@toast-ui/editor/dist/toastui-editor.css';
const PostContainer = styled.div`
margin-top: 5rem;
margin-bottom: 5rem;
`

const PostWrap = styled.div`
width: 1000px;  
box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
border-top: 10px solid rgb(0, 61, 84);
border-radius: 4px;
background: white;
padding: 2rem;
`

const InputButton = styled.div`
margin-bottom: 1.5rem;
padding: 0.6rem 1rem;
box-shadow: rgba(0,0,0,0.04) 0px 4px 16px 0px;
border-radius: 4px;
background-color: rgb(0,61,84);
color: white;
cursor: pointer;

&:hover {
    background-color:rgba(0, 61, 84, 0.72);
}
`

interface State {
    post: TbPost
    indexs: null|HTMLCollectionOf<HTMLHeadingElement>
}
interface Props {
    postId:string
}

class PostDetail extends React.Component<Props, State> {
    private viewerEl = React.createRef<HTMLDivElement>();

    readonly state = {
        post: {
            Content:'',
            MainTitle:'',
            PostID: 0,
            SubTitle: '',
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        },
        indexs: null
    }

    getPostInfo = async () => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8080/api/get/post`, { info:{PostID: Number(this.props.postId)} })
            const tbPost: TbPost = data.info;
            this.setState({ post: tbPost });
            
            this.initialize();
        } catch (error) {
            console.error(error)
        }

    }

    goEditPage = ():void => {
        window.location.assign(`/blog/write/${this.props.postId}`);
    }

    initialize = (): void => {
        const target = this.viewerEl.current;
        if(target !== null)  {
            new Viewer({
                el: target,
                initialValue: this.state.post.Content
            });

            var tgtIndexs = target.children[0].getElementsByTagName("h1")

            if (tgtIndexs.length > 0 ) {
                this.setState({
                    indexs: tgtIndexs
                })
            }
            
            
        }
    }
    componentDidMount = (): void => {
        this.getPostInfo();
    }
    

    render = ():JSX.Element => {
        const indexs:HTMLCollectionOf<HTMLHeadingElement>|null = this.state.indexs;
        if(indexs != null) console.log(indexs!.item(0));

        return(
            <PostContainer>
                <InputButton onClick={this.goEditPage}>수정 하기</InputButton>
                <PostWrap>
                <div ref={this.viewerEl}></div>
                </PostWrap>
            </PostContainer>
        )
    }

}

export default PostDetail;
