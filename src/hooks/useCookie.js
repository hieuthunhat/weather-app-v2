import {useState, useCallback} from "react";

export function parseCookie(key) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match[1]));
    } catch {
        return null;
    }
}

export const useCookie = ({key, initialValue = null, maxAgeDays = 30}) => {
    const [value, setValue] = useState(() => {
        return parseCookie(key) ?? initialValue;
    });

    const setCookie = useCallback((newValue) => {
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        const encoded = encodeURIComponent(JSON.stringify(valueToStore));
        const maxAge = maxAgeDays * 24 * 60 * 60;
        document.cookie = `${key}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }, [key, maxAgeDays, value]);

    const removeCookie = useCallback(() => {
        setValue(initialValue);
        document.cookie = `${key}=; path=/; max-age=0`;
    }, [key, initialValue]);

    return [value, setCookie, removeCookie];
};