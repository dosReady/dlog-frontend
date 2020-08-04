import { PostModel } from 'api/model/PostModels';
import PostService from 'api/service/PostService';
import CommonContainerTypeA from 'components/CommonContainerTypeA';
import React from 'react';
import styled from 'styled-components';

const AllWeb = styled.div`
    margin-top: 3rem;
`
const TagLine = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center
`

/*active 추가*/
const TagList = styled.div`
    display: flex;
    position: relative;
`
const TagTitle01 = styled.a`
    width: 8rem;
    height: 3rem;
    font-size: 1.125rem;
    color: #fff;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    &.active{
        font-weight: bold;
        color: rgb(32, 201, 151);
        
    }
`
const TagTitle02 = styled.a`
    width: 8rem;
    height: 3rem;
    font-size: 1.125rem;
    color: #fff;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
`
/*태그이름밑라인*/
const TagBottomLine = styled.div`
    height: 2px;
    display: block;
    position: absolute;
    bottom: 0px;
    background: rgb(32, 201, 151);
    transform: translateX(0rem);
    width: 50%;
`

/*태그 박스*/
const TagBox = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin: 4rem auto 0px;
`

const TagBundle = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 25%;
    height: 12rem;
    padding: 1rem;
    border: 1px solid #eee;
    :hover{
        border-color: #00C3BD;
    }
   
`
const TagName = styled.a`
    margin-bottom: 0.875rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.875rem;
    color: rgb(12, 166, 120);
    font-weight: 500;
    font-size: 1rem;
    background: rgb(241, 243, 245);
    border-radius: 1rem;
    text-decoration: none;
    box-shadow: 0px 8px 15px rgb(255 255 255 / 29%);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    :hover{
        background-color: #2EE59D;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        transform: translateY(-7px);
    }

`
const TagContents =styled.p`
    margin-top: 0.125rem;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    color: #fff;
    line-height: 1.5;
    overflow: hidden;
    cursor: pointer;
    :hover{
        color: #00C3BD;
    }
`

const TagCount = styled.div`
    font-size: 0.875rem;
    color: rgb(173, 181, 189);
`

class TagPage extends React.Component<{},{}> {

    render(): JSX.Element {
        return (
            <CommonContainerTypeA>
                <div>
                    <AllWeb>
                        <TagLine>
                            <TagList>
                                <TagTitle01 className="active">인기순</TagTitle01>
                                <TagTitle02>조회순</TagTitle02>
                                <TagBottomLine></TagBottomLine>
                            </TagList>
                        </TagLine>
                        <TagBox>
                            <TagBundle>
                                <div>
                                    <TagName>HTML</TagName>
                                    <TagContents>HTML (Hypertext Markup Language,하이퍼텍스트 마크업 언어)는 프로그래밍 언어는 아니고..</TagContents>
                                </div>
                                <TagCount>총 7777 개의 포스트</TagCount>
                            </TagBundle>
                            <TagBundle>
                                <div>
                                    <TagName>HTML</TagName>
                                    <TagContents>HTML (Hypertext Markup Language,하이퍼텍스트 마크업 언어)는 프로그래밍 언어는 아니고..</TagContents>
                                </div>
                                <TagCount>총 7777 개의 포스트</TagCount>
                            </TagBundle>
                        </TagBox>
                    </AllWeb>
                </div>
            </CommonContainerTypeA>
        )
    }
    
}

export default TagPage;
