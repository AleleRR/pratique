import { useEffect, useRef, useCallback } from "react";

/**
 * Modal component: Accessible dialog overlay with focus trap.
 * role="dialog", aria-modal="true", aria-labelledby pointing to title.
 * Focus traps Tab key inside modal. Closes on backdrop click or Escape.
 */
export default function Modal({ title, onClose, children, footer }) {
    const modalRef = useRef(null);
    const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2, 8)}`).current;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") { onClose(); return; }
        if (e.key !== "Tab") return;

        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }, [onClose]);

    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length) focusable[0].focus();
    }, []);

    return (
        <div
            className="modal-overlay"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={handleKeyDown}
        >
            <div className="modal" ref={modalRef}>
                <div className="modal-header">
                    <div className="modal-title" id={titleId}>{title}</div>
                    <button className="close-btn" onClick={onClose} aria-label="Fechar modal">×</button>
                </div>
                <div className="modal-body">{children}</div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}
