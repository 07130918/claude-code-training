"use client";

import { useState, useEffect } from "react";
import type { GameResult, ApiResponse } from "@/lib/types";
import styles from "./page.module.css";

function getTodayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toDateParam(dateStr: string): string {
  return dateStr.replace(/-/g, "");
}

export default function Home() {
  const [date, setDate] = useState(getTodayString());
  const [games, setGames] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/games?date=${toDateParam(date)}`);
        const json: ApiResponse<GameResult[]> = await res.json();
        if (json.success) {
          setGames(json.data);
        } else {
          setError(json.error.message);
          setGames([]);
        }
      } catch {
        setError("データの取得に失敗しました");
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [date]);

  const displayDate = new Date(date + "T00:00:00").toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>NPB 試合結果</h1>
          <div className={styles.dateControl}>
            <span className={styles.displayDate}>{displayDate}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.datePicker}
            />
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {loading && (
          <div className={styles.center}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>読み込み中...</p>
          </div>
        )}

        {!loading && error && (
          <div className={styles.center}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        {!loading && !error && games.length === 0 && (
          <div className={styles.center}>
            <p className={styles.emptyText}>この日の試合はありません</p>
          </div>
        )}

        {!loading && !error && games.length > 0 && (
          <div className={styles.gameList}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function GameCard({ game }: { game: GameResult }) {
  const isFinished = game.status === "finished";
  const team1Wins =
    isFinished &&
    game.score1 !== null &&
    game.score2 !== null &&
    game.score1 > game.score2;
  const team2Wins =
    isFinished &&
    game.score1 !== null &&
    game.score2 !== null &&
    game.score2 > game.score1;

  const winPitcher = game.pitchers.find((p) => p.role === "勝");
  const losePitcher = game.pitchers.find((p) => p.role === "敗");
  const savePitcher = game.pitchers.find(
    (p) => p.role === "Ｓ" || p.role === "S" || p.role === "ｓ"
  );

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span
          className={`${styles.badge} ${isFinished ? styles.badgeFinished : styles.badgeScheduled}`}
        >
          {isFinished ? "終了" : "予定"}
        </span>
        <span className={styles.place}>{game.place}</span>
        {!isFinished && game.time && (
          <span className={styles.timeLabel}>{game.time} 開始</span>
        )}
      </div>

      <div className={styles.matchup}>
        <div className={`${styles.teamBlock} ${team1Wins ? styles.winnerBlock : ""}`}>
          <span className={styles.teamName}>{game.team1}</span>
          {isFinished && (
            <span className={`${styles.score} ${team1Wins ? styles.scoreWinner : ""}`}>
              {game.score1}
            </span>
          )}
        </div>

        <div className={styles.separator}>
          {isFinished ? (
            <span className={styles.dash}>-</span>
          ) : (
            <span className={styles.vs}>VS</span>
          )}
        </div>

        <div
          className={`${styles.teamBlock} ${styles.teamBlockRight} ${team2Wins ? styles.winnerBlock : ""}`}
        >
          {isFinished && (
            <span className={`${styles.score} ${team2Wins ? styles.scoreWinner : ""}`}>
              {game.score2}
            </span>
          )}
          <span className={styles.teamName}>{game.team2}</span>
        </div>
      </div>

      {isFinished && (winPitcher || losePitcher || savePitcher) && (
        <div className={styles.pitchers}>
          {winPitcher && (
            <span className={styles.pitcherItem}>
              <span className={styles.pitcherRole}>勝</span>
              {winPitcher.name}
            </span>
          )}
          {losePitcher && (
            <span className={styles.pitcherItem}>
              <span className={styles.pitcherRole}>負</span>
              {losePitcher.name}
            </span>
          )}
          {savePitcher && (
            <span className={styles.pitcherItem}>
              <span className={styles.pitcherRole}>Ｓ</span>
              {savePitcher.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
