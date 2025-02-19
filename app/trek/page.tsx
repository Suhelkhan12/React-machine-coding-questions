"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useReducer } from "react";
import { PlusCircle } from "lucide-react";
import BagItem from "./_components/BagItem";

export type TrekBagStateType = {
  id: string;
  name: string;
  alreadyPacked: boolean;
};

export type ActionType =
  | { type: "ADD_ITEM"; payload: string }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "TOGGLE_STATUS"; payload: string }
  | { type: "RESET" };

const initialState: TrekBagStateType[] = [];

const reducerFn = (
  state: TrekBagStateType[],
  action: ActionType
): TrekBagStateType[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        { id: action.payload, name: action.payload, alreadyPacked: false },
      ];
    case "REMOVE_ITEM":
      return [...state.filter((it) => it.id !== action.payload)];
    case "TOGGLE_STATUS":
      return [
        ...state.map((it) =>
          it.id === action.payload
            ? { ...it, alreadyPacked: !it.alreadyPacked }
            : it
        ),
      ];
    case "RESET":
      return initialState;
  }
};

const page = () => {
  const [state, dispatchFn] = useReducer(reducerFn, initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    // dispatch state action
    dispatchFn({ type: "ADD_ITEM", payload: values["bag-item"] as string });

    // reseting form
    form.reset();
  };

  return (
    <div className="flex gap-10 flex-col">
      <h1 className="text-8xl font-bold">useReducer hook</h1>
      <div className="max-w-2xl w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold mb-4 text-center">Trekking Bag 🎒</h2>
        <form className="flex mb-8" onSubmit={handleSubmit}>
          <Input
            type={"text"}
            name="bag-item"
            placeholder="Add a new item"
            className="flex-grow mr-2"
          />
          <Button type={"submit"}>
            <PlusCircle className="w-5 h-5 mr-1" />
            Add
          </Button>
        </form>
        <div className="flex w-full flex-col gap-4">
          <ul className="space-y-2 w-full">
            {state.length > 0 ? (
              state.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded border hover:shadow-md transition-shadow"
                >
                  <BagItem
                    toggleStatus={dispatchFn}
                    removeItem={dispatchFn}
                    {...it}
                  />
                </li>
              ))
            ) : (
              <li className="px-2 py-1 rounded-sm bg-gray-200 border text-center text-xs">
                <p>Start adding items to your trek bag.</p>
              </li>
            )}
          </ul>
          {state.length > 0 && (
            <Button
              variant={"destructive"}
              onClick={() => dispatchFn({ type: "RESET" })}
            >
              Reset bag
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
