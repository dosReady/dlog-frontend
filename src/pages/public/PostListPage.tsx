import { Post } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import PostList from 'components/PostList';
import CommonConatiner from 'components/CommonContainer';
import React from 'react';
import styled from 'styled-components';
import PostAside from 'components/PostAside';


const PostWrap = styled.div`
    margin-top: 4rem;
    display:flex;
    justify-content:space-between;
`

const PostLeftWrap = styled.div`
    max-width: 750px;
    flex: 1 1 0%;
    padding: 0 1rem;
`

const PostRightWrap = styled.div`
    margin-left: 1.5rem;
    padding: 0rem 1rem 0;
    width: 300px;
`

interface State {
    list: Post[]
}

class PostListPage extends React.Component<{}, State> {

    readonly state = {
        list: []
    }

    async loadData(): Promise<void> {
        const [articles, ] = await PostService.getPostList();
        this.setState({
            list: articles
        })
    }

    componentDidMount() :void {
       this.loadData();
    }

    render(): JSX.Element {
        return (
            <CommonConatiner>
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