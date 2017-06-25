/* @flow */
export default function repeat (repetitions: number, action: () => void): void {
  if (repetitions < 1) {
    return
  }
  action()
  return repeat(repetitions - 1, action)
}
