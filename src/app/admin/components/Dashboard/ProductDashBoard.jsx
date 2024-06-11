import React from "react";
import { Line, Bar } from "react-chartjs-2";
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
    plugins
} from "chart.js";
import { chartData } from "./mockChartData"
import { GetAllProduct } from "@/services/productService";
import CommonUtil from "@/common/commonUtils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend)

export default function ProductDashBoard() {
    const { productData, isLoading, isError } = GetAllProduct();
    const result = CommonUtil.getCountByData(productData, "category")

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {

                display: true,
                text: "Total of products"
            }
        }
    }
    const productOverviewData = {
        labels: ["Shoes", "Clothings", "Accessories and Equipment"],
        datasets: [{
            label: 'Item',
            data: result,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div className="dark:text-textDark">

            <h1 className="my-6 text-2xl font-semibold">Product Dashboard</h1>
            <h2 className="mb-4 text-xl ">Product statics</h2>

            <Bar options={options} data={productOverviewData} />

            <h2 className="mb-4 mt-16 text-xl ">Product sales</h2>
            <Line options={options} data={chartData} />


        </div>
    );
}
