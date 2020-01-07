import React from 'react';
import '../resources/css/index.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

class PostPlayer extends React.Component {

    render = ():JSX.Element => {
        return (
            <div className="player-container">
                <div className="player-content">
                    <div className="player-left">
                        <div className="thumbnail-wrap">
                            <div className="post-title">IKEA launches solar battery</div>
                            <div className="control-panel">
                                <div className="post-progress"></div>
                                <div className="control-bottom">
                                    <div className="control-left">
                                        <i className="fas fa-play"></i>
                                    </div>
                                    <div className="control-right">
                                        <i className="fas fa-volume-mute"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="player-right">
                        <div className="player-item">
                            <h1>Monochrme Canadian ski lodge by Ateller Kastellc</h1>
                            <div className="post-info">
                                <span>JUN 2 20</span>
                                <span>22:06</span>
                            </div>
                        </div>
                        <div className="player-item">
                            <h1>IKEA launches solar battery</h1>
                            <div className="post-info">
                                <span>JUN 2 20</span>
                                <span>22:06</span>
                            </div>
                        </div>
                        <div className="player-item">
                            <h1>Timeline of Design History</h1>
                            <div className="post-info">
                                <span>JUN 2 20</span>
                                <span>22:06</span>
                            </div>
                        </div>
                        <div className="player-item">
                            <h1>Contemporary Canadian famhouse</h1>
                            <div className="post-info">
                                <span>JUN 2 20</span>
                                <span>22:06</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="player-bottom">
                    <i className="fas fa-long-arrow-alt-up"></i>
                    <i className="fas fa-long-arrow-alt-down"></i>
                </div>
            </div>
        )
    }

}

export default PostPlayer;

