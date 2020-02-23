import React from 'react'
import TopMenuTemplate from 'components/templates/TopMenuTemplate'
import axios from 'axios'
import { TbPost } from 'modules/Types'
import Marked from 'marked';
import 'github-markdown-css';

interface Props { }
interface State {
    post: TbPost
}

class BlogPostPage extends React.Component<Props, State>{
    callPostInfo = async () => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8080/api/get/post`, { post_id: 2 })
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
        const sHtml = this.state === null ? '' : this.state.post.Content
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
                    <div className="content-wrap" dangerouslySetInnerHTML={str}></div>
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