import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import CommonConatiner from 'components/CommonContainer';
import PostAside from 'components/PostAside';
import PostList from 'components/PostList';
import React from 'react';
import styled from 'styled-components';


const PostWrap = styled.div`
    margin-top: 4rem;
    display:flex;
    justify-content:space-between;
`

const PostLeftWrap = styled.div`
    max-width: 750px;
    flex: 1 1 0%;
    padding: 0 1rem;
    @media screen and (max-width: 900px) { 
        width: 100%;
    }
`

const PostRightWrap = styled.div`
    margin-left: 1.5rem;
    padding: 0rem 1rem 0;
    width: 300px;
    @media screen and (max-width: 900px) { 
        display:none;
    }
`

interface State {
    list: PostModel[]
}

class PostListPage extends React.Component<{title:string}, State> {

    readonly state = {
        list: []
    }

    async loadData(): Promise<void> {
        const posts = await PostService.getPostList();
        console.log(posts)
        this.setState({
            list: posts
        })
    }

    componentDidMount() :void {
       this.loadData();
    }

    render(): JSX.Element {
        return (
            <CommonConatiner title={this.props.title}>
               <PostWrap>
                    <PostLeftWrap>
                        <PostList list={this.state.list}/>
                    </PostLeftWrap>
                    <PostRightWrap>
                        <PostAside/>
                    </PostRightWrap>
                </PostWrap>
            </CommonConatiner>
        )
    }
    
}

export default PostListPage;