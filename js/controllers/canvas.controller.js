'use strict'

function renderCanvas(showSelection = true, onRenderComplete = null) {
  const canvas = getCanvasData().canvas
  const ctx = getCanvasData().ctx
  const meme = getMeme()
  const imgs = getImgs()

  const img = imgs.find(img => img.id === meme.selectedImgId)
  const elImg = new Image()

  elImg.src = img.url
  elImg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
    renderText(showSelection)
    if (onRenderComplete) onRenderComplete()
  }
}

function renderText(showSelection = true) {
  const meme = getMeme()
  const ctx = getCanvasData().ctx

  meme.lines.forEach((line, idx) => {
    ctx.font = `${line.size}px ${line.font}`
    ctx.fillStyle = line.color
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 7
    ctx.textAlign = line.align
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeText(line.txt, line.posX, line.posY)
    ctx.fillText(line.txt, line.posX, line.posY)

    if (showSelection && idx === meme.selectedLineIdx) {
      const rect = getTextRect(line)

      ctx.strokeStyle = '#ff7f00'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(
        rect.startX - 10,
        rect.topY - 10,
        rect.width + 20,
        rect.height + 20,
        8,
      )
      ctx.stroke()
    }
  })
}
