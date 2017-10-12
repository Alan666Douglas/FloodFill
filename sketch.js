//sketch.js
//FloodFill

// improvements
/*
  * choose colour that will be replaced
  * auto select fill colour
  * auto fill all areas different colours
  * make into a function so can be called from
    other sketches
  * note: the scanline method was quicker on large areas
*/
const X=0, Y=1
let charSize, ln = 0
let getCol
let col = [50,100,164,255]
// this matrix holds the offset to add to the centre pixel
// to check neighbours
const M = [[-1,-1],[0,-1],[ 1,-1],[ 1,0],
           [ 1, 1],[0, 1],[-1, 1],[-1,0]]

function setup(){

  createCanvas(300,300)
  background(50,50,50)
  stroke(255,255,255)
  strokeWeight(3)
  pattern1() // test pattern

}
function draw(){
// draw required so mouseclick works
 }

function ff(x,y,fcol){
// fill like an amoeba ie grow edges out
  if(!testIfOk(x,y,fcol)) return "Start not valid!"

//stack contains two arrays which will hold current
// edge and new edge. Once looped the new edge
// will be change to current and new cleared.
//This is acheived by swapping the pointers (index)

  let stack = []
  let c = 0, n = 1 // stack pointers (c)urrent & (n)ew
  stack[c] = []    // set up new stacks
  stack[n] = [] 
  stack[c].push([x,y]) // load seed point
  setPix(x,y,fcol)     // and set its colour

  let px, py, ox, oy //temp vars to hold current position and offset position
  while(stack[c].length > 0){
    while(stack[c].length > 0) { 
      ;[px,py] = stack[c].pop()
      for(let mp of M){ // itterate offset matrix
      ox = px+mp[X]
      oy = py+mp[Y]
        if(testIfOk(ox,oy,fcol)){
          setPix(ox,oy,fcol)
          stack[n].push([ox,oy])
        }
      }
    }
    // swap stacks, c becomes n ....
    ;[c,n] = [n,c]
  } return "** Finished ** "
}

//*******************************
function testIfOk(x,y,newC){
// returns true if ok to fill
  let crntPix = getPix(x,y)
  return !(newC.join() == crntPix.join() 
                 || bright(crntPix) > 200
                 || x > width-1  || x < 1
                 || y > height-1 || y < 1)
// shrink canvas check by 1 as strange things happen on the edge of the canvas
}

// convert x,y to index in pixels
function idx(x,y){ // each pixel is 4 elemets rgba
  return (x+y*width)*4
}

function getPix(x,y){
  let i = idx(x,y)
  let pix = [pixels[i],   //r
             pixels[i+1], //g
             pixels[i+2], //b
             pixels[i+3]] //a
  return pix
}

function setPix(x,y,pix){
  let i =idx(x,y)
  pixels[i]   = pix[0]  //r
  pixels[i+1] = pix[1]  //g
  pixels[i+2] = pix[2]  //b
  pixels[i+3] = pix[3]  //a
}

function bright(pix){
// returns the brightness of pixel [r,g,b,a]
  let sum = pix[0]+pix[1]+pix[2]
  return floor(sum/3)
}

function mousePressed(){
  let mx = mouseX
  let my = mouseY
  loadPixels()
  console.log("Mouse ",mx,my)
  console.log(ff(mx,my,col))
  updatePixels()
}

// test Pattern
function pattern1(){
//fill(200,200,50)
  rect(10,10,280,280)
  line(10,10,290,150)
  line(290,10,10,290)
  ellipse(75,95,75)
  line(150,10,150,70)
  line(150,70,200,70)
  line(200,70,200,40)
  line(200,40,160,40)
  line(160,40,160,60)
  rect(20,175,100,100)
  rect(285,150,40,20)
}

