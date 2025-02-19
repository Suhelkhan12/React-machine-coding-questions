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
  // point to be noted here is that this children will only exits for a folder not for a file
  children?: FileTreeItem[];

  // this is used to see if the folder is open or not
  isOpen?: boolean;
};

const FolderStructure = () => {
  const [structure, setStructure] = useState<FileTreeItem[]>([]);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  // function for creating a new file
  const addFile = (name: string) => {
    const newFile: FileTreeItem = {
      id: Date.now().toString(),
      name,
      type: "file",
    };
    setStructure([...structure, newFile]);
  };

  const addFolder = (name: string) => {
    const newFolder: FileTreeItem = {
      id: Date.now().toString(),
      name,
      type: "folder",
      // for every new folder created the children will be an empty array
      children: [],
    };
    setStructure([...structure, newFolder]);
  };

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
