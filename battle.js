console.log("hello");
const battletext = document.getElementById("battletext");

async function timer(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
async function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const protagonist = {
  pokemon: [],
  activePokemon: null,
  currentMove: null,
  numPokemon: null,
};

const antagonist = {
  pokemon: [],
  activePokemon: null,
  currentMove: null,
  numPokemon: null,
};

async function getPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();

  const pokemon = {
    id: 1,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    hp: 45,
    lvlhp: 100,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    front: null,
    frontGIF: null,
    back: null,
    backGIF: null,
    moves: [],
    types: [],
  };

  pokemon.id = data.id;
  pokemon.name = data.name;
  pokemon.image = data.sprites.front_default;
  pokemon.front = data.sprites.front_default;
  pokemon.frontGIF = data.sprites.other.showdown.front_default;
  pokemon.back = data.sprites.back_default;
  pokemon.backGIF = data.sprites.other.showdown.back_default;
  pokemon.hp = data.stats[0].base_stat;
  (pokemon.lvlhp =
    Math.floor(0.01 * (2 * pokemon.hp + 31 + Math.floor(0.25 * 252)) * 50) +
    60),
    (pokemon.attack = data.stats[1].base_stat);
  pokemon.defense = data.stats[2].base_stat;
  pokemon.specialAttack = data.stats[3].base_stat;
  pokemon.specialDefense = data.stats[4].base_stat;
  pokemon.speed = data.stats[5].base_stat;
  pokemon.types = data.types.map((type) => type.type.name);
  pokemon.moves = [];

  let arr = [];
  while (pokemon.moves.length < 4) {
    let j = await randInt(0, data.moves.length - 1);
    if (arr.includes(j)) {
      continue;
    }

    let moveData = await moveDetails(data.moves[j].move.url);

    const move = {
      name: null,
      type: null,
      damage: null,
      power: null,
      accuracy: null,
      pp: null,
    };

    move.name = moveData.name;
    move.type = moveData.type.name;
    move.damage = moveData.damage_class.name;
    move.power = moveData.power;
    move.accuracy = moveData.accuracy;
    move.pp = moveData.pp;
    if (move.power == null || move.accuracy == null || move.pp == null) {
      continue;
    }

    arr.push(j);
    pokemon.moves.push(move);
  }

  return pokemon;
}

async function moveDetails(link) {
  let moveD = await fetch(link);
  let moveData = await moveD.json();
  return moveData;
}
// async function makeTeam1()
// {
//     const arr=[];
//     for(let i=0;i<6;i++){
//         let id=await randInt(1,905);
//         while(arr.includes(id)){
//             id=await randInt(1,905);
//         }
//         let poke=await getPokemon(id);
//         arr.push(id);
//         protagonist.pokemon.push(poke);
// }
// protPoke(protagonist.pokemon[0])
// }
// async function makeTeam2()
// {
//     const arr=[];
//     for(let i=0;i<6;i++){
//         let id=await randInt(1,905);
//         while(arr.includes(id)){
//             id=await randInt(1,905);
//         }
//         let poke=await getPokemon(id);
//         arr.push(id);
//         antagonist.pokemon.push(poke)
// }
// antiPoke(antagonist.pokemon[0])
// }

async function Team1() {
  const up = document.getElementById("upPokemon");

  const arr = [];
  for (let i = 0; i < 6; i++) {
    let id = await randInt(1, 905);
    while (arr.includes(id)) {
      id = await randInt(1, 905);
    }
    let pkmn = await getPokemon(id);
    arr.push(id);
    protagonist.pokemon.push(pkmn);

    const pokeid = pkmn.id;
    const pokename = pkmn.name;
    const pokeimage = pkmn.image;
    const types = pkmn.types;
    const moves = pkmn.moves;
    const basehp = pkmn.hp;
    const pokehp = pkmn.lvlhp;

    const pokebox = document.createElement("div");
    pokebox.classList.add("pokebox1");
    pokebox.id = i;

    const pokeimagebox = document.createElement("img");
    pokeimagebox.classList.add("pokeimage1");
    pokeimagebox.src = pokeimage;
    await loadImage(pokeimagebox, pokeimage);
    pokebox.appendChild(pokeimagebox);
    pokeimagebox.id = i;

    const pokenamebox = document.createElement("div");
    pokenamebox.classList.add("pokename1");
    pokenamebox.textContent = pokename;
    pokebox.appendChild(pokenamebox);
    pokenamebox.id = i;
    const pokehpbox = document.createElement("div");
    pokehpbox.classList.add("pokehp1");
    pokehpbox.textContent = `HP: ${pokehp}`;
    pokebox.appendChild(pokehpbox);
    pokehpbox.id = i;
    up.append(pokebox);
  }
  protagonist.activePokemon = 0;
  protPoke(protagonist.pokemon[protagonist.activePokemon]);
  protagonist.numPokemon = 6;
  // Team1.push(pokemon);
}

async function Team2() {
  const down = document.getElementById("downPokemon");
  const arr = [];
  for (let i = 0; i < 6; i++) {
    let id = await randInt(1, 905);
    while (arr.includes(id)) {
      id = await randInt(1, 905);
    }
    let pkmn = await getPokemon(id);
    arr.push(id);
    antagonist.pokemon.push(pkmn);

    const pokeid = pkmn.id;
    const pokename = pkmn.name;
    const pokeimage = pkmn.image;
    const types = pkmn.types;
    const moves = pkmn.moves;
    const basehp = pkmn.hp;
    const pokehp = pkmn.lvlhp;

    const pokebox = document.createElement("div");
    pokebox.classList.add("pokebox2");
    pokebox.id = i;

    const pokeimagebox = document.createElement("img");
    pokeimagebox.classList.add("pokeimage2");
    pokeimagebox.src = pokeimage;
    await loadImage(pokeimagebox, pokeimage);
    pokebox.appendChild(pokeimagebox);
    pokeimagebox.id = i;
    const pokenamebox = document.createElement("div");
    pokenamebox.classList.add("pokename2");
    pokenamebox.textContent = pokename;
    pokebox.appendChild(pokenamebox);
    pokenamebox.id = i;
    const pokehpbox = document.createElement("div");
    pokehpbox.classList.add("pokehp2");
    pokehpbox.textContent = `HP: ${pokehp}`;
    pokebox.appendChild(pokehpbox);
    pokehpbox.id = i;
    down.append(pokebox);
  }
  antagonist.activePokemon = 0;
  antiPoke(antagonist.pokemon[antagonist.activePokemon]);
  antagonist.numPokemon = 6;
  // Team2.push(pokemon);
}
async function protPoke(data) {
  const name = data.name;
  const level = 50;

  const hp = data.lvlhp;
  const image = data.front;
  const sprite = data.backGIF;
  const moves = data.moves;

  const protName = document.getElementById("protPokemon-name");
  protName.innerText = name;
  const protHp = document.getElementById("protPokemon-hp");
  protHp.innerText = `HP: ${hp}`;
  const protImage = document.getElementById("protPokemon-image");
  protImage.src = sprite;
  await loadImage(protImage, sprite);
  const protMoves = document.getElementById("protPokemon-moves");
  for (let i = 0; i < 4; i++) {
    let moveD = moves[i];
    let movebox = document.createElement("div");
    movebox.classList.add("movebox");
    movebox.id = i;
    let moveboxname = document.createElement("div");
    moveboxname.classList.add("moveboxname");
    moveboxname.textContent = moveD.name;
    movebox.appendChild(moveboxname);
    moveboxname.id = i;
    let moveboxpower = document.createElement("div");
    moveboxpower.classList.add("moveboxpower");
    moveboxpower.textContent = `Power: ${moveD.power}`;
    movebox.appendChild(moveboxpower);
    moveboxpower.id = i;
    let moveboxpp = document.createElement("div");
    moveboxpp.classList.add("moveboxpp");
    moveboxpp.textContent = `PP: ${moveD.pp}`;
    movebox.appendChild(moveboxpp);
    moveboxpp.id = i;
    let moveboxaccuracy = document.createElement("div");
    moveboxaccuracy.classList.add("moveboxaccuracy");
    moveboxaccuracy.textContent = `Accuracy: ${moveD.accuracy}%`;
    movebox.appendChild(moveboxaccuracy);
    moveboxaccuracy.id = i;
    protMoves.appendChild(movebox);
  }
}
async function chngPoke1(data) {
  const name = data.name;
  const level = 50;

  const hp = data.lvlhp;
  const image = data.front;
  const sprite = data.backGIF;
  const moves = data.moves;

  const protName = document.getElementById("protPokemon-name");
  protName.innerText = name;
  const protHp = document.getElementById("protPokemon-hp");
  protHp.innerText = `HP: ${hp}`;
  const protImage = document.getElementById("protPokemon-image");
  protImage.src = sprite;
  await loadImage(protImage, sprite);
  const protMoves = document.getElementById("protPokemon-moves");
  for (let i = 0; i < 4; i++) {
    let moveD = moves[i];
    let movebox = document.getElementsByClassName("movebox")[i];
    let moveboxname = document.getElementsByClassName("moveboxname")[i];
    moveboxname.textContent = moveD.name;
    let moveboxpower = document.getElementsByClassName("moveboxpower")[i];
    moveboxpower.textContent = `Power: ${moveD.power}`;
    let moveboxpp = document.getElementsByClassName("moveboxpp")[i];
    moveboxpp.textContent = `PP: ${moveD.pp}`;
    moveboxpp.style.color = "rgb(42, 116, 165)";
    let moveboxaccuracy = document.getElementsByClassName("moveboxaccuracy")[i];
    moveboxaccuracy.textContent = `Accuracy: ${moveD.accuracy}%`;
  }
  const hpbar1 = document.getElementById("hpbar1");
  hpbar1.style.width = 100 + "%";
}

async function antiPoke(data) {
  const name = data.name;
  const level = 50;

  const hp = data.lvlhp;
  const image = data.front;
  const sprite = data.frontGIF;
  const moves = data.moves;

  const antiName = document.getElementById("antiPokemon-name");
  antiName.innerText = name;
  const antiHp = document.getElementById("antiPokemon-hp");
  antiHp.innerText = `HP: ${hp}`; //hp;
  const antiImage = document.getElementById("antiPokemon-image");
  antiImage.src = sprite;

  await loadImage(antiImage, sprite);
  const hpbar2 = document.getElementById("hpbar2");
  hpbar2.style.width = 100 + "%";
}

// const typeChart = {
//     normal: { weak: [], strong: [], immune: ['ghost'] },
//     fire: { weak: ['water', 'ground', 'rock'], strong: ['grass', 'ice', 'bug', 'steel'] },
//     water: { weak: ['grass', 'electric'], strong: ['fire', 'ground', 'rock'] },
//     electric: { weak: ['ground'], strong: ['water', 'flying'] },
//     grass: { weak: ['fire', 'flying', 'poison', 'bug', 'ice'], strong: ['water', 'ground', 'rock'] },
//     ice: { weak: ['fire', 'fighting', 'rock', 'steel'], strong: ['grass', 'ground', 'flying', 'dragon'] },
//     fighting: { weak: ['flying', 'psychic', 'fairy'], strong: ['normal', 'ice', 'rock', 'dark', 'steel'] },
//     poison: { weak: ['ground', 'psychic'], strong: ['grass', 'fairy'] , immune: ['steel']},
//     ground: { weak: ['water', 'grass', 'ice'], strong: ['fire', 'electric', 'poison', 'rock'], immune: ['flying'] },
//     flying: { weak: ['electric', 'ice', 'rock'], strong: ['grass', 'fighting', 'bug'] },
//     psychic: { weak: ['bug', 'dark', 'ghost'], strong: ['fighting', 'poison'] , immune: ['dark']},
//     bug: { weak: ['fire', 'flying', 'rock'], strong: ['grass', 'psychic', 'dark'] },
//     rock: { weak: ['water', 'grass', 'fighting', 'ground', 'steel'], strong: ['fire', 'ice', 'flying', 'bug'] },
//     ghost: { weak: ['ghost', 'dark'], strong: ['psychic', 'ghost'], immune: ['normal', 'fighting'] },
//     dragon: { weak: ['ice', 'dragon', 'fairy'], strong: ['dragon'] , immune: ['fairy']},
//     dark: { weak: ['fighting', 'bug', 'fairy'], strong: ['psychic', 'ghost'], immune: ['psychic']},
//     steel: { weak: ['fire', 'fighting', 'ground'], strong: ['ice', 'rock', 'fairy'], immune: ['poison'] },
//     fairy: { weak: ['poison', 'steel'], strong: ['fighting', 'dragon', 'dark'], immune: ['dragon'] },
// };

// function calculateDamage(moveType, targetType) {
//     if (typeChart[moveType].strong.includes(targetType)) {
//         return 2; // Super effective
//     } else if (typeChart[moveType].weak.includes(targetType)) {
//         return 0.5; // Not very effective
//     } else if (typeChart[moveType].immune.includes(targetType)){
//         return 0; // No effect
//     } else {
//         return 1; // Normal damage
//     }
// }

async function Dmg() {
  // let typeMult=1;
  await timer(200);
  const protMain = protagonist.pokemon[protagonist.activePokemon];
  const antiMain = antagonist.pokemon[antagonist.activePokemon];
  let random1 = 0.85 + Math.random() * 0.15;
  let random2 = 0.85 + Math.random() * 0.15;

  let atk1 = true;
  let atk2 = true;
  if (protMain.moves[protagonist.currentMove].accuracy / 100 < Math.random()) {
    atk1 = false;
    battletext.innerHTML("You attack failed");
  }

  let dmg1 = 0;
  let dmg2 = 0;
  if (atk1) {
    let power1 = protMain.moves[protagonist.currentMove].power;
    if ((protMain.moves[protagonist.currentMove].damage = "special")) {
      dmg1 = Math.floor(
        ((22 * power1 * protMain.specialAttack) / antiMain.specialDefense / 50 +
          2) *
          random1
      );
    } else {
      dmg1 = Math.floor(
        ((22 * power1 * protMain.attack) / antiMain.defense / 50 + 2) * random1
      );
    }
    if (dmg1 >= antiMain.lvlhp) {
      antiMain.lvlhp = 0;
      let antiM = document.querySelector(
        '.pokebox2[id="' + `${antagonist.activePokemon}` + '"]'
      );
      antiM.style.backgroundColor = "red";
      // battletext.innerText(antiMain+" recieved " );
      antagonist.numPokemon--;
    } else {
      antiMain.lvlhp -= dmg1;
    }
    protMain.moves[protagonist.currentMove].pp--;
  }
  // await Timer(1000);
  if (antiMain.moves[antagonist.currentMove].accuracy / 100 < Math.random()) {
    atk2 = false;
    battletext.innerText("Rivals attack failed");
  }
  if (atk2) {
    let power2 = antiMain.moves[antagonist.currentMove].power;
    if ((antiMain.moves[antagonist.currentMove].damage = "special")) {
      dmg2 = Math.floor(
        ((22 * power2 * antiMain.specialAttack) / protMain.specialDefense / 50 +
          2) *
          random2
      );
    } else {
      dmg2 = Math.floor(
        ((22 * power2 * antiMain.attack) / protMain.defense / 50 + 2) * random2
      );
    }
    if (dmg2 >= protMain.lvlhp) {
      protMain.lvlhp = 0;
      let protM = document.querySelector(
        '.pokebox1[id="' + `${protagonist.activePokemon}` + '"]'
      );
      protM.style.backgroundColor = "red";
      protagonist.numPokemon--;
    } else {
      protMain.lvlhp -= dmg2;
    }
    antiMain.moves[antagonist.currentMove].pp--;
  }
  updatepkmn().then();
}

async function updatepkmn() {
  const protHp = document.getElementById("protPokemon-hp");
  protHp.innerText = `HP: ${
    protagonist.pokemon[protagonist.activePokemon].lvlhp
  }`;
  const teamHp1 = document.querySelector(
    '.pokehp1[id="' + `${protagonist.activePokemon}` + '"]'
  );
  teamHp1.innerText = `HP: ${
    protagonist.pokemon[protagonist.activePokemon].lvlhp
  }`;
  const hpbar1 = document.getElementById("hpbar1");
  hpbar1.style.width =
    (protagonist.pokemon[protagonist.activePokemon].lvlhp /
      (Math.floor(
        0.01 *
          (2 * protagonist.pokemon[protagonist.activePokemon].hp +
            31 +
            Math.floor(0.25 * 252)) *
          50
      ) +
        60)) *
      100 +
    "%";
  const antiHp = document.getElementById("antiPokemon-hp");
  antiHp.innerText = `HP: ${
    antagonist.pokemon[antagonist.activePokemon].lvlhp
  }`;
  const teamHp2 = document.querySelector(
    '.pokehp2[id="' + `${antagonist.activePokemon}` + '"]'
  );
  teamHp2.innerText = `HP: ${
    antagonist.pokemon[antagonist.activePokemon].lvlhp
  }`;
  const hpbar2 = document.getElementById("hpbar2");
  hpbar2.style.width =
    (antagonist.pokemon[antagonist.activePokemon].lvlhp /
      (Math.floor(
        0.01 *
          (2 * antagonist.pokemon[antagonist.activePokemon].hp +
            31 +
            Math.floor(0.25 * 252)) *
          50
      ) +
        60)) *
      100 +
    "%";

  const pp1 = document.querySelector(
    '.moveboxpp[id="' + `${protagonist.currentMove}` + '"]'
  );

  pp1.innerText =
    "PP: " +
    `${
      protagonist.pokemon[protagonist.activePokemon].moves[
        protagonist.currentMove
      ].pp
    }`;
  if (
    `${
      protagonist.pokemon[protagonist.activePokemon].moves[
        protagonist.currentMove
      ].pp
    }` == 0
  ) {
    pp1.style.color = "red";
  }
  if (antagonist.pokemon[antagonist.activePokemon].lvlhp == 0) {
    changePokemon2().then();
  }
  if (protagonist.pokemon[protagonist.activePokemon].lvlhp == 0) {
    changePokemon1().then();
  }
}
async function updateMoves() {
  document
    .querySelector('.movebox[id="0"]')
    .addEventListener("click", async () => {
      moveChoose(0).then();
    });
  document
    .querySelector('.movebox[id="1"]')
    .addEventListener("click", async () => {
      moveChoose(1).then();
    });
  document
    .querySelector('.movebox[id="2"]')
    .addEventListener("click", async () => {
      moveChoose(2).then();
    });
  document
    .querySelector('.movebox[id="3"]')
    .addEventListener("click", async () => {
      moveChoose(3).then();
    });
}
async function moveChoose(n) {
  protagonist.currentMove = n;
  antagonist.currentMove = await randInt(0, 3);
  if (
    protagonist.pokemon[protagonist.activePokemon].moves[
      protagonist.currentMove
    ].pp != 0 &&
    protagonist.pokemon[protagonist.activePokemon].lvlhp != 0
  ) {
    Dmg().then();
  }
}
async function changePokemon1() {
  let choose = false;
  for (let i = 0; i < 6; i++) {
    if (protagonist.pokemon[i].lvlhp != 0 && !choose) {
      let chooseNew = document.querySelector('.pokebox1[id="' + `${i}` + '"]');
      chooseNew.addEventListener("click", async (e) => {
      let hp =  protagonist.pokemon[protagonist.activePokemon].lvlhp;
      if(hp>0){
        // e.preventDefault();
        return
      }
        protagonist.activePokemon = i;
        removelisten().then();
        choose = true;
        chngPoke1(protagonist.pokemon[protagonist.activePokemon]).then();
      });
    }
  }
}
async function removelisten() {
  for (let i = 0; i < 6; i++) {
    let chooseNew = document.querySelector('.pokebox1[id="' + `${i}` + '"]');
    chooseNew.removeEventListener("click", async () => {
      protagonist.activePokemon = i;
      choose = true;
      chngPoke1(protagonist.pokemon[protagonist.activePokemon]).then();
    });
  }
}
async function changePokemon2() {
  antagonist.activePokemon++;
  antiPoke(antagonist.pokemon[antagonist.activePokemon]).then();
}

function loadImage(img, src) {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img.height);
    img.onerror = reject;
    img.src = src;
  });
}

async function start() {
  const load = document.getElementById("load");
  const body = document.getElementById("body");

  body.style.display = "none";

  await Team1();
  await Team2();

  body.style.display = "block";
  load.style.display = "none";

  battletext.innerText = "Team Battle";
  await timer(2000);
  battletext.innerText = "Choose a move";
  await updateMoves();
}

start().then();
