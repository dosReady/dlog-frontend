import React from 'react';
import Marked from 'marked';
import 'github-markdown-css';
interface Props {
    title:string,
    html:string
}
interface State {}

class Preview extends React.Component<Props, State> {

    render() {
        const str = {
            __html: Marked(this.props.html)
        } 
        return <div className="blog-preview markdown-body" dangerouslySetInnerHTML ={str}></div>
    }
}

export default Preview;