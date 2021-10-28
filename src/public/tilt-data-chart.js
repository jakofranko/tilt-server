const height = 600;
const width = 800;
const margin = ({
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
});

function getSvg(tiltData) {
    const max = d3.max(tiltData, d => Math.abs(d.temp));
    const x = d3.scaleTime()
        .domain(d3.extent(tiltData, d => new Date(d.timepoint)))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain(d3.extent(tiltData, d => d.temp)).nice()
        .range([height - margin.bottom, margin.top]);

    const z = d3.scaleSequential(d3.interpolateRdBu).domain([max, -max]);

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

    svg.append("g")
        .call(yAxis);

    svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
        .selectAll("circle")
        .data(tiltData)
        .join("circle")
        .attr("cx", d => x(new Date(d.timepoint)))
        .attr("cy", d => y(d.temp))
        .attr("fill", d => z(d.temp))
        .attr("r", 2.5);
}
