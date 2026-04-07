/**
 * Skeleton loading components with shimmer animation.
 * Variants: SkeletonText, SkeletonCard, SkeletonTable, SkeletonStat.
 */

export function SkeletonText({ lines = 3, width = "100%" }) {
    return (
        <div className="skeleton-group" style={{ width }}>
            {Array.from({ length: lines }, (_, i) => (
                <div
                    key={i}
                    className="skeleton skeleton-text"
                    style={{ width: i === lines - 1 ? "60%" : "100%" }}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="skeleton skeleton-card" aria-hidden="true">
            <div className="skeleton skeleton-text" style={{ width: "40%", height: 14 }} />
            <div className="skeleton skeleton-text" style={{ width: "80%", marginTop: 12 }} />
            <div className="skeleton skeleton-text" style={{ width: "60%", marginTop: 8 }} />
        </div>
    );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
    return (
        <div className="skeleton-table" aria-hidden="true">
            {Array.from({ length: rows }, (_, r) => (
                <div key={r} className="skeleton-table-row">
                    {Array.from({ length: cols }, (_, c) => (
                        <div key={c} className="skeleton skeleton-text" style={{ flex: 1 }} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function SkeletonStat() {
    return (
        <div className="skeleton skeleton-stat" aria-hidden="true">
            <div className="skeleton skeleton-text" style={{ width: 32, height: 32, borderRadius: "50%" }} />
            <div className="skeleton skeleton-text" style={{ width: "50%", height: 24, marginTop: 10 }} />
            <div className="skeleton skeleton-text" style={{ width: "70%", marginTop: 6 }} />
        </div>
    );
}

/**
 * Wrapper that shows skeleton for `delay` ms, then reveals children with fade-in.
 */
import { useState, useEffect } from "react";

export function SkeletonLoader({ children, skeleton, delay = 600 }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (loading) return skeleton;

    return <div className="skeleton-reveal">{children}</div>;
}
