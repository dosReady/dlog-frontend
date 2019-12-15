import React from 'react'

class QuickBlogWidget extends React.Component {
    render = ():JSX.Element => {
        return (
            <div className="quick-blog-wrap">
                <h3>블로그</h3>
                <div className="img-container">
                    <img src="https://cdn.imweb.me/thumbnail/20190530/dfc066d1d6a38.jpg" alt="메인 이미지"/>
                </div>
                
            </div>
        )
    }
}

export default QuickBlogWidget;