"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import ScrollUp from "../components/ScrollUp";

export default function Home() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    return (
        <>
            <ScrollUp />
            <Hero />
        </>
        // <div className="flex flex-col items-center justify-center h-screen">
        //     <h1 className="text-3xl font-bold mb-4">Home</h1>
        //     <form
        //         onSubmit={(e) => {
        //             e.preventDefault();
        //             run();
        //         }}
        //         className="flex flex-col items-center mb-4"
        //     >
        //         <label htmlFor="userInput" className="mb-2">
        //             Give me a ChatGPT Prompt to:
        //         </label>
        //         <input
        //             id="userInput"
        //             type="text"
        //             value={input}
        //             onChange={(e) => setInput(e.target.value)}
        //             className="border border-gray-300 px-3 py-2 rounded-md mb-2 text-black"
        //         />
        //         <button
        //             type="submit"
        //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        //         >
        //             Submit
        //         </button>
        //     </form>
        //     <div>
        //         <h2 className="text-xl font-bold mb-2">Output:</h2>
        //         <p>{output}</p>
        //     </div>
        // </div>
    );
}
