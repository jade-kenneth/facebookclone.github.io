export const reducer = (state,action) => {

    if(action.type === "REMOVE_PROFILE"){
        const newProfile = state.login_dataS.filter((data) => data.id != action.payload)
        return {
            ...state,
            login_dataS: newProfile,
            isModalOpen: false
            
            
        };
    }
    if(action.type === "ADD_ACCOUNT"){
        return {
            ...state,
            isModalOpen: true,
            isAddAccount: true,
        }
    }
    if(action.type === "CLOSE_MODAL"){
        return{
            ...state,
            isModalOpen: false,
            isAddAccount: false,
            isCreateAccount: false,
            activeAccount: [],
            isActive: false
        }
    }
    if(action.type === "LOGIN_PROFILE"){
        const profileToLogin = state.login_dataS.filter((data) => data.id === action.payload);
        
        return {
            ...state,
            isModalOpen: true,
            isAddAccount: false, 
            activeAccount: profileToLogin,
            isCreateAccount: false,
            isActive: true
        }
    }
    if(action.type === "CREATE_ACCOUNT"){
        return {
            ...state,
            isCreateAccount: true,
            isModalOpen: true,
            isAddAccount: false, 
            activeAccount: []
        }
    }
    if(action.type === "FIND_DATA"){
        const prof = state.login_dataS.find((data) => 
        data.id === action.payload);
        console.log(prof);
        return {
            ...state,
            login_dataS: prof
        }
    }
    if(action.type === "POSTS_DATA"){
        const prof = state.login_dataS.find((data) => 
        data.id === action.payload);
        
        
        return {
            ...state,
            login_dataS: prof,
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
    
};
