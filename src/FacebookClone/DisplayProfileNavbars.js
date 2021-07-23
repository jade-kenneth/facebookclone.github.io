import {FcCompactCamera} from 'react-icons/fc';
import { FaPen  } from "react-icons/fa";
import { AiFillEye, AiFillCaretDown } from "react-icons/ai";
import {BsThreeDots} from 'react-icons/bs';
import { GrAddCircle } from "react-icons/gr";
import { useParams } from 'react-router';


export const DisplayProfileNavbars = [
    
    {
        
        id: 1,   
        title: 'Posts',
        link: '/'
    },
    {
        id: 2, 
        title: 'About',
        link: '/about'
    },
    {
        id: 3, 
        title: 'Friends',
        link: '/friends'
    },
    {
        id: 4, 
        title: 'Photos',
        link: '/photos'
    },
    {
        id: 5, 
        title: 'More',
        link: '/more'
    },
]
