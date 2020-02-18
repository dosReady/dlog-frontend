import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';
import TagComp from 'components/TagComp';

interface Props{}
interface State{
    selectedText:string;
}

class BlogListPage extends React.Component<Props,State> {

    state : State = {
        selectedText: ""
    }
    handleSelectedTag = (text:string) => {
        this.setState({selectedText: text});
    }

    render = ():JSX.Element => {

        const renderSelectedTag  = (
            <div className="tag-response-title">
                <span className="main">{this.state.selectedText}</span>
                <span className="sub">관련글 6개</span>
            </div>
        )

        return (
            <TopMenuTemplate>
                    <div className="tag-page">
                        <TagComp onSelectedTag={this.handleSelectedTag}/>
                        <div className="tag-response-wrap">
                            {this.state.selectedText.length > 0 ? renderSelectedTag : ''}
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