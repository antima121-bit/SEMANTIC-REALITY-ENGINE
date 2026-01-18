import React, { useEffect, useRef } from 'react';
import '../index.css';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX: x, clientY: y } = e;

            if (dotRef.current) {
                dotRef.current.style.left = `${x}px`;
                dotRef.current.style.top = `${y}px`;
            }

            if (outlineRef.current) {
                outlineRef.current.animate({
                    left: `${x}px`,
                    top: `${y}px`
                }, { duration: 500, fill: "forwards" });
            }
        };

        window.addEventListener('mousemove', moveCursor);

        // Add hover effects for interactive elements
        const handleMouseEnter = () => {
            if (outlineRef.current) {
                outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
                outlineRef.current.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            }
        };

        const handleMouseLeave = () => {
            if (outlineRef.current) {
                outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                outlineRef.current.style.backgroundColor = 'transparent';
            }
        };

        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll('button, textarea, input, a');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        // Attach periodically or observe DOM (simplification for now: run once and on updates)
        attachListeners();
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            const interactiveElements = document.querySelectorAll('button, textarea, input, a');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--accent-color)',
                    borderRadius: '50%',
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px var(--accent-color)'
                }}
            />
            <div
                ref={outlineRef}
                className="cursor-outline"
                style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--accent-color)',
                    borderRadius: '50%',
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s'
                }}
            />
        </>
    );
};

export default CustomCursor;
