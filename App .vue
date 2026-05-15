<template>
  <div class="dashboard dark-theme">
    <header>
      <h1>🛡️ Sentinel Analytics <span class="live-tag">LIVE</span></h1>
      <button @click="store.isPaused = !store.isPaused">
        {{ store.isPaused ? '▶️ Resume' : '⏸️ Pause' }}
      </button>
    </header>

    <main class="grid">
      <section class="chart-card">
        <h3>Threat Detection Frequency</h3>
        <RealTimeChart />
      </section>

      <section class="feed-card">
        <h3>Activity Feed</h3>
        <div class="log-list">
          <div v-for="log in store.logs" :key="log.id" :class="['log-item', log.type]">
            <span class="time">[{{ log.time }}]</span> {{ log.message }}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useDashboardStore } from './stores/useDashboardStore';
import RealTimeChart from './components/RealTimeChart.vue';

const store = useDashboardStore();

let interval: number;

onMounted(() => {
  // Simulate incoming Data Stream
  interval = window.setInterval(() => {
    if (!store.isPaused) {
      const val = Math.floor(Math.random() * 100);
      store.addDataPoint({ timestamp: Date.now(), value: val });
      
      if (val > 85) {
        store.addLog(`High threat level detected: ${val}%`, 'critical');
      }
    }
  }, 1000);
});

onUnmounted(() => clearInterval(interval));
</script>

<style>
.dark-theme { background: #0a0a0a; color: white; min-height: 100vh; font-family: sans-serif; padding: 20px; }
.grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-top: 20px; }
.chart-card, .feed-card { background: #161616; padding: 20px; border-radius: 12px; border: 1px solid #333; }
.live-tag { color: #ff0055; font-size: 0.5em; vertical-align: middle; animation: blink 1s infinite; }
.log-item { padding: 8px; border-bottom: 1px solid #222; font-size: 0.9em; }
.critical { color: #ff4444; border-left: 3px solid #ff4444; }
@keyframes blink { 50% { opacity: 0; } }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
</style>