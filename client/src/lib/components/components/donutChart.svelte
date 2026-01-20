<script>
  import { onMount, onDestroy } from "svelte";
  import { Chart, DoughnutController, ArcElement } from "chart.js";

  Chart.register(DoughnutController, ArcElement);

  export let labels = ["Courses", "Electricité", "Loisir"];
  export let values = [300, 150, 80];

  let canvas;
  let chart;

  const colors = [
    "#22c55e",
    "#facc15",
    "#ef4444",
    "#3b82f6",
    "#a855f7",
    "#14b8a6",
  ];

  function updateChart() {
    if (!chart) return;

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = labels.map(
      (_, i) => colors[i % colors.length],
    );

    chart.update();
  }

  onMount(() => {
    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            borderWidth: 0,
            backgroundColor: labels.map((_, i) => colors[i % colors.length]),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        events: [],
      },
    });
  });

  $: labels, values, updateChart();

  onDestroy(() => {
    chart?.destroy();
  });
</script>

<div class="chartBox">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chartBox {
    height: 300px;
    margin: 3em 0;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
