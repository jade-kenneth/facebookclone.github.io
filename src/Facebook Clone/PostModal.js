import React from 'react'
import { BsCaretDown } from 'react-icons/bs';
import {BiWorld} from 'react-icons/bi';
const PostModal = ({profile, name, lastname,trigger, postVal,triggerChange, name_id, modalClose}) => {
    const input = document.querySelectorAll('create-post-content');
    
    return (
        
        <>
        
        <div className="pop-up-post-container">
        <div className="post-form">
            <div className="create-post-title">
                <div className="create-post">
                    <h2>Create Post</h2>
                </div>
                
                <div className="close-btn">
                    <button onClick={() => modalClose()}>X</button>
                </div>
                
            </div>
            <hr/>
            
            <div className="create-post-details">
                <img src={profile} alt="" className="mini-pic"/>
                <div>
                    <h4>{name} {lastname}</h4>
                    <button><BiWorld/> Public <BsCaretDown/> </button>
                </div>
                
            </div>
            <div className="create-post-content">
                <textarea onChange={triggerChange} type="text" value={postVal} name={name_id} id={name_id} cols="5" rows="5" placeholder="What's on your mind?"></textarea>
                
            </div>
            <button onClick={trigger}>POST</button>
        </div>
        </div>
        
        </>
    )
}

export default PostModal
