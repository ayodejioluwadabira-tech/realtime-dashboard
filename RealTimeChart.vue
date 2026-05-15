<template>
  <div class="chart-container">
    <apexchart
      type="area"
      height="350"
      ref="chartRef"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDashboardStore } from '../stores/useDashboardStore';

const store = useDashboardStore();
const chartRef = ref(null);

const series = computed(() => [{
  name: 'System Load',
  data: store.cpuUsage.map(p => p.value)
}]);

const chartOptions = {
  chart: {
    id: 'realtime',
    animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 500 } },
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  colors: ['#00ff88'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: store.cpuUsage.map(p => new Date(p.timestamp).toLocaleTimeString()),
    labels: { show: false }
  },
  yaxis: { max: 100, min: 0 },
  grid: { borderColor: '#333' },
  theme: { mode: 'dark' }
};
</script>