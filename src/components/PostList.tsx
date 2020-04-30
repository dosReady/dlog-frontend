import axios from 'axios'
import { TbPost, TbCategory } from 'modules/Types'
import React from 'react'
import styled from 'styled-components';
import moment from 'moment';


const PostContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
margin-top: 1.5rem;
`
const PostWrap = styled.div`
width: 17rem;
background: white;
border-radius: 4px;
box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
margin: 1rem;
overflow: hidden;
transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
&:hover {
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 40px 16px 0;
    transform: translateY(-10px)
}
border-top: 10px solid rgb(0, 61, 84);
padding:1rem;
cursor:pointer;
display: flex;
flex-direction: column;

@media screen and (max-width: 1390px) {
    width: 26rem;
}
`
const PostTop = styled.div`
display:flex;
flex: 4;
`
const PostTag = styled.div`
font-size: 0.5rem;
padding: 0.2rem 0.5rem;
margin-left: auto;
align-self: center;
background-color: rgb(0, 61, 84);
border-radius: 4px;
color: white;
flex: 1;
align-self: flex-start
`
const PostTitle= styled.div`
font-size: 1rem;
font-weight: bold;
flex: 3;
word-break: break-word;
text-align: left;
padding-right: 2rem;
`

const PostBottom = styled.div`
align-self: flex-end;
font-size: 14px;
flex: 1;
margin-top: 1rem;
`

interface Response {
    post:TbPost,
    ctg:TbCategory
}

interface Props {
    selectedCtgID?:number
}
interface State {
    list:Response[]
}

class PostList extends React.Component<Props, State> {
    readonly state = {
        list: []
    }

    onPostWrapClick = (PostID:number|undefined) => {
        window.location.assign("/blog/"+PostID);
    }

    getPostList = async (ctgID?:number) => {
        try {
            const {data} = await axios.post('http://127.0.0.1:8080/api/get/postlist', {category: {CtgID: ctgID}})
            console.log(data.list)
            this.setState({list: data.list})
        } catch (error) {
            console.error(error)
        }
    }
    UNSAFE_componentWillMount = (): void => {
        this.getPostList()
    }

    UNSAFE_componentWillReceiveProps = (p:Props): void => {
        this.getPostList(p.selectedCtgID);
    }

    render = (): JSX.Element => {
        let postInfos:Response[] = this.state.list
        const postItems = postInfos.map(
            (data, i) => (
                <PostWrap key={i} onClick={() => this.onPostWrapClick(data.post.PostID)}>
                    <PostTop>
                        <PostTitle>{data.post.MainTitle}</PostTitle>
                        <PostTag>{data.ctg.CtgTitle.length > 0 ? data.ctg.CtgTitle : '없음'}</PostTag>
                    </PostTop>
                    <PostBottom>{moment(data.post.UpdatedAt).format('YYYY년 MM월 DD일 HH:mm:ss')}</PostBottom>
                </PostWrap>
            )
        );

        return (
            <PostContainer>
                {postItems}
            </PostContainer>
        )
    }

}

export default PostList;