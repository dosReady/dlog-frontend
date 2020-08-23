import UserService from 'api/service/UserService';
import { inject, observer } from 'mobx-react';
import PostWritePage from 'pages/admin/PostWritePage';
import DlogLoginPage from 'pages/public/DlogLoginPage';
import PostListPage from 'pages/public/PostListPage';
import PostViewPage from 'pages/public/PostViewPage';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface PageInfo {
    component: any,
    isPublic: boolean
}

interface State {
    pages : Map<string, PageInfo>
}

@inject("userservice")
@observer
class LoadPage extends React.Component< RouteComponentProps & {
    path: string,
    userservice?:UserService
}, State> {

   constructor(props: any) {
       super(props);

       let _map = new Map<string, PageInfo>();
       _map.set("write",{ component: <PostWritePage/>, isPublic: false});
       _map.set("detail",{ component: <PostViewPage/>, isPublic: true});
       _map.set("list",{ component: <PostListPage/>, isPublic: true});
       _map.set("login",{ component: <DlogLoginPage/>, isPublic: true});

       this.state = {
           pages: _map
       };
   }
    

    render():JSX.Element {
        const pages = this.state.pages;
        const pageInfo = pages.get(this.props.path);
        const isLogin = this.props.userservice?.isLogin;
        let renderComp = pageInfo!.component;
        if(!pageInfo!.isPublic && !isLogin) {
            renderComp = <DlogLoginPage/>;
        }   
        
        return (
            <>{renderComp}</>
        )   
    }
}

export default withRouter(LoadPage);