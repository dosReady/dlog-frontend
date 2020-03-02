import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';
import PostList from 'components/PostList';
import styled from 'styled-components';

interface Props{}
interface State{}

const TagsTemplate = styled.div``

class BlogListPage extends React.Component<Props,State> {
    render = ():JSX.Element => {
        return (
            <TopMenuTemplate>
                <TagsTemplate>
                    <PostList />
                </TagsTemplate>
            </TopMenuTemplate>
        )
   }
}

export default BlogListPage;