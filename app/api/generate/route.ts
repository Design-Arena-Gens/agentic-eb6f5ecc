import { NextResponse } from "next/server";
import { generateMockVideo, generateWithRunway } from "@/lib/providers";
import { GeneratedVideo, VideoConfig } from "@/lib/types";

async function orchestrateGeneration(
  images: File[],
  config: VideoConfig
): Promise<GeneratedVideo> {
  if (process.env.RUNWAY_API_KEY) {
    try {
      return await generateWithRunway(images, config);
    } catch (error) {
      console.error("[runway-generation-error]", error);
    }
  }

  return generateMockVideo(config);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const configRaw = formData.get("config");

  if (!configRaw || typeof configRaw !== "string") {
    return NextResponse.json(
      { error: "Missing configuration payload" },
      { status: 400 }
    );
  }

  const images: File[] = [];
  formData.forEach((value, key) => {
    if (key === "images" && value instanceof File) {
      images.push(value);
    }
  });

  if (images.length === 0) {
    return NextResponse.json(
      { error: "Please attach at least one reference image" },
      { status: 400 }
    );
  }

  try {
    const config = JSON.parse(configRaw) as VideoConfig;
    const video = await orchestrateGeneration(images, config);
    return NextResponse.json({ video });
  } catch (error) {
    console.error("[generate-route-error]", error);
    return NextResponse.json(
      { error: "Video generation failed. Please retry with different inputs." },
      { status: 500 }
    );
  }
}
