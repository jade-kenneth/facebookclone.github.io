import React from 'react'
import { login_data } from './login_data'
import { postdata } from './postdata'

const defaultState = {
    currentLoggedData: login_data,
    isModalOpen: false,
    modalContent: '',
    isAddAccount: false,
    activeAccount: [],
    isCreateAccount: false,
    isActive: false,
    isLogged: false,
    postData: postdata,
    dataFound: false,
    postModal: false,
    loadComment: false,
    loadReply: false,
    reload: true,
    logged_out: false,
    availableLocStorage: false
}

export const authReducer = (state = defaultState, action) => {
    
    switch(action.type){
        
        case 'SET_AUTH':
        
            return{
                ...state,
                isLogged: true,
                isModalOpen: false,
                activeAccount: action.AUTH_ACCOUNT
            }
        case "REMOVE_PROFILE":
            const newProfile = defaultState.currentLoggedData.filter((data) => data.id != action.payload)
            return {
                ...state,
                currentLoggedData: newProfile,
                isModalOpen: false
                
                
            };
        
        case "ADD_ACCOUNT":
            return {
                ...state,
                isModalOpen: true,
                isAddAccount: true,
            }
        
        case "CLOSE_MODAL":
            return{
                ...state,
                isModalOpen: false,
                isAddAccount: false,
                isCreateAccount: false,
                activeAccount: [],
                isActive: false
            }
        
        case"LOGIN_PROFILE":

            const profileToLogin = defaultState.currentLoggedData.filter((data) => data.id === action.payload);
            
            return {
                ...state,
                isModalOpen: true,
                isAddAccount: false, 
                activeAccount: profileToLogin,
                isCreateAccount: false,
                isActive: true
            }
        
        case "CREATE_ACCOUNT":
            return {
                ...state,
                isCreateAccount: true,
                isModalOpen: true,
                isAddAccount: false, 
                activeAccount: []
            }
        
        case "FIND_DATA": 
            let prof = defaultState.currentLoggedData.find((data) => 
            data.id === action.payload);
            prof.isLogged = true;
            return {
                ...state,
                currentLoggedData: prof,
                activeAccount: prof
                
            }
            case "MODAL_POST_CLOSE":
                return {
                    ...state,
                    postModal: false
                    
                }
            case "MODAL_POST":
                return {
                    ...state,
                    postModal: true
                    
                }
            case 'POSTS_DATA':
                let allPosts = [];
                const postData = defaultState.postData.filter((data) => data.id === action.payload);
                postData.map((data) => {
                    const {posts} = data;
                    posts.map((data) => {
                        
                        allPosts.push(data);
                    }) 
                })
                console.log(...allPosts);
                return {...state, 
                    
                    posts:  allPosts,
                    dataFound: true,
                    
                }
            case 'LOAD_COMMENT':
                
                return {...state, 
                    
                    loadComment: true
                    
                }
            case 'LOAD_REPLY':
                
                return {...state, 
                    
                    loadReply: true
                    
                }
            case 'DELETE_COMMENT':
                
                return {...state, 
                    
                    loadReply: true
                    
                }
            case 'LOGGED_OUT':
                return {
                    ...state,
    
                    logged_out: true,
                    activeAccount: []
                }
        default: 
            return state
    }
}
