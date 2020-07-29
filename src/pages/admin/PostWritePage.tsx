import React from 'react';
import styled from 'styled-components';
import CommonConatiner from 'components/containers/CommonContainer';
import Editor from 'components/Editor';


const PageConatiner = styled.div`
    margin-top:6rem;
    max-width:1024px;
    margin-left: auto;
    margin-right: auto;
    height: calc(100vh - 6rem);
`


class PostWritePage extends React.Component<{},{}> {


    render():JSX.Element {
        return (
            <CommonConatiner>
                <PageConatiner> 
                    <Editor/>
                </PageConatiner>
            </CommonConatiner>
        )
    }
}

export default PostWritePage;