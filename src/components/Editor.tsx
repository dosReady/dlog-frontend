import toastui from '@toast-ui/editor';
import 'github-markdown-css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import React from 'react';
import styled from 'styled-components';
import { TbPost } from 'modules/Types';
import axios from 'axios';

const EditorContainer = styled.div`
margin-top: 1.5rem;
`
const EditorTitleWrap = styled.div`
display: flex;
flex-direction: column;
border-top: 10px solid rgb(0,61,84);
margin-top: 1.5rem;
box-shadow: rgba(0,0,0,0.04) 0px 4px 16px 0px;
border-radius: 4px;

input {
    border: none;
    outline: none;
    font-size: 1.25rem;
    padding: 1rem;
}
`

const EditorWrap = styled.div`
height: 600px;
border-top: 10px solid rgb(0, 61, 84);
box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
margin-top: 1.5rem;
`

const ButtonWrap = styled.div`
display: flex;
justify-content: flex-end;
margin-top: 1.5rem
`

const InputButton = styled.div`
padding: 0.6rem 1rem;
box-shadow: rgba(0,0,0,0.04) 0px 4px 16px 0px;
border-radius: 4px;
background-color: rgb(0,61,84);
color: white;
cursor: pointer;

&:hover {
    background-color:rgba(0, 61, 84, 0.72);
}
`

interface Props {
    postID:string,
}

interface State {
    post:TbPost
}

class Editor extends React.Component<Props, State> {
    private editorEl = React.createRef<HTMLDivElement>();
    private editorComp: toastui | null = null;

    constructor(props: Props) {
        super(props);
    
        this.state = {
            post: {
                MainTitle: "",
                Content: ""
            }
        };
    }

    initialize = (): void => {

        const target = this.editorEl.current;
        if(target !== null)  {
            this.editorComp = new toastui({
                el: target,
                placeholder: "오늘 기록할 내용을 적어봐요 ~",
                previewStyle: 'vertical',
                initialEditType: 'markdown',
                height: 'inherit',
                events: {
                    "change": this.onContentsChange
                }
                // events: {
                //     "changeMode": () => { console.log("!!!!")}
                // }
            })
        }
      
    }

    onPostSave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        this.saveProcess();
    }

    onTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            post:{
                ...this.state.post,
                MainTitle: event.currentTarget.value
            }
        })
    }

    onContentsChange = (): void => {
        if(this.editorComp != null) {
            this.setState({
                post: {
                    ...this.state.post,
                    Content:this.editorComp.getMarkdown()
                }
            })
        }
    }

    srchPostProcess = async () => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8080/api/get/post`, { info:{PostID: Number(this.props.postID)} })
            const tbPost: TbPost = data.info;
            this.setState({ post: tbPost });
            if(this.editorComp != null) {
                this.editorComp.setMarkdown(tbPost.Content !== undefined ? tbPost.Content : '');
            }

        } catch (error) {
            console.error(error)
        }
    }   


    saveProcess = async () => {        
        try {
            const parmas = {info: this.state.post}
            await axios.post(`http://127.0.0.1:8080/api/inst/post`, parmas);
            window.location.assign('/blog');
        } catch (error) {
            console.error(error);
        }
    }

    // EVENT FUNCTION
    componentDidMount = (): void => {
        this.initialize();
        this.srchPostProcess();
    }

    render = (): JSX.Element => {
        return (
            <EditorContainer>
            <EditorTitleWrap>
                <input type="text" placeholder="제목을 입력하세요" value={this.state.post.MainTitle || ""} onChange={this.onTitleChange}/>
            </EditorTitleWrap>
            <EditorWrap>
                <div ref={this.editorEl} ></div>
                <ButtonWrap>
                    <InputButton onClick={this.onPostSave}>기록하기</InputButton>
                </ButtonWrap>
            </EditorWrap>
            </EditorContainer>
        )
    }
}


export default Editor;