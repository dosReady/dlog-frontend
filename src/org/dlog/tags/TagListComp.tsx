import React from 'react';

class TagListComp extends React.Component<{id?:string}, {}> {

    render():JSX.Element {
        return (
            <div id={this.props.id}>
                <h4>태그목록</h4>
                <div>
                    <div>#JAVA</div>
                    <div>#JAVASRCRIPT</div>
                    <div>#TYPESCRIPT</div>
                    <div>#OASISBLUE</div>
                    <div>#EJB</div>
                    <div>#REMOTECALL</div>
                    <div>#SPRING</div>
                    <div>#SQL</div>
                </div>
            </div>
        )
    }
}

export default TagListComp