'use strict'

const gCanvasData = {
  canvas: null,
  ctx: null,
}

function setCanvas() {
  gCanvasData.canvas = document.querySelector('canvas')
  gCanvasData.ctx = gCanvasData.canvas.getContext('2d')
}

function getCanvasData() {
  return gCanvasData
}
