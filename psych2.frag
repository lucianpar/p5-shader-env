#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform float u_time;
uniform float onset;
uniform float cent;
uniform float flux;


#define TWO_PI 6.283

// took basics from -> https://www.shadertoy.com/view/MtVyWz

float D = 0.6;

float wave(vec2 p)
{
  float v = sin(p.x + sin(p.y*2.) + sin(p.y * 0.43));
  return v * mod(v,p.x) / p.y;
}

const mat2 rot = mat2(0.5, 0.86, -0.86, 0.5);

float map(vec2 p)
{
  float v = wave(p);
  p.x += u_time * 0.8 ;  p *= rot;  v += wave(p);
  p.x += u_time * 0.1 / p.y;  p *= rot;  v += wave(p) / p.x;
  return abs(1.5 - (v / p.y) + u_time / 10000.0) * v;
}

vec3 Mucous_Membrane(vec2 pos)
{

  pos.y += u_time * 0.2;
  float v = map(pos);
  vec3 c = mix(vec3(0.1 + flux, 0.1 * pos.y, 0.8), vec3(0.3, 0.8 - onset, map(pos * 0.1) * 0.8), v);
  vec3 n = normalize(vec3(v - map(vec2(pos.x + D, pos.y)), v - map(vec2(pos.x, pos.y + D)), -D));
  vec3 l = normalize(vec3(0.1 / pos.x, 0.2, -0.5));
  v = dot(l, n) + pow(dot(l, n), 10.0) ;
  c.g *= v*v;
  c.xy * rot * pos.y;
  return c;
}

//mat2 rot(a, b, c, d);

void main() {

    float k = cos(u_time);
    float l = sin(u_time);
    float s = 0.2; //+ (onset / u_time);

 
  
  vec3 color = Mucous_Membrane((uv*10.0));
  color = color * 0.9 +vec3(0.1);   // desaturate a bit
  gl_FragColor = vec4(color, 1.0);
}