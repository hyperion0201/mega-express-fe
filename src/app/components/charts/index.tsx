"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

     const data = {
        labels: ['Hoàn hàng', 'Đang chờ lấy hàng', 'Lấy hàng thành công', 'Đơn hoàn thành', 'Chưa giao hàng thành công', 'Hủy đơn'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'red',
              'lightblue',
              'blue',
             'green',
              'orange',
              'black',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return (
        <Pie height={400} width={400} data={data} options={{maintainAspectRatio: false}} />
    )
}

export default PieChart