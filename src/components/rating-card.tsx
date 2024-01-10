import React from "react";
import RatingStar from "./icons/rating-star";
import { ratingType } from "@/types/rating-type";

function RatingCard(rating: ratingType) {
  return (
    <div className="rating-card">
      <div>
        <h2>{rating.email}</h2>
        <ul>
          <li>
            {rating.stars >= 1 ? <RatingStar.Filled /> : <RatingStar.NotFilled />}
          </li>
          <li>
            {rating.stars >= 2 ? <RatingStar.Filled /> : <RatingStar.NotFilled />}
          </li>
          <li>
            {rating.stars >= 3 ? <RatingStar.Filled /> : <RatingStar.NotFilled />}
          </li>
          <li>
            {rating.stars >= 4 ? <RatingStar.Filled /> : <RatingStar.NotFilled />}
          </li>
          <li>
            {rating.stars >= 5 ? <RatingStar.Filled /> : <RatingStar.NotFilled />}
          </li>
        </ul>
      </div>
      {rating.message !== '' && <p>{rating.message}</p>}
    </div>
  );
}

export default RatingCard;
