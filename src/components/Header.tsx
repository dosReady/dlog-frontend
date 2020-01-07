import React from  'react';

interface Props {
    title:string
}

class Header extends React.Component<Props> {

    render = ():JSX.Element => {
        return (
            <div className="header-wrap">
                <h1>{this.props.title}</h1>
                <i className="fas fa-list"></i>
            </div>
        )
    }

}

export default Header;