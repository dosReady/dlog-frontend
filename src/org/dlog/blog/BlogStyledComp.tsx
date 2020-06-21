import styled from "styled-components";

export const BlogListWrap = styled.ul`
    list-style:none;
    padding:0;
    margin: 0;
    li {
        display:block;
        cursor:pointer;
        border-bottom: 3px solid #2A3D4E;
        margin-bottom: 15px;
        padding-bottom: 20px;
        h2 {
            margin-bottom: 8px;
        }
        p {
            margin-bottom:10px;
        }

        span {
            display:block;
            font-size:14px;
            color:#aaa;
            margin-bottom:8px;
        }
        .logo div{
            height: 150px;
            background-color: #2A3D4E;
            margin: 10px 0;
            border-radius: 4px;
            padding: 10px;
            svg {
                width: 100%;
                height: 100%;
                path {
                    fill: white
                }
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
        height: 280px;
        background-color:white;
        margin-left: 50px;
        padding-right: 20px;
        border-bottom: 3px solid #2A3D4E;

        h4 {
            margin-bottom: 8px
        }
    }
`;

export const BlogEditorWrap = styled.div`
    margin-bottom:1rem;
    .CodeMirror-wrap {
        padding:0 10px;
    }

    input {
        font-size: 20px;
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
        box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
        input {
            width: 100%;
            height: 40px;
            border: none;
            outline: none;
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
            box-shadow:2px 1px 5px 0px #0c1217;
        }
        background-color: #2A3D4E;
        border-radius: 4px;
        color: white;
        padding: 0 11px;
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