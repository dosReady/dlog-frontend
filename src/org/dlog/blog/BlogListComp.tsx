import { BlogOutDTO } from '@types';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import { BlogListWrap } from 'org/dlog/blog/BlogStyledComp';
import React from 'react';
import { Link } from 'react-router-dom';
import BlogSrvc from './BlogSrvc';



@observer
class BlogListComp extends React.Component<{id?:string}, {}> {
    @observable list:BlogOutDTO[] = []; 

    private async loadList():Promise<void> {
        this.list = await BlogSrvc.srchList();
    }
    public componentDidMount():void {
        this.loadList();
    }

    render():JSX.Element {
        const blogList = toJS(this.list)
        console.log(blogList)
        return (
            <div id={this.props.id}>
                <BlogListWrap>
                    {
                        blogList.map(
                            (data:BlogOutDTO, i:any) => (
                                <li key={i}>
                                    <Link to={`blog/${data.post.PostID}`}>
                                        <strong>{data.post.MainTitle}</strong>
                                        <span>{moment(data.post.UpdatedAt).format("YYYY년 MM월 DD일")}</span>
                                        <p>내용내용</p>
                                        <div>썸네일</div>
                                    </Link>
                                    <div>#jwt</div>
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