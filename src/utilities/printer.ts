import chalk, {
  type ForegroundColorName,
  type BackgroundColorName,
  type ModifierName,
} from 'chalk'

const error = (name: string, message: string) => {
  console.error(chalk.white.bgRed(`${name}:`), `\n${message}`)
}

const formatMessage = (
  message: string,
  chalkModifiers: Array<
    ForegroundColorName | BackgroundColorName | ModifierName
  > = ['white'],
) => {
  if (!Array.isArray(chalkModifiers) || chalkModifiers.length === 0) {
    error(
      'Invalid color commands',
      'Please provide an array of Chalk color/modifier functions.',
    )
    return
  }

  let coloredMessage = message
  for (const command of chalkModifiers) {
    if (!chalk[command]) {
      error('Error', `Invalid chalk color/modifier: ${command}`)
      return
    }
    coloredMessage = chalk[command](coloredMessage)
  }

  return coloredMessage
}

const line = (
  key: string,
  value: string,
  chalkModifiers: Array<
    ForegroundColorName | BackgroundColorName | ModifierName
  > = ['white'],
) => {
  const styledKey = formatMessage(key, chalkModifiers)
  console.log(`${styledKey}: ${value}`)
}

const lines = (
  lines: Array<string>,
  chalkModifiers: Array<
    ForegroundColorName | BackgroundColorName | ModifierName
  > = ['white'],
) => {}

const log = (
  message: string,
  chalkModifiers: Array<
    ForegroundColorName | BackgroundColorName | ModifierName
  > = ['white'],
) => console.log(formatMessage(message, chalkModifiers))

const printer = {
  error,
  log,
  line,
}

export default printer
