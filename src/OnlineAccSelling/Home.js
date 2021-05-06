import React from 'react'
import nord from '../OnlineAccSelling/img/nordvpn.png'
import netflix from '../OnlineAccSelling/img/netlfix.jpg'
import tidal from '../OnlineAccSelling/img/tidal.jpg'
import spotify from '../OnlineAccSelling/img/spotify.jpg'
import disneyplus from '../OnlineAccSelling/img/disneyplus.jpg'
import hbomax from '../OnlineAccSelling/img/hbomax.jpg'
import calm from '../OnlineAccSelling/img/calm.png'
const Home = () => {
    
    const Navbar = () => {
        
    }


    return (
        <>
        <div>
            <nav>
                <ul className="logo">
                    <li> <img src={hbomax} alt=""/> <span>HBO MAX</span> </li>
                    <li> <img src={disneyplus} alt=""/><span>DISNEY PLUS</span></li>
                    <li><img src={spotify} alt=""/><span>SPOTIFY</span></li>
                    <li><img src={nord} alt=""/><span>NORD VPN</span></li>
                    <li><img src={calm} alt=""/><span>CALM</span></li>
                    <li><img src={tidal} alt=""/><span>TIDAL</span></li>
                    <li><img src={netflix} alt=""/><span>NETFLIX</span></li>
                    
                </ul>
            </nav>
        </div>
        </>    
    )
}

export default Home
