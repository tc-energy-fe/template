export const download = function (href, fileName) {
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = href
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const upload = () => new Promise((resolve, reject) => {
  let link = document.createElement('input')
  link.style.display = 'none'
  link.type = 'file'
  link.onchange = function () {
    let formData = new FormData()
    formData.append('file', link.files[0])
    resolve(formData)
  }
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
})
