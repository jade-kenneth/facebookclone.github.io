import React, { useEffect, useRef } from 'react'
import { BsCaretDown } from 'react-icons/bs';
import {BiWorld} from 'react-icons/bi';
const PostModal = ({profile, name, lastname,trigger, postVal,triggerChange, name_id, modalClose}) => {
    const input = document.querySelectorAll('create-post-content');
    const postRef = useRef(null);
    let text = document.getElementById('text');
    useEffect(() => {
            const tx = document.getElementsByTagName("textarea");
            for (let i = 0; i < tx.length; i++) {
                if(tx[i].textLength <=  100){
                    
                    tx[i].setAttribute("style", `height:  ${tx[i].scrollHeight}px;overflow-y:hidden; font-size: 1.3rem`);
                    tx[i].addEventListener("input", OnInput, false);   
                }
                else if(tx[i].textLength >= 150 ){
                    tx[i].setAttribute("style", `height:  ${tx[i].scrollHeight}px;overflow-y:visible; font-size: 1.2rem`);
                    tx[i].addEventListener("input", OnInput, false);
                }
                else{
                    tx[i].setAttribute("style", `height:  ${tx[i].scrollHeight}px;overflow-y:hidden; `);
                    tx[i].addEventListener("input", OnInput, false);
                    
                }
            
            
            }

            function OnInput() {
                this.style.height = "auto";
                this.style.height = (this.scrollHeight) + "px";
                
            }
        
    }) 
    
    useEffect(() => {
        postRef.current.focus();
    },[])
    return (
        
        <React.Fragment>
        
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
            <textarea  id='text' ref={postRef}  onChange={triggerChange} type="text" value={postVal} name={name_id} id={name_id} rows="1"      placeholder="What's on your mind?"></textarea>
                
            </div>
            
            <div className="post-btn" >
                <button onClick={trigger}>POST</button>
            </div>
            
        </div>
        </div>
        
        </React.Fragment>
    )
}

export default React.memo(PostModal)
