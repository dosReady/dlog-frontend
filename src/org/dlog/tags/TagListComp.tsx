import React from 'react';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { Tag } from '@types';
import TagRepo from './TagRepo';
import styled from 'styled-components';

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

@observer
class TagListComp extends React.Component<{id?:string}, {}> {
    @observable private list: Tag[] = [];


    private async loadTagList(): Promise<void> {
        await TagRepo.srchList();
        this.list = TagRepo.getList;
    }

    componentDidMount():void {
        this.loadTagList();
    }

    render():JSX.Element {
        const tagList = toJS(this.list) 

        // #5856d6
        return (
            <div id={this.props.id}>
                <h4>태그목록</h4>
                <div>
                    {tagList.map((data:Tag, i: any) => (
                        <Tagitem key={i}>#{data.TagName}</Tagitem>
                    ))}
                </div>
            </div>
        )
    }
}

export default TagListComp