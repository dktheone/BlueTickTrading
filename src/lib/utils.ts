import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates display metrics for webinar seat capacity.
 * Enforces a strict minimum 50% baseline floor for social proof and urgency
 * so that early cohorts never display an empty or cold progress bar.
 */
export function calculateSeatMetrics(registrantCount: number = 0, maxSeats: number = 500) {
  const seats = Number(maxSeats) > 0 ? Number(maxSeats) : 500;
  const actual = Math.max(0, Number(registrantCount) || 0);

  // 50% baseline floor (e.g. 250 out of 500)
  const baseFloor = Math.floor(seats * 0.5);

  // Displayed count starts at baseFloor + actual count, capped at seats - 5
  // so remaining seats always show scarcity (at least 5 seats remaining)
  const displayedCount = Math.min(seats - 5, baseFloor + actual);

  // Fill percentage is strictly at least 50%
  const fillPercentage = Math.min(
    99,
    Math.max(50, Math.round((displayedCount / seats) * 100))
  );

  const remainingSeats = Math.max(5, seats - displayedCount);

  return {
    displayedCount,
    maxSeats: seats,
    fillPercentage,
    remainingSeats,
  };
}
