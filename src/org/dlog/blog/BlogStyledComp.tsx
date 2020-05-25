import styled from "styled-components";

export const BlogListWrap = styled.div`
    list-style:none;
    padding:0;
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