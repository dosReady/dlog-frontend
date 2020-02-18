import React from 'react';

interface Props {
    onInputChange(e:React.ChangeEvent<HTMLInputElement>): void;
}
interface State {
    srchText:string
}

class SearchBar extends React.Component<Props, State> {

    render = (): JSX.Element => {
        return (
            <div className="tag-search-bar">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="검색할 태그명을 입력하세요." onChange={this.props.onInputChange}/>
            </div>
        )
    }
}

export default SearchBar;