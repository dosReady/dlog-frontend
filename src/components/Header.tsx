import React from  'react';

interface Props {
    title:string
}

class Header extends React.Component<Props> {

    render = ():JSX.Element => {
        return (
            <div className="header-wrap">
                {this.props.title}
            </div>
        )
    }

}

export default Header;