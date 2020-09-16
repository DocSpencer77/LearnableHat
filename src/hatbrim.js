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
  
    
    
    // 6"x 10 1/4" in mm  152 x 260 mm
    let w = 152, h = 260, headCircumference = 485,
    innerRadius = (headCircumference/2)/3.17
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(w, 0)
    points.bottomLeft = new Point(0, h)
    points.bottomRight = new Point(w, h)
  
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

      //let w = 500 * options.size  will have to revisit the sizing
    // size lg hat has 48.5 head circum. measurement
    // rough seam meas of inside brim (1/2) is 242.5 (large) No ease.
    // let's make a dot on the right side/inside of the brim at 3/4 of head meas.
    
    points.insideBrimCF = new Point(w,(headCircumference *.75)/2)
    // and I need a point on the left edge at the center of the "circle" formation
    // that center needs to be a radius distance above my right hand insideBrimCF
    // aside... might want to put 10% into that hat band meas before it's over.
    //   (headCircumference * 1.10)/ 3.17 / 2 = 8.41 cm

    //Then, given our brim width we find the outsideBrimCF at the lower right of our "rectangle" workspace
    points.outsideBrimCF = new Point(points.insideBrimCF.x,(points.insideBrimCF.y)+(headCircumference*.10))



    // do I want to find the top left point of my brim center back yet?
   
    //points.outsideBrimQtrCircle = new Point(0, ((headCircumference*1.10)/2)/3.17)  //with a 48.5 meas, this will be 8.49 cm
    points.outsideBrimQtrCircle = new Point(0,(innerRadius*1.10))  //with a 48.5 meas, this will be 8.49 cm


    //okay! so now, perhaps I want a curve (or an arc?) from my lower right to my brim width to the right from my left thing
    // or... am I caring about the lower right corner... to then make the curve upt to the mark on the left???

    // figuring out the width of the brim is the big deal... proably based on the head size
    // baby's brim is 45 cm wide (w/out sa)  Shall I make that simply a factor .10 x circuference??
    // sure, baby's brim large would be  4.85 cm   Mine would be not quite 6

    //groovy  So, a point 48.5 sy left anchor level
    //hmmphg 
    //points.insideBrimQtrCircle = new Point(((headCircumference/2)/3.17),points.outsideBrimQtrCircle.y)
    // well, we were using radius, but the thickness is just *.10 of the circumference
    points.insideBrimQtrCircle = new Point(headCircumference*.10,points.outsideBrimQtrCircle.y)
     
    //let's give it a whirl with a curve
    //first a path
    /*
    paths.lineL = new Path()
    .move(points.goreBR)  
    .line(points.goreBL)
     ._curve(points.goreLwrLeftCP,points.goreTC)
    */
   
   points.BcpOutsideCurve = new Point(0,(points.insideBrimQtrCircle.y)*2) // I double the y of the inner circle
   points.CcpOutsideCurve = new Point((points.insideBrimQtrCircle.x * 1.5),points.outsideBrimCF.y)
   paths.lwrOuterrBand = new Path()
     .move(points.outsideBrimQtrCircle)
     .curve(points.BcpOutsideCurve, points.CcpOutsideCurve, points.outsideBrimCF)

     //lemme see about subtracting the width of the band... .10x head meas
     // that makes it narrower  my band is now 1/10th width of the Head Circumference the
    points.BcpInsideCurve = new Point(points.insideBrimQtrCircle.x,points.insideBrimQtrCircle.y * 1.7)
    points.CcpInsideCurve = new Point(points.insideBrimQtrCircle.x * 2,points.insideBrimCF.y)

    //headCircumference/2)/3.17
    //points.insideBrimCF.y

   paths.lwrInnerBand = new Path()
    .move(points.insideBrimQtrCircle)
     //._curve(points.BcpInsideCurve,points.insideBrimCF)
     .curve(points.BcpInsideCurve, points.CcpInsideCurve, points.insideBrimCF)
     //.line(points.insideBrimCF)



  //============================================================================================
    // Complete?
    if (complete) {
     /*   points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
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
  