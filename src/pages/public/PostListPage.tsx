import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import CommonConatiner from 'components/CommonContainer';
import PostAside from 'components/PostAside';
import PostList from 'components/PostList';
import { StringUtlz } from 'lib/Utlz';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { observable } from 'mobx';
import { observer } from 'mobx-react';


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

@observer
class PostListPage extends React.Component<RouteComponentProps<{category:string}> & {}> {
    @observable private list: PostModel[] | null = null;

    async loadData(): Promise<void> {
        const posts = await PostService.getPostList(this.props.match.params.category);
        this.list = posts;
    }
    componentDidMount() :void {
        this.loadData();
    }

    getTitle(): string{
        let category = this.props.match.params.category;
        if(StringUtlz.isEmpty(category)) {
            category = "post";
        }
        return category;
    }

    render(): JSX.Element {
        return (
            <CommonConatiner title={this.getTitle()}>
               <PostWrap>
                    <PostLeftWrap>
                        <PostList list={this.list}/>
                    </PostLeftWrap>
                    <PostRightWrap>
                        <PostAside/>
                    </PostRightWrap>
                </PostWrap>
            </CommonConatiner>
        )
    }
    
}

export default withRouter(PostListPage);