import React from 'react'
import './Sidecardskeleton.css'; 


export default function Sidecardskeleton() {
  return (
    <div className="card skeleton">
  <div className="skeleton-img"></div>
  <div className="skeleton-textBox">
    <div className="skeleton-textContent skeleton-title"></div>
    <div className="skeleton-textContent skeleton-release-date"></div>
    <div className="skeleton-textContent skeleton-rating"></div>
  </div>
</div>

  )
}
