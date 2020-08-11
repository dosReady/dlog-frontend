import autobind from 'autobind-decorator';
import { StringUtlz } from 'lib/Utlz';
import React from 'react';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';
import { HeaderComp, HeaderContainer, LinkWrap, MenuDiv, SideMenu, MenuItem, MainConatiner, PageConatiner, PageHeader } from 'components/CommonContainer';
import { Link } from 'react-router-dom';
import UserService from 'api/service/UserService';

class CommonConatiner extends React.Component<{title?:string, subTitle?:string}, {}> {
    private sideMenuEl = React.createRef<HTMLDivElement>();

    @autobind
    onClickBars(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
        const target = event.currentTarget;
        const sClass = target.classList;
        const sideMenuEl = this.sideMenuEl.current!;
        if(sClass.contains("fa-bars")) {
            target.className = "fas fa-times";
            sideMenuEl.style.display = "block";
        } else {
            target.className = "fas fa-bars";
            sideMenuEl.style.display = "none";
        }
    }

    @autobind
    onClickLogout(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
        UserService.reqLogout();
    }

    render():JSX.Element {
        return (
            <>
                <HeaderComp>
                    <HeaderContainer>
                        <LinkWrap>
                            <Link to="/"><ReactSVG src={Logo}/></Link>
                            <Link to="/">오늘도.log</Link>
                        </LinkWrap>
                        <LinkWrap>
                            <Link to="/">Post</Link>
                            <Link to="/">Code</Link>
                            <Link to="/">Recipe</Link>
                            <MenuDiv>
                                <i className="fas fa-bars" onClick={this.onClickBars}/>
                                <SideMenu style={{display:"none"}} ref={this.sideMenuEl} >
                                    <MenuItem><Link to="/">Post</Link></MenuItem>
                                    <MenuItem><Link to="/">Code</Link></MenuItem>
                                    <MenuItem><Link to="/">Recipe</Link></MenuItem>
                                    <MenuItem><Link to="/write">Posting</Link></MenuItem>
                                    <MenuItem><span onClick={this.onClickLogout}>Logout</span></MenuItem>
                                </SideMenu>
                            </MenuDiv>
                        </LinkWrap>
                    </HeaderContainer>
                </HeaderComp>
                <MainConatiner>
                    <PageConatiner>
                        <PageHeader>
                            <h1>{this.props.title}</h1>
                            {!StringUtlz.isEmpty(this.props.subTitle) ? (<p>{this.props.subTitle}</p>) : ""}
                        </PageHeader>
                        {this.props.children}
                    </PageConatiner>
                </MainConatiner>
            </>
        )
    }
}

export default CommonConatiner;