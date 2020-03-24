import Editor from 'components/Editor'
import BasicTemplate from 'components/templates/BasicTemplate'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'


interface MatchParams {
    post_id:string
}
interface Props extends RouteComponentProps<MatchParams>  {
}

class BlogWritePage extends React.Component<Props> {

    public goBlogList = () => {
        this.props.history.push("/")
    }

    public render() {
        return (
                <BasicTemplate>
                    <Editor  postID={this.props.match.params.post_id} />
                </BasicTemplate>
        )
    }
}
export default BlogWritePage;
  