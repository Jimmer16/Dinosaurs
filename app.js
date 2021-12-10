// Create Dino Constructor
function CreateDinos(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

CreateDinos.prototype.pushFact = ((fact) => {
    this.fact.push(fact);
})

CreateDinos.prototype.getRandomFact = (() => {
    let facts = [this.fact]
    let randomInt = Math.floor(Math.random() * this.fact.length);
    return facts[randomInt]
})

// Create 1st Dino Compare Method with prototypal inheritance
// Compare heights between human and dinosaur objects
CreateDinos.prototype.compareHeight = function(human) {
    let heightDif = 0;
    let fact;
    if (this.height > human.height) {
        heightDif = Math.floor(this.height / human.height);
        fact = `${this.species} was ${heightDif}X taller than ${human.species}!`;
    } else if (this.height < human.height) {
        heightDif = Math.floor(human.height / this.height);
        fact = `${human.name} is ${heightDif}X taller than a ${this.species} was!`
    } else {
        fact = `${human.name} and ${this.species} are very similar in size!`
    }
    this.pushFact(fact);
}

// Create 2nd Dino Compare Method using prototypal inheritance
// Compares the weight difference between human and dinosaur objects
CreateDinos.prototype.compareWeight = function(human) {
    let weightDif = 0;
    let fact;
    if (this.weight > human.weight) {
        weightDif = Math.floor(this.weight / human.weight);
        fact = `${this.species} was ${weightDif}X heavier than ${human.name}!`
    } else if (this.weight < human.weight) {
        weightDif = Math.floor(human.weight / this.weight);
        fact = `${human.name} is ${weightDif}X heavier than ${this.species}!`
    } else {
        fact = `${human.name} and ${this.species} are very similar in weight!`
    }
    this.pushFact(fact)
}

// Create 3rd Dino Compare Method to compare human and dinosaurs diet
// compares diet difference between human and dinosaur objects
CreateDinos.prototype.compareDiet = function(human) {
    let fact;
    if (this.diet === human.diet) {
        fact = `${human.name} eats the same foods as ${this.species} ate!`
    } else {
        fact = `${human.name} eats very different food than what ${this.species} ate!`
    }
    this.pushFact(fact);
}

// Create Dino Objects. Individual objects created as a fetch is being problematic..
let dinos = [
    {
        "species": "triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "brachiosaurus",
        "weight": 70000,
        "height": "372",
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]

// create a new array named 'dinosaurs' using CreateDinos constructor function
let dinosaurs = dinos.map(getDinos);
function getDinos(data) {
    return new CreateDinos(data.species, data.weight, data.height, data.diet, data.where, data.when, data.fact)
}
console.log(dinosaurs);

// Create Human Object constructor function
// function Human(species, name, weight, height, diet) {
//     this.species = species;
//     this.name = name;
//     this.weight = weight;
//     this.height = height;
//     this.diet = diet;
// }
function Human (species, name, weight, height, diet) {
    CreateDinos.call(this, "human", name, weight, height, diet);
    this.name = name;
}

// Extract human data from the form and return an object.
function getHuman() {
    (function () {
        function name() {
            return document.getElementById('name').valueOf();
        }

        function weight() {
            return document.getElementById('weight').valueOf();
        }

        function height() {
            let feet = document.getElementById('feet').valueOf();
            let inches = document.getElementById('inches').valueOf();
            return (feet * 12) + inches;
        }

        function diet() {
            return document.getElementById('diet').valueOf();
        }
        let human = {
            name: name(),
            weight: weight(),
            height: height(),
            diet: diet(),
        };
        return human
    })()
}

let human = new Human(getHuman())

console.log(human);
console.log(dinosaurs.species);

// addDinos function creates tile elements and adds them in to the DOM.
function addDinos() {
    // Generate Tiles for each Dino in Array
    const grid = document.getElementById('grid');
    dinos.forEach(()=> {
        let tile = document.createElement('div');
        let tileData;
        if (dinosaurs.name === 'human') {
            tileData = `<h3>${dinosaurs.species}</h3> <img src="images/${dinosaurs.species}.png">`;
        } else if (dinosaurs.name === 'Pigeon') {
            tileData = `<h3>${dinosaurs.species}</h3> <img src="images/${dinosaurs.species}.png"> <p>${dinosaurs.fact[0]}</p>`
        } else {
            tileData = `<h3>${dinosaurs.species}</h3> <img src="images/${dinosaurs.species}.png"> <p>${dinosaurs.getRandomFact}</p>`
        }
        tile.innerHTML = tileData;
        grid.appendChild(tile);
    })
}

// Function to remove form from screen. Use in event handler
function removeForm() {/*removeForm*/
    const form = document.getElementById('dino-compare');
    form.style.display = 'none';
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener("click", ()=> {
    getHuman()
    removeForm()
    addDinos()
})