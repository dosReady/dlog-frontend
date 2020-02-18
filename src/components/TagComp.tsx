import React from 'react';
import SearchBar from 'components/SearchBar';

interface Props {
    onSelectedTag(text:string):void;
}
interface State {
    srchText:string;
}
class TagComp extends React.Component<Props, State> {

    handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({srchText: e.target.value});
    }

    onItemClick = (title:string) => {
        this.props.onSelectedTag(title);
    }

    render = (): JSX.Element => {
        const arrTitle  = ["자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크"];
        const titleList = arrTitle.map(
            (title, i) => (
                <div key = {i} className="tag-item" onClick={() => this.onItemClick(title)}>{title}</div>
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