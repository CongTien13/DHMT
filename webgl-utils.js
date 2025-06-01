// WebGL Utilities
class WebGLUtils {
  static initGL(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const gl = canvas.getContext("webgl");
    
    if (!gl) {
      throw new Error("WebGL not supported");
    }
    
    return gl;
  }

  static compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }

  static createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return null;
    }
    
    return program;
  }

  static initShaders(gl) {
    const vsSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying vec3 vColor;
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        vColor = aColor;
      }
    `;
    
    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    return this.createProgram(gl, vertexShader, fragmentShader);
  }

  static getModelViewMatrix(angleX, angleY) {
    const mv = mat4.create();
    mat4.translate(mv, mv, [0, 0, -6]);
    mat4.rotateX(mv, mv, angleX);
    mat4.rotateY(mv, mv, angleY);
    return mv;
  }

  static getProjectionMatrix(canvas) {
    const p = mat4.create();
    mat4.perspective(p, Math.PI / 4, canvas.width / canvas.height, 0.1, 100);
    return p;
  }
}
