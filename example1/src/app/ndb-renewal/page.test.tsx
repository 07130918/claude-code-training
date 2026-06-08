import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import NdbRenewalPage from './page';

describe('/ndb-renewal ページ', () => {
  it('ページコンポーネントが描画できる', () => {
    const html = renderToStaticMarkup(<NdbRenewalPage />);
    expect(html.length).toBeGreaterThan(0);
  });

  it('ヒーローの見出しが表示される', () => {
    const html = renderToStaticMarkup(<NdbRenewalPage />);
    expect(html).toContain('お客様と共に、');
    expect(html).toContain('情報技術で未来を創る。');
  });

  it('サービス3件が表示される', () => {
    const html = renderToStaticMarkup(<NdbRenewalPage />);
    expect(html).toContain('開発・導入サービス');
    expect(html).toContain('オンサイトサービス');
    expect(html).toContain('コンサルテーションサービス');
  });

  it('採用向けセクションが表示される', () => {
    const html = renderToStaticMarkup(<NdbRenewalPage />);
    expect(html).toContain('一緒に未来を創りませんか');
  });

  it('お問い合わせ導線が表示される', () => {
    const html = renderToStaticMarkup(<NdbRenewalPage />);
    expect(html).toContain('お問い合わせ');
    expect(html).toContain('03-3456-5381');
  });
});
