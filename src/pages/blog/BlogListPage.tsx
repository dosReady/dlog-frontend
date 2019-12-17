import React from 'react';
import BlogTemplate from '../../components/templates/BlogTemplate';
import '../../resources/css/index.css';

class BlogListPage extends React.Component {

   render = ():JSX.Element => {
       return (
           <BlogTemplate title="DOS">
               <section className="blog-content">
                   <div className="blog-list-wrap">
                        목록
                   </div>
               </section>
           </BlogTemplate>
       )
   }
}

export default BlogListPage;