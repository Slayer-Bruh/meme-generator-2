'use strict'

let gIsDragging = false
let gStartX = 0
let gStartY = 0

renderGallery()

function onImgSelect(imgId) {
  const meme = getMeme()
  meme.selectedImgId = imgId

  renderCanvas()

  document.querySelector('.main-gallery').classList.add('hidden')
  document.querySelector('.editor-container').classList.remove('hidden')
}

function renderGallery() {
  const imgs = getImgs()
  const elGalleryContainer = document.querySelector('.main-gallery')
  let strHtml = ''

  imgs.forEach(
    img =>
      (strHtml += `<img 
        src="${img.url}" 
        id="${img.id}"
        onclick="onImgSelect(${img.id})">`),
  )
  elGalleryContainer.innerHTML = strHtml
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderCanvas()
}

function onAddLine() {
  const meme = getMeme()
  addLine()
  renderCanvas()

  const elInput = document.querySelector('.text-input')
  const elSelector = document.querySelector('.font-selector')
  elInput.value = meme.lines[meme.selectedLineIdx].txt
  elSelector.value = meme.lines[meme.selectedLineIdx].font
  elInput.focus()
}

function onDeleteLine() {
  const meme = getMeme()
  deleteLine()
  renderCanvas()

  const elInput = document.querySelector('.text-input')
  const elSelector = document.querySelector('.font-selector')
  elInput.value = meme.lines[meme.selectedLineIdx].txt
  elSelector.value = meme.lines[meme.selectedLineIdx].font
  elInput.focus()
}

function onSetLineAlign(align) {
  const canvas = getCanvasData().canvas

  setLineAlign(align, canvas.width)
  renderCanvas()
}

function onSetFontSize(diff) {
  setFontSize(diff)
  renderCanvas()
}

function onChangeFont(font) {
  changeFont(font)
  renderCanvas()
}

function onSetColor(color) {
  setColor(color)
  renderCanvas()
  console.log('color:', color)
}

function onMouseDown(ev) {
  onDragStart(ev.offsetX, ev.offsetY, ev.target)
}

function onMouseMove(ev) {
  onDragMove(ev.offsetX, ev.offsetY)
}

function onMouseUp(ev) {
  onDragEnd(ev.target)
}

function onDragStart(x, y, target) {
  const meme = getMeme()

  meme.lines.forEach((line, idx) => {
    if (isPointInTextRect(line, x, y)) {
      gIsDragging = true
      gStartX = x
      gStartY = y

      meme.selectedLineIdx = idx

      document.querySelector('.text-input').value = line.txt
      document.querySelector('.font-selector').value = line.font

      target.style.cursor = 'grabbing'
      renderCanvas()
    }
  })
}

function onDragMove(x, y) {
  const canvas = getCanvasData().canvas

  if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
    gIsDragging = false
    return
  }

  if (!gIsDragging) return

  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]

  line.posX += x - gStartX
  line.posY += y - gStartY

  gStartX = x
  gStartY = y

  renderCanvas()
}

function onDragEnd(target) {
  gIsDragging = false
  target.style.cursor = 'default'
}

function onTouchStart(ev) {
  ev.preventDefault()

  const touch = ev.touches[0]
  const rect = ev.target.getBoundingClientRect()

  const x = (touch.clientX - rect.left) * (ev.target.width / rect.width)
  const y = (touch.clientY - rect.top) * (ev.target.height / rect.height)

  onDragStart(x, y, ev.target)
}

function onTouchMove(ev) {
  ev.preventDefault()

  const touch = ev.touches[0]
  const rect = ev.target.getBoundingClientRect()

  const x = (touch.clientX - rect.left) * (ev.target.width / rect.width)
  const y = (touch.clientY - rect.top) * (ev.target.height / rect.height)

  onDragMove(x, y)
}

function onTouchEnd(ev) {
  onDragEnd(ev.target)
}

function onDownloadMeme() {
  renderCanvas(false, () => {
    const elLink = document.createElement('a')

    elLink.href = getCanvasData().canvas.toDataURL('image/png')
    elLink.download = 'my-meme.png'
    elLink.click()

    renderCanvas()
  })
}

function onSaveMeme() {
  renderCanvas(false, () => {
    const canvas = getCanvasData().canvas
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []

    savedMemes.push(canvas.toDataURL('image/png'))
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes))

    renderCanvas()
    onShowSaved()
  })
}

function onShareFacebook() {
  console.log(':')
  const canvas = getCanvasData().canvas

  canvas.toBlob(blob => {
    uploadImg(blob, url => {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      window.open(shareUrl, '_blank')
    })
  }, 'image/png')
}
