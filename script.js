'use strict';
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
let active_player = { active: 'player_0' };
const score_player_map = { player_0: 'score_0', player_1: 'score_1' };
const current_0 = document.getElementById('current--0');
const current_1 = document.getElementById('current--1');
const current_player_map = { player_0: 'current_0', player_1: 'current_1' };
const new_btn = document.querySelector('.btn--new');
const roll_btn = document.querySelector('.btn--roll');
const hold_btn = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

function player_0_set_active(player_0, player_1, active_player) {
  player_1.classList.remove('player--active');
  player_0.classList.add('player--active');
  active_player.active = 'player_0';
}

function player_1_set_active(player_0, player_1, active_player) {
  player_0.classList.remove('player--active');
  player_1.classList.add('player--active');
  active_player.active = 'player_1';
}

function change_active(player_0, player_1, active_player) {
  if (player_0.classList.contains('player--active')) {
    player_1_set_active(player_0, player_1, active_player);
  } else {
    player_0_set_active(player_0, player_1, active_player);
  }
}

function roll_dice(
  dice,
  player_0,
  player_1,
  active_player,
  current_player_map,
  change_active
) {
  let num = 0;
  while (num === 0) {
    num = Math.ceil(Math.random() * 6);
  }
  dice.src = `dice-${num}.png`;
  if (num === 1) {
    eval(current_player_map[active_player.active]).textContent = '0';
    change_active(player_0, player_1, active_player);
  } else {
    eval(current_player_map[active_player.active]).textContent =
      Number(eval(current_player_map[active_player.active]).textContent) + num;
  }
  return num;
}

function hold(
  current_player_map,
  score_player_map,
  active_player,
  change_active,
  player_0,
  player_1
) {
  eval(score_player_map[active_player.active]).textContent =
    Number(eval(score_player_map[active_player.active]).textContent) +
    Number(eval(current_player_map[active_player.active]).textContent);
  eval(current_player_map[active_player.active]).textContent = '0';
  change_active(player_0, player_1, active_player);
}

function new_game(
  score_0,
  score_1,
  player_0,
  player_1,
  current_0,
  current_1,
  player_0_set_active,
  active_player
) {
  score_0.textContent = '0';
  score_1.textContent = '0';
  player_0_set_active(player_0, player_1, active_player);
  current_0.textContent = '0';
  current_1.textContent = '0';
}

roll_btn.addEventListener(
  'click',
  roll_dice.bind(
    null,
    dice,
    player_0,
    player_1,
    active_player,
    current_player_map,
    change_active
  )
);
hold_btn.addEventListener(
  'click',
  hold.bind(
    null,
    current_player_map,
    score_player_map,
    active_player,
    change_active,
    player_0,
    player_1
  )
);
new_btn.addEventListener(
  'click',
  new_game.bind(
    null,
    score_0,
    score_1,
    player_0,
    player_1,
    current_0,
    current_1,
    player_0_set_active,
    active_player
  )
);

new_game(
  score_0,
  score_1,
  player_0,
  player_1,
  current_0,
  current_1,
  player_0_set_active,
  active_player
);

console.log(
  toString(
    Number(eval(current_player_map[active_player.active]).textContent) + 5
  )
);
