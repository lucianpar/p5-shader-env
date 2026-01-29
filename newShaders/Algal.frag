#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform float u_time;
uniform float onset;
uniform float cent;
uniform float flux;

const float TRACK_LENGTH = 204.0;  // updated to 204 seconds

#define TWO_PI 6.283

// ---------------------
// Hash & Noise
// ---------------------
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i=0; i<5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 fragUV = uv * 2.0 - 1.0;

    float t = u_time * 0.1;

    float k = cos(t);
    float l = sin(t);
    float s = 0.2 + (onset / 10.0);

    for (int i = 0; i < 64; ++i) {
        fragUV = abs(fragUV) - s;
        fragUV = mat2(k, -l, l, k) * fragUV;
        s *= 0.95156;
    }

    float intensity = 0.5 + 0.5 * cos(TWO_PI * (40.0 * length(fragUV)));

    vec3 color = vec3(0.5 + 0.5 * cos(TWO_PI * (40.0 * length(fragUV)) * vec3(-1.0, 2.0, 3.0 + flux)));

    gl_FragColor = vec4(color, 1.0);
}