/**
 * Returns a YouTube embed URL (https://www.youtube.com/embed/ID) or null.
 * Accepts watch, youtu.be, and /embed/ links.
 */
export function youtubeEmbedUrlFromLink(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  const url = raw.trim();
  const fromWatch = url.match(/[?&]v=([^&\s?]+)/);
  if (fromWatch) return `https://www.youtube.com/embed/${fromWatch[1]}`;
  const fromShort = url.match(/youtu\.be\/([^?\s&]+)/);
  if (fromShort) return `https://www.youtube.com/embed/${fromShort[1]}`;
  const fromEmbed = url.match(/youtube\.com\/embed\/([^?\s&]+)/);
  if (fromEmbed) return `https://www.youtube.com/embed/${fromEmbed[1]}`;
  return null;
}
