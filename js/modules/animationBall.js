define(function (require) {

    var canvas = document.querySelector('canvas');
    canvas.width = 1500;
    canvas.height = 800;
    var ctx = canvas.getContext('2d');



    function randomColor() {
        var six = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += six[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function ball() {
        this.x = Math.floor(Math.random() * canvas.width * 0.8); //x轴出现的随机位置
        this.y = Math.floor(Math.random() * (canvas.height * 0.8)); //y轴出现的随机位置
        this.r = Math.floor(Math.random() * 10) + 1; //随机半径（大小）
        this.vx = Math.floor(Math.random() * 2) - 0.5; //x轴添加/偏移值
        this.vy = Math.floor(Math.random() * 2) - 0.5; //y轴添加/偏移值
        this.c = 'pink';
    }


    ball.prototype.draw = function () {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }

    var balls = [];

    for (i = 0; i < 100; i++) {
        balls.push(new ball());
    }

    function go() {
        ctx.fillStyle = 'rgba(255,255,255,1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;

            if (balls[i].y >= canvas.height - balls[i].r) {
                balls[i].vy = balls[i].vy * -1;
            }
            if (balls[i].y <= 0) {
                balls[i].vy = balls[i].vy * -1;
            }

            if (balls[i].x >= canvas.width - balls[i].r) {
                balls[i].vx = balls[i].vx * -1;
            }
            if (balls[i].x <= 0) {
                balls[i].vx = balls[i].vx * -1;
            }

            var nowX = balls[i].x;
            var nowY = balls[i].y;
            for (var j = 0; j < balls.length; j++) {
                var w = Math.abs(nowX - balls[j].x);
                var h = Math.abs(nowY - balls[j].y);
                if (Math.sqrt(w * w + h * h) < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'pink';
                    ctx.moveTo(nowX, nowY);
                    ctx.lineTo(balls[j].x, balls[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        requestAnimationFrame(go)
    }


    go();


});