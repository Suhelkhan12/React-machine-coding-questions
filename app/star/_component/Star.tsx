"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

type StarComponentProps = {
  starsNumber: number;
};

const StarRating = ({ starsNumber }: StarComponentProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const handleStarClick = (val: number) => {
    setRating(val);
    toast.success(`You gave ${val} stars.`, {
      description: "Thank you so much for your support.",
    });
  };
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4">
        {Array.from({ length: starsNumber || 5 }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleStarClick(i + 1)}
            full={hoverIndex ? hoverIndex >= i + 1 : rating >= i + 1}
            onMouseEnter={() => setHoverIndex(i + 1)}
            onMouseLeave={() => setHoverIndex(0)}
          />
        ))}
      </div>
      <p className="text-2xl font-semibols">{hoverIndex || rating}</p>
    </div>
  );
};

export default StarRating;

type StarProps = {
  onClick: () => void;
  full: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
function Star({ onClick, full, onMouseEnter, onMouseLeave }: StarProps) {
  return (
    <span
      role="button"
      className="flex items-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {full ? (
        <FaStar className="text-4xl text-yellow-400" />
      ) : (
        <CiStar className="text-4xl text-yellow-400" />
      )}
    </span>
  );
}
