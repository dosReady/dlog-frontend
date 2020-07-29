import React from 'react';
import { Article } from 'api/model/postModels';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ArticleUL = styled.ul`
    li {
        margin-bottom: 1rem;
        border-bottom: 1px solid #3a3649;
        padding: 1rem 0;
        :hover h3{
            text-decoration: underline;
        }
    }
`

const ArticleTop = styled.div`
    font-size: 0.8rem;
    span:not(:last-child) {
        margin-right: 1rem
    }
`

const ArticleContents = styled.div`
    margin-top: 1rem;
    h3 {
        margin-bottom: 1.2rem;
    }
    p {
        line-height: 2;
        font-size: 0.9rem;
        margin: 0px;
    }
`


interface Props {
    list: Article[]
}

class ArticleList extends React.Component<Props, {}> {

    public isEmpty(value:any): boolean {
        
        if( value === "" 
        ||  value === null 
        ||  value === undefined 
        || ( value !== null && typeof value === "object" && Object.keys(value).length > 0 ) ){
            return true ;
        }

        return false;
    }

    render():JSX.Element {
        let datas:Article[] = this.props.list;
        let renderComp = (<></>);
        if(this.isEmpty(datas)) {
            renderComp = (
                <ArticleUL>
                    {datas.map(
                        (data:Article, i:any) => (
                            <li key={i}>
                                <Link to="/">
                                    <ArticleTop>
                                        <span>#Report #Live #Love</span>
                                        <span>Jul 28 2020</span>
                                    </ArticleTop>
                                    <ArticleContents>
                                        <h3>{data.MainTitle}</h3>
                                        <p>타입스크립트(TypeScript)를 사용할 수 있도록 개츠비(Gatsby) 프로젝트를 설정했다. 바벨(Babel)로 컴파일하도록 했고, 타입 검사, 품질 검사, 형식 자동변환을 위해서 각각 타입스크립트 컴파일러, 이에스린트(ESLint), 프리티어(Prettier)를 사용했다.</p>
                                    </ArticleContents>
                                </Link>
                            </li>
                        )
                    )}
                </ArticleUL>
            )
        }
        return  (
            <>
                {renderComp}
            </>
        )
    }
}


export default ArticleList;