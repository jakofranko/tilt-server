const height = 600;
const width = 800;
const margin = ({
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
});

function getSvg(tiltData) {
    console.log(tiltData);
    const x = d3.scaleTime()
        .domain(d3.extent(tiltData, d => new Date(d.timestamp)))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain(d3.extent(tiltData, d => d.sg)).nice()
        .range([height - margin.bottom, margin.top]);

    const max = d3.max(tiltData, d => Math.abs(d.temp));
    const min = d3.min(tiltData, d => Math.abs(d.temp));
    console.log(max, min);
    const tempColor = d3.scaleSequential(d3.interpolateRdBu).domain([max, min]);
    console.log(tempColor(max), tempColor(min));

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove());

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "+"))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
            .filter(d => d === 0)
            .clone()
            .attr("x2", width - margin.right - margin.left)
            .attr("stroke", "#ccc"));

    const svg = d3.select("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .call(xAxis);

    // X-axis label
    svg.append("text")
        .attr("transform", `translate(${width / 2},${height + margin.top + 20})`)
        .style("text-anchor", "middle")
        .text("Date");

    svg.append("g")
        .call(yAxis);

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("SG (Gravity)");

    svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
        .selectAll("circle")
        .data(tiltData)
        .join("circle")
        .attr("cx", d => x(new Date(d.timestamp)))
        .attr("cy", d => y(d.sg))
        .attr("fill", d => tempColor(d.temp))
        .attr("r", 2.5);
}
