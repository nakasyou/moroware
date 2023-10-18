import { Webview, SizeHint } from 'webview'
import html from "../utils/html2b64url.ts"

const app = new Webview()

app.navigate(html`<!doctype HTML>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <p>パスワードが違いまーす</p>
    </body>
  </html>
  `)

app.title = 'マルウェア!!'
app.size = {
  width: 300,
  height: 300,
  hint: SizeHint.FIXED
}
setTimeout(() => {
  app.destroy()
  Deno.exit()
}, 500)

app.run()