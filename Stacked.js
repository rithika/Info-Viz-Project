//I had referred to the implementation of stacked charts in d3js.org
d3.cloudshapes = {};

// Declare component: (this outer function acts as the closure):
d3.cloudshapes.stacked = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        gap = 0, Xlabel = 0, Ylabel = 0, grid =0,
        ease = "bounce";
    var svg;


    // Define the 'inner' function: which, through the surreal nature of JavaScript scoping, can access
    // the above variables. 
    function exports(_selection) {
        _selection.each(function(data,i) {
           
		var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "ts_no"; });	//getting the column names for different age groups		   
		
	    // Define x and y scale variables.
// x1 is for mapping states along x axis, y1 is to map the number of people in different age groups along y axis(position encoding)		
            var x1 = d3.scale.ordinal()
                    .domain(data.map(function(d) { return d.ts_no; }))
                    .rangeRoundBands([0, width], 0.1);

            var y1 = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.total; })])
                    .range([height, 0]);
					
			var x= d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.total; })])
                    .range([0,height]);
					
// color encoding for different age groups					 			
			var color = d3.scale.ordinal()
			           .domain(ageNames)
    .range(["#98abc5", "#8a89a6"]);
// defining the x Axis and Y axis
            var xAxis = d3.svg.axis()
			            .scale(x1)
						.orient("bottom");
						
			var yAxis = d3.svg.axis()
			            .scale(y1)
						.orient("left")
						.tickFormat(d3.format(".2s")); // tickformat to mention how the number should look like along the axis,because the numbers are very big in the data
var f = d3.format(".2s");
	    // If no SVG exists, create one - and add key groups:
		if(!svg) {
        svg = d3.select(this)
                    .append("svg")
                    .classed("stacked", true)
					.attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  }

// shifting to the particular x value for each state.	  	  
var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x1(d.ts_no) + ",0)"; });

// drawing rects for each age group for the same state.	  
  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
	  .attr("class", "bar")
      .attr("width", x1.rangeBand())
      .attr("y", function(d) { return y1(d.y1); })
      .attr("height", function(d) { return y1(d.y0)-y1(d.y1); })
	  .attr("fill", function(d) {return color(d.name);});
	  
	  
	  state.selectAll("text")
	  .data(function(d) { return d.total; })
    .enter().append("text")
	  .attr("y", function(d) { return y1(d); })
	  .attr("fill", "black")
	  .text(function (d) { return f(d);});
	  
	  
// drawing gridlines	 
//drawing X axis
var xaxis = svg.append("g")
.attr("class", "axis")
.attr("transform", "translate(0," + height+ ")")
.call(xAxis);

if(Xlabel == 1) {
xaxis.append("text")
.attr("x", width/2)
.attr("dy", 30)
.style("text-anchor", "end")

.text(grid);
 }

// drawing Y axis
var yaxis = svg.append("g")
.attr("class","axis")
.call(yAxis);

//Label for y axis
if(Ylabel == 1) {
yaxis.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 4)
.attr("dy", "0.71em")
.style("text-anchor", "end")
.text("Coverage");
 }
 //drawing the legend,rectangles and text
/*var legend = svg.selectAll("legend")
.data(data)
.enter().append("g")
.attr("class","g")
.attr("transform", "translate(" + width+ ",0)");

legend.selectAll("rect")
.data(function(d) {return d.ages;})
.enter()
.append("rect")
.attr("x",-100)
.attr("y", function(d,i) {return i*15;})
.attr("width", 10)
.attr("height", 10)
.attr("fill",function(d) {return color(d.name);});

legend.selectAll("text")
.data(function(d) {return d.ages;})
.enter()
.append("text")
.attr("x",-80)
.attr("y", function(d,i) {return i*15+7;})
.text(function(d) {return d.name;});*/
var legend = svg.selectAll(".legend")
      .data(color)
    .enter().append("g")
      .attr("class", "legend")
      //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("y", height+20)
      .attr("width", 18)
      .attr("height", 8)
      .style("fill", color(0));

      legend.append("rect")
      .attr("y", height+20)
      .attr("x",100)
      .attr("width", 18)
      .attr("height", 8)
      .style("fill", color(1));

  legend.append("text")
      .attr("y",height+23)
      .attr("x", 80)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text("not covered");

      legend.append("text")
      .attr("y",height+23)
      .attr("x", 165)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text("covered");


    
        });
    }


    // GETTERS AND SETTERS: 
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        return this;
    };
    exports.Xlabel = function(_x) {
        if (!arguments.length) return Xlabel;
        Xlabel = parseInt(_x);
        return this;
    };
	exports.Ylabel = function(_x) {
        if (!arguments.length) return Ylabel;
        Ylabel = parseInt(_x);
        return this;
    };
	exports.grid = function(_x) {
        if (!arguments.length) return grid;
        grid = _x;
        return this;
    };

    return exports;
};
