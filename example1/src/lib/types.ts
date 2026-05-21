/**
 * API成功レスポンス
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * APIエラーレスポンス
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
  };
}

/**
 * APIレスポンス型
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * ヘルスチェックレスポンス
 */
export interface HealthCheckResponse {
  status: "ok";
  timestamp: string;
}

export const CURRENCIES = ["USD", "JPY", "EUR", "GBP", "CNY", "KRW", "AUD", "CAD"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export interface ExchangeRatesResponse {
  base: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
}

export interface ConversionResult {
  currency: CurrencyCode;
  amount: number;
}
