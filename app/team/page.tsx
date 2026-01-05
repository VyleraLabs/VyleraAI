export default function TeamPage() {
    return (
      <div className="min-h-screen bg-[#0a192f] text-slate-200 font-sans p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4">Our Team</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h2 className="text-xl font-bold text-green-400 mb-2">Vylera Core Team</h2>
              <p className="mb-4">
                Our team is dedicated to building the next generation of ambient operating systems.
                We combine expertise in AI, distributed systems, and user experience design.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                <li>AI Research Division</li>
                <li>System Architecture</li>
                <li>Cloud Infrastructure</li>
              </ul>
            </div>

             <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Google Cloud Partnership</h2>
              <p className="mb-4">
                Working closely with Google Cloud to leverage Vertex AI and secure infrastructure.
              </p>
               <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                <li>Compliance & Security</li>
                <li>Data Sovereignty</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-sm text-slate-500">
             <p>Vylera Labs is committed to transparency and security.</p>
          </div>
        </div>
      </div>
    )
  }
