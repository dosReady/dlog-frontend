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
    margin-bottom:1rem;
    .CodeMirror-wrap {
        padding:0 10px;
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

export const TagWrap = styled.div`
display: flex;
flex-wrap:wrap;
align-items: center;
ul {
    display: flex;
    flex-wrap:wrap;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 0.95rem;
    li {
        :hover {
            cursor:pointer;
            box-shadow: 4px 4px 8px -2px rgba(50,50,100,0.16), 16px 16px 24px rgba(50,50,100,0.08), 24px 24px 56px rgba(50,50,100,0.12)
        }
        background-color: #2A3D4E;
        border-radius: 4px;
        color: white;
        padding: 3px 11px;
        margin-right: 5px;
        margin-bottom: 5px;
        span {
            margin-right:5px;
        }
        i {
            font-size: 14px
        }
    }
}
`
export const EditorBtnWrap = styled.div`
    margin-top:1rem;
    button.save {
        :hover {
            box-shadow: 4px 4px 8px -2px rgba(50,50,100,0.16), 16px 16px 24px rgba(50,50,100,0.08), 24px 24px 56px rgba(50,50,100,0.12)
        }
        background-color:#2A3D4E;
        margin-right:1rem;
    }
    button.back {
        :hover {
            box-shadow: 4px 4px 8px -2px rgba(50,50,100,0.16), 16px 16px 24px rgba(50,50,100,0.08), 24px 24px 56px rgba(50,50,100,0.12)
        }
        color:#2A3D4E;
        font-weight:900;
    }
`