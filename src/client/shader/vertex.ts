const vertexShader: () => string = () => {
  return `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
  
      void main() {
        vUv = uv;
  
        gl_PointSize = 1.;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        
      }
    `;
};

export default vertexShader;
