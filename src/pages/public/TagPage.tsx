import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import CommonContainerTypeA from 'components/CommonContainerTypeA';
import React from 'react';

interface State {
    list: PostModel[]
}

class TagPage extends React.Component<{title:string}, State> {

    readonly state = {
        list: []
    }

    async loadData(): Promise<void> {
        const [articles, ] = await PostService.getPostList();
        this.setState({
            list: articles
        })
    }

    componentDidMount() :void {
       this.loadData();
    }

    render(): JSX.Element {
        return (
            <CommonContainerTypeA>
                <div></div>
            </CommonContainerTypeA>
        )
    }
    
}

export default TagPage;
