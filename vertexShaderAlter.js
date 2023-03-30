vsSource = `
// Starts with Spiked Vertex Shader and adds in various parts
// from other examples for a more interesting appearence
uniform mat4 modelViewMatrix;   
uniform mat4 projectionMatrix;  
attribute vec3 position;        
uniform mat4 modelMatrix;       

attribute vec3 normal;

varying vec3 vNormal;
attribute vec2 uv;

varying vec3 vPosition;

uniform float time;
varying vec2 vUv;

void main() {
    vNormal = normalize( vec3( modelMatrix * vec4(normal, 0.0 ) )).xyz;
    
    vUv = uv;

    vec3 vPosition = ( modelMatrix * vec4( position, 1.0 )).xyz;
    //Default 
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vNormal * cos(uv.x*1000.0)*cos(time), 1.0 );

    // Added moving vertices to go back and forth
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vec3(-sin(time), 0.0, 0.0) + vNormal * cos(uv.x*1000.0)*cos(time), 1.0 );
    // Or can use Distorted UV shader version
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vec3(sin(time)*uv.x, 0.0, 0.0) + vNormal * cos(uv.x*1000.0)*cos(time), 1.0 );
    //Just Moveing
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vec3(-sin(time), 0.0, 0.0), 1.0 );
    // And just distortion
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vec3(-sin(time)*uv.x, 0.0, 0.0), 1.0 );
}
`;