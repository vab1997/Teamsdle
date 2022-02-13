import { bgGreen, bgYellow, bold, white, bgBrightBlack } from './deps.ts'
import { TEAMS_FUTBOL } from './constant.ts'

const MAX_TRIES = 6

const previosGuesses: Array<string> = []
const ramdomId = Math.floor(Math.random() * TEAMS_FUTBOL.length)

let globalResults = ''
const team = TEAMS_FUTBOL[ramdomId]

function askWord() {
  const response = prompt('the Team is...')
  
  if (response == null) {
    return { error: '✏ you must provide a possible team name' }
  } else if (response.length !== team.length) {
    return { error: '📏 the team name must be ' + team.length + ' characters long' }
  } else if (previosGuesses.includes(response.toUpperCase())) {
    return { error: '📋 you already guessed this team name' }
  } else if (!/^[a-zA-Z]+$/.test(response)) {
    return { error: '📋 the team name must be contain only letters' }
  }

  return { response: response.toUpperCase() }
}

const colorMethods = {
  green: bgGreen,
  yellow: bgYellow,
  gray: bgBrightBlack
}

function colorLetter(color: 'green' | 'yellow' | 'gray', letter: string) {
  const bg = colorMethods[color]
  const letterColor = bg(bold(` ${white(letter)} `))
  return ` ${letterColor} `
} 

function print(guess: string) {
  console.clear()

  let results = ''
  const letters: Array<string> = [...guess]

  letters.forEach((letter, index) => {
    if (letter === team[index]) {
      results += colorLetter('green', letter)
    } else if (team.includes(letter)) {
      results += colorLetter('yellow', letter)
    } else {
      results += colorLetter('gray', letter)
    }

  })
  globalResults = `${results}\n`
  console.log(globalResults)
}

function start(tries: number) {
  let guess = ''

  if (tries >= MAX_TRIES) {
    console.log('💣 you lost')
    console.log('💣 the pokemon was ' + team)
    return
  }

  while (guess === '') {
    const { error, response } = askWord()
    if (error) {
      console.log(error)
      continue
    }
  
    if (response) guess = response 
  }
  
  if (guess === team) {
    print(guess)
    console.log('🎉 you won')
  } else {
    print(guess)
    console.log('💣 wrong')
    tries++
    start(tries++)
  }
}

console.log('🎮 guess the Team name')
console.log(`💡Hint: It has ${team.length} characters`)

start(0)