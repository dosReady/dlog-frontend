import React from 'react';
import Editor from '../../components/Editor';
import Preview from '../../components/Preview';
import '../../resources/css/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';
import {PostInfo} from 'modules/Types';

interface State {
    info: PostInfo
}

interface Props {}

class BlogWritePage extends React.Component<Props, State> {
    readonly state = {
        info: {
            mainTitle: '',
            alisTxt: '',
            html: ''
        }
    }


    public onChange = (rtn:PostInfo) => {
        this.setState({info: rtn});
    }

    public render() {
        return (
            <TopMenuTemplate>
            <div className ="blog-write-page">
                <Editor onChange={this.onChange}/>
                <Preview info={this.state.info}/>
            </div>
            </TopMenuTemplate>
        )
    }
}

export default BlogWritePage;