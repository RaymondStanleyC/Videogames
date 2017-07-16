var res = {
    HelloWorld_png : "res/HelloWorld.png",
    //Musica Inicial del Juegos
    music_theme: "res/Music/angrybirds_theme.mp3",
    music_fly: "res/Music/angryBird_Fly.mp3",
    music_impact: "res/Music/angrybird_Tablaso.mp3",
    
    world : "res/world.png",
    
    stick : "res/stick.png",
    
    pitgeon_attack : "res/pitgeon_attack.png",
    pitgeon_awake_1 : "res/pitgeon_awake_1.png",
    pitgeon_awake_2 : "res/pitgeon_awake_2.png",
    pitgeon_hurt : "res/pitgeon_hurt.png",
    pitgeon_sleep : "res/pitgeon_sleep.png",
    //Agregando PNG enemigos para poder diversificar estados
    enemy_weak_1 : "res/enemy_weak_1.png",
    enemy_weak_2 : "res/enemy_weak_2.png",
    enemy_weak_3 : "res/enemy_weak_3.png",
    enemy_weak_4 : "res/enemy_weak_4.png",
    enemy_weak_5 : "res/enemy_weak_5.png",
    
    enemy_strong_1 : "res/enemy_strong_1.png",
    enemy_strong_2 : "res/enemy_strong_2.png",
    enemy_strong_3 : "res/enemy_strong_3.png",
    enemy_strong_4 : "res/enemy_strong_4.png",
    enemy_strong_5 : "res/enemy_strong_5.png",
    //Agregando las estructuras
    block_square_open_1 : "res/block_square_open_1.png",
    block_square_open_2 : "res/block_square_open_2.png",
    block_square_open_3 : "res/block_square_open_3.png",
    block_square_open_4 : "res/block_square_open_4.png",
    
    block_large_rectangle_1 : "res/block_large_rectangle_1.png",
    block_large_rectangle_2 : "res/block_large_rectangle_2.png",
    block_large_rectangle_3 : "res/block_large_rectangle_3.png",
    block_large_rectangle_4 : "res/block_large_rectangle_4.png",
    
    reset: "res/reset.png",
    reset_pressed: "res/reset_pressed.png",
    next_oportunity: "res/next_oportunity.png",
    next_oportunity_pressed: "res/next_oportunity_pressed.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
