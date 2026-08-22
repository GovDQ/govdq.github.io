document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('institutionalGraph');
    if (!container) return;

    // Define the datasets globally so we can update them dynamically
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // --- STATE 1: SOVEREIGN ARCHITECTURE (Order) ---
    const sovereignNodes = [
        { id: 1, label: 'Student\nRecords', shape: 'circle', color: '#3b82f6', font: { color: '#ffffff' } },
        { id: 2, label: 'Financial\nAid', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 3, label: 'Alumni\nOutcomes', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 4, label: 'Core\nMetadata', shape: 'box', color: '#d4b483', font: { color: '#0f172a' } },
        { id: 5, label: 'Access\nPolicies', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } }
    ];
    const sovereignEdges = [
        { id: 'e1', from: 4, to: 1, color: { color: '#94a3b8' }, width: 1 },
        { id: 'e2', from: 4, to: 2, color: { color: '#94a3b8' }, width: 1 },
        { id: 'e3', from: 4, to: 3, color: { color: '#94a3b8' }, width: 1 },
        { id: 'e4', from: 4, to: 5, color: { color: '#94a3b8' }, width: 1 },
        { id: 'e5', from: 1, to: 2, color: { color: '#3b82f6' }, width: 1 }
    ];

    // --- STATE 2: LEGACY SILOS (Chaos) ---
    const legacyNodes = [
        { id: 1, label: 'SaaS\nVendor A', shape: 'box', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 2, label: 'SaaS\nVendor B', shape: 'box', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 3, label: 'Shadow IT\nDatabase', shape: 'database', color: '#f59e0b', font: { color: '#0f172a' } },
        { id: 4, label: 'Manual\nCSV Export', shape: 'ellipse', color: '#64748b', font: { color: '#ffffff' } },
        { id: 5, label: 'VPN\nBottleneck', shape: 'triangle', color: '#ef4444', font: { color: '#ffffff' } }
    ];
    const legacyEdges = [
        { id: 'e1', from: 1, to: 4, color: { color: '#ef4444' }, dashes: true, width: 2 },
        { id: 'e2', from: 2, to: 4, color: { color: '#ef4444' }, dashes: true, width: 2 },
        { id: 'e3', from: 4, to: 3, color: { color: '#f59e0b' }, width: 2 },
        { id: 'e4', from: 5, to: 1, color: { color: '#ef4444' }, width: 2 }
    ];

    // Initialize with Sovereign State
    nodes.add(sovereignNodes);
    edges.add(sovereignEdges);

    const data = { nodes: nodes, edges: edges };
    const options = {
        interaction: { hover: true, dragNodes: true, zoomView: false },
        physics: { stabilization: true, barnesHut: { springLength: 150 } }
    };

    // Draw the network
    const network = new vis.Network(container, data, options);

    // --- INTERACTIVE LOGIC ---
    let isLegacy = false;
    const toggleBtn = document.getElementById('toggleGraphBtn');
    const pulseBtn = document.getElementById('pulseBtn');

    // 1. The Chaos-to-Order Toggle
    toggleBtn.addEventListener('click', () => {
        nodes.clear();
        edges.clear();
        
        if (!isLegacy) {
            // Switch to Chaos
            nodes.add(legacyNodes);
            edges.add(legacyEdges);
            toggleBtn.innerText = "View Sovereign Graph";
            toggleBtn.style.background = "#d4b483";
            toggleBtn.style.color = "#0f172a";
            pulseBtn.style.opacity = "0.3"; // Disable pulse in chaos mode
            pulseBtn.style.pointerEvents = "none";
        } else {
            // Switch to Order
            nodes.add(sovereignNodes);
            edges.add(sovereignEdges);
            toggleBtn.innerText = "View Legacy Silos";
            toggleBtn.style.background = "#1e293b";
            toggleBtn.style.color = "#d4b483";
            pulseBtn.style.opacity = "1";
            pulseBtn.style.pointerEvents = "auto";
        }
        isLegacy = !isLegacy;
    });

    // 2. The Data Flow Animation (Policy Injection)
    pulseBtn.addEventListener('click', () => {
        if (isLegacy) return; // Prevent animation if viewing legacy silos
        
        pulseBtn.disabled = true;
        pulseBtn.innerText = "Injecting Policy...";

        let step = 0;
        // Step-by-step interval to simulate data requesting a policy and injecting it
        let flowInterval = setInterval(() => {
            if (step === 0) {
                // Highlight path from Access Policies to Core Metadata
                edges.update({ id: 'e4', color: { color: '#10b981' }, width: 4 }); 
            } else if (step === 1) {
                // Reset policy edge, highlight path from Core Metadata to Student Records
                edges.update({ id: 'e4', color: { color: '#94a3b8' }, width: 1 });
                edges.update({ id: 'e1', color: { color: '#10b981' }, width: 4 }); 
            } else if (step === 2) {
                // Reset edge, illuminate target node to show successful injection
                edges.update({ id: 'e1', color: { color: '#94a3b8' }, width: 1 });
                nodes.update({ id: 1, color: '#10b981' }); 
            } else if (step === 3) {
                // Revert target node to normal, reset button
                nodes.update({ id: 1, color: '#3b82f6' }); 
                pulseBtn.disabled = false;
                pulseBtn.innerText = "Simulate Policy Injection";
                clearInterval(flowInterval);
            }
            step++;
        }, 500); // Half-second per step
    });
});
