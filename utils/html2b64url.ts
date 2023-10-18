/**
 * HTMLをBase64URLにする
 */
export default (literals: TemplateStringsArray | string, ...datas: string[]) => {
  let html = ''
  if (typeof literals !== 'string') {
    for (let i = 0; i !== datas.length; i++) {
      html += literals[i]
      html += datas[i]
    }
    html += literals.at(-1)
  } else {
    html = literals
  }
  
  return `data:text/html,${encodeURIComponent(html)}`
}
