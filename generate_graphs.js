function generateCompleteGraph(n) {
    // n is the number of nodes
    let nodes = [], edges = [];

    for (let i = 0; i < n; i++) {
        nodes.push({
            data: { id: `n${i}`, label: `${i+1}` }
        });
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            edges.push({
                data: {
                    id: `e${i}-${j}`,
                    source: `n${i}`,
                    target: `n${j}`
                }
            });
        }
    }

    return {nodes: nodes, edges:edges};
}


function generateGraph(gen,parameters) {

    // let category = $('#categories1').find('option:selected').text();
    // let gen = $('#gens').find('option:selected').text();

    if(gen == "CompleteGraphGenerator") {
        return generateCompleteGraph(parseInt(parameters));
    }

    return generateCompleteGraph(parseInt(parameters));
}