import React from 'react';
import ConatinerComp from 'org/dlog/comn/ContainerComp';
import BlogListComp from 'org/dlog/blog/BlogListComp';
import TagListComp from 'org/dlog/tags/TagListComp';
import { BlogListViewWrap } from 'org/dlog/blog/BlogStyledComp';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LoginSrvc from 'org/dlog/comn/LoginSrvc';

class BlogListView extends React.Component< RouteComponentProps & {}, {}>{

    componentDidMount():void {
        const user = LoginSrvc.getLocalStorage();
        if(user === null) {
            this.props.history.replace("/login");
        }
    }

    render():JSX.Element {
        return (
            <>
            <ConatinerComp width="1100" marginTop="">
                <BlogListViewWrap>
                    <div id="blogList"><BlogListComp  /></div>
                    <TagListComp id="tagList"/>
                </BlogListViewWrap>
            </ConatinerComp>
            </>
        )
    }
}

export default withRouter(BlogListView);