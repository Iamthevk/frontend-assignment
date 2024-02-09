"use client";
import Image from "next/image";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

type CatData = {
  id: string;
  url: string;
};

type CatBio = {
  breeds: {
    description: string;
  }[];
};
const fetcher = async (
  url: string,
  setter: Dispatch<SetStateAction<CatData[]>>
) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: CatData[] = await response.json();
    setter(data);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    setter([]);
  }
};

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
    setter({ breeds: [] });
  }
};

export default function Home() {
  const ENDPOINT = `https://api.thecatapi.com/v1/images/search?has_breeds=1`;

  const [catData, setCatData] = useState<CatData[]>([]);
  const [catBio, setCatBio] = useState<CatBio>({ breeds: [] });
  useEffect(() => {
    fetcher(ENDPOINT, setCatData);
  }, []);

  useEffect(() => {
    if (catData.length > 0) {
      const ENDPOINT2 = `https://api.thecatapi.com/v1/images/${catData[0]?.id}`;
      bioFetcher(ENDPOINT2, setCatBio);
    }
  }, [catData]);
  console.log(catData);
  console.log(catBio);
  if (!catData) {
    return <p>Loading.....</p>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={catData[0]?.url} alt="cat" width={300} height={300} />
      <p>{catBio?.breeds[0]?.description}</p>
    </main>
  );
}
