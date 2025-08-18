export type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  round?: boolean
  circle?: boolean
  block?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}