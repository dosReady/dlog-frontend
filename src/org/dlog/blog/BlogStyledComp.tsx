import styled from "styled-components";

export const BlogListWrap = styled.ul`
    list-style:none;
    padding:0;
    margin: 0;
    li {
        margin-bottom: 15px;
        background-color:#fff;
        padding:30px;
        a{
            display:block;
            margin-bottom: 16px;
            strong {
                font-size:25px;
            }
            span {
                display:block;
                font-size:14px;
                color:#aaa;
            }
        }
       
    }
`

export const BlogListViewWrap = styled.div`
    display:flex;
        div#blogList {
            width:800px;
        }
        div#tagList {
            width:300px;
            background-color:white;
            margin-left: 10px;
        }
`;

export const BlogEditorWrap = styled.div`
    height:600px;
    .CodeMirror-wrap {
        padding:0 25px;
    }
`
export const EditorTopWrap = styled.div`
    display: flex;
    flex-direction:column;
    div {
        background-color: #fff;
        border-left: 5px solid #2A3D4E;
        padding: 0.3rem 10px;
        margin-bottom: 10px;
        input {
            width: 100%;
            height: 40px;
            border: none;
            outline: none
        }
    }
`
export const EditorBtnWrap = styled.div`
    button {
        text-decoration: none;
        border-color: transparent;
        outline: none;
        cursor: pointer;
        background-color:#2A3D4E;
    }
`