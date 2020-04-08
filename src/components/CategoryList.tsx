import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { TbCategory } from 'modules/Types';
// import { RootState, postActions } from 'modules/Redux';
// import { connect } from 'react-redux';
// import {bindActionCreators } from 'redux';

const CtgContainer = styled.div`
margin-top:1.5rem;
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
interface State {
    tgtCtgID: number,
    list: TbCategory[]
}

class CategoryList extends React.Component<Props, State> {
    readonly state = {
        tgtCtgID: 0,
        list: []
    }

    getCtgList = async () => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8080/api/get/categorylist`);
            this.setState({
                list: data.list
            });
        } catch (error) {
            console.error(error)
        }
    }

    // EVENT FUNCTION
    componentDidMount = (): void => {
        this.initialize();
    }

    initialize = (): void => {
        this.getCtgList();
    }

    onCtgClick = (ctgID:number): void => {
        this.setState({
            tgtCtgID: ctgID
        });

        this.props.onGate(ctgID);
    }

    render = (): JSX.Element => {
        const ctgList:TbCategory[] = this.state.list
        const items = ctgList.map(
            (ctg, i) => (
                <CtgList  key={i}>
                    {this.state.tgtCtgID === ctg.CtgID && <CtgWrap onClick={() => this.onCtgClick(ctg.CtgID)}>{ctg.CtgTitle}({ctg.CtgCnt})</CtgWrap>}
                    {this.state.tgtCtgID !== ctg.CtgID && <CtgWrapNoSelected onClick={() => this.onCtgClick(ctg.CtgID)}>{ctg.CtgTitle}({ctg.CtgCnt})</CtgWrapNoSelected>}
                </CtgList>
            )
        );

        return (
            <CtgContainer>
                <CtgTitle># TAG</CtgTitle>
                {this.state.tgtCtgID === 0 && <CtgWrap onClick={() => this.onCtgClick(0)}>전체({this.state.list.length})</CtgWrap>}
                {this.state.tgtCtgID !== 0 && <CtgWrapNoSelected onClick={() => this.onCtgClick(0)}>전체({this.state.list.length})</CtgWrapNoSelected>}
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