import { WriteStream } from 'tty'
import cliSpinners, { Spinner } from 'cli-spinners'
import wcwidth from 'wcwidth'
import chalk from 'chalk'

const ansiRegex = ({ onlyFirst = false } = {}) => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|')

  return new RegExp(pattern, onlyFirst ? undefined : 'g')
}

const stripAnsi = (string: string) => {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``)
  }

  return string.replace(ansiRegex(), '')
}

export enum SpinnerState {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export class Multispinner {
  private readonly lines: { [s: string]: SpinnerState } = {}
  private stream: WriteStream
  private interval: any
  private indent: number = 0
  private spinner: Spinner = cliSpinners.dots
  private frameIndex: number = 0
  private linesToClear: number = 0

  constructor(lines: string[]) {
    lines.forEach((line) => (this.lines[line] = SpinnerState.PENDING))
    this.stream = process.stderr

    this.start()
  }

  changeState(line: string, state: SpinnerState) {
    this.lines[line] = state
  }

  start() {
    this.interval = setInterval(this.render.bind(this), 80)
  }

  frame() {
    const { frames } = this.spinner

    this.frameIndex = ++this.frameIndex % frames.length

    const frame = frames[this.frameIndex]

    const block = Object.keys(this.lines)
      .map(
        (lineKey) =>
          `${
            this.lines[lineKey] === SpinnerState.IN_PROGRESS
              ? `${frame} `
              : this.lines[lineKey] === SpinnerState.SUCCESS
                ? '🚀'
                : '  '
          } ${lineKey} ${chalk[
            this.lines[lineKey] === SpinnerState.FAIL
              ? 'red'
              : this.lines[lineKey] === SpinnerState.IN_PROGRESS
                ? 'yellow'
                : this.lines[lineKey] === SpinnerState.SUCCESS
                  ? 'green'
                  : 'grey'
          ](this.lines[lineKey])}`,
      )
      .join('\n')

    this.linesToClear = this.getLineCount(block)

    return block
  }

  render() {
    // TODO check all lines completed?
    this.clear()
    this.stream.write(this.frame())

    return this
  }

  clear() {
    if (!this.stream.isTTY) {
      return this
    }

    for (let i = 0; i < this.linesToClear; i++) {
      if (i > 0) {
        this.stream.moveCursor(0, -1)
      }

      this.stream.clearLine(1)
      this.stream.cursorTo(this.indent)
    }
  }

  getLineCount(block: string): number {
    const columns = this.stream.columns || 80
    let lineCount = 0
    for (const line of stripAnsi(block).split('\n')) {
      lineCount += Math.max(1, Math.ceil(wcwidth(line) / columns))
    }

    return lineCount
  }

  get allCompleted(): boolean {
    return Object.values(this.lines).every((state) => [SpinnerState.SUCCESS, SpinnerState.FAIL].includes(state))
  }
}
