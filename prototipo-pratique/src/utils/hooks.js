import { useState, useEffect } from "react";

/**
 * Custom hook: Returns current window width, updates on resize.
 * Usage: const width = useWindowWidth();
 */
export function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        let raf;
        const handleResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => setWidth(window.innerWidth));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return width;
}
