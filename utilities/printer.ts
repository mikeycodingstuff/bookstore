import chalk, { type ForegroundColorName } from 'chalk'

const printer = {
  error: (name: string, message: string) => {
    console.error(chalk.white.bgRed(`${name}:`), message)
  },
  log: (message: string, color: ForegroundColorName = 'white') => {
    console.log(chalk[color](message))
  },
}

export default printer
