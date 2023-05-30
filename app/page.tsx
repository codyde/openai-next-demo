"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scrollarea";
import { LineWobble } from "@uiball/loaders";
import { JellyTriangle } from "@uiball/loaders";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AiItem {
  id: number;
  aiquery: string;
  answer: string;
}

export default function Home() {
  const [answer, setAnswer] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [aiData, setAiData] = useState();

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

    setAnswer(result.data);
    setLoading(false);
    getaiquery(data, result);
  };

  const getaiquery = async (query: any, aianswer: any) => {
    const postdata = await fetch("/api/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ aiquery: query.query, answer: aianswer.data }),
    });
    const result = await postdata.json();
    console.log(result);
    const data = await fetch("/api/db");
    const response = await data.json();

    setAiData(response);
    return aiData;
  };

  const clearitems = async (id: any) => {
    const data = await fetch(`/api/db/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const response = await data.json();
    console.log(response);
    const newdata = await fetch("/api/db");
    const newresponse = await newdata.json();

    setAiData(newresponse);
    return aiData;
  };

  useEffect(() => {
    const getdata = async () => {
      const data = await fetch("/api/db");
      const response = await data.json();

      setAiData(response);
      return aiData;
    };
    getdata();
  }, []);

  const handleClear = (e: any) => {
    setAnswer("");
  };

  const handleCopyClick = async (item: string) => {
    try {
      await navigator.clipboard.writeText(item);
    } catch (err) {}
  };

  return (
    <>
      <main className="grid h-screen bg-cover bg-no-repeat bg-white grid-cols-4 grid-rows-3">
        <ScrollArea className="col-start-1 col-span-1 h-screen mr-4">
          {/* map the array that is aidata  */}
          {aiData &&
            (aiData as AiItem[]).map((item: AiItem) => (
              <Card
                key={item.id}
                className="text-black w-11/12 font-sohne m-2 shadow-md border-2"
              >
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    {item.aiquery}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        {item.answer.split(" ").slice(0, 5).join(" ")}...
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="whitespace-pre-line">{item.answer}</pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button
                    className="mr-2"
                    variant="outline"
                    onClick={() => handleCopyClick(item.answer)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => clearitems(item.id)}
                  >
                    Clear
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </ScrollArea>
        <Card className="grid items-center  col-start-2 col-span-3 row-span-3 shadow-xl p-4 font-bold font-sohne text-black">
          <div className="">
            <CardHeader>
              <CardTitle className="mx-auto text-6xl xl:text-6xl 2xl:text-9xl">
                Query <span className="text-red-500">OpenAI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                      <JellyTriangle size={15} speed={1.8} color="white" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-red-600 rounded-xl text-white font-medium px-4 py-2 sm:mt-6 mt-4 hover:bg-ldred/80"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </CardContent>
            <CardContent>
              <div className="grid col-start-2 col-span-2 row-start-3 h-4/5 text-black whitespace-pre-line	break-normal">
                {!loading && (
                  <ScrollArea className="rounded-md border p-4">
                    <pre className="whitespace-pre-line">{answer}</pre>
                  </ScrollArea>
                )}
                {loading && (
                  <div className="flex place-items-center place-content-center">
                    <LineWobble
                      size={200}
                      speed={1.8}
                      lineWeight={10}
                      color="pink"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </main>
    </>
  );
}
