import {useEffect, useState} from "react";

export const useFetch = (
    {
        url,
        successfullyFetch = () => {
        },
        initLoad = true
    }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})
    const [isFetch, setIsFetch] = useState(false)
    const fetchApi = async (apiUrl = url) => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw Error(`Could not fetch ${apiUrl}`);
            }
            const jsonData = await response.json();
            setData(jsonData);
            successfullyFetch(jsonData)
        } catch (error) {
            setLoading(false);
            console.error(error);
        } finally {
            setLoading(false);
            setIsFetch(true)
        }
    }

    useEffect(() => {
        if (initLoad && !isFetch) {
            fetchApi(url)
        }
    }, []);

    return {
        loading, data, fetchApi
    }
}