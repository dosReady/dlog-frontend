import React from 'react';
import 'resources/css/index.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/all.css';

interface Props {}

class TopMenuTemplate extends React.Component<Props> {

   render = ():JSX.Element => {
       return (
           <div className="page-conatiner">
               <div className="menu-container">
                    <div className="site-title">D.log</div>
               </div>
               {this.props.children}
           </div>
       )
   }
}

export default TopMenuTemplate;