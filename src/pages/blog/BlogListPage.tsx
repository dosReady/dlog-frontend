import React from 'react';
import BlogTemplate from '../../components/templates/BlogTemplate';
import PostPlayer from '../../components/PostPlayer';
import '../../resources/css/index.css';

class BlogListPage extends React.Component {

   render = ():JSX.Element => {
       return (
           <BlogTemplate title="DOS BLOG">
               <section className="blog-content">
                   <PostPlayer/>
               </section>
           </BlogTemplate>
       )
   }
}

export default BlogListPage;