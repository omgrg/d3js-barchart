import * as d3 from 'd3';

let margin = {top: 50, right: 20, bottom: 100, left: 80};

let height = 400 - margin.top - margin.bottom;
let width = 600 - margin.left - margin.right;

let svg = d3.select('#bar-chart')
    .append('svg')
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr("transform","translate("+margin.left+","+ margin.top+")");


d3.json('data/revenues.json').then(function (data) {

    // Clean data
    data.forEach(function (d) {
        d.revenue = +d.revenue;
    });

    let xScale = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.month;
        }))
        .range([0, width])
        .padding(0.2);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.revenue;
        })]).range([height, 0]);

    let xAxisCall = d3.axisBottom(xScale);

    svg.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisCall);

    let yAxisCall = d3.axisLeft(yScale)
        .tickFormat(function (d) {
            return "$" + d;
        });

    svg.append('g').call(yAxisCall);


    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth)
        .attr('height', function (d) {
            return height - yScale(d.revenue);
        })
        .attr('x', function (d) {
            return xScale(d.month);
        })
        .attr('y', function (d) {
            return yScale(d.revenue);
        })
        .attr('fill', 'grey');
});

// let margin = { left:80, right:20, top:50, bottom:100 };
//
// let width = 600 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;
//
// let g = d3.select("#bar-chart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
//
// // X Label
// g.append("text")
//     .attr("y", height + 50)
//     .attr("x", width / 2)
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .text("Month");
//
// // Y Label
// g.append("text")
//     .attr("y", -60)
//     .attr("x", -(height / 2))
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .text("Revenue");
//
// d3.json("data/revenues.json").then(function(data){
//     // console.log(data);
//
//     // Clean data
//     data.forEach(function(d) {
//         d.revenue = +d.revenue;
//     });
//
//     // X Scale
//     let x = d3.scaleBand()
//         .domain(data.map(function(d){ return d.month }))
//         .range([0, width])
//         .padding(0.2);
//
//     // Y Scale
//     let y = d3.scaleLinear()
//         .domain([0, d3.max(data, function(d) { return d.revenue })])
//         .range([height, 0]);
//
//     // X Axis
//     let xAxisCall = d3.axisBottom(x);
//     g.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height +")")
//         .call(xAxisCall);
//
//     // Y Axis
//     let yAxisCall = d3.axisLeft(y)
//         .tickFormat(function(d){ return "$" + d; });
//     g.append("g")
//         .attr("class", "y axis")
//         .call(yAxisCall);
//
//     // Bars
//     let rects = g.selectAll("rect")
//         .data(data)
//
//     rects.enter()
//         .append("rect")
//         .attr("y", function(d){ return y(d.revenue); })
//         .attr("x", function(d){ return x(d.month) })
//         .attr("height", function(d){ return height - y(d.revenue); })
//         .attr("width", x.bandwidth)
//         .attr("fill", "grey");
// })
