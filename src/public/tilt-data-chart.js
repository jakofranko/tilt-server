const height = 600;
const width = 1000;
const margin = ({
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
});

function getSvg(tiltData) {
    const max = d3.max(tiltData, d => Math.abs(d.value));
    const x = d3.scaleTime()
        .domain(d3.extent(tiltData, d => new Date(d.date)))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain(d3.extent(tiltData, d => d.value)).nice()
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
            .attr("stroke", "#ccc"))
        .call(g => g.append("text")
            .attr("fill", "#000")
            .attr("x", 5)
            .attr("y", margin.top)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Anomaly (°C)"));
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
        .attr("cx", d => x(new Date(d.date)))
        .attr("cy", d => y(d.value))
        .attr("fill", d => z(d.value))
        .attr("r", 2.5);
}
