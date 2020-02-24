import React from 'react'
import SearchBar from 'components/SearchBar'
import { TagInfo } from 'modules/Types'
import axios from 'axios'
import { Link } from 'react-router-dom';
import PostList from 'components/PostList';

interface Props { }
interface State {
    selectedID: Number
    selectedText: string
    selectedCount: Number
    list: TagInfo[]
}
class TagComp extends React.Component<Props, State> {
    readonly state = {
        selectedID: 0,
        selectedText: '',
        selectedCount: 0,
        list: []
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.getTagList(e.target.value)
    }

    getTagList = async (value: string) => {
        try {
            const { data } = await axios.post('http://127.0.0.1:8080/api/get/taglist', { tag_title: value })
            this.setState({ list: data.list })
        } catch (error) {

        }
    }

    onItemClick = (tag: TagInfo) => {
        this.setState({ selectedID: tag.TagID, selectedText: tag.TagTitle, selectedCount: tag.TagCount })
    }

    UNSAFE_componentWillMount = (): void => {
        this.getTagList("")
    }

    render = (): JSX.Element => {
        const list: TagInfo[] = this.state.list;
        const titleList = list.map(
            (tag, i) => (
                <div key={i} className="tag-item" onClick={() => this.onItemClick(tag)}>{tag.TagTitle}</div>
            )
        );
        
        const rdrPostComp = (
            <div className="tag-response-wrap">
                <div className="tag-response-title">
                    <span className="main">{this.state.selectedText}</span>
                    <span className="sub">{this.state.selectedCount} 건</span>
                </div>
                <div className="tag-response-content">
                    <PostList tag_id={this.state.selectedID} />
                </div>
            </div>
        )

        return (
            <div className="tag-page">
                <div className="tag-list-wrap">
                    <SearchBar onInputChange={this.handleChange} />
                    <div className="tag-list">
                        {titleList}
                    </div>
                </div>
                {this.state.selectedID > 0 ? rdrPostComp : ''}
                <div>
                    <Link to="/blog/write">글쓰기</Link>
                </div>
            </div>
        )
    }
}

export default TagComp;