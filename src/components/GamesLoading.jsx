import { useLocation } from "react-router-dom";

const GamesLoading = () => {
    const location = useLocation();
    const isLiveCasino = location.pathname === "/live-casino";

    return (
        <div className="container-games">
            {isLiveCasino ? (
                <>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                    <div role="button" className="image-box slots-grid-item otros loading">
                        <div className="image-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div role="button" className="slots-grid-item otros loading">
                        <div className="loading-spinner"></div>
                    </div>
                    <div role="button" className="slots-grid-item otros loading">
                        <div className="loading-spinner"></div>
                    </div>
                    <div role="button" className="slots-grid-item otros loading">
                        <div className="loading-spinner"></div>
                    </div>
                    <div role="button" className="slots-grid-item otros loading">
                        <div className="loading-spinner"></div>
                    </div>
                    <div role="button" className="slots-grid-item otros loading">
                        <div className="loading-spinner"></div>
                    </div>
                    <div role="button" className="slots-grid-item otros loading">
                        <div className="loading-spinner"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default GamesLoading;
