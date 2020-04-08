import React from 'react';
import styled from 'styled-components';
import axios from 'axios'
import 'github-markdown-css';
import { TbPost } from 'modules/Types';
import Marked from 'marked';

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
}
interface Props {
    postId:string
}

class PostDetail extends React.Component<Props, State> {
    readonly state = {
        post: {
            Content:'',
            MainTitle:'',
            PostID: 0,
            SubTitle: '',
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

    goEditPage = ():void => {
        window.location.assign(`/blog/write/${this.props.postId}`);
    }

    UNSAFE_componentWillMount = (): void => {
        this.getPostInfo()
    }

    render = ():JSX.Element => {

        const sTitle = `# ${this.state.post.MainTitle}\n`;
        const sHtml = this.state.post.Content;

        const str = {
            __html: Marked( sTitle + sHtml)
        }


        return(
            <PostContainer>
                <InputButton onClick={this.goEditPage}>수정 하기</InputButton>
                <PostWrap>
                <div className="markdown-body content" dangerouslySetInnerHTML={str}></div>
                </PostWrap>
            </PostContainer>
        )
    }

}

export default PostDetail;
