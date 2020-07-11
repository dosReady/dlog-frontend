import React from 'react';
import toastui from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Post, Tag } from '@types';
import autobind from 'autobind-decorator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BlogRepo from './BlogRepo';
import styled from 'styled-components';
//import {toast} from 'react-toastify';
import BlogModalComp from 'org/dlog/blog/BlogModalComp';

const BlogEditorWrap = styled.div`
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
    margin-left: 1rem;
    button.save {
        background-color:#2A3D4E;
        margin-right:1rem;
        :hover {
            background-color: #456582;
        }
    }
    button.back {
        color:#2A3D4E;
        font-weight:900;
    }
`


@observer
class BlogEditorComp extends React.Component<RouteComponentProps<{postid: string}>, {isSave:boolean}> {
    private editorEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;

    readonly state = {
        isSave: false
    }

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
                height: 'inherit',
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

    @autobind
    onClickSaveBtn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void {
        this.setState({
            isSave: true
        })
        //this.savePost();
        /*
        toast.success("Success Notification !", {
            position: "top-center"
        });
        */
        
    }

    @autobind
    onClickBackBtn(): void {
        this.props.history.replace("/blog");
    }

    onContentsChange = (): void => {
        const contents:string = this.editorComp?.getMarkdown()|| '';
        this.post.Content = contents;
    }

    componentDidMount(): void {
        this.initialize();
        this.srchPost();
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
            <BlogEditorWrap onClick={this.onEditorBodyClick}>
                <div ref={this.editorEl}></div>
                <EditorBtnWrap>
                    <button className="save" onClick={this.onClickSaveBtn}>블로그 작성하기</button>
                    <button className="back" onClick={this.onClickBackBtn}>뒤로가기</button>
                </EditorBtnWrap>
            </BlogEditorWrap>
            {this.state.isSave && <BlogModalComp post={this.post} tags={this.tags} callback={this.onCallBack}/>}
            </>
        )
    }
}

export default withRouter(BlogEditorComp);