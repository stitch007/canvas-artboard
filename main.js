(function () {
  const canvasEl = document.querySelector('#canvas')
  const context = canvasEl.getContext('2d')

  const rangeEl = document.querySelector('.range > input')
  const colorPickerEl = document.querySelector('.color > input')
  const pencilEl = document.querySelector('.pencil')
  const eraserEl = document.querySelector('.eraser')
  const clearEl = document.querySelector('.clear')
  const downloadEl = document.querySelector('.download')

  let isPanting = false, isErasing = false
  let drawColor = colorPickerEl.parentElement.style.backgroundColor
  let lineWidth = 2
  let startPoint = {x: 0, y: 0}

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  canvasEl.addEventListener('mousedown', mousedown)
  canvasEl.addEventListener('mousemove', mousemove)
  canvasEl.addEventListener('mouseup', mouseup)

  rangeEl.addEventListener('change', lineWidthChange)
  colorPickerEl.addEventListener('change', colorChange)
  pencilEl.addEventListener('click', togglePencil)
  eraserEl.addEventListener('click', toggleEraser)
  clearEl.addEventListener('click', clearCanvas)
  downloadEl.addEventListener('click', downloadImage)

  function resizeCanvas() {
    canvasEl.width = document.body.clientWidth
    canvasEl.height = document.body.clientHeight
  }

  function drawLine(sx, sy, ex, ey) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.strokeStyle = drawColor
    context.lineCap = 'round'
    context.moveTo(sx, sy)
    context.lineTo(ex, ey)
    context.stroke()
    context.closePath()
  }

  function mousedown(e) {
    isPanting = true
    startPoint.x = e.clientX
    startPoint.y = e.clientY
  }

  function mousemove(e) {
    if (isPanting) {
      const {offsetX: endX, offsetY: endY} = e
      if (isErasing) {
        context.clearRect(endX, endY, 25, 25)
      } else {
        drawLine(startPoint.x, startPoint.y, endX, endY)
        startPoint.x = endX
        startPoint.y = endY
      }
    }
  }

  function mouseup() {
    isPanting = false
  }

  function lineWidthChange(e) {
    lineWidth = e.target.value
  }

  function colorChange(e) {
    colorPickerEl.parentElement.style.backgroundColor = e.target.value
    drawColor = e.target.value
  }

  function togglePencil() {
    isPanting = false
    isErasing = false
    canvasEl.className = ''
  }

  function toggleEraser() {
    isPanting = false
    isErasing = true
    canvasEl.className = 'eraser'
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvasEl.width, canvasEl.height)
  }

  function downloadImage() {
    const a = document.createElement('a')
    a.download = 'draw.png'
    a.href = canvasEl.toDataURL()
    a.click()
  }
})()
