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
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

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
      />
      <NameInput
        title="folder"
        isOpen={isAddingFolder}
        onClose={() => setIsAddingFolder((p) => !p)}
      />
    </div>
  );
};

export default FolderStructure;
