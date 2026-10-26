/* Module 15 — passive questions */
CONTENT.m15 = {
  title: "Пассив в вопросах",
  idea: "Когда действие совершают НАД предметом, вопрос строится через be + третья форма: Where was it made? Be прыгает вперёд, третья форма остаётся после подлежащего.",
  catSec: {order:"formula",aux_missing:"formula",passive:"why",v3p:"v3",do_form:"why",do_be:"why",be_verb:"why",be_form:"tenses",verb_s:"v3",verb_past:"v3",do_modal:"tenses",modal:"tenses",modal_to:"tenses",prep_end:"by",wh:"useful",short:"errors",article:"errors",other:"formula"},
  cats: {passive:["Пассив вместо do / did","Предмет не делает сам — над ним делают. Нужен be + третья форма: Where was it made? Did / do здесь не подходят."],
    v3p:["Третья форма в пассиве","После be в пассиве — третья форма: made, built, written, sent. С Perfect — been + третья форма."]},
  diagnose({t,u,e,verb,subj}){
    if(!verb) return null;
    const vts=norm(verb).split(" "), v3=vts.filter(w=>w!=="by"&&w!=="for"&&w!=="on").slice(-1)[0];
    if(u.some(w=>DO.includes(w)) && !e.some(w=>DO.includes(w))) return {cat:"passive",msg:"Это пассив: предмет не делает сам, над ним делают. Нужен be + третья форма, а did / do здесь не подходят."};
    if(vts.includes("been") && !u.includes("been") && u.some(w=>HAVE.includes(w))) return {cat:"v3p",msg:"Present Perfect в пассиве: has / have + been + третья форма — Has it been delivered?"};
    if(v3 && !u.includes(v3) && u.some(w=>BE.includes(w)||w==="be")){
      const base=Object.keys(IRREG).find(k=>IRREG[k]===v3);
      return {cat:"v3p",msg:`В пассиве после be нужна третья форма глагола: ${v3}.`};
    }
    if(sameBag(u,e) && subj){
      const s0=norm(subj).split(" ")[0], iS=u.indexOf(s0), iV=u.indexOf(v3);
      if(iS>iV && iV>-1) return {cat:"order",msg:"Подлежащее стоит между be и третьей формой: When was the bridge built? — не When was built the bridge."};
    }
    return null;
  },
  check: [
    {q:"Where ___ this phone made?",opts:["was","did","has"],ans:0,hint:"Телефон сделали (над ним) → пассив: was made."},
    {q:"When was the bridge ___?",opts:["built","build","building"],ans:0,hint:"После was — третья форма: built."},
    {q:"Как правильно?",opts:["Is English spoken here?","Is spoken English here?","Does English speak here?"],ans:0,hint:"Подлежащее между is и spoken."}
  ],
  demos: [
    {name:"Утверждение → вопрос", frames:[
      {t:[["it","It","s"],["was","was","a"],["made","made","v"],["china","in China","o"],["p",".","p"]], c:"Пассив: телефон <b>сделали</b> в Китае. Be + третья форма: <b>was made</b>."},
      {t:[["wh","Where","q"],["was","was","a"],["it","it","s"],["made","made","v"],["p","?","p"]], c:"in China → <b>Where</b>. Прыгает только was, made остаётся после подлежащего: <i>Where was it made?</i>"}]},
    {name:"Ловушка: did", frames:[
      {t:[["wh","Where","q"],["did","did","a","bad"],["it","it","s"],["make","make","v"],["p","?","p"]], c:"<i>Where did it make?</i> = «Где оно сделало (что-то)?» Получается, что телефон сам что-то делал."},
      {t:[["wh","Where","q"],["did","was","a"],["it","it","s"],["make","made","v"],["p","?","p"]], c:"Его сделали → пассив: <i>Where was it made?</i>"}]},
    {name:"Подлежащее в середине", frames:[
      {t:[["wh","When","q"],["was","was","a"],["built","built","v","bad"],["b","the bridge","s"],["p","?","p"]], c:"<i>When was built the bridge?</i> — частая ошибка."},
      {t:[["wh","When","q"],["was","was","a"],["b","the bridge","s"],["built","built","v"],["p","?","p"]], c:"Подлежащее — <b>между</b> be и третьей формой: <i>When was the bridge built?</i>"}]},
    {name:"Perfect: been", frames:[
      {t:[["has","Has","a"],["p1","the package","s"],["d","delivered","v","bad"],["p","?","p"]], c:"<i>Has the package delivered?</i> = «Посылка что-то доставила?»"},
      {t:[["has","Has","a"],["p1","the package","s"],["d","been delivered","v"],["p","?","p"]], c:"Пассив в Perfect: <b>has + been + третья форма</b>: <i>Has the package been delivered?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Когда нужен пассив",body:`
      <p>Пассив — это когда действие совершают <b>над</b> предметом, а кто именно — неважно или неизвестно. Телефон не делает сам — его делают. Мост не строит — его строят.</p>
      <p>${ex("Who made it?")} — кто сделал (активно). ${ex("Where was it made?")} — где сделано (пассив).</p>
      <p>Главная ошибка — использовать did / do: ${strike("Where did it make?")} Это значит «Где оно (само) делало что-то?»</p>`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("q","Where","вопрос. слово")}${PLUS}${slot("a","was / is / will be…","be")}${PLUS}${slot("s","it","подлежащее")}${PLUS}${slot("v","made","3-я форма")}<span class="plus">?</span></div>
      <p>Прыгает только первый помощник. Третья форма остаётся <b>после подлежащего</b>.</p>`},
    {id:"tenses",title:"Пассив во всех временах",body:`
      ${rows(["Время","Вопрос"],[
        ["Present: am / is / are + V3",ex("Is breakfast included?")+" "+ex("How is cheese made?")],
        ["Past: was / were + V3",ex("When was it built?")+" "+ex("Were you invited?")],
        ["Perfect: has / have been + V3",ex("Has it been sent?")],
        ["Future: will be + V3",ex("When will it be finished?")],
        ["Модальный: can / should be + V3",ex("Can it be repaired?")],
        ["Continuous: is being + V3",ex("Is the room being cleaned?")]])}`},
    {id:"v3",title:"Третья форма — ключ",body:`
      ${rows(["Глагол","3-я форма","Вопрос"],[
        ["make","made",ex("Where was it made?")],["build","built",ex("When was it built?")],["write","written",ex("Who was it written by?")],
        ["speak","spoken",ex("Is English spoken here?")],["take","taken",ex("Where was this photo taken?")],["send","sent",ex("Has it been sent?")],
        ["steal","stolen",ex("When was it stolen?")],["tell","told",ex("Have you been told?")],["bear (рождать)","born",ex("Where were you born?")],
        ["invite, deliver, cancel","invited, delivered, cancelled",ex("Were you invited?")]])}`},
    {id:"by",title:"Кем? — by в конце",body:`
      <p>Если хотим узнать исполнителя, добавляем <b>by</b> — в конце вопроса, как предлоги в модуле 9:</p>
      <p>${ex("Who was this book written by?")} ${ex("Who was the telephone invented by?")}</p>
      <p>Но часто проще спросить активно — вопросом к подлежащему: ${ex("Who wrote this book?")}</p>`},
    {id:"useful",title:"Готовые пассивные вопросы",body:`
      ${rows(["Вопрос","Когда пригодится"],[
        [ex("Is breakfast included?"),"в отеле"],[ex("Are dogs allowed?"),"в кафе, парке"],[ex("Is smoking allowed here?"),"везде"],
        [ex("How is it pronounced?"),"на уроке"],[ex("What is it called?"),"как называется"],[ex("Where was it made?"),"в магазине"],
        [ex("Is English spoken here?"),"в путешествии"],[ex("Has my order been sent?"),"заказ в интернете"],[ex("Where were you born?"),"знакомство"]])}`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Предмет сам не делает","Если подлежащее — вещь, над которой что-то делают, нужен пассив: be + третья форма.",[]],
      ["mem","Be прыгает, V3 стоит","Was it made? Is it included? Третья форма никогда не идёт перед подлежащим.",[]],
      ["mem","Been — пропуск в Perfect","Has it been sent? Без been получается «Оно отправило?»",["Has it been sent?"]],
      ["mem","Born — тоже пассив","Where were you born? — «Где ты был рождён?» Поэтому were, а не did.",["Where were you born?"]],
      ["obs","Пассив — язык табличек и сервисов","Is breakfast included? Are pets allowed? Has my order been dispatched? — это стандарт отелей и магазинов.",[]],
      ["obs","Активный вариант часто проще","How do you pronounce it? звучит не хуже, чем How is it pronounced? Выбирай, что легче.",["How do you pronounce it?"]],
      ["obs","Who … by? — норма","Who was it written by? Предлог в конце — это нормально.",[]],
      ["obs","Get вместо be — разговорно","Did you get invited? Did he get fired? — разговорный пассив с get.",["Did you get invited?"]],
      ["hack","Не знаешь, кто сделал? Пассив","Если исполнитель неизвестен, пассив — естественный выбор: When was it stolen?",[]],
      ["hack","Is it…? для правил","Is it allowed? Is it included? Is it required? — три вопроса на все случаи.",["Is it allowed?"]],
      ["hack","What is it called? — когда не знаешь слово","Показываешь на предмет: What's this called in English?",["What's this called in English?"]],
      ["hack","Has it been…? — следить за статусом","Has the payment been received? Has it been approved? — полезно на работе.",["Has it been approved?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Where did it make?","Where was it made?","Предмет не делает сам."],["Where was it make?","Where was it made?","Нужна третья форма."],
      ["When was built the bridge?","When was the bridge built?","Подлежащее — между was и built."],["Is spoken English here?","Is English spoken here?","Подлежащее — между is и spoken."],
      ["Has the package delivered?","Has the package been delivered?","В Perfect — been."],["Did the letter sent?","Was the letter sent?","Пассив — через be."],
      ["Where did you born?","Where were you born?","born — с were."],["Who was written this book by?","Who was this book written by?","Подлежащее — в середине."],
      ["Can it repaired?","Can it be repaired?","После can — be."],["How is called it?","What is it called?","Название — What … called."],
      ["Does breakfast include?","Is breakfast included?","Пассив — через be."],["Where were made these shoes?","Where were these shoes made?","Подлежащее — в середине."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:Where|a:was|s:it|v:made",ru:"Где это сделано?",extra:["did","make"],hint:"Пассив: Where + was + it + made (третья форма).",alt:[["Where does it come from?","активно"],["Where's it from?","разговорно"]]},
  {type:"build",f:"a:Is|s:breakfast|v:included",ru:"Завтрак включён?",extra:["does","include"],hint:"Is + breakfast + included.",alt:[["Does the price include breakfast?","активно"],["Do you serve breakfast?","активно"]]},
  {type:"choose",q:"When ___ this bridge built?",opts:["was","did","is","has"],ans:0,f:"q:When|a:was|s:this bridge|v:built",ru:"Когда построен этот мост?",cat:"passive",hint:"Пассив в прошлом: was + built.",why:{1:"did + built не сочетаются. Мост построили (его) → was built.",2:"is built — «строится обычно». Мост построен в прошлом → was.",3:"has built — без been не пассив."},alt:[["How old is this bridge?","через be"],["When did they build this bridge?","активно, с they"]]},
  {type:"choose",q:"Where was this photo ___?",opts:["taken","take","took","taking"],ans:0,f:"q:Where|a:was|s:this photo|v:taken",ru:"Где сделана эта фотография?",cat:"v3p",hint:"После was в пассиве — третья форма: taken.",why:{1:"take — начальная форма. Нужна третья.",2:"took — вторая форма. Нужна третья: taken."},alt:[["Where did you take this photo?","активно"],["Where's this?","разговорно"]]},
  {type:"tr",ru:"На каком языке здесь говорят?",f:"q:What language|a:is|v:spoken|t:here",acc:["Which language is spoken here","What languages are spoken here","What language do they speak here","What language do people speak here"],hint:"What language + is + spoken + here.",alt:[["What language do people speak here?","активно"],["Do they speak English here?","общий вопрос"]]},
  {type:"fix",wrong:"Where did it make?",f:"q:Where|a:was|s:it|v:made",ru:"Где это сделано?",acc:[],hint:"Предмет не делает сам — его делают. Пассив: was + made.",alt:[["Where's it from?","разговорно"],["Who made it?","активно, к подлежащему"]]},
  {type:"focus",s:"The book was written {by Tolstoy}.",f:"q:Who|a:was|s:the book|v:written by",ru:"Кем написана книга?",acc:["Who wrote the book","By whom was the book written","Who was it written by"],hint:"Who + was + the book + written + by. by — в конце.",alt:[["Who wrote the book?","активно — проще"],["Who's the author?","через be"]]},
  {type:"answer",reply:"It was built in 1889.",about:"Спроси, когда была построена Эйфелева башня (the Eiffel Tower).",f:"q:When|a:was|s:the Eiffel Tower|v:built",ru:"Когда построили Эйфелеву башню?",acc:["When was it built","When did they build the Eiffel Tower"],hint:"When + was + the Eiffel Tower + built.",alt:[["How old is the Eiffel Tower?","через be"],["When did they build it?","активно"]]},
  {type:"build",f:"q:How|a:is|s:this word|v:pronounced",ru:"Как произносится это слово?",extra:["do","pronounce"],hint:"How + is + this word + pronounced.",alt:[["How do you pronounce this word?","активно — так чаще"],["How do you say this?","разговорно"]]},
  {type:"choose",q:"___ dogs allowed in the park?",opts:["Are","Do","Is","Have"],ans:0,f:"a:Are|s:dogs|v:allowed|o:in the park",ru:"В парк можно с собаками?",cat:"passive",hint:"dogs — несколько → Are + dogs + allowed.",why:{1:"Do dogs allow — «разрешают ли собаки». Нужен пассив.",2:"dogs — несколько → are.",3:"Have dogs allowed — так не говорят."},alt:[["Can I bring my dog into the park?","через can"],["Is it OK to bring dogs?","через be"]]},
  {type:"tr",ru:"Тебя пригласили на вечеринку?",f:"a:Were|s:you|v:invited|o:to the party",acc:["Have you been invited to the party","Did they invite you to the party","Did you get invited to the party"],hint:"Were + you + invited.",alt:[["Did they invite you?","активно"],["Did you get an invite?","разговорно"]]},
  {type:"fix",wrong:"When was built this house?",f:"q:When|a:was|s:this house|v:built",ru:"Когда построен этот дом?",acc:[],hint:"Подлежащее стоит между was и третьей формой.",alt:[["How old is this house?","через be"],["When did they build this house?","активно"]]},
  {type:"focus",s:"The parcel will be delivered {tomorrow}.",f:"q:When|a:will|s:the parcel|v:be delivered",ru:"Когда доставят посылку?",acc:[],hint:"When + will + the parcel + be delivered.",alt:[["When will the parcel arrive?","активно"],["When can I expect the parcel?","официально"]]},
  {type:"build",f:"a:Has|s:the package|v:been delivered",ru:"Посылку уже доставили?",extra:["did","was"],hint:"Present Perfect пассив: Has + the package + been delivered.",alt:[["Has the package arrived?","активно"],["Did the package come?","разговорно"]]},
  {type:"choose",q:"Can it ___ repaired?",opts:["be","been","is","being"],ans:0,f:"a:Can|s:it|v:be repaired",ru:"Это можно починить?",cat:"v3p",hint:"Модальный + be + третья форма: can be repaired.",why:{1:"После can — be, а не been.",2:"После can — начальная форма be.",3:"being здесь не подходит."},alt:[["Can you fix it?","активно"],["Is it fixable?","разговорно"]]},
  {type:"choose",q:"What is this dish ___?",opts:["called","call","calls","calling"],ans:0,f:"q:What|a:is|s:this dish|v:called",ru:"Как называется это блюдо?",cat:"v3p",hint:"What + is + … + called.",alt:[["What do you call this dish?","активно"],["What's the name of this dish?","через name"]]},
  {type:"answer",reply:"Yes, soft drinks are included.",about:"Спроси, включены ли напитки в цену (drinks, included in the price).",f:"a:Are|s:drinks|v:included|o:in the price",ru:"Напитки включены в цену?",acc:["Are the drinks included in the price","Are drinks included","Are the drinks included","Does the price include drinks"],hint:"Are + drinks + included.",alt:[["Does the price include drinks?","активно"],["Do we pay extra for drinks?","активно"]]},
  {type:"tr",ru:"Где ты родился?",f:"q:Where|a:were|s:you|v:born",acc:[],hint:"Родиться — be born: Where + were + you + born.",alt:[["Where are you from originally?","разговорно"],["What's your place of birth?","официально"]]},
  {type:"build",f:"q:Who|a:was|s:the telephone|v:invented by",ru:"Кем был изобретён телефон?",extra:["did","invent"],hint:"Who + was + the telephone + invented by.",alt:[["Who invented the telephone?","активно — проще"],["Who came up with the telephone?","разговорно"]]},
  {type:"fix",wrong:"Is spoken English here?",f:"a:Is|s:English|v:spoken|t:here",ru:"Здесь говорят по-английски?",acc:[],hint:"Подлежащее между is и третьей формой: Is English spoken here?",alt:[["Do they speak English here?","активно"],["Does anyone here speak English?","к подлежащему"]]},
  {type:"choose",q:"When will the results ___?",opts:["be announced","announced","announce","been announced"],ans:0,f:"q:When|a:will|s:the results|v:be announced",ru:"Когда объявят результаты?",cat:"v3p",hint:"will + be + третья форма.",why:{1:"После will нужен be.",2:"announce — актив: «результаты объявят (что-то)».",3:"После will — be, а не been."},alt:[["When will we get the results?","активно"],["When are the results out?","разговорно"]]},
  {type:"focus",s:"The meeting was cancelled {because the boss was ill}.",f:"q:Why|a:was|s:the meeting|v:cancelled",ru:"Почему отменили встречу?",acc:["Why was the meeting canceled"],hint:"Why + was + the meeting + cancelled.",alt:[["Why did they cancel the meeting?","активно"],["What happened to the meeting?","к подлежащему"]]},
  {type:"build",f:"a:Was|s:anyone|v:hurt",ru:"Кто-нибудь пострадал?",extra:["did","hurts"],hint:"Was + anyone + hurt.",alt:[["Is everyone OK?","через be"],["Were there any injuries?","официально"]]},
  {type:"tr",ru:"Когда была написана эта песня?",f:"q:When|a:was|s:this song|v:written",acc:["When did they write this song","When was the song written"],hint:"When + was + this song + written.",alt:[["When did they write this song?","активно"],["How old is this song?","через be"]]},
  {type:"choose",q:"Has the room ___ cleaned?",opts:["been","be","being","was"],ans:0,f:"a:Has|s:the room|v:been cleaned",ru:"Комнату уже убрали?",cat:"v3p",hint:"Present Perfect пассив: has + been + cleaned.",why:{1:"После has — been.",2:"being — для Continuous: Is it being cleaned?",3:"has + was не сочетаются."},alt:[["Has someone cleaned the room?","активно"],["Is the room ready?","через be"]]},
  {type:"answer",reply:"In China, I think.",about:"Спроси, где сделан этот телефон (this phone, made).",f:"q:Where|a:was|s:this phone|v:made",ru:"Где сделан этот телефон?",acc:["Where is this phone made","Where was it made","Where is it made"],hint:"Where + was + this phone + made.",alt:[["Where's this phone from?","разговорно"],["Who makes this phone?","активно"]]},
  {type:"fix",wrong:"Did the letter sent?",f:"a:Was|s:the letter|v:sent",ru:"Письмо отправили?",acc:["Has the letter been sent"],hint:"Пассив: Was + the letter + sent. Did не подходит.",alt:[["Did you send the letter?","активно"],["Has the letter gone?","разговорно"]]},
  {type:"build",f:"q:How|a:is|s:cheese|v:made",ru:"Как делают сыр?",extra:["does","make"],hint:"Процесс → How + is + cheese + made.",alt:[["How do they make cheese?","активно"],["What's the process for making cheese?","официально"]]},
  {type:"focus",s:"The tickets are sold {at the box office}.",f:"q:Where|a:are|s:the tickets|v:sold",ru:"Где продаются билеты?",acc:["Where are tickets sold","Where can I buy tickets"],hint:"Where + are + the tickets + sold.",alt:[["Where can I buy tickets?","активно — проще"],["Where's the box office?","через be"]]},
  {type:"choose",q:"Who ___ the Mona Lisa painted by?",opts:["was","did","is","has"],ans:0,f:"q:Who|a:was|s:the Mona Lisa|v:painted by",ru:"Кем написана Мона Лиза?",cat:"passive",hint:"Пассив в прошлом: Who + was + … + painted by.",why:{1:"did + painted не сочетаются.",2:"Картина написана в прошлом → was.",3:"has painted — без been не пассив."},alt:[["Who painted the Mona Lisa?","активно — проще"],["Who's the artist?","через be"]]},
  {type:"tr",ru:"Тебе уже сказали?",f:"a:Have|s:you|v:been told",acc:["Did they tell you","Has anyone told you","Were you told"],hint:"Have + you + been told.",alt:[["Has anyone told you?","к подлежащему"],["Do you know already?","активно"]]},
  {type:"fix",wrong:"Where was it make?",f:"q:Where|a:was|s:it|v:made",ru:"Где это сделано?",acc:[],hint:"После was — третья форма: made.",alt:[["Where's it from?","разговорно"],["Who made it?","к подлежащему"]]},
  {type:"build",f:"a:Will|s:the work|v:be finished|t:on time",ru:"Работа будет закончена вовремя?",extra:["is","finish"],hint:"Will + the work + be finished.",alt:[["Will you finish on time?","активно"],["Are we on schedule?","деловой стиль"]]},
  {type:"choose",q:"Is smoking ___ here?",opts:["allowed","allow","allows","allowing"],ans:0,f:"a:Is|s:smoking|v:allowed|t:here",ru:"Здесь можно курить?",cat:"v3p",hint:"Is + smoking + allowed.",alt:[["Can I smoke here?","через can"],["Is this a smoking area?","через be"]]},
  {type:"answer",reply:"By Shakespeare, of course.",about:"Спроси, кем написан «Гамлет» (Hamlet, written by).",f:"q:Who|a:was|s:Hamlet|v:written by",ru:"Кем написан «Гамлет»?",acc:["Who wrote Hamlet","By whom was Hamlet written"],hint:"Who + was + Hamlet + written by.",alt:[["Who wrote Hamlet?","активно — проще"],["Who's the author of Hamlet?","через be"]]},
  {type:"focus",s:"My car was stolen {last night}.",f:"q:When|a:was|s:your car|v:stolen",ru:"Когда угнали твою машину?",acc:["When did they steal your car"],hint:"When + was + your car + stolen. my → your.",alt:[["When did it happen?","разговорно"],["Have you called the police?","Present Perfect"]]},
  {type:"tr",ru:"Как это пишется?",f:"q:How|a:is|s:it|v:spelled",acc:["How is it spelt","How do you spell it","How is this spelled","How is this spelt"],hint:"How + is + it + spelled (брит. spelt).",alt:[["How do you spell it?","активно — так чаще"],["Could you spell that?","просьба"]]},
  {type:"choose",q:"When ___ the museum opened?",opts:["was","did","has","is"],ans:0,f:"q:When|a:was|s:the museum|v:opened",ru:"Когда был открыт музей?",cat:"passive",hint:"Музей открыли (в прошлом) → was opened.",why:{1:"When did the museum open? — тоже верно, но тогда open, не opened.",2:"has opened — без been не пассив.",3:"Музей открыли в прошлом → was."},alt:[["When did the museum open?","активно"],["How long has the museum been here?","Present Perfect"]]},
  {type:"fix",wrong:"Has the package delivered?",f:"a:Has|s:the package|v:been delivered",ru:"Посылку доставили?",acc:[],hint:"Present Perfect пассив: has + been + delivered.",alt:[["Has the package arrived?","активно"],["Did my package come?","разговорно"]]},
  {type:"build",f:"q:Why|a:was|s:the flight|v:delayed",ru:"Почему задержали рейс?",extra:["did","delay"],hint:"Why + was + the flight + delayed.",alt:[["Why is the flight late?","через be"],["What caused the delay?","к подлежащему"]]},
  {type:"choose",q:"Where ___ you born?",opts:["were","did","was","are"],ans:0,f:"q:Where|a:were|s:you|v:born",ru:"Где ты родился?",cat:"passive",hint:"born — пассив: were + born.",why:{1:"«Did you born» — ошибка. Только were.",2:"you → were.",3:"Рождение — в прошлом → were."},alt:[["Where are you from?","разговорно"],["Where did you grow up?","«где вырос»"]]},
  {type:"answer",reply:"Yes, it was sent yesterday.",about:"Спроси, отправили ли уже твой заказ (my order, been sent).",f:"a:Has|s:my order|v:been sent",ru:"Мой заказ уже отправили?",acc:["Has my order been sent yet","Was my order sent","Has my order been dispatched","Have you sent my order"],hint:"Has + my order + been sent.",alt:[["Have you sent my order?","активно"],["Has my order gone out?","разговорно"]]},
  {type:"tr",ru:"Тебя повысили?",f:"a:Were|s:you|v:promoted",acc:["Have you been promoted","Did you get promoted","Did you get a promotion"],hint:"Were + you + promoted (или Have you been promoted?).",alt:[["Did you get promoted?","разговорно"],["Did you get the promotion?","разговорно"]]},
  {type:"fix",wrong:"Who was written this book by?",f:"q:Who|a:was|s:this book|v:written by",ru:"Кем написана эта книга?",acc:["Who wrote this book"],hint:"Подлежащее между was и written: Who was this book written by?",alt:[["Who wrote this book?","активно"],["Who's the author?","через be"]]},
  {type:"focus",s:"The film is based {on a true story}.",f:"q:What|a:is|s:the film|v:based on",ru:"На чём основан фильм?",acc:[],hint:"What + is + the film + based on.",alt:[["Is it a true story?","общий вопрос"],["What's the film about?","через about"]]},
  {type:"choose",q:"How often ___ the rooms cleaned?",opts:["are","do","is","have"],ans:0,f:"q:How often|a:are|s:the rooms|v:cleaned",ru:"Как часто убирают номера?",cat:"passive",hint:"rooms — несколько → are cleaned.",why:{1:"Do the rooms clean — «убирают ли комнаты (сами)». Нужен пассив.",2:"rooms — несколько → are.",3:"have cleaned — без been не пассив."},alt:[["How often do you clean the rooms?","активно"],["Is there daily cleaning?","через there"]]},
  {type:"build",f:"q:What|a:is|s:this tool|v:used for",ru:"Для чего используется этот инструмент?",extra:["do","use"],hint:"What + is + this tool + used for.",alt:[["What do you use this tool for?","активно"],["What's this for?","разговорно"]]},
  {type:"tr",ru:"Когда будут напечатаны фотографии?",f:"q:When|a:will|s:the photos|v:be printed",acc:["When will the photos be ready","When are the photos going to be printed"],hint:"When + will + the photos + be printed.",alt:[["When will the photos be ready?","через be ready"],["When can I pick up the photos?","активно"]]},
  {type:"answer",reply:"Every Monday morning.",about:"Спроси, когда вывозят мусор (the rubbish, collected).",f:"q:When|a:is|s:the rubbish|v:collected",ru:"Когда вывозят мусор?",acc:["When is the garbage collected","When do they collect the rubbish","When is rubbish collected"],hint:"When + is + the rubbish + collected.",alt:[["When do they collect the bins?","брит., активно"],["What day is bin day?","брит., разговорно"]]},
  {type:"fix",wrong:"Where were made these shoes?",f:"q:Where|a:were|s:these shoes|v:made",ru:"Где сделаны эти туфли?",acc:[],hint:"Подлежащее между were и made.",alt:[["Where are these shoes from?","разговорно"],["Who makes these shoes?","активно"]]}
  ]
};
