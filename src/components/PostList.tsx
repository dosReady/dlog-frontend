import React from 'react';

class PostList extends React.Component {

    render = (): JSX.Element => {
        return (
            <div className="post-container">
                <div className="post-list-title">
                    <i className="fas fa-backspace"></i>
                    <span># 자바스크립트</span>
                </div>
                <div className="post-list-content">
                    <div className="post-item-wrap">
                        <div className="post-content">
                            <div className="post-title">내게 실용적이었던 프로그래밍 공부 방법들</div>
                            <div className="post-subtitle">나는 보통 재능이나 공부의 양으로 친구들의 성장속도를 따라가기 힘들었다. 그래서 무작정 열심히 보단 의식적인연습</div>
                            <div className="post-info"></div>
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}

export default PostList;