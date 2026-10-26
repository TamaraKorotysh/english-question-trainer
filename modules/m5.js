/* Module 5 — question words */
CONTENT.m5 = {
  title: "Вопросительные слова",
  idea: "Вопросительное слово всегда стоит первым. Дальше — та же формула, что ты уже знаешь: помощник → подлежащее → глагол.",
  catSec: {order:"formula",aux_missing:"formula",wh:"words",do_form:"formula",verb_s:"formula",verb_past:"formula",be_verb:"formula",do_be:"formula",be_form:"formula",do_modal:"formula",modal:"formula",modal_to:"formula",short:"answers",article:"errors",other:"algorithm"},
  diagnose({u,e}){
    if(u[0]==="who" && u[1]==="is" && e[0]==="whose") return {cat:"wh",msg:"Who's = who is («кто есть»). «Чей» пишется whose: Whose bag is this?"};
    if(u.includes("how") && e[0]==="what" && e.some(w=>["called","think","like","mean"].includes(w))) return {cat:"wh",msg:"Русское «как» здесь — What. Как называется → What is it called. Как думаешь → What do you think. Как выглядит → What does it look like."};
    return null;
  },
  tips: {wh:"Перед тем как строить вопрос, назови по-русски, о чём спрашиваешь: место, время, причина, человек, выбор. Это и есть вопросительное слово."},
  check: [
    {q:"___ do you prefer, tea or coffee?",opts:["Which","What","How"],ans:0,hint:"Выбор из названных вариантов → Which."},
    {q:"___ bag is this?",opts:["Whose","Who's","Who"],ans:0,hint:"«Чей» → whose. Who's = who is."},
    {q:"Как правильно?",opts:["What is it called?","How is it called?","How it is called?"],ans:0,hint:"«Как называется» → What … called."}
  ],
  demos: [
    {name:"Шаги", frames:[
      {t:[["he","He","s"],["bought","bought","v"],["car","a car","o"],["y","yesterday","o"],["p",".","p"]], c:"Шаг 1. Утверждение. Решаем, о чём спросить: о покупке — <b>что?</b>"},
      {t:[["wh","What","q"],["he","he","s"],["bought","bought","v"],["y","yesterday","o"],["p","?","p"]], c:"Шаг 2. a car → <b>What</b>, в самое начало."},
      {t:[["wh","What","q"],["did","did","a"],["he","he","s"],["bought","buy","v"],["y","yesterday","o"],["p","?","p"]], c:"Шаг 3. Дальше — формула из модуля 3: did + he + buy. <i>What did he buy yesterday?</i>"}]},
    {name:"С be", frames:[
      {t:[["m","The meeting","s"],["is","is","a"],["ten","at ten","o"],["p",".","p"]], c:"Спрашиваем о времени — <b>когда?</b>"},
      {t:[["wh","When","q"],["is","is","a"],["m","the meeting","s"],["p","?","p"]], c:"at ten → <b>When</b>, а is прыгает перед подлежащим: <i>When is the meeting?</i>"}]},
    {name:"С модальным", frames:[
      {t:[["i","I","s"],["can","can","a"],["park","park","v"],["there","there","o"],["p",".","p"]], c:"Спрашиваем о месте — <b>где?</b>"},
      {t:[["wh","Where","q"],["can","can","a"],["i","I","s"],["park","park","v"],["p","?","p"]], c:"there → <b>Where</b>, can — перед I: <i>Where can I park?</i>"}]},
    {name:"Ловушка: «как»", frames:[
      {t:[["wh","How","q","bad"],["is","is","a"],["n","your name","s"],["p","?","p"]], c:"«Как тебя зовут?» — хочется сказать How. Но англичане спрашивают «<b>что</b> твоё имя»."},
      {t:[["wh","What","q"],["is","is","a"],["n","your name","s"],["p","?","p"]], c:"<i>What is your name?</i> Так же: «как думаешь» → What do you think, «как называется» → What is it called."}]}
  ],
  rules(){
    return [
    {id:"why",title:"Вопросительное слово — первое",body:`
      <p>Вопросительное слово показывает, <b>о чём</b> спрашиваем: о месте, времени, причине. В английском оно всегда стоит <b>в самом начале</b>, а дальше идёт обычный вопрос «да / нет».</p>
      <p>Хорошая новость: новой грамматики тут нет. Если умеешь сказать <span class="mono">Did he buy a car?</span>, то <span class="mono">What did he buy?</span> — это то же самое плюс одно слово в начале.</p>`},
    {id:"formula",title:"Три формулы — одна схема",body:`
      <div class="formula">${slot("q","Where","вопрос. слово")}${PLUS}${slot("a","is","be")}${PLUS}${slot("s","the station","подлежащее")}<span class="plus">?</span></div>
      <div class="formula">${slot("q","What","вопрос. слово")}${PLUS}${slot("a","do / does / did","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","think","глагол")}<span class="plus">?</span></div>
      <div class="formula">${slot("q","Where","вопрос. слово")}${PLUS}${slot("a","can / should / will","модальный")}${PLUS}${slot("s","I","подлежащее")}${PLUS}${slot("v","park","глагол")}<span class="plus">?</span></div>
      <div class="note">Помощник выбирается так же, как раньше: нет глагола-действия → be; есть глагол → do / does / did; есть «могу / стоит / будет» → модальный.</div>`},
    {id:"words",title:"Все вопросительные слова",body:`
      ${rows(["Слово","Спрашивает о","Пример"],[
        ["What","предмет, действие, «какой» (открытый выбор)",ex("What do you want?")+" "+ex("What is your favourite film?")],
        ["Which","выбор из известных вариантов",ex("Which one do you want?")+" "+ex("Which bus should I take?")],
        ["Who","человек",ex("Who did you invite?")],["Whom","человек (официально)",ex("Whom did you invite?")],
        ["Whose","чей",ex("Whose bag is this?")],["Where","место, направление",ex("Where are you going?")],
        ["When","время",ex("When did you arrive?")],["Why","причина",ex("Why are you late?")],
        ["How","способ, состояние",ex("How did you find it?")+" "+ex("How are you?")]])}`},
    {id:"whatwhich",title:"What или which",body:`
      <p><b>What</b> — выбор открытый, вариантов не видно: ${ex("What film shall we watch?")} (любой фильм).</p>
      <p><b>Which</b> — выбор из конкретных вариантов, которые названы или лежат перед глазами: ${ex("Which film shall we watch — this one or that one?")}</p>
      <p>С <b>of</b> — только which: ${ex("Which of these bags is yours?")}</p>
      <div class="note">Не уверен? Если можно добавить «из этих» — бери which.</div>`},
    {id:"who",title:"Who, whom, whose, who's",body:`
      ${rows(["Слово","Значение","Пример"],[
        ["who","кто / кого — в разговоре на все случаи",ex("Who did you see?")],
        ["whom","кого / кому — официально, после предлога",ex("To whom should I send it?")],
        ["whose","чей",ex("Whose car is this?")],
        ["who's","= who is / who has (кто есть, кто уже)",ex("Who's there?")]])}
      <div class="note">${strike("Who's bag is this?")} — это «кто есть сумка». Правильно ${ex("Whose bag is this?")}</div>`},
    {id:"how",title:"Ловушки со словом «как»",body:`
      <p>Русское «как» не всегда How. Запомни фразы целиком:</p>
      ${rows(["По-русски","По-английски"],[
        ["Как тебя зовут?",ex("What is your name?")],["Как ты думаешь?",ex("What do you think?")],
        ["Как это называется?",ex("What is it called?")],["Как он выглядит?",ex("What does he look like?")],
        ["Какая погода?",ex("What is the weather like?")],["Как дела?",ex("How are you?")],
        ["Как добраться до…?",ex("How do I get to the station?")],["Как пишется…?",ex("How do you spell it?")]])}
      <p>Правило: How — про <b>способ</b> и <b>самочувствие</b>. Про название, мнение и описание — What.</p>`},
    {id:"algorithm",title:"Алгоритм за 4 шага",body:`
      <ol class="steps">
        <li>Назови по-русски, о чём вопрос: место? время? причина? человек? → выбери слово.</li>
        <li>Есть ли глагол-действие? Нет → be. Есть → do / does / did. «Могу, стоит, будет» → модальный.</li>
        <li>Поставь помощника <b>сразу после</b> вопросительного слова, перед подлежащим.</li>
        <li>Глагол — в начальной форме (если помощник do / does / did или модальный).</li></ol>`},
    {id:"answers",title:"Как отвечать",body:`
      <p>На вопрос с вопросительным словом не отвечают Yes / No. Отвечают сразу информацией — и часто коротко:</p>
      ${rows(["Вопрос","Короткий ответ","Полный ответ"],[
        [ex("Where do you live?"),mn("In Kyiv."),mn("I live in Kyiv.")],[ex("When did you arrive?"),mn("Yesterday."),mn("I arrived yesterday.")],
        [ex("Why are you late?"),mn("Because of traffic."),mn("I'm late because of the traffic.")],[ex("Whose bag is this?"),mn("Mine."),mn("It's mine.")]])}`},
    {id:"sound",title:"Как это звучит",body:`
      <p>В вопросах с вопросительным словом голос в конце идёт <b>вниз</b> ↘: ${ex("Where do you live?")}</p>
      <p>Ударение — на вопросительном слове и главном смысловом слове: <span class="mono">WHERE do you LIVE?</span></p>
      <p>Если переспрашиваешь (не расслышал), голос идёт вверх: ${ex("Where did you say?")}</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Вопрос-слово + вопрос «да / нет»","Умеешь «Did he buy it?» — умеешь и «What did he buy?». Новое только первое слово.",[]],
      ["mem","Which = «который из этих»","Если по-русски можно сказать «какой из» — это which.",["Which one?"]],
      ["mem","Whose ≠ who's","Whose — «чей». Who's — «кто есть». На слух одинаково, на письме проверяй.",[]],
      ["mem","How — способ, What — название","How do you spell it? (как пишется — способ). What is it called? (как называется — название).",[]],
      ["obs","Why don't you…? — это совет","Why don't you sit down? — не «почему не садишься», а «почему бы тебе не присесть».",["Why don't you sit down?"]],
      ["obs","How come — разговорное «почему»","How come you're late? После How come порядок прямой, без помощника.",["How come you're late?"]],
      ["obs","Whom умирает","В разговоре почти всегда who. Whom остался в официальных письмах и после предлога: To whom…?",[]],
      ["obs","Ответ на wh-вопрос — без Yes","Where do you live? — In Kyiv. Добавить Yes — типичная ошибка.",[]],
      ["hack","Начни с ответа","Напиши ответ, подчеркни часть, о которой спрашиваешь, замени её вопросительным словом и поставь помощника.",[]],
      ["hack","Не знаешь, как спросить? What about…?","What about tomorrow? — «А как насчёт завтра?» Спасает в разговоре.",["What about tomorrow?"]],
      ["hack","Переспросить кусок","Не расслышал часть? Повтори фразу, заменив кусок вопросительным словом: «You went where?»",["You went where?"]],
      ["hack","Which one — универсальный","Которой из них? Which one? Можно показывать пальцем и не знать названия.",["Which one?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["How do you think?","What do you think?","«Как думаешь» — What."],["How is it called?","What is it called?","Название — What."],
      ["Who's bag is this?","Whose bag is this?","Чей → whose."],["What you are doing?","What are you doing?","Помощник — перед подлежащим."],
      ["Where you can buy it?","Where can you buy it?","Модальный — перед подлежащим."],["Why you didn't tell me?","Why didn't you tell me?","didn't — перед подлежащим."],
      ["Where is live your brother?","Where does your brother live?","live — глагол → does."],["What does it means?","What does it mean?","После does — без -s."],
      ["How does she look like?","What does she look like?","С like — только What."],["Which is your name?","What is your name?","Имя не выбирают из вариантов."],
      ["What of these is yours?","Which of these is yours?","С of — только which."],["Where do you live? — Yes, in Kyiv.","In Kyiv.","На wh-вопрос — без Yes."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:Why|a:are|s:you|o:so happy",ru:"Почему ты такой счастливый?",extra:["do","what"],hint:"Причина → Why. Happy — состояние → are.",alt:[["What are you so happy about?","предлог в конце"],["What's made you so happy?","Present Perfect"]]},
  {type:"build",f:"q:Whose phone|a:is|s:this",ru:"Чей это телефон?",extra:["who","who's"],hint:"Чей → Whose + существительное, потом is.",alt:[["Whose is this phone?","тоже верно"],["Who does this phone belong to?","через belong"]]},
  {type:"choose",q:"___ do you prefer, tea or coffee?",opts:["Which","What","Who","How"],ans:0,f:"q:Which|a:do|s:you|v:prefer|o:tea or coffee",ru:"Что ты предпочитаешь — чай или кофе?",cat:"wh",hint:"Выбор из названных вариантов → Which.",why:{1:"What — когда вариантов не называют. Здесь выбор из двух → Which.",3:"How — «как», здесь не подходит."},alt:[["Tea or coffee?","коротко"],["Would you prefer tea or coffee?","вежливо"]]},
  {type:"choose",q:"___ is your favourite film?",opts:["What","Which","How","Who"],ans:0,f:"q:What|a:is|s:your favourite film",ru:"Какой твой любимый фильм?",cat:"wh",hint:"Открытый выбор, без вариантов → What.",why:{1:"Which — когда выбираем из названных вариантов. Здесь любой фильм → What.",2:"How — «как». «Какой» здесь → What."},alt:[["What film do you like most?","через like"],["Do you have a favourite film?","общий вопрос"]]},
  {type:"tr",ru:"Как это называется?",f:"q:What|a:is|s:it|v:called",acc:["What is this called","What is that called","What do you call it","What do you call this"],hint:"«Как называется» → What + is + it + called. Не How!",alt:[["What do you call this?","через call"],["What's the word for this?","«как это слово?»"]]},
  {type:"fix",wrong:"How do you think?",f:"q:What|a:do|s:you|v:think",ru:"Как ты думаешь?",acc:[],hint:"«Как думаешь?» по-английски — What do you think?",alt:[["What's your opinion?","через be"],["What do you reckon?","брит., разговорно"]]},
  {type:"focus",s:"She is crying {because she lost her bag}.",f:"q:Why|a:is|s:she|v:crying",ru:"Почему она плачет?",acc:[],hint:"Причина → Why. is — перед she.",alt:[["What's she crying about?","предлог в конце"],["What's wrong with her?","разговорно"]]},
  {type:"answer",reply:"It's Anna's.",about:"Спроси, чья это куртка (jacket).",f:"q:Whose jacket|a:is|s:this",ru:"Чья это куртка?",acc:["Whose jacket is that","Whose jacket is it","Whose is this jacket","Whose is the jacket"],hint:"Чья → Whose jacket + is + this.",alt:[["Whose is this jacket?","тоже верно"],["Who does this jacket belong to?","через belong"]]},
  {type:"build",f:"q:Who|a:did|s:you|v:invite",ru:"Кого ты пригласил?",extra:["invited","whose"],hint:"Кого? → Who + did + you + invite.",alt:[["Whom did you invite?","формально"],["Who's coming?","о гостях, Continuous"]]},
  {type:"choose",q:"___ way is the station? — Left.",opts:["Which","What","Where","How"],ans:0,f:"q:Which way|a:is|s:the station",ru:"В какую сторону вокзал?",cat:"wh",hint:"Which way — «в какую сторону», выбор из направлений.",why:{1:"What way — так говорят редко. Направление выбирают из нескольких → Which way.",2:"Where is the station? — тоже можно, но тогда без way.",3:"How — «как добраться»: How do I get to the station?"},alt:[["Where's the station?","через where"],["How do I get to the station?","через get"]]},
  {type:"tr",ru:"Почему ты не пришёл?",f:"q:Why|a:didn't|s:you|v:come",acc:["Why did you not come"],hint:"Why + didn't + you + come.",alt:[["How come you didn't come?","разговорно"],["What happened? You didn't come.","разговорно"]]},
  {type:"fix",wrong:"Who's bag is this?",f:"q:Whose bag|a:is|s:this",ru:"Чья это сумка?",acc:["Whose is this bag"],hint:"Who's = who is («кто есть»). «Чей» — whose.",alt:[["Whose is this bag?","тоже верно"],["Is this your bag?","общий вопрос"]]},
  {type:"focus",s:"I'm reading {a book about Japan}.",f:"q:What|a:are|s:you|v:reading",ru:"Что ты читаешь?",acc:[],hint:"Что? → What. Сейчас, в процессе: are + you + reading.",alt:[["What's that you're reading?","разговорно"],["What book are you reading?","уточнение"]]},
  {type:"build",f:"q:How|a:did|s:you|v:find|o:this place",ru:"Как ты нашёл это место?",extra:["found","what"],hint:"Как? (способ) → How + did + you + find.",alt:[["How did you come across this place?","«как наткнулся»"],["Who told you about this place?","вопрос к подлежащему"]]},
  {type:"choose",q:"___ did you go to bed? — At midnight.",opts:["When","Where","Why","Who"],ans:0,f:"q:When|a:did|s:you|v:go|o:to bed",ru:"Когда ты лёг спать?",cat:"wh",hint:"Ответ — время → When.",alt:[["What time did you go to bed?","точнее"],["How late did you stay up?","«до скольки не спал»"]]},
  {type:"choose",q:"___ are you calling? — My mum.",opts:["Who","Whose","Which","What"],ans:0,f:"q:Who|a:are|s:you|v:calling",ru:"Кому ты звонишь?",cat:"wh",hint:"Человек → Who.",why:{1:"Whose — «чей».",2:"Which — «который из». Здесь просто «кому»."},alt:[["Who are you phoning?","брит."],["Who's on the phone?","«кто на телефоне?»"]]},
  {type:"answer",reply:"Because I missed the bus.",about:"Спроси, почему он опоздал (you, late).",f:"q:Why|a:were|s:you|o:late",ru:"Почему ты опоздал?",acc:["Why are you late","Why did you come late"],hint:"Причина → Why. Late — состояние → were или are.",alt:[["How come you were late?","разговорно"],["What held you up?","разговорно: «что задержало?»"]]},
  {type:"tr",ru:"Какой размер ты носишь?",f:"q:What size|a:do|s:you|v:wear",acc:["What size do you take","What size are you"],hint:"Какой размер → What size + do + you + wear.",alt:[["What size are you?","через be"],["What size do you take?","брит."]]},
  {type:"build",f:"q:Which one|a:do|s:you|v:want",ru:"Какой ты хочешь (из этих)?",extra:["what","does"],hint:"Выбор из видимых вариантов → Which one.",alt:[["Which do you want?","без one"],["Which one would you like?","вежливо"]]},
  {type:"fix",wrong:"What you are doing?",f:"q:What|a:are|s:you|v:doing",ru:"Что ты делаешь?",acc:[],hint:"are — перед you.",alt:[["What are you up to?","разговорно"],["What's going on?","«что происходит?»"]]},
  {type:"choose",q:"___ old is your daughter?",opts:["How","What","Which","Who"],ans:0,f:"q:How old|a:is|s:your daughter",ru:"Сколько лет твоей дочери?",cat:"wh",hint:"Возраст → How old.",alt:[["What age is your daughter?","брит."],["How old's your little girl?","разговорно"]]},
  {type:"focus",s:"We met {in Rome}.",f:"q:Where|a:did|s:you|v:meet",ru:"Где вы познакомились?",acc:["Where did you two meet"],hint:"Место → Where. met → did + meet. We → you.",alt:[["Where did you two meet?","разговорно"],["How did you meet?","«как» вместо «где»"]]},
  {type:"build",f:"q:Where|a:can|s:I|v:find|o:a pharmacy",ru:"Где я могу найти аптеку?",extra:["do","to"],hint:"Where + can + I + find.",alt:[["Is there a pharmacy near here?","через there"],["Where's the nearest chemist's?","брит."]]},
  {type:"tr",ru:"Кто тот мужчина?",f:"q:Who|a:is|s:that man",acc:["Who is that person","Who is that guy","Who is this man","Who is that"],hint:"Who + is + that man.",alt:[["Do you know that man?","общий вопрос"],["Who's that guy?","разговорно"]]},
  {type:"choose",q:"___ is the weather like? — Sunny.",opts:["What","How","Which","Why"],ans:0,f:"q:What|a:is|s:the weather|o:like",ru:"Какая погода?",cat:"wh",hint:"What … like? — «какой?» (описание). С like — только What.",why:{1:"How is the weather? — можно, но без like. С like — только What."},alt:[["How's the weather?","без like"],["Is it nice out?","разговорно"]]},
  {type:"answer",reply:"I'm going to the bank.",about:"Спроси, куда он идёт (you).",f:"q:Where|a:are|s:you|v:going",ru:"Куда ты идёшь?",acc:["Where are you off to","Where are you headed"],hint:"Where + are + you + going.",alt:[["Where are you off to?","брит., разговорно"],["Where are you headed?","амер."]]},
  {type:"fix",wrong:"Why you didn't tell me?",f:"q:Why|a:didn't|s:you|v:tell|o:me",ru:"Почему ты мне не сказал?",acc:["Why did you not tell me"],hint:"didn't — перед you.",alt:[["How come you didn't tell me?","разговорно"],["Why did nobody tell me?","вопрос к подлежащему"]]},
  {type:"build",f:"q:What|a:did|s:she|v:say|o:about me",ru:"Что она сказала обо мне?",extra:["said","how"],hint:"What + did + she + say.",alt:[["What did she tell you about me?","tell + кому"],["Did she mention me?","общий вопрос"]]},
  {type:"focus",s:"They live {in the house with the red door}.",f:"q:Which house|a:do|s:they|v:live|o:in",ru:"В каком доме они живут?",acc:["Which house is theirs","Which is their house","Where do they live","Which one is their house"],hint:"Какой из домов → Which house + do + they + live in.",alt:[["Which one is their house?","через be"],["Where exactly do they live?","через where"]]},
  {type:"choose",q:"___ do you spell «necessary»?",opts:["How","What","Which","Who"],ans:0,f:"q:How|a:do|s:you|v:spell|o:necessary",ru:"Как пишется «necessary»?",cat:"wh",hint:"Способ → How.",why:{1:"What do you spell — «что ты пишешь по буквам». Нужен способ → How."},alt:[["Can you spell «necessary»?","через can"],["How is «necessary» spelled?","пассив"]]},
  {type:"tr",ru:"Почему ты учишь английский?",f:"q:Why|a:are|s:you|v:learning|o:English",acc:["Why do you learn English","Why do you study English","Why are you studying English"],hint:"Why + are + you + learning (сейчас, в процессе). Можно и Why do you learn…",alt:[["What made you start learning English?","мягче"],["What do you need English for?","предлог в конце"]]},
  {type:"fix",wrong:"Where is live your brother?",f:"q:Where|a:does|s:your brother|v:live",ru:"Где живёт твой брат?",acc:[],hint:"live — глагол → does. is здесь лишний.",alt:[["Where's your brother living now?","Continuous: сейчас"],["Where's your brother based?","деловой стиль"]]},
  {type:"build",f:"q:When|a:will|s:you|v:be|o:ready",ru:"Когда ты будешь готов?",extra:["are","do"],hint:"Будущее → When + will + you + be ready.",alt:[["How long will you be?","«сколько тебе ещё?»"],["Are you nearly ready?","через be"]]},
  {type:"choose",q:"___ of these bags is yours?",opts:["Which","What","Whose","Who"],ans:0,f:"q:Which of these bags|a:is|s:yours",ru:"Какая из этих сумок твоя?",cat:"wh",hint:"Which of… — «какой из…».",why:{1:"С of — только which.",2:"Whose — «чья», но тогда без of these: Whose bag is this?"},alt:[["Which bag is yours?","короче"],["Is one of these bags yours?","общий вопрос"]]},
  {type:"answer",reply:"It's about a boy who can fly.",about:"Спроси, о чём книга.",f:"q:What|a:is|s:the book|o:about",ru:"О чём книга?",acc:["What is it about"],hint:"О чём? → What + is + the book + about. Предлог — в конце.",alt:[["What's the story?","разговорно"],["What happens in the book?","вопрос к подлежащему"]]},
  {type:"focus",s:"He called {to say sorry}.",f:"q:Why|a:did|s:he|v:call",ru:"Зачем он звонил?",acc:[],hint:"Цель / причина → Why. called → did + call.",alt:[["What did he call for?","предлог в конце"],["What did he want?","через want"]]},
  {type:"tr",ru:"Чья это идея?",f:"q:Whose idea|a:was|s:this",acc:["Whose idea is this","Whose idea was it","Whose idea is it","Whose idea was that"],hint:"Whose idea + was / is + this.",alt:[["Who came up with this?","вопрос к подлежащему"],["Who thought of this?","вопрос к подлежащему"]]},
  {type:"choose",q:"___ does this word mean?",opts:["What","How","Which","Why"],ans:0,f:"q:What|a:does|s:this word|v:mean",ru:"Что значит это слово?",cat:"wh",hint:"Значение → What … mean.",why:{1:"How does it mean — частая ошибка. «Что значит» → What."},alt:[["What's the meaning of this word?","через be"],["What does this mean?","короче"]]},
  {type:"fix",wrong:"How is called this street?",f:"q:What|a:is|s:this street|v:called",ru:"Как называется эта улица?",acc:[],hint:"«Как называется» → What + is + … + called.",alt:[["What's the name of this street?","через name"],["Do you know the name of this street?","косвенно"]]},
  {type:"build",f:"q:Who|a:should|s:I|v:ask",ru:"Кого мне спросить?",extra:["do","whose"],hint:"Кого → Who. should + I + ask.",alt:[["Who can I ask?","через can"],["Who's the right person to ask?","через be"]]},
  {type:"choose",q:"___ don't you sit down?",opts:["Why","What","How","Where"],ans:0,f:"q:Why|a:don't|s:you|v:sit down",ru:"Почему бы тебе не присесть?",cat:"wh",hint:"Why don't you…? — вежливое предложение «почему бы не…».",alt:[["Have a seat.","вежливо, повелительно"],["Would you like to sit down?","вежливо"]]},
  {type:"answer",reply:"The blue one.",about:"Спроси, какую машину он купил (which car, you, buy).",f:"q:Which car|a:did|s:you|v:buy",ru:"Какую машину ты купил?",acc:["What car did you buy","Which one did you buy"],hint:"Выбор из нескольких → Which car + did + you + buy.",alt:[["Which one did you go for?","разговорно"],["What car did you get?","через get"]]},
  {type:"tr",ru:"Куда ты положил ключи?",f:"q:Where|a:did|s:you|v:put|o:the keys",acc:["Where have you put the keys","Where did you put my keys","Where have you put my keys"],hint:"Where + did + you + put. Put — одинаков во всех формах.",alt:[["Where have you put the keys?","Present Perfect: ищем сейчас"],["What did you do with the keys?","разговорно"]]},
  {type:"fix",wrong:"What does she looks like?",f:"q:What|a:does|s:she|v:look|o:like",ru:"Как она выглядит?",acc:[],hint:"После does — look, без -s.",alt:[["How would you describe her?","«опиши её»"],["Is she tall?","общий вопрос"]]},
  {type:"focus",s:"My favourite colour is {green}.",f:"q:What|a:is|s:your favourite colour",ru:"Какой твой любимый цвет?",acc:["What is your favourite color"],hint:"Что / какой → What. my → your.",alt:[["Which colour do you like best?","через like"],["Have you got a favourite colour?","брит., общий вопрос"]]},
  {type:"choose",q:"___ can I do for you?",opts:["What","How","Which","Who"],ans:0,f:"q:What|a:can|s:I|v:do|o:for you",ru:"Что я могу для вас сделать?",cat:"wh",hint:"Что могу сделать → What.",why:{1:"How can I help you? — с help. С do — What can I do for you?"},alt:[["How can I help you?","с help"],["Can I help you?","общий вопрос"]]},
  {type:"build",f:"q:Why|a:were|s:they|o:angry",ru:"Почему они злились?",extra:["did","was"],hint:"Причина → Why. they → were.",alt:[["What were they angry about?","предлог в конце"],["Why were they so upset?","синоним"]]},
  {type:"tr",ru:"Как у тебя дела?",f:"q:How|a:are|s:you",acc:["How are you doing","How is it going","How are things"],hint:"How + are + you.",alt:[["How's it going?","разговорно"],["How are things?","разговорно"],["What's up?","очень разговорно, амер."]]},
  {type:"answer",reply:"Because it's cheaper.",about:"Спроси, почему он ездит на автобусе (you, go by bus).",f:"q:Why|a:do|s:you|v:go|o:by bus",ru:"Почему ты ездишь на автобусе?",acc:["Why do you take the bus","Why do you travel by bus"],hint:"Привычка → Present Simple: Why + do + you + go.",alt:[["Why do you take the bus?","нейтрально"],["How come you go by bus?","разговорно"]]},
  {type:"fix",wrong:"Where you can buy stamps?",f:"q:Where|a:can|s:you|v:buy|o:stamps",ru:"Где можно купить марки?",acc:["Where can I buy stamps"],hint:"can — перед you.",alt:[["Where do they sell stamps?","через sell"],["Is there a post office near here?","через there"]]}
  ]
};
