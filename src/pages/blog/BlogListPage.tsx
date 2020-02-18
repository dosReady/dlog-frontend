import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';

class BlogListPage extends React.Component {
   render = ():JSX.Element => {
       return (
           <TopMenuTemplate>
                <div className="tag-page">
                    <div className="tag-list-wrap">
                        <div className="tag-search-bar">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="검색할 태그명을 입력하세요."/>
                        </div>
                        <div className="tag-list">
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                            <div className="tag-item">
                                자바스크립트
                            </div>
                        </div>
                    </div>  
                    <div className="tag-response-wrap">
                        <div className="tag-response-title">
                            <span className="main">자바스크립트</span>
                            <span className="sub">관련글 6개</span>
                        </div>
                        <div className="tag-response-content">
                            <div className="post-list">
                                <div className="post-item-wrap">
                                    <div className="post-item">
                                        <span>내게 실용적이었던 프로그래밍 공부 방법들</span>
                                        <p>나는 보통 재능이나 공부의 양으로 친구들의 성장 속도를 따라가기 힘들었다. 그래서 ‘무작정 열심히’보단, ‘의식적인 연습’을 지속해 나가야 했다. </p>
                                    </div>
                                </div>
                                <div className="post-item-wrap">
                                    <div className="post-item">
                                        <span>내게 실용적이었던 프로그래밍 공부 방법들</span>
                                        <p>나는 보통 재능이나 공부의 양으로 친구들의 성장 속도를 따라가기 힘들었다. 그래서 ‘무작정 열심히’보단, ‘의식적인 연습’을 지속해 나가야 했다. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </TopMenuTemplate>
       )
   }
}

export default BlogListPage;