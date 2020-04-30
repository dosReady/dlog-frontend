import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header'
interface Props {}



const PageContainer = styled.section`
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    z-index: 1;
    animation: fadeIn 2.5s ease-in-out 0s 1;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @media screen and (max-width: 1390px) {
        max-width: 1200px;
    }
`


class BasicTemplate extends React.Component<Props> {
    
    render = (): JSX.Element => {
        return (
            <div>
                <Header/>
                <PageContainer>
                    {this.props.children}
                </PageContainer>
            </div>
        )
    }
}

export default BasicTemplate;