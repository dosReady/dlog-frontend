import { getScrollTop } from 'lib/utils';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { TbCategory } from 'modules/Types';
import React from 'react';
import ctgRepo from 'repository/CategoryRepo';
import styled from 'styled-components';

const CtgContainer = styled.div<{isFiexd:boolean}>`
${props => {
    if(!props.isFiexd) 
    return `
        margin-top:1.5rem;
        width: 14rem;
    `
    else return `
        position: fixed;
        top: 2rem;
        width: 14rem;
    `
}}
`

const CtgTitle = styled.div`
font-size: 1.5rem;
font-weight: bold;
padding-bottom: 4px;
border-bottom: 6px solid rgb(0,61,84);
margin-bottom: 15px;
`
const CtgList = styled.div`
margin-top: 1rem;
max-width: 300px;
`
const CtgWrap = styled.div`
padding: 0.3rem 0.5rem;
background-color: rgb(0, 61, 84);
color: white;
border-radius: 4px;
cursor:pointer;
margin-bottom:0.5rem;
`

const CtgWrapNoSelected = styled.div`
padding: 0.3rem 0.5rem;
color: black;
border-radius: 4px;
cursor:pointer;
margin-bottom:0.5rem;
&:hover {
    background-color: rgb(0, 61, 84);
    color:white;
}
`
interface Props {
    onGate: (tgtCtgID:number) => void
}

@observer
class CategoryList extends React.Component<Props, {}> {
    @observable tgtCtgID:number = 0;
    @observable list:TbCategory[] = [];
    @observable isFiexd:boolean = false;

    getCtgList = async () => {
        try {
            const ctgList:TbCategory[] = await ctgRepo.getAll();
            this.list = ctgList;
        } catch (error) {
            console.error(error)
        }
    }

    // EVENT FUNCTION
    componentDidMount = (): void => {
        this.initialize();
        window.addEventListener('scroll', this.onScroll);
    }
    
    componentWillUnmount = (): void => {
        window.removeEventListener('scroll', this.onScroll);
    }

    initialize = (): void => {
        this.getCtgList();
    }

    onScroll = (e:Event): void => {
        const nTop = getScrollTop();

        if (nTop > 75) {
            this.isFiexd = true;
        } else {
            this.isFiexd = false;
        }
    }

    onCtgClick = (ctgID:number): void => {
        this.tgtCtgID = ctgID;
        this.props.onGate(ctgID);
    }

    render(): JSX.Element { 
        const ctgList:TbCategory[] = this.list
        const items = ctgList.map(
            (ctg, i) => (
                <CtgList  key={i}>
                    {this.tgtCtgID === ctg.CtgID && <CtgWrap onClick={() => this.onCtgClick(ctg.CtgID)}>{ctg.CtgTitle}({ctg.CtgCnt})</CtgWrap>}
                    {this.tgtCtgID !== ctg.CtgID && <CtgWrapNoSelected onClick={() => this.onCtgClick(ctg.CtgID)}>{ctg.CtgTitle}({ctg.CtgCnt})</CtgWrapNoSelected>}
                </CtgList>
            )
        );

        return (
            <CtgContainer isFiexd={this.isFiexd}>
                <CtgTitle># TAG</CtgTitle>
                {this.tgtCtgID === 0 && <CtgWrap onClick={() => this.onCtgClick(0)}>전체({this.list.length})</CtgWrap>}
                {this.tgtCtgID !== 0 && <CtgWrapNoSelected onClick={() => this.onCtgClick(0)}>전체({this.list.length})</CtgWrapNoSelected>}
                {items}
            </CtgContainer>
        )
    }
}

export default CategoryList;
// export default connect(
//     ({post}: RootState) => ({
//        info: post
//     }),
//     (dispatch) => ({
//       PostActions: bindActionCreators(postActions, dispatch),
//     })
//   )(CategoryList); 