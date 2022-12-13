//
//Bullet.js
//투사체 클래스
 function Bullet(playerId,posX,posY,direction,char) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=0;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;
    this.damage=20;
    damage=this.damage;
    

    this.update = function(){
        this.updatePosition();
        if (this.timer++ > 30) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        player.hp -= damage;
    }
}
//
//Player.js
//플레이어 클래스
 function Player(id, name, char) {
    this.type = 'player';
    //게임 시작 시 고정된 위치에서 플레이어가 소환
    //this.x = X_STARTING_POS;
    //this.y = Y_STARTING_POS;
    this.x = Math.random()*1000;
    this.y = Math.random()*500;
    this.id = id;
    this.username = name;
    this.char = char;//bullet에게 전달. bullet을 쏜 주인이 누구인지 가리킴
    this.direction = STARTING_DIR;
    this.hp=100;
    this.isalive=true;
    isalive = this.isalive;
    this.host_char = char;
    this.slowRate=1;
    slowRate = this.slowRate;
    this.isSlowed=false;
    this.slowTime=0;
    this.cooldown = 0;

    this.rightPress = false;
    this.leftPress=false;
    this.downPress=false;
    this.upPress=false;
    this.isShoot=false;
    this.cc="";
    this.speed=PLAYER_SPEED;
    
    this.chat = "";//채팅기능
    this.chat_duration = CHAT_DURATION; //채팅지속시간

    this.updatePosition = function () {
        //onsole.log("slowTime:"+this.slowTime);
        //console.log("slowRate:"+this.slowRate);
        //console.log("speed:"+this.speed);

        if(this.chat_duration>-100){
            this.chat_duration-=1;
        }

        if(this.slowTime>0){
            if(this.isSlowed==false){
                this.speed=this.speed*this.slowRate;
                this.isSlowed=true;
                this.cc="느려짐!";
            }
        }else{
            this.speed = PLAYER_SPEED;
            this.cc="";
            this.isSlowed=false;
        }
        
        if(this.chat!=="" && this.chat_duration<0){
            this.chat="";
            this.chat_duration=CHAT_DURATION;
        }

        if (this.rightPress){
            this.x += this.speed;
            this.direction='right';
            //console.log('right!!!')
        }                
        else if (this.leftPress){
            this.x -= this.speed;
            this.direction='left';
            //console.log('left!!!')
        }   
        else if (this.upPress){
            this.y -= this.speed;
            this.direction='up';
            //console.log('up!!!')
        }
        else if (this.downPress){
            this.y += this.speed;
            this.direction='down';
            //console.log('down!!!')
        }
        if(this.x<0){
            this.x+=this.speed;
        }
        if(this.x>MAP_WIDTH-MAP_PAD){
            this.x-=this.speed;
        }
        if(this.y<0){
            this.y+=this.speed;
        }
        if(this.y>MAP_HEIGHT-MAP_PAD){
            this.y-=this.speed;
        }
    };


    this.shootBullet = function (){
        /*
        if(this.isShoot&&this.cooldown===0&&this.isalive===true){
            let bullet = new Bullet(this.id,this.x,this.y,this.direction,this.char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }
        */


        if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="ako"){
            let bullet = new Ako(this.id,this.x,this.y,this.direction,char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="ashe"){
            let bullet = new Ashe(this.id,this.x,this.y,this.direction,this.host_char,false);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="buzzi"){
            let bullet = new Buzzi(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="dad"){
            let bullet = new Dad(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="ezreal"){
            let bullet = new Ezreal(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="kitty"){
            let bullet = new Kitty(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="monk"){
            let bullet = new Monk(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="pepe"){
            let bullet = new Pepe(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="santa"){
            let bullet = new Santa(this.id,this.x,this.y,this.direction,this.host_char);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="soldier"){
            let bullet = new Soldier(this.id,this.x,this.y,this.direction,this.host_char,false);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
        }else if(this.isShoot&&this.cooldown===0&&this.isalive===true&&char=="zed"){
            let bullet = new Zed(this.id,this.x,this.y,this.direction,this.host_char,false);
            bulletList[bullet.id] = bullet;
            this.cooldown=COOL_TIME;
    }
        
        
        
    };

    this.updateCooldown = function(){
        if(this.cooldown>0){
            this.cooldown-=1;
        }
        if(this.slowTime>0){
            this.slowTime-=1;
        }
    }

    this.die = function(){
        this.isalive=false;
        this.char='ghost';
    }

};
//
// 서버에서 사용되는 상수
//
 const SERVER_PORT = 8000;
 const REFRESH_RATE = 25;
 
 const X_STARTING_POS = 30;
 const Y_STARTING_POS = 30;
 const PLAYER_SPEED = 10;
 const STARTING_DIR = 'down';
 const STARTING_CHAR = 'warrior';
 const MONGO_REPO = "Account";
 const BULLET_SPEED = 20;

 const COOL_TIME = 20;

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;
const MAP_PAD = 100;

const CHAT_DURATION = 250;
//
//Ako.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Ako(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){//관통형 중복데미지
        player.hp -= damage;
        isHit=true;

    }
}
//
//Ashe.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Ashe(playerId,posX,posY,direction,char,isScatter) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;

    this.isScatter=isScatter;

    this.scatter=function(){
        if(direction=='up'){
            let bullet1 = new Ashe(playerId,posX+30,posY,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Ashe(playerId,posX-30,posY,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }else if(direction=='down'){
            let bullet1 = new Ashe(playerId,posX+30,posY,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Ashe(playerId,posX-30,posY,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }else if(direction=='left'){
            let bullet1 = new Ashe(playerId,posX,posY+30,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Ashe(playerId,posX,posY-30,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }else if(direction=='right'){
            let bullet1 = new Ashe(playerId,posX,posY+30,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Ashe(playerId,posX,posY-30,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }
    }

    if(this.isScatter===false){
        this.scatter();
    }

    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            player.slowTime = 50;
            player.slowRate = 0.5;
            this.toRemove = true;
        }

    }
}
//
//Buzzi.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Buzzi(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            player.slowTime = 50;
            player.slowRate = 0.8;
            this.toRemove = true;
        }

    }
}
//
//Dad.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Dad(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            this.toRemove = true;
        }

    }
}
//
//Ezreal.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Ezreal(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED*2;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=20;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            this.toRemove = true;
        }

    }
}
//
//Kitty.js
//총알 클래스
//
function Kitty(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED*0.6;
    this.timer=20;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){ //관통형 중복데미지
            player.hp -= damage;

    }
}
//
//Monk.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Monk(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            this.toRemove = true;
        }

    }
}
//
//Pepe.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Pepe(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED*2;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            this.toRemove = true;
        }

    }
}
//
//Santa.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Santa(playerId,posX,posY,direction,char){
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;



    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            this.toRemove = true;
        }

    }
}
//
//Soldier.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Soldier(playerId,posX,posY,direction,char,isScatter) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=15;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;

    this.isScatter=isScatter;

    this.scatter=function(){
        if(direction=='up'){
            let bullet1 = new Soldier(playerId,posX,posY+40,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Soldier(playerId,posX,posY+80,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }else if(direction=='down'){
            let bullet1 = new Soldier(playerId,posX,posY+40,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Soldier(playerId,posX,posY+80,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }else if(direction=='left'){
            let bullet1 = new Soldier(playerId,posX+40,posY,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Soldier(playerId,posX+80,posY,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }else if(direction=='right'){
            let bullet1 = new Soldier(playerId,posX+40,posY,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
            let bullet2 = new Soldier(playerId,posX+80,posY,direction,char,true);
            bulletList[bullet2.id] = bullet2;
            bullet2.cooldown=COOL_TIME;
        }
    }

    if(this.isScatter===false){
        this.scatter();
    }

    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
            this.toRemove = true;
        }

    }
}
//
//Zed.js
//총알 클래스
//한번에 세개의 총알을 발사한다.
function Zed(playerId,posX,posY,direction,char,isScatter) {
    this.type = 'bullet';
    this.id=Math.random();
    this.x=posX+25;//25는 플레이어 중앙에서 투사체가 나가는것을 방지(테스트필요)
    this.y=posY+25;
    this.playerId=playerId;//누가 발사한 투사체인지
    this.speed=BULLET_SPEED;
    this.timer=100;//투사체 소멸시간. 사정거리방식 도입이후 교체 예정
    this.toRemove=false;//투사체 소멸트리거
    this.direction = direction;
    this.char=char;

    this.damage=30;
    damage=this.damage;

    this.isHit = false;
    isHit = this.isHit;

    this.isScatter=isScatter;

    this.scatter=function(){
        if(direction=='up'){
            let bullet1 = new Zed(playerId,posX+30,posY+10,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
        }else if(direction=='down'){
            let bullet1 = new Zed(playerId,posX+30,posY-10,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
        }else if(direction=='left'){
            let bullet1 = new Zed(playerId,posX-10,posY+30,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
        }else if(direction=='right'){
            let bullet1 = new Zed(playerId,posX+10,posY+30,direction,char,true);
            bulletList[bullet1.id] = bullet1;
            bullet1.cooldown=COOL_TIME;
        }
    }

    if(this.isScatter===false){
        this.scatter();
    }

    this.update = function(){
        this.updatePosition();
        if (this.timer-- < 0) //특정 시간이 지나면 this 소멸. server 과부하 막기위함. 사정거리로 바꿀것임.
        this.toRemove = true;
    };

    this.updatePosition = function(){
    if (this.direction === 'right')
        this.x += this.speed;
    else if (this.direction === 'left')
        this.x -= this.speed;
    else if (this.direction === 'up')
        this.y -= this.speed;
    else if (this.direction === 'down')
        this.y += this.speed;
    };

    this.hit = function(player){ //관통형, 비중복데미지
        if(isHit==false){
            player.hp -= damage;
            isHit=true;
        }

    }
}
//
//onConnect.js
//
function onConnect(socket, userData) {
 
    let player = new Player(socket.id,userData.username,userData.char);
    playerList[socket.id] = player; //playerList는 id 여러개를 가지는 객체. player객체를 저장함

    socket.on('keyPress', function (data) {   //glitchy character movement

        //player.direction = data.direction;
        //키보드 조작
        if (data.inputId === 'right'){
           player.rightPress = data.state;
            //player.direction = 'right';
        }else if (data.inputId === 'left'){
           player.leftPress = data.state;
            //player.direction='left';
        }else if (data.inputId === 'up'){
           player.upPress = data.state;
            //player.direction='up';
        }else if (data.inputId === 'down'){
           player.downPress = data.state;
            //player.direction='down';
        }
        
        //모바일 조이스틱은 취소버튼이 없기때문에, 키보드와 다른 event로 움직임 고정현상을 방지하였다.
        if (data.inputId === 'joy_right'){
           player.leftPress=false;
           player.upPress=false;
           player.downPress=false;
           player.rightPress = data.state;
            //player.direction = 'right';
        }else if (data.inputId === 'joy_left'){
           player.rightPress=false;
           player.upPress=false;
           player.downPress=false;
           player.leftPress = data.state;
            //player.direction='left';
        }else if (data.inputId === 'joy_up'){
           player.leftPress=false;
           player.rightPress=false;
           player.downPress=false; 
           player.upPress = data.state;
            //player.direction='up';
        }else if (data.inputId === 'joy_down'){
           player.leftPress=false;
           player.upPress=false;
           player.rightPress=false; 
           player.downPress = data.state;
            //player.direction='down';
        }else if (data.inputId==='joy_stop'){
           player.leftPress=false;
           player.upPress=false;
           player.rightPress=false; 
           player.downPress =false;
        }

        if (data.inputId === 'shoot'&& playerList[socket.id] != null){
           player.isShoot=data.state;
           if(player.isShoot){
               setTimeout(()=>{player.isShoot=false},50);//모바일은 버튼업이 없기때문에, 공격을 토글하는 코드
           }
        }
   
            
       });

    socket.on('sendMsgToServer', function (data) {
        //let playerName = ("" + player.username);
        //toAllChat(playerName + ': ' + data);
        player.chat = data;
    });

    socket.on('kms', function () {
        if (playerList[socket.id] != null) {
            delete playerList[socket.id];
        }
    });

    socket.on('revive', function () {
        if (playerList[socket.id] == null) {
            playerList[socket.id] = player;
        }
    });

    socket.on('charUpdate', function (data) {
        player.char = data.charName;
    });
}
//
//toAllChat.js
//
function toAllChat(line) { //채팅시스템
    for (let i in socketList)
        socketList[i].emit('addToChat', line);
}
//
// 게임 서버 메인 앱
//
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {});

let mongoClient=require('mongodb').MongoClient;
let url = "mongodb+srv://admin:password123456@cluster0.qsuxf.mongodb.net/mmorpgdb?retryWrites=true&w=majority";
let Promise = require('promise');
let dbo;

app.get('/', function (req, res) {
     res.sendFile(__dirname + '/client/index.html');
});
 
app.use('/client', express.static(__dirname + '/client'));
 
server.listen(process.env.PORT || SERVER_PORT);
 
console.log('Server Started! localhost: ' + SERVER_PORT);
 
 //전역 객체 리스트. 서버에서 접속자, 플레이어, 투사체 객체를 보관하고, pop push함
let socketList = {};
let playerList = {};
let bulletList = {};
 
 
mongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {//데이터베이스 연동
    if (err) throw err;
    dbo = db.db("mmorpg");

    dbo.collection(MONGO_REPO, function (err, res) {
        if (err) throw err;
        console.log("Collection 연결되었음...");
    });

});

 io.sockets.on('connection', function (socket) {
 
     socket.id = Math.random();
     socketList[socket.id] = socket;
     console.log("소켓연결됨/socket.id:" + socket.id);
 
     socket.on('signUp', function (userData) {
        isValidNewCredential(userData).then(function (res) {
            if (res)
                insertCredential(userData);
            socket.emit('signUpResponse', { success: res });
        })
    });

     socket.on('signIn',function (userData){
        isCorrectCredential(userData).then(function(res){
            if(res.valid)
                onConnect(socket,userData);
            socket.emit('signInResponse',{success:res.valid});
        })
     });
 
     socket.on('disconnect', function () {
         if (socketList[socket.id] != null) {
             delete socketList[socket.id];
             console.log("소켓연결 해제됨/socket.id:" + socket.id);
         }
         let player = playerList[socket.id];
         if (player != null) {
 
 
             let query = {
                 username: player.username
             };
             delete playerList[socket.id];
         }
     });
 });
 
 setInterval(function () {

    let renderPack = [];

    let playerPack = [];
 
     for (let i in playerList) {
         let player = playerList[i];

         player.updatePosition();
         player.shootBullet();
         player.updateCooldown();

         /*
         renderPack.push({
            type:'player',
            x: player.x,
            y:player.y,
            direction:player.direction,
         })
         */
         
         playerPack.push({
             x: player.x,
             y: player.y,
             username: player.username,
             cooldown:player.cooldown,
             direction: player.direction,
             char: player.char,
             hp:player.hp,
             isalive:player.isalive,
             chat:player.chat,
             cc:player.cc,
             
         });
         
         
     }
 
     let bulletPack = [];
 
     for (let i in bulletList) {
 
         if (bulletList[i].toRemove === true) {
             delete bulletList[i];
         }
         else{
             let bullet = bulletList[i];
             bullet.update();
             
             for (let i in playerList) {
                 let player = playerList[i];
                 
                 if (bullet.x > player.x && bullet.x < player.x + 50 && bullet.y > player.y && bullet.y < player.y + 60){
                     if (player.id != bullet.playerId){
                        //playerList[bullet.playerId].addPoint();   
                        bullet.hit(player);
                     }
                     
                 }
                 if(player.hp<=0){
                    player.hp = 0
                    player.die();
                 }
             }
             /*
             renderPack.push({
                type:'bullet',
                x: bullet.x,
                y:bullet.y,
                direction:bullet.direction,
             })
             */
            
             bulletPack.push({
                 x: bullet.x,
                 y: bullet.y,
                 playerId: bullet.playerId,
                 direction:bullet.direction,
                 char:bullet.char
             });
             
             
         }
     }
     
     
 
     for (let i in socketList) { //모든 플레이어에게 socket 전송
         let socket = socketList[i];
         //socket.emit('renderInfo', playerPack, bulletPack);
         socket.emit('renderInfo', playerPack,bulletPack);
         
     }
    
 }, REFRESH_RATE);
 
 
function isValidNewCredential(userData) {
    return new Promise(function (callback) {
        var query = {
            username: userData.username
        };
        dbo.collection(MONGO_REPO).find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log("데이터베이스에 없는 유저네임: " + JSON.stringify(userData));
                callback(true);
            }
            else {
                callback(false);
                console.log("데이터베이스에 동일한 유저네임이 존재합니다...: " + JSON.stringify(result));
            }
        });
    });
}
 
 function isCorrectCredential(userData) {
    return new Promise(function (callback) {
        var query = {
            username: userData.username,
            password: userData.password
        };
        dbo.collection(MONGO_REPO).find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length != 0) {
                console.log("크리덴셜 매칭: " + JSON.stringify(result[0]));
                callback({ valid: true, points: result[0].points });
            }
            else {
                callback({ valid: false, points: null });
                console.log("패스워드 틀림");
            }
        });
    });
}

function insertCredential(data) {
    var account = {
        username: data.username,
        password: data.password,
        points: 0
    };
    dbo.collection(MONGO_REPO).insertOne(account, function (err, res) {
        if (err) throw err;
        console.log("MongoDB 에 insert 되었습니다.: " + JSON.stringify(account));
    });
}