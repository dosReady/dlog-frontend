import React from 'react';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import BlogListComp from 'org/dlog/blog/BlogListComp';

class BlogListView extends React.Component<{}, {}>{
    render():JSX.Element {
        return (
            <ConatinerComp>
                <BlogListComp/>
            </ConatinerComp>
        )
    }
}

export default BlogListView;