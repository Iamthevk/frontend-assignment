"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import RandomCat, {
  CatData,
  bioFetcher,
  fetcher,
} from "../components/RandomCat";
import Toasty from "../components/Toasty.js";

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
      <header className="flex justify-start items-start text-4xl font-bold text-center mb-10 text-[#e53170]">
        <a href="https://vijaykumar.online/" target="_blank">
          Cat App
        </a>
      </header>
      <RandomCat />
      <Toasty />
      <div className="flex justify-center items-center gap-8 max-w-[500px] flex-wrap">
        {catList.length > 0 ? (
          catList.map((cat) => {
            return (
              <div
                className="card flex-col md:flex-row flex flex-1 gap-4 min-w-[320px] md:min-w-[600px] md:h-[240px] drop-shadow-lg"
                key={cat.id}
              >
                <Image
                  src={cat.url}
                  width={200}
                  height={200}
                  alt={`cat-${cat.id}`}
                  className="hidden md:block  border border-white rounded-lg cursor-pointer"
                />
                <Image
                  src={cat.url}
                  width={500}
                  height={500}
                  alt={`cat-${cat.id}`}
                  className=" md:hidden border border-white rounded-lg cursor-pointer"
                />
                <section className="card__headings flex justify-center items-center pb-5 gap-10 ">
                  <div className=" flex flex-col gap-7 md:gap-6 text-xl md:text-lg">
                    <p>
                      <span className="font-bold">Name: </span>
                      {catBio?.breeds[0].name}
                    </p>

                    <p>
                      <span className="font-bold">Intelligence:</span>{" "}
                      {catBio?.breeds[0].intelligence}
                    </p>
                  </div>
                  <div className="flex flex-col  md:gap-6 md:pt-6 text-xl md:text-lg">
                    <p>
                      <span className="font-bold">Adaptability:</span>{" "}
                      {catBio?.breeds[0].adaptability}
                    </p>
                    <p>
                      <span className="font-bold">Life_span:</span>
                      <br></br>
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
