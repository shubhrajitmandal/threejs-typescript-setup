const fragmentShader: () => string = () => {
  return `
    uniform float time;
    uniform float progress;
    uniform sampler2D texture;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
  
    void main() {
  
      gl_FragColor = vec4(vUv, abs(sin(time)), 1.);
  
    }
  `;
};

export default fragmentShader;
