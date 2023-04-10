"use client"

import { FormEvent, useState } from "react";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scrollarea";
import { LineWobble } from "@uiball/loaders";
import { JellyTriangle } from "@uiball/loaders";

export default function Home() {
  const [answer, setAnswer] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAnswer("");
    setLoading(true);

    const form = event.target as HTMLFormElement;

    const data = {
      query: form.prompt.value as string,
    };

    const response = await fetch("/api/getdata", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    console.log(result)
    setAnswer(result.data);
    setLoading(false);
  };

  const handleClear = (e: any) => {
    setAnswer("");
  };

  return (
    <>
      <main className="grid h-screen bg-cover bg-no-repeat bg-white grid-cols-4 grid-rows-3">
        <div className="grid col-start-2 col-span-2 font-bold row-start-2 font-sohne text-black">
          <h1 className="text-6xl xl:text-6xl 2xl:text-9xl">
            Query some <span className="text-ldred">OpenAI</span>
          </h1>
          <form onSubmit={handleSubmit} method="post">
            <Input type="prompt" id="prompt" placeholder="Prompt" />
            <div className="grid grid-flow-col auto-cols-auto">
              {!loading && (
                <button className=" bg-black rounded-xl text-white font-medium h-10 max-h-10 px-4 py-2 sm:mt-6 mt-4 hover:bg-black/80  ">
                  Submit
                </button>
              )}
              {loading && (
                <button className=" flex bg-black place-content-center place-items-center rounded-xl text-white font-medium h-10 max-h-10 px-4 py-2 sm:mt-6 mt-4 hover:bg-black/80 disabled">
                  <JellyTriangle size={15} speed={1.8}  color="white" />
                </button>
              )}
              <button
                type="button"
                onClick={handleClear}
                className="bg-ldred rounded-xl text-white font-medium px-4 py-2 sm:mt-6 mt-4 hover:bg-ldred/80"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
        <div className="grid col-start-2 col-span-2 row-start-3 h-4/5 text-black whitespace-pre-line	break-normal">         
        
          {!loading && (
              <ScrollArea className="rounded-md border p-4">
                <pre>{answer}</pre>
              </ScrollArea>
             )}
             {
            loading && (
              <div className="flex place-items-center place-content-center">
              <LineWobble size={100} speed={1.8} lineWeight={10} color="pink" />
              </div>
            )}
          
        </div>
      </main>
    </>
  );
}
