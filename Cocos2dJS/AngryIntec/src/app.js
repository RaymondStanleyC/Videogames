var Space = new cp.Space();
Space.gravity = cp.v(0, -800);
Space.iterations = 30;
Space.sleepTimeThreshold = Infinity;
Space.colisionSlop = Infinity;
var updateStepValue = 60;

var HelloWorldLayer = cc.Layer.extend({
    
    background_sprite:null,
    
    stick: null,
    
    gameScale : 0.4,
    blockSize : null,
    rectangleSize : null,
    floorSize : 28,
    
    rightWall: null,
    leftWall: null,
    bottomWall: null,
    WALLS_WIDTH: 5,
    WALLS_ELASTICITY: 0.5,
    WALLS_FRICTION: 1,
    
    pitgeon_phNode: null,
    pitgeon_phBody: null,
    pitgeon_phShape: null,
    pitgeon_state: "Stay",
    pitgeon_image: res.pitgeon_awake_1,
    pitgeon_started: null,
    pitgeon_ended: null,
    pitgeon_velocity: 7,
    
    lifes: [],
    contLifes: null,
    
    blocksInitialPos: [],
    blocksNodes: [],
    blocksNodesTag: [],
    blocksBodies: [],
    blocksShapes: [],
    currentBlocks: 0,
    
    enemiesInitialPos: [],
    enemiesNodes: [],
    enemiesNodesTag: [],
    enemiesBodies: [],
    enemiesShapes: [],
    currentEnemies: 100,
    
    
    ctor:function () {
        //Este es el proyecto final, aqui tendrán que hacer todo desde cero
        this._super();
        
        this.initializeDegub(true);
        this.initializeAudio();
        this.initializeSprites();
        this.initializeLifes();
        this.initializeButtons();
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.touchedPitgeon,
			onTouchMoved: this.traceBird,
            onTouchEnded: this.endedPitgeon
			
		}, this);
        
    },
    
    initializeDegub: function(flag){
        if(flag == true){
            var debugNode = new cc.PhysicsDebugNode(Space);
            debugNode.visible = true;
            this.addChild(debugNode);
        }  
        
        return true;
    },
    
    //Initializing background music
    initializeAudio: function(){
        cc.audioEngine.playMusic(res.music_theme, true);
    },
    
    initializeButtons: function(){
      
        var button = new ccui.Button();
        button.loadTextures(res.next_oportunity, res.next_oportunity_pressed);
        button.x = cc.winSize.width / 8;
        button.y = cc.winSize.height / 1.1;
        button.addTouchEventListener(this.nextOportunityEvent, this);
        this.addChild(button);
        
        var button = new ccui.Button();
        button.loadTextures(res.reset, res.reset_pressed);
        button.x = (cc.winSize.width / 8) + 160;
        button.y = cc.winSize.height / 1.1;
        button.addTouchEventListener(this.resetEvent, this);
        this.addChild(button);
        
    },
    
    initializeSprites: function(){
        
        /*
            ===============================================
            ===============================================
            ==============ADDING BACKGROUND================
            ===============================================
            ===============================================
        */
                this.background_sprite = cc.Sprite.create(res.world);
                this.background_sprite.setPosition(cc.winSize.height/2, cc.winSize.width/2);
                this.background_sprite.setScale(0.89)
                this.addChild(this.background_sprite);
        
        /*
            ===============================================
            ===============================================
            ==============ADDING WALLS=====================
            ===============================================
            ===============================================
        */
                    //LEFT WALL
                this.leftWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, 0), new cp.v(0, cc.winSize.height), this.WALLS_WIDTH);
                this.leftWall.setElasticity(this.WALLS_ELASTICITY);
                this.leftWall.setFriction(this.WALLS_FRICTION);
                Space.addStaticShape(this.leftWall);
                    //RIGHT WALL
                this.rightWall = new cp.SegmentShape(Space.staticBody, new cp.v(cc.winSize.width, cc.winSize.height), new cp.v(cc.winSize.width, 0), this.WALLS_WIDTH);
                this.rightWall.setElasticity(this.WALLS_ELASTICITY);
                this.rightWall.setFriction(this.WALLS_FRICTION);
                Space.addStaticShape(this.rightWall);
                    //BOTTOM WALL
                this.bottomWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, 0), new cp.v(cc.winSize.width, 0), this.WALLS_WIDTH);
                this.bottomWall.setElasticity(this.WALLS_ELASTICITY);
                this.bottomWall.setFriction(this.WALLS_FRICTION);
                Space.addStaticShape(this.bottomWall);
        /*
            ===============================================
            ===============================================
            ==============ADDING PITGEON===================
            ===============================================
            ===============================================
        */
                this.createPitgeon(res.pitgeon_awake_1, 10, this.gameScale, cc.p(cc.winSize.width/5, cc.winSize.height/3), 0.5, 1, 0);
                
        /*
            ===============================================
            ===============================================
            ==============ADDING STICK=====================
            ===============================================
            ===============================================
        */
                this.stick = cc.Sprite.create(res.stick);
                this.stick.setPosition(cc.winSize.width/5,this.stick.getContentSize().height/1.7);
                this.addChild(this.stick);
        
        /*
            ===============================================
            ===============================================
            ==============ADDING BLOCKS====================
            ===============================================
            ===============================================
        */
                // BLOCK 1
                this.blockSize = cc.Sprite.create(res.block_square_open_1).getContentSize().height * this.gameScale;
                this.rectangleSize = cc.Sprite.create(res.block_large_rectangle_1).getContentSize().height * this.gameScale;
                // image, block_mass, block_scale, position, friction, elasticity, rotation
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 2), 1, 0, 0);
        
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 2), 1, 0, 0);
                
                this.createBlock(res.block_large_rectangle_1, 9, 1, cc.p(cc.winSize.width / 1.29, this.floorSize + this.blockSize * 3), 1, 0, 0);
                
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 4), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 5), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 6), 1, 0, 0);
        
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 4), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 5), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 6), 1, 0, 0);
                
                this.createBlock(res.block_large_rectangle_1, 9, 1, cc.p(cc.winSize.width / 1.29, this.floorSize + this.blockSize * 7), 1, 0, 0);
        
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 7), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 8), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.2, this.floorSize + this.blockSize * 9), 1, 0, 0);
        
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 7), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 8), 1, 0, 0);
                this.createBlock(res.block_square_open_1, 9, this.gameScale, cc.p(cc.winSize.width / 1.4, this.floorSize + this.blockSize * 9), 1, 0, 0);
                
                this.createBlock(res.block_large_rectangle_1, 9, 1, cc.p(cc.winSize.width / 1.29, this.floorSize + this.blockSize * 10), 1, 0, 0);
                
        
        
        /*
            ===============================================
            ===============================================
            ==============ADDING ENEMIES===================
            ===============================================
            ===============================================
        */
                // ENEMY
                // image, block_mass, block_scale, position, friction, elasticity, rotation
                this.createEnemy(res.enemy_strong_1, 10, this.gameScale, cc.p(cc.winSize.width / 1.29, this.floorSize + this.blockSize * 3 + this.rectangleSize), 1, 0, 0);
        
                this.createEnemy(res.enemy_strong_1, 10, this.gameScale, cc.p(cc.winSize.width / 1.29, this.floorSize), 1, 0, 0);
        
        /*
            ===============================================
            ===============================================
            ==============STARTING PHYSICS=================
            ===============================================
            ===============================================
        */
                var update = function(){
                    Space.step(1/60);
                }

                this.schedule(update);
                //this.schedule(this.checkIfDie, 1/60);
        
    },
    
    initializeLifes: function(){
        
        //Inicializando las vidas
        this.contLifes = 3;
        var count = 0;
    
        for(var i=0; i< 2; i++){
            
            var size = cc.winSize;
            var life = new cc.Sprite(res.pitgeon_sleep);
            life.setPosition(cc.winSize.width/14 + count, this.floorSize);
            life.setScale(this.gameScale);
            this.lifes.push(life);
            this.addChild(life, 0);
            count+=50;
        }
        
    },
    
    createPitgeon: function(image, pitgeon_mass, pitgeon_scale, position, friction, elasticity, rotation){
                
            
        // The BODY PARTS AND PARAMETERS
        var pitgeon_nodeSize = cc.Sprite.create(image).getContentSize();
        this.pitgeon_phBody = new cp.Body(pitgeon_mass, cp.momentForBox(pitgeon_mass, pitgeon_nodeSize.width * pitgeon_scale, pitgeon_nodeSize.height * pitgeon_scale));
        this.pitgeon_phBody.setPos(position);

        this.pitgeon_phShape = new cp.CircleShape(this.pitgeon_phBody, pitgeon_nodeSize.width * 0.5 * pitgeon_scale, cc.p(0, 0))
        this.pitgeon_phShape.setFriction(friction);
        this.pitgeon_phShape.setElasticity(elasticity);

        this.pitgeon_phNode = cc.PhysicsSprite.create(image);
        this.pitgeon_phNode.setBody(this.pitgeon_phBody);
        this.pitgeon_phNode.setRotation(rotation);
        this.pitgeon_phNode.setScale(pitgeon_scale);

        this.addChild(this.pitgeon_phNode);
        
        this.schedule(this.animatePitgeon, 2);
        
    },
    
    createEnemy: function(image, enemy_mass, enemy_scale, position, friction, elasticity, rotation){
                
        this.enemiesInitialPos.push(position);    
        
        // The BODY PARTS AND PARAMETERS
        var enemy_nodeSize = cc.Sprite.create(image).getContentSize();
        var enemy_phBody = new cp.Body(enemy_mass, cp.momentForBox(enemy_mass, enemy_nodeSize.width * enemy_scale, enemy_nodeSize.height * enemy_scale));
        enemy_phBody.setPos(position);
        Space.addBody(enemy_phBody);
        this.enemiesBodies.push(enemy_phBody);

        var enemy_phShape = new cp.CircleShape(enemy_phBody, enemy_nodeSize.width * 0.5 * enemy_scale, cc.p(0, 0))
        enemy_phShape.setFriction(friction);
        enemy_phShape.setElasticity(elasticity);
        Space.addShape(enemy_phShape);
        this.enemiesShapes.push(enemy_phShape);
        
        var enemy_phNode = cc.PhysicsSprite.create(image);
        enemy_phNode.setBody(enemy_phBody);
        enemy_phNode.setRotation(rotation);
        enemy_phNode.setScale(enemy_scale);
        this.enemiesNodes.push(enemy_phNode);

        this.addChild(enemy_phNode, 1, this.currentEnemies);
        this.currentEnemies++;
        
    },
    
    createBlock: function(image, block_mass, block_scale, position, friction, elasticity, rotation){
        
        this.blocksInitialPos.push(position);
        
        // The BODY PARTS AND PARAMETERS
        var block_nodeSize = cc.Sprite.create(image).getContentSize();
        var block_phBody = new cp.Body(block_mass, cp.momentForBox(block_mass, block_nodeSize.width * block_scale, block_nodeSize.height * block_scale));
        block_phBody.setPos(position);
        Space.addBody(block_phBody);
        this.blocksBodies.push(block_phBody);

        var block_phShape = new cp.BoxShape(block_phBody, block_nodeSize.width * block_scale, block_nodeSize.height * block_scale);
        block_phShape.setFriction(friction);
        block_phShape.setElasticity(elasticity);
        Space.addShape(block_phShape);
        this.blocksShapes.push(block_phShape);

        var block_phNode = cc.PhysicsSprite.create(image);
        block_phNode.setBody(block_phBody);
        block_phNode.setRotation(rotation);
        block_phNode.setScale(block_scale);
        this.blocksNodes.push(block_phNode);
        
        this.addChild(block_phNode, 1, this.currentBlocks);
        this.currentBlocks++;
        
    },
    //Creating animations for the pitgeon
    animatePitgeon: function(){
        
        if(this.pitgeon_image == res.pitgeon_sleep || this.pitgeon_image == res.pitgeon_awake_2){
            this.pitgeon_image = res.pitgeon_awake_1;
            this.pitgeon_phNode.setTexture(res.pitgeon_awake_1);
        } else {
            this.pitgeon_image = res.pitgeon_awake_2;
            this.pitgeon_phNode.setTexture(res.pitgeon_awake_2);
        }
        
        
    },
    
    touchedPitgeon: function(location, event){
        var target = event.getCurrentTarget();
        if(cc.rectContainsPoint(target.pitgeon_phNode.getBoundingBox(),location.getLocation()) && target.pitgeon_state != "Moved"){
            target.pitgeon_state = "Move";
            target.pitgeon_started = location.getLocation();
        }
        
        return true;
    },
    
    traceBird: function(location, event){
        
		var  target = event.getCurrentTarget();
        
        if(target.pitgeon_state == "Move"){
            target.pitgeon_phBody.setPos(cc.p(location.getLocationX(),location.getLocationY()));
        }
        
        return true;
	},
    
    endedPitgeon: function(location, event){
        
		var  target = event.getCurrentTarget();
        
        if(target.pitgeon_state == "Move"){     
            Space.addBody(target.pitgeon_phBody);
            Space.addShape(target.pitgeon_phShape);
            target.pitgeon_state = "Moved";
            
            target.pitgeon_phBody.setVel(cp.v( (target.pitgeon_started.x - location.getLocationX()) * target.pitgeon_velocity, (target.pitgeon_started.y - location.getLocationY()) * target.pitgeon_velocity));
            cc.audioEngine.playEffect(res.music_fly, false);
        }
        
        return true;
    },
    
    resetPitgeon: function(target){
        
        if(target.pitgeon_state == "Moved"){
            target.pitgeon_state = "Stay";
            target.pitgeon_phNode.setRotation(0);
            Space.removeBody(this.pitgeon_phBody);
            Space.removeShape(this.pitgeon_phShape);
            target.pitgeon_phBody.setPos(cc.p(cc.winSize.width/5, cc.winSize.height/3));
            this.removeChild(this.lifes[this.lifes.length-1]);
            this.lifes.pop();
            this.contLifes--;
            if(this.contLifes == 0){
                alert("Usted a perdido. Presione 'OK' para continuar.");
                this.initializeLifes();
            }
        }
        
        return true;
    },
    
    resetGame: function(target){
        
        this.resetPitgeon(target);
        this.initializeLifes();
        
        // Taking blocks out of space
        for(var i = 0; i < target.blocksBodies.length; i++){
            Space.removeShape(target.blocksShapes[i]);
            Space.removeBody(target.blocksBodies[i]);
            this.removeChildByTag(i);
            target.blocksBodies[i].setPos(cc.p(target.blocksInitialPos[i].x, target.blocksInitialPos[i].y) );
            
        }
        
        // Placing blocks again on the space
        for(var i = 0; i < target.blocksBodies.length; i++){
            
            Space.addBody(target.blocksBodies[i]);
            Space.addShape(target.blocksShapes[i]);
            //target.blocksNodes[i].setRotation(0);
            this.addChild(target.blocksNodes[i], 1, i);
            
        }
        
        // Taking enemies out of space
        for(var i = 0; i < target.enemiesBodies.length; i++){
            Space.removeShape(target.enemiesShapes[i]);
            Space.removeBody(target.enemiesBodies[i]);
            this.removeChildByTag(i+100);
            target.enemiesBodies[i].setPos(cc.p(target.enemiesInitialPos[i].x, target.enemiesInitialPos[i].y) );
            
        }
        
        // Placing enemies again on the space
        for(var i = 0; i < target.enemiesBodies.length; i++){
            
            Space.addBody(target.enemiesBodies[i]);
            Space.addShape(target.enemiesShapes[i]);
            target.enemiesNodes[i].setRotation(0);
            this.addChild(target.enemiesNodes[i], 1, 100+i);
        }
        
        return true;
    },
    
    nextOportunityEvent: function(location, event){
        this.resetPitgeon(this);
    },
    
    resetEvent: function(location, event){
        this.resetGame(this);
        return true;
    },
    
    checkIfDie: function(){
        // Taking enemies out of space
        for(var i = 0; i < target.enemiesBodies.length; i++){
            for(var j = 0; i < target.blocksBodies.length; j++){
                if(cc.rectIntersectsRect(target.enemiesBodies[i].getBoundingBox(),target.blocksBodies[j].getBoundingBox())){
                    alert("mdsakmsa");
                }
            }
        }
        
        return true;
    }
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

