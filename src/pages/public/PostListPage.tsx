import { IPostListModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import UserService from 'api/service/UserService';
import autobind from 'autobind-decorator';
import CommonConatiner from 'components/CommonContainer';
import PostList from 'components/PostList';
import PostMngList from 'components/PostMngList';
import Tags from 'components/Tags';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import TagService from 'api/service/TagService';
import { ITagModel } from 'api/model/TagModels';


const PostContainer = styled.div`
    padding: 0 1rem;
`

const PostWrap = styled.div`
    margin-top: 2rem;
   
`

@inject('postservice', 'userservice', 'tagservice')
@observer
class PostListPage extends React.Component<{
    postservice?:PostService
    userservice?:UserService
    tagservice?: TagService
}, {}> {
    @observable private list: IPostListModel[] | null = null;
    @observable private _tags: ITagModel[] | null = null;


    @autobind
    async GetTagList(): Promise<void> {
        const {tagservice} = this.props;
        const tags = await tagservice!.getTagList();
        this._tags = tags;
    }

    @autobind
    async loadData(): Promise<void> {
        await this.GetTagList();
        const tagkey = this.props.tagservice?.tagkey;
        const posts = await this.props.postservice!.getPostList(tagkey || '');
        this.list = posts;
    }
    componentDidMount(): void {
        this.loadData();
    }

    render(): JSX.Element {
        const isLogin = this.props.userservice?.isLogin;
        return (
            <CommonConatiner title="Post">
                <PostContainer>
                    <Tags loadFunc={this.loadData} tags={this._tags}/>
                    <PostWrap>
                        {!isLogin && <PostList list={this.list}/>}
                        {isLogin && <PostMngList list={this.list} loadFunc={this.loadData}/>}
                    </PostWrap>
                </PostContainer>
            </CommonConatiner>
        )
    }
    
}

export default PostListPage;