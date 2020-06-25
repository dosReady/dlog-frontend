import  React from 'react';
import styled, {keyframes} from 'styled-components';
import { Tag, Post, PostDTO } from '@types';
import autobind from 'autobind-decorator';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import BlogRepo from './BlogRepo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';

const popIn = keyframes`
  0% {
    opacity: 0.7;
    transform: scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const ModalContainer = styled.div<{width:number, height:number}>`
    display: flex;
    flex-direction:column;
    position: fixed;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.43) 0px 1px 14px -2px;
    left: 50%;
    top: 50%;
    margin-left: -${props => props.width / 2}px;
    margin-top: -${props => props.height / 2}px;
    z-index: 9999;
    border-radius: 10px;
    padding: 10px;
    cursor:pointer;
    animation: ${popIn} 0.125s forwards ease-in-out;
`

const MainTitleWrap = styled.div`
    font-size: 1.8rem;
    margin-bottom: 8px;
    input {
        width: 100%;
    }
`
const HrComp = styled.div`
    height: 5px;
    width: 200px;
    border-bottom: 5px solid #2A3D4E;
    margin-top: 4px;
`

const TagWrap = styled.div`
    display: flex;
    flex-wrap:wrap;
    align-items: center;
    max-height: 130px;
    margin-bottom: 8px;
    ul {
        display: flex;
        flex-wrap:wrap;
        padding: 0;
        margin: 0;
        list-style: none;
        font-size: 0.95rem;
        margin-bottom: 4px;
        li button {
            :hover {
                box-shadow:2px 1px 5px 0px #0c1217;
            }
            background-color: #2A3D4E;
            border-radius: 4px;
            color: white;
            padding: 10px 20px;
            margin-right: 5px;
            margin-top: 5px;
            span {
                margin-right:5px;
                font-size: 0.95rem;
            }
            i {
                font-size: 14px
            }
        }
    }
    input {
        padding: 10px 10px 10px 0;
        margin-bottom: 5px;
    }
`

const LogoWrap = styled.div`
    margin-bottom: 8px;
    .logo div {
        width: 50px;
        height: 50px;
        svg {
            background-color: white;
            border-radius: 5px;
            path {
                fill: #2A3D4E
            }    
        }
    }
`

const SubTitleWrap =  styled.div`
    height: 100px;
    border: 1px solid #2A3D4E;
    padding: 7px;
    margin-bottom:8px;
    textarea {
        width: 100%;
        height: 100%;
    }
`
const BtnWrap = styled.div`
    display:flex;
    justify-content:flex-end;
    .cancel {
        color: white;
        background-color: #aabfbf;
        margin-right: 4px;
    }
    .success {
        color: white;
        background-color: #18ab3d;
    }
`

@observer
class BlogModalComp extends React.Component<RouteComponentProps & {
    callback: () => void,
    tags:Tag[],
    post:Post
}, {}> {
    @observable private tagName:string = "";
    
    @autobind
    onChangeMainTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.post.MainTitle = event.currentTarget.value;
    }
    @autobind
    onChangeSubTitle(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.props.post.SubTitle = event.currentTarget.value;
    }

    @autobind
    onChangeTag(event: React.ChangeEvent<HTMLInputElement>): void {
        if(event.currentTarget.value !== ",") {
            this.tagName = event.currentTarget.value;
        }
    }

    @autobind
    onKeyDownTagInput(event: React.KeyboardEvent<HTMLInputElement>):void {
        
        if(event.keyCode === 188) { // COMMA
            this.tagName = "";
            if(this.props.tags.length > 5)  {
                alert("5개만 등록가능합니다."); 
                return;
            }

            for(var i=0; i < this.props.tags.length; i++) {
                if(this.props.tags[i].TagName ===  event.currentTarget.value) {
                    alert(`이미 등록되어있습니다. - ${this.props.tags[i].TagName}`); 
                    return;
                }
            }

            const tag: Tag = {
                TagMstID: "",
                TagName: event.currentTarget.value
            }
            
            if(tag.TagName.length > 0) this.props.tags.push(tag);
        }
    }

    @autobind
    onClickTagDel(tagMstID:string): void {
        for(var i=0; this.props.tags.length; i++) {
            if(this.props.tags[i].TagMstID === tagMstID) {
                this.props.tags.splice(i, 1);
                break;
            }
        }
    }
    async savePost():Promise<void> {
        const param:PostDTO = {
            post: this.props.post,
            tags: this.props.tags
        }
        await BlogRepo.mngPost(param);
        this.props.history.push("/blog");
    }

    @autobind
    onSaveClick():void {
        this.savePost();
    }

    render():JSX.Element {
        const tagList = this.props.tags;
        return (
            <ModalContainer width={500} height={410}>
                <LogoWrap>
                    <ReactSVG src={Logo} className="logo"/>
                </LogoWrap>
                <MainTitleWrap>
                    <input maxLength={100} placeholder="제목을 입력하세요." onChange={this.onChangeMainTitle} value={this.props.post.MainTitle}/>
                    <HrComp/>
                </MainTitleWrap>
                <TagWrap>
                    <ul>
                        {
                            tagList.map(
                                (data:Tag, i:any) => (
                                    <li key={i} onClick={() => {this.onClickTagDel(data.TagMstID)}}><button><span>#{data.TagName}</span><i className="fas fa-minus"/></button></li>
                                )
                            )
                        }
                    </ul>
                    <input type="text" maxLength={200} placeholder="태그를 입력해주세요." onKeyDown={this.onKeyDownTagInput} value={this.tagName} onChange={this.onChangeTag}/>
                </TagWrap>
                <SubTitleWrap>
                    <textarea maxLength={100} placeholder="요약내용을 입력하세요." onChange={this.onChangeSubTitle} value={this.props.post.SubTitle}/>
                </SubTitleWrap>
                <BtnWrap>
                    <button className="cancel" onClick={this.props.callback}>취소하기</button>
                    <button className="success" onClick={this.onSaveClick}>블로그작성하기</button>
                </BtnWrap>
            </ModalContainer>
        )
    }
}

export default withRouter(BlogModalComp);