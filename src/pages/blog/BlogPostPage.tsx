import React from 'react'
import TopMenuTemplate from 'components/templates/TopMenuTemplate'
import axios from 'axios'
import { TbPost } from 'modules/Types'
import Marked from 'marked';
import 'github-markdown-css';
import { Link } from 'react-router-dom';

interface Match {
    params: {
        post_id:Number
    }
}
interface State {
    post: TbPost
}
interface Props {
    match:Match
}

class BlogPostPage extends React.Component<Props, State>{
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
    callPostInfo = async () => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8080/api/get/post`, { post_id: Number(this.props.match.params.post_id) })
            const tbPost: TbPost = data.info;
            this.setState({ post: tbPost })
        } catch (error) {
            console.error(error)
        }

    }

    UNSAFE_componentWillMount = (): void => {
        this.callPostInfo()
    }

    render = (): JSX.Element => {
        const sHtml = this.state.post.Content
        const str = {
            __html: Marked(sHtml)
        }
        return (
            <TopMenuTemplate>
                <div className="post-page">
                    <div className="left-wrap">
                        <div className="tag-title">
                            <span className="main">자바스크립트</span>
                            <span className="sub">관련글 6개</span>
                        </div>
                    </div>
                    <div className="content-wrap">
                        <div className="title-form">
                            <div className="main-wrap">{this.state.post.MainTitle}</div>
                            <div className="alis-wrap"></div>
                            <div className="tag-wrap"></div>
                        </div>
                        <div>
                            <Link to={`/blog/write/${this.props.match.params.post_id}`}>글쓰기</Link>
                        </div>
                        <div className="content" dangerouslySetInnerHTML={str}></div>
                    </div>
                    <div className="right-wrap">
                        <div>
                            <div><a href="/blog/list">1. 더 나은 검색</a></div>
                            <div><a href="/blog/list">2. 이전/다음 포스트 개선</a></div>
                            <div><a href="/blog/list">3. 캐싱</a></div>
                            <div><a href="/blog/list">4. Prefetching</a></div>
                        </div>
                    </div>
                </div>
            </TopMenuTemplate>
        )
    }
}

export default BlogPostPage;