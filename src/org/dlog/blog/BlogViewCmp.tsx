import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import { PostDTO } from '@types';
import autobind from 'autobind-decorator';
import 'github-markdown-css';
import React from 'react';
import styled from 'styled-components';

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    font-size: 16px;
    padding: 30px 20px;
}
`;

const TocContainer = styled.div`
    position: relative; 

    @media screen and (max-width: 1330px) {
        display: none;
    }
`
const TocDiv = styled.div`
    position: absolute; 
    left: 100%; 
`

const TocWrap = styled.div`
    width: 240px;
    border-left: 4px solid #2A3D4E;
    overflow-x: hidden;
    overflow-y: auto;
    margin-left:2rem;
    .h1-heading, .h2-heading{
        cursor:pointer;
        color:rgb(134, 142, 150);
        margin-bottom:10px;
    }
    .h1-heading {
        margin-left: 10px;
    }
    .h2-heading {
        margin-left: 30px;
    }
    .this {
        color: black;
        font-weight: 600;
    }
`

interface Props {
    info:PostDTO
}
interface State {
    headings: {type:string, text:string}[], 
    scrollTop:number
}

class BlogViewComp extends React.Component<Props,State> {
    private viewerEl = React.createRef<HTMLDivElement>();
    private tocEl = React.createRef<HTMLDivElement>(); // table of contenst

    async loadPost(info:PostDTO): Promise<void> {
        const {post} = info;
        const target = this.viewerEl.current;
        if(target !== null)  {
            new Viewer({
                el: target,
                initialValue: post.Content
            });

            // viewer 아래 내용을 읽어온다.
            const markdown = target.children[0];
            const headingArr = [];
            for(let i=0; i< markdown.children.length; i++) {
                const element = markdown.children.item(i);
                // 머리글 관련된 요소를 검색한다.
                // id값을 생성하고 state에 배열값으로 저장한다.
                if(element instanceof HTMLHeadingElement) {
                    if(element.nodeName === "H3" || element.nodeName === "H4" 
                       || element.nodeName === "H5" || element.nodeName === "H6" ) continue;
                    element.setAttribute("id", element.innerText);
                    headingArr.push({type: element.nodeName, text: element.innerText});
                }
            }

            this.setState({
                headings: headingArr
            })

            
        }
    }

    clearHeadingClass(headings: {type:string, text:string}[]): void {
        const tocEl = (this.tocEl.current as HTMLDivElement);
        let target = null ;
        for(let i=0; i< headings.length; i++) {
            target = (tocEl?.querySelector(`#h${headings[i].text}`)  as HTMLDivElement);
            if(target !== null) target.classList.remove("this");
        }
    }

    @autobind
    onScroll(e:any):void {
        const scrollTop = e.srcElement.scrollingElement.scrollTop;
        this.setState({ scrollTop });
        console.log(`scrollTop ${scrollTop}`);
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
        if(nextState.scrollTop >= 250) {
            this.tocEl.current?.setAttribute("style", "position: fixed; top: 80px;")
        } else {
            this.tocEl.current?.setAttribute("style", "");
        }


        const conEl = (this.viewerEl.current?.children[0] as HTMLDivElement);
        const tocEl = (this.tocEl.current as HTMLDivElement);
        let target = null ;
        let tocTarget = null;
        const headings = this.state?.headings;
        if(headings !== undefined) {
            this.clearHeadingClass(headings);
            for(let i = headings.length - 1; i >= 0; i--) {
                const head_text = this.state.headings[i].text;
                target = (conEl?.querySelector(`#${head_text}`)  as HTMLDivElement);
                tocTarget = (tocEl?.querySelector(`#h${head_text}`)  as HTMLDivElement);
                if(target === null || tocTarget === null) continue;
                const hide_position = target.getBoundingClientRect().height + target.getBoundingClientRect().top;
                if(hide_position <= 50) {
                    if(tocTarget !== null)tocTarget.classList.add("this");
                    break;
                }
                //console.log(`#${head_text} / ${target.getBoundingClientRect().height} : ${target.getBoundingClientRect().top} -> ${}`)
            }
        }
        return true;
    }

    componentDidMount():void {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount():void {
        window.removeEventListener('scroll', this.onScroll);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nexContext:any):void {
        this.loadPost(nextProps.info);
    }

    @autobind
    onFocusHeading(text: string): void {
        const conEl = (this.viewerEl.current?.children[0] as HTMLDivElement);
        const target = (conEl?.querySelector(`#${text}`)  as HTMLDivElement);
        //window.scrollTo(0, target.offsetTop + target.offsetHeight + 300);
        if(target !== null) target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    render():JSX.Element {
        let headingComp = null;
        const headings = this.state?.headings;
        if(headings !== undefined) {
            headingComp = (
                <TocContainer>
                    <TocDiv>
                        <TocWrap ref={this.tocEl}>
                            {headings.map((data:{type:string, text:string}, i: any) => (
                            <div key={i} id={`h${data.text}`} className={`${data.type.toLowerCase()}-heading`} onClick={() => this.onFocusHeading(data.text)}>{data.text}</div>
                            ))}
                        </TocWrap>
                    </TocDiv>
                </TocContainer>
            );
    
        }

        return (
            <ViewContainer>
                {headingComp}
                <div ref={this.viewerEl}></div>
            </ViewContainer>
        )
    }

}

export default BlogViewComp;