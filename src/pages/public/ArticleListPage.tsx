import React from 'react';
import CommonConatiner from 'components/containers/CommonContainer';
import postService from 'api/service/postService';
import styled from 'styled-components';


const PageConatiner = styled.div`
    margin-top:8rem;
    max-width:1024px;
    margin-left: auto;
    margin-right: auto;
`

const PageHeader = styled.div`
`;

class ArticleListPage extends React.Component<{}, {}> {

    async loadData(): Promise<void> {
        const [postList, tagList] = await postService.getPostList();
        console.log(postList);
        console.log(tagList);
    }

    componentDidMount() :void {
       this.loadData();
    }

    render(): JSX.Element {
        return (
            <CommonConatiner>
                <PageConatiner>
                    <header>
                        <h1>Article List</h1>
                    </header>
                </PageConatiner>
            </CommonConatiner>
        )
    }
    
}

export default ArticleListPage;