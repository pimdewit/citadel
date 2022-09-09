<template>
  <canvas ref="canvas"/>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Game} from "../game";

const game = ref<Game>();
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const gameInstance = new Game(canvas.value!);
  gameInstance.render();

  window.addEventListener('resize', gameInstance.resize);
  gameInstance.resize();
  game.value = gameInstance;
});

onUnmounted(() => {
  if (game.value) window.removeEventListener('resize', game.value.resize);
})
</script>
