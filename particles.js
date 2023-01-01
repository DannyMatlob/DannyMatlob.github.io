window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const metaballSize = 30;
    canvas.width=window.innerWidth - 10;
    canvas.height=window.innerHeight - 10;

    function drawCircle(x, y, radius) {
        ctx.fillStyle = '#0a4957';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    class Particle {
        constructor(effect) {
            this.effect = effect;
            //Position and Size
            this.x = Math.random() * effect.width;
            this.y = effect.height;
            this.size = Math.random() * metaballSize + metaballSize/2;

            //Velocity
            this.vx = 0;
            this.originalVY = Math.random() * -2 - 0.5
            this.vy = this.originalVY;

            //Mouse interactivity
            this.dx = 0;
            this.dy = 0;
            this.force = 0;
            this.angle = 0;
        }
        draw(context) {
            drawCircle(this.x, this.y, this.size);
        }
        update() {
            //Blobs move away from the mouse
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx**2 + this.dy**2;
            this.force = (-this.effect.mouse.radius / this.distance) * 0.5;
            if (this.force < 0.2) {
                this.force = -0.2;
            }
            
            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy,this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            //Redraw at the bottom when blob hits the top
            if (this.y + this.size < 0) {
                this.y = effect.height + this.size + 20;
                this.x = Math.random() * effect.width;
                this.size = Math.random()* metaballSize + metaballSize/2;
                this.vy = Math.random() * -2 - 0.5;
            }

            this.vx = this.vx * 0.98;
            if (this.vy>this.originalVY) {
                this.vy-=0.1;
            }

            if (this.x < 0) {this.x = this.effect.width;}
            if (this.x > this.effect.width) {this.x = 0;}

            //Change position of blobs
            this.x +=this.vx;
            this.y +=this.vy;
        }
    }
    class Effect {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particleArray = [];
            this.mouse = {
                radius: 200000,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
        }
        init(context) {
            console.log("initializing");
            for (let i = 0; i<2000; i++) {
                this.particleArray.push(new Particle(this));
            }
        }
        draw(context) {
            this.particleArray.forEach(particle => particle.draw(context))
        }
        update() {
            this.particleArray.forEach(particle => {
                particle.update();
            });
        }
    }
    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);

    window.addEventListener('resize', function() {
        canvas.width=window.innerWidth - 10;
        canvas.height=window.innerHeight - 10;
        effect.width = canvas.width;
        effect.height = canvas.height;
    });

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();
});