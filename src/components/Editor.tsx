import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';
import '../resources/css/index.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

// quil
interface Props {
    onChange: (html:string) => void,
}
interface State {
    title:string,
    html:string
}

class Editor extends React.Component<Props, State> {
    private textArea= React.createRef<HTMLTextAreaElement>();
    private editor:CodeMirror.EditorFromTextArea | null = null;

    onEditorChange = (cm: CodeMirror.Editor) => {
        this.props.onChange(cm.getValue());
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
                </div>
                <textarea ref={this.textArea}></textarea>
            </div>
        )
    }
}


export default Editor;