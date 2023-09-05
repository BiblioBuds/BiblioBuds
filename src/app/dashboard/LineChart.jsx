import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

function LineChart({ lineChartData }) {
    return (
      <div className="chart-container">
        
        <Line
          data={lineChartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Sales per day ($)"
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
                      const shortenLegend = valueLegend.slice(5,10)
                      return shortenLegend
                    }
                  }
                },
                y: {
                    ticks: {
                      callback: function (title){
                        const valueLegend = this.getLabelForValue(title)
                        const moneyLegend = `$${valueLegend}`
                        return moneyLegend
                      }
                    }
                  }
              }
          }}
        />
      </div>
    );
  }
  export default LineChart;