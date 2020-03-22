import React from 'react';
import BasicTemplate from 'components/templates/BasicTemplate';
import PostDetail from 'components/PostDetail';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

const BlogDetailContainer = styled.div`
    display: flex;
    justify-content:center
`
interface Props extends RouteComponentProps<{ postid:string}> {}

class BlogDetailPage extends React.Component<Props> {
    
    render = ():JSX.Element => {
        return (
            <BasicTemplate>
                <BlogDetailContainer>
                    <PostDetail postId={this.props.match.params.postid}/>
                </BlogDetailContainer>
            </BasicTemplate>
        )
    }

}

export default BlogDetailPage;