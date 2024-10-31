'use client'

import Fetching from "../components/commons/Fetching";
import Navigator from "./Navigator"
import { SocketContextProvider } from "../providers/socketContextProvider.js"

export default function Home() {
  return (
    <SocketContextProvider>
      <div className="flex flex-col flex-row items-center">
        <Navigator />
      </div>
    </SocketContextProvider>
  );
}