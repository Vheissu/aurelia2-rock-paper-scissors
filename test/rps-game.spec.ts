import { assert, createFixture } from '@aurelia/testing';
import { RPSGame } from '../src/components/rps-game';
import { bootstrapTestEnvironment } from './setup';
import { CustomElement } from 'aurelia';

describe('RPSGame component', () => {
  beforeAll(() => {
    bootstrapTestEnvironment();
  });

  it('initialises with default values', async () => {
    const { startPromise, assertText } = await createFixture(
      `<rps-game></rps-game>`,
      class App {},
      [RPSGame]
    );

    await startPromise;

    assertText('h1', 'Rock Paper Scissors', { compact: true });
  });

  it('plays a single game correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<rps-game></rps-game>`,
      class App {},
      [RPSGame]
    );

    await startPromise;

    const rpsGame = appHost.querySelector('rps-game');
    const component = CustomElement.for(rpsGame).viewModel as RPSGame;

    // Simulate playing rock
    component.play('rock');

    ctx.platform.domQueue.flush();

    assert.notStrictEqual(component.playerChoice, null);
    assert.notStrictEqual(component.computerChoice, null);
    assert.notStrictEqual(component.result, null);
  });

  it('resets the game correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<rps-game></rps-game>`,
      class App {},
      [RPSGame]
    );

    await startPromise;

    const rpsGame = appHost.querySelector('rps-game');
    const component = CustomElement.for(rpsGame).viewModel as RPSGame;

    component.play('rock');
    ctx.platform.domQueue.flush();

    component.reset();
    ctx.platform.domQueue.flush();

    assert.strictEqual(component.playerChoice, null);
    assert.strictEqual(component.computerChoice, null);
    assert.strictEqual(component.result, null);
  });

  it('changes game mode correctly', async () => {
    const { appHost, startPromise, ctx } = await createFixture(
      `<rps-game></rps-game>`,
      class App {},
      [RPSGame]
    );

    await startPromise;

    const rpsGame = appHost.querySelector('rps-game');
    const component = CustomElement.for(rpsGame).viewModel as RPSGame;

    component.setGameMode('bestOfThree');
    ctx.platform.domQueue.flush();

    assert.strictEqual(component.gameMode, 'bestOfThree');
    assert.strictEqual(component.playerScore, 0);
    assert.strictEqual(component.computerScore, 0);
  });
});