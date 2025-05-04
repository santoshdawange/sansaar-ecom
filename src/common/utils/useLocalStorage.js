import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Get the value from localStorage and parse it, or use the initial value if not found
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”:', error);
            return initialValue;
        }
    });

    // Save the value to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error setting localStorage key “' + key + '”:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};

export default useLocalStorage;
