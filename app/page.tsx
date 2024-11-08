"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  //using useChat to evaluate joke too
  const { messages: evaluatedMessages, append: evaluateAppend } = useChat({
    api: "/api/chat/evaluate",
  });

  const genres = [
    { emoji: "🏒", value: "Slapstick" },
    { emoji: "🃏", value: "Improv" },
    { emoji: "🕵️‍♂️", value: "Dark" },
    { emoji: "👿", value: "Critical" },
  ];
  const topics = [
    { emoji: "👫", value: "Relationships" },
    { emoji: "🏛️", value: "Politics" },
    { emoji: "🤦‍♀️", value: "Annoying People" },
    { emoji: "🏖️", value: "Life" },
  ];
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];

  const [evaluation, setEvaluation] = useState(false);

  const [state, setState] = useState({
    genre: "",
    topics: "",
    tones: "",
    temperature: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-black justify-center">
              Group 3 AI JokeBox
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the joke by selecting the genre, topic, and tone
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genres</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Topics</h3>

            <div className="flex flex-wrap justify-center">
              {topics.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="topics"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tones"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Temperature</h3>
            <div className="flex flex-col items-center">
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                defaultValue="1"
                name="temperature"
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-sm mt-2">{state.temperature}</span>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
            disabled={
              isLoading || !state.genre || !state.topics || !state.tones
            }
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.genre} joke about ${state.topics} in a ${state.tones} tone`,
                temperature: `${state.temperature}`,
              })
            }
          >
            Generate Joke
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4 text-black space-y-4"
          >
            <h3 className="text-xl font-semibold">Joke: </h3>
            <p>{messages[messages.length - 1]?.content}</p>
          </div>

          {/* after the message show the button to generate evaluation */}
          {messages.length > 0 &&
            evaluatedMessages.length === 0 &&
            !isLoading && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
                onClick={() =>
                  evaluateAppend({
                    role: "user",
                    content: `Evaluate the joke: ${messages[messages.length - 1]?.content}`,
                  })
                }
              >
                Evaluate Joke
              </button>
            )}

          {evaluatedMessages.length > 0 && (
            <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4 text-black space-y-4">
              <h3 className="text-xl font-semibold">Evaluation: </h3>
              <p>{evaluatedMessages[evaluatedMessages.length - 1]?.content}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
