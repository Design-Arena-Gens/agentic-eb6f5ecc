"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type SourceAsset = {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string;
  file: File;
};

type UploadPanelProps = {
  assets: SourceAsset[];
  onDrop: (files: File[]) => void;
  onRemove: (assetId: string) => void;
  isProcessing: boolean;
};

export function UploadPanel({
  assets,
  onDrop,
  onRemove,
  isProcessing
}: UploadPanelProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!isProcessing && acceptedFiles.length) {
        onDrop(acceptedFiles);
      }
    },
    [isProcessing, onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"]
    },
    multiple: true,
    disabled: isProcessing
  });

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div
        {...getRootProps()}
        className={cn(
          "h-48 rounded-2xl border-2 border-dashed transition-colors flex flex-col items-center justify-center text-center px-6",
          isDragActive
            ? "border-primary bg-primary/10 text-primary"
            : "border-neutral-300 hover:border-primary/60 hover:bg-white/70",
          isProcessing && "opacity-60 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 mb-3 text-primary" />
        <p className="text-neutral-700 font-semibold">
          Drop reference images here or click to browse
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          Supported formats: JPG, PNG, WEBP. Multiple frames welcome.
        </p>
        {isProcessing && (
          <p className="text-sm text-primary font-medium mt-3">
            Generation in progress — uploads are temporarily locked.
          </p>
        )}
      </div>

      {assets.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative overflow-hidden rounded-2xl bg-white/80 border border-white/60 shadow-lg"
            >
              <Image
                src={asset.preview}
                alt={asset.name}
                width={400}
                height={400}
                className="h-32 w-full object-cover"
              />
              <div className="p-3 space-y-1">
                <p className="text-sm font-semibold text-neutral-700 truncate">
                  {asset.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {(asset.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => onRemove(asset.id)}
                className="absolute top-2 right-2 rounded-full bg-white/80 p-2 text-neutral-700 hover:bg-primary hover:text-white transition-colors"
                aria-label={`Remove ${asset.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
