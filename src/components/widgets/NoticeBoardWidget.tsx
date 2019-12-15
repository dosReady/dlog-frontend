import React from 'react'

class NoticeBoardWidget extends React.Component {
    render = ():JSX.Element => {
        return (
            <div className="notice-board-wrap">
                <h3>공지사항</h3>
                <div className="grid-wrap">
                    <div className="grid-item">
                        <div>청송목조각 홈페이지 오픈!!</div>
                        <div>2019-12-15</div>
                    </div>
                    <div className="grid-item">
                        <div>청송목조각 운영룰입니다.</div>
                        <div>2019-12-15</div>
                    </div>
                    <div className="grid-item">
                        <div>주문 시 주의사항</div>
                        <div>2019-12-15</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoticeBoardWidget;