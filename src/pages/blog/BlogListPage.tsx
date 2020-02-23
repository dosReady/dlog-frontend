import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';
import TagComp from 'components/TagComp';
import PostList from 'components/PostList';
import { Link } from 'react-router-dom';

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
                               <PostList/>
                            </div>
                        </div>
                        <div>
                            <Link to="/blog/write">글쓰기</Link>
                        </div>
                    </div>
            </TopMenuTemplate>
        )
   }
}

export default BlogListPage;