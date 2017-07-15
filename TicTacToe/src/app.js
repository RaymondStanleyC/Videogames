
var HelloWorldLayer = cc.Layer.extend({
    table:null,
    turn:"Niño",
    elementsStateView:new Array(["-","-","-"],["-","-","-"],["-","-","-"]),
    elementsState:new Array(["-","-","-"],["-","-","-"],["-","-","-"]),
    winningState: "-",
    
    ctor:function () {
        
        this._super();
        var size = cc.winSize;
		this.size = size;
        
        
        // Adding Title
        var helloLabel = new cc.LabelTTF("Raymond Stanley\n      TicTacToe", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 170;
        this.addChild(helloLabel, 5);
        
        // Adding Table Sprite
        this.table = new cc.Sprite(res.tablero_png);
        this.table.attr({x: size.width / 2,y: size.height / 2});
        this.addChild(this.table, 0);
        
        var button = new ccui.Button();
        button.loadTextures(res.reset_png, res.resetPush_png);
        button.x = size.width / 2 + 240;
        button.y = size.height / 2;
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.jugar
		}, this);
        
        return true;
    },
    
    touchEvent: function(sender, type){
        
        this.cleanCurrentState();
        
        switch(type){
                
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch down");
                break;
            
            case ccui.Widget.TOUCH_MOVED:
                cc.log("Touch moved");
                break;
            
            case ccui.Widget.TOUCH_ENDED:
                cc.log("Touch ended");
                
                break;
            
            case ccui.Widget.TOUCH_CANCELLED:
                cc.log("Touch cancelled");
                break;
        }
    },
    
    cleanCurrentState: function(){
        
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                this.removeChildByTag( (i+1)*10 + j, true);
            }
        }
        this.elementsStateView = new Array(["-","-","-"],["-","-","-"],["-","-","-"]);
        this.elementsState = new Array(["-","-","-"],["-","-","-"],["-","-","-"]);
        this.winningState = "-";
    },
    
    jugar:function(touch, event){
        
        var lineX1 = 341, lineX2 = 434, lineX3 = 527, lineX4 = 621;
        var lineY1 = 422, lineY2 = 320, lineY3 = 215, lineY4 = 110;
        var alignedX1 = lineX1 + (lineX2-lineX1)/2, alignedX2 = lineX2 + (lineX3-lineX2)/2, alignedX3 = lineX3 + (lineX4-lineX3)/2;
        var alignedY1 = lineY1 + (lineY2-lineY1)/2, alignedY2 = lineY2 + (lineY3-lineY2)/2, alignedY3 = lineY3 + (lineY4-lineY3)/2;
        var target = event.getCurrentTarget();
        var x = Math.floor(touch.getLocationX());
        var y = Math.floor(touch.getLocationY());
        
        if(target.turn == "Niño"){
            if(executePlay()){
                checkWinningState();
                target.turn = "Niña";
            }
        } else{
            if(executePlay()){
                checkWinningState();
                target.turn = "Niño";
            }
        }
        
        //alert("X: " + x + " Y: "+y);
        function executePlay(){
            
            if(x < lineX2 && y > lineY2){//    alert("Esquina superior izquierda");
            
                return display(0, 0, alignedX1, alignedY1);
                 
            } else if(x >lineX2 && x < lineX3 && y>lineY2){//    alert("Superior");
                
                return display(0, 1, alignedX2, alignedY1);
                
            } else if(x >lineX3 && y > lineY2){//    alert("Esquina superior derecha");
                
                return display(0, 2, alignedX3, alignedY1);
                
            } else if(x < lineX2 && y < lineY2 && y>lineY3){//    alert("Izquierda");
                
                return display(1, 0, alignedX1, alignedY2);
                
            } else if(x > lineX3 && y < lineY2 && y>lineY3){//    alert("Derecha");
                
                return display(1, 2, alignedX3, alignedY2);
                
            } else if(x < lineX2 && y < lineY3){//    alert("Esquina inferior izquierda");
                
                return display(2, 0, alignedX1, alignedY3);
                
            } else if(x > lineX2 && x < lineX3 && y<lineY3){//     alert("Inferior");
                
                return display(2, 1, alignedX2, alignedY3);
                
            } else if(x > lineX3 && y < lineY3){//    alert("Esquina inferior derecha");
                
                return display(2, 2, alignedX3, alignedY3);
                
            } else{//    alert("Centro");
                
                return display(1, 1, alignedX2, alignedY2);
                
            }
        }
        
        function display(x1, x2, coordX, coordY){
            if(target.turn == "Niño"){
                if(target.elementsStateView[x1][x2] == "-"){

                    target.elementsStateView[x1][x2] = new cc.Sprite(res.O_png);
                    target.elementsStateView[x1][x2].attr({x: coordX, y: coordY});
                    target.elementsStateView[x1][x2].setTag( (x1+1)*10 + x2 );
                    target.addChild(target.elementsStateView[x1][x2], 1);  
                    target.elementsState[x1][x2] = "Niño";
                    
                    return true;
                }

                return false;
            }else{
                if(target.elementsStateView[x1][x2] == "-"){

                    target.elementsStateView[x1][x2] = new cc.Sprite(res.X_png);
                    target.elementsStateView[x1][x2].attr({x: coordX, y: coordY});
                    target.elementsStateView[x1][x2].setTag( (x1+1)*10 + x2 );
                    target.addChild(target.elementsStateView[x1][x2], 1);
                    target.elementsState[x1][x2] = "Niña";

                    return true;
                }

                return false;
            }
        }
        
        function checkWinningState(){
            checkHorizontally();
            checkVertically();
            checkDiagonally();
            if(target.winningState == "-"){
                checkTie();
            }
            
            if(target.winningState != "-"){
                if(target.winningState != "tie"){
                    alert("Ganó: " + target.winningState);
                } else{
                    alert("Empate!!");
                }
            }
        }
        
        function checkHorizontally(){
            //checking Horizontally
            for(var i = 0; i<3;i++){
                var flag = true;
                for(var j = 0; j<3; j++){
                    if(target.elementsState[i][j] != target.turn){
                        flag = false;
                    }   
                }
                if(flag){
                    target.winningState = target.turn;
                }
            }
        }
        
        function checkVertically(){
            for(var i = 0; i<3;i++){
                var flag = true;
                for(var j = 0; j<3; j++){
                    if(target.elementsState[j][i] != target.turn){
                        flag = false;
                    }   
                }
                if(flag){
                    target.winningState = target.turn;
                }
            }
        }
        
        function checkDiagonally(){
            if( (target.elementsState[0][0] == target.turn && target.elementsState[1][1] == target.turn && target.elementsState[2][2] == target.turn) 
               || (target.elementsState[2][0] == target.turn && target.elementsState[1][1] == target.turn && target.elementsState[0][2] == target.turn) ){
               
                target.winningState = target.turn;
            }
        }
        
        function checkTie(){
            var flag = true;
            for(var i = 0; i<3;i++){
                for(var j = 0; j<3; j++){
                    if(target.elementsState[j][i] == "-"){
                        flag = false;
                    }   
                }
            }
            if(flag == true){
                target.winningState = "tie";
            }
        }
        
    }
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

