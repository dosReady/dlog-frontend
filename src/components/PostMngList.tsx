import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { PostStore } from 'store';
import styled from 'styled-components';

const PostUL = styled.ul`
    li {
        margin-bottom: 1rem;
        border-bottom: 1px solid #3a3649;
        padding: 1rem 0;
        display: flex;
        align-items: center;
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

const PostLeftPanel = styled.div`
    flex:1 ;
`

const PostRightPanel = styled.div`

    button {
        border: 1px solid #F3F3F3;
        margin-right:1rem;
        :last-child { margin-right:0;}
        :hover {
            background-color: #456582;
        }
    }
    @media screen and (max-width: 700px) {
        display:flex;
        flex-direction: column;
        button {
            margin-right:0; 
            margin-bottom: 0.3rem;
            :last-child {margin-bottom:0;}
        } 
    }
`

interface Props {
    list: PostModel[] | null
    poststore?:PostStore
    loadFunc: () => Promise<void>
}

@inject('poststore')
@observer
class PostMngList extends React.Component<RouteComponentProps & Props, {}> {

    async procDelete(postkey: string):Promise<void> {
        await PostService.removePost(postkey);
        await this.props.loadFunc();
    }

    @autobind
    onUpdateClick(postkey: string): void {
        const {history, poststore} = this.props;
        poststore?.setPostkey(postkey);
        history.push(`/post/write`);
    }

    @autobind
    onDeleteClick(postkey: string): void {
        this.procDelete(postkey);
    }

    render():JSX.Element {
        let datas:PostModel[] | null = this.props.list;
        let renderComp = (<></>);
        if(datas !== null && datas.length > 0) {
            renderComp = (
                <PostUL>
                    {datas.map(
                        (data:PostModel, i:any) => (
                            <li key={i}>
                                <PostLeftPanel>
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
                                </PostLeftPanel>
                                <PostRightPanel>
                                    <button onClick={() => this.onUpdateClick(data.PostKey)}>수정</button>
                                    <button onClick={() => this.onDeleteClick(data.PostKey)}>삭제</button>
                                </PostRightPanel>
                            </li>
                        )
                    )}
                </PostUL>
            )
        } else if(datas !== null && datas.length === 0) {
            renderComp =(<div>조회된 내용이 없습니다.</div>)
        }
        return (
            <>
                {renderComp}
            </>
        )
    }
}
export default withRouter(PostMngList);