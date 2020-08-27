import { IPostModel } from 'api/model/PostModels';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    time {
        letter-spacing: 0.07rem;
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
    list: IPostModel[] | null
}

class PostList extends React.Component<Props, {}> {
    render():JSX.Element {
        let datas:IPostModel[] | null = this.props.list;
        let renderComp = (<></>);
        if(datas !== null && datas.length > 0) {
            renderComp = (
                <PostUL>
                    {datas.map(
                        (data:IPostModel, i:any) => (
                            <li key={i}>
                                <Link to={`/detail/${data.PostKey}`}>
                                    <PostTop>
                                        <span>#Report #Live #Love</span>
                                        <time>{data.CreatedAt}</time>
                                    </PostTop>
                                    <PostContents>
                                        <h3>{data.PostTitle}</h3>
                                        <p>{data.PostSubTitle}</p>
                                    </PostContents>
                                </Link>
                            </li>
                        )
                    )}
                </PostUL>
            )
        } else if(datas !== null && datas.length === 0) {
            renderComp =(<div>조회된 내용이 없습니다.</div>)
        }
        return  (
            <>
                {renderComp}
            </>
        )
    }
}


export default PostList;