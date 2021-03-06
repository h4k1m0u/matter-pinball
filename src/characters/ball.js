import planck from 'planck-js';
import constants from '../constants';

const { PX2M } = constants;
const SPEED_MAX = 3.0;

class Ball {
  constructor(p, world, x, y) {
    this.p = p;
    this.r = 5;

    // bouncing circle body
    this.body = world.createDynamicBody({
      position: planck.Vec2(PX2M * x, PX2M * y),
      bullet: true,
    });
    this.body.createFixture(
      planck.Circle(PX2M * this.r),
      {
        density: 1.0,
        restitution: 0.1,
        userData: 'ball',
      },
    );
  }

  draw() {
    // convert back from meter to pixels
    const positionMeter = this.body.getPosition();
    const positionPixel = {
      x: (1 / PX2M) * positionMeter.x,
      y: (1 / PX2M) * positionMeter.y,
    };

    // circle at position of body
    this.p.push();
    this.p.fill('#f00');
    this.p.circle(positionPixel.x, positionPixel.y, this.r * 2);
    this.p.pop();
  }

  limitSpeed() {
    // limit ball speed when hitting bumper
    const speedCurrent = this.body.getLinearVelocity();
    const speedClamped = planck.Vec2(
      Math.max(Math.min(speedCurrent.x, SPEED_MAX), -SPEED_MAX),
      Math.max(Math.min(speedCurrent.y, SPEED_MAX), -SPEED_MAX),
    );

    this.body.setLinearVelocity(speedClamped);
  }
}

export default Ball;
