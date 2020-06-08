import React from 'react';
import { HeaderTop, HTSrchBarWrap, HTSrchInput, ContentsWrap } from 'org/dlog/comn/ContainerStyledComp';
import Logo from 'resources/img/do.svg';
import {ReactSVG} from 'react-svg';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import autobind from 'autobind-decorator';

class ConatinerComp extends React.Component<RouteComponentProps&{width: string}, {}> {

    @autobind
    onClickLogo():void {
        this.props.history.push("/");
    }

    render():JSX.Element {
        return (
            <main>
                <HeaderTop>
                    <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
                    <HTSrchBarWrap>
                        <i className="fas fa-search"></i>
                        <HTSrchInput type="text" placeholder="검색어를 입력하세요."></HTSrchInput>
                    </HTSrchBarWrap>
                    <div>
                        <Link to="/blog/write">글쓰기</Link>
                    </div>
                </HeaderTop>
                <ContentsWrap width={this.props.width}>{this.props.children}</ContentsWrap>
            </main>
        )
    }
}

export default withRouter(ConatinerComp);