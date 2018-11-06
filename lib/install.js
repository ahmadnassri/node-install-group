const { spawn } = require('child_process')

module.exports = (packages, argv) => {
  // construct npm install command
  let args = ['install']

  // attach cli arguments
  args = args.concat(argv)

  // list all packages
  args = args.concat(packages)

  // display the command we're gonna run
  console.log('npm', args.join(' '), '\n')

  // run
  spawn('npm', args, { stdio: 'inherit' })
}
