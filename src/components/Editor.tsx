import toastui from '@toast-ui/editor';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import autobind from 'autobind-decorator';
import 'codemirror/lib/codemirror.css';
import { StringUtlz } from 'lib/Utlz';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostStore } from 'store';
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
    .te-editor-section {
        background-color:#fff;
        .tui-editor {
            padding-left: 10px;
        }
        .te-ww-container {
            pre {
                color:#fff;
                background-color:#294854;
            }
            blockquote {
                background-color: transparent;
                border-left: 4px solid #f1d02e;
            }
        }
    }
    .tui-popup-body {
        color:#3a3649;
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
    padding: 10px 25px;
    overflow: auto;
    .tui-scrollsync , .tui-toolbar-divider{
        display:none!important;
    }
    .tui-editor-contents * {
        color: #F3F3F3;
    }

    .tui-editor-contents {
        blockquote {
            background-color: transparent;
            border-left: 4px solid #f1d02e;
        }

        h1,h2,h3{
            border:none;
        }

        pre {
            overflow-y:scroll;
            background-color:#294854;
        }
    }

    @media screen and (max-width: 900px) { 
        display:none;
    }
`
@inject('poststore')
@observer
class Editor extends React.Component<
    RouteComponentProps & {
        poststore?:PostStore
    }, 
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
        let editType = "markdown";
        if(this.isMobile()) {
            editType =  "wysiwyg";
        }


        const editorEl = this.editorEl.current!;
        this.editorComp = new toastui({
            el: editorEl,
            previewStyle: "tab",
            initialEditType: editType, // wysiwyg
            height: '100%',
            hideModeSwitch: true,
            events: {
                "change": this.onContentsChange,
                //"command": (arg:string) => {console.log(arg)}
            },
            toolbarItems: ["heading", "bold", "quote", "codeblock", "ul", "ol"]
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

    async loadData(): Promise<void> {
        const {poststore} = this.props;
        const postkey = poststore?.postkey;
        if(!StringUtlz.isEmpty(postkey)) {
            const data = await PostService.getPost(postkey || '');
            this.setState({
                post: data
            })

            this.editorComp!.setMarkdown(data.PostContent);
            this.viewerComp!.setMarkdown(data.PostContent);
        }
    }

    isMobile(): boolean {
        const userAgent = window.navigator.userAgent;
        if(userAgent.indexOf("iPhone") > -1)  return true;
        return false;
    }

    isCheck(): boolean {
        if(StringUtlz.isEmpty(this.state.post.PostTitle)) {
            toast.error("제목을 입력해주세요.");
            return false;
        }

        if(StringUtlz.isEmpty(this.state.post.PostContent)) {
            toast.error("내용을 입력해주세요.");
            return false;
        }

        return true;
    }

    async procSave():Promise<void> {
        const category = this.props.poststore?.category;
        if(StringUtlz.isEmpty(category)) {
            toast.error("카테고리 정보가 없습니다.");
            return;
        }

        await this.setState({
            post: {
                ...this.state.post,
                PostCategory: category || ''
            }
        });
        await PostService.inputPost(this.state.post);
        this.props.history.replace('/');
    }

    @autobind
    onClickSaveBtn():void {
        if(!this.isCheck()) return;
        this.procSave();
    }

    @autobind
    onClickBackBtn(): void {
        this.props.history.replace("/");
    }

    @autobind
    onContentsChange(): void {
        const sContents:string = this.editorComp!.getMarkdown();
        this.viewerComp!.setMarkdown(sContents);
        this.setState({
            post: {
                ...this.state.post,
                PostContent: sContents   
            }
        });
    }

    @autobind
    onChangeMainTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        const sTitle = event.currentTarget.value;
        this.setState({
            post: {
                ...this.state.post,
                PostTitle: sTitle
            }
        });
    }

    @autobind
    onClickPrvBtn():void {
        const sDispaly = this.editorEl.current!.style.display;
        
        if(sDispaly !==  "none") {
            this.editorEl.current!.style.display = "none";
            this.viewerEl.current!.style.display = "block";
            this.viewerEl.current!.style.borderLeft = "1px solid #e5e5e5";
        } else {
            this.editorEl.current!.style.display = "";
            this.viewerEl.current!.style.display = "";
            this.viewerEl.current!.style.borderLeft = "";
        }
       
    }

    componentDidMount(): void {
        this.initialize();
        this.loadData();
    }

    render():JSX.Element {
        return (
            <>
            <EditorTitleDiv>
                <input type="text" placeholder="제목을 입력하세요" 
                    value={this.state.post.PostTitle || ""} 
                    onChange={this.onChangeMainTitle}
                />
            </EditorTitleDiv>
            <EditorMiddleDiv>
                <EditorDiv ref={this.editorEl}/>
                <ViewerDiv ref={this.viewerEl}/>
            </EditorMiddleDiv>
            <EditorBtnWrap>
                <button onClick={this.onClickSaveBtn}>작성하기</button>
                <button onClick={this.onClickBackBtn}>뒤로가기</button>
                <button onClick={this.onClickPrvBtn}>미리보기</button>
            </EditorBtnWrap>
            </>
        )
    }
}

export default withRouter(Editor);