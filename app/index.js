'use strict'

const express = require('express')
const router = require('./module/router')
const app = express()
const portForDev = 4001

const expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)
const Redis = require('ioredis')

// redis設定
const ioredis = new Redis(process.env.REDIS_URL)

// セッション設定
app.use(expressSession({
  secret: process.env.SESSION_KEY || 'secret', // @TODO 環境変数に SESSION_KEY を追加する.
  name: 'XhFEqXpTFR',
  store: new RedisStore({ client: ioredis, ttl: 1800 }),
  resave: false,
  saveUninitialized: false
}))

// リバースプロキシ下でリモートIPを取得するには必要
app.set('trust proxy', 1)

// ポート番号指定
app.set('port', process.env.PORT || portForDev)

// テンプレートエンジン設定
app.set('views', './app/views')
app.set('view engine', 'ejs')

// 使用技術隠蔽
app.disable('x-powered-by')

// ルータ設定適用
app.use(router)

// サーバを立てる
app.listen(app.get('port'), () => {
  console.log('■■■ Main server listening on: http://localhost:' + app.get('port'))
})
