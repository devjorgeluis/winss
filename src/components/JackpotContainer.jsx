import ImgReglas from "/src/assets/img/boton-poseidon-reglas.png";
import ImgHistorial from "/src/assets/img/boton-poseidon-historial.png";
import VideoJackpot from "/src/assets/video/JackpotWaka.webm";

const JackpotContainer = ({ onHistoryClick, onRegulationClick }) => {
    const handleHistoryClick = (e) => {
        e.preventDefault();
        if (onHistoryClick) {
            onHistoryClick();
        }
    };

    const handleRegulationClick = (e) => {
        e.preventDefault();
        if (onRegulationClick) {
            onRegulationClick();
        }
    };

    return (
        <div id="jackpot-visual" className="jackpot-container">
            <div className="boton-layout pl-2 pr-2">
                <div>
                    <img src={ImgHistorial} alt="Historial" onClick={handleHistoryClick} />
                </div>
                <div></div>
                <div>
                    <img src={ImgReglas} alt="Reglamento" onClick={handleRegulationClick} />
                </div>
            </div>
            <div className="jackpot-amounts">
                <span className="jackpot-medium-amount">298,480 ARS</span>
                <span className="jackpot-big-amount">545,358 ARS</span>
                <span className="jackpot-small-amount">484,939 ARS</span>
            </div>
            <video src={VideoJackpot} autoPlay loop muted className="jackpot-video"></video>
        </div>
    )
};

export default JackpotContainer;
