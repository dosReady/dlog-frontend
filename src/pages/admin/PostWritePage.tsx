import React from 'react';
import Editor from 'components/Editor';
import EditorConatiner from 'components/EditorContainer';

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