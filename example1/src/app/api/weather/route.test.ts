import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/weather', () => ({
  fetchCurrentWeather: vi.fn(),
}));

import { GET } from './route';
import { fetchCurrentWeather } from '@/lib/weather';

const mockWeatherData = {
  city: '東京',
  current: {
    temperature: 20,
    apparentTemperature: 18,
    humidity: 65,
    windspeed: 10,
    weatherCode: 0,
    time: '2024-01-01T12:00',
  },
};

describe('GET /api/weather', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('200ステータスコードを返すこと', async () => {
    vi.mocked(fetchCurrentWeather).mockResolvedValue(mockWeatherData);
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it('success: true と天気データを返すこと', async () => {
    vi.mocked(fetchCurrentWeather).mockResolvedValue(mockWeatherData);
    const response = await GET();
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toEqual(mockWeatherData);
  });

  it('外部APIエラー時に500ステータスを返すこと', async () => {
    vi.mocked(fetchCurrentWeather).mockRejectedValue(new Error('Open-Meteo API error: 503'));
    const response = await GET();
    expect(response.status).toBe(500);
  });

  it('外部APIエラー時に success: false とエラーメッセージを返すこと', async () => {
    vi.mocked(fetchCurrentWeather).mockRejectedValue(new Error('Open-Meteo API error: 503'));
    const response = await GET();
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error.message).toBe('Open-Meteo API error: 503');
  });
});
