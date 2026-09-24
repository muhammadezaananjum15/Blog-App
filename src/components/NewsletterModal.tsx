"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topics: "Tech & AI",
    frequency: "Weekly Digest",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        name: "",
        email: "",
        topics: "Tech & AI",
        frequency: "Weekly Digest",
        notes: "",
      });
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-[#0C0C0C] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
            id="newsletter-modal"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0066FF]/20 border border-[#0066FF] flex items-center justify-center text-[#0066FF] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Subscription Confirmed!</h3>
                <p className="text-white/70 max-w-sm text-sm">
                  Welcome to the Lumière inner circle. You will receive curated dispatches directly to your inbox with zero algorithmic noise.
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#0066FF] text-[11px] font-semibold mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>THE LUMIÈRE DISPATCH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Curated Intellectual Feeds
                </h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Join over 1.2M developers, designers, and systems architects receiving our weekly technical monograph and public APIs digest.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="elena@laboratory.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                        Primary Topic
                      </label>
                      <select
                        value={formData.topics}
                        onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                        className="w-full bg-[#141414] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors cursor-pointer"
                      >
                        <option value="Tech & AI">Tech & AI</option>
                        <option value="Design & UI">Design & UI</option>
                        <option value="Architecture">System Architecture</option>
                        <option value="Open Intelligence">Public APIs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                        Frequency
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full bg-[#141414] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors cursor-pointer"
                      >
                        <option value="Weekly Digest">Weekly Digest</option>
                        <option value="Monthly Monograph">Monthly Monograph</option>
                        <option value="Breaking Telemetry">Breaking Telemetry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                      Interests / Special Inquiries (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us what topics or APIs you'd love to see covered..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-white hover:bg-neutral-200 text-black py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Receive Custom Dispatch</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
