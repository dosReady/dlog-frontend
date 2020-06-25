import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { Tag, AppStore } from '@types';
import TagRepo from './TagRepo';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Tagitem = styled.div`
display: inline-block;
height: 26px;
margin: 4px 4px 0 0;
padding: 0 10px;
font-size: 13px;
line-height: 24px;
background-color: #eff1ff;
vertical-align: top;
color: #2D50FF;
cursor:pointer;
:hover {
    background-color: #D5DCFF;
}
`
@inject('appStore') 
@observer
class TagListComp extends React.Component<RouteComponentProps & {id?:string,  appStore?: AppStore}, {}> {
    @observable private list: Tag[] = [];

    async loadTagList(): Promise<void> {
        await TagRepo.srchList();
        this.list = TagRepo.getList;
    }

    onClickTag(tagName:string):void {
        this.props.appStore?.setSrchText(`#${tagName}`)
        this.props.history.push("/blog/srch");
    }   

    componentDidMount():void {
        this.loadTagList();
    }

    render():JSX.Element {
        const tagList = toJS(this.list) 

        // #5856d6
        return (
            <div id={this.props.id}>
                <div>
                    <h4>태그목록</h4>
                    <div>
                        {tagList.map((data:Tag, i: any) => (
                            <Tagitem key={i} onClick={() => this.onClickTag(data.TagName)}>#{data.TagName}</Tagitem>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TagListComp);