import Editor from 'components/Editor'
import BasicTemplate from 'components/templates/BasicTemplate'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'



interface Props extends RouteComponentProps<{ postid:string}>  {
}

class BlogWritePage extends React.Component<Props> {

    public goBlogList = () => {
        this.props.history.push("/")
    }

    public render() {
        return (
                <BasicTemplate>
                    <Editor  postID={this.props.match.params.postid} />
                </BasicTemplate>
        )
    }
}
export default BlogWritePage;
  