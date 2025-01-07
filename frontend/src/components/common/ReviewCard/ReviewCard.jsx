import React from 'react'
import profileImg from '../../../assets/profile.png'
import { Rating } from '@mui/material'
import './ReviewCard.css'
import { BASE_URL } from '../../../redux/constants'

const ReviewCard = ({ review }) => {
  const options = {
    size: 'medium',
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }
  const profile = review?.avatar ? BASE_URL + '/' + review.avatar : profileImg
  return (
    <div className="reviewCard">
      <div>
        <img src={profile} className="profile-img" />
        <div className="userReviewDetail">
          <h2>
            {review.firstName} {review.lastName}
          </h2>
          <Rating {...options}></Rating>
        </div>
      </div>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
