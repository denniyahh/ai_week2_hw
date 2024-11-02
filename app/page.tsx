"use client";

import {useChat} from "ai/react";
import {useEffect, useRef, useState} from "react";

export default function Home() {

  const {
    messages,
    isLoading,
    append,
  } = useChat();

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [jokeIsLoading, setJokeIsLoading] = useState(false);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (jokeIsLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            </div>
          </div>
        </div>
    );
  }


  return (
      <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch overflow-hidden">
          <div className="flex flex-col justify-center mb-2 items-center">
             <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">jokeGPT</h1>
          </div>
        <div className="overflow-auto w-full mb-8" ref={messagesContainerRef}>
          {messages.map((m) => (
              <div
                  key={m.id}
                  className={`whitespace-pre-wrap ${
                      m.role === "user"
                          ? "bg-green-700 p-3 m-2 rounded-lg"
                          : "bg-slate-700 p-3 m-2 rounded-lg"
                  }`}
              >
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
          ))}
          {isLoading && (
              <div className="flex justify-end pr-4">
                <span className="animate-pulse text-2xl">...</span>
              </div>
          )}
        </div>
        <div className="fixed bottom-0 w-full max-w-md mb-8">
          <div className="flex flex-col justify-center mb-2 items-center">
            <button
                className="bg-blue-500 p-2 text-white rounded shadow-xl"
                disabled={isLoading}
                onClick={() => {
                    setJokeIsLoading(true);
                    append({role: "user", content: "Give me a random joke"}).then(() => {
                        setJokeIsLoading(false)
                    })
                }
                }
            >
              Random Joke
            </button>
          </div>
        </div>
      </div>

  );
}
