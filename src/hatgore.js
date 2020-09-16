export default function(part) {
  let {
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro
  } = part.shorthand()

  //let w = 500 * options.size // deal with the size thing eventually
  let w=95, h=148   
    //here we have the orig size of our drawing box on paper 95x148 
    // it includes the 1/4 in. seam allowance which we need to deal with
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, h)
  points.bottomRight = new Point(w, h)

//let's get points of our gore starting with bottom right
points.goreBR = new Point(95,148)
points.goreBL = new Point(0,148)
points.goreTC = new Point(47.5,0)  //47.5 is half of width

//here I'm defining a height above
// points.goreLeftLine = new Point(0,-55.5) //discarded this and went for the lower one
 points.goreLwrLeftCP = new Point(0,h/3) 

paths.lineL = new Path()
.move(points.goreBR)  
.line(points.goreBL)
 ._curve(points.goreLwrLeftCP,points.goreTC)

 points.goreLwrRightCP = new Point(w,h/3)
 paths.lineR = new Path()
.move(points.goreTC)
.curve_(points.goreLwrRightCP,points.goreBR) 


 paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
   /*
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
   snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
     .shift(-90, w / 8)
     .attr('data-text', 'hello')
     .attr('data-text-class', 'center')
     */

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
