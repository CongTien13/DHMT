// 3D Shape Generators
class Shapes {
  static createSphere(radius = 1, latBands = 30, longBands = 30) {
    const vertices = [], colors = [], indices = [];
    
    for (let lat = 0; lat <= latBands; lat++) {
      const theta = lat * Math.PI / latBands;
      const sinT = Math.sin(theta), cosT = Math.cos(theta);
      
      for (let lon = 0; lon <= longBands; lon++) {
        const phi = lon * 2 * Math.PI / longBands;
        const sinP = Math.sin(phi), cosP = Math.cos(phi);
        const x = cosP * sinT, y = cosT, z = sinP * sinT;
        
        vertices.push(radius * x, radius * y, radius * z);
        colors.push(Math.abs(x), Math.abs(y), Math.abs(z));
      }
    }
    
    for (let lat = 0; lat < latBands; lat++) {
      for (let lon = 0; lon < longBands; lon++) {
        const a = lat * (longBands + 1) + lon;
        const b = a + longBands + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    
    return { vertices, colors, indices };
  }

  static createEllipsoid(scaleX = 1.5, scaleY = 1.0, scaleZ = 0.7) {
    const sphere = this.createSphere();
    
    for (let i = 0; i < sphere.vertices.length; i += 3) {
      sphere.vertices[i + 0] *= scaleX;
      sphere.vertices[i + 1] *= scaleY;
      sphere.vertices[i + 2] *= scaleZ;
    }
    
    return sphere;
  }

  static createHyperboloid(rings = 40, slices = 40) {
    const vertices = [], colors = [], indices = [];
    
    for (let i = 0; i <= rings; i++) {
      const y = -1 + 2 * i / rings;
      const r = Math.sqrt(1 + y * y);
      
      for (let j = 0; j <= slices; j++) {
        const theta = 2 * Math.PI * j / slices;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        
        vertices.push(x, y, z);
        colors.push(Math.abs(x / 2), Math.abs(y / 2), Math.abs(z / 2));
      }
    }
    
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < slices; j++) {
        const a = i * (slices + 1) + j;
        const b = a + slices + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    
    return { vertices, colors, indices };
  }

  static createToroid(R = 1.2, r = 0.4, radial = 40, tubular = 30) {
    const vertices = [], colors = [], indices = [];
    
    for (let i = 0; i <= radial; i++) {
      const theta = i * 2 * Math.PI / radial;
      const cosT = Math.cos(theta), sinT = Math.sin(theta);
      
      for (let j = 0; j <= tubular; j++) {
        const phi = j * 2 * Math.PI / tubular;
        const cosP = Math.cos(phi), sinP = Math.sin(phi);
        const x = (R + r * cosP) * cosT;
        const y = (R + r * cosP) * sinT;
        const z = r * sinP;
        
        vertices.push(x, y, z);
        colors.push(Math.abs(cosT), Math.abs(sinT), Math.abs(sinP));
      }
    }
    
    for (let i = 0; i < radial; i++) {
      for (let j = 0; j < tubular; j++) {
        const a = i * (tubular + 1) + j;
        const b = a + tubular + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    
    return { vertices, colors, indices };
  }

  static createCylinder(height = 2, radius = 1, slices = 40) {
    const vertices = [], colors = [], indices = [];

    // Bottom circle (y = -1)
    const bottomCenterIndex = 0;
    vertices.push(0, -1, 0);
    colors.push(1, 0, 0); // red bottom
    
    for (let i = 0; i <= slices; i++) {
      let theta = 2 * Math.PI * i / slices;
      let x = radius * Math.cos(theta);
      let z = radius * Math.sin(theta);
      vertices.push(x, -1, z);
      colors.push(1, 0, 0); // red bottom
      if (i > 0) {
        indices.push(bottomCenterIndex, i, i + 1);
      }
    }

    const offset = vertices.length / 3;

    // Top circle (y = 1)
    const topCenterIndex = offset;
    vertices.push(0, 1, 0);
    colors.push(0, 1, 0); // green top
    
    for (let i = 0; i <= slices; i++) {
      let theta = 2 * Math.PI * i / slices;
      let x = radius * Math.cos(theta);
      let z = radius * Math.sin(theta);
      vertices.push(x, 1, z);
      colors.push(0, 1, 0); // green top
      if (i > 0) {
        indices.push(topCenterIndex, topCenterIndex + i, topCenterIndex + i + 1);
      }
    }

    const sideOffset = vertices.length / 3;
    // Side
    for (let i = 0; i <= slices; i++) {
      let theta = 2 * Math.PI * i / slices;
      let x = radius * Math.cos(theta);
      let z = radius * Math.sin(theta);
      vertices.push(x, -1, z);
      colors.push(0, 0, 1); // blue side
      vertices.push(x, 1, z);
      colors.push(0, 0, 1); // blue side
      if (i > 0) {
        const idx = sideOffset + (i - 1) * 2;
        indices.push(idx, idx + 1, idx + 2);
        indices.push(idx + 1, idx + 2, idx + 3);
      }
    }

    return { vertices, colors, indices };
  }

  static createCone(height = 2, radius = 1, slices = 40) {
    const vertices = [], colors = [], indices = [];

    // Bottom circle (y = -1)
    const bottomCenterIndex = 0;
    vertices.push(0, -1, 0);
    colors.push(1, 1, 0); // yellow bottom
    
    for (let i = 0; i <= slices; i++) {
      let theta = 2 * Math.PI * i / slices;
      let x = radius * Math.cos(theta);
      let z = radius * Math.sin(theta);
      vertices.push(x, -1, z);
      colors.push(1, 1, 0); // yellow bottom
      if (i > 0) {
        indices.push(bottomCenterIndex, i, i + 1);
      }
    }

    const offset = vertices.length / 3;
    const apexIndex = offset;
    vertices.push(0, 1, 0);
    colors.push(1, 0, 1); // magenta side
    
    for (let i = 0; i <= slices; i++) {
      let theta = 2 * Math.PI * i / slices;
      let x = radius * Math.cos(theta);
      let z = radius * Math.sin(theta);
      vertices.push(x, -1, z);
      colors.push(1, 0, 1); // magenta side
      if (i > 0) {
        indices.push(apexIndex, apexIndex + i, apexIndex + i + 1);
      }
    }

    return { vertices, colors, indices };
  }
}
