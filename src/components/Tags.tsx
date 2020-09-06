import { ITagModel } from "api/model/TagModels";
import TagService from "api/service/TagService";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

const TagContainer = styled.div`
    margin-top: 20px;
    padding: 20px 0;
    button {
        border: 1px solid #F3F3F3;
        margin-right:1rem;
        margin-bottom:8px;
        :hover {
            background-color: #456582;
        }
    }
    
`

const TagWrap = styled.div`
    button.selected {
        background-color:#f1d02e;
        color: black;
        border-left
    }
`

@inject('tagservice')
@observer
class Tags extends React.Component<{
    tagservice?: TagService
    loadFunc: () => Promise<void>,
    tags: ITagModel[] | null
},{}> {

    private tagParent = React.createRef<HTMLDivElement>();

    onButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tagkey: string):void {
        this.props.tagservice!.setTagKey(tagkey);
        this.props.loadFunc();    

        if(this.tagParent.current !== null) {
            const childLst = this.tagParent.current.children;
            for(let i=0; i<childLst.length; i++) {
                childLst[i].classList.remove("selected");
            }

            event.currentTarget.classList.add("selected");
        }
    }

    componentDidUpdate(): void {
        if(this.tagParent.current !== null && this.tagParent.current.children.length > 0) {
            const {tagservice} = this.props;

            const index = this.props.tags?.findIndex(
                (data: ITagModel, i: any) => data.TagKey === tagservice?.tagkey
            );
            
            let target = this.tagParent.current.children[0];
            if(index !== undefined && index > -1) {
                target = this.tagParent.current.children[index!];
            }

            target.classList.add("selected");
        }
    }

    render():JSX.Element {
        let datas = [] as  ITagModel[] ;
        if(this.props.tags !== null) datas = this.props.tags;
        return (   
            <TagContainer>
                <TagWrap ref={this.tagParent}>
                {datas.map(
                    (data:ITagModel, i: any) => (
                        <button key={data.TagKey} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onButtonClick(event, data.TagKey)}>
                        #{data.TagName}
                        </button>
                    )
                )}
                </TagWrap>
            </TagContainer>
        )
    }
}

export default Tags;