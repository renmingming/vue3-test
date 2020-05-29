import { ref } from '@vue/composition-api'

export const useCountdown = function (initialCount = 60) {
  const count = ref(initialCount) // 当前倒计时值
  const state = ref(false) // 当前状态是否在倒计时中
  const start = function (initCount) {
    // 这里的this指向调用他的地方，如果是箭头函数也为undefined
    state.value = true;
    if (initCount > 0) {
      count.value = initCount
    }
    if (!count.value) {
      count.value = initialCount
    }
    const interval = setInterval(() => {
      if (count.value === 0) {
        clearInterval(interval);
        state.value = false;
      } else {
        count.value--;
      }
    }, 1000)
  }
  return {
    count,
    start,
    state
  }
}
