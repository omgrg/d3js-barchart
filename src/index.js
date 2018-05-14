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

svg.append('text')
    .attr('y',height + 50)
    .attr('x',width/2)
    .attr('text-anchor',"middle")
    .text("Month");

svg.append('text')
    .attr('y', -60)
    .attr('x', -(height/2))
    .attr('transform',"rotate(-90)")
    .text("Revenue");


d3.json('data/revenues.json').then(function (data) {

    // Clean data
    data.forEach(function (d) {
        d.revenue = +d.revenue;
    });

    d3.interval(function(){
       update(data);
    },1000);

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

function update(data){

};