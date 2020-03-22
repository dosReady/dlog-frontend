import React from 'react';
import styled from 'styled-components';

interface Props {}

const PageContainer = styled.section`
`


class WriteTemplate extends React.Component<Props> {
    
    render = (): JSX.Element => {
        return (
            <PageContainer>
                {this.props.children}
            </PageContainer>
        )
    }
}

export default WriteTemplate;