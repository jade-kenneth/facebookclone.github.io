import React from 'react'
import SkeletonElements from './SkeletonElements'

const PostSkeleton = ({theme}) => {
    const themeClass = theme || 'light';
    return (
        <React.Fragment>
            <div className={`skeleton-wrapper ${themeClass}`}>
                <div className="skeleton-post">
                    <div className="header">
                        
                        <SkeletonElements type="mini-avatar"/>
                        
                        <div className="column">
                            <SkeletonElements type="title"/>
                            <SkeletonElements type="sm-text"/>
                        </div>
                        
                        <SkeletonElements type="icon"/>
                        
                        
                    </div>
                    <div className="body">
                        <SkeletonElements type="md-text"/>
                        <SkeletonElements type="text"/>
                    </div>
                    
                    <div className="skeleton-react">
                        <SkeletonElements type="icon"/>
                        <SkeletonElements type="icon-text"/>
                        <SkeletonElements type="icon"/>
                        <SkeletonElements type="icon-text"/>
                        <SkeletonElements type="icon"/>
                        <SkeletonElements type="icon-text"/>

                    </div>
                    <div className="skeleton-comment">
                        <SkeletonElements type="comment"/>
                    </div>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default PostSkeleton
