"use client";

import { motion } from "framer-motion";
import { Clapperboard, Wand2 } from "lucide-react";

type HeroHeaderProps = {
  onGenerate: () => void;
  isDisabled: boolean;
  isProcessing: boolean;
};

export function HeroHeader({
  onGenerate,
  isDisabled,
  isProcessing
}: HeroHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
          <Clapperboard className="h-4 w-4" />
          AI Motion Lab
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">
          FluxFrame Studio
        </h1>
        <p className="text-neutral-600 max-w-xl">
          Bring static imagery to life with multi-stage neural rendering,
          adaptive motion planning, and production-ready finishing advice. Feed
          in one or multiple frames and receive a polished video master guided
          by continuous feedback.
        </p>
      </div>
      <motion.button
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        onClick={onGenerate}
        disabled={isDisabled}
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-white font-semibold shadow-glass disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Wand2 className="h-5 w-5" />
        {isProcessing ? "Generating..." : "Generate Video"}
      </motion.button>
    </motion.header>
  );
}
