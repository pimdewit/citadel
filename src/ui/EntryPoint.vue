<template>
  <div class="game-wrapper">
    <GameShell/>
    <div class="game-hud">
      <GameHud/>
    </div>
  </div>
</template>

<script lang="ts">
import GameHud from "./GameHud.vue";
import GameShell from "./GameShell.vue";

export default {
  components: {GameHud, GameShell}
}
</script>

<style lang="scss" scoped>
.game-wrapper {
  display: grid;
  height: 100%;
  grid-template-areas: 'cell';

  > * {
    grid-area: cell;
  }
}

.game-hud {
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}
</style>