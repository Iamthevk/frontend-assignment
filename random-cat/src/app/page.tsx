"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import RandomCat, { CatData, fetcher } from "./components/RandomCat";

export type CatBio = {
  breeds: [
    {
      description: string;
      intelligence: string;
      adaptability: string;
      name: string;
      life_span: string;
    }
  ];
} | null;

const bioFetcher = async (
  url: string,
  setter: React.Dispatch<React.SetStateAction<CatBio>>
) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: CatBio = await response.json();
    setter(data);
  } catch (error: any) {
    console.error("Error fetching bio:", error.message);
    setter(null);
  }
};

export default function Home() {
  const [catBio, setCatBio] = useState<CatBio | null>(null);
  const [catList, setCatList] = useState<CatData[]>([]);

  useEffect(() => {
    const ENDPOINT3 = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=cymr&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    fetcher(ENDPOINT3, setCatList);
  }, []);

  useEffect(() => {
    if (catList.length > 0) {
      catList.map((cat) => {
        const ENDPOINT2 = `https://api.thecatapi.com/v1/images/${cat?.id}`;
        bioFetcher(ENDPOINT2, setCatBio);
      });
    }
  }, [catList]);
  // console.log(catData);
  console.log(catBio);
  console.log(catList);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-[hsl(0deg, 0%, 95%)]">
      <RandomCat catBio={catBio} />
      <div className="flex gap-8 max-w-[500px] flex-wrap">
        {catList.length > 0 ? (
          catList.map((cat) => {
            return (
              <div
                className="flex-col md:flex-row flex flex-1 gap-4 min-w-[320px] md:min-w-[250px] drop-shadow-lg"
                key={cat.id}
              >
                <Image
                  src={cat.url}
                  width={200}
                  height={200}
                  alt={`cat-${cat.id}`}
                  className="hidden md:block w-full border border-white rounded-lg cursor-pointer"
                />
                <Image
                  src={cat.url}
                  width={500}
                  height={500}
                  alt={`cat-${cat.id}`}
                  className=" md:hidden w-full border border-white rounded-lg cursor-pointer"
                />
                <section className="flex gap-7 mt-5">
                  <div className="flex flex-col gap-4">
                    <p>name: {catBio?.breeds[0].name}</p>

                    <p>intelligence: {catBio?.breeds[0].intelligence}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p>adaptability: {catBio?.breeds[0].adaptability}</p>
                    <p>
                      life_span:<br></br>
                      {catBio?.breeds[0].life_span}{" "}
                    </p>
                  </div>
                </section>
              </div>
            );
          })
        ) : (
          <h1 className="flex justify-center items-center text-white bg-slate-950 animate-pulse w-52 h-10">
            Loading...
          </h1>
        )}
      </div>
    </main>
  );
}
