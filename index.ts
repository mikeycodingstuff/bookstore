import { Command } from 'commander'
import { setupAddCommand } from './src/commands/add'
import { setupSearchCommand } from './src/commands/search'
import { setupGetCommand } from './src/commands/get'
import { setupDeleteCommand } from './src/commands/delete'

const program = new Command()

setupAddCommand(program)
setupSearchCommand(program)
setupGetCommand(program)
setupDeleteCommand(program)

await program.parseAsync(process.argv)
