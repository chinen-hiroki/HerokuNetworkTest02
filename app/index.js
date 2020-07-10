'use strict'

const express = require('express')
const router = require('./module/router')
const app = express()
const portForDev = 4000

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
