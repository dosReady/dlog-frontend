import React from 'react';
import BlogTemplate from 'components/templates/BlogTemplate';
import PostList from 'components/PostList';

interface Props{}
interface State{}

class BlogListPage extends React.Component<Props,State> {
    render = ():JSX.Element => {
        return (
            <BlogTemplate>
                <PostList/>
            </BlogTemplate>
        )
   }
}

export default BlogListPage;