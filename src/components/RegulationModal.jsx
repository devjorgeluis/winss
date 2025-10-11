import { useEffect } from "react";
import IconClose from "/src/assets/svg/close.svg";

const RegulationModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("extra-modal-root")) {
            onClose?.();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="modal-backdrop-custom show" />

            <div
                id="reglamento" 
                className="modal show extra-modal-root"
                role="dialog"
                aria-modal="true"
                style={{ display: "block" }}
                onClick={handleBackdropClick}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content extra-animate-in">
                        <div className="modal-header">
                            <h5 id="reglamentoLabel" className="modal-title text-white">Reglamento del Sistema Jackpot</h5>
                            <button
                                onClick={onClose}
                                className="close close-modal-new-roulette"
                                aria-label="Close"
                                type="button"
                            >
                                <img src={IconClose} alt="Close" style={{filter: "invert(1)"}} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe style={{width: "100%", height: "500px"}} src="/docs/reglamento-general-sistema-jackpot.pdf" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegulationModal;
