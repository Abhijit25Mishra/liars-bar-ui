'use client'

import Fetching from "../components/Fetching";
import Navigator from "./Navigator"

export default function Home() {
  return (
  <div className="flex flex-col flex-row items-center">
    {/* <Fetching /> */}
    <Navigator/>
    </div>    
  );
}