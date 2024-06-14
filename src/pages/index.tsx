"use client";

import axios from "axios";
import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function Home() {
  const [downloads, setDownloads] = useState("");
  const [inputText, setInputText] = useState("");

  const getDownloads = async () => {
    try {
      const res = await axios.post("/api/getDownloads", {
        inputText,
      });
      const { downloads } = res.data;
      setDownloads(downloads);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Get the Downloads Number of NPM Package
        </h1>
        <div className="flex flex-col items-center space-y-6">
          <input
            type="text"
            className="w-full p-3 border text-lg border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Enter NPM package"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={getDownloads}
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Fetch Latest Data
          </button>
          {downloads && (
            <div className="w-full mt-4">
              <pre className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md text-center">
                This package was installed {downloads} times
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
