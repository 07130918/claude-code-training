import type { CurrencyCode, ConversionResult, ExchangeRatesResponse } from "./types";
import { CURRENCIES } from "./types";

export function convert(
  amount: number,
  from: CurrencyCode,
  rates: Record<string, number>
): ConversionResult[] {
  const fromRate = rates[from];
  if (!fromRate) return [];
  return CURRENCIES.filter((c) => c !== from).map((currency) => ({
    currency,
    amount: (amount / fromRate) * rates[currency],
  }));
}

export function formatAmount(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
  }).format(amount);
}

export function formatUpdateTime(utcString: string): string {
  const date = new Date(utcString);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(date);
}

