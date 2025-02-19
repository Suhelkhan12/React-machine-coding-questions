import React from "react";
import FolderStructure from "./_components/FolderStructure";

const page = () => {
  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-8xl font-bold m-0">File tree</h1>
        <p className="text-xl text-black/70 ">
          A component used to showcase the folder and file structure of a
          directory.
        </p>
      </div>
      <div className="z-10 max-w-5xl mx-auto w-full items-center justify-between font-mono text-sm">
        <FolderStructure />
      </div>
    </div>
  );
};

export default page;
