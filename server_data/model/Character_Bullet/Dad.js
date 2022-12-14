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