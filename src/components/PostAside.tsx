import React from 'react';
import styled from 'styled-components';


const AsideWrap = styled.aside`
    position: sticky;
    top: 80px;
    overflow-y: auto;
    height: calc(100vh - 5rem);
`

// const RecentlyWrap = styled.ul`
//     :hover a{
//         text-decoration: underline;
//     }
//     ul {
//         margin-top:1rem;
//         li {
//             border-bottom: 1px solid #3a3649;
//             font-size: 0.9rem;
//             padding: 0.5rem 0;
//         }
//     }
// `

const TagsWrap = styled.div`
    /*margin-top: 1.5rem;*/
    h3 {
        margin-bottom:1rem;
    }
    span {
        font-size: 0.9rem;
    }
`

class PostAside extends React.Component<{}, {}> {
    render():JSX.Element {
        return (
            <AsideWrap>
                {/* <RecentlyWrap>
                    <h3>Recently</h3>
                    <ul>
                        <li>
                            <Link to="">최근글이 없습니다.</Link>
                        </li>
                    </ul>
                </RecentlyWrap> */}
                <TagsWrap>
                    <h3>Tags</h3>
                    <div>
                        <span>등록된 태그가 없습니다.</span>
                    </div> 
                </TagsWrap>
            </AsideWrap>
        )
    }
}

export default PostAside;