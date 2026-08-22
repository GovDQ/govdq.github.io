document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('costChart');
    if (!ctx) return; // Exit if canvas isn't found

    // 1. Map the DOM Elements
    const slider = document.getElementById('userBaseInput');
    const sliderValueDisplay = document.getElementById('sliderValue');
    const opportunityCostDisplay = document.getElementById('opportunityCost');
    const spikeCheckbox = document.getElementById('renewalSpike'); // We will add this to HTML next

    // 2. Define the Sovereign Baseline (Flat $20k/yr = $100k over 5 years)
    const SOVEREIGN_TOTAL = 100000;

    // 3. The Core Financial Engine
    function calculateTrajectory(baseCost, applySpike) {
        let y1 = baseCost;
        let y2 = y1 * 1.20; // 20% standard YoY growth
        let y3 = y2 * 1.20; // 20% standard YoY growth

        let y4, y5;

        if (applySpike) {
            // The 36-Month Trap: 50% forced rate hike upon contract renewal
            y4 = y3 * 1.50; 
            y5 = y4 * 1.20; // Returns to standard 20% growth on the new, inflated baseline
        } else {
            // Standard compounding (no predatory spike)
            y4 = y3 * 1.20;
            y5 = y4 * 1.20;
        }

        return [y1, y2, y3, y4, y5];
    }

    // 4. Initialize the Chart
    let costChart = new Chart(ctx, {
        type: 'line',
        data: {
            // Updated labels to reflect the contract timeline
            labels: ['Year 1', 'Year 2', 'Year 3 (Contract Ends)', 'Year 4 (Renewal)', 'Year 5'],
            datasets: [
                {
                    label: 'Enterprise SaaS (Compounding)',
                    data: calculateTrajectory(50000, false),
                    borderColor: '#d4b483', // Accent Gold
                    backgroundColor: 'rgba(212, 180, 131, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Sovereign Infrastructure (Flat)',
                    data: [20000, 20000, 20000, 20000, 20000],
                    borderColor: '#3b82f6', // Accent Blue
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: { ticks: { color: '#94a3b8', callback: (value) => '$' + value / 1000 + 'k' } },
                x: { ticks: { color: '#94a3b8' } }
            }
        }
    });

    // 5. The Master Update Controller
    function updateDashboard() {
        if(!slider) return;
        
        const baseCost = parseInt(slider.value);
        // Check if the HTML checkbox exists and is checked
        const isSpiked = spikeCheckbox ? spikeCheckbox.checked : false; 

        // Recalculate the array based on current inputs
        const newData = calculateTrajectory(baseCost, isSpiked);

        // Inject new data into the chart
        costChart.data.datasets[0].data = newData;

        // Dynamic Storytelling: Shift chart to Red if the renewal spike is triggered
        if (isSpiked) {
            costChart.data.datasets[0].borderColor = '#ef4444'; // Warning Red
            costChart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.2)';
            costChart.data.datasets[0].label = 'Enterprise SaaS (36-Month Lock-in Hike)';
        } else {
            costChart.data.datasets[0].borderColor = '#d4b483'; // Accent Gold
            costChart.data.datasets[0].backgroundColor = 'rgba(212, 180, 131, 0.2)';
            costChart.data.datasets[0].label = 'Enterprise SaaS (Standard Compounding)';
        }

        costChart.update();

        // Update the HTML Text Elements dynamically from JS
        if (sliderValueDisplay) {
            sliderValueDisplay.innerText = '$' + baseCost.toLocaleString();
        }

        if (opportunityCostDisplay) {
            // Sum the 5 years of SaaS costs
            const totalSaaS = newData.reduce((sum, val) => sum + val, 0);
            const delta = totalSaaS - SOVEREIGN_TOTAL;
            opportunityCostDisplay.innerText = '$' + delta.toLocaleString(undefined, {maximumFractionDigits: 0});
        }
    }

    // 6. Bind Event Listeners
    slider?.addEventListener('input', updateDashboard);
    spikeCheckbox?.addEventListener('change', updateDashboard); // Listens for the checkbox toggle

    // 7. Run initialization once on load to ensure math matches the visuals
    updateDashboard();
});
