import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={`${styles.modal} ${className}`}>
                <button 
                    type="button" 
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ✖
                </button>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
