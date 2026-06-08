import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import NdbRenewalPage from './page';

// 追加依存なしで描画内容を検証するため、ページを静的HTMLへ変換して文字列を確認する。
// （Server Component で状態・イベントを持たないため renderToStaticMarkup で十分）
function renderPage(): string {
  return renderToStaticMarkup(<NdbRenewalPage />);
}

describe('/ndb-renewal ページ', () => {
  it('ページコンポーネントが描画できること', () => {
    expect(() => renderPage()).not.toThrow();
  });

  it('ヒーローの見出しが表示されること', () => {
    const html = renderPage();
    expect(html).toContain('情報技術で未来を創る');
  });

  it('サービス3件が表示されること', () => {
    const html = renderPage();
    expect(html).toContain('開発・導入サービス');
    expect(html).toContain('オンサイトサービス');
    expect(html).toContain('コンサルテーションサービス');
  });

  it('採用向けセクションが表示されること', () => {
    const html = renderPage();
    expect(html).toContain('採用情報');
  });

  it('会社の特徴セクションが表示されること', () => {
    const html = renderPage();
    expect(html).toContain('私たちの特徴');
    expect(html).toContain('ライフサイクル全般を支援');
  });

  it('Newsセクションがサンプル注記付きで表示されること', () => {
    const html = renderPage();
    expect(html).toContain('News');
    // 架空情報の混入を防ぐため、サンプルである旨の注記が表示されること
    expect(html).toContain('（サンプル）');
    expect(html).toContain('表示確認用サンプル');
  });

  it('お問い合わせ導線が表示されること', () => {
    const html = renderPage();
    expect(html).toContain('お問い合わせ');
    // ヒーローのCTAがお問い合わせセクションへ誘導していること
    expect(html).toContain('href="#contact"');
  });
});
