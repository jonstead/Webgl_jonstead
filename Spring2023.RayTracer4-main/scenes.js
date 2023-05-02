
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

//--
//Geometries
//-- 

//Sphere defition(s)
let x = 10;
let y = -8;
let sp1 = new Sphere(new Vector3(0, 4*x, y), 50);
let sp2 = new Sphere(new Vector3(4*x, y, y), 50);
let sp3 = new Sphere(new Vector3(-4*x, 0, y), 50);
let sp4 = new Sphere(new Vector3(0, -4*x, y), 50);
let sp5 = new Sphere(new Vector3(0, 0, 3*y), 50);
let sp6 = new Sphere(new Vector3(4*x, 4*x, y), 50);
let sp7 = new Sphere(new Vector3(4*x, -4*x, y), 50);
let sp8 = new Sphere(new Vector3(-4*x, 4*x, y), 50);
let sp9 = new Sphere(new Vector3(-4*x, -4*x, y), 50);
let s = new Sphere(new Vector3(0, 20, 0), 50);
let s2 = new Sphere(new Vector3(0, -60, 0), 40);

//Mesh definition(s)
let mesh = Mesh.fromOBJ(objString);
let planeMesh = Mesh.fromOBJ(planeString);
let planeMesh2 = Mesh.fromOBJ(planeString2);

//--
//Camera defition(s)
//--
let orthographicCamera = new Camera(
  new Vector3(0, 0, 51),
  Vector3.forward,
  Vector3.up,
  Camera.Orthographic
)

let perspectiveCamera = new Camera(
  new Vector3(0, 0, 100),
  new Vector3(0, 0, -1),
  Vector3.up,
  Camera.Perspective,
  Math.PI / 4
)

//--
//Shader definition(s)
//-
let z = 1.8;
let shader = new DiffuseShader({ r: 255, g: 255, b: 255 });
let shader2 = new DiffuseShader({ r: 0, g: 255, b: 0 });
let shader3 = new DiffuseShader({ r: 200, g: 180, b: 60 });
let shader4 = new DiffuseShader({ r: 63, g: 255, b: 0 });
let shader5 = new DiffuseShader({ r: 150, g: 222, b: 209 });
let ambientShader = new AmbientShader({ r: 100, g: 100, b: 100 })
let mixed = new MixShader(shader2, ambientShader, .9)
let mixed3 = new MixShader(shader3, ambientShader, z)
let mixed4 = new MixShader(shader4, ambientShader, z)
let mixed5 = new MixShader(shader5, ambientShader, z)
let volumeShader = new VolumeShader();

//--
//RayTracedObject definition(s)
//--
let rayTracedSphere1 = new RayTracedObject(s, shader);
let rayTracedSphere1a = new RayTracedObject(sp1, mixed3);
let rayTracedSphere1b = new RayTracedObject(sp2, mixed3);
let rayTracedSphere1c = new RayTracedObject(sp3, mixed3);
let rayTracedSphere1d = new RayTracedObject(sp4, mixed3);
let rayTracedSphere1e = new RayTracedObject(sp5, mixed4);
let rayTracedSphere1f = new RayTracedObject(sp6, mixed5);
let rayTracedSphere1g = new RayTracedObject(sp7, mixed5);
let rayTracedSphere1h = new RayTracedObject(sp8, mixed5);
let rayTracedSphere1i = new RayTracedObject(sp9, mixed5);
let rayTracedSphere2 = new RayTracedObject(s2, mixed);
let rayTracedTriangle = new RayTracedObject(mesh, shader);
let rayTracedPlane = new RayTracedObject(planeMesh, volumeShader);
let rayTracedPlane2 = new RayTracedObject(planeMesh2, volumeShader);

//--
//Lights
//

let sunLight = new SunLight(Vector3.one, new Vector3(0, -1, 0));
let sunLight2 = new SunLight(Vector3.one, new Vector3(1, -1, 1))
let lights = [sunLight];
let lights2 = [sunLight2]
let dual = [sunLight, sunLight2]

//--
//Scene definition(s)
//--
let twoSphereSceneOrthographic = new Scene([rayTracedSphere1, rayTracedSphere2], orthographicCamera, lights)
let cloverSceneOrthographic = new Scene([rayTracedSphere1a, rayTracedSphere1b, rayTracedSphere1c, rayTracedSphere1d, rayTracedSphere1e, rayTracedSphere1f, rayTracedSphere1g, rayTracedSphere1h, rayTracedSphere1i], orthographicCamera, lights)
let twoSphereDualOrthographic = new Scene([rayTracedSphere1, rayTracedSphere2], orthographicCamera, dual)
let oneSphereSceneOrthographic = new Scene([rayTracedSphere1], orthographicCamera, lights)
let triangleSceneOrthographic = new Scene([rayTracedTriangle], orthographicCamera, lights);

let twoSphereScenePerspective = new Scene([rayTracedSphere1, rayTracedSphere2], perspectiveCamera, lights)
let twoSphereDualPerspective = new Scene([rayTracedSphere1, rayTracedSphere2], perspectiveCamera, dual)
let oneSphereScenePerspective = new Scene([rayTracedSphere1], perspectiveCamera, lights)
let triangleScenePerspective = new Scene([rayTracedTriangle], perspectiveCamera, lights);
let planeScenePerspective = new Scene([rayTracedPlane2, rayTracedSphere1, rayTracedSphere2], perspectiveCamera, dual);
let cloverSceneDualPerspective = new Scene([rayTracedPlane2, rayTracedSphere1a, rayTracedSphere1b, rayTracedSphere1c, rayTracedSphere1d, rayTracedSphere1e, rayTracedSphere1f, rayTracedSphere1g, rayTracedSphere1h, rayTracedSphere1i], perspectiveCamera, dual)

//--
//Final scene definition.
//This is the scene that gets rendered
//--
Scene.scene = cloverSceneDualPerspective;