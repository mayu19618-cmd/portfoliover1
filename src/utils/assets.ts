// パブリックアセットのURLを生成する
// ローカル開発（base='/'）: '/rabbit1.png' → '/rabbit1.png'
// GitHub Pages（base='/portfoliover1/'）: '/rabbit1.png' → '/portfoliover1/rabbit1.png'
//
// CMS経由でアップロードされた画像はpublic_folderの設定によって
// '/portfoliover1/images/works/file.jpg' のようにbaseが含まれた状態で
// JSONに保存される場合がある。その場合は二重付けを防ぐためそのまま返す。
export function pub(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. '' or '/portfoliover1'
  if (base && path.startsWith(base + '/')) return path; // すでにbaseが含まれている
  return base + (path.startsWith('/') ? path : '/' + path);
}
