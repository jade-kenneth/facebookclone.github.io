
export const reducer = (state,action) => {

    
    if(action.type === "POSTS_DATA"){
        let prof = state.currentLoggedData.find((data) => 
        data.id === action.payload);
        
        
        return {
            ...state,
            currentLoggedData: prof,
            dataFound: true,

        }
    }
    if(action.type === "MODAL_POST"){
        return {
            ...state,
            dataFound: true,
            postModal: true
            
        }
    }
    if(action.type === "MODAL_POST_CLOSE"){
        return {
            ...state,
            postModal: false
            
        }
    }
    if(action.type === 'LOGGED'){
        return{
            ...state,
            isLogged: true
        }
    }
    if(action.type === "LOAD_COMMENT"){
        return {
            ...state,
            loadComment: true
        }
    }
    
};
