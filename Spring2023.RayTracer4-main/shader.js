class Shader {

}

class DiffuseShader {
  constructor(diffuseColor) {
    this.diffuseColor = diffuseColor;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {

    let lightSum = Vector3.zero;
    for (let light of Scene.scene.lights) {
      let inShadow = false;

      //Manually check for shadows
      for (let object of Scene.scene.rayTracedObjects) {
        if (object == collisionObject) continue
        let directionToLight = light.direction.normalize()

        let collision = object.geometry.intersect(rayCollision, directionToLight)
        if (collision) {
          inShadow = true;
          break;
        }
      }

      let dot = normal.dot(light.direction.normalize());
      if (inShadow) dot = 0;
      if (dot <= 0)
        dot = 0
      lightSum = lightSum.add(new Vector3(this.diffuseColor.r * dot, this.diffuseColor.g * dot, this.diffuseColor.b * dot));
    }

    return { r: lightSum.r, g: lightSum.g, b: lightSum.b };
  }
}

class AmbientShader {
  constructor(ambientColor) {
    this.ambientColor = ambientColor;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {
    return this.ambientColor;
  }

}

class MixShader {
  constructor(one, two, amount) {
    this.one = one;
    this.two = two;
    this.amount = amount;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {
    let tempOne = this.one.illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    let tempTwo = this.two.illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    return {
      r: this.amount * tempOne.r + (1 - this.amount) * tempTwo.r,
      g: this.amount * tempOne.g + (1 - this.amount) * tempTwo.g,
      b: this.amount * tempOne.b + (1 - this.amount) * tempTwo.b
    }
  }

}

class ReflectiveShader {
  illuminateObject(rayFrom, rayCollision, normal, collisionObject) {

    let inShadow = false;

    let original = rayFrom.negate();
    let reflectedRay = original.minus(normal.scale(original.dot(normal) * 2));

    //Manually check for shadows

    for (let object of Scene.scene.rayTracedObjects) {
      if (object == collisionObject) continue

      let collision = object.geometry.intersect(rayCollision, reflectedRay)
      if (collision) {

      }
    }

    let dot = normal.dot(Scene.scene.lights[0].direction.normalize());
    if (inShadow) dot = 0;
    if (dot <= 0)
      dot = 0
    return { r: this.diffuseColor.r * dot, g: this.diffuseColor.g * dot, b: this.diffuseColor.b * dot };
  }
}

class VolumeShader {
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {

    let scale = 10;
    let light = true;
    let x = Math.floor(rayCollision.x/scale);
    let y = Math.floor(rayCollision.y/scale);
    let z = Math.floor(rayCollision.z/scale);
    let sum = x + y + z;
    if (sum % 2 != 0) {
      light = false;
    }
    if (light)
      return { r: 200, g: 200, b: 200 };
    else
      return {r:150,g:150,b:150};
  }
}

