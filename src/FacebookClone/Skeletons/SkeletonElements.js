import React from 'react'
import Shimmer from '../../scss/Shimmer';
const SkeletonElements =  ({ type }) => {
    const classes = `skeleton ${type}`;
    return (
        <React.Fragment >
        <div id="shimmer-container"  className={classes}>
        <Shimmer/>
        </div>
        
        </React.Fragment>
    )
}

export default SkeletonElements