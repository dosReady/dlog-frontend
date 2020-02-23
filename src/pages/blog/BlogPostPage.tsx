import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';

class BlogPostPage extends React.Component {
   render = ():JSX.Element => {
       return (
        <TopMenuTemplate>
            <div className="post-page">
                <div className="left-wrap"> 
                    <div className="tag-title">
                        <span className="main">자바스크립트</span>
                        <span className="sub">관련글 6개</span>
                    </div>
                </div>
                <div className="content-wrap">가운데</div>
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