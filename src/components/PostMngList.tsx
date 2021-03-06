import { IPostListModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import TagService from 'api/service/TagService';

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
    time {
        letter-spacing: 0.07rem;
        margin-right: 1rem;
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
    list: IPostListModel[] | null
    postservice?:PostService
    tagservice?:TagService
    loadFunc: (tagkey: string) => Promise<void>
}

@inject('postservice', 'tagservice')
@observer
class PostMngList extends React.Component<RouteComponentProps & Props, {}> {

    async procDelete(postkey: string):Promise<void> {
        await this.props.postservice?.removePost(postkey);

        const tagkey = this.props.tagservice!.tagkey;

        await this.props.loadFunc(tagkey);
    }

    @autobind
    onUpdateClick(postkey: string): void {
        const {history, postservice} = this.props;
        postservice?.setPostkey(postkey);
        history.push(`/post/write`);
    }

    @autobind
    onDeleteClick(postkey: string): void {
        this.procDelete(postkey);
    }

    render():JSX.Element {
        let datas:IPostListModel[] | null = this.props.list;
        let renderComp = (<></>);
        if(datas !== null && datas.length > 0) {
            renderComp = (
                <PostUL>
                    {datas.map(
                        (data:IPostListModel, i:any) => (
                            <li key={i}>
                                <PostLeftPanel>
                                    <Link to={`/detail/${data.PostKey}`}>
                                        <PostTop>
                                            <time>{data.CreatedAt}</time>
                                            <span>{data.Tags}</span>
                                        </PostTop>
                                        <PostContents>
                                            <h3>{data.PostTitle}</h3>
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