/* Module 4 — modal verbs */
CONTENT.m4 = {
  title: "Модальные: can, will, should…",
  idea: "Модальные глаголы прыгают вперёд сами, как be. Do не нужен, а после них идёт голый глагол — без to и без -s.",
  catSec: {order:"formula",aux_missing:"why",do_modal:"why",modal:"meanings",modal_to:"formula",verb_s:"formula",do_be:"why",be_verb:"why",be_form:"meanings",do_form:"haveto",wh:"wh",short:"short",article:"errors",other:"formula"},
  check: [
    {q:"___ you swim?",opts:["Can","Do","Are"],ans:0,hint:"«Умеешь» → can. Он сам прыгает вперёд, do не нужен."},
    {q:"Could you ___ me?",opts:["help","to help","helps"],ans:0,hint:"После could — голый глагол: help."},
    {q:"Как правильно?",opts:["What should I do?","What I should do?","What do I should do?"],ans:0,hint:"should встаёт перед подлежащим, do не нужен."}
  ],
  demos: [
    {name:"Сам прыгает", frames:[
      {t:[["you","You","s"],["can","can","a"],["swim","swim","v"],["p",".","p"]], c:"Утверждение: <b>can</b> стоит после подлежащего."},
      {t:[["can","Can","a"],["you","you","s"],["swim","swim","v"],["p","?","p"]], c:"<b>Can</b> прыгает вперёд сам — как be. Никакого do: <i>Can you swim?</i>"}]},
    {name:"С вопросительным словом", frames:[
      {t:[["we","We","s"],["should","should","a"],["go","go","v"],["there","there","o"],["p",".","p"]], c:"Хотим спросить, <b>куда</b> нам стоит пойти."},
      {t:[["wh","Where","q"],["we","we","s"],["should","should","a"],["go","go","v"],["p","?","p"]], c:"there → <b>Where</b>, в начало. <i>Where we should go?</i> — ещё не вопрос."},
      {t:[["wh","Where","q"],["should","should","a"],["we","we","s"],["go","go","v"],["p","?","p"]], c:"<b>should</b> прыгает перед we: <i>Where should we go?</i>"}]},
    {name:"Лестница вежливости", frames:[
      {t:[["m","Can","a"],["you","you","s"],["help","help","v"],["me","me","o"],["p","?","p"]], c:"<b>Can you…?</b> — обычная просьба, между друзьями."},
      {t:[["m","Could","a"],["you","you","s"],["help","help","v"],["me","me","o"],["p","?","p"]], c:"<b>Could you…?</b> — вежливее. Это не прошлое, а мягкость."},
      {t:[["m","Would","a"],["you","you","s"],["help","mind helping","v"],["me","me","o"],["p","?","p"]], c:"<b>Would you mind + -ing?</b> — очень вежливо. Внимание: после mind глагол с -ing."}]},
    {name:"Ловушка: do + can", frames:[
      {t:[["you","You","s"],["can","can","a"],["drive","drive","v"],["p",".","p"]], c:"«Ты умеешь водить» — хочется спросить, как в модуле 2."},
      {t:[["do","Do","a","bad"],["you","you","s"],["can","can","a"],["drive","drive","v"],["p","?","p"]], c:"<i>Do you can drive?</i> — ошибка. Два помощника в одном вопросе не бывает."},
      {t:[["can","Can","a"],["you","you","s"],["drive","drive","v"],["p","?","p"]], c:"Модальный сам себе помощник: <i>Can you drive?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Модальные — сами себе помощники",body:`
      <p>Модальные глаголы — <span class="mono">can, could, will, would, should, must, may, shall</span> — показывают отношение: «могу», «должен», «стоит», «будет». В вопросе они ведут себя как be: <b>сами прыгают вперёд</b>.</p>
      <p>Поэтому do с ними не нужен никогда: ${strike("Do you can swim?")} → ${ex("Can you swim?")}</p>
      <p>После модального — <b>голый глагол</b>: без to, без -s, без -ed. ${strike("Can she to swims?")} → ${ex("Can she swim?")}</p>`},
    {id:"formula",title:"Формула",body:`
      <p class="muted">Вопрос «да / нет»</p>
      <div class="formula">${slot("a","Can / Should / Will…","модальный")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","help","голый глагол")}${PLUS}${slot("o","me","остальное")}<span class="plus">?</span></div>
      <p class="muted">Вопрос с вопросительным словом</p>
      <div class="formula">${slot("q","What","вопрос. слово")}${PLUS}${slot("a","should","модальный")}${PLUS}${slot("s","I","подлежащее")}${PLUS}${slot("v","do","голый глагол")}<span class="plus">?</span></div>
      <div class="note">Один модальный на вопрос, и после него — голый глагол. Это всё правило.</div>`},
    {id:"meanings",title:"Какой модальный выбрать",body:`
      ${rows(["Глагол","Смысл в вопросе","Пример"],[
        [tA("can"),"умеешь? можно? можешь?",ex("Can you swim?")+" "+ex("Can I sit here?")],
        [tA("could"),"вежливая просьба; умел раньше",ex("Could you help me?")+" "+ex("Could you swim as a child?")],
        [tA("will"),"будущее; просьба-обещание",ex("Will you be there?")+" "+ex("Will you marry me?")],
        [tA("would"),"вежливое предложение; «бы»",ex("Would you like some tea?")+" "+ex("What would you do?")],
        [tA("should"),"совет: стоит ли?",ex("Should I call her?")+" "+ex("What should I do?")],
        [tA("shall"),"предложение: давай? мне сделать?",ex("Shall we go?")+" "+ex("Shall I open the window?")],
        [tA("may"),"очень вежливое разрешение",ex("May I come in?")],
        [tA("must"),"обязан ли (редко, официально)",ex("Must I wear a tie?")]])}
      <div class="note"><b>Can I…?</b> — прошу разрешения для себя. <b>Can you…?</b> — прошу другого. Не путай: ${ex("Can you help me?")} — «помоги мне», а ${ex("Can I help you?")} — «чем вам помочь?»</div>`},
    {id:"polite",title:"Лестница вежливости",body:`
      ${rows(["Насколько вежливо","Просьба"],[
        ["Друзьям",ex("Can you open the window?")],["Нейтрально, коллегам",ex("Could you open the window?")],
        ["Вежливо",ex("Would you open the window, please?")],["Очень вежливо, незнакомым",ex("Would you mind opening the window?")]])}
      <p>На <span class="mono">Would you mind…?</span> соглашаются словом <b>No</b> («нет, не возражаю»): <span class="mono">No, not at all.</span> Сказать Yes — значит «да, возражаю».</p>`},
    {id:"haveto",title:"Have to и need to — не модальные",body:`
      <p><b>Have to</b> («надо, приходится») и <b>need to</b> выглядят похоже, но ведут себя как обычные глаголы: им нужен <b>do</b>.</p>
      ${grp([["a","Do"],["s","I"],["v","have to"],["o","pay now"],["p","?"]])}
      ${grp([["a","Does"],["s","she"],["v","need to"],["o","come"],["p","?"]])}
      <p>${strike("Have I to pay?")} — устарело. <span class="mono">Must I pay?</span> — правильно, но звучит официально. В жизни чаще <span class="mono">Do I have to…?</span></p>`},
    {id:"wh",title:"Вопросительные слова с модальными",body:`
      ${rows(["Пример","Перевод"],[
        [ex("What should I do?"),"Что мне делать?"],[ex("Where can I buy a ticket?"),"Где можно купить билет?"],
        [ex("How can I help you?"),"Чем могу помочь?"],[ex("When will you be ready?"),"Когда ты будешь готов?"],
        [ex("What would you like?"),"Что бы вы хотели?"],[ex("Which one should I take?"),"Какой мне взять?"],
        [ex("Why can't you come?"),"Почему ты не можешь прийти?"],[ex("What time shall we meet?"),"Во сколько встретимся?"]])}`},
    {id:"short",title:"Краткие ответы",body:`
      ${rows(["Вопрос","Да","Нет"],[
        [ex("Can you swim?"),mn("Yes, I can."),mn("No, I can't.")],[ex("Will you be there?"),mn("Yes, I will."),mn("No, I won't.")],
        [ex("Should I call?"),mn("Yes, you should."),mn("No, you shouldn't.")],[ex("Shall we go?"),mn("Yes, let's."),mn("Let's wait a bit.")],
        [ex("Would you like tea?"),mn("Yes, please."),mn("No, thank you.")]])}
      <p>На предложение <span class="mono">Would you like…?</span> отвечают <b>Yes, please / No, thank you</b>, а не ${strike("Yes, I would")}.</p>`},
    {id:"sound",title:"Как это звучит",body:`
      <p><b>can</b> в вопросе звучит ясно — «кэн»: ${ex("Can you hear me?")}</p>
      <p><b>can't</b> — долгое «а» (брит.) или «кэнт» с чётким т: ${ex("Why can't you come?")}</p>
      <p><span class="mono">Would you</span> и <span class="mono">Could you</span> сливаются в «вуджу», «куджу»: ${ex("Could you help me?")}</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Модальные — сами с усами","Прыгают вперёд без помощи, как be. Do рядом с ними — лишний.",["Can you swim?"]],
      ["mem","После модального — голый глагол","Ни to, ни -s, ни -ed. Can she swim? Should I go? Will it work?",[]],
      ["mem","Could — это вежливость, а не прошлое","Could you help me? — не «мог ли ты», а «не могли бы вы». Прошлое тут ни при чём.",["Could you help me?"]],
      ["mem","Shall we? = Давай?","Shall we go? — «Пойдём?» Shall I…? — «Мне…?» (предлагаю сделать).",["Shall we go?"]],
      ["obs","Would you like ≠ Do you like","Would you like tea? — хочешь сейчас (предложение). Do you like tea? — любишь вообще.",["Would you like some tea?"]],
      ["obs","Shall — британское и только с I / we","В Америке вместо Shall I…? чаще говорят Should I…? С you / he shall в вопросах не используют.",[]],
      ["obs","Would you mind — отвечают «нет»","Would you mind…? = «Вы не против…?» Согласие — «No, not at all».",["Would you mind waiting?","No, not at all."]],
      ["obs","Must в вопросах редкий","Must I…? звучит строго. Носители чаще спрашивают Do I have to…?",["Do I have to pay now?"]],
      ["hack","Лестница вежливости","Can → Could → Would → Would you mind + -ing. Чем незнакомее человек, тем выше ступенька.",[]],
      ["hack","Can I get…? — заказ в кафе","В Америке и всё чаще в Британии заказывают так: Can I get a latte, please?",["Can I get a latte, please?"]],
      ["hack","What should I do? — универсальная просьба о совете","Подходит для любой ситуации. Мягче: What do you think I should do?",["What do you think I should do?"]],
      ["hack","Is it OK if…? — запасной выход","Не уверен в модальном? Спроси разрешение через be: Is it OK if I sit here?",["Is it OK if I sit here?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Do you can swim?","Can you swim?","Модальный — сам помощник."],["Can you to help me?","Can you help me?","После can без to."],
      ["Can she swims?","Can she swim?","После can без -s."],["What I should do?","What should I do?","should — перед подлежащим."],
      ["Would you like to some tea?","Would you like some tea?","like + существительное — без to."],["Have I to go?","Do I have to go?","have to — с do."],
      ["Must I to go?","Must I go?","После must без to."],["Will you to come?","Will you come?","После will без to."],
      ["Can I help me?","Can you help me?","Прошу помощи → Can you…?"],["Would you like tea? — Yes, I would.","Yes, please.","На предложение — Yes, please."],
      ["Could you lending me…?","Could you lend me…?","После could — начальная форма."],["Do you mind to wait?","Do you mind waiting?","После mind — -ing."]])}
    ];
  },
  tasks: [
  {type:"build",f:"a:Can|s:you|v:swim",ru:"Ты умеешь плавать?",extra:["do","to"],hint:"Can сам прыгает вперёд, do не нужен.",alt:[["Do you know how to swim?","через know"],["Are you a good swimmer?","через be"]]},
  {type:"build",f:"a:Could|s:you|v:help|o:me",ru:"Не могли бы вы мне помочь?",extra:["to","do"],hint:"Could + you + help. После could — без to.",alt:[["Can you help me?","проще, чуть менее вежливо"],["Would you mind helping me?","очень вежливо"],["Could you give me a hand?","разговорно: «помоги»"]]},
  {type:"choose",q:"___ I open the window?",opts:["Shall","Do","Am","Will"],ans:0,f:"a:Shall|s:I|v:open|o:the window",ru:"Открыть окно? (предлагаю)",cat:"modal",hint:"Предложить свою помощь: Shall I…?",why:{1:"Do I open…? — «открываю ли я обычно?». Предложение — Shall I…?",2:"open — глагол, be здесь не подходит.",3:"Will I open… — вопрос о будущем, а не предложение."},alt:[["Do you want me to open the window?","нейтрально"],["Should I open the window?","амер."]]},
  {type:"choose",q:"Can she ___ the guitar?",opts:["play","plays","to play","playing"],ans:0,f:"a:Can|s:she|v:play|o:the guitar",ru:"Она умеет играть на гитаре?",cat:"verb_s",hint:"После can — голый глагол: play.",why:{1:"После can -s не нужен, даже с she.",2:"После can — без to."},alt:[["Does she play the guitar?","«играет ли»"],["Is she good at the guitar?","через be"]]},
  {type:"tr",ru:"Что мне делать?",f:"q:What|a:should|s:I|v:do",acc:["What shall I do","What can I do","What do I do"],hint:"Совет → should: What + should + I + do.",alt:[["What do you think I should do?","просьба о совете"],["What would you do?","«а ты бы что сделал?»"],["Any advice?","коротко"]]},
  {type:"fix",wrong:"Do you can drive?",f:"a:Can|s:you|v:drive",ru:"Ты умеешь водить?",acc:[],hint:"Can прыгает сам — do не нужен.",alt:[["Do you drive?","«водишь ли вообще»"],["Have you got a driving licence?","брит.: «есть права?»"]]},
  {type:"focus",s:"We should meet {at the café}.",f:"q:Where|a:should|s:we|v:meet",ru:"Где нам встретиться?",acc:["Where shall we meet"],hint:"Место → Where. should — перед we.",alt:[["Where shall we meet?","брит., «где встретимся?»"],["Where do you want to meet?","через want"]]},
  {type:"answer",reply:"Yes, of course. Here you are.",about:"Вежливо попроси передать соль (pass the salt).",f:"a:Could|s:you|v:pass|o:the salt|t:please",ru:"Не могли бы вы передать соль?",acc:["Can you pass the salt","Could you pass me the salt","Can you pass me the salt","Would you pass the salt"],hint:"Просьба: Could + you + pass + the salt.",alt:[["Can you pass the salt?","проще"],["Would you mind passing the salt?","очень вежливо"]]},
  {type:"build",f:"a:Would|s:you|v:like|o:some tea",ru:"Хотите чаю?",extra:["do","to"],hint:"Предложение: Would you like…? В предложениях — some, а не any.",alt:[["Do you want some tea?","проще, разговорно"],["Fancy a cup of tea?","брит., разговорно"],["Can I get you some tea?","«принести тебе чаю?»"]]},
  {type:"choose",q:"Can you speak Spanish? — No, I ___.",opts:["can't","don't","not","am not"],ans:0,f:"o:No,|s:I|a:can't",end:".",ru:"Ты говоришь по-испански? — Нет.",cat:"short",hint:"Спросили с can — отвечаем can't.",why:{1:"Спросили с can, а не do.",3:"am not — ответ на вопрос с be."},alt:[["No, I can't.","нейтрально"],["Only a little.","«немного»"],["Not a word!","эмоционально"]]},
  {type:"tr",ru:"Можно мне войти?",f:"a:May|s:I|v:come in",acc:["Can I come in","Could I come in"],hint:"Разрешение: May / Can + I + come in.",alt:[["Can I come in?","проще"],["Is it OK if I come in?","разговорно"],["Do you mind if I come in?","вежливо"]]},
  {type:"fix",wrong:"Can you to help me?",f:"a:Can|s:you|v:help|o:me",ru:"Можешь мне помочь?",acc:[],hint:"После can — без to.",alt:[["Could you help me?","вежливее"],["Can you give me a hand?","разговорно"]]},
  {type:"focus",s:"She will arrive {tomorrow}.",f:"q:When|a:will|s:she|v:arrive",ru:"Когда она приедет?",acc:["When is she arriving","When does she arrive"],hint:"When + will + she + arrive.",alt:[["When is she arriving?","план (модуль 7)"],["When does she get here?","расписание"]]},
  {type:"build",f:"q:What|a:should|s:I|v:wear",ru:"Что мне надеть?",extra:["do","to"],hint:"Совет → should. What + should + I + wear.",alt:[["What do you think I should wear?","мягче"],["Is there a dress code?","через be: «есть дресс-код?»"]]},
  {type:"choose",q:"___ you mind closing the door?",opts:["Would","Are","Can","Will"],ans:0,f:"a:Would|s:you|v:mind|o:closing the door",ru:"Вы не могли бы закрыть дверь?",cat:"modal",hint:"Самая вежливая просьба: Would you mind + -ing?",why:{1:"mind — глагол, be не подходит.",2:"Can you mind… — так не говорят."},alt:[["Could you close the door, please?","вежливо"],["Can you shut the door?","разговорно"]]},
  {type:"choose",q:"Where ___ I buy a ticket?",opts:["can","am","does","must"],ans:0,f:"q:Where|a:can|s:I|v:buy|o:a ticket",ru:"Где я могу купить билет?",cat:"modal",hint:"«Могу» → can.",why:{1:"buy — глагол, be не подходит.",2:"Подлежащее I, а нужна возможность → can.",3:"must — «обязан». Здесь вопрос о возможности."},alt:[["Where do I get a ticket?","разговорно"],["Where's the ticket office?","через be"]]},
  {type:"answer",reply:"Yes, I will. I promise.",about:"Спроси, позвонит ли он тебе (you, call me).",f:"a:Will|s:you|v:call|o:me",ru:"Ты мне позвонишь?",acc:["Will you call me later","Will you phone me"],hint:"«I will» → Will you call me?",alt:[["You'll call me, won't you?","разделительный вопрос (модуль 12)"],["Promise you'll call?","разговорно"]]},
  {type:"tr",ru:"Ты можешь говорить медленнее?",f:"a:Can|s:you|v:speak|o:more slowly",acc:["Could you speak more slowly","Can you speak slower","Could you speak slower","Can you talk more slowly","Could you talk more slowly"],hint:"Can / Could + you + speak + more slowly.",alt:[["Could you slow down a bit?","разговорно"],["Sorry, could you say that again?","«повторите, пожалуйста»"]]},
  {type:"build",f:"a:Shall|s:we|v:go",ru:"Пойдём?",extra:["do","will"],hint:"Предложить «давай»: Shall we…?",alt:[["Let's go, shall we?","разделительный вопрос"],["Are you ready to go?","через be"],["Should we head off?","разговорно"]]},
  {type:"fix",wrong:"What I should do?",f:"q:What|a:should|s:I|v:do",ru:"Что мне делать?",acc:[],hint:"should — перед подлежащим.",alt:[["What do I do now?","разговорно"],["What would you advise?","формально"]]},
  {type:"choose",q:"Will you ___ at the meeting?",opts:["be","are","being","to be"],ans:0,f:"a:Will|s:you|v:be|o:at the meeting",ru:"Ты будешь на встрече?",cat:"verb_s",hint:"После will — начальная форма: be.",why:{1:"После will — be, а не are.",3:"После will без to."},alt:[["Are you coming to the meeting?","план (модуль 7)"],["Are you going to be at the meeting?","going to"]]},
  {type:"focus",s:"You can park {behind the hotel}.",f:"q:Where|a:can|s:I|v:park",ru:"Где мне можно припарковаться?",acc:["Where can we park","Where could I park"],hint:"Место → Where. You → I.",alt:[["Is there anywhere to park?","через there"],["Where's the car park?","через be"]]},
  {type:"build",f:"q:How|a:can|s:I|v:help|o:you",ru:"Чем могу помочь?",extra:["do","to"],hint:"«Чем» → How. How + can + I + help + you.",alt:[["What can I do for you?","нейтрально"],["Can I help you?","общий вопрос"],["How may I help you?","очень вежливо"]]},
  {type:"tr",ru:"Стоит ли мне ему позвонить?",f:"a:Should|s:I|v:call|o:him",acc:["Should I phone him","Shall I call him","Should I ring him"],hint:"Совет → Should + I + call + him.",alt:[["Do you think I should call him?","мягче"],["Is it worth calling him?","«есть смысл?»"]]},
  {type:"choose",q:"Would you like a drink? — Yes, ___.",opts:["please","I would","I like","I do"],ans:0,f:"o:Yes,|v:please",end:".",ru:"Хотите выпить? — Да, пожалуйста.",cat:"short",hint:"На предложение Would you like…? отвечают Yes, please или No, thank you.",why:{1:"Yes, I would — грамматически можно, но звучит странно. Обычно — Yes, please.",2:"Yes, I like — «да, я люблю». Это ответ на другой вопрос.",3:"Do — не тот помощник."},alt:[["Yes, please.","нейтрально"],["I'd love one.","с удовольствием"],["No, thank you.","вежливый отказ"]]},
  {type:"answer",reply:"I'd buy a house by the sea.",about:"Спроси, что бы он сделал с миллионом (you, with a million).",f:"q:What|a:would|s:you|v:do|o:with a million",ru:"Что бы ты сделал с миллионом?",acc:["What would you do with a million dollars","What would you do if you had a million","What would you do with one million"],hint:"«Бы» → would: What + would + you + do.",alt:[["What would you do if you won a million?","условие (модуль 16)"],["How would you spend a million?","через spend"]]},
  {type:"fix",wrong:"Can she speaks French?",f:"a:Can|s:she|v:speak|o:French",ru:"Она говорит по-французски?",acc:[],hint:"После can без -s.",alt:[["Does she speak French?","«говорит ли»"],["Is her French any good?","разговорно"]]},
  {type:"build",f:"a:May|s:I|v:ask|o:a question",ru:"Можно задать вопрос?",extra:["do","to"],hint:"Вежливое разрешение: May + I + ask.",alt:[["Can I ask something?","разговорно"],["Do you mind if I ask a question?","вежливо"],["Quick question?","очень разговорно"]]},
  {type:"focus",s:"I can come {on Friday}.",f:"q:When|a:can|s:you|v:come",ru:"Когда ты сможешь прийти?",acc:["When could you come","What day can you come"],hint:"When + can + you + come. I → you.",alt:[["What day suits you?","«какой день удобен?»"],["When are you free?","через be"]]},
  {type:"choose",q:"___ I have to pay now?",opts:["Do","Must","Have","Should"],ans:0,f:"a:Do|s:I|v:have to|o:pay|t:now",ru:"Мне нужно платить сейчас?",cat:"do_modal",hint:"have to — не модальный: с ним нужен do. Do I have to…?",why:{1:"Must I have to — два «надо» сразу. Либо Must I pay?, либо Do I have to pay?",2:"Have I to pay — устаревшая форма.",3:"Should I have to — двойной смысл. Нужен do."},alt:[["Must I pay now?","официально"],["Is payment due now?","деловой стиль"]]},
  {type:"tr",ru:"Ты придёшь на вечеринку?",f:"a:Will|s:you|v:come|o:to the party",acc:["Are you coming to the party","Are you going to come to the party"],hint:"Будущее → Will + you + come.",alt:[["Are you coming to the party?","план (модуль 7)"],["Will we see you at the party?","мягко"]]},
  {type:"fix",wrong:"Would you like to some coffee?",f:"a:Would|s:you|v:like|o:some coffee",ru:"Хотите кофе?",acc:["Would you like a coffee"],hint:"like + существительное — без to. To нужен только перед глаголом: would you like to dance?",alt:[["Fancy a coffee?","брит."],["Can I get you a coffee?","нейтрально"]]},
  {type:"build",f:"a:Could|s:you|v:repeat|o:that|t:please",ru:"Не могли бы вы повторить?",extra:["to","do"],hint:"Could + you + repeat + that.",alt:[["Sorry?","коротко, вежливо"],["Could you say that again?","разговорно"],["Pardon?","вежливо"]]},
  {type:"choose",q:"What time ___ we meet?",opts:["shall","is","are","does"],ans:0,f:"q:What time|a:shall|s:we|v:meet",ru:"Во сколько встретимся?",cat:"modal",hint:"Договориться о встрече: Shall we…?",why:{1:"meet — глагол, be не подходит.",2:"meet — глагол, be не подходит.",3:"we → не does. А для предложения — shall."},alt:[["What time should we meet?","амер."],["What time works for you?","«во сколько тебе удобно?»"]]},
  {type:"answer",reply:"Yes, you can. Go ahead.",about:"Спроси разрешения воспользоваться его телефоном (I, use your phone).",f:"a:Can|s:I|v:use|o:your phone",ru:"Можно воспользоваться твоим телефоном?",acc:["Could I use your phone","May I use your phone"],hint:"Разрешение: Can + I + use…",alt:[["Could I use your phone?","вежливее"],["Do you mind if I use your phone?","очень вежливо"]]},
  {type:"focus",s:"He can't come {because he is ill}.",f:"q:Why|a:can't|s:he|v:come",ru:"Почему он не может прийти?",acc:["Why can he not come"],hint:"Why + can't + he + come.",alt:[["What's stopping him from coming?","разговорно"],["Why isn't he coming?","план (модуль 7)"]]},
  {type:"tr",ru:"Что ты будешь пить?",f:"q:What|a:will|s:you|v:have",acc:["What would you like to drink","What will you drink","What are you drinking","What will you have to drink","What would you like"],hint:"В кафе: What will you have? или What would you like to drink?",alt:[["What would you like to drink?","вежливо"],["What can I get you?","официант"],["What are you having?","разговорно"]]},
  {type:"choose",q:"Could you ___ me the way to the station?",opts:["tell","to tell","telling","told"],ans:0,f:"a:Could|s:you|v:tell|o:me the way to the station",ru:"Не подскажете дорогу до вокзала?",cat:"modal_to",hint:"После could — голый глагол без to.",alt:[["How do I get to the station?","через get"],["Which way is the station?","через be"]]},
  {type:"fix",wrong:"Have I to fill in this form?",f:"a:Do|s:I|v:have to|o:fill in this form",ru:"Мне нужно заполнять эту анкету?",acc:["Must I fill in this form","Do I need to fill in this form"],hint:"have to — с помощником do: Do I have to…?",alt:[["Do I need to fill in this form?","need to"],["Is this form necessary?","через be"]]},
  {type:"build",f:"a:Will|s:it|v:rain|t:tomorrow",ru:"Завтра будет дождь?",extra:["does","rains"],hint:"Будущее → Will + it + rain.",alt:[["Is it going to rain tomorrow?","going to: по признакам"],["What's the forecast for tomorrow?","через be"]]},
  {type:"choose",q:"Will you be home tonight? — Yes, I ___.",opts:["will","am","do","would"],ans:0,f:"o:Yes,|s:I|a:will",end:".",ru:"Ты будешь дома вечером? — Да.",cat:"short",hint:"Спросили с will — отвечаем will.",why:{1:"am — ответ на Are you…? Спросили с will.",3:"would — «бы». Спросили с will."},alt:[["Yes, I will.","нейтрально"],["Yeah, I'll be in.","разговорно, брит."]]},
  {type:"answer",reply:"I'd rather stay at home.",about:"Спроси, что бы он предпочёл делать вечером (you, prefer to do tonight).",f:"q:What|a:would|s:you|v:prefer to do|t:tonight",ru:"Чем бы ты предпочёл заняться вечером?",acc:["What would you like to do tonight","What would you rather do tonight","What would you like to do"],hint:"What + would + you + prefer to do.",alt:[["What would you rather do tonight?","разговорно"],["What do you fancy doing tonight?","брит."]]},
  {type:"tr",ru:"Можно я сяду здесь?",f:"a:Can|s:I|v:sit|t:here",acc:["May I sit here","Could I sit here","Can I sit down here"],hint:"Can / May + I + sit here.",alt:[["Is this seat free?","через be"],["Is anyone sitting here?","Continuous"],["Do you mind if I sit here?","вежливо"]]},
  {type:"fix",wrong:"Will you to come tomorrow?",f:"a:Will|s:you|v:come|t:tomorrow",ru:"Ты придёшь завтра?",acc:[],hint:"После will — без to.",alt:[["Are you coming tomorrow?","план"],["Can you make it tomorrow?","«сможешь прийти?»"]]},
  {type:"focus",s:"You should take {the 7 o'clock train}.",f:"q:Which train|a:should|s:I|v:take",ru:"На какой поезд мне сесть?",acc:["What train should I take","Which train shall I take"],hint:"Какой из нескольких → Which train + should + I + take.",alt:[["Which train do you recommend?","через recommend"],["What's the best train to take?","через be"]]},
  {type:"choose",q:"Must I ___ a tie?",opts:["wear","to wear","wears","wearing"],ans:0,f:"a:Must|s:I|v:wear|o:a tie",ru:"Я обязан надеть галстук?",cat:"modal_to",hint:"После must — без to.",alt:[["Do I have to wear a tie?","чаще в речи"],["Is a tie required?","официально"]]},
  {type:"build",f:"a:Can|s:I|v:pay|o:by card",ru:"Можно оплатить картой?",extra:["do","to"],hint:"Can + I + pay + by card.",alt:[["Do you take cards?","«принимаете карты?»"],["Is it OK to pay by card?","через be"]]},
  {type:"tr",ru:"Ты бы мне помог?",f:"a:Would|s:you|v:help|o:me",acc:["Could you help me","Would you help me please"],hint:"«Бы» → would: Would + you + help + me.",alt:[["Could you help me out?","разговорно"],["Would you mind helping me?","очень вежливо"]]},
  {type:"answer",reply:"Sure! What time?",about:"Предложи встретиться завтра (we, meet tomorrow).",f:"a:Shall|s:we|v:meet|t:tomorrow",ru:"Встретимся завтра?",acc:["Should we meet tomorrow","Can we meet tomorrow","Could we meet tomorrow"],hint:"Предложение → Shall + we + meet.",alt:[["How about meeting tomorrow?","разговорно"],["Do you want to meet tomorrow?","через want"],["Let's meet tomorrow, shall we?","разделительный вопрос"]]},
  {type:"fix",wrong:"Could you lending me your pen?",f:"a:Could|s:you|v:lend|o:me your pen",ru:"Не одолжишь мне ручку?",acc:[],hint:"После could — начальная форма: lend.",alt:[["Can I borrow your pen?","«можно одолжить» — с позиции берущего"],["Have you got a pen I could use?","вежливо"]]}
  ]
};
