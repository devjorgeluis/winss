import { useEffect } from "react";
import ImgBannerSprint from "/src/assets/img/banner-sprint.jpg";
import IconClose from "/src/assets/svg/close.svg";

const SprintModal = ({ isOpen, onClose }) => {
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
                id="pSLots5" 
                className="modal show extra-modal-root"
                role="dialog"
                aria-modal="true"
                style={{ display: "block" }}
                onClick={handleBackdropClick}
            >
                <div role="document" className="modal-dialog">
                    <div className="modal-content extra-animate-in">
                        <div className="modal-body p-0">
                            <button
                                onClick={onClose}
                                className="close close-modal-new-roulette"
                                aria-label="Close"
                                type="button"
                            >
                                <img src={IconClose} alt="Close" />
                            </button>

                            <img
                                width="100%"
                                id="bannpop"
                                src={ImgBannerSprint}
                                className="img-full img-responsive"
                                alt="Sprint promotion"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SprintModal;
