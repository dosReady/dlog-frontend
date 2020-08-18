import React from 'react';
import CommonConatiner from 'components/CommonContainer';
import PostMngList from 'components/PostMngList';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';

@observer
class PostManagementPage extends React.Component<{}, {}> {
    @observable private list: PostModel[] | null = null;

    async loadData(): Promise<void> {
        const posts = await PostService.getPostList("post");
        this.list = posts;
    }

    componentDidMount() :void {
        this.loadData();
    }

    render():JSX.Element {
        return ( 
            <CommonConatiner title="관리">
                <PostMngList list={this.list}/>
            </CommonConatiner>
        )
    }
}

export default PostManagementPage;