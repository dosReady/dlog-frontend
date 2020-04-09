import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.css';

interface Props extends RouteComponentProps {}

interface State { 
    isShowMenu:boolean
}


const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    height: 4rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    transform: translateY(0);
    animation: slidein 1s ease-in-out 0s 1;
    @keyframes slidein {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }

    nav {
        flex: 2;
    }
`

const MenuList = styled.ul`
    display: flex;
    list-style: none outside;
    li {
        padding-right: 1rem;
        font-size: 1rem;
        font-weight: 700;
        &.selected {
            border-top: 5px solid rgb(0, 61, 84);
        }
    }
`


const TitleDiv = styled.div`
    font-size: 28px;
    font-weight: 700;
`

const QuickMenuContainer = styled.div`
    i {
        cursor:pointer
    }
`

const QuickMenuWrap = styled.div<{isShow:boolean}>`
    display:${props => props.isShow ? 'block' : 'none'};
    position:relative;
    
`

const QuickMenu = styled.div`
width: 100px;
left: -110px;
top: 10px;
position: absolute;
background-color: white;
border-radius: 4px;
box-shadow: rgba(0,0,0,0.04) 0px 4px 16px 0px;
padding: 0.2rem 0.7rem;
display: flex;
flex-direction: column;
align-items: center;
border-top: 5px solid rgb(0,61,84);
div {
   margin-bottom: 0.2rem; 
   cursor:pointer;
}
`

class Header extends React.Component<Props, State> {
    private elRef1 = React.createRef<HTMLLIElement>();
    private elRef2 = React.createRef<HTMLLIElement>();

    readonly state = {
        isShowMenu:false
    }


    componentDidMount = (): void => {
        const path:string = this.props.match.path;
        if(this.elRef2.current != null) {
            this.elRef2.current.classList.remove("selected");
            if(path === "/" || path.indexOf("/blog") > -1 ) this.elRef2.current.classList.add("selected");
        }
    }

    onMenuClick = ():void => {
        this.setState({
            isShowMenu: !this.state.isShowMenu
        })
    }

    render = ():JSX.Element => {
        //const path:string = this.props.match.path;
        return (
            <HeaderContainer>
                <TitleDiv><a href="/blog">오늘도.log</a></TitleDiv>
                <nav>
                    <MenuList>
                        <li ref={this.elRef2}><Link to="/blog">BLOG</Link></li>
                    </MenuList>
                </nav>
                <QuickMenuContainer>
                    <i className="fas fa-bars" onClick={this.onMenuClick}></i> 
                    <QuickMenuWrap isShow={this.state.isShowMenu}>
                        <QuickMenu>
                            <div>로그인</div>
                            <Link to="/blog/write">글쓰기</Link>
                            <Link to="/blog/write">관리자페이지</Link>
                        </QuickMenu>
                    </QuickMenuWrap>
                </QuickMenuContainer>
            </HeaderContainer>
        )
    }
}

export default withRouter(Header);