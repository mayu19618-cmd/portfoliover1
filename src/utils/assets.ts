// パブリックアセットのURLを生成する
// ローカル開発（base='/'）: '/rabbit1.png' → '/rabbit1.png'
// GitHub Pages（base='/portfoliover1/'）: '/rabbit1.png' → '/portfoliover1/rabbit1.png'
export function pub(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL;
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
}
