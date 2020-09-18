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
    macro,
    measurements
  } = part.shorthand()

  var headCircumference = 48.5
  let w=(((measurements.headCircumference/6) + (6.5*2)))
  , h=w*1.58          //  new height head circm 2 width

//let's get points of our gore starting with bottom right
points.goreBR = new Point(w,h)
points.goreBL = new Point(0,h)
points.goreTC = new Point(w/2,0) 
points.goreLwrLeftCP = new Point(0,h/3) 
points.goreLwrRightCP = new Point(w,h/3)
// paths.lineL = new Path()
// .move(points.goreBR)  
// .line(points.goreBL)
//  ._curve(points.goreLwrLeftCP,points.goreTC)

//  points.goreLwrRightCP = new Point(w,h/3)
//  paths.lineR = new Path()
// .move(points.goreTC)
// .curve_(points.goreLwrRightCP,points.goreBR) 


paths.seam = new Path()
.move(points.goreBR)  
.line(points.goreBL)
 ._curve(points.goreLwrLeftCP,points.goreTC)
 //paths.lineR = new Path()
//.move(points.goreTC)
//.line(points.goreTC)
.curve_(points.goreLwrRightCP,points.goreBR) 
.attr('class', 'fabric')


  // Complete?
  if (complete) {
   
   
   points.logo = new Point(w*.45,h/2)
   snippets.logo = new Snippet('logo', points.logo)
    
   points.text = points.logo
     .shift(-90, w/2)
     .attr('data-text', 'Hat Side')
     .attr('data-text-class', 'center')
     

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
