import React from 'react'
import Editor from 'components/Editor'
import Preview from 'components/Preview'
import 'resources/css/index.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/nord.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import TopMenuTemplate from 'components/templates/TopMenuTemplate'
import {TbPost} from 'modules/Types'
import {bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postActions } from 'modules/redux/PostRedux';
import { RootState } from 'modules/redux';

interface Props {
    match: {
        params: {
            post_id:Number
        }
    }
    info: TbPost
    PostActions: typeof postActions;
}

class BlogWritePage extends React.Component<Props> {
    public onChange = (rtn:TbPost) => {
        this.props.PostActions.setPost(rtn)
    }

    public render() {
        return (
            <TopMenuTemplate>
                <div className ="blog-write-page">
                    <Editor  info={this.props.info} onChange={this.onChange} postID={this.props.match.params.post_id}/>
                    <Preview info={this.props.info}/>
                </div>
            </TopMenuTemplate>
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