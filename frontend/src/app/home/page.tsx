import React from "react";
import MainTimeline from "../../components/MainTimeline";
import Menu from "@/components/Menu";
import Interests from "@/components/Interests";

export default function Home() {
  return (
    <div className="flex-row justify-center">
      <Menu />
      <MainTimeline />
      <Interests />
    </div>
  );
}
