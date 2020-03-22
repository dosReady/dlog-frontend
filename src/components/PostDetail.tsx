import React from 'react';
import styled from 'styled-components';
import axios from 'axios'
import 'github-markdown-css';
import { TbPost } from 'modules/Types';
import Marked from 'marked';

const PostContainer = styled.div`
margin-top: 5rem;
width: 750px;  
box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
border-top: 10px solid rgb(0, 61, 84);
border-radius: 4px;
background: white;
`

const PostWrap = styled.div`
    padding: 2rem;
`
interface State {
    post: TbPost
}
interface Props {
    postId:string
}

class PostDetail extends React.Component<Props, State> {
    readonly state = {
        post: {
            Content:'',
            MainTitle:'',
            PostID: -1,
            SubTitle: '',
            TagID: -1,
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        }
    }

    getPostInfo = async () => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8080/api/get/post`, { info:{PostID: Number(this.props.postId)} })
            const tbPost: TbPost = data.info;
            this.setState({ post: tbPost })
        } catch (error) {
            console.error(error)
        }

    }

    UNSAFE_componentWillMount = (): void => {
        this.getPostInfo()
    }

    render = ():JSX.Element => {
        const sHtml = this.state.post.Content
        const str = {
            __html: Marked(sHtml)
        }


        return(
            <PostContainer>
                <PostWrap>
                <div className="markdown-body content" dangerouslySetInnerHTML={str}></div>
                </PostWrap>
            </PostContainer>
        )
    }

}

export default PostDetail;
