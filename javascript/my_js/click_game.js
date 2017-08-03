//Notes//
// Create a more balanced fighting system, including
//  leveling up your own character
// Incorperate more heroes when certain point is reached
// Hide global variables that don't need to be global
//
//
    //Creates the Hero Object 
    var Hero = {
        name: "Hero",
        level: 1,
        attack: 20,
        defense: 10,
        health: 500,
        maxHealth: 500,
        exp: 0,
        maxExp: 0,
    }
    //variables added in constructor
    var attack = 10;
    var randAtt = 10;
    var defense = 1;
    var randDef = 1;
    var health = 10;
    var level = 1;
    //Creates the Enemy consructor for the list of enemies.
    function Enemy(name){

        this.name = name;
        this.attack = attack;
        randAtt = randAtt+=2 * 0.8;
        attack = Math.floor(randAtt);
        this.defense = defense;
        randDef = randDef+=2 * 0.7;
        defense = Math.floor(randDef);
        this.health = health;
        health = Math.floor(health * 1.3);
        this.level = level;
        level++;
        this.maxHealth = this.health;
        this.exp = this.health;
        this.add = function(){
            
            totalEnemies.push(this);
            
        };
        this.add();
    }
    
    
    //Writes and rewrites Hero and Enemy stats for each turn
    function write(){
        document.getElementById("write1").innerHTML = "Name: " + Hero.name;
        document.getElementById("write2").innerHTML = "Level: " + Hero.level;
        document.getElementById("write3").innerHTML = "Attack: " + Hero.attack;
        document.getElementById("write4").innerHTML = "Defense: " + Hero.defense;
        document.getElementById("write5").innerHTML = "Health: " + Hero.health + "/" + Hero.maxHealth;
        document.getElementById("write6").innerHTML = "Experience: " + Hero.exp;
        document.getElementById("write7").innerHTML = "Total Experience: " + Hero.maxExp;
    }
    
    write();
    //An array used as each new enemy is defeated, it is pushed onto here (See enemyLevel function)
    var enemies = [];
    //All Enemy constructors put onto an array
    var totalEnemies = [];
    //Each new enemy created from the Enemy constructor
    //ONE
    var test = new Enemy("Toadinator");
    console.log(test);
    var test1 = new Enemy("Birdman");
    console.log(test1);
    var test2 = new Enemy("Catatonic");
    console.log(test2);
    var test3 = new Enemy("Taranautar");
    console.log(test3);
    var test4 = new Enemy("PowerMan");
    console.log(test4);
    new Enemy("Beeman", 10);
    new Enemy("Thoundand Eyes", 7);
    new Enemy("Potato Shooter", 15);
    new Enemy("swag attack", 20);
    new Enemy("Not-One Punch Man", 14);
    //TWO
    new Enemy("destroy", 6);
    new Enemy("Man", 20);
    new Enemy("cow", 3);
    new Enemy("pig", 6);
    new Enemy("leg", 10);
    new Enemy("arm", 2);
    new Enemy("Tow", 4);
    new Enemy("Stang", 5);
    new Enemy("Roaund", 7);
    new Enemy("Flands", 15);
    //THREE
    new Enemy("Pop", 20);
    new Enemy("Goes", 14);
    new Enemy("The", 6);
    new Enemy("Capital", 20);
    new Enemy("Strange", 3);
    new Enemy("yup", 6);
    var testlast = new Enemy("professor canbit");
    console.log(testlast);
    //variable initiations 
    var currEnemy = totalEnemies[0];
    enemies[0] = totalEnemies[0]
    var interval = 0;
    var potion1 = 10;
    var test = move();

    document.getElementById("enemy").innerHTML = "Enemy " + currEnemy.name +
     " level " + currEnemy.level + 
     " is approaching. Will you fight or flee?";

    document.getElementById("ewrite1").innerHTML = "Name: " + currEnemy.name;
    document.getElementById("ewrite2").innerHTML = "Level: " + currEnemy.level;
    document.getElementById("ewrite3").innerHTML = "Attack: " + currEnemy.attack;
    document.getElementById("ewrite4").innerHTML = "Defense: " + currEnemy.defense;
    document.getElementById("ewrite5").innerHTML = "Health: " + currEnemy.health;
    
    document.getElementById("stopRepeat").style.visibility = "hidden";

    
    document.getElementById("fight").addEventListener("click", function(){
        heroFight(currEnemy);
    });

    document.getElementById("flee").addEventListener("click", function(){
        flee(currEnemy);
    })
    document.getElementById("att").addEventListener("click", function(){
        addAtt();
    });

    document.getElementById("def").addEventListener("click", function(){
        addDefense();
    });

    document.getElementById("heal").addEventListener("click", function(){
        addHealth();
    });

    document.getElementById("repeat").addEventListener("click", function(){
        
        interval = setInterval(function(){
            heroFight(currEnemy);
            if(Hero.health === 0){
                clearInterval(interval);
                console.log("You are dead");
                document.getElementById("stopRepeat").style.visibility = "hidden";
                document.getElementById("repeat").style.visibility = "visible";
            }
        }, 1000);
        document.getElementById("stopRepeat").style.visibility = "visible";
        document.getElementById("repeat").style.visibility = "hidden";

    });

    document.getElementById("stopRepeat").addEventListener("click", function(){
        clearInterval(interval);
        document.getElementById("stopRepeat").style.visibility = "hidden";
        document.getElementById("repeat").style.visibility = "visible";
    });

    document.getElementById("potion").addEventListener("click", function(){
        potion();
    });

function enemyLevel(arrayName){
    Hero.level++;
    potion1++;
    for(var x = 0; x < arrayName.length; x++){
        if(arrayName[x].level == Hero.level){
            Hero.health = Hero.maxHealth;
            enemies.push(arrayName[x]);
            console.log(enemies);
            //resets enemies array every 10 levels
            if(Hero.level % 10 == 0){
                enemies = [];
                enemies.push(arrayName[x]);
                console.log(enemies);
            }
            if(Hero.level % 10 == 0){
                
                console.log("Move Hero " + test.getID());
            }
        }
    }
    write();
}

function detDef(sel){
    var turnDef = Math.floor(Math.random() * (sel.defense + 1));
    return turnDef; 
}
function heroDef(){
    var heroDef = Math.floor(Math.random() * (Hero.defense + 1));
    console.log(heroDef + " Defense of Hero");
    return heroDef;
}

function heroFight(sel){
    var defenseUsed = detDef(sel);
    if(defenseUsed >= Hero.attack && Hero.health > 0){
        console.log(defenseUsed + " The Defense that an enemy has this turn");
        console.log(defenseUsed + " Enemy defense too high");
        enemyFight(sel);
    }
    else if(Hero.health <= 0){
        console.log("You are dead");
    }
    else{
        sel.health = sel.health - (Hero.attack - defenseUsed);
        if(sel.health > 0 && Hero.health > 0){
            document.getElementById("ewrite1").innerHTML = "Name: " + sel.name;
            document.getElementById("ewrite2").innerHTML = "Level: " + sel.level;
            document.getElementById("ewrite3").innerHTML = "Attack: " + sel.attack;
            document.getElementById("ewrite4").innerHTML = "Defense: " + sel.defense;
            document.getElementById("ewrite5").innerHTML = "Health: " + sel.health + "/" + sel.maxHealth;
            console.log("Enemy " + sel.name + " has " + sel.health + " health remaining");
            enemyFight(sel); 
        }
        else{
            console.log("Enemy " + currEnemy.name + " has been defeated!");
            if(Hero.level == sel.level){
                enemyLevel(totalEnemies);
            }
            sel.health = sel.maxHealth;
            gainExp(sel);
            write();
            currEnemy = enemies[Math.floor(Math.random() * (enemies.length))]; 
            document.getElementById("enemy").innerHTML = "Enemy " + currEnemy.name + " level " + currEnemy.level +
             " is approaching. Will you fight or flee? " + currEnemy.maxHealth;
            document.getElementById("ewrite1").innerHTML = "Name: " + currEnemy.name;
            document.getElementById("ewrite2").innerHTML = "Level: " + currEnemy.level;
            document.getElementById("ewrite3").innerHTML = "Attack: " + currEnemy.attack;
            document.getElementById("ewrite4").innerHTML = "Defense: " + currEnemy.defense;
            document.getElementById("ewrite5").innerHTML = "Health: " + currEnemy.health + "/" + currEnemy.maxHealth;

        }
    }
}

function enemyFight(sel){
    var heroDefenseUsed = heroDef();
    if(heroDefenseUsed >= sel.attack){
        console.log("You defended attack");
    }
    else{
        Hero.health = Hero.health - (sel.attack - heroDefenseUsed);
        if(Hero.health <= 0){
            Hero.health = 0;
            write();
        }
        else{
            write();
            console.log("Your health is " + Hero.health);
        }
    }
}

function gainExp(sel){
    Hero.exp = Hero.exp + sel.health;
    Hero.maxExp = Hero.maxExp + sel.health;
    
}


function flee(sel){
    sel.health = sel.maxHealth;
    currEnemy = enemies[Math.floor(Math.random() * (enemies.length))]; 
    document.getElementById("enemy").innerHTML = "Enemy " + currEnemy.name + " level " + currEnemy.level + " is approaching. Will you fight or flee?";

}

function addAtt(){
    if(Hero.exp >=100){
        Hero.attack = Hero.attack + 1;
        Hero.exp -= 100
        write();
    }
}

function addDefense(){
    if(Hero.exp >=50){
        Hero.defense = Hero.defense + 2;
        Hero.exp -= 50;
        write();
    }
}


function addHealth(){
    if(Hero.exp >=20){
        Hero.maxHealth = Hero.maxHealth + 10;
        Hero.exp -= 20
        write();
    }
}

function potion(){
    if(potion1 > 0 && Hero.health != Hero.maxHealth){
        Hero.health = Hero.maxHealth;
        potion1--;
    }
    if(Hero.health > Hero.maxHealth){
        Hero.health = Hero.maxHealth;
    }
    console.log("You used a potion. " + potion1 + " left.");
    write();
}

function move(){
    var counter = 1;
    return{
        getID: function(){
            var parent = document.getElementById("game_map" + counter);
            var child = document.getElementById("player");
            counter = counter + 1;
            if(counter >= 5){
                return counter;
            }
            else{
                parent.removeChild(child);
                document.getElementById("game_map" + counter).appendChild(child);

            return counter;
            }
        }
    }
}





