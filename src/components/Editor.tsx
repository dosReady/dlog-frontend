import autobind from 'autobind-decorator';
import 'codemirror/lib/codemirror.css';
import toastui from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PostService from 'api/service/PostService';
import { Post } from 'api/model/PostModels';

const EditorWrap = styled.div`
    height: calc(100% - 65px);
    .CodeMirror-wrap {
        padding:0 10px;
    }

    input {
        font-size: 20px;
    }
    
`

const EditorBtnWrap = styled.div`
    margin-top:1rem;
    button {
        border: 1px solid #F3F3F3;
        margin-right:1rem;
        :hover {
            background-color: #456582;
        }
    }
`

const ViewerWrap = styled.div`
    .tui-scrollsync , .tui-toolbar-divider{
        display:none!important;
    }
    .tui-editor-contents * {
        color: #F3F3F3;
    }

    .tui-editor-contents {
        blockquote {
            background-color: transparent; 
        }

        h1,h2,h3{
            border:none;
        }

        pre {
            overflow-y:scroll;
            background-color:#294854;
        }
    }
    
`


@observer
class Editor extends React.Component<RouteComponentProps<{postid: string}>, {isSave:boolean}> {
    private editorEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;

    readonly state = {
        isSave: false
    }

    initialize(): void {
        const target = this.editorEl.current!;
        this.editorComp = new toastui({
            el: target,
            placeholder: "오늘 기록할 내용을 적어봐요 ~",
            previewStyle: 'vertical',
            initialEditType: 'markdown', // wysiwyg
            height: 'inherit',
            hideModeSwitch: true,
            events: {
                "change": this.onContentsChange,
//                    "command": (arg:string) => {console.log(arg)}
            },
            toolbarItems: ["heading", "bold", "link", "image", "code", "ul", "ol"]
            // toolbarItems: [{
            //     type: "button",
            //     options: {
            //         className: "fas fa-search",
            //         text: "TEST",
            //         command: "test1",
            //     }
            // }]
            // // events: {
            //     "changeMode": () => { console.log("!!!!")}
            // }
        })
    }

    @autobind
    onClickSaveBtn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void {
        const comp = this.editorComp!

        let param:Post = {
            MainTitle: "",
            SubTitle: "test",
            Content: comp.getMarkdown()
        }
        PostService.savePost(param);
    }

    @autobind
    onClickBackBtn(): void {
        this.props.history.replace("/blog");
    }

    onContentsChange = (): void => {
        //const contents:string = this.editorComp?.getMarkdown()|| '';
    }

    componentDidMount(): void {
        this.initialize();
    }

    @autobind
    onCallBack():void {
        this.setState({
            isSave:false
        });
    }

    @autobind
    onEditorBodyClick():void {
        if(this.state.isSave) {
            this.setState({
                isSave: false
            });
        }
    }

    render():JSX.Element {
        return (
            <>
            <EditorWrap onClick={this.onEditorBodyClick}>
                <ViewerWrap ref={this.editorEl}></ViewerWrap>
                <EditorBtnWrap>
                    <button className="save" onClick={this.onClickSaveBtn}>블로그 작성하기</button>
                    <button className="back" onClick={this.onClickBackBtn}>뒤로가기</button>
                </EditorBtnWrap>
            </EditorWrap>
            </>
        )
    }
}

export default withRouter(Editor);