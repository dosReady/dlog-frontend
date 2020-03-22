import React from 'react';
import styled from 'styled-components';

interface Props {}

const Header = styled.header`
    display: flex;
    align-items: center;
    height: 4rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    transform: translateY(0);
    justify-content: space-around;
    animation: slidein 1s ease-in-out 0s 1;
    @keyframes slidein {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
`

const MenuList = styled.ul`
    display: flex;
    list-style: none outside;
    li {
        padding-right: 1rem;
        font-size: 1.25rem;
        font-weight: 400;
    }
`

const PageContainer = styled.section`
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    animation: fadeIn 2.5s ease-in-out 0s 1;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`


class BasicTemplate extends React.Component<Props> {
    
    render = (): JSX.Element => {
        return (
            <div>
                <Header>
                    <h1>D.log</h1>
                    <nav>
                        <MenuList>
                            <li>Intro</li>
                            <li>Blog</li>
                        </MenuList>
                    </nav>
                    <div>버튼영역</div>
                </Header>
                <PageContainer>
                    {this.props.children}
                </PageContainer>
            </div>
        )
    }
}

export default BasicTemplate;