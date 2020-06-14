import React from 'react';
import toastui from '@toast-ui/editor';
import 'github-markdown-css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { Post, PostDTO, Tag } from '@types';
import { BlogEditorWrap, EditorTopWrap, EditorBtnWrap, TagWrap } from 'org/dlog/blog/BlogStyledComp';
import autobind from 'autobind-decorator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BlogRepo from './BlogRepo';

@observer
class BlogEditorComp extends React.Component<RouteComponentProps<{postid: string}>, {}> {
    private editorEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;
    @observable private post:Post = {
        PostID: "",
        MainTitle: "",
        SubTitle: "",
        Content: ""
    };

    @observable private tagName:string = "";
    @observable private tags:Tag[] = [];

    initialize = (): void => {
        const target = this.editorEl.current;
        if(target !== null)  {
            this.editorComp = new toastui({
                el: target,
                placeholder: "오늘 기록할 내용을 적어봐요 ~",
                previewStyle: 'vertical',
                initialEditType: 'markdown',
                height: '500px',
                hideModeSwitch: true,
                events: {
                    "change": this.onContentsChange,
//                    "command": (arg:string) => {console.log(arg)}
                },
                toolbarItems: ["heading", "bold", "italic", "link", "image", "quote", "code", "ul", "ol"]
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
    }
    async srchPost():Promise<void> {
        this.post.PostID = this.props.match.params.postid;
        let post:Post = {        
            PostID: "",
            Content: "",
            CreatedAt: new Date(),
            MainTitle: "",
            SubTitle: "",
            UpdatedAt: new Date()
        };

        if(parseInt(this.post.PostID) !== 0) {
            post.PostID =this.props.match.params.postid;
            const data = await BlogRepo.srchPost(post.PostID);
            this.post = data.post;
            this.tags = data.tags;
            this.editorComp!.setMarkdown(this.post.Content !== undefined ? this.post.Content : '');
        }
    }

    async savePost():Promise<void> {
        const param:PostDTO = {
            post: this.post,
            tags: this.tags
        }
        await BlogRepo.mngPost(param);
        this.props.history.push("/blog");
    }

    @autobind
    onClickTagDel(tagMstID:string): void {
        for(var i=0; this.tags.length; i++) {
            if(this.tags[i].TagMstID === tagMstID) {
                this.tags.splice(i, 1);
                break;
            }
        }
    }

    @autobind
    onClickSaveBtn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void {
        if(window.confirm("작성하시겠습니까?"))  this.savePost();
    }

    @autobind
    onClickBackBtn(): void {
        this.props.history.replace("/blog");
    }

    onContentsChange = (): void => {
        const contents:string = this.editorComp?.getMarkdown()|| '';
        this.post.Content = contents;
    }

    @autobind
    onChangeMainTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        this.post.MainTitle = event.currentTarget.value;
    }
    @autobind
    onChangeSubTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        this.post.SubTitle = event.currentTarget.value;
    }

    @autobind
    onChangeTag(event: React.ChangeEvent<HTMLInputElement>): void {
        if(event.currentTarget.value !== ",") {
            this.tagName = event.currentTarget.value;
        }
    }

    @autobind
    onKeyDownTagInput(event: React.KeyboardEvent<HTMLInputElement>):void {
        
        if(event.keyCode === 188) { // COMMA
            this.tagName = "";
            if(this.tags.length > 5)  {
                alert("5개만 등록가능합니다."); 
                return;
            }

            for(var i=0; i < this.tags.length; i++) {
                if(this.tags[i].TagName ===  event.currentTarget.value) {
                    alert(`이미 등록되어있습니다. - ${this.tags[i].TagName}`); 
                    return;
                }
            }

            const tag: Tag = {
                TagMstID: "",
                TagName: event.currentTarget.value
            }
            
            if(tag.TagName.length > 0) this.tags.push(tag);
        }
    }

    componentDidMount(): void {
        this.initialize();
        this.srchPost();
    }

    render():JSX.Element {
        const tagList = toJS(this.tags);

        return (
            <BlogEditorWrap>
                <EditorTopWrap>
                    <div><input type="text" maxLength={100} placeholder="제목을 입력하세요." onChange={this.onChangeMainTitle} value={this.post.MainTitle}/></div>
                    <div><input type="text" maxLength={100} placeholder="요약 내용을 입력해주세요." onChange={this.onChangeSubTitle} value={this.post.SubTitle}/></div>
                    <TagWrap>
                        <ul>
                            {
                                tagList.map(
                                    (data:Tag, i:any) => (
                                        <li key={i} onClick={() => {this.onClickTagDel(data.TagMstID)}}><span>#{data.TagName}</span><i className="fas fa-minus"></i></li>
                                    )
                                )
                            }
                        </ul>
                        <input type="text" maxLength={100} placeholder="태그를 입력해주세요." onKeyDown={this.onKeyDownTagInput} value={this.tagName} onChange={this.onChangeTag}/>
                    </TagWrap>
                </EditorTopWrap>
                <div ref={this.editorEl}></div>
                <EditorBtnWrap>
                    <button className="save" onClick={this.onClickSaveBtn}>블로그 작성하기</button>
                    <button className="back" onClick={this.onClickBackBtn}>뒤로가기</button>
                </EditorBtnWrap>
            </BlogEditorWrap>
        )
    }
}

export default withRouter(BlogEditorComp);