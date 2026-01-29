//used gpt for helping convert my allolib frag setup to work with p5

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform float u_time;
uniform float onset;
uniform float cent;
uniform float flux;

void main() {
  vec2 fragUV = 0.275 * uv;
  float t = (u_time * (0.001 * (flux * 3.0)+(cent/10000.0))+onset);

  float k = cos(t);
  float l = sin(t);
  float s = 0.2 +(onset / (u_time + 0.001));

  for(int i = 0; i < 64; ++i) {
    fragUV = abs(fragUV) - s * flux;
    fragUV = mat2(k, -l, l, k) * fragUV; 
    s *= 0.95156;
  }

  float intensity = 0.5 + 0.5 * cos(6.28318 * (40.0 * length(fragUV)));

  vec3 color = vec3(0.5 + 0.5 * cos(6.28318 * (40.0 * length(fragUV)) * vec3(-1.0, 2.0, 3.0 + flux)));

  gl_FragColor = vec4(color, 1.0);
}