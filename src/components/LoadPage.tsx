import UserService from 'api/service/UserService';
import PostWritePage from 'pages/admin/PostWritePage';
import DlogLoginPage from 'pages/public/DlogLoginPage';
import PostListPage from 'pages/public/PostListPage';
import PostViewPage from 'pages/public/PostViewPage';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StoreType } from 'store';

interface PageInfo {
    component: any,
    isPublic: boolean
}

interface State {
    pages : Map<string, PageInfo>
}

class LoadPage extends React.Component< RouteComponentProps & {
    path: string,
    store?:StoreType
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
        const isLogin = UserService.procSettingLogin();
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