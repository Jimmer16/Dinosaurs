// raw Dino Object data
let dinos = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "Herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "Carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "Herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": 372,
        "diet": "Herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "Herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "Carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "Carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "Herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]

// Create Dino Constructor
class CreateDinos {
    constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = [fact];
    }

    // Dinosaur/Human comparison method #1 -Compare height difference
    compareHeight(human) {
        let heightDif = 0;
        let fact;
        if (this.height > human.height) {
            heightDif = (this.height / human.height).toFixed(1);
            fact = `${this.species} was ${heightDif}x taller than ${human.name}!`;
        } else if (this.height < human.height) {
            heightDif = (human.height / this.height).toFixed(1);
            fact = `${human.name} is ${heightDif}x taller than a ${this.species} was!`
        } else {
            fact = `${human.name} and the ${this.species} are very similar in size!`
        }
        this.fact.push(fact);
    }

    // Dinosaur/Human comparison method #2 -Compare weight difference
    compareWeight(human) {
        let weightDif = 0;
        let fact;
        if (this.weight > human.weight) {
            weightDif = (this.weight / human.weight).toFixed(1);
            fact = `${this.species} was ${weightDif}x heavier than ${human.name}!`
        } else if (this.weight < human.weight) {
            weightDif = (human.weight / this.weight).toFixed(1);
            fact = `${human.name} is ${weightDif}x heavier than ${this.species}!`
        } else {
            fact = `${human.name} and the ${this.species} are very similar in weight!`
        }
        this.fact.push(fact);
    }

    // Dinosaur/Human comparison method #3 -Compare diets
    compareDiet(human) {
        let fact;
        if (this.diet === human.diet) {
            fact = `${this.species} was also a ${this.diet}!`
        } else {
            fact = `${human.name} was a ${human.diet}, where as ${this.species} was a ${this.diet}!`
        }
        this.fact.push(fact);
    }

    // Method to call the comparison methods and append them to each dinosaur
    getFacts(human) {
        const facts = [this.fact, this.compareHeight(human), this.compareDiet(human), this.compareWeight(human)];
        function randomIndex() {
            Math.floor(Math.random() * (facts.length - 1));
        }
        return facts;
    }


}

// create a new array named 'dinosaurs' using CreateDinos constructor function.
let dinosaurs = dinos.map(getDinos);
function getDinos(data) {
    return new CreateDinos(data.species, data.weight, data.height, data.diet, data.where, data.when, data.fact)
}
// Fisher Yates shuffle algorithm to shuffle the dinosaurs array. Used in the getHuman function when pushing the human object to the dinosaurs array.
function fisherYatesShuffle(arr){
    for(let i =arr.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
}

// Create Human Object as a class
class Human {
    constructor() {
        this.species = 'Human';
        this.name = 'Colin, The Caveman';
        this.weight = 200;
        this.height = 80;
        this.diet = 'Omnivore';
    }
    setData(name, weight, heightFeet, heightInches, diet) {
        this.name = name;
        this.weight = +weight;
        this.height = +(heightFeet * 12) + +heightInches;
        this.diet = diet;
    }
}

// Instantiate the human object that will hold form data and add to the dinosaurs array
let human = new Human();

function getHuman() {
    let formName = document.getElementById('name').value;
    let formWeight = document.getElementById('weight').value;
    let formHeightFeet = document.getElementById('feet').value;
    let formHeightInches = document.getElementById('inches').value;
    let formDiet = document.getElementById('diet').value;
    human.setData(formName, formWeight, formHeightFeet, formHeightInches, formDiet);
    dinosaurs.forEach((dinosaur)=> {
        if (dinosaur.species !== 'Pigeon') {
            dinosaur.getFacts(human);
        }
    })
    fisherYatesShuffle(dinosaurs)
    dinosaurs.splice(4, 0, human);
}

// Function to add newly created dino tiles in to the DOM's grid element. Call with event handler
function addDinos() {
    const grid = document.getElementById('grid');
    grid.className = "grid";
    dinosaurs.forEach((dinosaur)=> {
        let randomIndex = Math.floor(Math.random() * (3));
        let tile = document.createElement('div');
        tile.className = "grid-item";
        tile.id = "div";
        let tileData;
        if (dinosaur.species === 'Human') {
            tileData = `<h3>${dinosaur.species}</h3> <img src="images/${dinosaur.species.toLowerCase()}.png" alt="An image of ${dinosaur.species}"> <p>${dinosaur.name}</p>`;
        } else if (dinosaur.species === 'Pigeon') {
            tileData = `<h3>${dinosaur.species}</h3> <img src="images/${dinosaur.species.toLowerCase()}.png" alt="An image of ${dinosaur.species}"> <p>${dinosaur.fact}</p>`;
        } else {
            tileData = `<h3>${dinosaur.species}</h3> <img src="images/${dinosaur.species.toLowerCase()}.png" alt="An image of ${dinosaur.species}"> <p>${dinosaur.fact[randomIndex]}</p>`;
        }
        tile.innerHTML = tileData;
        grid.appendChild(tile);
    })
}

// Function to remove form from screen. Use in event handler
function removeForm() {
    const form = document.getElementById('dino-compare');
    form.style.display = 'none';
}

/*
 * Event handler - click on submit button
 * Extract form information
 * Remove form from DOM (removeForm())
 * Append dinosaurs to the grid element (addDinos())
 */
document.getElementById('btn').addEventListener('click', () => {
    getHuman()
    removeForm()
    addDinos()
})
