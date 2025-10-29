"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

type SuggestionsPanelProps = {
  items: string[];
};

export function SuggestionsPanel({ items }: SuggestionsPanelProps) {
  return (
    <motion.div
      layout
      className="glass-panel rounded-3xl p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="h-6 w-6 text-accent" />
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">
            Strategic Suggestions
          </h3>
          <p className="text-sm text-neutral-500">
            Curated insights to elevate pacing, composition, and sound design.
          </p>
        </div>
      </div>
      <ul className="space-y-3">
        {items.map((tip, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className="rounded-2xl bg-white/80 border border-white/50 px-4 py-3 text-sm text-neutral-600"
          >
            {tip}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
