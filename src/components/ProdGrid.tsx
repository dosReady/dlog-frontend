import React from 'react';

interface Props {
    filter?:string; 
}

interface State {
    prodlist: Array<ProdItem>;
}

interface ProdItem {
    prodId:string;
    title:string;
    imgUrl:string;
}


class ProdGrid extends React.Component<Props,State> {

    renderProdItem = (index:number):JSX.Element => {
        return (
            <div key={index} className="prod-item">
                아이탬 {index}
            </div>
        );
    }

    render = ():JSX.Element => {
        const prodList = [];
        for(let i = 1; i <= 10; i++) {
            prodList.push(this.renderProdItem(i));
        }

        return (
            <div className="prod-list">
                {prodList}
            </div>
        );
    }
}

export default ProdGrid;