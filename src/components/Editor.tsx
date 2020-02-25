import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';
import 'resources/css/index.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import {TbPost} from 'modules/Types';
import axios from 'axios';

interface Props {
    onChange: (info:TbPost) => void,
    postID:Number,
    info: TbPost
}

class Editor extends React.Component<Props> {
    private textArea= React.createRef<HTMLTextAreaElement>();
    private editor:CodeMirror.EditorFromTextArea | null = null;

    // EVENT FUNCTION
    componentDidMount = (): void => {
        this.initialize()
        this.callPostInfo()
    }

    onEditorChange = (cm: CodeMirror.Editor) => {
        this.props.onChange({
            ...this.props.info,
            Content: cm.getValue()
        });
    }

    onMainTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange({
            ...this.props.info,
            MainTitle: e.target.value
        });
    }
    onSubTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange({
            ...this.props.info,
            SubTitle: e.target.value
        });
    }

    onBtnRegClick = () => {
        let sType = "I"
        if( this.props.postID > 0) sType = "U"
        this.callApiPost(sType, this.props.info)
    }

    // BIZ FUNCTION
    callApiPost = async (sType:string, obj:TbPost) => {
        try {
            const parmas = {type: sType, info: obj}
            await axios.post(`http://127.0.0.1:8080/api/inst/post`, parmas);
        } catch (error) {
            console.error(error);
        }
        
    }

    callPostInfo = async () => {
        let tbPost: TbPost = {
            PostID: 0,
            MainTitle: '',
            SubTitle: '',
            Content: '',
            TagID: 0
        }
        if(this.props.postID > 0) {
            try {
                const { data } = await axios.post(`http://127.0.0.1:8080/api/get/post`, { info:{PostID: Number(this.props.postID) }})
                tbPost = data.info
                this.props.onChange(tbPost);

                if( this.editor != null ) {
                    const content = this.props.info.Content === undefined ? '' : this.props.info.Content
                    this.editor.setValue(content)
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            
            this.props.onChange(tbPost);
        }
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

        this.editor.on('change', this.onEditorChange)
    }

    render = (): JSX.Element => {
        return (
            <div className="editor-wrap">
                <div className="title-form">
                    <div className="main-wrap">
                        <input type="text" placeholder="제목을 입력하세요."  value={this.props.info.MainTitle} onChange={this.onMainTitleChange}/>
                    </div>
                    <div className="alis-wrap">
                        <input type="text" placeholder="간략한 설명을 입력하세요." value={this.props.info.SubTitle} onChange={this.onSubTitleChange}/>
                    </div>
                    <div className="tag-wrap">
                        <div className="tag-item">tag</div>
                        <div className="tag-item">tag</div>
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
                        <button onClick={this.onBtnRegClick}>등록</button>
                    </div>
                    <div className="content-textarea">
                         <textarea ref={this.textArea}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}


export default Editor