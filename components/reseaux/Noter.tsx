"use client";
import React, { useState } from "react";
import Rating from "react-star-rating-component";

interface NoterProps {
  note: number;
}

const Noter: React.FC<NoterProps> = ({ note }) => {
  const [rating, setRating] = useState(note);
  const handleStarClick = (
    nextValue: number,
    prevValue: number,
    name: string
  ) => {
    setRating(nextValue);
  };

  return (
    <div>
      <Rating
        name="rating"
        value={rating}
        onStarClick={(nextValue: number, prevValue: number, name: string) =>
          handleStarClick(nextValue, prevValue, name)
        }
        starCount={5}
        starColor={"#ffb400"}
        emptyStarColor={"#ccc"}
      />
    </div>
  );
};

export default Noter;
