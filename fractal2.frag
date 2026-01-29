
#ifdef GL_ES
precision mediump float;
#endif


varying vec2 uv; //recieve from vert



uniform float u_time;
uniform float onset;
uniform float cent;
uniform float flux;


// *** STARTER CODE INSPIRED BY : https://www.shadertoy.com/view/4lSSRy *** //

void main() {
    vec2 fragUv = uv;
    //float t = (u_time * (0.001*(flux*3 )))+onset; //+ (cent);
    //float t = (u_time * 0.01); //XXX simplify back to whats in shadertoy example
    float t = (u_time * 0.01) + (onset/ 100.0);

    //t += flux;
    //t +=cent;
    float k = cos(t);
    float l = sin(t);
    float s = 0.2+(onset/10.0); //+ (onset / u_time);

    for(int i=0; i<80; ++i) {
        fragUv  = abs(fragUv) - s;//-onset;    // Mirror
        fragUv *= mat2(k+s,-l,l,k); // Rotate
        s  *= .95156;///(t+1);         // Scale
    }

    float x = 0.5 + 0.5*cos(6.28318*(40.0*length(fragUv))) * u_time;

    

    //fragColor =  vec4(vec3(x),1);
     //fragColor =  x* vec4(1,2*flux,3,1);
    //fragColor = vec4(vec3(x), 1);
    vec4 fragColor = 0.5 + 0.5*cos(6.28318*(40.0*length(fragUv))*vec4(-1,2.0+(u_time/500.0),3.0+flux,1)); //u time makes it grainy over time
  
  gl_FragColor = fragColor;

}
 