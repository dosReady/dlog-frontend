import axios from 'axios'
import { TbPost } from 'modules/Types'
import React from 'react'
import { Link } from 'react-router-dom'

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
                <div key={i} className="post-item-wrap">
                    <div className="post-item">
                        <Link to={`/blog/post/${post.PostID}`}><span>{post.MainTitle}</span></Link>
                        <p>{post.SubTitle}</p>
                    </div>
                </div>
            )
        );

        return (
            <div className="post-list">
                {postItems}
            </div>
        )
    }

}

export default PostList;