// utils/formatDate.ts

export function formatTweetDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // 1. Within the same hour → "1h" / "30m"
  if (diffMin < 60) {
    if (diffMin < 1) return "now";
    return `${diffMin}m`;
  }

  if (diffHour < 24) {
    return `${diffHour}h`;
  }

  // 2. Yesterday
  if (diffDay === 1) {
    return "yesterday";
  }

  // 3. Within the last 7 days → weekday name (Mon, Tue…)
  if (diffDay < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  // 4. Within the current year → "Sep 12"
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  // 5. Otherwise → "Jan 12, 2024"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
