import React, {Component} from 'react';
import Profile from './Profile';

class Links extends Component {
    state = {
        photoLink: [{
            title: 'Photos of You',
            link: '/photos' 
        },
        {
            title: 'Your Photos',
            link: '/photos_by'
        },
        {
            title: 'Albums',
            link: '/photos_albums'
        }],
        aboutLink: [ {
            title: 'Overview',
            link: '/about' 
        },
        {
            title: 'Work and Education',
            link: '/work_and_education'
        },
        {
            title: 'Place Lived',
            link: '/place_lives'
        },
        {
            title: 'Contact and Basic Info',
            link: '/contact_info'
        },
        {
            title: 'Family and Relationships',
            link: '/family'
        },
        {
            title: 'Details about You',
            link: '/details_about_you'
        },
        {
            title: 'Life Events',
            link: '/life_events'
        },]
    }

    render() {
        return <Profile photoLink={this.state.photoLink} aboutLink={this.state.aboutLink} />
    }
}
export default Links;