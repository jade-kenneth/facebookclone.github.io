import React, {useState} from 'react';
import { FcHome, FcBriefcase } from "react-icons/fc";
import { friend_data } from "./Frienddata";
import {  GrWifi } from "react-icons/gr";
import {useFetch} from './custom-hooks/useFetch'
import SkeletonPhotos from './Skeletons/SkeletonPhotos'
import LifeEventSkeleton from './Skeletons/LifeEventSkeleton';
import { photos } from './Photosdata';
import { AuthorizedUserData } from './contexts/UserContext';





const PostContent1 = ({lived, pic, job}) => {
   console.log(photos);
    const {authorizedData} = AuthorizedUserData();
    return (
        <div className="post-container">
            <div className="post-container-left">
                <div className="intro">
                    <h2>Intro</h2>
                    <h3><GrWifi className="rotate"/>Followed by 1,030,210 people</h3>
                    <button>Edit Details</button>
                    <button>Add Hobbies</button>
                    <button>Add Featured</button>
                </div>
                <Photos  authorizedData={authorizedData} />
                <Friends authorizedData={authorizedData} />
                <LifeEvents  authorizedData={authorizedData}  pic={pic} lived={lived} job={job}/>
            </div>
        
        </div>
    )
}
const LifeEvents = (props) => {
    
    return (
        <React.Fragment>
            
        {props.authorizedData.dataFound && <><div className="life-events">
            <div>
                <h2>Life Events</h2>
            </div>
            
            <div className="row">
                <div className="lived">
                    
                    <img src={props.pic} alt=""/>
                    <div className="place">
                        <FcHome/>
                        <p>{props.lived} March 2, 1997</p>
                    </div>
                </div>
                <div className="job">
                        <FcBriefcase/>
                    <h5>Started Job At {props.job}</h5>
                </div>
            </div>
        </div>
        <nav>
            <ul className="nav-policy">
                <li><a href="">Privacy</a></li>
                <li><a href="">Terms</a></li>
                <li><a href="">Advertising</a></li>
                <li><a href="">Ad Choices</a></li>
                <li><a href="">Cookies</a></li>
                <li><a href="">Facebook © 2021</a></li>
            </ul>
        </nav></>}
        {!props.authorizedData.dataFound && <LifeEventSkeleton theme="dark"/>}
        </React.Fragment>
    )
}
const Friends = (props) => {
    return (
        <>
        {props.authorizedData.dataFound&& <div className="friends">
            <div className="friend-nav">
                <div className="row">
                    <h2>Friends</h2>
                    <a href="#">See All Friends</a>
                </div>
                <p>4,070 friends</p>
            </div>
            <div className="friend-lists">
                {friend_data.map((data) => {
                    const {id, profile, fullname} = data;
                    return (
                        <div key={id} className="friend-list-container">
                            <img src={profile} className="friend-photo" alt=""/>
                            <p className="fullname">{fullname}</p>
                        </div>
                    )
                })}
            </div>
        </div>}
        {!props.authorizedData.dataFound &&  <SkeletonPhotos theme="dark"/>
    }
        </>
    )
}

const Photos = (props) => {
    
    
    return (
        <>
        {props.authorizedData.dataFound && <div className="photos">
        <div className="photo-nav">
            <h2>Photos</h2>
            <a href="#">See all photos</a>
        </div>
        <div className="photo-list" >
        {  photos.slice(0, 9).map((data) => {
            const {photo, id} = data 
            return (
                <div key={id} className="photo-list-container">
                    <img src={photo} alt="sahhsa" className="myphotos"/>
                    
                </div>
                
            )
        })}
        
        </div> 
    </div> }
    {!props.authorizedData.dataFound &&  <SkeletonPhotos theme="dark"/>
    }
    </>
    )
}

export default PostContent1
