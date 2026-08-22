document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('institutionalGraph');
    if (!container) return;

    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // --- STATE 0: SOVEREIGN ARCHITECTURE & AIR-GAPPED AI ---
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
        { id: 's6', from: 6, to: 4, color: { color: '#94a3b8' }, width: 1 }, 
        { id: 's7', from: 6, to: 7, color: { color: '#94a3b8' }, width: 1 }  
    ];

    // --- STATE 1: LEGACY SILOS & BROKEN LINEAGE ---
    const legacyNodes = [
        { id: 1, label: 'SaaS\nVendor A', shape: 'box', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 2, label: 'SaaS\nVendor B', shape: 'box', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 3, label: 'Shadow IT\nDatabase', shape: 'database', color: '#f59e0b', font: { color: '#0f172a' } },
        { id: 4, label: 'Manual\nCSV Export', shape: 'ellipse', color: '#64748b', font: { color: '#ffffff' } },
        { id: 5, label: 'VPN\nBottleneck', shape: 'triangle', color: '#ef4444', font: { color: '#ffffff' } },
        { id: 6, label: 'Compliance\nAuditor', shape: 'circle', color: '#cbd5e1', font: { color: '#0f172a' } }
    ];
    const legacyEdges = [
        { id: 'L1', from: 6, to: 5, color: { color: '#ef4444' }, width: 2 }, 
        { id: 'L2', from: 5, to: 1, color: { color: '#ef4444' }, width: 2 }, 
        { id: 'L3', from: 1, to: 4, color: { color: '#ef4444' }, dashes: true, width: 2 }, 
        { id: 'L4', from: 2, to: 4, color: { color: '#ef4444' }, dashes: true, width: 2 },
        { id: 'L5', from: 4, to: 3, color: { color: '#f59e0b' }, width: 2 } 
    ];

    // --- STATE 2: ENTERPRISE ESB (THE MULESOFT MOCK) ---
    const esbNodes = [
        { id: 1, label: 'Core\nMetadata', shape: 'ellipse', color: '#cbd5e1', font: { color: '#0f172a' } },
        { id: 2, label: 'System API Layer\n(+ vCore Tax)', shape: 'circle', color: '#64748b', font: { color: '#ffffff' } },
        { id: 3, label: 'DataWeave\nScript Box', shape: 'diamond', color: '#6366f1', font: { color: '#ffffff' } },
        { id: 4, label: 'Process API Layer\n(+ vCore Tax)', shape: 'circle', color: '#64748b', font: { color: '#ffffff' } },
        { id: 5, label: 'Experience API Layer\n(+ vCore Tax)', shape: 'circle', color: '#64748b', font: { color: '#ffffff' } },
        { id: 6, label: 'External\nConsumer', shape: 'box', color: '#1e293b', font: { color: '#ffffff' } }
    ];
    const esbEdges = [
        { id: 'E1', from: 1, to: 2, color: { color: '#94a3b8' }, width: 1 }, 
        { id: 'E2', from: 2, to: 3, color: { color: '#94a3b8' }, width: 1 }, 
        { id: 'E3', from: 3, to: 4, color: { color: '#94a3b8' }, width: 1 }, 
        { id: 'E4', from: 4, to: 5, color: { color: '#94a3b8' }, width: 1 }, 
        { id: 'E5', from: 5, to: 6, color: { color: '#94a3b8' }, width: 1 }
    ];

    // Initialize Canvas
    nodes.add(sovereignNodes);
    edges.add(sovereignEdges);

    const data = { nodes: nodes, edges: edges };
    const options = {
        interaction: { hover: true, dragNodes: true, zoomView: false },
        physics: { stabilization: true, barnesHut: { springLength: 150 } },
        layout: { hierarchical: false }
    };

    const network = new vis.Network(container, data, options);

    // --- INTERACTIVE STORYTELLING CONTROLLERS ---
    let graphState = 0; 
    const toggleBtn = document.getElementById('toggleGraphBtn');
    const pulseBtn = document.getElementById('pulseBtn');

    pulseBtn.innerText = "Simulate Air-Gapped RAG";

    // 1. The Architectural State Cycler
    toggleBtn.addEventListener('click', () => {
        nodes.clear();
        edges.clear();
        
        graphState = (graphState + 1) % 3; 

        if (graphState === 0) {
            nodes.add(sovereignNodes);
            edges.add(sovereignEdges);
            toggleBtn.innerText = "View Legacy Silos";
            toggleBtn.style.background = "#1e293b";
            toggleBtn.style.color = "#d4b483";
            pulseBtn.innerText = "Simulate Air-Gapped RAG";
            pulseBtn.style.background = "#3b82f6"; 
            
        } else if (graphState === 1) {
            nodes.add(legacyNodes);
            edges.add(legacyEdges);
            toggleBtn.innerText = "View API-Led ESB Trap";
            toggleBtn.style.background = "#d4b483";
            toggleBtn.style.color = "#0f172a";
            pulseBtn.innerText = "Simulate Compliance Audit";
            pulseBtn.style.background = "#ef4444"; 

        } else if (graphState === 2) {
            nodes.add(esbNodes);
            edges.add(esbEdges);
            toggleBtn.innerText = "View Sovereign Graph";
            toggleBtn.style.background = "#6366f1";
            toggleBtn.style.color = "#ffffff";
            pulseBtn.innerText = "Simulate API-Led Sync";
            pulseBtn.style.background = "#f59e0b"; 
        }
    });

    // 2. The Data Flow Animations
    pulseBtn.addEventListener('click', () => {
        pulseBtn.disabled = true;
        toggleBtn.disabled = true;
        pulseBtn.style.opacity = "0.5";
        toggleBtn.style.opacity = "0.5";

        let step = 0;
        
        if (graphState === 0) {
            // NARRATIVE: The Sovereign RAG Pipeline (Ingestion + AI Query)
            let flowInterval = setInterval(() => {
                if (step === 0) {
                    pulseBtn.innerText = "Syncing Telemetry...";
                    // INGESTION BEAT 1: Peripheral systems surge data to the center
                    edges.update([
                        { id: 's1', color: { color: '#3b82f6' }, width: 3 },
                        { id: 's2', color: { color: '#3b82f6' }, width: 3 },
                        { id: 's3', color: { color: '#3b82f6' }, width: 3 },
                        { id: 's4', color: { color: '#3b82f6' }, width: 3 }
                    ]);
                } else if (step === 1) {
                    // INGESTION BEAT 2: Edges reset, Core Metadata flashes to confirm receipt
                    edges.update([
                        { id: 's1', color: { color: '#94a3b8' }, width: 1 },
                        { id: 's2', color: { color: '#94a3b8' }, width: 1 },
                        { id: 's3', color: { color: '#94a3b8' }, width: 1 },
                        { id: 's4', color: { color: '#94a3b8' }, width: 1 }
                    ]);
                    nodes.update({ id: 4, color: '#3b82f6', font: { color: '#ffffff' } });
                    pulseBtn.innerText = "Executing RAG Query...";
                } else if (step === 2) {
                    // RAG BEAT 1: Core Metadata resets, FastAPI queries the hub
                    nodes.update({ id: 4, color: '#d4b483', font: { color: '#0f172a' } }); 
                    edges.update({ id: 's6', color: { color: '#10b981' }, width: 4 }); 
                } else if (step === 3) {
                    // RAG BEAT 2: FastAPI payload moves to Local LLM
                    edges.update({ id: 's6', color: { color: '#94a3b8' }, width: 1 });
                    edges.update({ id: 's7', color: { color: '#10b981' }, width: 4 }); 
                } else if (step === 4) {
                    // RAG BEAT 3: Successful Local Generation
                    edges.update({ id: 's7', color: { color: '#94a3b8' }, width: 1 });
                    nodes.update({ id: 7, color: '#10b981', label: '✅ ZERO CLOUD\nDEPENDENCY' }); 
                } else if (step === 7) { 
                    // RESET STATE
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

        } else if (graphState === 1) {
            // NARRATIVE: The Broken Audit Trail (Legacy Chaos)
            pulseBtn.innerText = "Tracing Lineage...";
            let flowInterval = setInterval(() => {
                if (step === 0) {
                    edges.update({ id: 'L1', color: { color: '#f59e0b' }, width: 4 }); 
                } else if (step === 1) {
                    edges.update({ id: 'L1', color: { color: '#ef4444' }, width: 2 });
                    edges.update({ id: 'L2', color: { color: '#f59e0b' }, width: 4 }); 
                } else if (step === 2) {
                    edges.update({ id: 'L2', color: { color: '#ef4444' }, width: 2 });
                    edges.update({ id: 'L3', color: { color: '#f59e0b' }, width: 4 }); 
                } else if (step === 3) {
                    edges.update({ id: 'L3', color: { color: '#ef4444' }, dashes: true, width: 2 });
                    nodes.update({ id: 4, color: '#ef4444', font: { color: '#ffffff' }, label: '⚠️ LINEAGE\nBROKEN' });
                } else if (step === 6) { 
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
            
        } else if (graphState === 2) {
            // NARRATIVE: The Enterprise API-Led Trap (MuleSoft Mock)
            let flowInterval = setInterval(() => {
                if (step === 0) {
                    edges.update({ id: 'E1', color: { color: '#f59e0b' }, width: 4 }); 
                    pulseBtn.innerText = "System API (+$15k vCore Tax)";
                } else if (step === 1) {
                    edges.update({ id: 'E1', color: { color: '#94a3b8' }, width: 1 });
                    edges.update({ id: 'E2', color: { color: '#ef4444' }, width: 4 }); 
                    pulseBtn.innerText = "DataWeave: Lineage Mangled";
                    nodes.update({ id: 3, color: '#ef4444', font: { color: '#ffffff' }, label: '⚠️ DATAWEAVE\nBLACK BOX' });
                } else if (step === 2) {
                    edges.update({ id: 'E2', color: { color: '#94a3b8' }, width: 1 });
                    edges.update({ id: 'E3', color: { color: '#f59e0b' }, width: 4 });
                    pulseBtn.innerText = "Process API (+$15k vCore Tax)"; 
                } else if (step === 3) {
                    edges.update({ id: 'E3', color: { color: '#94a3b8' }, width: 1 });
                    edges.update({ id: 'E4', color: { color: '#f59e0b' }, width: 4 }); 
                    pulseBtn.innerText = "Experience API (+$15k vCore Tax)";
                } else if (step === 4) {
                    edges.update({ id: 'E4', color: { color: '#94a3b8' }, width: 1 });
                    edges.update({ id: 'E5', color: { color: '#ef4444' }, dashes: true, width: 2 });
                    
                    // CRITICAL CLIMAX: Total Tax and Metadata Orphaned
                    pulseBtn.innerText = "🚨 Total ESB Tax: $45k/yr 🚨";
                    pulseBtn.style.opacity = "1";
                    nodes.update({ id: 1, color: '#ef4444', font: { color: '#ffffff' }, label: '⚠️ METADATA\nORPHANED' });
                } else if (step === 8) { 
                    nodes.update({ id: 1, color: '#cbd5e1', font: { color: '#0f172a' }, label: 'Core\nMetadata' });
                    nodes.update({ id: 3, color: '#6366f1', font: { color: '#ffffff' }, label: 'DataWeave\nScript Box' });
                    edges.update({ id: 'E5', color: { color: '#94a3b8' }, dashes: false, width: 1 });
                    
                    pulseBtn.disabled = false;
                    toggleBtn.disabled = false;
                    toggleBtn.style.opacity = "1";
                    pulseBtn.innerText = "Simulate API-Led Sync";
                    pulseBtn.style.background = "#f59e0b"; 
                    clearInterval(flowInterval);
                }
                step++;
            }, 750); 
        }
    });
});
