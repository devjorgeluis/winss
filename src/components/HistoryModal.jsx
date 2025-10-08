import { useEffect } from "react";
import IconClose from "/src/assets/svg/close.svg";

const HistoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("extra-modal-root")) {
            onClose?.();
        }
    };

    return (
        <>
            <div className="modal-backdrop-custom show" />

            <div
                id="historial" 
                className="modal show extra-modal-root"
                role="dialog"
                aria-modal="true"
                style={{ display: "block" }}
                onClick={handleBackdropClick}
            >
                <div className="modal-dialog">
                    <div className="modal-content extra-animate-in">
                        <div className="modal-body pt-5">
                            <button
                                onClick={onClose}
                                className="close close-modal-new-roulette"
                                aria-label="Close"
                                type="button"
                            >
                                <img src={IconClose} alt="Close" />
                            </button>
                            <div className="container" style={{marginTop: "10vh"}}>
                                <h4 className="text-white mb-3">🏆 Últimos Ganadores</h4>
                                <table className="table table-dark table-bordered text-center table-fixed">
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Rango</th>
                                            <th>Ronda</th>
                                            <th>Juego</th>
                                            <th>Jackpot</th>
                                        </tr>
                                    </thead>
                                    <tbody id="winner-body"></tbody>
                                </table>
                                <nav><ul id="pagination" className="pagination justify-content-center"></ul></nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryModal;
