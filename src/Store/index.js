import React from 'react'

const Index = () => {


    
    const defaultState = {
        products: [],
        isModalOpen: false,
        modalContent: ''
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}

export default Index
