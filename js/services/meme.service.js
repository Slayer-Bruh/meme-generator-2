'use strict'

var gImgs = [
  { id: 1, url: '/imgs/1.jpg' },
  { id: 2, url: '/imgs/2.jpg' },
  { id: 3, url: '/imgs/3.jpg' },
  { id: 4, url: '/imgs/4.jpg' },
  { id: 5, url: '/imgs/5.jpg' },
  { id: 6, url: '/imgs/6.jpg' },
  { id: 7, url: '/imgs/7.jpg' },
  { id: 8, url: '/imgs/8.jpg' },
  { id: 9, url: '/imgs/9.jpg' },
  { id: 10, url: '/imgs/10.jpg' },
  { id: 11, url: '/imgs/11.jpg' },
  { id: 12, url: '/imgs/12.jpg' },
  { id: 13, url: '/imgs/13.jpg' },
  { id: 14, url: '/imgs/14.jpg' },
  { id: 15, url: '/imgs/15.jpg' },
  { id: 16, url: '/imgs/16.jpg' },
  { id: 17, url: '/imgs/17.jpg' },
  { id: 18, url: '/imgs/18.jpg' },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [],
}

addLine()

function getImgs() {
  return gImgs
}

function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function addLine(txt) {
  gMeme.lines.push(_createLine())
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
  if (gMeme.lines.length === 1) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  gMeme.selectedLineIdx = Math.max(0, gMeme.selectedLineIdx - 1)
}

function setLineAlign(align, canvasWidth) {
  gMeme.lines[gMeme.selectedLineIdx].align = align

  switch (align) {
    case 'left':
      gMeme.lines[gMeme.selectedLineIdx].posX = 10
      break

    case 'center':
      gMeme.lines[gMeme.selectedLineIdx].posX = canvasWidth / 2
      break

    case 'right':
      gMeme.lines[gMeme.selectedLineIdx].posX = canvasWidth - 10
      break
  }
}

function setFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getTextRect(line) {
  getCanvasData().ctx.font = `${line.size}px ${line.font}`

  const metrics = getCanvasData().ctx.measureText(line.txt)

  return {
    width: metrics.width,
    topY: line.posY - metrics.actualBoundingBoxAscent,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    startX: getTextStartX(line, metrics.width),
  }
}

function getTextStartX(line, textWidth) {
  let startX

  switch (line.align) {
    case 'left':
      startX = line.posX
      break

    case 'center':
      startX = line.posX - textWidth / 2
      break

    case 'right':
      startX = line.posX - textWidth
      break
  }
  return startX
}

function isPointInTextRect(line, x, y) {
  const rect = getTextRect(line)

  return (
    x >= rect.startX &&
    x <= rect.startX + rect.width &&
    y >= rect.topY &&
    y <= rect.topY + rect.height
  )
}

function _createLine() {
  return {
    txt: 'Type Here...',
    size: 35,
    color: 'White',
    font: 'Arial, sans-serif',
    posX: 200,
    posY: 50 + gMeme.lines.length * 50,
    align: 'center',
  }
}
