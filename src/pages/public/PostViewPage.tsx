import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import CommonConatiner from 'components/CommonContainer';
import PostView from 'components/PostView';
import { StringUtlz } from 'lib/Utlz';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class PostViewPage extends React.Component<RouteComponentProps<{postid:string}> & {}, {post:PostModel}> {

    readonly state = {
        post: {} as PostModel
    }

    async initialize():Promise<void> {
        const postID:string = this.props.match.params.postid
        if(!StringUtlz.isEmpty(postID)) {
            const data = await PostService.getPost(postID)
            this.setState({
                post: data
            })
        }
    }

    componentDidMount():void {
        this.initialize()
    }

    render():JSX.Element {
        const info:PostModel = this.state.post
        let PostViewJSX = (<></>)
        if(!StringUtlz.isEmpty(info.PostID)) {
            PostViewJSX = ( <PostView info={info}/>)
        }

        return (
            <CommonConatiner title={this.state.post.MainTitle} subTitle={this.state.post.SubTitle}>
                {PostViewJSX}
            </CommonConatiner>
        )
    }
}

export default withRouter(PostViewPage);