document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('institutionalGraph');
    if (!container) return;

    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // --- STORYLINE 1: SOVEREIGN ARCHITECTURE & AIR-GAPPED AI ---
    // Added FastAPI and Local LLM nodes to demonstrate secure compute
    const sovereignNodes = [
        { id: 1, label: 'Student\nRecords', shape: 'circle', color: '#3b82f6', font: { color: '#ffffff' } },
        { id: 2, label: 'Financial\nAid', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 3, label: 'Alumni\nOutcomes', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 4, label: 'Core\nMetadata', shape: 'box', color: '#d4b483', font: { color: '#0f172a' } },
        { id: 5, label: 'Access\nPolicies', shape: 'circle', color: '#1e293b', font: { color: '#ffffff' } },
        { id: 6, label: 'FastAPI\nQuery Engine', shape: 'hexagon', color: '#8b5cf6', font: { color: '#ffffff' } },
        { id: 7, label: 'Local Air-Gapped\nLLM', shape: 'database', color: '#1e293b', font: { color: '#ffffff' } }
    ];
    const sovereignEdges = [
        { id: 's1', from: 4, to: 1, color: { color: '#94a3b8' }, width: 1 },
        { id: 's2', from: 4, to: 2, color: { color: '#94a3b8' }, width: 1 },
        { id: 's3', from: 4, to: 3, color: { color: '#94a3b8' }, width: 1 },
        { id: 's4', from: 4, to: 5, color: { color: '#94a3b8' }, width: 1 },
        { id: 's5', from: 1, to: 2, color: { color: '#3b82f6' }, width: 1 },
        { id: 's6', from: 6, to: 4, color: { color: '#94a3b8' }, width: 1 }, // API extracts context from Meta
        { id: 's7', from: 6, to: 7, color: { color: '#94a3b8' }, width: 1 }  // API sends RAG payload to LLM
    ];

    // --- STORYLINE 2: LEGACY SILOS & BROKEN LINEAGE ---
    // Added Compliance Auditor node to trace the data flow failure
    const legacyNodes = [
        { id: 1, label: 'SaaS\nVendor A', shape: 'box', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 2, label: 'SaaS\nVendor B', shape: 'box', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 3, label: 'Shadow IT\nDatabase', shape: 'database', color: '#f59e0b', font: { color: '#0f172a' } },
        { id: 4, label: 'Manual\nCSV Export', shape: 'ellipse', color: '#64748b', font: { color: '#ffffff' } },
        { id: 5, label: 'VPN\nBottleneck', shape: 'triangle', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 6, label: 'Compliance\nAuditor', shape: 'circle', color: '#cbd5e1', font: { color: '#0f172a' } }
    ];
    const legacyEdges = [
        { id: 'L1', from: 6, to: 5, color: { color: '#ef4444' }, width: 2 }, // Auditor hits VPN
        { id: 'L2', from: 5, to: 1, color: { color: '#ef4444' }, width: 2 }, // VPN hits SaaS A
        { id: 'L3', from: 1, to: 4, color: { color: '#ef4444' }, dashes: true, width: 2 }, // SaaS exports CSV
        { id: 'L4', from: 2, to: 4, color: { color: '#ef4444' }, dashes: true, width: 2 },
        { id: 'L5', from: 4, to: 3, color: { color: '#f59e0b' }, width: 2 } // CSV lost to Shadow IT
    ];

    // Initialize Canvas
    nodes.add(sovereignNodes);
    edges.add(sovereignEdges);

    const data = { nodes: nodes, edges: edges };
    const options = {
        interaction: { hover: true, dragNodes: true, zoomView: false },
        physics: { stabilization: true, barnesHut: { springLength: 150 } }
    };

    const network = new vis.Network(container, data, options);

    // --- INTERACTIVE STORYTELLING CONTROLLERS ---
    let isLegacy = false;
    const toggleBtn = document.getElementById('toggleGraphBtn');
    const pulseBtn = document.getElementById('pulseBtn');

    // Default Sovereign Button State
    pulseBtn.innerText = "Simulate Air-Gapped RAG";

    // 1. The Architectural Toggle
    toggleBtn.addEventListener('click', () => {
        nodes.clear();
        edges.clear();
        
        if (!isLegacy) {
            // Deploy Chaos State
            nodes.add(legacyNodes);
            edges.add(legacyEdges);
            toggleBtn.innerText = "View Sovereign Graph";
            toggleBtn.style.background = "#d4b483";
            toggleBtn.style.color = "#0f172a";
            
            // Transform action button into an Audit trigger
            pulseBtn.innerText = "Simulate Compliance Audit";
            pulseBtn.style.background = "#ef4444"; 
        } else {
            // Deploy Order State
            nodes.add(sovereignNodes);
            edges.add(sovereignEdges);
            toggleBtn.innerText = "View Legacy Silos";
            toggleBtn.style.background = "#1e293b";
            toggleBtn.style.color = "#d4b483";
            
            // Transform action button into a RAG trigger
            pulseBtn.innerText = "Simulate Air-Gapped RAG";
            pulseBtn.style.background = "#3b82f6"; 
        }
        isLegacy = !isLegacy;
    });

    // 2. The Data Flow Animations
    pulseBtn.addEventListener('click', () => {
        // Lock controls during animation sequence
        pulseBtn.disabled = true;
        toggleBtn.disabled = true;
        pulseBtn.style.opacity = "0.5";
        toggleBtn.style.opacity = "0.5";

        let step = 0;
        
        if (isLegacy) {
            // NARRATIVE: The Broken Audit Trail
            pulseBtn.innerText = "Tracing Lineage...";
            let flowInterval = setInterval(() => {
                if (step === 0) {
                    edges.update({ id: 'L1', color: { color: '#f59e0b' }, width: 4 }); // Auditor -> VPN
                } else if (step === 1) {
                    edges.update({ id: 'L1', color: { color: '#ef4444' }, width: 2 });
                    edges.update({ id: 'L2', color: { color: '#f59e0b' }, width: 4 }); // VPN -> SaaS
                } else if (step === 2) {
                    edges.update({ id: 'L2', color: { color: '#ef4444' }, width: 2 });
                    edges.update({ id: 'L3', color: { color: '#f59e0b' }, width: 4 }); // SaaS -> CSV
                } else if (step === 3) {
                    edges.update({ id: 'L3', color: { color: '#ef4444' }, dashes: true, width: 2 });
                    // CRITICAL FAILURE: Data hits CSV, lineage is severed
                    nodes.update({ id: 4, color: '#ef4444', font: { color: '#ffffff' }, label: '⚠️ LINEAGE\nBROKEN' });
                } else if (step === 6) { 
                    // Reset State after holding climax for 3 beats
                    nodes.update({ id: 4, color: '#64748b', label: 'Manual\nCSV Export' });
                    pulseBtn.disabled = false;
                    toggleBtn.disabled = false;
                    pulseBtn.style.opacity = "1";
                    toggleBtn.style.opacity = "1";
                    pulseBtn.innerText = "Simulate Compliance Audit";
                    clearInterval(flowInterval);
                }
                step++;
            }, 600);
            
        } else {
            // NARRATIVE: The Sovereign RAG Pipeline
            pulseBtn.innerText = "Executing RAG Query...";
            let flowInterval = setInterval(() => {
                if (step === 0) {
                    // API extracts Context from Core Metadata
                    edges.update({ id: 's6', color: { color: '#10b981' }, width: 4 }); 
                } else if (step === 1) {
                    edges.update({ id: 's6', color: { color: '#94a3b8' }, width: 1 });
                    // API sends secure payload to Local LLM
                    edges.update({ id: 's7', color: { color: '#10b981' }, width: 4 }); 
                } else if (step === 2) {
                    edges.update({ id: 's7', color: { color: '#94a3b8' }, width: 1 });
                    // SUCCESS: LLM processes locally
                    nodes.update({ id: 7, color: '#10b981', label: '✅ ZERO CLOUD\nDEPENDENCY' }); 
                } else if (step === 5) { 
                    // Reset State after holding climax for 3 beats
                    nodes.update({ id: 7, color: '#1e293b', label: 'Local Air-Gapped\nLLM' }); 
                    pulseBtn.disabled = false;
                    toggleBtn.disabled = false;
                    pulseBtn.style.opacity = "1";
                    toggleBtn.style.opacity = "1";
                    pulseBtn.innerText = "Simulate Air-Gapped RAG";
                    clearInterval(flowInterval);
                }
                step++;
            }, 600);
        }
    });
});
