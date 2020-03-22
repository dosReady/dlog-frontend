import axios from 'axios'
import { TbPost } from 'modules/Types'
import React from 'react'
import styled from 'styled-components';


const PostContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
margin-top: 1.5rem;
`
const PostWrap = styled.div`
width: 20rem;
background: white;
border-radius: 4px;
box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
margin: 1rem;
overflow: hidden;
transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
&:hover {
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 40px 16px 0;
    transform: translateY(-10px)
}
border-top: 10px solid rgb(0, 61, 84);
padding:1rem;
cursor:pointer;
`
const PostTop = styled.div`
display:flex;
`
const PostTag = styled.div`
font-size: 0.5rem;
padding: 0.2rem 0.5rem;
margin-left: auto;
align-self: center;
background-color: rgb(0, 61, 84);
border-radius: 4px;
color: white
`
const PostTitle= styled.div`
font-size: 1rem;
font-weight: bold
`
const PostCtt = styled.div`
margin-top: 0.5rem;
font-size: 0.85rem;
line-height: 1.5rem
`

interface Props {}
interface State {
    list: TbPost[]
}

class PostList extends React.Component<Props, State> {
    readonly state = {
        list: []
    }

    onPostWrapClick = (PostID:number|undefined) => {
        window.location.assign("/blog/"+PostID);
    }

    getPostList = async () => {
        try {
            const {data} = await axios.post('http://127.0.0.1:8080/api/get/postlist', {info: {post_id: 0}})
            this.setState({list: data.list})
        } catch (error) {
            console.error(error)
        }
    }
    UNSAFE_componentWillMount = (): void => {
        this.getPostList()
    }

    UNSAFE_componentWillReceiveProps = (p:Props): void => {
        this.getPostList();
    }

    render = (): JSX.Element => {
        let postInfos:TbPost[] = this.state.list
        const postItems = postInfos.map(
            (post, i) => (
                <PostWrap key={i} onClick={() => this.onPostWrapClick(post.PostID)}>
                    <PostTop>
                        <PostTitle>{post.MainTitle}</PostTitle>
                        <PostTag>자바스크립트</PostTag>
                    </PostTop>
                    <PostCtt>{post.SubTitle}</PostCtt>
                </PostWrap>
            )
        );

        return (
            <PostContainer>
                {postItems}
            </PostContainer>
        )
    }

}

export default PostList;