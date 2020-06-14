import { Post } from '@types';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import { BlogListWrap } from 'org/dlog/blog/BlogStyledComp';
import React from 'react';
import { Link } from 'react-router-dom';
import BlogSrvc from './BlogSrvc';



@observer
class BlogListComp extends React.Component<{id?:string}, {}> {
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

    render():JSX.Element {
        const blogList = toJS(this.list)
        return (
            <div id={this.props.id}>
                <BlogListWrap>
                    {
                        blogList.map(
                            (data:Post, i:any) => (
                                <li key={i}>
                                    <Link  to={`blog/${data.PostID}`}>
                                        <strong>{data.MainTitle}</strong>
                                        <span>{moment(data.UpdatedAt).format("YYYY년 MM월 DD일")}</span>
                                        <p>{data.SubTitle}</p>
                                        {this.genTagComp(data.TagsJSON)}
                                    </Link>
                                </li>
                            )
                        )
                    }
                </BlogListWrap>
            </div>
        )
    }
}

export default BlogListComp;