<script lang="ts" setup>
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { throttle } from '@/utils'
defineOptions({
  name: 'VdWaterFall'

})

const props = defineProps({
    minWidth: {
        type: Number,
        default: 250
    }
})
const minWidth = ref<number>(props.minWidth)
const columnCount = ref(10)
const margin = ref(16)
const width = ref(0)
const height = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const containerRef = ref<HTMLElement | null>(null)
let containerElement: HTMLElement | undefined
let childElements: HTMLCollection | undefined
let visibility = ref<boolean[]>([])


const sortElement = function () {
    visibility.value = []
    height.value.fill(0, 0, 10)
    columnCount.value = 10
    
    while (columnCount.value) {
        if (containerRef.value) {
            width.value = containerRef.value.clientWidth / columnCount.value - margin.value
        }
        if (width.value > minWidth.value) {
            break
        }
        columnCount.value--
    }
    for (let i = 0; i < (childElements?.length as number); i++) {
        if (childElements) {
            visibility.value.push(false)
            const currentElement = childElements[i] as HTMLElement;
            currentElement.style.position = 'absolute';
            currentElement.style.display = 'inline-block';
            currentElement.style.width = width.value + 'px';
            // console.log(currentElement.style)
            // console.log(currentElement.style.left)
            const index = getMinIndex(height.value, columnCount.value);
            // currentElement.style.transform = `translate(${index * (width.value + margin.value)}px,${height.value[index]}px)`
            currentElement.style.left = index * (width.value + margin.value) + 'px';
            currentElement.style.top = height.value[index] + 'px';
            height.value[index] += currentElement.clientHeight + margin.value;
            visibility.value[i] = true
        }
    }
    let maxHeight = Math.max(...height.value)
    if (containerElement) containerElement.style.height = maxHeight + 2 * margin.value + 'px'
};

const getMinIndex = function (height: any, len: any) {
    let min = 2147483647
    let index = 0
    for (let i = 0; i < len; i++) {
        if (min > height[i]) {
            min = height[i]
            index = i
        }
    }
    return index
}
const resizeObserver = new ResizeObserver((entries) => {
    reSort()
});
onMounted(() => {
    if (containerRef.value) {
        containerElement = containerRef.value as HTMLElement
        childElements = containerElement.children as HTMLCollection
        for (let i = 0; i < (childElements?.length as number); i++) {
            let currentElement = childElements[i] as HTMLElement
            // currentElement.style.position = 'absolute';
            // currentElement.style.top = '0'
            // currentElement.style.left = '0'
            resizeObserver.observe(currentElement)
        }
    }
    // onresize('resize', function () { 
    //     reSort()
    // })


})
onUnmounted(() => {
    window.removeEventListener('resize', function () { reSort() })
})

const reSort = throttle(sortElement,50)

</script>

<template>
    <div class="waterFall-container" ref="containerRef">
        <slot></slot>
    </div>
</template>
<style scoped>
.waterFall-container {
    position: relative;
    width: 100%;
    /* height: 100vh; */
}
</style>