import React from 'react';

/**
 * テキストを整形して表示するユーティリティ。
 * ・ 。の後（行末以外）に改行を挿入
 * ・ スペース + - の前に改行を挿入（リスト項目として使用する場合）
 *   例: "好きです。趣味は絵です。" → 1文ずつ改行
 *   例: "Figma - Illustrator - Photoshop" → 1項目ずつ改行
 *   ※ スペースのない "-" (日付の区切り等) には影響しません
 */
export function formatText(text: string): React.ReactNode {
  if (!text) return null;

  const processed = text
    .replace(/。(?=[^\n])/g, '。\n')  // 。の後（行末以外）に改行
    .replace(/ +- */g, '\n- ');        // 半角スペース後の - を新しい行へ

  const lines = processed.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line.trim()}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}
