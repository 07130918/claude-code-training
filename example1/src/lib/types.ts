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

export interface PitcherResult {
  role: string; // '勝' | '敗' | 'Ｓ' | '分'
  name: string;
}

export type GameStatus = "finished" | "scheduled" | "cancelled";

export interface GameResult {
  id: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  place: string;
  time: string;
  status: GameStatus;
  pitchers: PitcherResult[];
  gameUrl: string;
}
