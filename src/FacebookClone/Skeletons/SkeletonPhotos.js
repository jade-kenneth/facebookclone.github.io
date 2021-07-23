import React from 'react';

import SkeletonElements from './SkeletonElements';

const SkeletonPhotos = ({ theme }) => {
    const themeClass = theme || 'light';
    return (
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-photo-container">
                <div className="row">
                        <SkeletonElements type="title"/>
                        <SkeletonElements type="sm-text"/>
                </div>
                <div className="skeleton-photos">
                    
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                    <SkeletonElements className="img" type="thumbnail"/>
                </div>
                
            </div>
            
        </div>
        
        
    )
}

export default SkeletonPhotos