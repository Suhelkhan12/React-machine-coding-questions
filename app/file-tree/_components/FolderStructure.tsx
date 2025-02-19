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
import NameInput from "./name-input";

type FileTreeItem = {
  id: string;
  name: string;
  type: "file" | "folder";
  // children is taken of this type because if you look closely the type of children is going to be the same as the parent
  children?: FileTreeItem[];
  isOpen?: boolean;
};

const FolderStructure = () => {
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  return (
    <div className="p-2">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={"outline"}
          onClick={() => {
            setIsAddingFile(true);
          }}
        >
          <FilePlus className="size-4 mr-1" />
          New file
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setIsAddingFolder(true);
          }}
        >
          <FolderPlus className="w-4 h-4 mr-1" />
          New Folder
        </Button>
        <Button variant={"outline"}>
          <ChevronsDown className="w-4 h-4 mr-1" />
          Collapse All
        </Button>
      </div>
      <NameInput
        title="Add new file"
        isOpen={isAddingFile}
        onClose={() => setIsAddingFile(false)}
      />
      <NameInput
        title="Add new folder"
        isOpen={isAddingFolder}
        onClose={() => setIsAddingFolder(false)}
      />
    </div>
  );
};

export default FolderStructure;
