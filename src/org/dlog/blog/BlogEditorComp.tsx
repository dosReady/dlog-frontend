import React from 'react';
import toastui from '@toast-ui/editor';
import 'github-markdown-css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Post } from '@types';
import { BlogEditorWrap, EditorTopWrap, EditorBtnWrap } from 'org/dlog/blog/BlogStyledComp';
import autobind from 'autobind-decorator';

@observer
class BlogEditorComp extends React.Component {
    private editorEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;
    @observable private post:Post = {
        PostID: 0,
        MainTitle: "",
        Content: ""
    };

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

    onContentsChange = (): void => {
        const contents:string = this.editorComp?.getMarkdown()|| '';
        this.post.Content = contents;
    }

    @autobind
    onChangeMainTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        this.post.MainTitle = event.currentTarget.value;
    }

    componentDidMount(): void {
        this.initialize();
    }

    render():JSX.Element {
        return (
            <BlogEditorWrap>
                <EditorTopWrap>
                    <div><input type="text" maxLength={100} placeholder="제목을 입력하세요." onChange={this.onChangeMainTitle}/></div>
                    <div><input type="text" maxLength={100} placeholder="요약 내용을 입력해주세요."/></div>
                    <div><input type="text" maxLength={100} placeholder="태그를 입력해주세요."/></div>
                </EditorTopWrap>
                <div ref={this.editorEl} ></div>
                <EditorBtnWrap><button>블로그 작성하기</button><button>목록</button></EditorBtnWrap>
            </BlogEditorWrap>
        )
    }
}

export default BlogEditorComp;