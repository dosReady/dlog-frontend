import React from 'react';
import { Link } from 'react-router-dom';

class PostList extends React.Component {


    render = (): JSX.Element => {
        let postInfos = [
        {
            title: '내게 실용적이었던 프로그래밍 공부 방법들',
            content: '나는 보통 재능이나 공부의 양으로 친구들의 성장 속도를 따라가기 힘들었다. 그래서 ‘무작정 열심히’보단, ‘의식적인 연습’을 지속해 나가야 했다.'
        },
        {
            title: '내게 실용적이었던 프로그래밍 공부 방법들',
            content: '나는 보통 재능이나 공부의 양으로 친구들의 성장 속도를 따라가기 힘들었다. 그래서 ‘무작정 열심히’보단, ‘의식적인 연습’을 지속해 나가야 했다.'
        },
        {
            title: '내게 실용적이었던 프로그래밍 공부 방법들',
            content: '나는 보통 재능이나 공부의 양으로 친구들의 성장 속도를 따라가기 힘들었다. 그래서 ‘무작정 열심히’보단, ‘의식적인 연습’을 지속해 나가야 했다.'
        }]
        const postItems = postInfos.map(
            (info, i) => (
                <div key={i} className="post-item-wrap">
                    <div className="post-item">
                        <Link to="/blog/post"><span>{info.title}</span></Link>
                        <p>{info.content}</p>
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