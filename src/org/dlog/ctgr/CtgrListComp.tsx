import React from 'react';
import { CtgList, CtgContainer, CtgTitle, CtgWrap, CtgWrapNoSelected } from 'org/dlog/ctgr/CtgrStyledComp';
import { TbCategory } from 'modules/Types';
import { observer } from 'mobx-react';
import { observable, toJS} from 'mobx';
import { getScrollTop } from 'lib/utils';
import CtgrRepo from './CtgrRepo';

@observer
class CtgrListComp extends React.Component<{},{}> {
    @observable tgtCtgID:number = 0;
    @observable list:TbCategory[] = [];
    @observable isFiexd:boolean = false;

    async getCtgList():Promise<void> {
        await CtgrRepo.srchList();
        const ctgList:TbCategory[] = toJS(CtgrRepo.getList);
        this.list = ctgList;
        
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
    }

    render():JSX.Element {
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

export default CtgrListComp;