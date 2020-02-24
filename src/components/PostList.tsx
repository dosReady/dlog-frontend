import React from 'react'
import { Link } from 'react-router-dom'
import {TbPost} from 'modules/Types'
import axios from 'axios'

interface Props {
    tag_id:Number
}
interface State {
    list: TbPost[]
}

class PostList extends React.Component<Props, State> {
    readonly state = {
        list: []
    }

    getPostList = async (tag_id:Number) => {
        try {
            const {data} = await axios.post('http://127.0.0.1:8080/api/get/postlist', {tag_id: tag_id})
            this.setState({list: data.list})
        } catch (error) {
            console.error(error)
        }
    }
    UNSAFE_componentWillMount = (): void => {
        this.getPostList(this.props.tag_id)
    }

    UNSAFE_componentWillReceiveProps = (p:Props): void => {
        this.getPostList(p.tag_id);
    }

    render = (): JSX.Element => {
        let postInfos:TbPost[] = this.state.list
        const postItems = postInfos.map(
            (post, i) => (
                <div key={i} className="post-item-wrap">
                    <div className="post-item">
                        <Link to="/blog/post"><span>{post.MainTitle}</span></Link>
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