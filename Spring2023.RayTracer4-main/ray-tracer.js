"use strict"

function evenRand(amount) {
  return (Math.random() * 2 - 1) * amount
}
/**
 * Run our ray tracer
 */
function render(x, y, jitterAmount) {
  //console.log("Going")
  //Grab the width and height from the scene object (if they exist)
  let width = Scene.scene?.options?.width ? Scene.scene.options.width : 400
  let height = Scene.scene?.options?.height ? Scene.scene.options.height : 400

  //Grab the background color from the scene object (if it is defined)
  let backgroundColor = Scene.scene?.options?.backgroundColor ? Scene.scene.options.backgroundColor : new Pixel(100, 100, 100)
  // let image = new Image(width, height);



  //Debug code
  if (x == 226 && y == 166) {
    //console.log("stop")
    let abc = 0;
  }

  //The color of the closest collision for this pixel
  let rayTracedPixel = backgroundColor;

  //The distance to the closest collision for this pixel
  let closestPositiveT = Number.MAX_VALUE

  //Determine the origin and direction of the ray
  let startX = x - width / 2;
  let startY = y - height / 2;
  let origin = Scene.scene.camera.getOrigin(startX, startY);
  let direction = Scene.scene.camera.getDirection(startX / (width / 2), startY / (height / 2));

  let jittered = direction.add(new Vector3(evenRand(jitterAmount), evenRand(jitterAmount), evenRand(jitterAmount))).normalize()

  direction = jittered;
  
  let result = closestCollision(origin, direction, 1);
  if (!result) return rayTracedPixel;
  rayTracedPixel = result.rayTracedObject.shader.illuminateObject(
    origin,
    result.collisionLocation,
    result.normalAtCollision,
    result.rayTracedObject
  )

  return rayTracedPixel;

}

function closestCollision(origin, direction, remaining) {
  if (remaining <= 0) return;
  let closestPositiveT = Number.MAX_VALUE;
  let closestCollision;
  //let backgroundColor = Scene.scene?.options?.backgroundColor ? Scene.scene.options.backgroundColor : new Pixel(100, 100, 100)

  //The color of the closest collision for this pixel
  //let rayTracedPixel = backgroundColor;
  for (let rayTracedObject of Scene.scene.rayTracedObjects) {

    //Get the geometry of the current object
    let geometry = rayTracedObject.geometry

    //Find the intersection with this object
    let collision = geometry.intersect(origin, direction);

    //Check to see if the collision exists...
    //...and if it is closer than any other collision we've seen
    if (collision && collision.timeToCollision < closestPositiveT) {
      //Get the distance to collision
      closestPositiveT = collision.timeToCollision
      collision.rayTracedObject = rayTracedObject;

      closestCollision = collision;

      //Get the location of the collision
      let c = collision.collisionLocation
      let normal = collision.normalAtCollision

      //Use the shader to calculate the color at this collision
      // rayTracedPixel = collision.rayTracedObject.shader.illuminateObject(origin, c, normal, rayTracedObject, remaining - 1)
    }
  }
  return closestCollision;
}


async function main() {

  //Grab the width and height from the scene object (if they exist)
  let width = Scene.scene?.options?.width ? Scene.scene.options.width : 400
  let height = Scene.scene?.options?.height ? Scene.scene.options.height : 400


  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let rayTracedObjects = Scene.scene.rayTracedObjects

  let image = Array.from(Array(width), () => new Array(height))
  let maxIteration = 0;
  let minCount = 1;
  let stop = 10;

  //Ray Tracer starts
  //Loop over all the pixels
  for (let i = 0; i < stop; i++) {
    for (let y = 0; y < height; y++) {
      //setTimeout(() => {
      for (let x = 0; x < width; x++) {
        if (!image[x][y])
          image[x][y] = []
        let entry = image[x][y]
        let count = entry.length
        //Drop out if our color is consistent enough
        if (count > minCount) {
          let z = 1;
        }
        if (x == Math.floor(width / 2) && y == Math.floor(height / 2)) {
          let aa = 1;
        }

        let color = render(x, y, .001);
        count++;
        entry.push(color)

        let r = entry.map(p => p.r).reduce((a, b) => a + b, 0) / count;
        let g = entry.map(p => p.g).reduce((a, b) => a + b, 0) / count;
        let b = entry.map(p => p.b).reduce((a, b) => a + b, 0) / count;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x, y, 1, 1)
      }
      if (i > maxIteration) {
        maxIteration = i
        console.log(maxIteration / stop)
      }
      //})

    }
  }

  ctx.fillStyle = "red";
  ctx.fillRect(width / 2, height / 2, 1, 1);

}

//Run the main ray tracer
main();


