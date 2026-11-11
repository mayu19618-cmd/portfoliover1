import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  // ローカル開発: base = '/'（デフォルト）
  // GitHub Pages デプロイ時: GitHub Actions の deploy.yml で BASE_PATH を設定
  //   - https://mayu19618-cmd.github.io/portfoliover1/ で公開する場合 → BASE_PATH='/portfoliover1/'
  //   - https://mayu19618-cmd.github.io/ で公開する場合 → BASE_PATH='/' または未設定
  base: process.env.BASE_PATH ?? '/',
})
