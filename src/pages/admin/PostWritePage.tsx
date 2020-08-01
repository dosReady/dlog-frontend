import React from 'react';
import EditorConatiner from 'components/EditorContainer';
import Editor from 'components/Editor';


class PostWritePage extends React.Component<{},{}> {


    render():JSX.Element {
        return (
            <EditorConatiner>
                <Editor/>
            </EditorConatiner>
        )
    }
}

export default PostWritePage;