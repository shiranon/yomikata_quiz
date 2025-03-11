import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const options = {
  ignoreHeaders: true,
  recursionLimit: 2, // 再帰の深さを制限
  preserveSpecificKeys: {
    // 特定のキーの変換を無視
    quizzes: true,
    mylists: true,
    comic: true,
    author: true,
    user: true,
  },
}

// クライアントサイド用
export const browserClient = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }),
  options,
)

// サーバーサイド用
export const serverClient = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.API_URL,
  }),
  options,
)

// 実行環境に応じて適切なクライアントを返す
export default typeof window === 'undefined' ? serverClient : browserClient
