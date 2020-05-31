import React from 'react';
import BlogEditorComp from 'org/dlog/blog/BlogEditorComp';
import ConatinerComp from 'org/dlog/comn/ContainerComp';

class BlogWriteView extends React.Component<{},{}> {
    render():JSX.Element {
        return (
            <ConatinerComp width="1500">
                <BlogEditorComp/>
            </ConatinerComp>
        )
    }
}

export default BlogWriteView;