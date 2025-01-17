"use client";

import { getDictionary } from "@/services/words.service";
import { useEffect, useState } from "react";

export default function MatchPage() {
  const cols = 5; // pegar do contexto do jogo
  const rows = 5; // pegar do contexto do jogo

  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await getDictionary({
        qty: cols * rows,
        language: "pt-BR",
      });
      if (Array.isArray(response)) {
        setWords(response);
        setLoading(false);
      } else {
        console.error("Unexpected response:", response);
      }
    };
    fetchWords();
  }, []);

  return (
    <div className="w-fll p-4">
      <div className="w-full flex flex-col gap-2">
        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <div className="spinner my-10" />
          </div>
        ) : (
          <>
            {Array.from({ length: rows }, (_, rowsIndex: number) => (
              <div className="w-full flex justify-center gap-2" key={rowsIndex}>
                {Array.from({ length: cols }, (_, colIndex: number) => (
                  <div
                    className="bg-red-100 flex-1 text-center justify-center flex p-2"
                    key={`${rowsIndex}-${colIndex}`}
                  >
                    {words[rowsIndex * cols + colIndex]}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
