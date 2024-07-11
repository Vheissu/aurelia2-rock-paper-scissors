// rps-game.ts
import { bindable } from 'aurelia';

// @ts-expect-error The image exists, Typescript doesn't know that
import rockImage from '../images/rock.svg';
// @ts-expect-error The image exists, Typescript doesn't know that
import paperImage from '../images/paper.svg';
// @ts-expect-error The image exists, Typescript doesn't know that
import scissorsImage from '../images/scissors.svg';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

export class RPSGame {
  @bindable() playerChoice: Choice | null = null;
  @bindable() computerChoice: Choice | null = null;
  @bindable() result: Result | null = null;
  @bindable() playerScore: number = 0;
  @bindable() computerScore: number = 0;
  @bindable() gameMode: 'single' | 'bestOfThree' = 'single';
  @bindable() roundsPlayed: number = 0;
  @bindable() gameOver: boolean = false;
  @bindable() finalResult: string = '';

  choices = [
    { name: 'rock', image: rockImage },
    { name: 'paper', image: paperImage },
    { name: 'scissors', image: scissorsImage },
  ];

  play(playerChoice: Choice) {
    // Check if there's already a result or if the game is over
    if (this.result !== null || this.gameOver) {
      return;
    }
  
    this.playerChoice = playerChoice;
    this.computerChoice = this.getComputerChoice();
    this.result = this.getResult(this.playerChoice, this.computerChoice);
    
    if (this.gameMode === 'bestOfThree') {
      this.updateScore();
      this.roundsPlayed++;
  
      if (this.playerScore === 2 || this.computerScore === 2) {
        this.gameOver = true;
        this.finalResult = this.playerScore > this.computerScore ? 'You win the series!' : 'Computer wins the series!';
      }
    }
  }

  protected getRandomChoice(): Choice {
    return this.choices[Math.floor(Math.random() * this.choices.length)].name as Choice;
  }

  getComputerChoice(): Choice {
    return this.getRandomChoice();
  }

  getResult(player: Choice, computer: Choice): Result {
    if (player === computer) {
      return 'draw';
    }

    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  }

  updateScore() {
    if (this.result === 'win') {
      this.playerScore++;
    } else if (this.result === 'lose') {
      this.computerScore++;
    }
  }

  reset() {
    this.playerChoice = null;
    this.computerChoice = null;
    this.result = null;
    
    if (this.gameMode === 'bestOfThree' && this.gameOver) {
      // Only reset scores and game state if the game is over
      this.playerScore = 0;
      this.computerScore = 0;
      this.roundsPlayed = 0;
      this.gameOver = false;
      this.finalResult = '';
    } else if (this.gameMode === 'single') {
      // Reset everything for single game mode
      this.playerScore = 0;
      this.computerScore = 0;
      this.roundsPlayed = 0;
      this.gameOver = false;
      this.finalResult = '';
    }
  }

  setGameMode(mode: 'single' | 'bestOfThree') {
    this.gameMode = mode;
    this.reset();
  }
}
