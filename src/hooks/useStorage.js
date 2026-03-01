import { useState } from "react";

export const useStorage = ({ key, initialValue }) => {
    const getValue = () => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            return initialValue;
        }
    };

    const [value, setValue] = useState(getValue);

    const setStoredValue = (newValue) => {
        try {
            const valueToStore =
                newValue instanceof Function ? newValue(value) : newValue;

            setValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    };

    return [value, setStoredValue];
};