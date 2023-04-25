// let obj = `
// v -1.000000 0.000000 1.000000
// v 1.000000 0.000000 1.000000
// v -1.000000 0.000000 -1.000000
// vt 1.000000 0.000000
// vt 0.000000 1.000000
// vt 0.000000 0.000000
// vn 0.0000 1.0000 0.0000
// f 2/1/1 3/2/1 1/3/1
// `

// let lines = obj.split('\n');

// let vertices = []
// let textures = []
// let normals = []

// for(let line of lines){
//   let trimmedLine = line.trim()
//   if(trimmedLine.length == 0) continue;
//   let parts = line.split(" ")
//   if(parts.trim() == 'v'){
//     //push onto v
//     let v = {x:parseFloat(parts[0]), y:parseFloat(parts[1]), z:parseFloat(parts[2])}
//   }
//   if(parts.trim() == 'vt'){
//     //push onto t
//   }
//   if(parts.trim() == 'vn'){
//     //push onto n
//   }
//   if(parts.trim() == 'v'){
//     //push onto v
//     let first = parts[1]
//     let coords = first.split('/')

//   }

// }



/**
 * Run our ray tracer
 * @param {Number} width The width of the rendederd image
 * @param {Number} height The height of the rendered image
 */
function main() {
  let width = 100;
  let height = 100;
  let image = new Image(width, height);

  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let v3 = new Vector3(1, 2, 3);
  v3.x = 0;
  console.log(v3)
  let v4 = v3.normalize()
  console.log(v4)

  console.log(new Vector3(1, 1, 1).dot(new Vector3(0, 2, 0)))
  console.log(new Vector3(0, 0, 1).cross(new Vector3(1, 0, 0)))

  let sphere = new Sphere(new Vector3(0, 0, 0), 1);
  let rayOrigin = new Vector3(0, 0, 0);
  let rayDirection = new Vector3(-1, 0, 0);
  let collision = sphere.intersect(rayOrigin, rayDirection)
  console.log(collision);

  // let x = 33;
  // let s1 = new Sphere(new Vector3(0, x, 0), 30);
  // let s2 = new Sphere(new Vector3(x, 0, 0), 30);
  // let s3 = new Sphere(new Vector3(-x, 0, 0), 30);
  // let s4 = new Sphere(new Vector3(0, -x, 0), 30);
  // let s5 = new Sphere(new Vector3(0, 0, -10), 20);
  // let s6 = new Sphere(new Vector3(x, x, -20), 20);
  // let s7 = new Sphere(new Vector3(x, -x, -20), 20);
  // let s8 = new Sphere(new Vector3(-x, x, -20), 20);
  // let s9 = new Sphere(new Vector3(-x, -x, -20), 20);
  // let g = 33;
  // let s1 = new Sphere(new Vector3(g/4+5, g/4+5, 5), 30);
  // let s2 = new Sphere(new Vector3(-g, 0, 0), 30);
  // let s3 = new Sphere(new Vector3(-g, -g, 0), 30);
  // let s4 = new Sphere(new Vector3(0, -g, 0), 30);
  // let s5 = new Sphere(new Vector3(0, 0, -10), 40);
  // let spheres = [s1, s2, s3, s4, s5];
  let s1 = new Sphere(new Vector3(0, -20, 0), 15);
  let s2 = new Sphere(new Vector3(0, -8, 1), 10);
  let s3 = new Sphere(new Vector3(0, 0, 0), 10);
  let s4 = new Sphere(new Vector3(10, 0, 0), 10);
  let s5 = new Sphere(new Vector3(-10, 0, 0), 10);
  let s6 = new Sphere(new Vector3(0, 10, 0), 10);
  let s7 = new Sphere(new Vector3(10, 20, 0), 10);
  let s8 = new Sphere(new Vector3(-10, 20, 0), 10);
  let s9 = new Sphere(new Vector3(10, -30, 0), 10);
  let s10 = new Sphere(new Vector3(-10, -30, 0), 10);
  let spheres = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

  //Ray Tracer starts

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x == 50 && y == 50) {
        console.log("stop")
      }

      let rayTracedPixel = new Pixel(200, 180, 60);
      let closestPositiveT = 10000000

      for (let s of spheres) {

        let startX = x - width / 2;
        let startY = y - height / 2;
        let origin = new Vector3(startX, startY, 51);
        let direction = new Vector3(0, 0, -1);
        let collision = s.intersect(origin, direction);


        if (collision && collision.t < closestPositiveT) {
          closestPositiveT = collision.t
          let c = collision.v
          let normal = (c.minus(s.center)).normalize()
          let dot = normal.dot(new Vector3(0, -1, 1).normalize()); // first -1 left 1 Right, second -1 Top 1 Bottom, third -1 back 1 Front
          let aC, bC, cC = 0;
          let color = true;
          if (dot <= 0)
            dot = 0
          if (color == true) {
            if (startX >= 30) {
              aC = 255 * 1.5 * dot;
              bC = 255 * dot;
              cC = 255 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            else if (startX >= 20) {
              aC = 255 * 1.25 * dot;
              bC = 255 * dot;
              cC = 255 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            else if (startX >= 10) {
              aC = 255 * 1.1 * dot;
              bC = 255 * dot;
              cC = 255 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            else if (startX < -30) {
              aC = 255 * dot;
              bC = 255 * 1.5 * dot;
              cC = 255 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            else if (startX < -20) {
              aC = 255 * dot;
              bC = 255 * 1.25 * dot;
              cC = 255 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            else if (startX < -10) {
              aC = 255 * dot;
              bC = 255 * 1.1 * dot;
              cC = 255 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            else {
              aC = 255 * dot;
              bC = 255 * dot;
              cC = 255 * 1.5 * dot;
              rayTracedPixel = new Pixel(aC, bC, cC);
            }
            if (startY >= 30) {
              rayTracedPixel = new Pixel(1.5 * aC, bC, cC);
            }
            else if (startY >= 20) {
              rayTracedPixel = new Pixel(1.25 * aC, bC, cC);
            }
            else if (startY >= 10) {
              rayTracedPixel = new Pixel(1.1 * aC, bC, cC);
            }
            else if (startY < -30) {
              rayTracedPixel = new Pixel(aC, 1.5 * bC, cC);
            }
            else if (startY < -20) {
              rayTracedPixel = new Pixel(aC, 1.25 * bC, cC);
            }
            else if (startY < -10) {
              rayTracedPixel = new Pixel(aC, 1.1 * bC, cC);
            }
            else {
              rayTracedPixel = new Pixel(aC, bC, 1.5 * cC);
            }
          }
          else{
            rayTracedPixel = new Pixel(255 * dot, 255 * dot, 255 * dot);
          }
        }

        image.setPixel(x, y, rayTracedPixel);


        let pixel = image.getPixel(x, y);
        let pixelString = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
        ctx.fillStyle = pixelString;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}
//Run the main ray tracer
main();
