import React from 'react';
import '../../resources/css/index.css';
import Header from '../Header';

interface Props {
    title:string
}

class BlogTemplate extends React.Component<Props> {

   render = ():JSX.Element => {
       return (
           <div className="blog-container">
               <Header title={this.props.title}/>
               {this.props.children}
           </div>
       )
   }
}

export default BlogTemplate;