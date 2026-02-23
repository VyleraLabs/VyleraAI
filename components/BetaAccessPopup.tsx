"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Loader2, Plus, Trash2, Smartphone } from "lucide-react";
import { submitBetaApplication } from "@/lib/beta";

interface BetaAccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEVICE_TYPES = [
  "Smart Light Switch",
  "Google Nest Hub",
  "Google Nest Mini",
  "Amazon Echo Dot/Show",
  "Smart Plug",
  "Smart Thermostat",
  "Security Camera",
  "Smart Lock",
  "Apple HomePod",
  "Robot Vacuum",
  "Others"
];

export default function BetaAccessPopup({ isOpen, onClose }: BetaAccessPopupProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [devices, setDevices] = useState<{ name: string; type: string }[]>([
    { name: "", type: "" }
  ]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeviceChange = (index: number, field: "name" | "type", value: string) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([...devices, { name: "", type: "" }]);
  };

  const removeDevice = (index: number) => {
    if (devices.length > 1) {
      setDevices(devices.filter((_, i) => i !== index));
    }
  };

  const validate = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return "Please complete all personal fields.";
    if (devices.some(d => !d.name || !d.type)) return "Please complete all device fields.";
    if (devices.length === 0) return "Please add at least one device.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await submitBetaApplication({
        ...formData,
        devices
      });
      setStep("success");
    } catch (err) {
      setError("Transmission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[#0a1525] border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(100,255,218,0.15)] overflow-hidden my-12 flex flex-col max-h-[90vh]"
          >
            {/* Connecting Line Animation (Top) */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-20">
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              {step === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <CheckCircle2 className="w-10 h-10 text-cyan-500" />
                    <div className="absolute inset-0 border border-cyan-500/40 rounded-full animate-ping opacity-20" />
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-2">Request Received.</h3>
                  <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    Request-nya sudah terkirim, Sir. We'll verify your access soon. Check your comms channel for the encryption key.
                  </p>
                  <button onClick={onClose} className="text-cyan-500 text-sm hover:text-white transition-colors tracking-widest uppercase font-medium">
                    Close Terminal
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">Request Access</h2>
                    <p className="text-slate-400 text-sm">Initialize Vylera Labs private beta protocol.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-cyan-500 outline-none transition-colors placeholder-transparent"
                          placeholder="First Name"
                        />
                        <label className="absolute left-0 top-3 text-slate-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-cyan-500 pointer-events-none">
                          First Name
                        </label>
                      </div>
                      <div className="group relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-cyan-500 outline-none transition-colors placeholder-transparent"
                          placeholder="Last Name"
                        />
                        <label className="absolute left-0 top-3 text-slate-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-cyan-500 pointer-events-none">
                          Last Name
                        </label>
                      </div>
                    </div>

                    <div className="group relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="peer w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-cyan-500 outline-none transition-colors placeholder-transparent"
                        placeholder="Email Address"
                      />
                      <label className="absolute left-0 top-3 text-slate-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-cyan-500 pointer-events-none">
                        Email Address
                      </label>
                    </div>

                    {/* Device List */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <h3 className="text-white font-medium flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-cyan-500" />
                          Device Ecosystem
                        </h3>
                        <span className="text-xs text-slate-500">Current Hardware Matrix</span>
                      </div>

                      {devices.map((device, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end bg-slate-900/30 p-3 rounded border border-slate-800"
                        >
                          <div>
                            <label className="block text-xs text-slate-500 mb-1">Device Name</label>
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => handleDeviceChange(index, "name", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none"
                              placeholder="e.g. Living Room Lamp"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-1">Type</label>
                            <input
                              list={`device-types-${index}`}
                              value={device.type}
                              onChange={(e) => handleDeviceChange(index, "type", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none"
                              placeholder="Select Type"
                            />
                            <datalist id={`device-types-${index}`}>
                              {DEVICE_TYPES.map(type => (
                                <option key={type} value={type} />
                              ))}
                            </datalist>
                          </div>
                          {devices.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDevice(index)}
                              className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </motion.div>
                      ))}

                      <button
                        type="button"
                        onClick={addDevice}
                        className="flex items-center gap-2 text-xs text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-wider font-bold mt-2"
                      >
                        <Plus className="w-4 h-4" /> Add Node
                      </button>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-200 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-cyan-500 text-[#0a1525] font-bold tracking-[0.15em] hover:bg-cyan-500/90 transition-all uppercase relative overflow-hidden group rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? "Transmitting..." : "Submit Protocol"}
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Decor: Corner Accents */}
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-cyan-500/30" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-cyan-500/30" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
