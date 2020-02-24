import React from 'react'
import SearchBar from 'components/SearchBar'
import {TagInfo} from 'modules/Types'
import axios from 'axios'

interface Props {
    onSelectedTag(tag:TagInfo):void;
}
interface State {
    list: TagInfo[]
}
class TagComp extends React.Component<Props, State> {
    readonly state = {
        list: []
    }

    handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.getTagList(e.target.value)
    }

    getTagList = async (value:string) => {
        try {
            const {data} = await axios.post('http://127.0.0.1:8080/api/get/taglist', {tag_title: value})
            this.setState({list: data.list})
        } catch (error) {
            
        }
    }

    onItemClick = (tag:TagInfo) => {
        this.props.onSelectedTag(tag)
    }

    UNSAFE_componentWillMount = (): void => {
        this.getTagList("")
    }

    render = (): JSX.Element => {
        const list:TagInfo[]  = this.state.list;
        const titleList = list.map(
            (tag, i) => (
                <div key = {i} className="tag-item" onClick={() => this.onItemClick(tag)}>{tag.TagTitle}</div>
            )
        );

        return (
            <div className="tag-list-wrap">
                <SearchBar onInputChange={this.handleChange}/>
                <div className="tag-list">
                    {titleList}
                </div>
               
            </div>  
        )
    }
}

export default TagComp;