import { Command } from 'commander'
import { setupAddCommand } from './commands/add'
import { setupSearchCommand } from './commands/search'
import { setupGetCommand } from './commands/get'
import { setupDeleteCommand } from './commands/delete'

const program = new Command()

setupAddCommand(program)
setupSearchCommand(program)
setupGetCommand(program)
setupDeleteCommand(program)

await program.parseAsync(process.argv)
