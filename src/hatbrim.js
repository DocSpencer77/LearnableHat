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
  
    
    
    // 6"x 10 1/4" in mm  152 x 260 mm
    //let w = 152
    //, h = 260, headCircumference = 485,
    
    // let w=(((measurements.headCircumference/6) + (6.5*2)))
    // , h=w*1.58,
    // headCircumference = 485,
    //innerRadius = (headCircumference/2)/3.17
    let innerRadius = (measurements.headCircumference/2)/3.17,
    w = (measurements.headCircumference/6) + (6.5*2), 
     h=w*1.58  
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(w, 0)
    points.bottomLeft = new Point(0, h)
    points.bottomRight = new Point(w, h)
  
    // paths.seam = new Path()  //will have to shift this over to the pattern piece rather than the box!
    //   .move(points.topLeft)
    //   .line(points.bottomLeft)
    //   .line(points.bottomRight)
    //   .line(points.topRight)
    //   .line(points.topLeft)
    //   .close()
    //   .attr('class', 'fabric')

      //let w = 500 * options.size  will have to revisit the sizing
    // size lg hat has 48.5 head circum. measurement
    // rough seam meas of inside brim (1/2) is 242.5 (large) No ease.
    // let's make a dot on the right side/inside of the brim at 3/4 of head meas.
    
    //points.insideBrimCF = new Point(w,(headCircumference *.75)/2)
    points.insideBrimCF = new Point(w,(measurements.headCircumference *.85)/2)
    // and I need a point on the left edge at the center of the "circle" formation
    // that center needs to be a radius distance above my right hand insideBrimCF
    // aside... might want to put 10% into that hat band meas before it's over.
    //   (headCircumference * 1.10)/ 3.17 / 2 = 8.41 cm

    //Then, given our brim width we find the outsideBrimCF at the lower right of our "rectangle" workspace
    points.outsideBrimCF = new Point(points.insideBrimCF.x,(points.insideBrimCF.y)+(measurements.headCircumference*.12))
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
    points.insideBrimQtrCircle = new Point(measurements.headCircumference*.10,points.outsideBrimQtrCircle.y)
     
    //let's give it a whirl with a curve
    //first a path
    /*
    paths.lineL = new Path()
    .move(points.goreBR)  
    .line(points.goreBL)
     ._curve(points.goreLwrLeftCP,points.goreTC)
    */
   
    points.BcpOutsideCurve = new Point(0,(points.insideBrimQtrCircle.y)*2) // I double the y of the inner circle
    points.CcpOutsideCurve = new Point((points.insideBrimQtrCircle.x *.5),points.outsideBrimCF.y)
    paths.lwrOuterrBand = new Path()
    .move(points.outsideBrimQtrCircle)
    .curve(points.BcpOutsideCurve, points.CcpOutsideCurve, points.outsideBrimCF)

     //Subtracting to get the width of the band... .10x head circumference measure
     // that makes it narrower  my band is now 1/10th width of the Head Circumference the
    points.BcpInsideCurve = new Point(points.insideBrimQtrCircle.x,points.insideBrimQtrCircle.y * 1.7)
    points.CcpInsideCurve = new Point(points.insideBrimQtrCircle.x *.88,points.insideBrimCF.y)
    paths.lwrInnerBand = new Path()
    .move(points.insideBrimQtrCircle)
    .curve(points.BcpInsideCurve, points.CcpInsideCurve, points.insideBrimCF)
    
    // at the top, let's connect the center back seam with y=0 and the (x) our circumference * .1q
    points.cbOuterSeam =new Point(measurements.headCircumference * .09,0) // so this will be 4.85*.09 for our inital test
    points.cbInnerSeam =new Point((measurements.headCircumference * .09)*2,0)  // now I need to rotate this 45 degreees
    //let's rotate it around cbOuterSeam
    //points.cbInnerSeamR = new Point(points.cbInnerSeam.rotate(45,points.cbOuterSeam))

    //goofy... I just hard coded these.  Need to get the real
    // names/definitions from aboove
    //set new points moon and sun
        //points.sun = new Point(43.65,0);
    points.cbOuterSeam = new Point(measurements.headCircumference * .09,0)
    points.cbInnerSeam = new Point((measurements.headCircumference * .09)*2,0);
    
    //points.sun = new Point(43.65,0);
    //points.moon = new Point(87.3,0);

    // well, okiedoke... htat works okay
    // points.sun = new Point(headCircumference * .09,0)
    // points.moon = new Point((headCircumference * .09)*2,0);

   
    let angle = -30
    //points.moon = points.moon.rotate(angle, points.sun);
    points.cbInnerSeam = points.cbInnerSeam.rotate(angle, points.cbOuterSeam);
    //points.cbInnerSeam = points.cbInnerSeam.rotate(angle,points.cbOuterSeam);
    
    //okay, I think it's switched over now.
    paths.cbInnerSeam = new Path()
     .move(points.cbOuterSeam)
     .line(points.cbInnerSeam)
     .line(points.insideBrimQtrCircle)
     
    

// kinda nuts... it just doeesn't like my point names.  Moon and Sun are groovy. <shrug>

//another day


    //point.insideBrimQtrCircle  
    //point.cbOuterSeam
    //point.insideBrimQtrCircle  
    
   //paths.toCtrBack = new Path()
   // .move(point.insideBrimQtrCircle)
   // .line(point.cbOuterSeam)
    //.line(point.cbOuterCircle)




    paths.backBrim = new Path()
      .move(points.cbOuterSeam)
      .line(points.outsideBrimQtrCircle)
      //also I need to curve the lines up from the quarterCircle points!

      // let's see if we can do a 45 degree angle from cb outer seam, the width of our brim
      // and then connect wth insideBrimQtrCircle  Maybe?
      //a new point, using a shift from cbOuterSeam

    
      




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
  