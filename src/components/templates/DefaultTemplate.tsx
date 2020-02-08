import React from 'react';
import 'resources/css/index.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/all.css';

interface Props {}

class DefaultTemplate extends React.Component<Props> {

   render = ():JSX.Element => {
       return (
           <div className="page-conatiner">
               <div className="menu-container">
                    <div className="site-title">
                        <span>DLOG</span>
                    </div>
                    <nav className="site-link-wrap">
                        <div className="site-link"><i className="fas fa-home"></i>HOME</div>
                        <div className="site-link"><i className="fas fa-blog"></i>BLOG</div>
                        <div className="site-link"><i className="fas fa-th-list"></i>TODO</div>
                    </nav>
                    <div className="site-footer">
                        <div><i className="fas fa-envelope"></i></div>
                        <div><i className="fab fa-github"></i></div>
                    </div>
               </div>
               <div className="content-container">
               {this.props.children}
               </div>
           </div>
       )
   }
}

export default DefaultTemplate;