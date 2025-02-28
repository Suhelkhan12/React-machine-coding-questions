"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import { toast } from "sonner";

type NameInputProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

const NameInput = ({ title, isOpen, onClose, onCreate }: NameInputProps) => {
  const [ipVal, setIpVal] = useState("");

  const handleSubmit = () => {
    onCreate(ipVal);
    toast.success("Congratulations🎊", {
      description: `${title} with name ${ipVal} has been created.`,
    });
    setIpVal("");
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter {title} name</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter name"
          value={ipVal}
          onChange={(e) => setIpVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <DialogFooter>
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NameInput;
