"use client";

import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { VideoConfig } from "@/lib/types";

type VideoOptionsFormProps = {
  config: VideoConfig;
  onChange: (config: VideoConfig) => void;
  isProcessing: boolean;
};

export function VideoOptionsForm({
  config,
  onChange,
  isProcessing
}: VideoOptionsFormProps) {
  const handleInput =
    (key: keyof VideoConfig) =>
    (
      value:
        | string
        | number
        | boolean
        | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      if (typeof value === "object" && "target" in value) {
        const target = value.target as
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement;
        let formattedValue: string | number | boolean = target.value;
        if (target instanceof HTMLInputElement) {
          if (target.type === "checkbox") {
            formattedValue = target.checked;
          } else if (target.type === "number" || target.type === "range") {
            formattedValue = Number(target.value);
          }
        } else if (target instanceof HTMLSelectElement) {
          formattedValue = target.value;
        } else if (target instanceof HTMLTextAreaElement) {
          formattedValue = target.value;
        }
        onChange({
          ...config,
          [key]: formattedValue
        });
        return;
      }

      onChange({
        ...config,
        [key]: value
      });
    };

  return (
    <motion.div
      layout
      className="glass-panel rounded-3xl p-6 w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <Sparkles className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">
            Creative Direction
          </h2>
          <p className="text-sm text-neutral-500">
            Fine-tune the video&apos;s motion language, pacing, and atmosphere.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 text-sm text-neutral-600">
          Style
          <select
            className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={config.style}
            onChange={(event) => handleInput("style")(event)}
            disabled={isProcessing}
          >
            <option value="cinematic">Cinematic</option>
            <option value="animated">Animated</option>
            <option value="minimalistic">Minimalistic</option>
            <option value="surreal">Surreal</option>
            <option value="documentary">Documentary</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-600">
          Mood
          <select
            className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={config.mood}
            onChange={(event) => handleInput("mood")(event)}
            disabled={isProcessing}
          >
            <option value="dramatic">Dramatic</option>
            <option value="upbeat">Upbeat</option>
            <option value="relaxing">Relaxing</option>
            <option value="mysterious">Mysterious</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-600">
          Duration (seconds)
          <input
            type="range"
            min={5}
            max={60}
            value={config.duration}
            onChange={(event) => handleInput("duration")(event)}
            disabled={isProcessing}
          />
          <span className="text-xs text-neutral-500">
            Target runtime: <strong>{config.duration} seconds</strong>
          </span>
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-600">
          Aspect ratio
          <select
            className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={config.aspectRatio}
            onChange={(event) => handleInput("aspectRatio")(event)}
            disabled={isProcessing}
          >
            <option value="16:9">16:9 (Landscape)</option>
            <option value="9:16">9:16 (Vertical)</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="21:9">21:9 (Ultra-Wide)</option>
          </select>
        </label>

        <label className="flex items-center gap-3 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={config.addDepth}
            onChange={(event) => handleInput("addDepth")(event)}
            disabled={isProcessing}
          />
          Depth-aware motion (recommended)
        </label>

        <label className="flex items-center gap-3 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={config.addCameraShake}
            onChange={(event) => handleInput("addCameraShake")(event)}
            disabled={isProcessing}
          />
          Cinematic camera shake
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-600">
          Soundtrack direction
          <select
            className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={config.soundtrack}
            onChange={(event) => handleInput("soundtrack")(event)}
            disabled={isProcessing}
          >
            <option value="orchestral">Orchestral</option>
            <option value="ambient">Ambient</option>
            <option value="electronic">Electronic</option>
            <option value="narrative">Narrative Voiceover First</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-600 md:col-span-2">
          Narration guidance
          <textarea
            className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 min-h-[88px] focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            value={config.narrationPrompt ?? ""}
            onChange={(event) => handleInput("narrationPrompt")(event)}
            disabled={isProcessing}
            placeholder="Describe the tone, pacing, and message you want the narration to deliver."
          />
          <span className="text-xs text-neutral-500">
            The agent uses this to generate cohesive voiceovers and align sound
            design cues.
          </span>
        </label>
      </div>
    </motion.div>
  );
}
