"use client";

import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

type ActivityLogProps = {
  entries: string[];
};

export function ActivityLog({ entries }: ActivityLogProps) {
  return (
    <motion.div
      layout
      className="glass-panel rounded-3xl p-6 h-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <ScrollText className="h-6 w-6 text-neutral-500" />
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">
            Activity Feed
          </h3>
          <p className="text-sm text-neutral-500">
            Snapshot of pipeline progress and system insights.
          </p>
        </div>
      </div>
      <div className="h-48 overflow-y-auto pr-1 space-y-2">
        {entries.length === 0 ? (
          <p className="text-sm text-neutral-500">
            Actions will appear here once generation begins.
          </p>
        ) : (
          entries.map((entry, index) => (
            <div
              key={`${entry}-${index}`}
              className="rounded-xl bg-white/80 border border-white/50 px-3 py-2 text-sm text-neutral-600"
            >
              {entry}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
