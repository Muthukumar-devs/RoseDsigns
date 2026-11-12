"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";

export default function ContactBrief() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const srvName = (e as CustomEvent<string>).detail;
      if (srvName) {
        setMessage((prev) => {
          if (!prev || prev.trim() === "") return `I'm interested in ${srvName}.\n\n`;
          if (!prev.includes(srvName)) return `${prev}\nAlso interested in ${srvName}.\n`;
          return prev;
        });
        textareaRef.current?.focus();
      }
    };
    window.addEventListener("select-service", handleSelectService);
    return () => window.removeEventListener("select-service", handleSelectService);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const briefText = `RoseDsigns — Project Brief\n===========================\nDate: ${new Date().toLocaleDateString()}\n\nClient Name: ${name}\nClient Email: ${email}\n\nProject Vision:\n${message}\n\n===========================\nGenerated via RoseDsigns Digital Studio (rosedsigns.com)\n`;
    const blob = new Blob([briefText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RoseDsigns-Project-Brief-${name.replace(/\s+/g, "_") || "Client"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSubmitted(true);
  };

  const inputClass = "w-full bg-transparent border-0 border-b border-white/20 focus:border-[#B08A57] text-white placeholder:text-white/30 text-sm py-3 focus:outline-none transition-colors";
  const labelClass = "block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-1";

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#171514]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] text-[#F7F3EC] font-semibold leading-[1.08] tracking-tight">
            <TextReveal as="span" delay={0.1}>Let&apos;s make</TextReveal>
            <br />
            <span className="inline-block">
              <TextReveal as="span" delay={0.2}>something</TextReveal>
              {" "}
              <em className="italic text-[#B08A57]">
                <TextReveal as="span" delay={0.35}>bloom.</TextReveal>
              </em>
            </span>
          </h2>
          <p className="text-sm text-white/50 font-sans max-w-md mx-auto">
            Tell us a little about your brand and where you&apos;d like to take it.
          </p>
        </div>

        {/* Form / Success toggle */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-10"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Your name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Your email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourbusiness.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>What do you have in mind?</label>
                <textarea
                  ref={textareaRef}
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A new website, a brand refresh, your next campaign..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#171514] bg-[#B08A57] hover:bg-[#D9B1AE] transition-colors cursor-pointer"
                >
                  <span>Create project brief</span>
                  <span>↗</span>
                </motion.button>
                <p className="text-sm text-white/40 font-sans max-w-xs">
                  Download your brief to share with the RoseDsigns team.
                </p>
              </div>
            </motion.form>

          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-16 space-y-6"
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-16 h-16 rounded-full border-2 border-[#B08A57] flex items-center justify-center mx-auto"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                  className="text-[#B08A57] text-2xl"
                >
                  ✓
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-3"
              >
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EC] font-semibold">
                  Brief downloaded!
                </h3>
                <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
                  Your project brief has been compiled and downloaded. Send it to the RoseDsigns team to begin your brand&apos;s next chapter.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <a
                  href="mailto:contact@rosedsigns.com"
                  className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#171514] bg-[#B08A57] hover:bg-[#D9B1AE] transition-colors cursor-pointer"
                >
                  Email us directly ↗
                </a>
                <button
                  onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }}
                  className="text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                >
                  Submit another brief
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
