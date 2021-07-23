import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const getData = useCallback(async () => {
        

        try{
            const response = await fetch(url);
            
            const data = await response.json();
            setData(data);
            setLoading(false);
        }
        catch(err){
            console.log("error: " + err);
        }
        
        
    }, [url]);

    useEffect(() => {
       
            getData();
        

        
    }, [url, getData]);
    return {data ,loading };
};
// const newPost = {id: uuid(),  body: toPostVal.post, comment: [] };
// props.posts.push(newPost);