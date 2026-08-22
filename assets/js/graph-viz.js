document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('institutionalGraph');
    if (!container) return; // Exit if container isn't found

    const nodes = new vis.DataSet([
        { id: 1, label: 'Student\nRecords', shape: 'circle', color: '#3b82f6', font: { color: '#ffffff' } },
        { id: 2, label: 'Financial\nAid', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 3, label: 'Alumni\nOutcomes', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 4, label: 'Core\nMetadata', shape: 'box', color: '#d4b483', font: { color: '#0f172a' } },
        { id: 5, label: 'Access\nPolicies', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } }
    ]);

    const edges = new vis.DataSet([
        { from: 4, to: 1, color: { color: '#94a3b8' } },
        { from: 4, to: 2, color: { color: '#94a3b8' } },
        { from: 4, to: 3, color: { color: '#94a3b8' } },
        { from: 4, to: 5, color: { color: '#94a3b8' } },
        { from: 1, to: 2, color: { color: '#3b82f6' } }
    ]);

    const data = { nodes: nodes, edges: edges };
    const options = {
        interaction: { hover: true, dragNodes: true, zoomView: false },
        physics: { stabilization: true, barnesHut: { springLength: 150 } }
    };

    new vis.Network(container, data, options);
});
