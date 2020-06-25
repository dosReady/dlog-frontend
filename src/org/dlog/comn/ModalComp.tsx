import  React from 'react';
import styled, {keyframes} from 'styled-components';

const popIn = keyframes`
  0% {
    opacity: 0.7;
    transform: scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const ModalContainer = styled.div<{width:number, height:number}>`
    position: fixed;
    width: ${props => props.width}px;
    height: 100px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.43) 0px 1px 14px -2px;
    left: 50%;
    top: 50%;
    z-index: 9999;
    border-radius: 10px;
    padding: 10px;
    cursor:pointer;
    margin-left: -100px;
    animation: ${popIn} 0.125s forwards ease-in-out;
    button {
        color: black;
    }
`



class ModalComp extends React.Component<{
    callback: () => void
}, {}> {

    render():JSX.Element {
        return (
            <ModalContainer width={300} height={100}>
                <div>제목</div>
                <div>메시지내용입니다. </div>
                <div><button onClick={this.props.callback}>확인</button></div>
            </ModalContainer>
        )
    }
}

export default ModalComp;