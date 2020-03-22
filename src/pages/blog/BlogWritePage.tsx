import React from 'react'
import Editor from 'components/Editor'
import {TbPost} from 'modules/Types'
import {bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postActions } from 'modules/redux/PostRedux';
import { RootState } from 'modules/redux';
import { RouteComponentProps } from 'react-router-dom'
import BasicTemplate from 'components/templates/BasicTemplate'

interface MatchParams {
    post_id:string
}
interface Props extends RouteComponentProps<MatchParams>  {
    info: TbPost,
    PostActions: typeof postActions
}

class BlogWritePage extends React.Component<Props> {
    public onChange = (rtn:TbPost) => {
        this.props.PostActions.setPost(rtn)
    }

    public goBlogList = () => {
        this.props.history.push("/")
    }

    public render() {
        return (
                <BasicTemplate>
                    <Editor  info={this.props.info} postID={this.props.match.params.post_id} onChange={this.onChange} goBlogList={this.goBlogList} />
                </BasicTemplate>
        )
    }
}
export default connect(
    ({post}: RootState) => ({
       info: post
    }),
    (dispatch) => ({
      PostActions: bindActionCreators(postActions, dispatch),
    })
  )(BlogWritePage);
  