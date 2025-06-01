// WebGL Renderer
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = WebGLUtils.initGL(canvas);
    this.program = WebGLUtils.initShaders(this.gl);
    
    this.gl.useProgram(this.program);
    
    // Create buffers
    this.positionBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();
    this.indexBuffer = this.gl.createBuffer();
    
    // Get uniform locations
    this.mvLocation = this.gl.getUniformLocation(this.program, "uModelViewMatrix");
    this.projLocation = this.gl.getUniformLocation(this.program, "uProjectionMatrix");
    
    // Get attribute locations
    this.positionLocation = this.gl.getAttribLocation(this.program, "aPosition");
    this.colorLocation = this.gl.getAttribLocation(this.program, "aColor");
    
    // Enable depth testing
    this.gl.enable(this.gl.DEPTH_TEST);
  }

  clear() {
    this.gl.clearColor(0.95, 0.95, 0.95, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  setupBuffers(shape) {
    // Position buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(shape.vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);

    // Color buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(shape.colors), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.colorLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.colorLocation);

    // Index buffer
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), this.gl.STATIC_DRAW);
  }

  setMatrices(angleX, angleY) {
    const modelViewMatrix = WebGLUtils.getModelViewMatrix(angleX, angleY);
    const projectionMatrix = WebGLUtils.getProjectionMatrix(this.canvas);
    
    this.gl.uniformMatrix4fv(this.mvLocation, false, modelViewMatrix);
    this.gl.uniformMatrix4fv(this.projLocation, false, projectionMatrix);
  }

  drawShape(shape, angleX, angleY) {
    this.clear();
    this.setupBuffers(shape);
    this.setMatrices(angleX, angleY);
    
    this.gl.drawElements(this.gl.TRIANGLES, shape.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
