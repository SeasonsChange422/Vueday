<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="vd-button__loading">
      <svg class="vd-button__loading-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
          <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
        </circle>
      </svg>
    </span>
    <span v-if="!circle" class="vd-button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps, ButtonEmits } from './types'

defineOptions({
  name: 'VdButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  round: false,
  circle: false,
  block: false
})

const emit = defineEmits<ButtonEmits>()

const buttonClass = computed(() => {
  return [
    'vd-button',
    `vd-button--${props.type}`,
    `vd-button--${props.size}`,
    {
      'vd-button--disabled': props.disabled,
      'vd-button--loading': props.loading,
      'vd-button--round': props.round,
      'vd-button--circle': props.circle,
      'vd-button--block': props.block
    }
  ]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.vd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  outline: none;
  padding: 8px 16px;
  text-align: center;
  transition: all 0.2s;
  user-select: none;
  white-space: nowrap;
}

/* 按钮类型样式 */
.vd-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.vd-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.vd-button--secondary {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
}

.vd-button--secondary:hover {
  background-color: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}

.vd-button--success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.vd-button--success:hover {
  background-color: #85ce61;
  border-color: #85ce61;
}

.vd-button--warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.vd-button--warning:hover {
  background-color: #ebb563;
  border-color: #ebb563;
}

.vd-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}

.vd-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

/* 按钮尺寸样式 */
.vd-button--small {
  font-size: 12px;
  padding: 6px 12px;
}

.vd-button--medium {
  font-size: 14px;
  padding: 8px 16px;
}

.vd-button--large {
  font-size: 16px;
  padding: 10px 20px;
}

/* 按钮状态样式 */
.vd-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.vd-button--loading {
  cursor: not-allowed;
}

.vd-button--round {
  border-radius: 20px;
}

.vd-button--circle {
  border-radius: 50%;
  padding: 8px;
  width: 32px;
  height: 32px;
}

.vd-button--circle.vd-button--small {
  width: 24px;
  height: 24px;
  padding: 6px;
}

.vd-button--circle.vd-button--large {
  width: 40px;
  height: 40px;
  padding: 10px;
}

.vd-button--block {
  display: flex;
  width: 100%;
}

/* 加载动画样式 */
.vd-button__loading {
  margin-right: 4px;
}

.vd-button__loading-icon {
  width: 14px;
  height: 14px;
  animation: vd-button-loading 1s linear infinite;
}

@keyframes vd-button-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.vd-button__text {
  display: inline-block;
}
</style>