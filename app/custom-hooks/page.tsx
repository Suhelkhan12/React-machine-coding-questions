"use client";
import { Button } from "@/components/ui/button";
import useLocalStorage from "./_hooks/useLocalStorage";
import useGeolocate from "./_hooks/useGeolocate";

const page = () => {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
  const coords = useGeolocate();
  return (
    <div className="flex gap-10 flex-col">
      <h1 className="text-8xl font-bold">useLocalStorage</h1>
      <div className="flex items-center justify-center gap-8">
        <p>
          Current theme is:{" "}
          <span className="font-medium capitalize">{theme}</span>
        </p>
        <Button
          onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
        >
          Toggle theme
        </Button>

        <p>Open Dev-tools as well</p>
      </div>
      <h2 className="text-8xl font-bold">useGeolocate</h2>
      <p>{coords?.latitude}</p>
      <p>{coords?.longitude}</p>
    </div>
  );
};

export default page;
