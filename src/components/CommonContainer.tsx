import UserService from 'api/service/UserService';
import autobind from 'autobind-decorator';
import { StringUtlz } from 'lib/Utlz';
import { observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import styled from 'styled-components';

export const HeaderComp = styled.header`
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    border-bottom: 1px solid #3a3649;
    backdrop-filter: blur(16px);
`;

export const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1024px;
    margin: 0 auto;
`;

export const LinkWrap = styled.div`
    display: flex;
    align-items: center;   
    a {
        font-size: 13.5px;
        margin-right: 20px;
        div {
            svg {
                width:30px;
                background-color: #282d35   ;
                border-radius: 5px;
                path {
                    fill: white;
                }    
            }
        }
        :hover {
            text-decoration: underline;
        }
    }
    span {
        font-size:13.5px;
        :hover {
            text-decoration: underline;
        }
    }
    
`
export const MenuDiv = styled.div`
    position:relative;
    i.fas {
        user-select: none;
        &.fa-times {
            width 32px;
            font-size:23px;
        }
        &.fa-bars {
            width 32px;
        }
        font-size: 1.35rem;
        cursor:pointer;
    }
`

export const SideMenu = styled.div`
    user-select: none;
    position: absolute;
    z-index: 10;
    top: 39px;
    right: 0;
    width: 180px;
    background-color: #282d35;
    box-shadow: 3px 7px 10px 0px #1a1e23;
`
export const MenuItem = styled.div`
    padding: 1rem 1.5rem;  
    border-bottom: 1px solid #3a3649;
    cursor:pointer;
    :hover {
        background-color: #363d48;
    }
`

export const MainConatiner = styled.main`
    position:relative;
    flex:1;
`

export const PageConatiner = styled.div`
    margin-top:8rem;
    max-width:1024px;
    margin-left: auto;
    margin-right: auto;
`

export const  PageHeader = styled.header`
    padding: 0 1rem;
    p {
        margin-top: 1rem;
        border-left: 4px solid #dddddd;
        padding: 0 15px;
    }
`

@observer
class CommonConatiner extends React.Component<RouteComponentProps<{category:string}> &{title?:string, subTitle?:string}, {}> {
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

    @autobind
    getCategory(): string {
        let category = this.props.match.params.category;
        if(StringUtlz.isEmpty(category)) {
            category = "post" 
        }
        return category;
    }

    render():JSX.Element {
        const isLogin = UserService.procSettingLogin();
        return (
            <>
                <HeaderComp>
                    <HeaderContainer>
                        <LinkWrap>
                            <a href="/dlog"><ReactSVG src={Logo}/></a>
                            <a href="/dlog">오늘도.log</a>
                        </LinkWrap>
                        <LinkWrap>
                            <a href="/dlog/post">Post</a>
                            <a href="/dlog/code">Code</a>
                            <a href="/dlog/recipe">Recipe</a>
                            <MenuDiv>
                                <i className="fas fa-bars" onClick={this.onClickBars}/>
                                <SideMenu style={{display:"none"}} ref={this.sideMenuEl} >
                                    <MenuItem><a href="/dlog/post">Post</a></MenuItem>
                                    <MenuItem><a href="/dlog/code">Code</a></MenuItem>
                                    <MenuItem><a href="/dlog/recipe">Recipe</a></MenuItem>
                                    {isLogin && <MenuItem><a href={`/dlog/write/${this.getCategory()}`}>Posting</a></MenuItem>}
                                    {isLogin && <MenuItem><span onClick={this.onClickLogout}>Logout</span></MenuItem>}
                                    {!isLogin && <MenuItem><a href="/dlog/common/login">Login</a></MenuItem>}
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

export default withRouter(CommonConatiner);