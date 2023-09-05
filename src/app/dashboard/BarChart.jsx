
import Chart from "chart.js/auto";
import { CategoryScale, scales } from "chart.js";
Chart.register(CategoryScale);
import { Bar } from "react-chartjs-2";

export const BarChart = ({ barChartData }) => {
  return (
    <div className="chart-container">
      <Bar
        data={barChartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Units sold of each book (Q)"
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              ticks: {
                callback: function (title){
                  const valueLegend = this.getLabelForValue(title)
                  const shortenLegend = valueLegend.slice(0,9) + "..."
                  return shortenLegend
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;