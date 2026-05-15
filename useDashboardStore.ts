import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface MetricPoint {
  timestamp: number;
  value: number;
}

export const useDashboardStore = defineStore('dashboard', () => {
  const cpuUsage = ref<MetricPoint[]>([]);
  const logs = ref<{id: string, message: string, type: string, time: string}[]>([]);
  const isPaused = ref(false);

  // Keep only the last 50 points to prevent memory leaks
  const addDataPoint = (point: MetricPoint) => {
    if (isPaused.value) return;
    
    cpuUsage.value.push(point);
    if (cpuUsage.value.length > 50) {
      cpuUsage.value.shift();
    }
  };

  const addLog = (msg: string, type: 'info' | 'warning' | 'critical') => {
    logs.value.unshift({
      id: Math.random().toString(36),
      message: msg,
      type,
      time: new Date().toLocaleTimeString()
    });
    if (logs.value.length > 20) logs.value.pop();
  };

  return { cpuUsage, logs, isPaused, addDataPoint, addLog };
});