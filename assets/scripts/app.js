// fighter object
function Fighter(name, minPower, maxPower, special, type, health, image) {
    this.name = name;
    this.minPower = minPower;
    this.maxPower = maxPower;
    this.special = special;
    this.type = type;
    this.health = health;
    this.image = image;
    this.attack = () => {
        return Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    };
    this.defense = () => {
        return Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    };
    this.saber = color => {
        this.color = color;
        let green = "#00c851";
        let red = "#ff4444";
        if (type === "Jedi") {
            return color = green;
        } else {
            return color = red;
        }
    };
}
// setting up game
const Gameboard = {
    // array where fighters go
    currentFighters: [],
    // fighters health
    player1Health: 100,
    player2Health: 100,
    // fighters
    availableFighters: [
        Yoda = new Fighter("Yoda", 90, 99, 100, "Jedi", 100, "https://omaharentalads.com/images/ear-transparent-yoda-1.png"),
        Mase = new Fighter("Mase Windu", 90, 99, 100, "Jedi", 100, "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b8d2b12-21e8-4931-8a6d-fb9ecdd60383/dcanbdi-cf1c078d-7155-4415-94a5-3e1506858a39.png/v1/fill/w_803,h_995,strp/star_wars_revenge_of_the_sith_mace_windu_png_by_metropolis_hero1125_dcanbdi-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAxMSIsInBhdGgiOiJcL2ZcLzViOGQyYjEyLTIxZTgtNDkzMS04YTZkLWZiOWVjZGQ2MDM4M1wvZGNhbmJkaS1jZjFjMDc4ZC03MTU1LTQ0MTUtOTRhNS0zZTE1MDY4NThhMzkucG5nIiwid2lkdGgiOiI8PTgxNiJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bZ9GtZnIFyY5U6_evDZhDoFgtzN7fO0Kx1Jyq-PCHMk"),
        Quigon = new Fighter("Qui Gon", 90, 99, 100, "Jedi", 100, "https://vignette.wikia.nocookie.net/the-beaver-run-wars/images/a/ad/Qui-Gon_Jinn.png/revision/latest?cb=20160216022027"),
        Mal = new Fighter("Darth Mal", 90, 99, 100, "Sith", 100, "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b8d2b12-21e8-4931-8a6d-fb9ecdd60383/dc99z5g-36e48bef-22af-4b6d-b1f3-aa5793ece176.png/v1/fill/w_797,h_1002,strp/star_wars_the_phantom_menace_darth_maul_png_by_metropolis_hero1125_dc99z5g-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAxOCIsInBhdGgiOiJcL2ZcLzViOGQyYjEyLTIxZTgtNDkzMS04YTZkLWZiOWVjZGQ2MDM4M1wvZGM5OXo1Zy0zNmU0OGJlZi0yMmFmLTRiNmQtYjFmMy1hYTU3OTNlY2UxNzYucG5nIiwid2lkdGgiOiI8PTgxMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.5jTFQDl55OfEa8beUOvpg5KE6mvYYs-SaTC2V76BUFY"),
        Vader = new Fighter("Vader", 90, 99, 100, "Sith", 100, "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/11/darth-vader-transparent-image.png?fit=608%2C514"),
        Sidious = new Fighter("Sidious", 90, 99, 100, "Sith", 100, "https://vignette.wikia.nocookie.net/vsbattles/images/6/64/Darth_Sidious_Render.png/revision/latest?cb=20170810182252")
    ],
    // click event to choose fighters
    choosePlayer: document.addEventListener("click", e => {
        for (let i = 0; i < Gameboard.availableFighters.length; i++) {
            if (e.target.innerText === Gameboard.availableFighters[i].name) {
                Gameboard.currentFighters.push(Gameboard.availableFighters[i]);
            }
        }
        Gameboard.gameInit();
    }),
    // shows fighters names in buttons below the versus board
    listFighters: () => {
        this.availableFighters.forEach((fighter) => {
            var fighterNameButton = $(`<button class="btn my-1 fighter-button">`);
            fighterNameButton.text(`${fighter.name}`);
            $("#fighters-to-choose").append(fighterNameButton);
        });
    },
    // shows fighters in versus board
    gameInit: () => {
        // inits only after 2 fighters chosen
        if (Gameboard.currentFighters.length === 2) {
            $("#choose-title").css("visibility", "hidden");
            let player1 = $("#player-1image");
            let player2 = $("#player-2image");
            player1.html(`
                <h3 class="card-header text-center">${this.currentFighters[0].name}</h3>
                <img class="fighter-img img-fluid" src="${this.currentFighters[0].image}"/>
                <h3 class="affiliation text-center">${this.currentFighters[0].type}</h3>
                <p class="text-center">
                    <button class="btn mx-1 fighter-button" onclick="${Gameboard.fight()}">ATTACK</button>
                </p>
            `);
            player2.html(`
                <h3 class="card-header text-center">${this.currentFighters[1].name}</h3>
                <img class="fighter-img img-fluid" src="${this.currentFighters[1].image}"/>
                <h3 class="affiliation text-center">${this.currentFighters[1].type}</h3>
            `);
        }
        // if user tries to choose more than 2 fighters
        if (Gameboard.currentFighters.length > 2) {
            console.log("You can't do that");
            Gameboard.currentFighters.pop(this.currentFighters[2]);
        }
    },
    // what happens when attack is clicked
    fight: () => {
        let subtractP1Health = Math.ceil(this.currentFighters[1].defense() * 0.1);
        let subtractP2Health = Math.ceil(this.currentFighters[0].defense() * 0.1);
        if (this.currentFighters[0].attack() > this.currentFighters[1].defense()) {
            console.log("player2 got hit");
            console.log(this.player2Health -= subtractP2Health);
            this.shrinkHealthBar();
            this.pickWinner();
        } else if (this.currentFighters[1].attack() > this.currentFighters[0].defense()) {
            console.log("player1 got hit");
            console.log(this.player1Health -= subtractP1Health);
            this.shrinkHealthBar();
            this.pickWinner();
        } else {
            console.log("good try");
        }
    },
    // shrinks health bar after attack
    shrinkHealthBar: () => {
        $("#player1-bar").css({ "width": `${this.player1Health}%`, "background-color": `${this.currentFighters[0].saber()}`, "box-shadow": `1px 0px 5px 3px ${this.currentFighters[0].saber()}` });
        $("#player2-bar").css({ "width": `${this.player2Health}%`, "background-color": `${this.currentFighters[1].saber()}`, "box-shadow": `-1px 0px 5px 3px ${this.currentFighters[1].saber()}` });
    },
    // if health bar is zero
    pickWinner: () => {
        if (this.player1Health <= 0) {
            console.log("Player 1 Lost");
        }
        if (this.player2Health <= 0) {
            console.log("Player 2 Lost");
        }
    }

}
// lists fighters on load
Gameboard.listFighters();

