function extractIntegers(inputStr) {
    const parts = inputStr.split(',').map(str => str.trim()); // Split by comma and trim whitespace
    if (parts.length !== 2) {
        throw new Error('The input string should contain exactly two integers separated by a comma.');
    }
    
    const int1 = parseInt(parts[0], 10);
    const int2 = parseInt(parts[1], 10);

    if (isNaN(int1) || isNaN(int2)) {
        throw new Error('Both parts of the input string should be valid integers.');
    }

    return [int1, int2];
}

function addEdgePrefix(edges, sourcePrefix, sourceIndex, targetPrefix, targetIndex) {
    edges.push({
        data: {
            id: `e${sourceIndex}-${targetIndex}`,
            source: `${sourcePrefix}${sourceIndex}`,
            target: `${targetPrefix}${targetIndex}`
        }
    });
}

function addEdge(edges, sourceIndex, targetIndex) {
    addEdgePrefix(edges, 'n', sourceIndex, 'n', targetIndex);
}

function addNode(nodes, id) {
    nodes.push({
            data: { id: `n${id}`, label: `${id+1}` }
    });
}

function addNodes(nodes, n) {
    for (let i = 0; i < n; i++) 
        addNode(nodes, i);
}

function generateCompleteGraph(n) {
    let nodes = [], edges = [];

    addNodes(nodes,n);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            addEdge(edges,i,j);
        }
    }

    return {nodes: nodes, edges:edges};
}

function generateChainGraph1(n) {
    let nodes = [], edges = [];

    addNodes(nodes,2*n);
    
    for (let i = 0; i < n - 1; i++) {
        let j = i + 1;
        addEdge(edges,i,j);
    }

    for (let i = 0; i < n; i++) {
        j = n + i;
        addEdge(edges,i,j);
    }

    return {nodes: nodes, edges:edges};
}

function generateChainGraph2(n) {
    let nodes = [], edges = [];

    addNodes(nodes,2*n);

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,i + 1);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i+n,i + 1 + n);
    }

    for (let i = 0; i < n; i = i + 2) {
        addEdge(edges,i,n + i);
    }

    return {nodes: nodes, edges:edges};
}

function generateChainGraph4(n) {
    let nodes = [], edges = [];

    addNodes(nodes,3*n - 1);

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,i+1);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i+n,i+1+n);
    }

    for (let i = 0; i < n; i++) {
        addEdge(edges,i,n+i);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,2*n + i);
    }

    for (let i = 0; i < n; i++) {
        addEdge(edges,i+n+1,2*n+i);
    }

    return {nodes: nodes, edges:edges};
}

function generateChainGraph5(n) {
    let nodes = [], edges = [];

    addNodes(nodes, 3*n - 1);

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,i+1);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i+n,i + 1 + n);
    }

    for (let i = 0; i < n; i++) {
        addEdge(edges,i,n+i);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,2*n+i);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i+n,2*n+i);
    }

    return {nodes: nodes, edges:edges};
}


function generateChainGraph6(n) {
    let nodes = [], edges = [];

    addNodes(nodes, 2*n);

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,i+1);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i + n,i + 1 + n);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i,n + i + 1);
        addEdge(edges,i+1,n+i);
    }

    return {nodes: nodes, edges:edges};
}

function generateChainGraph7(n) {
    let nodes = [], edges = [];

    addNodes(nodes, 3*n + 1);

    for (let i = 0; i < 2*n - 1; i++) {
        let j = i + 1;
        addEdge(edges,i,j);    }

    for (let i = 0; i < n; i++) {
        addEdge(edges,i + 2* n,i + 1 + 2* n);
    }

    for (let i = 0; i < n - 1; i++) {
        addEdge(edges,i*2 + 1,i + 1 + 2* n);
        addEdge(edges,i*2 + 1 + 1,i + 1 + 2* n);
    }

    addEdge(edges,0,2*n);
    addEdge(edges,2*n - 1,3*n);
    
    return {nodes: nodes, edges:edges};
}


function generateGeneralizedPetersenGraph(n, k) {
    let nodes = [], edges = [];
    const innerRadius = 50; // Radius for inner circle
    const outerRadius = 100; // Radius for outer circle

    // Create the inner vertices v0, v1, ..., v{n-1}
    for (let i = 0; i < n; i++) {
        let theta = (2 * Math.PI / n) * i;
        nodes.push({
            data: { 
                id: `v${i}`, 
                label: `v${i}`,
                x: innerRadius * Math.cos(theta),
                y: innerRadius * Math.sin(theta)
            }
        });
    }

    // Create the outer vertices u0, u1, ..., u{n-1}
    for (let i = 0; i < n; i++) {
        let theta = (2 * Math.PI / n) * i;
        nodes.push({
            data: { 
                id: `u${i}`, 
                label: `u${i}`,
                x: outerRadius * Math.cos(theta),
                y: outerRadius * Math.sin(theta)
            }
        });
    }

    // Connect the inner vertices to form a cycle
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_v${i}_v${(i+1)%n}`,
                source: `v${i}`,
                target: `v${(i+1)%n}`
            }
        });
    }

    // Connect the outer vertices to form a cycle
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_u${i}_u${(i+1)%n}`,
                source: `u${i}`,
                target: `u${(i+1)%n}`
            }
        });
    }

    // Connect each vertex vi to ui
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_v${i}_u${i}`,
                source: `v${i}`,
                target: `u${i}`
            }
        });
    }

    // Connect each vertex ui to v{(i+k) mod n}
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_u${i}_v${(i+k)%n}`,
                source: `u${i}`,
                target: `v${(i+k)%n}`
            }
        });
    }

    return { nodes: nodes, edges: edges };
}


function generateGeneralizedPetersenGraph2(n, k) {
    let nodes = [], edges = [];

    // Create the inner vertices v0, v1, ..., v{n-1}
    for (let i = 0; i < n; i++) {
        nodes.push({
            data: { id: `v${i}`, label: `v${i}` }
        });
    }

    // Create the outer vertices u0, u1, ..., u{n-1}
    for (let i = 0; i < n; i++) {
        nodes.push({
            data: { id: `u${i}`, label: `u${i}` }
        });
    }

    // Connect the inner vertices to form a cycle
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_v${i}_v${(i+1)%n}`,
                source: `v${i}`,
                target: `v${(i+1)%n}`
            }
        });
    }

    // Connect the outer vertices to form a cycle
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_u${i}_u${(i+1)%n}`,
                source: `u${i}`,
                target: `u${(i+1)%n}`
            }
        });
    }

    // Connect each vertex vi to ui
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_v${i}_u${i}`,
                source: `v${i}`,
                target: `u${i}`
            }
        });
    }

    // Connect each vertex ui to v{(i+k) mod n}
    for (let i = 0; i < n; i++) {
        edges.push({
            data: {
                id: `e_u${i}_v${(i+k)%n}`,
                source: `u${i}`,
                target: `v${(i+k)%n}`
            }
        });
    }

    return { nodes: nodes, edges: edges };
}


function generateGraph(gen,parameters) {
    
    if(gen == "CompleteGraphGenerator") {
        return generateCompleteGraph(parseInt(parameters));
    } else if (gen == "GeneralizedPetersonGenerator") {
        console.log("here");
        let ret = extractIntegers(parameters);
        return generateGeneralizedPetersenGraph(ret[0],ret[1]);
    } else if (gen == "ExampleChainGraph1") {
        return generateChainGraph1(parseInt(parameters));
    } else if (gen == "ExampleChainGraph2") {
        return generateChainGraph2(parseInt(parameters));
    } else if (gen == "ExampleChainGraph4") {
        return generateChainGraph4(parseInt(parameters));
    } else if (gen == "ExampleChainGraph5") {
        return generateChainGraph5(parseInt(parameters));
    } else if (gen == "ExampleChainGraph6") {
        return generateChainGraph6(parseInt(parameters));
    } else if (gen == "ExampleChainGraph7") {
        return generateChainGraph7(parseInt(parameters));
    }

    return generateCompleteGraph(parseInt(parameters));
}
