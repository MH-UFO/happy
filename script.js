// Falling Hearts Animation
class Heart {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.swing = Math.random() * 0.02 + 0.01;
        this.swingOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * this.swing + this.swingOffset) * 0.5;
        
        if (this.y > this.canvas.height + 20) {
            this.y = -20;
            this.x = Math.random() * this.canvas.width;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff69b4';
        
        const x = this.x;
        const y = this.y;
        const size = this.size;
        
        // Draw heart shape
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
        ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.9, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3);
        ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
        ctx.fill();
        
        ctx.restore();
    }
}

class HeartsAnimation {
    constructor() {
        this.canvas = document.getElementById('heartsCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.hearts = [];
        this.heartCount = 15;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.hearts = [];
        for (let i = 0; i < this.heartCount; i++) {
            this.hearts.push(new Heart(this.canvas));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.hearts.forEach(heart => {
            heart.update();
            heart.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Relationship Timer
class RelationshipTimer {
    constructor() {
        this.startDate = new Date('2025-10-18T00:00:00');
        this.elements = {
            years: document.getElementById('years'),
            months: document.getElementById('months'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        this.updateTimer();
        setInterval(() => this.updateTimer(), 1000);
    }
    
    updateTimer() {
        const now = new Date();
        const diff = now - this.startDate;
        
        if (diff < 0) {
            // If the start date is in the future, show zeros
            Object.values(this.elements).forEach(el => el.textContent = '0');
            return;
        }
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        this.elements.years.textContent = years;
        this.elements.months.textContent = months;
        this.elements.days.textContent = days;
        this.elements.hours.textContent = hours.toString().padStart(2, '0');
        this.elements.minutes.textContent = minutes.toString().padStart(2, '0');
        this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
    }
}

// Love Letter Animation
class LoveLetter {
    constructor() {
        this.envelope = document.getElementById('envelope');
        this.letter = document.getElementById('letter');
        this.isOpen = false;
        
        this.envelope.addEventListener('click', () => this.toggleLetter());
    }
    
    toggleLetter() {
        if (!this.isOpen) {
            this.openLetter();
        } else {
            this.closeLetter();
        }
    }
    
    openLetter() {
        this.envelope.classList.add('opened');
        
        setTimeout(() => {
            this.letter.classList.add('show');
            this.isOpen = true;
        }, 300);
    }
    
    closeLetter() {
        this.letter.classList.remove('show');
        
        setTimeout(() => {
            this.envelope.classList.remove('opened');
            this.isOpen = false;
        }, 500);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeartsAnimation();
    new RelationshipTimer();
    new LoveLetter();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');
    
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Add click effect to timer items
    const timerItems = document.querySelectorAll('.timer-item');
    timerItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });
});