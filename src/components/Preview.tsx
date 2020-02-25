
import React from 'react';
import Marked from 'marked';
import 'github-markdown-css';
import {TbPost} from 'modules/Types';

interface Props {
    info: TbPost
}
interface State {}

class Preview extends React.Component<Props, State> {

    render() {
        const sHtml = this.props.info.Content
        const sMainTitle = this.props.info.MainTitle

        const rpsn = `${sHtml}`;
        const str = {
            __html: Marked(rpsn)
        } 
        return (
            <div className="blog-preview">
                <div className="title-form">
                    <div className="main-wrap">{sMainTitle}</div>
                    <div className="alis-wrap"></div>
                    <div className="tag-wrap"></div>
                </div>
                <div className="markdown-body" dangerouslySetInnerHTML ={str}></div>
            </div>
        )
    }
}

export default Preview