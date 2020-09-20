  
export default function(part) {
  let {
    Point,
    points,
    Path,
    paths,
    measurements,
    options
  } = part.shorthand();

// Design pattern here

//points.right = new Point(measurements.headCircumference / 10, 0);
//points.bottom = new Point(0, measurements.headCircumference / 12);

points.right = new Point(measurements.headCircumference / 10, 0);
points.bottom = new Point(0, measurements.headCircumference / 12);


points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2);
points.bottomCp2 = points.bottom
  .shift(0, points.bottom.dx(points.right)/2);

paths.neck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)

  // now the tweak to make sure it's the right size for the head 

  let tweak = 1;
let target = (measurements.headCircumference * 1.1) /4;
let delta;
do {
	// points.right = new Point(tweak * measurements.headCircumference / 10, 0);
  // points.bottom = new Point(0, tweak * measurements.headCircumference / 12);
  //maybe just 11 for both???
  points.right = new Point(tweak * measurements.headCircumference / 11, 0);
  points.bottom = new Point(0, tweak * measurements.headCircumference / 11);
  //make it round!!

	points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2);
	points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2);

 paths.neck = new Path()
   .move(points.right)
   .curve(points.rightCp1, points.bottomCp2, points.bottom);

	delta = paths.neck.length() - target;
  if (delta > 0) tweak = tweak * 0.99;
  else tweak = tweak * 1.02;
} while (Math.abs(delta) > 1);

points.rightCp2 = points.rightCp1.flipY();
points.bottomCp1 = points.bottomCp2.flipX();

points.left = points.right.flipX();
points.leftCp1 = points.rightCp2.flipX();
points.leftCp2 = points.rightCp1.flipX();

points.top = points.bottom.flipY();
points.topCp1 = points.bottomCp2.flipY();
points.topCp2 = points.bottomCp1.flipY();

paths.neck = new Path()
  .move(points.top)
  .curve(points.topCp2, points.leftCp1, points.left)
  .curve(points.leftCp2, points.bottomCp1, points.bottom)
  .curve(points.bottomCp2, points.rightCp1, points.right)
  .curve(points.rightCp2, points.topCp1, points.top)
  .close();

  // now the box and some difference from the other stuff
// the question here is whether to get the length by measuring the distance at the top?
//here, I've just used the width addition for both but it's still not in the middle
let width = measurements.headCircumference * .5
let length = measurements.headCircumference * .5

points.topLeft = new Point(width /-2,  points.top.y - (width/2 - points.right.x));
points.topRight = points.topLeft.shift(0, width);
// points.bottomLeft = points.topLeft.shift(-90, length);
// points.bottomRight = points.topRight.shift(-90, length);
points.bottomLeft = points.topLeft.shift(-90, width);
points.bottomRight = points.topRight.shift(-90, width);

paths.rect = new Path()
  .move(points.topLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.topRight)
  .line(points.topLeft)
  .close();


  





  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part;
}
