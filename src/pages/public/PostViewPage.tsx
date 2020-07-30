import React from 'react';
import CommonConatiner from 'components/CommonContainer';
import PostService from 'api/service/PostService'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { StringUtlz } from 'lib/Utlz'
import { Post } from 'api/model/PostModels';
import PostView from 'components/PostView';

class PostViewPage extends React.Component<RouteComponentProps<{postid:string}> & {}, {post:Post}> {

    readonly state = {
        post: {}
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
        const info:Post = this.state.post
        let PostViewJSX = (<></>)
        if(!StringUtlz.isEmpty(info.PostID)) {
            PostViewJSX = ( <PostView info={info}/>)
        }

        return (
            <CommonConatiner>
                {PostViewJSX}
            </CommonConatiner>
        )
    }
}

export default withRouter(PostViewPage);