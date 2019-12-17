import React from 'react';
import Editor from '../../components/Editor';
import Preview from '../../components/Preview';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {RootState, editorActions} from '../../modules';
import '../../resources/css/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';

interface StateProps {
    title: string;
    html: string;
}
interface DispatchProps {
    EditorActions: typeof editorActions
}
interface OwnProps {}

type BlogWriteConatinerPrps = StateProps & DispatchProps & OwnProps;

class BlogWritePage extends React.Component<BlogWriteConatinerPrps> {

    public onChange = (html:string) => {
        this.props.EditorActions.write(html);
    }

    public render() {
        return (
            <div className ="blog-write-page">
                <div className="page-header">
                    <span className="title">글 입력하기</span>
                    <div className="buttons">
                    </div>
                </div>
                <div className="input-wrap">
                    <input type="text" placeholder= "제목을 입력하세요."/>
                </div>
                <div className="page-content">
                    <Editor onChange={this.onChange}/>
                    <div className="separator"></div>
                    <Preview title={this.props.title} html={this.props.html}/>
                </div>
            </div>
        )
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    ({editor}) => ({
       title: editor.title,
       html: editor.html 
    }),
    (dispatch: Dispatch) => ({ EditorActions : bindActionCreators(editorActions, dispatch)})
)(BlogWritePage);