<template>
  <div class="about">
    <h1>This is an about page</h1>
    <canvas id="canvas" width="700" height="600" style="border: solid 1px #dfdfdf;"></canvas>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import canvasDiagram from 'canvas-diagram'
export default {
  name: 'About',
  setup() {
    onMounted(() => {
      let canvas = new canvasDiagram({
        rectWidth: 80,
        rectHeight: 24,
        clickCallback:function(res) {
          console.log(res.text);
        }
      });
      canvas.updateData('李健军');
    })
  }
}
</script>