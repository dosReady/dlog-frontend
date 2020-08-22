import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import autobind from 'autobind-decorator';
import Category from 'components/Category';
import CommonConatiner from 'components/CommonContainer';
import PostList from 'components/PostList';
import { StringUtlz } from 'lib/Utlz';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import UserService from 'api/service/UserService';
import PostMngList from 'components/PostMngList';
import { PostStore } from 'store';


const PostContainer = styled.div`
    padding: 0 1rem;
`

const PostWrap = styled.div`
    margin-top: 2rem;
   
`

@inject('poststore')
@observer
class PostListPage extends React.Component<{poststore?:PostStore}, {}> {
    @observable private list: PostModel[] | null = null;

    @autobind
    async loadData(): Promise<void> {
        const category = this.props.poststore?.category;
        if(StringUtlz.isEmpty(category)) return;
        const posts = await PostService.getPostList(category || '');
        this.list = posts;
    }

    componentDidMount(): void {
        this.loadData();
    }

    render(): JSX.Element {
        const isLogin = UserService.procSettingLogin();
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