
attribute vec3 aPosition;
varying vec2 uv;

void main() {
  uv = aPosition.xy;

  vec4 pos = vec4(aPosition, 1.0);
  gl_Position = pos;
}