import React from 'react'

class MainPage extends React.Component {
    render = (): JSX.Element => {
        return (
            <div className="page-container">
                <div className="page-header">청송목조각</div>
                <div className="page-content">내용</div>
                <div className="page-footer">바닥</div>
            </div>
        );
    }
}

export default MainPage;