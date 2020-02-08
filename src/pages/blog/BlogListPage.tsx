import React from 'react';
import 'resources/css/index.css';
import Tag from 'components/Tag';
import DefaultTemplate from 'components/templates/DefaultTemplate';

class BlogListPage extends React.Component {

   render = ():JSX.Element => {
       return (
           <DefaultTemplate>
               <Tag/>
           </DefaultTemplate>
       )
   }
}

export default BlogListPage;