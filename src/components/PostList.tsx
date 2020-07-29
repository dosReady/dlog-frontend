import React from 'react';
import { Post } from 'api/model/PostModels';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StringUtlz } from 'lib/Utlz';

const PostUL = styled.ul`
    li {
        margin-bottom: 1rem;
        border-bottom: 1px solid #3a3649;
        padding: 1rem 0;
        :hover h3{
            text-decoration: underline;
        }
    }
`

const PostTop = styled.div`
    font-size: 0.8rem;
    span:not(:last-child) {
        margin-right: 1rem
    }
`

const PostContents = styled.div`
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
    list: Post[]
}

class PostList extends React.Component<Props, {}> {

    render():JSX.Element {
        let datas:Post[] = this.props.list;
        let renderComp = (<></>);
        if(StringUtlz.isEmpty(datas)) {
            renderComp = (
                <PostUL>
                    {datas.map(
                        (data:Post, i:any) => (
                            <li key={i}>
                                <Link to={`/detail/${data.PostID}`}>
                                    <PostTop>
                                        <span>#Report #Live #Love</span>
                                        <span>Jul 28 2020</span>
                                    </PostTop>
                                    <PostContents>
                                        <h3>{data.MainTitle}</h3>
                                        <p>타입스크립트(TypeScript)를 사용할 수 있도록 개츠비(Gatsby) 프로젝트를 설정했다. 바벨(Babel)로 컴파일하도록 했고, 타입 검사, 품질 검사, 형식 자동변환을 위해서 각각 타입스크립트 컴파일러, 이에스린트(ESLint), 프리티어(Prettier)를 사용했다.</p>
                                    </PostContents>
                                </Link>
                            </li>
                        )
                    )}
                </PostUL>
            )
        }
        return  (
            <>
                {renderComp}
            </>
        )
    }
}


export default PostList;