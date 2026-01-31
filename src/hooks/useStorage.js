// import { useState } from "react"

// export const useStoreage = ({key, initialValue}) => {

//     const getValue = () => {
//         const storedValue = localStorage.getItem(key);
//         return storedValue ? JSON.parse(storedValue) : initialValue;
//     }

//     const setStoredValue = (key, value) => {
//         localStorage.setItem(key, JSON.stringify(value));
//         setValue(value);
//     }
// }