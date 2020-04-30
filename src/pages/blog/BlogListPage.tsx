import React from 'react';
import BasicTemplate from 'components/templates/BasicTemplate';
import PostList from 'components/PostList';
import styled from 'styled-components';
import CategoryList from 'components/CategoryList';

const BlogContainer = styled.div`
display: flex;
`
const LeftArea = styled.div`
width: 14rem;
`
const RightArea = styled.div`
flex: 1 1 0%;
`

interface Props{}
interface State{
    tgtCtgID:number
}

class BlogListPage extends React.Component<Props,State> {
    readonly state = {
        tgtCtgID: 0
    }
    onGate = (ctgID:number) => {
        this.setState({
            tgtCtgID: ctgID
        });
    }

    render = ():JSX.Element => {
        return (
            <BasicTemplate>
                <BlogContainer>
                    <LeftArea>
                       <CategoryList onGate={this.onGate}/>
                    </LeftArea>
                    <RightArea><PostList selectedCtgID={this.state.tgtCtgID}/></RightArea>
                </BlogContainer>
            </BasicTemplate>
        )
   }
}

export default BlogListPage;