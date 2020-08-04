import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import bgimg from 'resources/img/bg_login.png';
import iconimg from 'resources/img/img_top.png';
import Logo from 'resources/img/do.svg';
import { ReactSVG } from 'react-svg';

const GlobalStyle  = createGlobalStyle`
    body {
        background-color:#fff;
    }
`
const Wrap = styled.div`
    overflow: hidden;
    min-width: 944px;
    min-height: 100%;   

`
const HeadLine = styled.div`
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 104px;

`
const InnerHeader = styled.div`
    position: relative;
    z-index: 1;
    min-width: 944px;
    margin: 0 auto;

`
const HeaderLogo = styled.h1`
    float: left;
    margin: 40px 0 0 40px;
    width:40px;
    cursor: pointer;
    svg {
        background-color: #fff;
        border-radius: 5px;
        path {
            fill: #23282e;
        }    
    }
`
const HeaderJoin = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`
const HeaderLogn = styled.div`
    padding: 32px 60px 0 0;
    text-align: right;
    cursor: pointer;
    .btnLogInfo{
        color: #fff;
        border: 1px solid #23282e;
        background-color: #23282e;
    }
`
const HeaderBtn = styled.a`
    display: inline-block;
    min-width: 120px;
    height: 40px;
    padding: 0 23px;
    border-radius: 20px;
    border: 1px solid #e0e0e0;
    font-size: 13px;
    color: #000;
    line-height: 38px;
    box-sizing: border-box;
    text-align: center;
    background-color: #fff;
    font-weight: 600;

`

const JoinContent = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 0 0 289px;
`

/* 배경 */
const ContentLogin = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-image: url(${bgimg});
    
`

const InnerLogin = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -145px 0 0 -160px;
`
const Login = styled.div`
    position: relative;
    width: 320px;
    margin: 0 auto;
`

const TitLogin = styled.strong`
    display: block;
    font-weight: normal;
    font-size: 24px;
    line-height: 34px;
    color: #000;
    letter-spacing: -0.6px;
    text-align: center;
`
const BoxLogin = styled.div`
    margin: 35px 0 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #fff;
    box-sizing: border-box;
`
const InpText = styled.div`
    width: 100%;
    margin: 0;
    padding: 18px 19px 19px;
    box-sizing: border-box;
    position: relative;
`

const ScreenOut  = styled.label`
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    line-height: 0;
    text-indent: -9999px
`
const LoginId = styled.input`
    display: block;
    width: 100%;
    height: 100%;
    font-size: 13px;
    color: #000;
    border: none;
    outline: 0;
    background-color: transparent; 
`

const InpTextPassword = styled.div`
    border-top: 1px solid #ddd;
    width: 100%;
    margin: 0;
    padding: 18px 19px 19px;
    box-sizing: border-box;
    position: relative;
`
const ScreenOut2 = styled.label`
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    line-height: 0;
    text-indent: -9999px;
`
const LoginPassword = styled.input`
    display: block;
    width: 100%;
    height: 100%;
    font-size: 13px;
    color: #000;
    border: none;
    outline: 0;
    background-color: transparent;
`

const BtnLogin = styled.button`
    margin: 20px 0 0;
    width: 100%;
    height: 48px;
    border-radius: 3px;
    font-size: 16px;
    color: #000;
    background-color: #fff;
    :hover {

    }

`
const LoginAppend  = styled.div`
    overflow: hidden;
    padding: 15px 0 0;
`
const ClickBtn = styled.div`
    float: left;
    display: inline-block;  
    position: relative;
    margin-bottom: -1px;
`
const KeepLogin = styled.input`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border: 0;
    opacity: .01;
`
const Bundle = styled.label`
    display: inline-block;
    margin-right: 19px;
    color: #909090;
    font-size: 13px;
    line-height: 19px;
    vertical-align: top;
    color: #333;
`
/*아이콘배경*/ 
const IcoCheck = styled.span`
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 1px 4px 0 0;
    background-position: -60px 0;
    background-image: url(${iconimg});
`
const TxtCheck = styled.span`
    vertical-align: top;
    color: #fff;
`
const TxtFind = styled.span`
    float: right;
    color: #fff;
    font-size: 13px;
    line-height: 1.5;
`

const LinkFind = styled.a`
    color: #fff;
`
const LinkFind2 = styled.a`
    color: #fff;
`



class DlogLoginPage extends React.Component<{},{}> {

    render():JSX.Element {
        return (
            <>
                <GlobalStyle/>
                <Wrap>
                    <HeadLine>
                        <InnerHeader>
                            <HeaderLogo>
                                <ReactSVG src={Logo}/>
                            </HeaderLogo>
                        </InnerHeader>
                    </HeadLine>
                    <JoinContent>
                        <ContentLogin>
                            <InnerLogin>
                                <Login>
                                    <TitLogin>로그인 하세요.</TitLogin>
                                    <BoxLogin>
                                        <InpText>
                                            <ScreenOut>아이디</ScreenOut>
                                            <LoginId placeholder="ID"></LoginId>
                                        </InpText>
                                        <InpTextPassword>
                                            <ScreenOut2>비밀번호</ScreenOut2>
                                            <LoginPassword placeholder="Password"></LoginPassword>
                                        </InpTextPassword>
                                    </BoxLogin>
                                    <BtnLogin>로그인</BtnLogin>
                                    <LoginAppend>
                                        <ClickBtn>
                                            <KeepLogin type="checkbox"></KeepLogin>
                                            <Bundle>
                                                <IcoCheck></IcoCheck>
                                                <TxtCheck>로그인 상태 유지</TxtCheck>
                                            </Bundle>
                                        </ClickBtn>
                                        <TxtFind>
                                            <LinkFind>아이디</LinkFind> /
                                            <LinkFind2> 비밀번호 찾기</LinkFind2>
                                        </TxtFind>
                                    </LoginAppend>
                                </Login>
                            </InnerLogin>
                        </ContentLogin>
                    </JoinContent>
                </Wrap>
            </>
        )
    }
}

export default DlogLoginPage;