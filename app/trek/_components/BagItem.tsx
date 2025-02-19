"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { ActionType, TrekBagStateType } from "../page";
import { cn } from "@/lib/utils";

type BagItemProps = {
  toggleStatus: React.Dispatch<ActionType>;
  removeItem: React.Dispatch<ActionType>;
} & TrekBagStateType;

const BagItem = ({
  id,
  name,
  alreadyPacked,
  toggleStatus,
  removeItem,
}: BagItemProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <Checkbox
          id={`item-id--${id}`}
          checked={alreadyPacked}
          onCheckedChange={() =>
            toggleStatus({ type: "TOGGLE_STATUS", payload: id })
          }
        />
        <label
          htmlFor={`item-id--${id}`}
          className={cn(
            "ml-2 text-sm capitalize cursor-pointer",
            alreadyPacked ? "line-through text-green-500" : ""
          )}
        >
          {name}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem({ type: "REMOVE_ITEM", payload: id })}
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </Button>
    </div>
  );
};

export default BagItem;
