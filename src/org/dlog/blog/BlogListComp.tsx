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
class BlogListComp extends React.Component<RouteComponentProps & {id?:string, srchText?: string}, {}> {
    @observable list:Post[] = []; 

    private async loadList():Promise<void> {
        let param:Post = {
            PostID: "",
            MainTitle: "",
            SubTitle: "",
            Content: ""
        }

        if(this.props.srchText !== undefined) {
            param.MainTitle = this.props.srchText;
            param.SubTitle = this.props.srchText;
            param.Content = this.props.srchText;
        }

        const postList = await BlogSrvc.srchList(param);
        console.log(postList)
        if(postList !== undefined) this.list = toJS(postList);
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
            <div>
                {tagsJSON[0].length > 0 && tagsComp}
            </div>
        )
    }

    goDetailPage(postID:string): void {
        const {history} = this.props;
        history.push(`/blog/${postID}`);
    }

    render():JSX.Element {
        const blogList = toJS(this.list)
        return (
                <BlogListWrap>
                    {
                        blogList.map(
                            (data:Post, i:any) => (
                                <li key={i} onClick={() => this.goDetailPage(data.PostID)}>
                                    <h2>{data.MainTitle}</h2>
                                    <span>{moment(data.UpdatedAt).format("YYYY년 MM월 DD일")}</span>
                                    <ReactSVG src={Logo} className="logo"/>
                                    <p>{data.SubTitle}</p>
                                    {this.genTagComp(data.TagsJSON)}
                                </li>
                            )
                        )
                    }
                </BlogListWrap>
        )
    }
}

export default withRouter(BlogListComp);