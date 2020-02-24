import React from 'react';
import TopMenuTemplate from 'components/templates/TopMenuTemplate';
import TagComp from 'components/TagComp';

interface Props{}
interface State{}

class BlogListPage extends React.Component<Props,State> {
    render = ():JSX.Element => {
        return (
            <TopMenuTemplate>
                <TagComp/>
            </TopMenuTemplate>
        )
   }
}

export default BlogListPage;