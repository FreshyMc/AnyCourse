import { useEffect, useImperativeHandle, useRef } from "react";

export default function Modal({ref, children}) {
    const modalRef = useRef(null);
    
    const handleClose = () => {
        modalRef.current.close();
    };

    const handleOpen = () => {
        modalRef.current.showModal();
    };

    useImperativeHandle(ref, () => {
        return {
            close: () => handleClose(),
            open: () => handleOpen()
        };
    }, []);

    const handleHandleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleHandleEscapeKey);

        return () => window.removeEventListener('keydown', handleHandleEscapeKey);
    });

    return (
        <dialog className="dialog-wrapper" ref={modalRef}>
            {children}
        </dialog>
    );
}