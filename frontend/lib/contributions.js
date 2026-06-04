import { getAllPosts } from "./posts";

const dayMs = 24 * 60 * 60 * 1000;
const weekCount = 53;
const activeYear = 2026;

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * dayMs);
}

function startOfUtcDay(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function startOfWeek(date) {
  const utc = startOfUtcDay(date);
  return addDays(utc, -utc.getUTCDay());
}

function getPostDateCounts() {
  return getAllPosts().reduce((counts, post) => {
    counts.set(post.createdAt, (counts.get(post.createdAt) ?? 0) + 1);
    return counts;
  }, new Map());
}

function getLevel(count, maxCount) {
  if (count === 0) return 0;
  if (maxCount <= 1) return 1;

  const ratio = count / maxCount;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.55) return 3;
  if (ratio >= 0.3) return 2;
  return 1;
}

function getMonthLabels(startDate) {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const date = new Date(Date.UTC(activeYear, monthIndex, 1));
    const month = new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC"
    }).format(date);
    const column = Math.floor((date.getTime() - startDate.getTime()) / (7 * dayMs));

    return {
      label: month,
      column
    };
  });
}

export function getContributionActivity() {
  const counts = getPostDateCounts();
  const yearStart = new Date(Date.UTC(activeYear, 0, 1));
  const startDate = startOfWeek(yearStart);
  const maxCount = Math.max(0, ...counts.values());
  const cells = [];

  for (let week = 0; week < weekCount; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const date = addDays(startDate, week * 7 + day);
      const dateKey = toDateKey(date);
      const isActiveYear = date.getUTCFullYear() === activeYear;
      const count = isActiveYear ? counts.get(dateKey) ?? 0 : 0;

      cells.push({
        key: `${week}-${day}`,
        date: dateKey,
        count,
        level: getLevel(count, maxCount)
      });
    }
  }

  return {
    cells,
    monthLabels: getMonthLabels(startDate),
    total: cells.reduce((sum, cell) => sum + cell.count, 0),
    years: [activeYear]
  };
}
