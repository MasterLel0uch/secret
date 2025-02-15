let highestZ = 1;
class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;
    init(paper) {
        document.addEventListener('mousemove', (e) => {
            if (!this.rotating) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }
            const dirX = e.clientX - this.mouseTouchX;
            const dirY = e.clientY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }
            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        })
        paper.addEventListener('mousedown', (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            if (e.button === 0) {
                this.mouseTouchX = this.mouseX;
                this.mouseTouchY = this.mouseY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            }
            if (e.button === 2) {
                this.rotating = true;
            }
        });
        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            this.rotating = false;
        });
    }
}
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

// Password checking function
function checkPassword() {
    const password = document.getElementById("password-input").value;
    const overlay = document.getElementById("overlay");
    const errorMessage = document.getElementById("error-message");

    if (password === "28052022") {
        // Hide the overlay and blur effect on correct password
        overlay.classList.add("hidden");
    } else {
        // Show the error message on incorrect password
        errorMessage.style.display = "block";
    }
}

// Existing popup logic remains unchanged
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
});

// Hide the popup initially
popup.style.display = "none";
