<template>
  <div class="virtual-list-container" @scroll="handleScroll" ref="container">
    
    <div class="virtual-list"  ref="listRef">
      <slot></slot>
    </div>
    <div class="scroll-bar">

    </div>
    
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
// import { debounce, throttle } from '@/utils';
defineOptions({
  name: 'VdVirtualList'
})
let container = ref()
let listRef = ref()
let childElements = ref()
let containerHeight = ref(0)
let itemHeight = ref(0)
let lastChild = ref()
const totalHeight = computed(() => {
  return `${childElements.value?.length * itemHeight.value}px`
})

onMounted(() => {
  childElements.value = listRef.value.children
  containerHeight.value = container.value.clientHeight
  lastChild.value = childElements.value[childElements.value.length-1]
  itemHeight.value = lastChild.value.clientHeight
  display(0,20)
})
const scrollTop = ref(0)
const cache = 10
const displayArr = ref([])
const top = computed(()=>{
  return `${Math.max(0,scrollTop.value - cache*itemHeight.value)}px`
})
const startIndex = computed(()=>{
  return Math.max(0,Math.floor(scrollTop.value / itemHeight.value) - cache)
})
const endIndex = computed(()=>{
  let index = Math.floor(startIndex.value + containerHeight.value / itemHeight.value) + 2*cache
  let length = childElements.value?.length - 1
  return Math.min(length,index)
})

const handleScroll = throttle2((event) => {
  scrollTop.value = container.value.scrollTop
  display(startIndex.value, endIndex.value)
}, 100)

const display = (start, end) => {
  let [block,none] = [
    displayArr.value.filter((index)=>{
      return index>=start&&index<=end
    }),
    displayArr.value.filter((index)=>{
      return !(index>=start&&index<=end)
    })
  ]
  none.forEach((index)=>{
    childElements.value[index].style.display = 'none'
  })
  displayArr.value = block
  Array.from(childElements.value).slice(start, end).forEach((element, index) => {
    displayArr.value.push(start+index)
    element.style.display = 'block'
  });
  lastChild.value.style.visibility = 'visible'

}
</script>
<style scoped>
.virtual-list-container {
  position: relative;
  height: 800px;
  width: 100%;
  overflow: scroll;
  display: flex;
}

.virtual-list {
  position:absolute;
  width: 100%;
  height: 800px;
  top: v-bind(top);
}
.virtual-list > *:not(:last-child){
  display: none;
}
.scroll-bar {
  width: 0;
  height: v-bind(totalHeight)
}
</style>