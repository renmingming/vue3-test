<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ state.time }}</p>
    <button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>
    <div>鼠标X：{{ state.x }};鼠标Y: {{ state.y }}</div>
    <div><span @click="timeStart">点击开始倒计时</span>：{{ state.countdownVal }}</div>
    <br>
    <div>
      state2.num: <input type="text" v-model="state2.num">
      {{ state2.num }}<br><br>
      ref2: <input type="text" v-model="ref2">{{ref2}}<br><br>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { useMousePosition } from '../utils/mouse'
import { useCountdown } from '../utils/useCountdown'
import timeToText from 'time-to-text'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props, context) {
    console.log(props);
    console.log(context);
    const countdown = useCountdown();
    const state = reactive({
      count: 0,
      double: computed({
        get: () => state.count * 2,
        set: val => {
          console.log(val)
          state.count = val + 2
        }
      }),
      x: useMousePosition().x,
      y: useMousePosition().y,
      countdownVal: countdown.count,
      countdownStart: countdown.start,
      countdownState: countdown.state,
      time: timeToText(1585540800)
    })

    const timeStart = () => {
      state.countdownStart(10);
      state.double = 4;
    }
    onMounted(() => {
      console.log('component is mounted!')
    })

    function increment() {
      state.count++
    }

    const state2 = reactive({num: ''})
    const ref2 = ref('ref2');
    watch(
      () => state2.num,
      () => {
        // 只有是state2改变时
        console.log('state2.num', state2.num)
        console.log('ref2.value', ref2.value)
      }
    )

    watch(ref2, () => {
      // 只有ref2改变时才触发
      console.log('count:', state.count)
      console.log(('ref2.value', ref2.value))
    })

    return {
      state,
      increment,
      timeStart,
      state2,
      ref2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
