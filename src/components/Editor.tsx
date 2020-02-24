import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';
import '../resources/css/index.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import {PostInfo} from 'modules/Types';
import axios from 'axios';

// quil
interface Props {
    onChange: (info:PostInfo) => void,
}
interface State {
    mainTitle:string,
    alisTxt: string,
    html:string
}

class Editor extends React.Component<Props, State> {
    readonly state = {
        mainTitle: '',
        alisTxt: '',
        html: ''
    }
    private textArea= React.createRef<HTMLTextAreaElement>();
    private editor:CodeMirror.EditorFromTextArea | null = null;

    onEditorChange = (cm: CodeMirror.Editor) => {
        this.setState({html: cm.getValue()});
        const postInfo = this.setPostInfo({html: cm.getValue()});
        this.props.onChange(postInfo);
    }

    onMainTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({mainTitle: e.target.value});
        const postInfo = this.setPostInfo({mainTitle: e.target.value});
        this.props.onChange(postInfo);
    }

    setPostInfo = (info:PostInfo): PostInfo => {

        const html = info.html === undefined ? this.state.html : info.html;
        const alisTxt = info.alisTxt === undefined ?  this.state.alisTxt : info.alisTxt;
        const mainTitle = info.mainTitle === undefined ? this.state.mainTitle : info.mainTitle;

        const postInfo:PostInfo = {
            mainTitle: mainTitle,
            alisTxt: alisTxt,
            html: html
        }

        return postInfo;
    }

    getPostInfo = (): PostInfo => {
        return this.setPostInfo({});
    }

    fnProcMngPost = async () => {
        await this.callApiPost('', this.getPostInfo());
    }

    callApiPost = async (type:string, obj:PostInfo) => {
        try {
            await axios.post(`http://127.0.0.1:8080/api/inst/post`, obj);
        } catch (error) {
            console.error(error);
        }
        
    }

    componentDidMount = (): void => {
       this.initialize();
    }
    initialize = (): void => {
        if (!this.textArea.current) return;

        this.editor = CodeMirror.fromTextArea(this.textArea.current, {
            mode: 'markdown',
            theme: 'yeti',
            placeholder: '당신의 이야기를 적어보세요...',
            viewportMargin: Infinity,
            lineWrapping: true,
        });

        this.editor.on('change', this.onEditorChange);
    }

    render = (): JSX.Element => {
        return (
            <div className="editor-wrap">
                <div className="title-form">
                    <div className="main-wrap">
                        <input type="text" placeholder="제목을 입력하세요." onChange={this.onMainTitleChange}/>
                    </div>
                    <div className="alis-wrap">
                        <input type="text" placeholder="간략한 설명을 입력하세요."/>
                    </div>
                    <div className="tag-wrap">
                        <input type="text" placeholder="태그를 입력하세요."/>
                    </div>
                </div>
                <div className="contents-form">
                    <div className="editor-buttons">
                        <i className="fas fa-heading"></i>
                        <i className="fas fa-bold"></i>
                        <i className="fas fa-list-ul"></i>
                        <i className="fas fa-list-ol"></i>
                        <i className="fas fa-images"></i>
                        <i className="fas fa-link"></i>
                        <i className="fas fa-code"></i>
                        <i className="fas fa-table"></i>
                        <i className="fas fa-palette"></i>
                        <button onClick={this.fnProcMngPost}>등록</button>
                    </div>
                    <div className="content-textarea">
                         <textarea ref={this.textArea}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}


export default Editor;