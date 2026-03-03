import { parseYouTubeTimeString, toYouTubeEmbedUrl } from "@/lib/youtube";

describe("youtube utilities", () => {
  describe("toYouTubeEmbedUrl", () => {
    it("converts youtu.be links with t query", () => {
      expect(toYouTubeEmbedUrl("https://youtu.be/xyz987?t=1m2s")).toBe(
        "https://www.youtube.com/embed/xyz987?rel=0&start=62",
      );
    });

    it("converts watch links with start query", () => {
      expect(toYouTubeEmbedUrl("https://www.youtube.com/watch?v=abc123&start=15")).toBe(
        "https://www.youtube.com/embed/abc123?rel=0&start=15",
      );
    });

    it("converts shorts links", () => {
      expect(toYouTubeEmbedUrl("https://www.youtube.com/shorts/abc123")).toBe(
        "https://www.youtube.com/embed/abc123?rel=0",
      );
    });

    it("parses hash time", () => {
      expect(toYouTubeEmbedUrl("https://www.youtube.com/watch?v=abc123#t=2m")).toBe(
        "https://www.youtube.com/embed/abc123?rel=0&start=120",
      );
    });

    it("returns null for non-youtube links", () => {
      expect(toYouTubeEmbedUrl("https://example.com/video")).toBeNull();
    });

    it("returns null for invalid URLs", () => {
      expect(toYouTubeEmbedUrl("not-a-url")).toBeNull();
    });
  });

  describe("parseYouTubeTimeString", () => {
    it("parses plain second strings", () => {
      expect(parseYouTubeTimeString("90")).toBe(90);
    });

    it("parses h/m/s strings", () => {
      expect(parseYouTubeTimeString("1h2m3s")).toBe(3723);
      expect(parseYouTubeTimeString("2m5s")).toBe(125);
      expect(parseYouTubeTimeString("45s")).toBe(45);
    });

    it("returns null for invalid strings", () => {
      expect(parseYouTubeTimeString("abc")).toBeNull();
      expect(parseYouTubeTimeString("1x2y")).toBeNull();
      expect(parseYouTubeTimeString("")).toBeNull();
    });
  });
});
