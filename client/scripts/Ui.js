//
// Ui.js

//
function Ui(my_socket,client_data){
    this.my_socket = my_socket;
    this.JOYSTICK_ID = "joyDiv"; //조이스틱과 연결하기 위한 인터페이스
    this.selected_char = 'none';

    JOYSTICK_ID=this.JOYSTICK_ID;
    
    selected_char = 'none';


    this.create_login_ui=function(){

        //게임 화면 생성
        const game_div = document.createElement('div');//game 플레이화면의 모든 요소들을 포함하는 부모div 
        document.body.appendChild(game_div);

        const game_canvas = document.createElement('canvas');//게임 렌더링 캔버스
        game_canvas.id =GAME_CANVAS_ID;
        console.log("game canvas 생성...");
        game_div.appendChild(game_canvas);

        //게임 UI 생성
        const ui_div = document.createElement("form");//game 접속 UI 의 모든 요소들을 포함하는 부모div
        ui_div.id='ui_div'
        document.body.appendChild(ui_div);
        
        const ui_title = document.createElement('div');//게임 제목을 표시
        ui_title.classList.add('ui');
        ui_title.classList.add('title');
        ui_title.innerHTML='온라인 게임';

        ui_div.appendChild(ui_title);
/////로그인 창
        const ui_name_input = document.createElement('input');//닉네임 입력란
        ui_name_input.classList.add('ui');
        ui_name_input.setAttribute('required','');
        ui_name_input.id='username_input';
        ui_name_input.setAttribute('placeholder','아이디를 입력하세요');
        ui_name_input.setAttribute('maxlength','8');

        ui_div.appendChild(ui_name_input);
        
        const ui_password_input = document.createElement('input');//비밀번호 입력란
        ui_password_input.classList.add('ui');
        ui_password_input.setAttribute('required','');
        ui_password_input.setAttribute('type','password');
        ui_password_input.id='password_input';
        ui_password_input.setAttribute('placeholder','비밀번호를 입력하세요');
        ui_password_input.setAttribute('maxlength','8');
        ui_div.appendChild(ui_password_input);
        

        const ui_signIn_button = document.createElement('button');//접속 버튼(가입이 되어있는 경우)
        ui_signIn_button.classList.add('ui');
        ui_signIn_button.id='signIn_button';
        ui_signIn_button.innerHTML='접속';

        ui_signIn_button.onclick = function(){
            event.preventDefault();
            if(selected_char==="none"){//캐릭터를 선택하지않으면 랜덤으로 선택
                selected_char=client_data.char_list_pick[Math.floor(Math.random()*client_data.char_list_pick.length)];
            }
            my_socket.emit('signIn', { username: ui_name_input.value.trim(), password: ui_password_input.value.trim(), char:selected_char });
        }
    
        ui_div.appendChild(ui_signIn_button);

        const ui_signUp_button = document.createElement('button');//접속 버튼(가입이 안되어있는 경우)
        ui_signUp_button.classList.add('ui');
        ui_signUp_button.id='signUp_button';
        ui_signIn_button.setAttribute('type','submit');
        ui_signUp_button.innerHTML='가입';

        ui_signUp_button.onclick = function(){
            event.preventDefault();
            my_socket.emit('signUp', { username: ui_name_input.value.trim(), password: ui_password_input.value.trim() });
        }
    
        ui_div.appendChild(ui_signUp_button);

        my_socket.on('signUpResponse', function (data) {
            if (data.success) {
                alert("가입되었습니다! 아이디와 비밀번호로 로그인하세요.")
            }
            else
                alert("가입오류 : 닉네임이 사용중입니다.");
        });
        my_socket.on('signInResponse', function (data) {
            if (data.success) {
                ui_div.style.display = 'none';
            }
            else
                alert("아이디 또는 비밀번호가 틀리거나, 존재하지 않는 계정입니다.");
        });


    ///////
        const ui_how_to_play = document.createElement('button');//조작법 안내 버튼
        ui_how_to_play.classList.add('ui');
        ui_how_to_play.classList.add('how-to-play');
        ui_how_to_play.innerHTML='이동:WASD 발사:K';
        ui_div.appendChild(ui_how_to_play);


        //캐릭터 선택창
        const ui_char_select=document.createElement('div');
        ui_char_select.classList.add('ui');
        ui_char_select.classList.add('char-select');

        const ui_char_select_prompt=document.createElement('p');
        ui_char_select_prompt.id="char_select_prompt"

        function update_char_selected(){
            ui_char_select_prompt.id="char_selected_prompt_picked";
            ui_char_select_prompt.innerText="캐릭터"
            ui_char_select_prompt.innerText=client_data.charname_list[selected_char];
        }
        

        ui_char_select_prompt.innerText='캐릭터를 선택하세요';
    
        ui_char_select.id='char-select';
        ui_div.appendChild(ui_char_select);
        ui_char_select.appendChild(ui_char_select_prompt);

        //캐릭터 선택창 세부 캐릭터 선택 버튼 블록
        for(item of client_data.char_list_pick){
            //console.log(item);
            let temp_char_button = document.createElement('button');
            temp_char_button.id = item+'-id';
            temp_char_button.classList.add("char_button");
            // temp_char_button.innerText=client_data.charname_list[item];

            const char_button_image = new Image();
            char_button_image.src = 'client/sprites/sprite_select/'+item+'_select.png';
            char_button_image.classList.add('char_button_image');
            ui_char_select.appendChild(temp_char_button);
            temp_char_button.appendChild(char_button_image);
        }
        
        //onclick 함수는 for문으로 순회가 불가능하다. (왠진모름) 클로저를 사용해야함. (*stackoverflow 참고)
        for(item of client_data.char_list_pick){
            (function(closure){
                document.getElementById(item+'-id').onclick=function(){
                    selected_char=closure;
                    update_char_selected();
                }  
            })(item);
        }

        //모바일 컨트롤러
        mobile_controller_div=document.createElement('div');
        // mobile_controller_div.id=JOYSTICK_ID;
        mobile_controller_div.id="mobile_controller_id";
        document.body.appendChild(mobile_controller_div);
        //
        
        const ui_guide_page = document.createElement('div'); //조작법 안내 세부 페이지
        ui_guide_page.classList.add('ui');
        ui_guide_page.classList.add('guide');
        ui_guide_page.id = "guideID";
        ui_guide_page.innerHTML='이동 : w a s d \n 발사 : k';

        const ui_player_list_box = document.createElement('div'); //접속중인 플레이어 표시 박스
        ui_player_list_box.id = 'ui_player_list_box';
        ui_player_list_box.innerHTML='접속중인 플레이어';

        game_div.appendChild(ui_player_list_box);

        const player_list = document.createElement('div'); //접속중인 플레이어 리스트. 접속중인 플레이어 표시 박스 안에 자식요소로 삽입됨.
        player_list.id = PLAYER_LIST_ID;

        ui_player_list_box.appendChild(player_list);

        //채팅 입력폼
        const ui_chat_form = document.createElement('form');
        ui_chat_form.id = "ui_chat_form";

        game_div.appendChild(ui_chat_form);

        const ui_chat_input = document.createElement('input');
        ui_chat_input.id= "ui_chat_input";
        ui_chat_input.setAttribute('maxlength','15');
        ui_chat_input.setAttribute('placeholder','채팅창');
        ui_chat_input.setAttribute("type","text");

        ui_chat_form.appendChild(ui_chat_input);

        ui_chat_form.onsubmit = function(event){
            event.preventDefault();
            my_socket.emit('sendMsgToServer',ui_chat_input.value);
            ui_chat_input.value='';

            
        }

        //모바일 토글 버튼
        const joystick = document.getElementById(JOYSTICK_ID)
        const ui_mobile_toggle_prompt = document.createElement('div');
        ui_mobile_toggle_prompt.innerText = "모바일";
        
        
        const ui_mobile_toggle_outline = document.createElement('div'); 
        const ui_mobile_toggle_button = document.createElement('div');
        
        ui_mobile_toggle_prompt.id = "mobile_toggle_prompt";
        ui_mobile_toggle_outline.id = "mobile_toggle_outline";
        ui_mobile_toggle_outline.classList.add("mobile_toggle_outline");
        ui_mobile_toggle_button.classList.add("mobile_toggle_button");
        

        ui_mobile_toggle_outline.onclick = ()=>{
            ui_mobile_toggle_outline.classList.toggle('active');
            if(ui_mobile_toggle_outline.classList.contains('active')){
                document.getElementById(MOBILE_CONTROLLER_ID).style.visibility='visible';
            }else{
                document.getElementById(MOBILE_CONTROLLER_ID).style.visibility='hidden';
            }
            
        }
        document.body.appendChild(ui_mobile_toggle_prompt);
        document.body.appendChild(ui_mobile_toggle_outline);
        ui_mobile_toggle_outline.appendChild(ui_mobile_toggle_button);

        // const hp_bar = document.createElement('progress'); //캐릭터 위 체력바 표시
        // hp_bar.id = 'my_skill';
        // hp_bar.value = '0';
        // hp_bar.max = '100';


        //모바일 전환 버튼
        /*
        ui_mobile_toggle.onclick = function(){
          const joystick = document.getElementById(JOYSTICK_ID)
          joystick.style.visibility='visible';
          mobile_attack_button.style.visibility='visible';
        };
        */

    }
}
