"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GeneratedVideo } from "@/lib/types";
import { Loader2, Play } from "lucide-react";

type PreviewPlayerProps = {
  video?: GeneratedVideo | null;
  isProcessing: boolean;
  placeholderImage?: string;
};

export function PreviewPlayer({
  video,
  isProcessing,
  placeholderImage
}: PreviewPlayerProps) {
  return (
    <motion.div
      layout
      className="glass-panel rounded-3xl p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        Output Preview
      </h3>
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/50 bg-neutral-900/60 flex items-center justify-center">
        {video ? (
          <video
            key={video.url}
            src={video.url}
            controls
            poster={video.thumbnail}
            className="h-full w-full object-cover"
          />
        ) : placeholderImage ? (
          <div className="relative h-full w-full">
            <Image
              src={placeholderImage}
              alt="Placeholder frame"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/40 text-neutral-100">
              <Play className="h-12 w-12 mb-3" />
              <p className="text-sm">Generated video will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-neutral-200">
            <Play className="h-12 w-12 mb-3" />
            <p className="text-sm">Upload a visual reference to begin.</p>
          </div>
        )}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/60 text-white">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        )}
      </div>
      {video && (
        <div className="mt-4 text-sm text-neutral-500">
          <p>
            Rendered duration:{" "}
            <span className="font-semibold text-neutral-700">
              {video.duration.toFixed(1)}s
            </span>
          </p>
          {video.caption && <p className="mt-1">Summary: {video.caption}</p>}
        </div>
      )}
    </motion.div>
  );
}
