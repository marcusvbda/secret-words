"use client";

import { createGame } from "@/services/game.service";
import { redirect } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";

interface IStartStep {
  setStep: Function;
  setLoading: Function;
}

const StartStep = ({ setStep, setLoading }: IStartStep): ReactNode => {
  const handleCreateGame = useCallback(() => {
    setLoading(true);
    createGame().then((referece: string) => {
      return redirect(`/match/${referece}`);
    });
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-2">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setStep("load-game")}
      >
        Carregar jogo
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreateGame}
      >
        Novo jogo
      </button>
    </div>
  );
};

interface ILoadGameStep {
  setLoading: Function;
}

const LoadGameStep = ({ setLoading }: ILoadGameStep): ReactNode => {
  const [referece, setReferece] = useState("");

  const handleCreateGame = useCallback(() => {
    setLoading(true);
    return redirect(`/match/${referece}`);
  }, [referece]);

  return (
    <div className="w-full flex items-center justify-center mb-6 gap-2">
      <input
        type="text"
        placeholder="ID do jogo"
        className="input input-bordered w-full max-w-xs border border-gray-300 border-solid rounded py-2 px-4"
        value={referece}
        onChange={(e) => setReferece(e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreateGame}
      >
        Carregar
      </button>
    </div>
  );
};

const BackToStart = ({ setStep }: { setStep: Function }): ReactNode => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setStep("start")}
      >
        Voltar
      </button>
    </div>
  );
};

export const StartGame = (): ReactNode => {
  const [step, setStep] = useState("start");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="spinner my-10" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 gap-2">
      {step === "start" && (
        <StartStep setStep={setStep} setLoading={setLoading} />
      )}
      {step === "load-game" && <LoadGameStep setLoading={setLoading} />}
      {step != "start" && <BackToStart setStep={setStep} />}
    </div>
  );
};
