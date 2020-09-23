  
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
  points.right = new Point(measurements.headCircumference / 11, 0);
  points.bottom = new Point(0, measurements.headCircumference / 11);
  
  points.rightCp1 = points.right
    .shift(90, points.bottom.dy(points.right)/2);
  points.bottomCp2 = points.bottom
    .shift(0, points.bottom.dx(points.right)/2);
  
// now the tweak to make sure it's exactly the right size for the head 
     let tweak = 1;
  let target = (measurements.headCircumference*.90) /4;
  let delta;
  do {
    points.right = new Point(tweak * (measurements.headCircumference/2) / 11, 0);
    points.bottom = new Point(0, tweak * (measurements.headCircumference/2) / 11);
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
  // The original bib code made a rectangle; now it's a square box
  //here, it's the width addition for both but it's still not in the middle
  let width = measurements.headCircumference * .5
  let length = measurements.headCircumference * .5
  points.topLeft = new Point(width /-2,  points.top.y - (width/2 - points.right.x));
  points.topRight = points.topLeft.shift(0, width);
  points.bottomLeft = points.topLeft.shift(-90, width);
  points.bottomRight = points.topRight.shift(-90, width);
  
  
  // uncomment this path if you want a square around the large circle.
  // paths.rect = new Path() //still a "rect" though now a square
  // // forming the outside box
  //   .move(points.topLeft)
  //   .line(points.bottomLeft)
  //   .line(points.bottomRight)
  //   .line(points.topRight)
  //   .line(points.topLeft)
  //   .close();
  
    // here we place some points at the top of our previous bib rectange (path.rect)
    points.edgeLeft = new Point(points.topLeft.x, points.left.y);
    points.edgeRight = new Point(points.topRight.x, points.right.y);
      points.edgeTop = new Point(0, points.topLeft.y);
    
    //change it to be a bottom point
    points.edgeBottom = new Point(0, points.bottomLeft.y);
    // this top one needs a twin on the bottom
    points.edgeLeftCp1 = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5);
    points.edgeLeftCp2 = points.edgeLeft.shiftFractionTowards(points.topLeft, -0.5);
  
    // these need a flip, too
    points.edgeRightCp1 = points.edgeLeftCp1.flipX();
    points.edgeRightCp2 = points.edgeLeftCp2.flipX();
     
    // and here we need a bottom left and bottom right
    points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(points.topLeft,0.5);
    points.edgeBottomLeftCp = points.edgeBottom.shiftFractionTowards(points.bottomLeft,0.5);
    points.edgeBottomRightCp = points.edgeBottom.shiftFractionTowards(points.bottomLeft,-0.5);
    points.edgeTopRightCp = points.edgeTopLeftCp.flipX();
  
  // here, (as if by magic) we use out new control points to curve our corners!
     paths.seam = new Path()
     .move(points.edgeTop) // the top center point of our square box
     .curve(points.edgeTopLeftCp, points.edgeLeftCp1, points.edgeLeft)
       .curve(points.edgeLeftCp2, points.edgeBottomLeftCp, points.edgeBottom)
        //this is the right side...
     .curve(points.edgeBottomRightCp, points.edgeRightCp2, points.edgeRight)
       // this curves around the right side and closes the circle at the top
     .curve(points.edgeRightCp1, points.edgeTopRightCp, points.edgeTop)
    
     
     /*  //this snippet might come in handy of you want to create paths to make
          //  a seam or overlap in the band/brim of a
     let centerBackSeamR = points.edgeTop.dy(points.top);
     points.cbRight = points.edgeTop.translate(centerBackSeamR/4, centerBackSeamR /2);
     points.cbRightTop = new Point(points.cbRight.x, points.edgeTop.y);
     points.cbRightBottom = new Point(points.cbRight.x, points.top.y);
     */
  
  
  
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
  