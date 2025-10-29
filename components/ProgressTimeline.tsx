"use client";

import { motion } from "framer-motion";
import { TimelineStep } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProgressTimelineProps = {
  steps: TimelineStep[];
};

export function ProgressTimeline({ steps }: ProgressTimelineProps) {
  return (
    <div className="glass-panel rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        Generation Timeline
      </h3>
      <div className="space-y-5">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "h-3 w-3 rounded-full border-2 border-white shadow-sm",
                  step.status === "done" && "bg-accent border-accent shadow-lg",
                  step.status === "active" &&
                    "bg-primary border-transparent animate-pulseSlow",
                  step.status === "pending" && "bg-neutral-300"
                )}
              />
              {index < steps.length - 1 && (
                <span className="mt-1 h-full w-px bg-gradient-to-b from-neutral-200 to-transparent" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-neutral-700">
                  {step.title}
                </p>
                {step.etaMinutes !== undefined && (
                  <span className="text-xs text-neutral-500">
                    ~{step.etaMinutes} min
                  </span>
                )}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wide",
                    step.status === "done" && "bg-accent text-white",
                    step.status === "active" && "bg-primary text-primary-foreground",
                    step.status === "pending" && "bg-neutral-200 text-neutral-600",
                    step.status === "error" && "bg-red-500 text-white"
                  )}
                >
                  {step.status}
                </span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
