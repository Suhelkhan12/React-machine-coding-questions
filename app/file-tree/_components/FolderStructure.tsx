"use client";
import React, { useState } from "react";
import {
  File,
  Folder,
  FolderPlus,
  FilePlus,
  ChevronsDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type FileTreeItem = {
  id: string;
  name: string;
  type: "file" | "folder";
  // children is taken of this type because if you look closely the type of children is going to be the same as the parent
  // point to be noted here is that this children will only exits for a folder not for a file
  children?: FileTreeItem[];
  // this is used to see if the folder is open or not
  isOpen?: boolean;
};

const FolderStructure = () => {
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  return (
    <div className="p-2">
      <div className="flex space-x-2 mb-4">
        <Button variant={"outline"} size={"icon"}>
          <FilePlus className="size-4 mr-1" />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <FolderPlus className="w-4 h-4 mr-1" />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <ChevronsDown className="w-4 h-4 mr-1" />
        </Button>
      </div>
    </div>
  );
};

export default FolderStructure;
