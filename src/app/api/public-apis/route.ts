import { NextResponse } from "next/server";
import { PublicApiEntry } from "@/lib/types";

// Curated high-impact Public APIs directly from github.com/public-apis/public-apis
const FALLBACK_PUBLIC_APIS: PublicApiEntry[] = [
  {
    api: "Dev.to Articles API",
    description: "Access and curate live blog posts, developer news, comments, and tech tags",
    auth: "No",
    https: true,
    cors: "Yes",
    link: "https://developers.forem.com/api",
    category: "Development",
  },
  {
    api: "HackerNews Firebase API",
    description: "Official real-time API for top tech stories, comments, and community discussions",
    auth: "No",
    https: true,
    cors: "Yes",
    link: "https://github.com/HackerNews/API",
    category: "News",
  },
  {
    api: "GitHub REST API",
    description: "Search open source repositories, user profiles, commit history, and public release feeds",
    auth: "OAuth",
    https: true,
    cors: "Yes",
    link: "https://docs.github.com/en/rest",
    category: "Development",
  },
  {
    api: "NASA Astronomy Picture of the Day",
    description: "Daily imagery, cosmic photography, and scientific astrophysics commentary",
    auth: "apiKey",
    https: true,
    cors: "Yes",
    link: "https://api.nasa.gov/",
    category: "Science",
  },
  {
    api: "Open-Meteo Weather API",
    description: "Global open-source weather forecast API with zero API key requirement",
    auth: "No",
    https: true,
    cors: "Yes",
    link: "https://open-meteo.com/",
    category: "Weather & Open Data",
  },
  {
    api: "Unsplash Image Search API",
    description: "High-resolution editorial photography for modern web spaces and architectural essays",
    auth: "OAuth",
    https: true,
    cors: "Yes",
    link: "https://unsplash.com/developers",
    category: "Design & Media",
  },
  {
    api: "arXiv Preprint Search",
    description: "Open access to scientific preprints in physics, computer science, mathematics, and quantitative biology",
    auth: "No",
    https: true,
    cors: "Yes",
    link: "https://arxiv.org/help/api",
    category: "Science & AI",
  },
  {
    api: "Public APIs Repository",
    description: "A collective list of free APIs for use in software and web development",
    auth: "No",
    https: true,
    cors: "Yes",
    link: "https://github.com/public-apis/public-apis",
    category: "Open Intelligence",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  try {
    // Try to fetch latest markdown from github.com/public-apis/public-apis
    const res = await fetch(
      "https://raw.githubusercontent.com/public-apis/public-apis/master/README.md",
      {
        next: { revalidate: 86400 }, // 24hr cache
        headers: { "User-Agent": "Lumiere-Chronicle/1.0" },
      }
    );

    let entries: PublicApiEntry[] = FALLBACK_PUBLIC_APIS;

    if (res.ok) {
      const text = await res.text();
      // Parse markdown table rows: | API | Description | Auth | HTTPS | CORS |
      const lines = text.split("\n");
      const parsed: PublicApiEntry[] = [];
      let currentCategory = "General";

      for (let i = 0; i < lines.length && parsed.length < 40; i++) {
        const line = lines[i].trim();
        if (line.startsWith("### ")) {
          currentCategory = line.replace("### ", "").trim();
        } else if (line.startsWith("|") && !line.includes("---|---") && !line.includes("API | Description")) {
          const cols = line.split("|").map((c) => c.trim()).filter(Boolean);
          if (cols.length >= 5) {
            // [API name with link, Description, Auth, HTTPS, CORS]
            const nameMatch = cols[0].match(/\[(.*?)\]\((.*?)\)/);
            if (nameMatch) {
              parsed.push({
                api: nameMatch[1],
                link: nameMatch[2],
                description: cols[1],
                auth: cols[2] || "No",
                https: cols[3]?.toLowerCase() === "yes",
                cors: cols[4] || "Unknown",
                category: currentCategory,
              });
            }
          }
        }
      }

      if (parsed.length > 5) {
        entries = [...FALLBACK_PUBLIC_APIS, ...parsed];
      }
    }

    if (category !== "all") {
      entries = entries.filter((e) =>
        e.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      entries = entries.filter(
        (e) =>
          e.api.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch {
    return NextResponse.json({
      success: true,
      count: FALLBACK_PUBLIC_APIS.length,
      entries: FALLBACK_PUBLIC_APIS,
    });
  }
}
