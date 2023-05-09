
//A simple obj string to parse
let objString = `
v 0.000000 0.000000 0.000000
v 1.000000 0.000000 0.000000
v 0.000000 1.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 0.0000 1.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString = `
v 0.000000 0.000000 0.100000
v 1.000000 0.000000 0.100000
v 0.000000 -1.000000 0.10000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString2 = `
v 0.000000 49.100000 0.000000
v 1.000000 49.100000 0.000000
v 0.000000 48.900000 -1.00000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString3 = `
v 0.000000 90.100000 0.000000
v 1.000000 90.100000 0.000000
v 0.000000 89.900000 -1.00000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString4 = `
v 0 0 900.100000 
v 1 0 900.100000 
v 0 -1 890.900000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString5 = `
v -900.100000 0 0.000000
v -900.100000 1 0.000000
v -890.900000 0 -1.00000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`



//--
//Geometries
//-- 

//Sphere defition(s)
let x = 12;
let y = -8;
let sz = 20;
let sp1 = new Sphere(new Vector3(0, 4*x, y), sz);
let sp2 = new Sphere(new Vector3(4*x, 0, y), sz);
let sp3 = new Sphere(new Vector3(-4*x, 0, y), sz);
let sp4 = new Sphere(new Vector3(0, -4*x, y), sz);
let sp5a = new Sphere(new Vector3(0, 0, 3*y), sz);
let sp5b = new Sphere(new Vector3(2*x, 2*x, 3*y), sz/2);
let sp5c = new Sphere(new Vector3(-2*x, 2*x, 3*y), sz/2);
let sp5d = new Sphere(new Vector3(2*x, -2*x, 3*y), sz/2);
let sp5e = new Sphere(new Vector3(-2*x, -2*x, 3*y), sz/2);
let sp6 = new Sphere(new Vector3(4*x, 4*x, y), sz);
let sp7 = new Sphere(new Vector3(4*x, -4*x, y), sz);
let sp8 = new Sphere(new Vector3(-4*x, 4*x, y), sz);
let sp9 = new Sphere(new Vector3(-4*x, -4*x, y), sz);

let sphere1 = new Sphere(new Vector3(0, 20, 0), 50);
let sphere2 = new Sphere(new Vector3(0, -60, 0), 40);

let sphere3 = new Sphere(new Vector3(40, 40, 0), 40);
let sphere4 = new Sphere(new Vector3(40, -40, 0), 40);
let sphere5 = new Sphere(new Vector3(-40, 40, 0), 40);
let sphere6 = new Sphere(new Vector3(-40, -40, 0), 40);

//Mesh definition(s)
let mesh = Mesh.fromOBJ(objString);
let planeMesh = Mesh.fromOBJ(planeString);
let planeMesh2 = Mesh.fromOBJ(planeString2);
let planeMesh3 = Mesh.fromOBJ(planeString3);
let planeMesh4 = Mesh.fromOBJ(planeString4);
let planeMesh5 = Mesh.fromOBJ(planeString5);

//--
//Camera defition(s)
//--
let orthographicCamera = new Camera(
  new Vector3(0,0,51), 
  Vector3.forward, 
  Vector3.up, 
  Camera.Orthographic
  )

let perspectiveCamera = new Camera(
  new Vector3(0,0,100), 
  new Vector3(0,0,-1), 
  Vector3.up, 
  Camera.Perspective,
  Math.PI/4
  )

let perspectiveCamera2 = new Camera(
  new Vector3(.1,.1,250), 
  new Vector3(0,0,-1), 
  Vector3.up, 
  Camera.Perspective,
  Math.PI/8
  )

//--
//Shader definition(s)
//-
let diffuseShaderWhite = new DiffuseShader({r:255, g:255, b:255});
let diffuseShaderRed = new DiffuseShader({r:255, g:0, b:0});
let diffuseShaderGreen = new DiffuseShader({r:0, g:255, b:0});
let diffuseShaderBlue = new DiffuseShader({r:0, g:0, b:255});

let ambientShader = new AmbientShader({r:100, g:100, b:100})
let greenAndAmbientMixShader = new MixShader(diffuseShaderGreen, ambientShader, .9)

let volumeShader = new VolumeShader();

let perfectMirrorShader = new MirrorShader();
let semiMirrorShader = new MixShader(diffuseShaderBlue, perfectMirrorShader, .75)

let z = 1.8;
let shader3 = new DiffuseShader({ r: 200, g: 180, b: 60 });
let shader4 = new DiffuseShader({ r: 63, g: 255, b: 0 });
let shader5 = new DiffuseShader({ r: 150, g: 222, b: 209 });
let mixed = new MixShader(diffuseShaderGreen, ambientShader, .9);
let mixed3 = new MixShader(shader3, ambientShader, z);
let mixed4 = new MixShader(shader4, ambientShader, z);
let mixed5 = new MixShader(shader5, ambientShader, z);
let semiMirrorShaderG = new MixShader(diffuseShaderGreen, perfectMirrorShader, .5)
let semiMirrorShader3 = new MixShader(mixed3, perfectMirrorShader, .5)
let semiMirrorShader5 = new MixShader(mixed5, perfectMirrorShader, .5)

//--
//RayTracedObject definition(s)
//--
let rayTracedSphere1 = new RayTracedObject(sphere1, diffuseShaderWhite);
let rayTracedSphere2 = new RayTracedObject(sphere2, greenAndAmbientMixShader);
let rayTracedTriangle = new RayTracedObject(mesh, diffuseShaderWhite);
let rayTracedPlane = new RayTracedObject(planeMesh, volumeShader);
let rayTracedPlane2 = new RayTracedObject(planeMesh2, volumeShader);
let mirrorSphere = new RayTracedObject(sphere1, semiMirrorShader);
let rayTracedSphere1a = new RayTracedObject(sp1, mixed5);
let rayTracedSphere1b = new RayTracedObject(sp2, mixed3);
let rayTracedSphere1c = new RayTracedObject(sp3, mixed3);
let rayTracedSphere1d = new RayTracedObject(sp4, mixed5);
let rayTracedSphere1e1 = new RayTracedObject(sp5a, semiMirrorShaderG);
let rayTracedSphere1e2 = new RayTracedObject(sp5b, semiMirrorShaderG);
let rayTracedSphere1e3 = new RayTracedObject(sp5c, semiMirrorShaderG);
let rayTracedSphere1e4 = new RayTracedObject(sp5d, semiMirrorShaderG);
let rayTracedSphere1e5 = new RayTracedObject(sp5e, semiMirrorShaderG);
let rayTracedSphere1f = new RayTracedObject(sp6, semiMirrorShader3);
let rayTracedSphere1g = new RayTracedObject(sp7, semiMirrorShader5);
let rayTracedSphere1h = new RayTracedObject(sp8, semiMirrorShader5);
let rayTracedSphere1i = new RayTracedObject(sp9, semiMirrorShader3);

let rayTracedSphere1a2 = new RayTracedObject(sp1, mixed5);
let rayTracedSphere1b2 = new RayTracedObject(sp2, semiMirrorShader5);
let rayTracedSphere1c2 = new RayTracedObject(sp3, semiMirrorShader5);
let rayTracedSphere1d2 = new RayTracedObject(sp4, mixed5);
let rayTracedSphere1f2 = new RayTracedObject(sp6, semiMirrorShader3);
let rayTracedSphere1g2 = new RayTracedObject(sp7, mixed3);
let rayTracedSphere1h2 = new RayTracedObject(sp8, mixed3);
let rayTracedSphere1i2 = new RayTracedObject(sp9, semiMirrorShader3);
//--
//Lights
//

let sunLight = new SunLight(Vector3.one, new Vector3(0,-1,0));
let sunLight2 = new SunLight(Vector3.one, new Vector3(1,-1,1))
let lights = [sunLight];
let lights2 = [sunLight2]
let dual = [sunLight, sunLight2]

//--
//Scene definition(s)
//--
let twoSphereSceneOrthographic = new Scene([rayTracedSphere1, rayTracedSphere2], orthographicCamera, lights)
let twoSphereDualOrthographic = new Scene([rayTracedSphere1,  rayTracedSphere2], orthographicCamera, dual)
let oneSphereSceneOrthographic = new Scene([rayTracedSphere1],  orthographicCamera,lights )
let triangleSceneOrthographic = new Scene([rayTracedTriangle], orthographicCamera, lights);

let twoSphereScenePerspective = new Scene([rayTracedSphere1,  rayTracedSphere2], perspectiveCamera, lights)
let twoSphereDualPerspective = new Scene([rayTracedSphere1,  rayTracedSphere2], perspectiveCamera, dual)
let oneSphereScenePerspective = new Scene([rayTracedSphere1],  perspectiveCamera, lights)
let triangleScenePerspective = new Scene([rayTracedTriangle], perspectiveCamera, lights);
let planeScenePerspective = new Scene([
  rayTracedPlane2, 
  new RayTracedObject(sphere1, new MixShader(diffuseShaderBlue, perfectMirrorShader, .25)), 
  new RayTracedObject(sphere2, new MixShader(diffuseShaderBlue, perfectMirrorShader, .25))], 
  perspectiveCamera, 
  dual);
  let cloverSceneDualPerspective = new Scene([new RayTracedObject(planeMesh3, new VolumeShader()), rayTracedSphere1a, rayTracedSphere1b, rayTracedSphere1c, rayTracedSphere1d,
    rayTracedSphere1e1, rayTracedSphere1e2, rayTracedSphere1e3, rayTracedSphere1e4, rayTracedSphere1e5,
    rayTracedSphere1f, rayTracedSphere1g, rayTracedSphere1h, rayTracedSphere1i], perspectiveCamera, dual);
  let cloverSceneDualPerspective2 = new Scene([new RayTracedObject(planeMesh3, new VolumeShader()), rayTracedSphere1a2, rayTracedSphere1b2, rayTracedSphere1c2, rayTracedSphere1d2,
      rayTracedSphere1e1, rayTracedSphere1e2, rayTracedSphere1e3, rayTracedSphere1e4, rayTracedSphere1e5,
      rayTracedSphere1f2, rayTracedSphere1g2, rayTracedSphere1h2, rayTracedSphere1i2], perspectiveCamera, dual);

let mirroredPlanes = new Scene([
  new RayTracedObject(planeMesh3, new VolumeShader()), 
  // new RayTracedObject(planeMesh4, new MixShader(diffuseShaderRed, perfectMirrorShader, .15)), 
  // new RayTracedObject(planeMesh5, new MixShader(diffuseShaderRed, perfectMirrorShader, .15)), 
  new RayTracedObject(sphere3, diffuseShaderGreen), 
  new RayTracedObject(sphere4, new MixShader(diffuseShaderGreen, perfectMirrorShader, .15)), 
  new RayTracedObject(sphere5, new MixShader(diffuseShaderBlue, perfectMirrorShader, .15)), 
  new RayTracedObject(sphere6, diffuseShaderBlue)] ,
  perspectiveCamera2, 
  dual);


//let sceneIndex = 0;
if(!sceneIndex) sceneIndex = 0;
let allScenes = [
  twoSphereSceneOrthographic,
  twoSphereDualOrthographic,
  oneSphereSceneOrthographic,
  // triangleSceneOrthographic,
  twoSphereScenePerspective,
  twoSphereDualPerspective,
  oneSphereScenePerspective,
  // triangleScenePerspective,
  planeScenePerspective,
  mirroredPlanes,
  cloverSceneDualPerspective,
  cloverSceneDualPerspective2
]

//--
//Final scene definition.
//This is the scene that gets rendered
//--
Scene.scene = allScenes[sceneIndex];