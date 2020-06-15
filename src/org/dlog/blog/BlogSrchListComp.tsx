import React from 'react';
import BlogSrvc from './BlogSrvc';
import { Post } from '@types';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';

const BlogSrchLstWrap = styled.div`
max-width: 900px;
margin: 50px auto;
.logo div{
    height: 150px;
    background-color: #2A3D4E;
    margin: 10px 0;
    border-radius: 4px;
    svg {
        width: 100%;
        height: 100%;
        padding: 10px;
        path {
            fill: white
        }
    }    
}
`

const BlogItem = styled.div`
    border-bottom: 2px solid #716f6f;
    padding: 10px 0;
    margin: 10px 0;
`


@observer
class BlogSrchListComp extends React.Component<{srchText: string}, {}> {
    @observable list:Post[] = []; 

    render():JSX.Element {
        const blogList = toJS(this.list);

        return (
            <BlogSrchLstWrap>
                {blogList.map((data:Post, i:any) => (
                    <BlogItem key={i}>
                        <ReactSVG src={Logo} className="logo"/>
                        <strong>{data.MainTitle}</strong>
                        <span>{moment(data.UpdatedAt).format("YYYY년 MM월 DD일")}</span>
                        <p>{data.SubTitle}</p>
                    </BlogItem>
                ))}
            </BlogSrchLstWrap>
        )
    }

    private async loadList():Promise<void> {
        if(this.props.srchText.length === 0) return;

        const param:Post = {
            PostID: "",
            MainTitle: this.props.srchText,
            SubTitle: this.props.srchText,
            Content: this.props.srchText
        }
        const postList = await BlogSrvc.srchList(param);
        if(postList.length > 0 ) this.list =  toJS(postList);
    }

    public componentDidMount():void {
        this.loadList();
    }
}

export default BlogSrchListComp;