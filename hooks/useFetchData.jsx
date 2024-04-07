import {useEffect, useState} from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const fetchData = async()=>{
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
            if(data.ok){
               throw new Error(data.statusText)
               
            }
            setData(data.data)
            setLoading(false)
        } catch (error) {
            setError(error);
        }
        }
        fetchData();
    }, [url])
    
    return {data, loading, error}
}

export default useFetchData;