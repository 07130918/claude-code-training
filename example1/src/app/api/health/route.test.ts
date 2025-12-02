import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /api/health', () => {
  it('200ステータスコードを返すこと', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it('レスポンスボディにstatusフィールドが含まれること', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toHaveProperty('status');
    expect(data.status).toBe('ok');
  });

  it('レスポンスボディにtimestampフィールドが含まれること', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toHaveProperty('timestamp');
  });

  it('timestampがISO 8601形式であること', async () => {
    const response = await GET();
    const data = await response.json();
    // ISO 8601形式の正規表現（例: 2024-01-01T00:00:00.000Z）
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(data.timestamp).toMatch(iso8601Regex);
  });

  it('レスポンスのContent-TypeがJSONであること', async () => {
    const response = await GET();
    const contentType = response.headers.get('content-type');
    expect(contentType).toContain('application/json');
  });
});
