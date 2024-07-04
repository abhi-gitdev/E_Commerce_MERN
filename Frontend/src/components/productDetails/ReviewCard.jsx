import React from 'react'
import profilePng from '../../assets/profile.png'
const ReviewCard = ({ review }) => {
  const options = {
    size: 'large',
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
    </div>
  )
}

export default ReviewCard
