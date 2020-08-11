import { PostModel } from 'api/model/PostModels';
import { StringUtlz } from 'lib/Utlz';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    list: PostModel[]
}

class PostList extends React.Component<Props, {}> {
    render():JSX.Element {
        let datas:PostModel[] = this.props.list;
        let renderComp = (<></>);
        
        if(StringUtlz.isEmpty(datas)) {
            renderComp = (
                <PostUL>
                    {datas.map(
                        (data:PostModel, i:any) => (
                            <li key={i}>
                                <Link to={`/detail/${data.PostID}`}>
                                    <PostTop>
                                        <span>#Report #Live #Love</span>
                                        <time>{data.CreatedAt}</time>
                                    </PostTop>
                                    <PostContents>
                                        <h3>{data.MainTitle}</h3>
                                        <p>{data.SubTitle}</p>
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