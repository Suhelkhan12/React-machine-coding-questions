"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabLinkProps = {
  id: string;
  label: string;
  activeTab: string;
  setActiveTab: (_: string) => void;
};

const TabLink = ({ id, label, activeTab, setActiveTab }: TabLinkProps) => {
  return (
    <Button
      onClick={() => setActiveTab(id)}
      size={"lg"}
      variant={activeTab === id ? "outline" : "default"}
    >
      {label}
    </Button>
  );
};

export default TabLink;
