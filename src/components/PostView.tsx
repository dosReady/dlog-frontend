import React from 'react';
import { Post } from 'api/model/PostModels';


class PostView extends React.Component<{info:Post}, {}> {
    private viewerEl = React.createRef<HTMLDivElement>();

    render():JSX.Element {
        return (
            <div>
                
            </div>
        )
    }
}

export default PostView;