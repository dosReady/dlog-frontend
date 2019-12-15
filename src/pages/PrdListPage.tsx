import React from 'react'
import ProdGrid from '../components/ProdGrid';

class PrdListPage extends React.Component {
    render = (): JSX.Element => {
        return (
            <div className="page-container">
                <div className="page-header">청송목조각 나무조각들</div>
                <div className="page-content">
                    <div className="slide-area">
                        <img src="http://demoapus-wp.com/maison/wp-content/uploads/2017/07/Layer-24.png" alt="메인 이미지"/>
                    </div>
                    <div className="prod-list-wrap">
                        <div className="tag-area">
                            <div className="tag-item"># 태그1</div>
                            <div className="tag-item"># 태그2</div>
                            <div className="tag-item"># 태그3</div>
                            <div className="tag-item"># 태그4</div>
                            <div className="tag-item"># 태그5</div>
                        </div>
                        <ProdGrid/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrdListPage;