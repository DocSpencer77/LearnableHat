export default function (part) {
    let {
      Point,
      points,
      Path,
      paths,
      measurements,
      options,
      complete,
      sa,
      paperless,
      macro,
      snippets,
      Snippet // added snippets because of adding the logo
    } = part.shorthand()
  
      // the dimensions of them main hat piece are the width = to the headCircumference measurement + 2x the sa
      // and 2x the height of the hat plus double the amount of the turned up brim plus 2x the sa
      sa = 15
      let 
        // w=560  // better to pick up the measurements below rather than hard code height and width
        // , h=173*2 
        w=(measurements.headCircumference)   // headCircumference measurement  ... the sa added automagically
        , h=(measurements.headCircumference/3.17)*2   //equal to diameter * 2
        
      points.topLeft = new Point(0,0)
      points.topRight = new Point(w,0)
      points.bottomLeft = new Point(0,h) 
      points.bottomRight = new Point(w,h)
    
      paths.seam = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
         .close()
        .attr('class', 'fabric')
        // the above is the boiler plate "seam" path.  By virtue of the code below, it will draw an "offset"
        // seam allowance line

//---------------------------------------------------------------------------------------------------------------
//  points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
//     snippets.logo = new Snippet('logo', points.logo)
//    points.text = points.logo
//     .shift(-90, w / 8)
//     .attr('data-text', 'points.logo')
//     .attr('data-text-class', 'center') 

//Complete?  // the pattern is "Complete" by default... I think
if (complete) {
  points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  snippets.logo = new Snippet('logo', points.logo)
  points.text = points.logo
    //.shift(-90, w / 8)
    .shift(-90, 50)
    .attr('data-text', 'Hat Side')
    .attr('data-text-class', 'center')

    //this is what draws the seam allowance around your pattern piece.
    // if you don't want a seam allowance or the edge is on the fold,
    // you will not want the path on that edge to be called "seam"
  if (sa) {
    paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }
}

// // Paperless?
// if (paperless) {
//   macro('hd', {
//     from: points.bottomLeft,
//     to: points.bottomRight,
//     y: points.bottomLeft.y + sa + 15
//   })
//   macro('vd', {
//     from: points.bottomRight,
//     to: points.topRight,
//     x: points.topRight.x + sa + 15
//  })
//}

return part
}
