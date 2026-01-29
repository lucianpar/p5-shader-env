
#ifdef GL_ES
precision mediump float;
#endif



varying vec2 uv;
uniform float u_time;
uniform float onset;
uniform float cent;
uniform float flux;



/* looking at simple math i can integrate:
- https://www.reddit.com/r/math/comments/15stx6b/what_symmetries_if_any_underlie_basic_calculus/
*/

void main() {
    vec2 fragUv = 0.1 * uv;
    float t = (u_time * 0.01) + onset;
    
    float k = cos(t) - (length(fragUv.x/4.0));
    float l = sin(t) + (length(fragUv.y/2.0));
    float s = 0.2+(onset/30.0) / mod(t,20.0); // You need to define s before using it
 
    for(int i=0; i<80; ++i) {
        fragUv = abs(fragUv) - s; // Mirror
        fragUv *= mat2(k+s,-l,l,k); // Rotate
        s *= .95156; // Scale
    }

    fragUv = vec2(
        abs(fragUv.x) - s,
        (fragUv.y > 0.0) ? fragUv.y - s : fragUv.y + s //trying assumetrical logic 
    );

    float x = 0.5 +0.5*cos(t*(40.0*length(fragUv)));

    gl_FragColor = 0.5 + 0.5*cos(6.28318*(300.0*length(fragUv.x))*vec4(3,3,30.0+flux,1.0)); // u time makes it grainy over time
}