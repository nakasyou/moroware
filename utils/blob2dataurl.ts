export default (data: Blob): Promise<string> => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)

    reader.readAsDataURL(data)
  })
}