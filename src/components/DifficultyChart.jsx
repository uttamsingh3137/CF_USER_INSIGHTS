import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    // X AXIS
    CategoryScale,
    // Y AXIS
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DifficultyChart = ({ difficultyData }) => {
    const getBarColor = (rating) => {
        if (rating >= 3600) return "#890000"; // Ultra-Legendary Grandmaster
        if (rating >= 3200) return "#A20000"; // Legendary Grandmaster
        if (rating >= 3000) return "#B40000"; // International Grandmaster
        if (rating >= 2800) return "#E00000"; // Grandmaster
        if (rating >= 2600) return "#FF0000"; // High Master
        if (rating >= 2400) return "#FF0C00"; // Master
        if (rating >= 2200) return "#FF5900"; // Low Master
        if (rating >= 2000) return "#7F0092"; // Intermediate Master
        if (rating >= 1900) return "#7F00CD"; // Candidate Master
        if (rating >= 1800) return "#3D00FF"; // High Expert
        if (rating >= 1600) return "#0041FF"; // Expert
        if (rating >= 1500) return "#00B2FF"; // Specialist Expert
        if (rating >= 1400) return "#00D9FF"; // Specialist
        if (rating >= 1300) return "#00FF00"; // Pupil
        if (rating >= 1200) return "#00FF79"; // High Pupil
        if (rating >= 1000) return "#525252"; // Pupil
        return "#808080"; // Beginner/Newbie
    };

    const labels = Object.keys(difficultyData).sort((a, b) => (a - b));

    const chartData = {
        labels, // Sort difficulty levels
        datasets: [
            {
                label: "Number of Problems Solved",
                data: labels.map((key) => difficultyData[key]),
                backgroundColor: labels.map((key) => getBarColor(parseInt(key))),
                borderColor: labels.map((key) => getBarColor(parseInt(key))),
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Difficulty Rating",
                    font: {
                        size: 24,  // Set x-axis title font size
                        weight: 'bold',  // Make x-axis title bold
                        family: 'Arial',  // Optional: Set font family
                    },
                },
                ticks: {
                    font: {
                        size: 18,  // Increase size of x-axis labels
                        family: 'Arial',  // Optional: Set font family if needed
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Number of Problems",
                    font: {
                        size: 24,  // Set x-axis title font size
                        weight: 'bold',  // Make x-axis title bold
                        family: 'Arial',  // Optional: Set font family
                    },
                },
                ticks: {
                    font: {
                        size: 18,  // Increase size of x-axis labels
                        family: 'Arial',  // Optional: Set font family if needed
                    },
                },
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="mt-8 bg-white p-8 ">
            <h2 className="text-4xl font-semibold mb-4">Number of Problems Solved vs Difficulty Rating</h2>
            <div className="w-full min-w-4xl min-h-[40rem] mx-auto pt-4">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default DifficultyChart;
