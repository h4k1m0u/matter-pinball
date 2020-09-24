import planck from 'planck-js';
import constants from '../constants';

const { THICKNESS, PX2M } = constants;

class Walls {
  constructor(p, world, canvas) {
    this.p = p;

    // add four wall bodies (reference: center of rectangle)
    const positionTop = planck.Vec2(
      PX2M * (canvas.width / 2),
      PX2M * (THICKNESS / 2),
    );
    this.wallTop = world.createBody({ type: 'static' });
    this.wallTop.createFixture(
      planck.Box(
        PX2M * (canvas.width / 2),
        PX2M * (THICKNESS / 2),
        positionTop,
      ),
      {
        density: 1.0,
        friction: 0.0,
      },
    );

    const positionBottomLeft = planck.Vec2(
      PX2M * (canvas.width / 6 - THICKNESS),
      PX2M * (canvas.height - THICKNESS / 2),
    );
    this.wallBottomLeft = world.createBody({ type: 'static' });
    this.wallBottomLeft.createFixture(
      planck.Box(
        PX2M * (canvas.width / 6 - THICKNESS),
        PX2M * (THICKNESS / 2),
        positionBottomLeft,
      ),
      {
        density: 1.0,
        friction: 0.0,
      },
    );

    const positionBottomRight = planck.Vec2(
      PX2M * ((5 / 6) * canvas.width + THICKNESS),
      PX2M * (canvas.height - THICKNESS / 2),
    );
    this.wallBottomRight = world.createBody({ type: 'static' });
    this.wallBottomRight.createFixture(
      planck.Box(
        PX2M * (canvas.width / 6 - THICKNESS),
        PX2M * (THICKNESS / 2),
        positionBottomRight,
      ),
      {
        density: 1.0,
        friction: 0.0,
      },
    );

    const positionLeft = planck.Vec2(
      PX2M * (THICKNESS / 2),
      PX2M * (canvas.height / 2),
    );
    this.wallLeft = world.createBody({ type: 'static' });
    this.wallLeft.createFixture(
      planck.Box(
        PX2M * (THICKNESS / 2),
        PX2M * (canvas.height / 2),
        positionLeft,
      ),
      {
        density: 1.0,
        friction: 0.0,
      },
    );

    const positionRight = planck.Vec2(
      PX2M * (canvas.width - THICKNESS / 2),
      PX2M * (canvas.height / 2),
    );
    this.wallRight = world.createBody({ type: 'static' });
    this.wallRight.createFixture(
      planck.Box(
        PX2M * (THICKNESS / 2),
        PX2M * (canvas.height / 2),
        positionRight,
      ),
      {
        density: 1.0,
        friction: 0.0,
      },
    );
  }

  draw() {
    // rectangles at positions of physical walls
    [
      this.wallTop,
      this.wallBottomLeft,
      this.wallBottomRight,
      this.wallLeft,
      this.wallRight,
    ].forEach((wall) => {
      const shape = wall.getFixtureList().getShape();
      const vertices = shape.m_vertices;

      // convert back from meter to pixels
      this.p.beginShape();
      this.p.vertex((1 / PX2M) * vertices[0].x, (1 / PX2M) * vertices[0].y);
      this.p.vertex((1 / PX2M) * vertices[1].x, (1 / PX2M) * vertices[1].y);
      this.p.vertex((1 / PX2M) * vertices[2].x, (1 / PX2M) * vertices[2].y);
      this.p.vertex((1 / PX2M) * vertices[3].x, (1 / PX2M) * vertices[3].y);
      this.p.endShape(this.p.CLOSE);
    });
  }
}

export default Walls;
