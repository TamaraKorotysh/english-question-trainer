/* Module 6 — question blocks: what time, how much, how often… */
CONTENT.m6 = {
  title: "What time, how much, how often…",
  idea: "Вопросительное слово часто «склеено» с другим словом: How much money, What time, How often. Такой блок стоит в начале целиком, а дальше — обычная формула.",
  catSec: {order:"formula",aux_missing:"formula",wh:"how",muchmany:"muchmany",longtime:"long",do_form:"formula",verb_s:"formula",verb_past:"formula",be_verb:"formula",do_be:"formula",be_form:"formula",short:"errors",article:"errors",other:"formula"},
  cats: {muchmany:["much или many","Many — с тем, что можно посчитать: people, times, books. Much — с тем, что не считают: money, time, water, sugar."],
    longtime:["How long time","How long уже значит «сколько времени». Слово time после long не нужно."]},
  diagnose({u,e}){
    if(u.includes("many") && e.includes("much") && !u.includes("much")) return {cat:"muchmany",msg:"Здесь нужен much: это нельзя посчитать поштучно (деньги, время, вода, цена). Many — для того, что считается: people, times, books."};
    if(u.includes("much") && e.includes("many") && !u.includes("many")) return {cat:"muchmany",msg:"Здесь нужен many: это можно посчитать (люди, раз, книги). Much — для неисчисляемого: money, time, water."};
    const us=u.join(" "), es=e.join(" ");
    if(us.includes("long time") && !es.includes("long time")) return {cat:"longtime",msg:"How long уже значит «сколько времени». Слово time лишнее."};
    if(us.includes("kind ") && !us.includes("kind of") && es.includes("kind of")) return {cat:"other",msg:"После kind / sort / type нужен of: What kind of music…?"};
    return null;
  },
  check: [
    {q:"How ___ money do you need?",opts:["much","many","long"],ans:0,hint:"Деньги не считают поштучно → much."},
    {q:"How ___ does it take?",opts:["long","long time","much time"],ans:0,hint:"How long уже значит «сколько времени»."},
    {q:"Как правильно?",opts:["How often do you swim?","How often you swim?","How much often do you swim?"],ans:0,hint:"Блок How often, потом помощник do."}
  ],
  demos: [
    {name:"Блок целиком", frames:[
      {t:[["they","They","s"],["have","have","v"],["kids","three children","o"],["p",".","p"]], c:"Спрашиваем о количестве детей."},
      {t:[["kids","How many children","q"],["they","they","s"],["have","have","v"],["p","?","p"]], c:"three children → <b>How many children</b>. Блок переезжает в начало <b>целиком</b>: слово children не отрывается."},
      {t:[["kids","How many children","q"],["do","do","a"],["they","they","s"],["have","have","v"],["p","?","p"]], c:"Дальше — формула модуля 2: <i>How many children do they have?</i>"}]},
    {name:"How + прилагательное", frames:[
      {t:[["he","He","s"],["is","is","a"],["tall","tall","o"],["p",".","p"]], c:"Хотим узнать, <b>насколько</b> он высокий."},
      {t:[["tall","How tall","q"],["is","is","a"],["he","he","s"],["p","?","p"]], c:"Прилагательное прилипает к How и уходит в начало: <i>How tall is he?</i> Так же: How old, How far, How big."}]},
    {name:"Ловушка: long time", frames:[
      {t:[["h","How long","q"],["time","time","o","bad"],["does","does","a"],["it","it","s"],["take","take","v"],["p","?","p"]], c:"«Сколько времени» хочется перевести как How long time. Но long уже значит «долго по времени»."},
      {t:[["h","How long","q"],["does","does","a"],["it","it","s"],["take","take","v"],["p","?","p"]], c:"<i>How long does it take?</i> Или через much: <i>How much time does it take?</i>"}]},
    {name:"Ловушка: much / many", frames:[
      {t:[["h","How many money","q","bad"],["do","do","a"],["you","you","s"],["need","need","v"],["p","?","p"]], c:"Деньги по-русски «сколько», но поштучно их не считают."},
      {t:[["h","How much money","q"],["do","do","a"],["you","you","s"],["need","need","v"],["p","?","p"]], c:"Неисчисляемое → <b>much</b>: <i>How much money do you need?</i> А люди, книги, разы → many."}]}
  ],
  rules(){
    return [
    {id:"why",title:"Склеенные вопросительные слова",body:`
      <p>Часто одного вопросительного слова мало: нужно «сколько <b>денег</b>», «во сколько», «какого <b>цвета</b>». Тогда вопросительное слово склеивается с существительным или прилагательным в <b>блок</b>.</p>
      <p>Главное правило: блок <b>не разрывается</b> и целиком стоит в начале. ${strike("How many do you have children?")} → ${ex("How many children do you have?")}</p>`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("q","How much money","блок")}${PLUS}${slot("a","do","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","need","глагол")}<span class="plus">?</span></div>
      <div class="formula">${slot("q","How tall","блок")}${PLUS}${slot("a","is","be")}${PLUS}${slot("s","he","подлежащее")}<span class="plus">?</span></div>
      <p>После блока — всё как раньше: помощник выбираем по глаголу и времени.</p>`},
    {id:"how",title:"How + прилагательное или наречие",body:`
      ${rows(["Блок","Спрашивает о","Пример"],[
        ["How old","возрасте",ex("How old is she?")],["How tall","росте",ex("How tall are you?")],
        ["How big","размере",ex("How big is your flat?")],["How far","расстоянии",ex("How far is the airport?")],
        ["How long","длительности или длине",ex("How long does it take?")+" "+ex("How long is the bridge?")],
        ["How often","частоте",ex("How often do you train?")],["How well","качестве действия",ex("How well do you know him?")],
        ["How fast","скорости",ex("How fast can it go?")],["How late / early","времени (поздно / рано)",ex("How late is the shop open?")]])}
      <div class="note"><b>How well</b> — про действие (play, know, speak). <b>How good</b> — про вещь или человека: <span class="mono">How good is the film?</span></div>`},
    {id:"what",title:"What + существительное",body:`
      ${rows(["Блок","Пример","Перевод"],[
        ["What time",ex("What time does it start?"),"Во сколько?"],["What day",ex("What day is it today?"),"Какой день?"],
        ["What date",ex("What date is your birthday?"),"Какого числа?"],["What colour",ex("What colour is your car?"),"Какого цвета?"],
        ["What size",ex("What size are you?"),"Какой размер?"],["What kind of / sort of / type of",ex("What kind of music do you like?"),"Какой вид, жанр?"],
        ["What languages",ex("What languages does she speak?"),"Какие языки?"]])}
      <p>После kind / sort / type <b>обязательно of</b>: ${strike("What kind music…?")}</p>
      <p><b>When</b> или <b>What time</b>? When — вообще когда (день, год). What time — точное время по часам.</p>`},
    {id:"muchmany",title:"How much или how many",body:`
      <div class="cols">
        <div class="col"><h3>How many — можно посчитать</h3><div class="pairs">
          <span>люди</span>${ex("How many people came?")}<span>раз</span>${ex("How many times?")}<span>дети</span>${ex("How many children?")}<span>чашки</span>${ex("How many cups of tea?")}</div></div>
        <div class="col"><h3>How much — не считают поштучно</h3><div class="pairs">
          <span>деньги</span>${ex("How much money?")}<span>время</span>${ex("How much time?")}<span>вода</span>${ex("How much water?")}<span>сахар</span>${ex("How much sugar?")}</div></div>
      </div>
      <div class="note"><b>How much</b> без существительного — это цена: ${ex("How much is it?")} ${ex("How much are these shoes?")}</div>`},
    {id:"long",title:"How long: время и длина",body:`
      <p><b>How long</b> = «сколько времени» или «какой длины». Слово time добавлять не нужно: ${strike("How long time…?")}</p>
      ${rows(["Вопрос","Перевод"],[
        [ex("How long does it take?"),"Сколько времени это занимает?"],[ex("How long will you stay?"),"Надолго ты?"],
        [ex("How long is the film?"),"Сколько длится фильм?"],[ex("How long is the river?"),"Какой длины река?"],
        [ex("How long ago did it happen?"),"Как давно это случилось?"]])}
      <p>«Как долго ты здесь живёшь?» — <span class="mono">How long have you lived here?</span> Это Present Perfect, он в модуле 7.</p>`},
    {id:"often",title:"How often и ответы о частоте",body:`
      <p>${ex("How often do you go to the gym?")}</p>
      <p>Ответы: <span class="mono">every day, twice a week, once a month, three times a year, every other day, hardly ever, never</span>.</p>
      <p>Можно и точнее: ${ex("How many times a week do you train?")}</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Блок — как вагон","How much money, What colour, How often — сцеплены, едут вместе в начало. Отцеплять нельзя.",[]],
      ["mem","Many — штуки, much — масса","Можно сказать «одна, две…» → many. Нельзя («одна вода»?) → much.",[]],
      ["mem","How long = сколько времени","Time уже внутри. How long time — как «масло масляное».",["How long does it take?"]],
      ["mem","How much? = Сколько стоит?","Без существительного How much — это всегда про цену.",["How much is it?"]],
      ["obs","Англичане меряют прилагательным","Не «какой рост», а «насколько высокий» (How tall), не «какое расстояние», а «насколько далеко» (How far).",["How far is it?"]],
      ["obs","Чашки считаем, кофе — нет","How much coffee? — сколько кофе. How many cups of coffee? — сколько чашек.",[]],
      ["obs","How many sugars? — норма в кафе","Хотя сахар неисчисляемый, в Британии считают ложки: «How many sugars?» — «Two, please».",["How many sugars?"]],
      ["obs","What time vs When","When do you get up? — можно ответить «in the morning». What time do you get up? — ждут «at 7».",[]],
      ["hack","Не знаешь прилагательное? What's the…?","How tall → What's your height? How far → What's the distance? Запасной путь через be.",["What's the distance?"]],
      ["hack","How long + will / did / does","Тот же блок работает в любом времени: How long will you stay? How long did it take?",[]],
      ["hack","How often — спроси про привычку","Отличный вопрос для разговора: How often do you…? Собеседник расскажет о себе.",["How often do you travel?"]],
      ["hack","What kind of…? — расширь разговор","What kind of music / food / books…? Почти никогда не получишь ответ «нет».",["What kind of food do you like?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["How many money?","How much money?","money — неисчисляемое."],["How much people?","How many people?","people — исчисляемое."],
      ["How long time does it take?","How long does it take?","time лишнее."],["How much times?","How many times?","times — исчисляемое."],
      ["How many do you have children?","How many children do you have?","Блок не разрывается."],["What kind music?","What kind of music?","После kind — of."],
      ["How often you go?","How often do you go?","После блока — помощник."],["How old has he?","How old is he?","Возраст — через be."],
      ["How good do you play?","How well do you play?","Про действие — well."],["How many does it cost?","How much does it cost?","Цена — much."],
      ["When time does it start?","What time does it start?","Либо When, либо What time."],["How much is cost?","How much does it cost?","cost — глагол → does."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:How much money|a:do|s:you|v:need",ru:"Сколько денег тебе нужно?",extra:["many","does"],hint:"Деньги не считают поштучно → How much. Блок How much money — целиком в начало.",alt:[["How much do you need?","без money"],["What's your budget?","через be"]]},
  {type:"build",f:"q:How often|a:do|s:you|v:go|o:to the gym",ru:"Как часто ты ходишь в спортзал?",extra:["many","does"],hint:"Частота → How often.",alt:[["How many times a week do you go to the gym?","точнее"],["Do you go to the gym much?","разговорно"]]},
  {type:"choose",q:"How ___ brothers have you got?",opts:["many","much","lot","often"],ans:0,f:"q:How many brothers|a:have|s:you|v:got",ru:"Сколько у тебя братьев?",cat:"muchmany",hint:"Братьев можно посчитать → many.",why:{1:"much — для неисчисляемого (money, time).",2:"How lot — так не говорят.",3:"How often — «как часто»."},alt:[["How many brothers do you have?","через do"],["Have you got any brothers?","общий вопрос"]]},
  {type:"choose",q:"How ___ does it take to get there?",opts:["long","much","many","far"],ans:0,f:"q:How long|a:does|s:it|v:take|o:to get there",ru:"Сколько времени туда добираться?",cat:"wh",hint:"Время в пути → How long.",why:{1:"How much does it take — про количество. Время → How long.",3:"How far — про расстояние в километрах."},alt:[["How long is the journey?","через be"],["How far is it?","про расстояние"]]},
  {type:"tr",ru:"Как далеко отсюда до аэропорта?",f:"q:How far|a:is|s:it|o:to the airport",acc:["How far is the airport","How far is the airport from here","How far is it to the airport from here","How far is it from here to the airport"],hint:"Расстояние → How far + is + it + to…",alt:[["Is the airport far from here?","общий вопрос"],["How long does it take to get to the airport?","про время"]]},
  {type:"fix",wrong:"How many money do you have?",f:"q:How much money|a:do|s:you|v:have",ru:"Сколько у тебя денег?",acc:["How much money have you got"],hint:"money — неисчисляемое → much.",alt:[["How much have you got?","брит."],["Have you got enough money?","общий вопрос"]]},
  {type:"focus",s:"The film lasts {two hours}.",f:"q:How long|a:does|s:the film|v:last",ru:"Сколько длится фильм?",acc:["How long is the film","How long is the movie","How long does the movie last"],hint:"Длительность → How long. lasts → does + last.",alt:[["How long is the film?","через be"],["What's the running time?","официально"]]},
  {type:"answer",reply:"I'm one metre eighty.",about:"Спроси, какого он роста (tall).",f:"q:How tall|a:are|s:you",ru:"Какой у тебя рост?",acc:["What is your height","What height are you"],hint:"Рост → How tall + are + you.",alt:[["What's your height?","официально"],["How tall are you, roughly?","«примерно»"]]},
  {type:"build",f:"q:What time|a:does|s:the train|v:leave",ru:"Во сколько отправляется поезд?",extra:["when","leaves"],hint:"Точное время → What time. leaves → does + leave.",alt:[["When does the train leave?","нейтрально"],["What time's the train?","разговорно"]]},
  {type:"choose",q:"___ kind of music do you like?",opts:["What","Which","How","Whose"],ans:0,f:"q:What kind of music|a:do|s:you|v:like",ru:"Какую музыку ты любишь?",cat:"wh",hint:"Какой вид, жанр → What kind of.",why:{1:"Which kind — только если выбираем из перечисленных жанров.",2:"How kind — так не говорят."},alt:[["What sort of music are you into?","разговорно"],["Who do you listen to?","«кого слушаешь?»"]]},
  {type:"tr",ru:"Сколько раз ты был в Лондоне?",f:"q:How many times|a:have|s:you|v:been|o:to London",acc:["How often have you been to London"],hint:"Сколько раз → How many times. Опыт → have + you + been (модуль 7).",alt:[["Have you been to London many times?","общий вопрос"],["How often have you visited London?","через visit"]]},
  {type:"fix",wrong:"How long time does it take?",f:"q:How long|a:does|s:it|v:take",ru:"Сколько времени это занимает?",acc:["How much time does it take"],hint:"How long уже значит «сколько времени». Time не нужен.",alt:[["How much time does it take?","через much time"],["Will it take long?","общий вопрос"]]},
  {type:"focus",s:"She speaks {four} languages.",f:"q:How many languages|a:does|s:she|v:speak",ru:"На скольких языках она говорит?",acc:[],hint:"Количество → How many languages. speaks → does + speak.",alt:[["What languages does she speak?","какие именно"],["Is she multilingual?","через be"]]},
  {type:"build",f:"q:What colour|a:is|s:your car",ru:"Какого цвета твоя машина?",extra:["which","does"],hint:"Цвет → What colour + is + your car.",alt:[["What colour's your car?","разговорно"],["Is your car red?","общий вопрос"]]},
  {type:"choose",q:"How ___ is your flat?",opts:["big","many","much","long"],ans:0,f:"q:How big|a:is|s:your flat",ru:"Какого размера твоя квартира?",cat:"wh",hint:"Размер → How big.",why:{1:"How many — для количества, а не размера.",2:"How much is your flat — «сколько стоит»."},alt:[["How many rooms has your flat got?","через rooms"],["What size is your flat?","через What size"]]},
  {type:"choose",q:"How ___ water should I drink a day?",opts:["much","many","often","long"],ans:0,f:"q:How much water|a:should|s:I|v:drink|t:a day",ru:"Сколько воды мне нужно пить в день?",cat:"muchmany",hint:"water — неисчисляемое → much.",why:{1:"Воду не считают поштучно → much."},alt:[["How many glasses of water should I drink?","через glasses — исчисляемое"],["Am I drinking enough water?","Continuous"]]},
  {type:"answer",reply:"Every Saturday.",about:"Спроси, как часто он видится с родителями (you, see your parents).",f:"q:How often|a:do|s:you|v:see|o:your parents",ru:"Как часто ты видишься с родителями?",acc:["How often do you visit your parents","When do you see your parents"],hint:"Частота → How often + do + you + see.",alt:[["Do you see your parents much?","разговорно"],["When do you usually see your parents?","через when"]]},
  {type:"tr",ru:"Сколько тебе нужно времени?",f:"q:How much time|a:do|s:you|v:need",acc:["How long do you need","How much time will you need"],hint:"Количество времени → How much time. Или How long do you need?",alt:[["How long do you need?","через long"],["How long will it take you?","через take"]]},
  {type:"build",f:"q:What day|a:is|s:it|t:today",ru:"Какой сегодня день?",extra:["which","does"],hint:"День недели → What day + is + it.",alt:[["What's the date today?","про число"],["Is it Monday today?","общий вопрос"]]},
  {type:"fix",wrong:"How much people came to the party?",f:"q:How many people|v:came|o:to the party",ru:"Сколько людей пришло на вечеринку?",acc:[],hint:"people — можно посчитать → many.",alt:[["Were there many people at the party?","через there"],["Was the party busy?","разговорно"]]},
  {type:"choose",q:"___ time does the shop open?",opts:["What","Which","How","When"],ans:0,f:"q:What time|a:does|s:the shop|v:open",ru:"Во сколько открывается магазин?",cat:"wh",hint:"«Во сколько» → What time.",why:{3:"When time — так нельзя. Либо When does…, либо What time does…"},alt:[["When does the shop open?","нейтрально"],["What are the opening hours?","через be"]]},
  {type:"focus",s:"The bridge is {two kilometres} long.",f:"q:How long|a:is|s:the bridge",ru:"Какой длины мост?",acc:[],hint:"Длина → How long + is + the bridge.",alt:[["What's the length of the bridge?","официально"],["Is the bridge long?","общий вопрос"]]},
  {type:"build",f:"q:How well|a:do|s:you|v:know|o:him",ru:"Насколько хорошо ты его знаешь?",extra:["good","does"],hint:"«Насколько хорошо» про действие → How well (не How good).",alt:[["Do you know him well?","общий вопрос"],["Are you close to him?","через be: «вы близки?»"]]},
  {type:"tr",ru:"Сколько стоят эти туфли?",f:"q:How much|a:are|s:these shoes",acc:["How much do these shoes cost","How much are the shoes"],hint:"Туфли — несколько → are. How much + are + these shoes.",alt:[["What do these shoes cost?","через cost"],["What's the price of these shoes?","через price"]]},
  {type:"choose",q:"How ___ is it from here to the beach?",opts:["far","long","much","many"],ans:0,f:"q:How far|a:is|s:it|o:from here to the beach",ru:"Как далеко отсюда до пляжа?",cat:"wh",hint:"Расстояние → How far.",why:{1:"How long — про время или длину предмета. Расстояние → How far."},alt:[["Is the beach far?","общий вопрос"],["How long does it take to walk to the beach?","через время"]]},
  {type:"answer",reply:"About twenty euros.",about:"Спроси, сколько стоил билет (the ticket).",f:"q:How much|a:was|s:the ticket",ru:"Сколько стоил билет?",acc:["How much did the ticket cost","How much did you pay for the ticket"],hint:"Цена в прошлом → How much + was + the ticket.",alt:[["What did the ticket cost?","через cost"],["How much did you pay?","через pay"]]},
  {type:"fix",wrong:"How often you go swimming?",f:"q:How often|a:do|s:you|v:go|o:swimming",ru:"Как часто ты ходишь плавать?",acc:[],hint:"После How often — помощник do.",alt:[["Do you swim often?","общий вопрос"],["How many times a week do you swim?","точнее"]]},
  {type:"build",f:"q:What size|a:are|s:you",ru:"Какой у тебя размер?",extra:["how","do"],hint:"What size + are + you.",alt:[["What size do you take?","брит."],["What size do you wear?","нейтрально"]]},
  {type:"focus",s:"He goes jogging {three times a week}.",f:"q:How often|a:does|s:he|v:go|o:jogging",ru:"Как часто он бегает?",acc:["How many times a week does he go jogging","How often does he jog"],hint:"Частота → How often + does + he + go.",alt:[["How many times a week does he go jogging?","точнее"],["Does he jog regularly?","общий вопрос"]]},
  {type:"choose",q:"How ___ cups of coffee do you drink a day?",opts:["many","much","often","long"],ans:0,f:"q:How many cups of coffee|a:do|s:you|v:drink|t:a day",ru:"Сколько чашек кофе ты пьёшь в день?",cat:"muchmany",hint:"cups — можно посчитать → many. Сам coffee неисчисляемый, но здесь считаем чашки.",alt:[["How much coffee do you drink?","через much — без чашек"],["Do you drink a lot of coffee?","общий вопрос"]]},
  {type:"tr",ru:"Какого цвета её глаза?",f:"q:What colour|a:are|s:her eyes",acc:["What color are her eyes","What colour eyes does she have","What colour eyes has she got"],hint:"Глаза — несколько → are. What colour + are + her eyes.",alt:[["What colour eyes has she got?","брит."],["Does she have blue eyes?","общий вопрос"]]},
  {type:"fix",wrong:"What kind music do you like?",f:"q:What kind of music|a:do|s:you|v:like",ru:"Какую музыку ты любишь?",acc:["What sort of music do you like","What type of music do you like"],hint:"What kind OF + существительное.",alt:[["What sort of music do you like?","брит."],["What music are you into?","разговорно"]]},
  {type:"build",f:"q:How long|a:will|s:you|v:stay",ru:"Надолго ты останешься?",extra:["much","time"],hint:"Длительность → How long + will + you + stay.",alt:[["How long are you staying?","план (модуль 7)"],["When are you leaving?","через when"]]},
  {type:"choose",q:"How ___ is the hotel per night?",opts:["much","many","long","far"],ans:0,f:"q:How much|a:is|s:the hotel|t:per night",ru:"Сколько стоит отель за ночь?",cat:"muchmany",hint:"Цена → How much.",alt:[["What's the rate per night?","официально"],["How much does a room cost?","через cost"]]},
  {type:"answer",reply:"Spanish, French and a bit of German.",about:"Спроси, на каких языках она говорит (she).",f:"q:What languages|a:does|s:she|v:speak",ru:"На каких языках она говорит?",acc:["Which languages does she speak","How many languages does she speak"],hint:"Какие языки → What languages + does + she + speak.",alt:[["How many languages does she speak?","количество"],["Does she speak any foreign languages?","общий вопрос"]]},
  {type:"focus",s:"The meeting starts {at 9:30}.",f:"q:What time|a:does|s:the meeting|v:start",ru:"Во сколько начинается встреча?",acc:["When does the meeting start"],hint:"What time + does + the meeting + start.",alt:[["When's the meeting?","через be"],["What time's the meeting?","разговорно"]]},
  {type:"tr",ru:"Сколько у тебя детей?",f:"q:How many children|a:do|s:you|v:have",acc:["How many children have you got","How many kids do you have","How many kids have you got"],hint:"Детей можно посчитать → How many children + do + you + have.",alt:[["Have you got any kids?","общий вопрос"],["Do you have kids?","разговорно"]]},
  {type:"choose",q:"How ___ do you play tennis? — Not very well.",opts:["well","good","often","much"],ans:0,f:"q:How well|a:do|s:you|v:play|o:tennis",ru:"Насколько хорошо ты играешь в теннис?",cat:"wh",hint:"Ответ про качество действия → How well.",why:{1:"How good — про вещь или человека (How good is he?). Про действие → How well.",2:"How often — про частоту, а ответ про качество."},alt:[["Are you good at tennis?","через be"],["Are you any good at tennis?","разговорно"]]},
  {type:"fix",wrong:"How much times have you been there?",f:"q:How many times|a:have|s:you|v:been|o:there",ru:"Сколько раз ты там был?",acc:["How often have you been there"],hint:"times — можно посчитать → many.",alt:[["How often have you been there?","через often"],["Have you been there before?","общий вопрос"]]},
  {type:"build",f:"q:What kind of films|a:does|s:she|v:like",ru:"Какие фильмы она любит?",extra:["which","likes"],hint:"What kind of + films, затем does + she + like.",alt:[["What sort of films is she into?","разговорно"],["What's her favourite genre?","через be"]]},
  {type:"choose",q:"___ date is it today?",opts:["What","Which","How","When"],ans:0,f:"q:What date|a:is|s:it|t:today",ru:"Какое сегодня число?",cat:"wh",hint:"Число → What date. Или What's the date today?",why:{3:"When date — так нельзя."},alt:[["What's the date today?","нейтрально"],["What's today's date?","нейтрально"]]},
  {type:"answer",reply:"It's about 30 kilometres.",about:"Спроси, как далеко находится город (the town).",f:"q:How far|a:is|s:the town",ru:"Как далеко город?",acc:["How far away is the town","How far is it to the town","How far is the town from here"],hint:"Расстояние → How far + is + the town.",alt:[["Is the town far?","общий вопрос"],["How long does it take to get to the town?","про время"]]},
  {type:"tr",ru:"Сколько длится урок?",f:"q:How long|a:does|s:the lesson|v:last",acc:["How long is the lesson","How long is the class","How long does the class last"],hint:"Длительность → How long. last — «длиться» → does + last.",alt:[["How long is the lesson?","через be"],["When does the lesson finish?","через when"]]},
  {type:"fix",wrong:"How old has your son?",f:"q:How old|a:is|s:your son",ru:"Сколько лет твоему сыну?",acc:[],hint:"Возраст — через be: How old + is.",alt:[["What age is your son?","брит."],["How old's your boy?","разговорно"]]},
  {type:"focus",s:"We need {five} chairs.",f:"q:How many chairs|a:do|s:we|v:need",ru:"Сколько стульев нам нужно?",acc:[],hint:"Количество → How many chairs + do + we + need.",alt:[["How many chairs should we get?","через should"],["Have we got enough chairs?","общий вопрос"]]},
  {type:"choose",q:"How ___ sugar do you take?",opts:["much","many","long","often"],ans:0,f:"q:How much sugar|a:do|s:you|v:take",ru:"Сколько сахара ты кладёшь?",cat:"muchmany",hint:"Сахар не считают поштучно → much.",alt:[["Do you take sugar?","общий вопрос"],["How many sugars?","разговорно: «сколько ложек?»"]]},
  {type:"build",f:"q:How old|a:were|s:you|t:then",ru:"Сколько тебе тогда было лет?",extra:["did","was"],hint:"Прошлое, you → were.",alt:[["What age were you then?","брит."],["How old were you at the time?","нейтрально"]]},
  {type:"tr",ru:"Как часто ходят автобусы?",f:"q:How often|a:do|s:the buses|v:run",acc:["How often do the buses go","How often does the bus run","How often does the bus go","How often do buses run","How often do buses come","How often does the bus come"],hint:"How often + do + the buses + run. «Ходить» про транспорт — run или go.",alt:[["How frequent are the buses?","через be"],["When's the next bus?","через be"]]},
  {type:"answer",reply:"Medium, please.",about:"Спроси, какой размер он хочет (what size, you, want).",f:"q:What size|a:do|s:you|v:want",ru:"Какой размер ты хочешь?",acc:["What size would you like","Which size do you want","Which size would you like"],hint:"What size + do + you + want. Вежливее — would you like.",alt:[["What size would you like?","вежливо"],["Small, medium or large?","альтернативный вопрос"]]},
  {type:"fix",wrong:"How many does it cost?",f:"q:How much|a:does|s:it|v:cost",ru:"Сколько это стоит?",acc:["How much is it"],hint:"Цена → How much.",alt:[["What's the price?","через be"],["How much is it?","через be"]]}
  ]
};
