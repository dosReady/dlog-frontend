import React from 'react'
import QuickBlogWidget from '../components/widgets/QuickBlogWidget';
import NoticeBoardWidget from '../components/widgets/NoticeBoardWidget';
class PrdMainPage extends React.Component {
    render = (): JSX.Element => {
        return (
            <div className="page-container">
                <div className="page-header">청송목조각 나무조각들</div>
                <div className="page-content">
                    <div className="slide-area">
                        <img src="http://demoapus-wp.com/maison/wp-content/uploads/2017/07/Layer-24.png" alt="메인 이미지"/>
                    </div>
                    <div className="widget-area">
                        <div className="quick-blog-area">
                            <QuickBlogWidget/>
                        </div>
                        <div className="notice-bord-area">
                            <NoticeBoardWidget/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrdMainPage;