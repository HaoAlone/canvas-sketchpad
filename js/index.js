var canvas = document.getElementById('xxx')
var context = canvas.getContext('2d')
context.translate(0.5,0.5)
//svg图标
var pen = document.getElementById('pen')
var brush = document.getElementById('brush')
var clear = document.getElementById('clear')
var download = document.getElementById('download')

var lis = document.getElementsByTagName('li')
var thin = document.getElementById('thin')
var wide = document.getElementById('wide')

//橡皮擦
var eraser = false
var lineWidth = 4
// canvas保持和窗口一样大
autoResize(canvas)
//鼠标事件，点击，拖拽，松开
listenUser(canvas)
//点击button，启动橡皮擦
pen.onclick = function () {
	eraser = false
	pen.classList.add('active')
	brush.classList.remove('active')
}
brush.onclick = function () {
	eraser = true
	brush.classList.add('active')
	pen.classList.remove('active')
}
//点击清空
clear.onclick = function () {
	context.clearRect(0,0,canvas.width,canvas.height)
	console.log(canvas.width)
}
//点击保存
download.onclick = function () {
	var url = canvas.toDataURL('image/png')
	var a = document.createElement('a')
	document.body.appendChild(a)
	a.href = url
	a.download = '我的图画'
	a.click()
}
// 点击换色
lis[0].onclick = function () {
	// context.fillStyle = green;
	context.strokeStyle = 'green';
	lis[0].classList.add('active')
	lis[1].classList.remove('active')
	lis[2].classList.remove('active')
}
lis[1].onclick = function () {
	context.strokeStyle = 'yellow';
	lis[0].classList.remove('active')
	lis[1].classList.add('active')
	lis[2].classList.remove('active')
}
lis[2].onclick = function () {
	context.strokeStyle = 'red';
	lis[0].classList.remove('active')
	lis[1].classList.remove('active')
	lis[2].classList.add('active')
}
//点击改变画笔粗细
thin.onclick = function () {
	lineWidth = 4
}
wide.onclick = function () {
	lineWidth = 10
}

function listenUser(canvas) {
	var drawing = false
	var lastPoint = {}
	if (document.body.ontouchstart === undefined){
		//	pc
		canvas.onmousedown = function(e){
			drawing = true
			var x = e.clientX
			var y =e.clientY
			if (eraser){
				context.clearRect(x-5, y-5, 10,10)
			}else{
				drawCircle(x,y,1)
				lastPoint = {'x':x,'y':y}
			}
		}
		canvas.onmousemove = function(e){
			var x = e.clientX
			var y =e.clientY
			if (drawing){
				if (eraser){
					context.clearRect(x-5, y-5, 10,10)
				}else {
					drawCircle(x,y,1)
					newPoint = {'x':x,'y':y}
					drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
					lastPoint = newPoint
				}
			}
		}
		canvas.onmouseup = function(){
			drawing = false
		}
	}else{
		//	移动端
		canvas.ontouchstart = function (e) {
			drawing = true
			var x = e.touches[0].clientX
			var y =e.touches[0].clientY
			if (eraser){
				context.clearRect(x-5, y-5, 10,10)
			}else{
				drawCircle(x,y,1)
				lastPoint = {'x':x,'y':y}
			}
		}
		canvas.ontouchmove = function (e) {
			var x = e.touches[0].clientX
			var y =e.touches[0].clientY
			if (drawing){
				if (eraser){
					context.clearRect(x-5, y-5, 10,10)
				}else {
					drawCircle(x,y,1)
					newPoint = {'x':x,'y':y}
					drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
					lastPoint = newPoint
				}
			}
		}
		canvas.ontouchend = function () {
			drawing = false
		}
	}
	
	//画圆
	function drawCircle(x,y,radius){
		context.beginPath()
		context.arc(x,y,radius,0,Math.PI*2)
		context.fill()
	}
	//连线
	function drawLine(x1,y1,x2,y2){
		context.beginPath()
		context.moveTo(x1,y1)
		context.lineWidth = lineWidth
		context.lineTo(x2,y2)
		context.stroke()
		context.closePath()
	}
}

function autoResize(canvas){
	setSize()
	window.onresizing = function(){
		setSize()
	}
	function setSize() {
		var pageWidth = document.documentElement.clientWidth
		var pageHeight = document.documentElement.clientHeight
		canvas.width = pageWidth
		canvas.height = pageHeight
	}
}