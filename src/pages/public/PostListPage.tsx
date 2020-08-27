import { IPostModel } from 'api/model/PostModels';
import autobind from 'autobind-decorator';
import Category from 'components/Category';
import CommonConatiner from 'components/CommonContainer';
import PostList from 'components/PostList';
import PostMngList from 'components/PostMngList';
import { StringUtlz } from 'lib/Utlz';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import UserService from 'api/service/UserService';
import PostService from 'api/service/PostService';


const PostContainer = styled.div`
    padding: 0 1rem;
`

const PostWrap = styled.div`
    margin-top: 2rem;
   
`

@inject('postservice', 'userservice')
@observer
class PostListPage extends React.Component<{
    postservice?:PostService
    userservice?:UserService
}, {}> {
    @observable private list: IPostModel[] | null = null;

    @autobind
    async loadData(): Promise<void> {
        const category = this.props.postservice?.category;
        if(StringUtlz.isEmpty(category)) return;
        const posts = await this.props.postservice!.getPostList(category || '');
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
                    <Category loadFunc={this.loadData}/>
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