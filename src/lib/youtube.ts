export function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;
    let startSeconds: number | null = null;
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      videoId = parsed.pathname.slice(1);
      startSeconds = parseStartSeconds(parsed);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
        startSeconds = parseStartSeconds(parsed);
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
        startSeconds = parseStartSeconds(parsed);
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
        startSeconds = parseStartSeconds(parsed);
      }
    }

    if (!videoId) {
      return null;
    }

    const startParam = startSeconds && startSeconds > 0 ? `&start=${startSeconds}` : "";
    return `https://www.youtube.com/embed/${videoId}?rel=0${startParam}`;
  } catch {
    return null;
  }
}

function parseStartSeconds(url: URL): number | null {
  const directStart = url.searchParams.get("start");
  if (directStart) {
    const numericStart = Number.parseInt(directStart, 10);
    if (Number.isFinite(numericStart) && numericStart >= 0) {
      return numericStart;
    }
  }

  const tParam = url.searchParams.get("t");
  if (tParam) {
    const parsedT = parseYouTubeTimeString(tParam);
    if (parsedT !== null) {
      return parsedT;
    }
  }

  const hash = url.hash.replace(/^#/, "");
  const hashTime = hash.startsWith("t=") ? hash.slice(2) : hash;
  if (hashTime) {
    const parsedHash = parseYouTubeTimeString(hashTime);
    if (parsedHash !== null) {
      return parsedHash;
    }
  }

  return null;
}

export function parseYouTubeTimeString(value: string): number | null {
  const plainNumber = Number.parseInt(value, 10);
  if (/^\d+$/.test(value) && Number.isFinite(plainNumber) && plainNumber >= 0) {
    return plainNumber;
  }

  const timeMatch = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!timeMatch) {
    return null;
  }
  if (!timeMatch[1] && !timeMatch[2] && !timeMatch[3]) {
    return null;
  }

  const hours = Number.parseInt(timeMatch[1] ?? "0", 10);
  const minutes = Number.parseInt(timeMatch[2] ?? "0", 10);
  const seconds = Number.parseInt(timeMatch[3] ?? "0", 10);

  if (![hours, minutes, seconds].every((num) => Number.isFinite(num) && num >= 0)) {
    return null;
  }

  return (hours * 60 + minutes) * 60 + seconds;
}
