import React from 'react';
import BlogEditorComp from 'org/dlog/blog/BlogEditorComp';
import styled, { createGlobalStyle } from 'styled-components';
import { ReactSVG } from 'react-svg';
import Logo from 'resources/img/do.svg';
import autobind from 'autobind-decorator';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const GlobalStyleComp  = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`
const HeaderTop = styled.header`
  background-color: #2A3D4E;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
      .logo div{
          cursor:pointer;
          width: 40px;
          height: 40px;
          svg {
              background-color: #2A3D4E;
              border-radius: 5px;
              path {
                  fill: white
              }    
          }
      }

  @media screen and (max-width: 1030px) {
      justify-content: flex-start;
      padding-left: 30px;
  }
`
const BlogWriteViewContainer = styled.div`
  height: 100%;
`

class BlogWriteView extends React.Component<RouteComponentProps & {},{}> {
    @autobind
    onClickLogo() :void {
      this.props.history.push("/");
    }

    render():JSX.Element {
        return (
          <BlogWriteViewContainer> 
              <GlobalStyleComp/>
              <HeaderTop>
                  <ReactSVG src={Logo} className="logo" onClick={this.onClickLogo}/>
              </HeaderTop>
              <BlogEditorComp/>
          </BlogWriteViewContainer>
        )
    }
}

export default withRouter(BlogWriteView);