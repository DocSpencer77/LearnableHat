export default function (part) {
    let {
      Point,
      points,
      Path,
      paths,
      options,
      complete,
      sa,
      paperless,
      macro
    } = part.shorthand()
  
    
      let w = 500 * 1.20
      //let w = 500 * .10
      points.topLeft = new Point(0, 0)
      points.topRight = new Point(w, 0)
      points.bottomLeft = new Point(0, w / 1.5)
      points.bottomRight = new Point(w, w / 1.52)
    
      paths.seam = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .attr('class', 'fabric')
        // the above is the boiler plate "seam" path

//---------------------------------------------------------------------------------------------------------------
/* points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
//    snippets.logo = new Snippet('logo', points.logo)
   points.text = points.logo
    //.shift(-90, w / 8)
    .attr('data-text', 'points.logo')
    .attr('data-text-class', 'center') */

// Complete?
if (complete) {
//   points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
//   snippets.logo = new Snippet('logo', points.logo)
//   points.text = points.logo
//     .shift(-90, w / 8)
//     .attr('data-text', 'hello')
//     .attr('data-text-class', 'center')

  if (sa) {
    paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }
}

// Paperless?
if (paperless) {
  macro('hd', {
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15
  })
  macro('vd', {
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15
  })
}

return part
}
