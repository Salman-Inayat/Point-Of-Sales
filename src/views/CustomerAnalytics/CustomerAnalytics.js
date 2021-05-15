import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import '../../App.css'
import axios from "axios"
    
const CustomerAnalytics = () => {

  const [lineGraph, setLineGraph] = useState([])
  const [barChart, setBarChart] = useState([])
  const [doughnutChart, setDoughnutChart] = useState([])
  const [pieChart, setPieChart] = useState([])
  const [multiBarChart, setMultiBarChart] = useState([])
  const [multiLineGraph, setMultiLineGraph] = useState([])

  useEffect(() => {
    fetchLineGraph(); 
    fetchBarChart();   
    fetchDoughnutChart();
    fetchPieChart();
    fetchMultiBarChart();
    fetchMultiLineGraph();
  }, [])

  const fetchLineGraph = async () => {
    const response = await  axios.get("http://localhost:10000/linegraph");
    setLineGraph(response.data[0])
  }

  const fetchBarChart = async () => {
    const response = await  axios.get("http://localhost:10000/barchart");
    setBarChart(response.data[0])
  }

  const fetchDoughnutChart = async () => {
    const response = await  axios.get("http://localhost:10000/doughnutchart");
    setDoughnutChart(response.data[0])
  }

  const fetchPieChart = async () => {
    const response = await  axios.get("http://localhost:10000/piechart");
    setPieChart(response.data[0])
  }

  const fetchMultiBarChart = async () => {
    const response = await  axios.get("http://localhost:10000/multibarchart/");
    setMultiBarChart(response.data[0])
  }

  const fetchMultiLineGraph = async () => {
    const response = await  axios.get("http://localhost:10000/multilinegraph/");
    setMultiLineGraph(response.data[0])
  }

const linedata = {
  labels: lineGraph.label,
  datasets: [
    {
      label: "Average Customers Per Hour",
      data: lineGraph.data,
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const piedata = {
    labels: pieChart.label,
    datasets: [
      {
        label: 'Gender Ration',
        data: pieChart.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const bardata = {
    labels: barChart.label,
    datasets: [
      {
        label: 'Age Distribution',
        data: barChart.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
  }

  const doughnutdata = {
    labels: doughnutChart.label,
    datasets: [
      {
        label: '# of Votes',
        data: doughnutChart.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
  }

  const multibardata = {
    labels: multiBarChart.label,
    datasets: [
      {
        label: 'Men',
        data: multiBarChart.bar1data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
      {
        label: 'Women',
        data: multiBarChart.bar2data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
  }
  
  const multilinedata = {
    labels: multiLineGraph.label,
    datasets: [
      {
        label: "Angry",
        data: multiLineGraph.line1data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Calm",
        data: multiLineGraph.line2data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Disgusted",
        data: multiLineGraph.line3data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Happy",
        data: multiLineGraph.line4data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const LineChart = () => (
    <>
      <Line data={linedata} options={options} />
    </>
  );

  const PieChart = () => (
    <>
      <Pie data={piedata} />
    </>
  )

    
  const VerticalBar = () => (
    <>
      <Bar data={bardata} options={options} />
    </>
  )

  const DoughnutChart = () => (
    <>
      <Doughnut data={doughnutdata} />
    </>
  )

  const MultiBarChart = () => (
    <>
      <Bar data={multibardata} />
    </>
  )

  const MultiLineGraph = () => (
    <>
      <Line data={multilinedata} options={options} />
    </>
  );


  return (
    <div style={{padding:'30px'}}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} sm={12}>
          <LineChart />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <PieChart />
        </Grid>
        <br/>
        <br/>
        <br/>
        <Grid item xs={12} md={6} sm={12}>
          <VerticalBar />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <MultiBarChart />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <MultiLineGraph />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerAnalytics;
