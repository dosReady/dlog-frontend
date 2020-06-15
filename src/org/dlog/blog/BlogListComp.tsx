import { Post } from '@types';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import { BlogListWrap } from 'org/dlog/blog/BlogStyledComp';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BlogSrvc from './BlogSrvc';
import Logo from 'resources/img/do.svg';
import { ReactSVG } from 'react-svg';



@observer
class BlogListComp extends React.Component<RouteComponentProps & {id?:string}, {}> {
    @observable list:Post[] = []; 

    private async loadList():Promise<void> {
        const postList = await BlogSrvc.srchList();
        if(postList.length > 0 ) this.list = toJS(postList);
    }

    public componentDidMount():void {
        this.loadList();
    }

    public genTagComp(tagsJSONString :string | undefined):JSX.Element {
        let tagsJSON:string[] = [];
        tagsJSON = JSON.parse(tagsJSONString!)
        let tagsComp = tagsJSON.map((data:string , i:any) => (
            <span key={i}>#{data}</span>
        ))

        return (
            <p>
                {tagsJSON[0].length > 0 && tagsComp}
            </p>
        )
    }

    goDetailPage(postID:string): void {
        const {history} = this.props;
        history.push(`blog/${postID}`);
    }

    render():JSX.Element {
        const blogList = toJS(this.list)
        return (
            <div id={this.props.id}>
                <BlogListWrap>
                    {
                        blogList.map(
                            (data:Post, i:any) => (
                                <li key={i} onClick={() => this.goDetailPage(data.PostID)}>
                                    <strong>{data.MainTitle}</strong>
                                    <span>{moment(data.UpdatedAt).format("YYYY년 MM월 DD일")}</span>
                                    <ReactSVG src={Logo} className="logo"/>
                                    <p>{data.SubTitle}</p>
                                    {this.genTagComp(data.TagsJSON)}
                                </li>
                            )
                        )
                    }
                </BlogListWrap>
            </div>
        )
    }
}

export default withRouter(BlogListComp);