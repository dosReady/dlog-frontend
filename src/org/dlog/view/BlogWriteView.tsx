import React from 'react';
import BlogEditorComp from 'org/dlog/blog/BlogEditorComp';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import { createGlobalStyle } from 'styled-components';

const GlobalBodyStyle = createGlobalStyle`
  body {
    background-color: rgb(248, 249, 250);
  }
`

class BlogWriteView extends React.Component<{},{}> {
    render():JSX.Element {
        return (
            <ConatinerComp width="1500">
                <GlobalBodyStyle/>
                <BlogEditorComp/>
            </ConatinerComp>
        )
    }
}

export default BlogWriteView;