import React from 'react';
import BasicTemplate from 'components/templates/BasicTemplate';
import PostList from 'components/PostList';
import styled from 'styled-components';

const BlogContainer = styled.div`
display: flex;
`
const LeftArea = styled.div`
flex:0.5;
`
const RightArea = styled.div`
flex:1.5;
`

const TagContainer = styled.div`
margin-top:1.5rem;
`
const TagTitle = styled.div`
font-size: 1.5rem;
font-weight: bold;
`
const TagList = styled.div`
margin-top: 1rem;
max-width: 300px;
`
const TagWrap = styled.div`
padding: 0.3rem 0.5rem;
background-color: rgb(0, 61, 84);
color: white;
border-radius: 4px;
cursor:pointer;
margin-bottom:0.5rem;
`

const TagWrapNoSelected = styled.div`
padding: 0.3rem 0.5rem;
color: black;
border-radius: 4px;
cursor:pointer;
margin-bottom:0.5rem;
`

interface Props{}
interface State{}

class BlogListPage extends React.Component<Props,State> {

    render = ():JSX.Element => {
        return (
            <BasicTemplate>
                <BlogContainer>
                    <LeftArea>
                        <TagContainer>
                            <TagTitle># TAG</TagTitle>
                            <TagList>
                                <TagWrap>자바스크립트</TagWrap>
                                <TagWrapNoSelected>포트폴리오</TagWrapNoSelected>
                                <TagWrapNoSelected>SQLD</TagWrapNoSelected>
                                <TagWrapNoSelected>SQLP</TagWrapNoSelected>
                            </TagList>
                        </TagContainer>
                    </LeftArea>
                    <RightArea><PostList/></RightArea>
                </BlogContainer>
            </BasicTemplate>
        )
   }
}

export default BlogListPage;