import React from "react";
import type { Tab } from "@/utils/types";
import Tabs from "./_component/Tabs";

// Create an array of tabs with type safety
const tabsContent: Tab[] = [
  {
    id: "tab1",
    title: "Dashboard",
    content:
      "View your recent activity, key metrics, and performance summaries all in one place.",
  },
  {
    id: "tab2",
    title: "Profile",
    content: "Update your personal information, manage your account settings.",
  },
  {
    id: "tab3",
    title: "Projects",
    content:
      "Browse all your ongoing projects, track their progress, and collaborate with your team.",
  },
  {
    id: "tab4",
    title: "Messages",
    content:
      "Check your inbox for updates, messages from colleagues, and important notifications.",
  },
  {
    id: "tab5",
    title: "Settings",
    content:
      "Customize your preferences, set up integrations, and manage application settings.",
  },
];

const page = () => {
  return (
    <>
      <h1 className="text-8xl font-bold">Tabs component</h1>
      <div className="mt-8">
        <Tabs tabsContent={tabsContent} />
      </div>
    </>
  );
};

export default page;
