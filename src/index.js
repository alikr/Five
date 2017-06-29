import './style.less';
const tip = document.querySelector('#tip');
const canvas = document.querySelector('#view');
const ctx = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;
const margin = 20;
const size = 16;
const PI_2 = Math.PI * 2;
var square = Math.min(width,height) - margin * 2;
var lineSize = Math.floor(square/size);
var markSize = Math.floor(lineSize / 4);
var markLine = Math.floor(markSize / 2);
const markWidth = 2;
canvas.width = canvas.height = square;
const boundsWH = square - (markSize - markLine - markWidth)*2;
lineSize = Math.floor(boundsWH/size);
markSize = Math.floor(lineSize / 4);
markLine = Math.floor(markSize / 2);
var prevMoveX = markSize;
var prevMoveY = markSize;
canvas.style.cssText = 'margin: '+margin+'px';

var chess = {};
var current = true;//true:黑棋,false:白棋

start();

canvas.addEventListener('click',function(e){
	var x = e.offsetX;
	var y = e.offsetY;
	var col = Math.floor( x / lineSize );
	var row = Math.floor( y / lineSize );
	if(!chess[col + '_' + row]){
		var px = lineSize * col;
		var py = lineSize * row;
		var mx = px + markSize;
		var my = py + markSize;
		var dis = {
			pos:[mx, my],
			col:col,
			row:row,
			type:current?'黑方':'白方',
			color:current?'#000':'#ccc'
		}
		chess[col + '_' + row] = dis;
		markChess(dis);
		checkChess(dis);
		current = !current;
	}
});

canvas.addEventListener('mousemove',function(e){
	var x = e.offsetX;
	var y = e.offsetY;
	var col = Math.floor( x / lineSize );
	var row = Math.floor( y / lineSize );
	var px = lineSize * col;
	var py = lineSize * row;
	if(prevMoveX != px || prevMoveY!=py){
		ctx.clearRect(prevMoveX - markSize - markLine, prevMoveY - markSize - markLine, (markSize + markLine)*2, (markSize+markLine)*2);
		// ctx.clearRect(0,0,square,square);
		drawLine();

		prevMoveX = px + markSize - markWidth/2;
		prevMoveY = py + markSize - markWidth/2;
		markPosition([prevMoveX, prevMoveY]);
		setChess();
	}
});

function checkChess(item){
	var col = item.col;
	var row = item.row;
	var type = item.type;

	//水平方向
	var p1 = checkItem(col, row, type, function(i){
		return [
			(i - 1) + '_' + row,//上一个
			i + '_' + row //当前
		]
	});

	//垂直方向
	var p2 = checkItem(col, row, type, function(i){
		return [
			col + '_' + (i - 1),//上一个
			col + '_' + i //当前
		]
	});

	//左下
	var p3 = checkItem(col, row, type, function(i){
		var temp = col - row;
		return [
			(i - 1 + temp) + '_' + (i - 1),//上一个
			(i + temp) + '_' + (i) //当前
		]
	});

	//右上
	var p4 = checkItem(col, row, type, function(i){
		return [
			(col - i + 1) + '_' + (row + i - 1),//上一个
			(col - i) + '_' + (row + i) //当前
		]
	});
	//右下
	var p5 = checkItem(col, row, type, function(i){
		return [
			(col + i + 1) + '_' + (row - i - 1),//上一个
			(col + i) + '_' + (row - i) //当前
		]
	});
	var result = p1 || p2 || p3 || p4 || p5;
	if(result){
		console.log(result)
		tip.className = 'show';
		tip.innerHTML = result.type+'胜利！';
		setTimeout(function(){
			tip.className = '';
			start();
			current = true;
		},3000);
	}

}

function checkItem(col, row, type, fun){
	var flag = 1;
	var win = [col+'_'+row];
	var i = lineSize;
	while(i--){
		var keys = fun(i);
		var pre_key = keys[0];
		var key = keys[1];
		if(chess[key]==undefined || chess[pre_key]==undefined)continue;
		if(chess[key] && chess[pre_key] && chess[key].type == type && chess[pre_key].type==type){
			win.push(key);
			flag+=1;
		}else{
			flag = 1;
		}
	}
	return flag>=5 ? {win:win,type:type} : false;
}

function start(){
	ctx.clearRect(0,0,square,square);
	chess = {};
	drawLine();
}

function setChess(){
	for(var key in chess){
		markChess(chess[key]);
	}
}

function markChess(item){
	var pos = item.pos;
	ctx.fillStyle = item.color;
	ctx.beginPath();
	ctx.arc(pos[0], pos[1], markSize, 0, PI_2);
	ctx.fill();
}

function drawLine(){
	ctx.setTransform(1,0,0,1,0.5,0.5);
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000';
	ctx.beginPath();
	var len = boundsWH -1;
	for(var i = 0;i < size; i++){
		var x = lineSize * i + markSize;
		ctx.moveTo(x, markSize);
		ctx.lineTo(x, len);
		ctx.moveTo(markSize, x);
		ctx.lineTo(len, x);
	}
	ctx.moveTo(len,  markSize);
	ctx.lineTo(len, len);
	ctx.moveTo(markSize, len);
	ctx.lineTo(len, len);
	ctx.stroke();
}

function markPosition(pos){
	var x = pos[0];
	var y = pos[1];
	markWidth%2==0 && ctx.setTransform(1,0,0,1,0,0);
	x = x%2==0 ? x+1 : x;
	y = y%2==0 ? y+1 : y;

	ctx.lineWidth = markWidth;
	ctx.strokeStyle = '#f00';
	ctx.beginPath();

	//top-left-x
	ctx.moveTo(x - markSize, y - markSize);
	ctx.lineTo(x - markSize + markLine, y - markSize);

	//top-left-y
	ctx.moveTo(x - markSize, y - markSize - markWidth/2);
	ctx.lineTo(x - markSize, y - markSize - markWidth/2 + markLine);

	//top-right-x
	ctx.moveTo(x + markSize, y - markSize);
	ctx.lineTo(x + markSize - markLine, y - markSize);

	//top-right-y
	ctx.moveTo(x + markSize, y - markSize - markWidth/2);
	ctx.lineTo(x + markSize, y - markSize - markWidth/2 + markLine);

	//bottom-right-x
	ctx.moveTo(x + markSize, y + markSize);
	ctx.lineTo(x + markSize - markLine, y + markSize);

	//bottom-right-y
	ctx.moveTo(x + markSize, y + markSize + markWidth/2);
	ctx.lineTo(x + markSize, y + markSize - markWidth/2 - markLine);

	//bottom-left-x
	ctx.moveTo(x - markSize, y + markSize);
	ctx.lineTo(x - markSize + markLine, y + markSize);

	//bottom-left-y
	ctx.moveTo(x - markSize, y + markSize + markWidth/2);
	ctx.lineTo(x - markSize, y + markSize - markLine);

	ctx.stroke();
}