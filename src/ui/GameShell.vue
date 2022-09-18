<template>
  <canvas ref="canvas"/>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Game} from "../game";

const game = ref<Game>();
const canvas = ref<HTMLCanvasElement>();

const resize = () => {
  game.value?.world.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
}

onMounted(() => {
  const gameInstance = new Game(canvas.value!);
  gameInstance.renderer.setAnimationLoop(gameInstance.render);

  window.addEventListener('resize', resize);
  game.value = gameInstance;
  resize();
});

onUnmounted(() => {
  if (game.value) {
    game.value.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', resize);
  }
})
</script>
