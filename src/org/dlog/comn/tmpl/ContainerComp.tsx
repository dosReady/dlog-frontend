import React from 'react';
import { HeaderTop, HeaderTopLogo, HTSrchBarWrap, HTSrchInput, ContentsWrap } from 'org/dlog/comn/tmpl/styled';

class ConatinerComp extends React.Component {
    render():JSX.Element {
        return (
            <div>
                {/* header */}
                <div>
                    <HeaderTop>
                        <HeaderTopLogo>D</HeaderTopLogo>
                        <HTSrchBarWrap>
                            <i className="fas fa-search"></i>
                            <HTSrchInput type="text"></HTSrchInput>
                        </HTSrchBarWrap>
                    </HeaderTop>
                </div>
                <ContentsWrap>{this.props.children}</ContentsWrap>
            </div>
        )
    }
}

export default ConatinerComp;