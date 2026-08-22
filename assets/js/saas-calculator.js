document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('costChart');
    if (!ctx) return; // Exit if canvas isn't found

    let costChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [
                {
                    label: 'Enterprise SaaS (Compounding)',
                    data: [50000, 60000, 72000, 86400, 103680],
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

    // Listener for interactive slider (staged for index.html)
    document.getElementById('userBaseInput')?.addEventListener('input', (e) => {
        const baseCost = parseInt(e.target.value);
        // Recalculate 20% YoY SaaS growth
        costChart.data.datasets[0].data = [baseCost, baseCost * 1.2, baseCost * 1.44, baseCost * 1.72, baseCost * 2.07];
        costChart.update();
    });
});
