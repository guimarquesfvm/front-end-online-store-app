import React from "react";
import RatingStar from "./icons/rating-star";
import { ratingType } from "@/types/rating-type";

function RatingCard(rating: ratingType) {
  const starsHandler = (star: number): any => {
    if (rating.stars >= star) return <RatingStar.Filled />;
    return <RatingStar.NotFilled />;
  };

  return (
    <div className="rating-card">
      <div>
        <h2>{rating.email}</h2>
        <ul>
          <li>{starsHandler(1)}</li>
          <li>{starsHandler(2)}</li>
          <li>{starsHandler(3)}</li>
          <li>{starsHandler(4)}</li>
          <li>{starsHandler(5)}</li>
        </ul>
      </div>
      {rating.message !== "" && <p>{rating.message}</p>}
    </div>
  );
}

export default RatingCard;
