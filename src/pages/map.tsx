import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Chart from "src/components/mapping";

const Map: NextPage = () => {
  return (
    <div>
      <div className = "flex flex-row w-screen justify-center">
        <div className="grow">
          <h1 className="flex justify-center text-4xl">Your Capital Map</h1>
          <Chart/> 
        </div>
        <div id="sidebar" className = "grow border-black border-x-2 flex flex-col" >
          <div id="navbar" className=" flex flex-row justify-evenly">
            <button className="border-2 border-black grow">Input</button>
            <button className="border-2 border-black grow">Filters</button>
          </div>
        
        </div>
        

      </div>
        
    </div>
  );
};

export default Map;