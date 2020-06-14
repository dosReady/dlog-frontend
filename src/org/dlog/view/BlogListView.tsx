import React from 'react';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import BlogListComp from 'org/dlog/blog/BlogListComp';
import TagListComp from 'org/dlog/tags/TagListComp';
import { BlogListViewWrap } from 'org/dlog/blog/BlogStyledComp';

class BlogListView extends React.Component<{}, {}>{
    render():JSX.Element {
        return (
            <ConatinerComp width="1100">
                <BlogListViewWrap>
                    <BlogListComp id="blogList" />
                    <TagListComp id="tagList"/>
                </BlogListViewWrap>
            </ConatinerComp>
        )
    }
}

export default BlogListView;