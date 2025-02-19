import StarRating from "./_component/Star";
import { createElement } from "react";

const page = async () => {
  const res = await fetch("https://attendly.atturtlespace.workers.dev/");
  const data = await res.json();
  console.log(data.length);
  return (
    <div className="flex gap-10 flex-col">
      <h1 className="text-8xl font-bold">Star rating component</h1>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-10">
          <StarRating starsNumber={5} />
        </div>
      </div>
    </div>
  );
};

export default page;
