import { NextResponse } from "next/server";
import { getAllJobs } from "@/lib/curatedPosts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department") || "all";
    const type = searchParams.get("type") || "all";
    const search = searchParams.get("search")?.toLowerCase() || "";

    let jobs = getAllJobs();

    if (department !== "all") {
      jobs = jobs.filter((job) =>
        job.tags.some((tag) => tag.toLowerCase().includes(department.toLowerCase())) ||
        job.title.toLowerCase().includes(department.toLowerCase())
      );
    }

    if (type !== "all") {
      jobs = jobs.filter((job) => job.type.toLowerCase() === type.toLowerCase());
    }

    if (search) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search) ||
          job.tags.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve careers registry" },
      { status: 500 }
    );
  }
}
