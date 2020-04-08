const express = require('express')
const path = require('path')
const fs = require('fs')
const Mock = require('mockjs')

const app = express()

const apiMapping = (basePath, url) => {
  try {
    const files = fs.readdirSync(basePath, 'utf8')
    files.forEach((file) => {
      const filePath = path.join(basePath, file)
      // 检查是文件 | 文件夹
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        apiMapping(filePath, `${url}/${file}`)
      } else {
        const apiURL = `${url}/${path.basename(file, '.js')}`
        const data = require(filePath) // eslint-disable-line

        // 添加mock api接口
        app.use(apiURL, (req, res) => {
          res.json(Mock.mock(data))
        })
      }
    })
  } catch (err) {
    console.log(err) // eslint-disable-line
  }
}
apiMapping(path.join(__dirname, 'api'), '/api')

const { HOST, PORT } = process.env
app.listen(PORT, HOST, () => {
  console.log(`监听端口 ${PORT}`) // eslint-disable-line
})
