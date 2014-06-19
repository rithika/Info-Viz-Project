//I had referred to the implementation of stacked charts in d3js.org
d3.cloudshapes = {};

// Declare component: (this outer function acts as the closure):
d3.cloudshapes.heat_bcov = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        gap = 0, Xlabel = 0, Ylabel = 0, grid =0,
		colors = ["#15ACF1","#F14431"], 
          days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          suite_no = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
		  
        ease = "bounce";
    var svg;


    // Define the 'inner' function: which, through the surreal nature of JavaScript scoping, can access
    // the above variables. 
    function exports(_selection) {
        _selection.each(function(data,i) {
		
		console.log("entered bcov");
           var column_num = d3.keys(data[0]).filter(function(key) { return key !== "bno"; });	// to get the column names for different age groups
	    var colorScale = d3.scale.ordinal()
              .domain(0,1)
              .range(colors);
        //var num = d3.max(data, function(d) { return d.lno; });
		var x1 = new Array(); 
		for(var l =0; l < 998; l++)
		x1.push(l);
		console.log(x1.length);
		var top1 = margin.top - 60;
          var svg = d3.select("#chart").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 console.log(colorScale(0),colorScale(1));
          var dayLabels = svg.selectAll(".dayLabel")
              .data(x1)
              .enter().append("text")
                .text(function (d,i) { return d; })
                .attr("y", 8)
                .attr("x", function (d, i) { return (i+1) * gridSize; })
				.attr('width', 2)
				//.attr("transform", "rotate(90)")
				.style('writing-mode', 'tb')
				.style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")");
                

          var testSuites = svg.selectAll(".testSuites")
              .data(suite_no)
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("y", function(d, i) { return (i+1) * gridSize+10; })
                .attr("x", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(-12, -6)");
                
				
           var hm0 = svg.selectAll(".hm")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return (d.bno) * gridSize; })
              .attr("y",  function(d) { return (d.ts) * gridSize+10; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", function(d) { if(d.value == 0) {return colorScale(1)} else {return colorScale(0)};}); 
			 
          /*heatMap.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          /*heatMap.append("title").text(function(d) { return d.value; });*/
              
           var legend = svg.selectAll(".legend")
              .data(colorScale)
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", 0)
            .attr("y", 25*gridSize)
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", colorScale(1));
      
      legend.append("rect")
            .attr("x", 20*gridSize)
            .attr("y", 25*gridSize)
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", colorScale(0));

          legend.append("text")
            .attr("class", "mono")
            .text("not covered")
            .attr("x", 2*gridSize)
            .attr("y", 26*gridSize);
      
      legend.append("text")
            .attr("class", "mono")
            .text("covered")
            .attr("x", 22*gridSize)
            .attr("y", 26*gridSize);
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
   

    return exports;
};
