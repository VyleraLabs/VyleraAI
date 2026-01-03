import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 overflow-hidden relative">
      {/* HUD OVERLAY */}
      <div className="z-20 max-w-5xl w-full items-center justify-between font-mono text-xs lg:text-sm lg:flex absolute top-0 p-8">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-zinc-900/50 pb-6 pt-8 backdrop-blur-md lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
          VYLERA LABS&nbsp;
          <code className="font-bold text-blue-500">:: SANCTUARY PROTOCOL</code>
        </p>

      </div>

      {/* CORE VISUALIZATION */}
      <div className="relative flex place-items-center z-10">
        {/* Glowing Core Effect */}
        <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-blue-600 opacity-20 blur-[100px] animate-pulse"></div>
        <div className="absolute -z-10 h-[200px] w-[200px] translate-x-10 rounded-full bg-cyan-500 opacity-10 blur-[80px]"></div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 text-center z-20">
          VYLERA AI
        </h1>
      </div>

      {/* STRATEGIC PILLARS (For the Auditor) */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-24 gap-6 z-20">

        <div className="group rounded-lg border border-gray-800 px-5 py-6 transition-all hover:border-blue-500/50 hover:bg-gray-900/30">
          <h2 className="mb-3 text-xl font-semibold text-blue-400">
            Sovereign Core
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-2">-&gt;</span>
          </h2>
          <p className="m-0 text-sm text-gray-400">
            Local-first neural processing ensuring 100% data residency and privacy compliance.
          </p>
        </div>

        <div className="group rounded-lg border border-gray-800 px-5 py-6 transition-all hover:border-cyan-500/50 hover:bg-gray-900/30">
          <h2 className="mb-3 text-xl font-semibold text-cyan-400">
            Jakarta Region
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-2">-&gt;</span>
          </h2>
          <p className="m-0 text-sm text-gray-400">
            Optimized for low-latency edge inference in <code>asia-southeast2</code>.
          </p>
        </div>

        <div className="group rounded-lg border border-gray-800 px-5 py-6 transition-all hover:border-purple-500/50 hover:bg-gray-900/30">
          <h2 className="mb-3 text-xl font-semibold text-purple-400">
            Vertex AI Bridge
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-2">-&gt;</span>
          </h2>
          <p className="m-0 text-sm text-gray-400">
            Enterprise-grade intent automation powered by Gemini 3 Pro.
          </p>
        </div>
      </div>
    </main>
  );
}
