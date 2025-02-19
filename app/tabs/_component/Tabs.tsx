"use client";
import React, { useState } from "react";
import type { Tab } from "@/utils/types";
import TabLink from "./TabLink";
import TabContent from "./TabContent";

type TabsProps = {
  tabsContent: Tab[];
};

const Tabs = ({ tabsContent }: TabsProps) => {
  // to keep track of active state of tab
  const [activeTabId, setActiveTabId] = useState<string>(tabsContent[0].id);

  // getting the content of active tab
  const activeTabContent = tabsContent.find((tab) => tab.id === activeTabId);

  return (
    <div className="flex flex-col gap-8 items-start">
      <div className="flex items-center flex-row gap-4">
        {tabsContent.map((tab) => (
          <TabLink
            key={tab.id}
            id={tab.id}
            label={tab.title}
            activeTab={activeTabId}
            setActiveTab={setActiveTabId}
          />
        ))}
      </div>
      <TabContent key={activeTabContent?.id} tabContent={activeTabContent!} />
    </div>
  );
};

export default Tabs;
