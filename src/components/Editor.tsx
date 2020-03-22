import React from 'react';
import { TbPost } from 'modules/Types';
import toastui from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';

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
    onChange: (info:TbPost) => void,
    postID:string,
    info: TbPost,
    goBlogList: () => void
}

interface State {}

class Editor extends React.Component<Props, State> {
    private editorEl = React.createRef<HTMLDivElement>();
    private editor: toastui | null = null;
    
    initialize = (): void => {

        const target = this.editorEl.current;
        if(target !== null)  {
            this.editor = new toastui({
                el: target,
                placeholder: "오늘 기록할 내용을 적어봐요 ~",
                previewStyle: 'vertical',
                initialEditType: 'markdown',
                height: 'inherit',
                // events: {
                //     "changeMode": () => { console.log("!!!!")}
                // }
            })
        }
        console.log(this.editor);
    }

    // EVENT FUNCTION
    componentDidMount = (): void => {
        this.initialize();
    }

    render = (): JSX.Element => {
        return (
            <EditorContainer>
            <EditorTitleWrap>
                <input type="text" placeholder="제목을 입력하세요"/>
            </EditorTitleWrap>
            <EditorWrap>
                <div ref={this.editorEl} ></div>
                <ButtonWrap>
                    <InputButton>기록하기</InputButton>
                </ButtonWrap>
            </EditorWrap>
            </EditorContainer>
        )
    }
}


export default Editor;