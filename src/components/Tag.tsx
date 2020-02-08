import React from 'react';

interface Props {}

class Tag extends React.Component<Props> {
    render = (): JSX.Element => {
        const arrTitle  = ["자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크",
        "자바스크립트", "자바", "파이썬", "스프링프레임워크", "전자정부프레임워크"
        ];
        const titleList = arrTitle.map(
            (title, i) => (
                <div key={i} className="tag-item-wrap">
                    <div className="tag-content">
                        <i className="fas fa-hashtag"></i> 
                        <span>{title}</span>
                        <div className="tag-info"> {i}건</div>
                    </div>
                </div>
            )
        );

        return (
            <div className="tag-container">
                <div className="search-bar-wrap">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="검색할 태그명을 입력하세요."/>
                </div>
                <div className="tag-list-wrap">
                    {titleList}
                </div>
            </div>
        )
    }
}

export default Tag;