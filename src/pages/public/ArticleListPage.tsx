import { Article } from 'api/model/postModels';
import postService from 'api/service/postService';
import ArticleList from 'components/ArticleList';
import CommonConatiner from 'components/containers/CommonContainer';
import React from 'react';
import styled from 'styled-components';
import ArticleAside from 'components/ArticleAside';


const PageHeader = styled.header`
    padding: 0 1rem;
`

const PageConatiner = styled.div`
    margin-top:8rem;
    max-width:1024px;
    margin-left: auto;
    margin-right: auto;
`

const ArticleWrap = styled.div`
    margin-top: 4rem;
    display:flex;
    justify-content:space-between;
`

const ArticleLeftWrap = styled.div`
    max-width: 750px;
    flex: 1 1 0%;
    padding: 0 1rem;
`

const ArticleRightWrap = styled.div`
    margin-left: 1.5rem;
    padding: 0rem 1rem 0;
    width: 300px;
`

interface State {
    list: Article[]
}

class ArticleListPage extends React.Component<{}, State> {

    readonly state = {
        list: []
    }

    async loadData(): Promise<void> {
        const [articles, ] = await postService.getArticleList();
        this.setState({
            list: articles
        })
    }

    componentDidMount() :void {
       this.loadData();
    }

    render(): JSX.Element {
        return (
            <CommonConatiner>
                <PageConatiner>
                    <PageHeader>
                        <h1>Article List</h1>
                    </PageHeader>
                    <ArticleWrap>
                        <ArticleLeftWrap>
                            <ArticleList list={this.state.list}/>
                        </ArticleLeftWrap>
                        <ArticleRightWrap>
                            <ArticleAside/>
                        </ArticleRightWrap>
                    </ArticleWrap>
                </PageConatiner>
            </CommonConatiner>
        )
    }
    
}

export default ArticleListPage;