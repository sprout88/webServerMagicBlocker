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