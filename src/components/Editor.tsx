import toastui from '@toast-ui/editor';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import autobind from 'autobind-decorator';
import 'codemirror/lib/codemirror.css';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const EditorBtnWrap = styled.div`
    margin-top:1rem;
    padding-bottom: 1rem;
    button {
        border: 1px solid #F3F3F3;
        margin-right:1rem;
        :hover {
            background-color: #456582;
        }
    }
`

const EditorDiv = styled.div`
    flex:1;
    .tui-scrollsync , .tui-toolbar-divider{
        display:none!important;
    }
    .tui-editor-contents * {
            
    }
    .CodeMirror,
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
            padding-left: 25px!important;
            padding-right: 25px!important;
        }
    }
    .te-markdown-tab-section { display:none!important; }
`

const EditorTitleDiv = styled.div`
    padding: 18px 25px;
    background-color: #fff;
    input {
        font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif!important;
        color: #181818!important;
        width: 100%;
    }
`

const EditorMiddleDiv = styled.div`
    flex: 1;
    display:flex;
    flex-direction:row;
    overflow: hidden;
`


const ViewerDiv = styled.div`
    flex:1;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    border-top: 2px solid #e5e5e5e5;
    padding: 0 25px;
    overflow: scroll;
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

class Editor extends React.Component<
    RouteComponentProps<{postid: string}>, 
    {post: PostModel, title:string}
> {
    private editorEl = React.createRef<HTMLDivElement>();
    private viewerEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;
    private viewerComp: Viewer | null = null;

    readonly state = {
        post: {} as PostModel,
        title: ""
    }

    initialize(): void {
        const editorEl = this.editorEl.current!;
        this.editorComp = new toastui({
            el: editorEl,
            placeholder: "오늘 기록할 내용을 적어봐요 ~",
            previewStyle: 'tab',
            initialEditType: 'markdown', // wysiwyg
            height: '100%',
            hideModeSwitch: true,
            events: {
                "change": this.onContentsChange,
                //"command": (arg:string) => {console.log(arg)}
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
        });

        const viewerEl = this.viewerEl.current!;
        this.viewerComp = new Viewer({
            el: viewerEl
        });
    }

    async procSave():Promise<void> {
        await PostService.savePost(this.state.post);
        this.props.history.replace("/");
    }

    @autobind
    onClickSaveBtn():void {
       this.procSave();
    }

    @autobind
    onClickBackBtn(): void {
        this.props.history.replace("/");
    }

    @autobind
    onContentsChange(): void {
        const contents:string = this.editorComp!.getMarkdown();
        this.viewerComp!.setMarkdown(contents);
        this.setState({
            post: {
                ...this.state.post,
                Content: contents   
            }
        });
    }

    @autobind
    onChangeMainTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        const sMainTitle = event.currentTarget.value;
        this.setState({
            post: {
                ...this.state.post,
                MainTitle: sMainTitle
            }
        });
    }

    componentDidMount(): void {
        this.initialize();
    }

    render():JSX.Element {
        return (
            <>
            <EditorTitleDiv>
                <input type="text" placeholder="제목을 입력하세요" value={this.state.post.MainTitle || ""} onChange={this.onChangeMainTitle}/>
            </EditorTitleDiv>
            <EditorMiddleDiv>
                <EditorDiv ref={this.editorEl}/>
                <ViewerDiv ref={this.viewerEl}/>
            </EditorMiddleDiv>
            <EditorBtnWrap>
                <button className="save" onClick={this.onClickSaveBtn}>블로그 작성하기</button>
                <button className="back" onClick={this.onClickBackBtn}>뒤로가기</button>
            </EditorBtnWrap>
            </>
        )
    }
}

export default withRouter(Editor);