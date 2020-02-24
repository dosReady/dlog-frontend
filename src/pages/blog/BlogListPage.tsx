import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';
import TagComp from 'components/TagComp';
import PostList from 'components/PostList';
import { Link } from 'react-router-dom';
import { TagInfo } from 'modules/Types'

interface Props{}
interface State{
    selectedText:string
    selectedCount:Number
}

class BlogListPage extends React.Component<Props,State> {
    readonly state : State = {
        selectedText: "",
        selectedCount: 0
    }

    handleSelectedTag = (tag:TagInfo) => {
        this.setState({selectedText: tag.TagTitle, selectedCount: tag.TagCount});
    }
    
    render = ():JSX.Element => {

        const renderSelectedTag  = (
            <div className="tag-response-title">
                <span className="main">{this.state.selectedText}</span>
                <span className="sub">{this.state.selectedCount} 건</span>
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