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
  FilePlus,
  ChevronsDown,
  Trash2,
  FolderPlus,
} from "lucide-react";
import NameInput from "./name-input";
import { it } from "node:test";

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
      setFileTree(
        updateFileTree(fileTree, currentParentId, (it) => ({
          ...it,
          children: [...(it.children || []), newFile],
        }))
      );
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
      setFileTree(
        updateFileTree(fileTree, currentParentId, (it) => ({
          ...it,
          children: [...(it.children || []), newFolder],
        }))
      );
    } else {
      //when user is simply creating a file or folder inide the root only
      setFileTree([...fileTree, newFolder]);
    }
  };

  // this function will be used to addFile and addFolder when there exits a parent id
  // this function simply will use recurssion here to update file and folder inside the nested folders
  const updateFileTree = (
    items: FileTreeItem[],
    id: string,
    updateFn: (item: FileTreeItem) => FileTreeItem
  ): FileTreeItem[] => {
    return items.map((it) => {
      if (it.id === id) {
        return updateFn(it);
      }

      // if the filetree has children then recurssivly check for id in inner nested folders
      if (it.children) {
        return { ...it, children: updateFileTree(it.children, id, updateFn) };
      }

      return it;
    });
  };

  // function to render an item file | folder created by user
  const renderItem = (item: FileTreeItem, parentId: string | null = null) => (
    <div key={item.id} className="ml-4 mb-1">
      <div className="flex items-center">
        {/* rendering file or folder normally when user enters a name  */}
        {item.type === "file" ? (
          <>
            <File className="size-4 mr-2" />
            <span>{item.name}</span>
          </>
        ) : (
          <>
            <Folder className="size-4 mr-2" />
            <span>{item.name}</span>
          </>
        )}
        <Button size={"icon"} variant={"destructive"} className="ml-2">
          <Trash2 className="size-4 text-white" />
        </Button>
      </div>
      {/* for creating new file or folder inside the current folder or root */}
      {item.type === "folder" && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                setCurrentParentId(item.id);
                setIsAddingFile(true);
              }}
            >
              <FilePlus className="size-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                setCurrentParentId(item.id);
                setIsAddingFolder(true);
              }}
            >
              <FolderPlus className="size-4" />
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <ChevronsDown className="size-4" />
            </Button>
          </div>
          {/* this will be used for rendering the folder for more nested folders */}
          {item.children &&
            item.children.map((child) => renderItem(child, item.id))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-2">
      <div className="flex space-x-2 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  // this is null because this button will add folder in root folder
                  setCurrentParentId(null);
                  setIsAddingFile(true);
                }}
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
                onClick={() => {
                  // this is null because this button will add folder in root folder
                  setCurrentParentId(null);
                  setIsAddingFolder(true);
                }}
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

      {/* rendering the nested items here */}
      {fileTree.map((it) => renderItem(it, null))}
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
