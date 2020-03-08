import axios from 'axios'
import { TbPost } from 'modules/Types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const PostSection = styled.section`
    padding: 1rem;
`

const PostWrap = styled.div``
const PostItem = styled.div`
    border-left: solid 5px #024770;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,.15);
`

interface Props {
}
interface State {
    list: TbPost[]
}

class PostList extends React.Component<Props, State> {
    readonly state = {
        list: []
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
                <PostWrap key={i}>
                    <PostItem>
                        <Link to={`/blog/post/${post.PostID}`}><span>{post.MainTitle}</span></Link>
                        <p>{post.SubTitle}</p>
                    </PostItem>
                </PostWrap>
            )
        );

        return (
            <PostSection>
                {postItems}
            </PostSection>
        )
    }

}

export default PostList;