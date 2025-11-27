import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { getMoodColor } from '../utils/constants';
import './MoodChart.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function MoodChart({ entries, period = 7 }) {
    if (entries.length === 0) {
        return (
            <div className="mood-chart-empty glass-card">
                <p>Belum ada data untuk ditampilkan. Mulai catat mood Anda!</p>
            </div>
        );
    }

    // Get last N days
    const today = new Date();
    const periodDays = [];
    const periodData = [];

    for (let i = period - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        periodDays.push(dateStr);

        // Find entry for this date
        const entry = entries.find(e => e.date.split('T')[0] === dateStr);
        periodData.push(entry ? entry.rating : null);
    }

    // Format labels
    const labels = periodDays.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    });

    // Line Chart Data
    const lineChartData = {
        labels,
        datasets: [
            {
                label: 'Rating Mood',
                data: periodData,
                borderColor: 'rgb(160, 80, 240)',
                backgroundColor: 'rgba(160, 80, 240, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: 'rgb(160, 80, 240)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return context.parsed.y ? `Rating: ${context.parsed.y}/10` : 'Tidak ada data';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 2,
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                }
            },
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    display: false
                }
            }
        }
    };

    // Mood Distribution Data
    const moodCounts = {};
    entries.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    const moodLabels = Object.keys(moodCounts);
    const moodValues = Object.values(moodCounts);
    const moodColors = moodLabels.map(mood => getMoodColor(mood));

    const barChartData = {
        labels: moodLabels.map(m => m.charAt(0) + m.slice(1).toLowerCase()),
        datasets: [
            {
                label: 'Jumlah',
                data: moodValues,
                backgroundColor: moodColors.map(c => c + '80'), // Add transparency
                borderColor: moodColors,
                borderWidth: 2,
                borderRadius: 8,
            }
        ]
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                }
            },
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="mood-charts">
            <div className="chart-container glass-card">
                <h3 className="chart-title">Trend Mood ({period} Hari Terakhir)</h3>
                <div className="chart-wrapper">
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>
            </div>

            <div className="chart-container glass-card">
                <h3 className="chart-title">Distribusi Mood</h3>
                <div className="chart-wrapper">
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>
        </div>
    );
}
