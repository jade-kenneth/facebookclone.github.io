import { postdata } from "./postdata";

const defaultState = {
    postData: postdata,
    dataFound: false,
    postModal: false,
    loadComment: false,
    loadReply: false,
    reload: true,
    logged_out: false
}

export const loginReducer = (state = defaultState, action) => {
    switch(action.type){
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

                logged_out: true
            }
        default: 
            return state
    }
}
