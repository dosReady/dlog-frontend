import React from 'react';
import ConatinerComp from '../comn/tmpl/ContainerComp';
import BlogListComp from '../blog/BlogListComp';

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