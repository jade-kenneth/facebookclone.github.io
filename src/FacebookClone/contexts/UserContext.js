import React, { createContext, useMemo, useContext, useState, useHistory, useReducer, useEffect, useCallback } from "react";

import {useFetch} from '../custom-hooks/useFetch';
import { authReducer } from "../authReducer";
import { postdata } from "../postdata";
import { login_data } from "../login_data";
import axios from 'axios';
import uuid from 'uuid/dist/v4';
const UserContext = createContext();
const UserPostDataContext= createContext();
const BoolAuthorized = createContext();
const ProfilePicture = createContext();
export function AuthorizedUserData(){
    return useContext(UserContext);
}

export function AuthorizedUserSession(){
    return useContext(BoolAuthorized);
}
export function AuthorizedUserPosts(){
    return useContext(UserPostDataContext);
}
export function TheDefaultPic(){
    return useContext(ProfilePicture);
}



export function UserContextProvider ({children}){
    // const [posts, setPosts] = useState(null);
    // const retrievePosts = async() => {
    //     const response = await axios.get('http://localhost:8000/userPosts/');
    //     return response.data;
    // }
    
    // useEffect(() => {
    //     const getAllPosts = async () => {
    //         const allPosts = await retrievePosts();
    //         if(allPosts){
    //             setAllPosts(allPosts);
    //         }
        
    //     }
    //     getAllPosts();
        
    // },[])
    // useEffect(() => {
    //     localStorage.setItem("posts", JSON.stringify(posts));
    // },[posts])

    // const addPostHandler =  async (posts) => {
    //     const request = {
    //         id: uuid(),
    //         ...posts
    //     }
    //     const response = await axios.post('http://localhost:8000/userPosts/', request)
    //     setPosts([...posts, response.data]);
    // }
    
    const [authorizedData, dispatch] = useReducer(authReducer,[],()=>{
        
        const localData = localStorage.getItem('authorizedData');
            return localData ? JSON.parse(localData) : [] ;
    });
    useEffect(() => {
        localStorage.setItem('authorizedData', JSON.stringify(authorizedData));
        if(authorizedData.logged_out){
            localStorage.removeItem('authorizedData');
            authorizedData.dataFound = false
            authorizedData.logged_out = false
        }
    }, [authorizedData])
    
    
    return(
        <UserContext.Provider value={{authorizedData,dispatch}} >
                
                {children}
                
                    
                
        </UserContext.Provider>
    )
}