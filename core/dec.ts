import * as path from 'std/path/mod.ts'
import CryptoJS from 'https://esm.sh/crypto-js@4.1.1'
import * as fs from 'std/fs/mod.ts'
import { z } from 'npm:zod@3.22.4'

const VirusMetaData = z.object({
  salt: z.object({
    words: z.array(z.number()),
    sigBytes: z.number()
  }),
  iv: z.object({
    words: z.array(z.number()),
    sigBytes: z.number()
  })
})
const dec = async (encPath: string, password: string) => {
  const virusMetaData: z.infer<typeof VirusMetaData> = JSON.parse(await Deno.readTextFile(path.join(encPath, 'virus.json')))
  VirusMetaData.parse(virusMetaData)
  
  const key = CryptoJS.PBKDF2(password, CryptoJS.lib.WordArray.create(virusMetaData.salt.words, virusMetaData.salt.sigBytes), {
    keySize: 128 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA256,
  })

  for await (const entry of fs.expandGlob(path.join(encPath, '**/*.ango'))) {
    if (!entry.isFile) {
      continue
    }
    const encedData = await Deno.readTextFile(entry.path)
    
    let decedText: string
    try {
      decedText = CryptoJS.AES.decrypt(encedData, key, {
        iv: CryptoJS.lib.WordArray.create(virusMetaData.iv.words, virusMetaData.iv.sigBytes),
      }).toString(CryptoJS.enc.Utf8)
    } catch (_e) {
      return false
    }
    
    if (decedText === '') {
      return false
    }

    const decedData = await fetch(decedText).then(res => res.arrayBuffer())

    await Deno.writeFile(entry.path.replace(/\.ango$/, ''), new Uint8Array(decedData))
    await Deno.remove(entry.path)
  }
  await Deno.remove(path.join(encPath, './virus.json'))

  //const arr = Uint8Array.from(str, s => str.charCodeAt(s))
  //await Deno.writeFile('a', arr) { type: 'application/octet-stream' }
  return true
}
export default dec

if (import.meta.main) {
  await dec(
    path.fromFileUrl(path.join(import.meta.url, '../../data')),
    prompt('Password?') || ''
  )
}