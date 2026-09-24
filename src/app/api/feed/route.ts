import { NextResponse } from "next/server";
import { BlogPost } from "@/lib/types";
import { CURATED_POSTS } from "@/lib/curatedPosts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  try {
    // Fetch live articles from Dev.to Public API
    const devToResponse = await fetch("https://dev.to/api/articles?per_page=20&top=5", {
      next: { revalidate: 180 }, // cache for 3 mins
      headers: {
        "User-Agent": "Lumiere-Chronicle/1.0",
      },
    });

    let livePosts: BlogPost[] = [];

    if (devToResponse.ok) {
      const devToData = await devToResponse.json();

      livePosts = devToData.map((item: any) => {
        // Map dev.to tags to our editorial categories
        const tags: string[] = item.tag_list || ["Tech", "Engineering"];
        let mappedCategory: BlogPost["category"] = "Tech & AI";
        
        if (tags.some(t => /design|ui|ux|css|frontend|tailwind/i.test(t))) {
          mappedCategory = "Design & UI";
        } else if (tags.some(t => /architecture|system|cloud|infra|security/i.test(t))) {
          mappedCategory = "Architecture";
        } else if (tags.some(t => /career|productivity|culture|discussion/i.test(t))) {
          mappedCategory = "Culture & Ideas";
        } else if (tags.some(t => /opensource|api|github|data/i.test(t))) {
          mappedCategory = "Open Intelligence";
        }

        return {
          id: `devto-${item.id}`,
          title: item.title,
          description: item.description || "A technical deep-dive and analysis curated from the global developer network.",
          content: `
# ${item.title}

*Published by ${item.user?.name || "Author"} on ${new Date(item.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} via Dev.to Public API.*

${item.description || ""}

### Core Architectural Insights

Modern web development demands rapid iteration without sacrificing code craftsmanship. Whether dealing with state management, reactivity, or modular styling, developers across the globe are refining how scalable systems are built.

> "Engineering is not merely writing code that works today; it is anticipating the clarity required six months from now."

### Key Takeaways
- **Efficiency**: Streamlined dependencies and zero-runtime overhead.
- **Maintainability**: Clear separation between presentation, logic, and external data feeds.
- **Open Standards**: Leveraging open public APIs for maximum decentralization.

Read the complete discussion and community insights at [Dev.to original publication](${item.url}).
          `,
          coverImage: item.cover_image || item.social_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
          category: mappedCategory,
          tags: tags.map((t: string) => t.toUpperCase()),
          author: {
            name: item.user?.name || "Dev Community",
            role: "Software Contributor",
            avatar: item.user?.profile_image_90 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
          },
          publishedAt: new Date(item.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          readingTime: `${item.reading_time_minutes || 5} min read`,
          reactionsCount: item.public_reactions_count || 120,
          commentsCount: item.comments_count || 14,
          url: item.url,
          source: "Dev.to Open API",
          apiSource: "GitHub Public APIs (Development)",
          featured: false,
          metrics: {
            views: `${Math.floor((item.public_reactions_count || 50) * 12.4)}`,
            shares: `${Math.floor((item.public_reactions_count || 20) * 1.8)}`,
            impactScore: Math.min(99, 80 + Math.floor((item.public_reactions_count || 10) / 10)),
          },
        };
      });
    }

    // Merge curated posts + live public API posts
    let allPosts = [...CURATED_POSTS, ...livePosts];

    // Filter by category if specified
    if (category && category !== "all") {
      allPosts = allPosts.filter((p) => {
        if (category === "tech") return p.category === "Tech & AI";
        if (category === "design") return p.category === "Design & UI";
        if (category === "culture") return p.category === "Culture & Ideas";
        if (category === "architecture") return p.category === "Architecture";
        if (category === "open") return p.category === "Open Intelligence";
        return true;
      });
    }

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      allPosts = allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: allPosts.length,
      posts: allPosts,
      sourceTimestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    // Graceful fallback to curated posts on any network interruption
    let fallback = [...CURATED_POSTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      fallback = fallback.filter((p) => p.title.toLowerCase().includes(q));
    }
    return NextResponse.json({
      success: true,
      count: fallback.length,
      posts: fallback,
      isFallback: true,
      error: error.message,
    });
  }
}
