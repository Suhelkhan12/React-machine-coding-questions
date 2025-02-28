"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  File,
  Folder,
  FolderPlus,
  FilePlus,
  ChevronsDown,
  Trash2,
} from "lucide-react";
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
  const [fileTree, setFileTree] = useState<FileTreeItem[]>([]);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  // this currentparentId will decide whethere user is tryin to create a file or folder nested insde a parent folder of simply creating something inside the root folder
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);

  const addFile = (name: string) => {
    // this is simply a new instance of the file which the user will create and user will only provide the name and rest all fields will be decided by us
    const newFile: FileTreeItem = {
      id: Date.now().toString(),
      name,
      type: "file",
      isOpen: false,
    };

    //if there is parentId which means user is trying to create a folder or file insde a folder
    if (currentParentId) {
      // then we will need to add that file or folder inside the folder
    } else {
      //when user is simply creating a file or folder inide the root only
      setFileTree([...fileTree, newFile]);
    }
  };

  const addFolder = (name: string) => {
    const newFolder: FileTreeItem = {
      id: Date.now().toString(),
      name,
      type: "folder",
      //because this folder can have other file or folder inside it for the user to create
      children: [],
      isOpen: false,
    };

    //if there is parentId which means user is trying to create a folder or file insde a folder
    if (currentParentId) {
      // then we will need to add that file or folder inside the folder
    } else {
      //when user is simply creating a file or folder inide the root only
      setFileTree([...fileTree, newFolder]);
    }
  };

  return (
    <div className="p-2">
      <div className="flex space-x-2 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setIsAddingFile((p) => !p)}
              >
                <FilePlus className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add new file</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setIsAddingFolder((p) => !p)}
              >
                <FolderPlus className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add new folder</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <ChevronsDown className="w-4 h-4 " />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Collapse all</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <NameInput
        title="file"
        isOpen={isAddingFile}
        onClose={() => setIsAddingFile((p) => !p)}
        onCreate={addFile}
      />
      <NameInput
        title="folder"
        isOpen={isAddingFolder}
        onClose={() => setIsAddingFolder((p) => !p)}
        onCreate={addFolder}
      />
    </div>
  );
};

export default FolderStructure;
