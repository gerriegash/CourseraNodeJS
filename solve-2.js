/**
 * Created by Gerry Hanjra on 6/25/2017.
 */
var rect = require('./rectangle-2.js');
var args = require('yargs').usage('Usage: node @0 --l=[num] --b=[num]').demand(['l','b']).argv;
function solveRect(l,b){
    rect(l,b,function(error,rectangle){
        if(error){
            console.log(error);
        }else{
            console.log("computing rectangle for " + l  +" and " + b + ". ");
            console.log("Perimeter for rectangle is " + rectangle.perimeter() + ". ");
            console.log("Area for rectangle is " + rectangle.area() + ". ");
        }
    })
}

solveRect(args.l,args.b);
solveRect(-4,-3);
