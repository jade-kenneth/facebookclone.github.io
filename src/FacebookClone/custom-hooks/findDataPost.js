import React from 'react'

export const findDataPost = () => {
    const [loading, setLoading] = useState(true);
    const [data, setPhotos] = useState([]);
    
    const getData = useCallback(async () => {
        
        const response = await fetch(url);
        
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
        
        
        
    }, [url]);

    useEffect(() => {
        setTimeout(() => {
            getData();
        },10000)
    }, [url, getData]);
    return { loading, data };
};
