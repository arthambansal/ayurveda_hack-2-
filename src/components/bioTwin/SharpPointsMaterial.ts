import * as THREE from 'three';

export const SharpPointsMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
uniforms: {
  color: { value: new THREE.Color('#bfa28a') },
  opacity: { value: 0.6 },
  size: { value: 4.5 },
  time: { value: 0 },          // 👈 ADD
  pulseStrength: { value: 0 }, // 👈 ADD (0 = off)
},

  vertexShader: `
uniform float size;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // normal in view space
  vNormal = normalize(normalMatrix * normal);

  // direction from point to camera
  vViewDir = normalize(-mvPosition.xyz);

  gl_PointSize = size;
  gl_Position = projectionMatrix * mvPosition;
}

  `,
  fragmentShader: `
uniform vec3 color;
uniform float opacity;
uniform float time;
uniform float pulseStrength;

void main() {
  // circular point
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);
  if (d > 0.5) discard;

  // pulse only if enabled
  float pulse = 1.0;
  if (pulseStrength > 0.0) {
float rawPulse = sin(time * 2.2);
pulse = 0.6 + 0.4 * pow(abs(rawPulse), 1.2);
}

float core = smoothstep(0.5, 0.35, d);
float halo = smoothstep(0.5, 0.1, d) * 0.35 * pulse;
float alpha = core + halo;

vec3 criticalRed = vec3(1.0, 0.15, 0.15);
float colorPulse = smoothstep(0.2, 1.0, pulse);
vec3 pulsedColor = mix(color, criticalRed, colorPulse);
gl_FragColor = vec4(
  pulsedColor * (1.0 + pulse * 0.4),
  alpha * opacity
);
}

  `,
});
