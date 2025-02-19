"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tab } from "@/utils/types";
import React, { useState } from "react";

type TabContentProps = {
  tabContent: Tab;
};

const TabContent = ({ tabContent }: TabContentProps) => {
  const [count, setCount] = useState<number>(0);

  const handleSuperLike = () => {
    setCount((p) => p + 3);
  };

  return (
    <Card className=" max-w-3xl w-full">
      <CardHeader>
        <p className="text-xl font-semibold">{tabContent.title}</p>
      </CardHeader>
      <CardContent>
        {tabContent.content}

        <div className="mt-6 flex items-center gap-2">
          <Button onClick={handleSuperLike}>Super like</Button>
          <span className="text-xl flex items-center gap-2 font-semibold">
            ❤️ {count}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabContent;
