import React from 'react'
import profilePng from '../../assets/profile.png'
import { Rating } from '@mui/material'
import './ReviewCard.css'
const ReviewCard = ({ review }) => {
  const options = {
    size: 'small',
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}></Rating>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
