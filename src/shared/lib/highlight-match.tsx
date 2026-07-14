import type { ReactNode } from 'react';

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const highlightMatch = (text: string, query: string): ReactNode => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;

    const regex = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
        const isMatch = part.toLowerCase() === normalizedQuery.toLowerCase();

        if (!isMatch) {
            return part;
        }

        return (
            <span key={index} className="font-bold underline">
                {part}
            </span>
        );
    });
};
