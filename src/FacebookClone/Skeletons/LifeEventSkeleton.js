import React from 'react'

import SkeletonElements from './SkeletonElements';
const LifeEventSkeleton = ({theme}) => {
    const themeClass = theme || 'light';
    return (
        <React.Fragment>
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div>
                    <SkeletonElements type="text"/>
            </div>
            <div className="skeleton-events">
                <div className="skeleton-events-text">
                    <SkeletonElements type="text"/>
                    <SkeletonElements type="text"/>
                    
                </div>
                <SkeletonElements  type="thumbnail"/>
                <SkeletonElements  type="thumbnail"/>
                
                
            </div>
    </div>
    <div>
        <SkeletonElements type="text"/>
    </div>
    </React.Fragment>
    )
}

export default LifeEventSkeleton
