"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroHeader } from "@/components/HeroHeader";
import { UploadPanel, type SourceAsset } from "@/components/UploadPanel";
import { VideoOptionsForm } from "@/components/VideoOptionsForm";
import { SuggestionsPanel } from "@/components/SuggestionsPanel";
import { ProgressTimeline } from "@/components/ProgressTimeline";
import { FeedbackBoard } from "@/components/FeedbackBoard";
import { PreviewPlayer } from "@/components/PreviewPlayer";
import { ActivityLog } from "@/components/ActivityLog";
import { defaultConfig, initialTimeline } from "@/lib/defaults";
import { generateSuggestions, milestoneFeedback } from "@/lib/suggestions";
import {
  GenerationMilestone,
  GeneratedVideo,
  TimelineStep,
  VideoConfig
} from "@/lib/types";

type TimelineMap = Record<string, number>;

function buildTimelineIndex(steps: TimelineStep[]): TimelineMap {
  return steps.reduce<TimelineMap>((map, step, index) => {
    map[step.id] = index;
    return map;
  }, {});
}

const TIMELINE_INDEX = buildTimelineIndex(initialTimeline);

export default function HomePage() {
  const [assets, setAssets] = useState<SourceAsset[]>([]);
  const [config, setConfig] = useState<VideoConfig>({ ...defaultConfig });
  const [timeline, setTimeline] = useState<TimelineStep[]>(
    initialTimeline.map((step, index) => ({
      ...step,
      status: index === 0 ? "active" : "pending"
    }))
  );
  const [milestones, setMilestones] = useState<GenerationMilestone[]>([]);
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(
    null
  );
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      assets.forEach((asset) => URL.revokeObjectURL(asset.preview));
    };
  }, [assets]);

  const suggestions = useMemo(() => generateSuggestions(config), [config]);

  const handleDrop = async (files: File[]) => {
    const assetPromises = files.map(
      async (file): Promise<SourceAsset> => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        file
      })
    );

    const nextAssets = await Promise.all(assetPromises);
    setAssets((prev) => [...prev, ...nextAssets]);
  };

  const handleRemoveAsset = (id: string) => {
    setAssets((prev) => {
      const target = prev.find((asset) => asset.id === id);
      if (target) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((asset) => asset.id !== id);
    });
  };

  const resetTimeline = () => {
    setTimeline(
      initialTimeline.map((step, index) => ({
        ...step,
        status: index === 0 ? "active" : "pending"
      }))
    );
  };

  const moveToStep = (stepId: string) => {
    const targetIndex = TIMELINE_INDEX[stepId];
    setTimeline((prev) =>
      prev.map((step, index) => {
        if (index < targetIndex) {
          return { ...step, status: "done" };
        }
        if (index === targetIndex) {
          return { ...step, status: "active" };
        }
        return { ...step, status: "pending" };
      })
    );
  };

  const markStepComplete = (stepId: string) => {
    setTimeline((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, status: "done" } : step
      )
    );
  };

  const markStepError = (stepId: string) => {
    setTimeline((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, status: "error" } : step
      )
    );
  };

  const simulatePipelineProgress = async (order: string[], cfg: VideoConfig) => {
    setMilestones([]);
    for (let index = 0; index < order.length; index += 1) {
      const stepId = order[index];
      moveToStep(stepId);
      setMilestones((prev) => [...prev, milestoneFeedback(stepId, cfg)]);
      setProgressLog((prev) => [
        ...prev,
        `${new Date().toLocaleTimeString()} · Entered ${stepId} stage`
      ]);
      if (index < order.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }
    }
  };

  const handleGenerate = async () => {
    if (!assets.length || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setGeneratedVideo(null);
    setProgressLog((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()} · Generation queued with ${assets.length} asset(s)`
    ]);
    resetTimeline();

    const pipelineOrder = initialTimeline.map((step) => step.id);
    const simulationPromise = simulatePipelineProgress(pipelineOrder, config);

    try {
      const formData = new FormData();
      assets.forEach((asset) => {
        formData.append("images", asset.file, asset.name);
      });
      formData.append("config", JSON.stringify(config));

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const payload = (await response.json()) as { video: GeneratedVideo };
      setGeneratedVideo(payload.video);
      pipelineOrder.forEach((stepId) => markStepComplete(stepId));
      setProgressLog((prev) => [
        ...prev,
        `${new Date().toLocaleTimeString()} · Video ready`
      ]);
    } catch (error) {
      console.error(error);
      const lastStep = pipelineOrder[pipelineOrder.length - 1];
      markStepError(lastStep);
      setErrorMessage(
        "Video generation failed. Adjust inputs or try again shortly."
      );
      setProgressLog((prev) => [
        ...prev,
        `${new Date().toLocaleTimeString()} · Generation failed`
      ]);
    } finally {
      await simulationPromise;
      setIsProcessing(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10">
      <HeroHeader
        onGenerate={handleGenerate}
        isDisabled={assets.length === 0 || isProcessing}
        isProcessing={isProcessing}
      />

      {errorMessage && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <UploadPanel
            assets={assets}
            onDrop={handleDrop}
            onRemove={handleRemoveAsset}
            isProcessing={isProcessing}
          />
          <VideoOptionsForm
            config={config}
            onChange={setConfig}
            isProcessing={isProcessing}
          />
          <ProgressTimeline steps={timeline} />
        </div>
        <div className="space-y-6">
          <PreviewPlayer
            video={generatedVideo}
            isProcessing={isProcessing}
            placeholderImage={assets[0]?.preview}
          />
          <ActivityLog entries={progressLog} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <FeedbackBoard milestones={milestones} />
        <SuggestionsPanel items={suggestions} />
      </div>
    </main>
  );
}
