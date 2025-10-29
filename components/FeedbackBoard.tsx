"use client";

import { motion } from "framer-motion";
import { GenerationMilestone } from "@/lib/types";
import { MessageCircle } from "lucide-react";

type FeedbackBoardProps = {
  milestones: GenerationMilestone[];
};

export function FeedbackBoard({ milestones }: FeedbackBoardProps) {
  return (
    <motion.div
      layout
      className="glass-panel rounded-3xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="h-6 w-6 text-primary" />
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">
            Continuous Feedback
          </h3>
          <p className="text-sm text-neutral-500">
            Live notes based on the generation stages. Iterate in sync.
          </p>
        </div>
      </div>
      {milestones.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-white/70 p-4 text-sm text-neutral-500">
          Feedback will appear as soon as the pipeline advances through the
          stages.
        </div>
      ) : (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={`${milestone.stepId}-${index}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl bg-white/85 border border-white/50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {milestone.stepId}
                </span>
                <span className="text-xs text-neutral-400">
                  Opportunity #{index + 1}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">
                {milestone.feedback}
              </p>
              <ul className="mt-3 space-y-2">
                {milestone.recommendations.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className="text-sm text-neutral-600 leading-relaxed"
                  >
                    • {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
