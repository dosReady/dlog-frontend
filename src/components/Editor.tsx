import toastui from '@toast-ui/editor';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { IPostModel, ITagModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import autobind from 'autobind-decorator';
import 'codemirror/lib/codemirror.css';
import { StringUtlz } from 'lib/Utlz';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    .tui-editor-defaultUI-toolbar {
        padding: 0 12px;
    }

    .tui-popup-body {
        color:#3a3649;
    }

    .te-markdown-tab-section { display:none!important; }
`

const EditorTitleDiv = styled.div`
    background-color: #fff;
    color: #181818!important;
`

const EditorTitleWrap = styled.div`
    border-bottom: 1px solid #e5e5e5;
    padding: 18px 12px;
    input {
        width: 100%;
    }
`

const EditorTagWrap = styled.div`
    padding: 10px 12px;
    overflow-y: scroll;
    ul {
        display:flex;
        align-items: center;
        li:not(:last-child) {
            margin-right: 4px;
        }
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

const TagItem = styled.div`
    display: inline-block;
    background-color: #282d35;
    color: white;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    cursor:pointer;
    transition: all 0.3s ease 0s;
    :hover {
        transform: translateY(-7px);
    }
    span:nth-child(1) {
        margin-right: 8px;
    }
    span:nth-child(2) {
        font-size:0.85rem;
        font-weight:bold;
    }
`

@inject('postservice')
@observer
class Editor extends React.Component<
    RouteComponentProps & {
        postservice?:PostService
    }, 
    {post: IPostModel, title:string, tags:ITagModel[]}
> {
    private editorEl = React.createRef<HTMLDivElement>();
    private viewerEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;
    private viewerComp: Viewer | null = null;

    readonly state = {
        post: {} as IPostModel,
        title: "",
        tags: [] as ITagModel[]
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
        const {postservice} = this.props;
        const postkey = postservice?.postkey;
        if(!StringUtlz.isEmpty(postkey)) {
            const [postdata, tagdata] = await postservice!.getPost(postkey || '');

            this.setState({
                post: postdata,
                tags: tagdata
            });

            this.editorComp!.setMarkdown(postdata.PostContent);
            this.viewerComp!.setMarkdown(postdata.PostContent);
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
        const category = this.props.postservice?.category;
        if(StringUtlz.isEmpty(category)) {
            toast.error("카테고리 정보가 없습니다.");
            return;
        }

        await this.setState({
            post: {
                ...this.state.post,
                PostCategory: category || '',
                Tags: this.state.tags
            }
        });

        await this.props.postservice?.inputPost(this.state.post);
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

    @autobind
    onUpdateTags(event: React.KeyboardEvent<HTMLInputElement>):void {
        const keycode = event.keyCode;
        const postvalue =  event.currentTarget.value.replace(",", "");
        let copyTags = [...this.state.tags];
        if(keycode === 188 && !StringUtlz.isEmpty(postvalue)) {
            const index = copyTags.findIndex((value:ITagModel) => postvalue === value.TagName);
            if(index === -1) {
                copyTags.push({TagName:  postvalue} as ITagModel);
            } else {
               if(copyTags[index].IsDel === "Y") {
                    copyTags[index].IsDel = "N";
               }
            }

            this.setState({
                tags: copyTags
            });
            event.currentTarget.value = "";
        }
        if(keycode === 8 
        && StringUtlz.isEmpty(postvalue)
        && copyTags.length > 0) {
            let index = -1;
            for(let i= copyTags.length -1; i >= 0; i--) {
                if(copyTags[i].IsDel === "N" 
                || StringUtlz.isEmpty(copyTags[i].IsDel)) {
                    index = i;
                    break;
                }
            }
            if(index > -1) {
                copyTags[index].IsDel = "Y";
                this.setState({
                    tags: copyTags
                });
            }
        }
    }

    @autobind
    onRemoveTag(target:ITagModel):void {
        let copyTags = [...this.state.tags];
        const index = copyTags.findIndex((value:ITagModel) => target.TagName === value.TagName);
        if(index > -1) {
            copyTags[index].IsDel = "Y";
            this.setState({
                tags: copyTags
            })
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
                <EditorTitleWrap>
                    <input type="text" placeholder="제목을 입력하세요" 
                    value={this.state.post.PostTitle || ""} 
                    onChange={this.onChangeMainTitle}
                    />
                </EditorTitleWrap>
                <EditorTagWrap>
                   <ul>
                       {this.state.tags.map( (value:ITagModel, i:any) => value.IsDel !== "Y" && (
                            <li key = {i}>
                                <TagItem onClick={() => this.onRemoveTag(value)}> 
                                    <span>{value.TagName}</span>
                                    <span>X</span>
                                </TagItem>
                            </li>
                       ))}
                       <li> 
                            <input type="text" placeholder="태그를입력하세요" 
                            onKeyUp={this.onUpdateTags}
                            />
                        </li>
                   </ul>
                </EditorTagWrap>
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