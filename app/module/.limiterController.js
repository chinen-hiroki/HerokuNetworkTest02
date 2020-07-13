const rateLimit = require('express-rate-limit')

const getRemainTimeMinuteSecond = function (resetTimeEpochMs) {
  const resetTime = new Date(resetTimeEpochMs)
  const nowTime = new Date()

  const diffMs = resetTime.getTime() - nowTime.getTime()

  const minute = Math.trunc(diffMs / 1000 / 60)
  const second = Math.trunc(diffMs / 1000 % 60)

  return minute + '分 ' + second + '秒'
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100,
  handler: (req, res, next) => {
    const rateLimitResetTimeSec = res.getHeader('x-ratelimit-reset')
    const rateLimitResetTimeMs = rateLimitResetTimeSec * 1000
    const remainTimeMinuteSecondStr = getRemainTimeMinuteSecond(rateLimitResetTimeMs)
    res.status(429).send('リクエストが多すぎます 次にアクセス可能になるまで残り ' + remainTimeMinuteSecondStr)
  }
})

module.exports = limiter