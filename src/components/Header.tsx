import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends RouteComponentProps {}

interface State {}


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

class Header extends React.Component<Props, State> {
    private elRef1 = React.createRef<HTMLLIElement>();
    private elRef2 = React.createRef<HTMLLIElement>();

    componentDidMount = (): void => {
        const path:string = this.props.match.path;
        console.log(this.props)
        if(this.elRef1.current != null) {
            this.elRef1.current.classList.remove("selected");
            if(path.indexOf("/intro") > -1 ) this.elRef1.current.classList.add("selected");
        }

        if(this.elRef2.current != null) {
            this.elRef2.current.classList.remove("selected");
            if(path.indexOf("/blog") > -1 ) this.elRef2.current.classList.add("selected");
        }
    }

    render = ():JSX.Element => {
        //const path:string = this.props.match.path;
        return (
            <HeaderContainer>
                <TitleDiv><a href="/blog">오늘도.log</a></TitleDiv>
                <nav>
                    <MenuList>
                        <li ref={this.elRef1}><Link to="/intro">INTRO</Link></li>
                        <li ref={this.elRef2}><Link to="/blog">BLOG</Link></li>
                    </MenuList>
                </nav>
                <div>버튼영역</div>
            </HeaderContainer>
        )
    }
}

export default withRouter(Header);