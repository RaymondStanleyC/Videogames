
var HelloWorldLayer = cc.Layer.extend({
    player1:null,    
    player2:null,    
    ball:null,    
    score1Point:0,
    score2Point:0,
    score1:0,
    score2:0,
    CONST_X:2,
    CONST_Y:2,
    size:null,
    movementX:null,
    movementY:null,
    
    ctor:function () {
        
        this._super();
        this.inicializar();

        return true;
    },
    
    inicializar:function(){
        
        this.schedule(this.moveIt, 0.001);
        this.size = cc.winSize;
        var color = cc.color(100,100,100);
        var ballColor = cc.color(118,255,3);

        this.score1 = new cc.LabelTTF(""+this.score1Point,"Arial",24);
        this.score1.setPosition(this.size.width * 0.4, this.size.height - (this.size.height * 0.10));
        this.addChild(this.score1,0);
        
        this.score2 = new cc.LabelTTF(""+this.score2Point,"Arial",24);
        this.score2.setPosition(this.size.width - (this.size.width * 0.4), this.size.height - (this.size.height * 0.10));
        this.addChild(this.score2,0);

        this.player1 = new cc.Sprite(res.bar_png);
        this.player1.setPosition(this.size.width * 0.1,(this.size.height / 2)-40 );
        this.player1.setScale(0.1);
        this.addChild(this.player1, 1);  
        
        this.player2 =  new cc.Sprite(res.bar_png);
        this.player2.setPosition(this.size.width -(this.size.width * 0.1), (this.size.height / 2)-40  );
        this.player2.setScale(0.1);
        this.addChild(this.player2, 1);
        
        this.ball = new cc.Sprite(res.ball_png);
        this.ball.attr({x: this.size.width / 2, y: this.size.height / 2});
        this.ball.setScale(0.05);
        this.addChild(this.ball, 1);  

        var middleLine =  new cc.DrawNode();
        middleLine.drawSegment(cc.p(this.size.width/2,0),cc.p(this.size.width/2,this.size.height),3,color);
        this.addChild(middleLine,0);
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed: this.play
		}, this);
    },
    
    play: function(keyCode, event){
        
        var target = event.getCurrentTarget();
        
        // Boton arriba presionado jugador 1
        if(keyCode == 38){
            target.player1.setPositionY(target.player1.getPositionY() + target.size.height/20);
        }
        
        // Boton abajo presionado jugador 1
        if(keyCode == 40){
            target.player1.setPositionY(target.player1.getPositionY() - target.size.height/20);
        }
        
        // Boton arriba presionado jugador 2
        if(keyCode == 87){
            target.player2.setPositionY(target.player2.getPositionY() + target.size.height/20);
        }
        
        // Boton abajo presionado jugador 2
        if(keyCode == 83){
            target.player2.setPositionY(target.player2.getPositionY() - target.size.height/20);
        }
        
    },
    
    moveIt: function(){
        var position = this.ball.getPosition();
        
        if(position.y <= 20 || position.y >= cc.winSize.height - 40){
            this.CONST_Y *= -1;
        } else if(position.x <= 0 ){
            this.score2Point++;
            this.score2.setString(""+this.score2Point);
            this.removeAllChildren();
            this.inicializar();
        } else if(position.x >= cc.winSize.width){
            this.score1Point++;
            this.score1.setString(""+this.score1Point);
            this.removeAllChildren();
            this.inicializar();
        } else if (cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player1.getBoundingBox())){
            cc.log("collision");
            this.CONST_X *= -1;
        }
        
        else if(cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player2.getBoundingBox())){
            cc.log("collision");
            this.CONST_X *= -1;       
        }
        
        var newX = this.ball.getPosition().x + this.CONST_X;
        var newY = this.ball.getPosition().y + this.CONST_Y;
        
        this.ball.setPosition(newX, newY);
    }
    
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

