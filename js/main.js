'use strict'

function onInit() {
  setCanvas()
  renderGallery()
}

function onShowGallery() {
  document.querySelector('.editor-container').classList.add('hidden')
  document.querySelector('.saved-gallery').classList.add('hidden')
  document.querySelector('.main-gallery').classList.remove('hidden')
}

function onShareFacebook() {
  const shareWindow = window.open('about:blank', '_blank')

  renderCanvas(false, () => {
    const canvas = getCanvasData().canvas

    canvas.toBlob(blob => {
      renderCanvas()

      if (!blob) {
        shareWindow.close()
        return
      }

      uploadImg(blob, uploadedImgUrl => {
        const encodedUrl = encodeURIComponent(uploadedImgUrl)

        shareWindow.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      })
    }, 'image/jpeg')
  })
}

function onShowSaved() {
  document.querySelector('.editor-container').classList.add('hidden')
  document.querySelector('.main-gallery').classList.add('hidden')
  document.querySelector('.saved-gallery').classList.remove('hidden')

  renderSaved()
}

function renderSaved() {
  const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []
  const elSavedGallery = document.querySelector('.saved-gallery')

  if (!savedMemes.length) {
    elSavedGallery.innerHTML = '<p>No saved memes yet</p>'
    return
  }

  elSavedGallery.innerHTML = savedMemes
    .map(
      (img, idx) => `
        <img src="${img}" onclick="onDownloadSavedMeme(${idx})">
      `,
    )
    .join('')
}

function onDownloadSavedMeme(idx) {
  const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []
  const elLink = document.createElement('a')

  elLink.href = savedMemes[idx]
  elLink.download = `meme-${idx + 1}.png`
  elLink.click()
}
