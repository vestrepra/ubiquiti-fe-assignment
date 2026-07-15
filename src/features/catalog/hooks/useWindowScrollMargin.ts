import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures the offset from the top of the page to a list rendered in normal
 * document flow, for use as a window virtualizer's `scrollMargin`, and re-syncs
 * window scroll after back/forward navigation.
 *
 * NOTE: `useWindowVirtualizer` must be called directly inside the rendering
 * component (not wrapped in a hook). The React Compiler detects it as an
 * incompatible library and skips memoizing that component; wrapping it would
 * leave the component memoized and render stale (blank) rows while scrolling.
 */
export function useWindowScrollMargin<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [scrollMargin, setScrollMargin] = useState(0);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const measure = () => setScrollMargin(element.offsetTop);
        measure();

        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useLayoutEffect(() => {
        let innerFrame = 0;
        const outerFrame = requestAnimationFrame(() => {
            innerFrame = requestAnimationFrame(() => {
                if (window.scrollY > 0) {
                    window.dispatchEvent(new Event('scroll'));
                }
            });
        });

        return () => {
            cancelAnimationFrame(outerFrame);
            cancelAnimationFrame(innerFrame);
        };
    }, []);

    return { ref, scrollMargin };
}
