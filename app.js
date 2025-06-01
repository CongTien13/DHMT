// Main Application
class App {
  constructor() {
    this.canvas = document.getElementById("glcanvas");
    this.renderer = new Renderer(this.canvas);
    this.currentShape = 'cylinder';
    this.angleX = 0;
    this.angleY = 0;
    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;
    
    this.initEventListeners();
    this.render();
  }

  initEventListeners() {
    // Mouse controls for rotation
    this.canvas.addEventListener("mousedown", (e) => {
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.dragging) {
        this.angleY += (e.clientX - this.lastX) * 0.01;
        this.angleX += (e.clientY - this.lastY) * 0.01;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.render();
      }
    });

    // Touch controls for mobile
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.dragging = true;
      this.lastX = touch.clientX;
      this.lastY = touch.clientY;
    });

    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.dragging = false;
    });

    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (this.dragging && e.touches.length === 1) {
        const touch = e.touches[0];
        this.angleY += (touch.clientX - this.lastX) * 0.01;
        this.angleX += (touch.clientY - this.lastY) * 0.01;
        this.lastX = touch.clientX;
        this.lastY = touch.clientY;
        this.render();
      }
    });

    // Window resize
    window.addEventListener("resize", () => {
      this.renderer.handleResize();
      this.render();
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      switch(e.key.toLowerCase()) {
        case '1': this.setShape('cylinder'); break;
        case '2': this.setShape('cone'); break;
        case '3': this.setShape('sphere'); break;
        case '4': this.setShape('ellipsoid'); break;
        case '5': this.setShape('hyperboloid'); break;
        case '6': this.setShape('toroid'); break;
        case 'r': this.resetRotation(); break;
      }
    });
  }

  setShape(shapeName) {
    this.currentShape = shapeName;
    this.render();
  }

  resetRotation() {
    this.angleX = 0;
    this.angleY = 0;
    this.render();
  }

  getShape() {
    switch(this.currentShape) {
      case 'cylinder': return Shapes.createCylinder();
      case 'cone': return Shapes.createCone();
      case 'sphere': return Shapes.createSphere();
      case 'ellipsoid': return Shapes.createEllipsoid();
      case 'hyperboloid': return Shapes.createHyperboloid();
      case 'toroid': return Shapes.createToroid();
      default: return Shapes.createCylinder();
    }
  }

  render() {
    const shape = this.getShape();
    this.renderer.drawShape(shape, this.angleX, this.angleY);
  }

  // Animation loop (optional)
  startAnimation() {
    const animate = () => {
      this.angleY += 0.01;
      this.render();
      requestAnimationFrame(animate);
    };
    animate();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

// Add keyboard shortcuts info
console.log(`
🎮 Keyboard Shortcuts:
1-6: Switch shapes
R: Reset rotation
Mouse: Drag to rotate
`);
