var saltos_x = 100;
var saltos_y = 90;
var personajeSeleccionado = 'images/char-horn-girl.png';
var selected

function getRandomInt(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}

function cambiarPersonaje(ruta){
    personajeSeleccionado = ruta;
}

function randomSpeed(){
    return Math.random()*5;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 20;
    this.width = 50;
    this.height = 85;
    this.speed = randomSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.collisions = function(object) {
    if(this.x < object.x + object.width  && this.x + this.width  > object.x &&
        this.y < object.y + object.height-30 && this.y + this.height-30 > object.y){
        alert("HAHAHAHAH PERDISTE UNA VIDA LAS CUCARACHAS TE GANARAAN")
        return true;
    }  
    
    return false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += (saltos_x * dt * this.speed);
    if(this.x > 480){
        var locations = [80.8 , 161.6 , 242.40];
        this.speed = randomSpeed();
        this.x = 0;
        this.y = locations[getRandomInt(0,2)];

    }
    if(this.collisions(player)){
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Enemy.call(this);
    this.sprite = personajeSeleccionado;
    this.x = 202;
    this.y = 395;

};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 395;
    this.render();
};
Player.prototype.update = function(dt) {
    if(player.y < 20){
        player.reset();
        alert("Usted ha ganado!!!!!! Dele a OK si aun no se aburre");
    }  
};

Player.prototype.handleInput = function(direction){
    switch(direction){
        
        case 'left':
            if(this.x > 100){
                this.x -= saltos_x;
            }
            break;
        case 'up':
            if(this.y > 0){
                this.y -= saltos_y;
            }
            break;  
        case 'right':
            if(this.x < 350){this.x += saltos_x;}    
            break;
        case 'down':
            if(this.y < 424){this.y += saltos_y;}
            break;    
        }
};

Player.prototype.render = function(){
    this.sprite = personajeSeleccionado;
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var cantEnemies = 3;

function changeLevel(lvl){
    cantEnemies = lvl;
    allEnemies = [];
    for(var i = 1 ; i <= cantEnemies ; i++){
        var enemy = new Enemy();

        enemy.x = i * saltos_x;

        enemy.y = i * (saltos_y /1.25);

        allEnemies.push(enemy);

    }
}
for(var i = 1 ; i <= 3 ; i++){
    var enemy = new Enemy();
    
    enemy.x = i * saltos_x;
    
    enemy.y = i * (saltos_y /1.25);
    
    allEnemies.push(enemy);

}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
