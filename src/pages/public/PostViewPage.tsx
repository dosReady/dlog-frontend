import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import CommonConatiner from 'components/CommonContainer';
import PostView from 'components/PostView';
import { StringUtlz } from 'lib/Utlz';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class PostViewPage extends React.Component<RouteComponentProps<{postkey:string}> & {}, {post:PostModel}> {

    readonly state = {
        post: {} as PostModel
    }

    async initialize():Promise<void> {
        const postkey:string = this.props.match.params.postkey;
        if(!StringUtlz.isEmpty(postkey)) {
            const data = await PostService.getPost(postkey)
            this.setState({
                post: data
            })
        }
    }

    componentDidMount():void {
        this.initialize()
    }

    render():JSX.Element {
        const info:PostModel = this.state.post;
        let PostViewJSX = (<></>)
        if(!StringUtlz.isEmpty(info.PostKey)) {
            PostViewJSX = ( <PostView info={info}/>)
        }

        return (
            <CommonConatiner title={this.state.post.PostTitle} subTitle={this.state.post.PostSubTitle}>
                {PostViewJSX}
            </CommonConatiner>
        )
    }
}

export default withRouter(PostViewPage);