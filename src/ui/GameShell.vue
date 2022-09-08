<template>
  <canvas ref="canvas"/>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Game} from "../game";

const game = ref<Game>();
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  game.value = new Game(canvas.value!);
  game.value.render();

  window.addEventListener('resize', game.value.resize);
  game.value.resize();
});

onUnmounted(() => {
  if (game.value) window.removeEventListener('resize', game.value.resize);
})
</script>
