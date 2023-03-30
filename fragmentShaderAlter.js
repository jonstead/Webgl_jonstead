fsSource = `
// Starts with Spiked Vertex Shader and adds in various parts
// from other examples for a more interesting appearence
// Plus messing around with 'random' colors
precision highp float;

varying vec3 vNormal;

uniform vec3 color;

uniform vec3 ambientColor;

varying vec3 vPosition;

uniform float time;

//uv that we will receive from the vertex shader
varying vec2 vUv;

void main() {
    float lightStrength = dot(normalize(vec3(sin(time), 1.5, 0) - vPosition), vNormal);
    // gl_FragColor = vec4( (color ) * lightStrength + ambientColor, 1.0 ); // Default

    // My random color experiment
    // float a = 0.01;
    // float b = 0.02;
    // float c = 0.05;
        
    // for(float i = 0.0; i <= 10.0; i++)
    // {
    //     a += fract(sin(a)*1.0); // Function from https://thebookofshaders.com/10/
    //     b += fract(sin(b)*1.0);
    //     c += fract(sin(c)*1.0);
    //     if(a >= 1.0)
    //     {
    //         a = .01;
    //     }
    //     if(b >= 1.0)
    //     {
    //         b = .01;
    //     }
    //     if(c >= 1.0)
    //     {
    //         c = .01;
    //     }
    //     gl_FragColor = vec4( a, b, c, 1.0 );
    // }

    gl_FragColor = vec4( vec3(vUv, 0), 1.0 ); //From Shader with UVs

    // gl_FragColor = vec4( (sin(time)*color + vec3(sin(vUv.x * 1000.0), sin(vUv.y*500.0),0.0 ))* lightStrength + ambientColor, 1.0 ); //Checkerboard color
}
  `;