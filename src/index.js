import * as d3 from 'd3';

let margin = {
    top: 50,
    right: 20,
    bottom: 100,
    left: 80
};

let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

let svg = d3.select('#bar-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

let g = svg
    .append('g')
    .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");


d3.json('data/revenues.json').then(function (data) {
    data.forEach(function (d) {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    let xScale = d3.scaleBand().domain(data.map(function (d) {
        return d.month;
    })).range([0, width]).padding(0.2);

    let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, function (data) {
            return data.revenue;
        })])
        .range([height, 0]);

    let xAxisCall = d3.axisBottom(xScale);

    g.append('g').attr("transform", "translate(0," + height + ")").call(xAxisCall);

    let yAxisCall = d3.axisLeft(yScale).tickFormat(function (d) {
        return "$" + d;
    });

    g.append('g').call(yAxisCall);

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill','grey')
        .attr('width', xScale.bandwidth)
        .attr('height', function (data) {
            return height - yScale(data.revenue)
        })
        .attr('x', function (data) {
            return xScale(data.month)
        })
        .attr('y', function (data) {
            return yScale(data.revenue)
        });


});
