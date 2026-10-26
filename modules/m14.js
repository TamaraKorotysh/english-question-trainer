/* Module 14 — short reactions: echo questions, So do I, I think so */
CONTENT.m14 = {
  title: "Короткие реакции",
  idea: "В живом разговоре реагируют одним помощником: «I've been to Japan.» — «Have you?» «I love jazz.» — «So do I.» Помощник берётся из фразы собеседника.",
  catSec: {order:"soneither",aux_missing:"echo",echo:"echo",soneither:"soneither",short:"short",do_form:"echo",be_form:"echo",do_be:"echo",be_verb:"echo",verb_s:"echo",wh:"echo",article:"errors",other:"thinkso"},
  cats: {echo:["Эхо-вопрос","Короткий переспрос повторяет помощник собеседника и меняет местоимение: I've been there. — Have you?"],
    soneither:["So / Neither","Согласие: So + помощник + I (на плюс), Neither + помощник + I (на минус). Помощник — перед I."]},
  diagnose({t,u}){
    const em=norm(mainText(t)).split(" ");
    if(["so","not"].includes(em[em.length-1]) && (u.includes("yes")||u.includes("no"))) return {cat:"other",msg:"По-английски «думаю, да / надеюсь, нет» — через so и not: I think so, I hope not. Yes и no здесь не ставят."};
    if(["so","neither","nor"].includes(em[0]) && em.length===3){
      if(u[0]==="so" && em[0]==="neither") return {cat:"soneither",msg:"Фраза собеседника отрицательная → соглашаемся через Neither: Neither do I."};
      if((u[0]==="neither"||u[0]==="nor") && em[0]==="so") return {cat:"soneither",msg:"Фраза собеседника утвердительная → соглашаемся через So: So do I."};
      if(u[0]===em[0] && u[1]==="i") return {cat:"soneither",msg:`После ${em[0]==="so"?"So":"Neither"} сначала помощник, потом I: ${mainText(t)}`};
      if(u[0]===em[0] && u.includes("not")) return {cat:"soneither",msg:"Neither уже значит «тоже не». Помощник после него — без n't."};
      if(u[0]===em[0] && u[1]!==em[1]) return {cat:"soneither",msg:`Помощник берём из фразы собеседника: ${em[1]}.`};
    }
    if(em.length<=3 && AUXW.includes(em[0])){
      if(u.length && u[0]!==em[0] && AUXW.includes(u[0])) return {cat:"echo",msg:`Эхо повторяет помощник собеседника: ${em[0]}${em[1]==="not"?"n't":""}. Нет помощника во фразе — do / does / did.`};
      const ePron=em[em.length-1];
      if(u.length && u[u.length-1]!==ePron && u[0]===em[0]) return {cat:"echo",msg:`Местоимение — про собеседника или того, о ком речь: ${ePron}.`};
    }
    return null;
  },
  check: [
    {q:"«I've been to Japan.» — «___?»",opts:["Have you","Did you","Are you"],ans:0,hint:"I've = I have → Have you?"},
    {q:"«I love pizza.» — «___»",opts:["So do I.","So I do.","So am I."],ans:0,hint:"love — глагол → do. После So — помощник, потом I."},
    {q:"«I don't smoke.» — «___»",opts:["Neither do I.","So do I.","Neither don't I."],ans:0,hint:"Минус → Neither, помощник без n't."}
  ],
  demos: [
    {name:"Эхо-вопрос", frames:[
      {t:[["i","I","s"],["have","'ve","a"],["been","been to Japan","v"],["p",".","p"]], c:"Собеседник: «I've been to Japan». Помощник — <b>have</b>."},
      {t:[["have","Have","a"],["i","you","s"],["p","?","p"]], c:"Берём помощник, ставим вперёд, I → you: <i>Have you?</i> = «Да ну? Правда?»"}]},
    {name:"Нет помощника", frames:[
      {t:[["she","She","s"],["works","works","v"],["bank","in a bank","o"],["p",".","p"]], c:"Во фразе нет помощника — только глагол works."},
      {t:[["does","Does","a"],["she","she","s"],["p","?","p"]], c:"Как в модуле 2, зовём do: works → <b>Does she?</b>"}]},
    {name:"So do I", frames:[
      {t:[["i","I","s"],["love","love","v"],["jazz","jazz","o"],["p",".","p"]], c:"Собеседник: «I love jazz». Хотим сказать «Я тоже»."},
      {t:[["so","So","o"],["do","do","a"],["i","I","s"],["p",".","p"]], c:"<b>So + помощник + I</b>: <i>So do I.</i> Порядок как в вопросе — помощник перед I."}]},
    {name:"Neither do I", frames:[
      {t:[["i","I","s"],["dont","don't","a"],["smoke","smoke","v"],["p",".","p"]], c:"Собеседник: «I don't smoke». Хотим сказать «Я тоже не»."},
      {t:[["so","Neither","o"],["dont","do","a"],["i","I","s"],["p",".","p"]], c:"<b>Neither + помощник + I</b>, без n't: <i>Neither do I.</i> В разговоре — <i>Me neither.</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Разговор на помощниках",body:`
      <p>В живом английском на фразу собеседника редко отвечают полным предложением. Отвечают одним <b>помощником</b>: Have you? So do I. I think so. Это делает речь естественной и показывает, что ты слушаешь.</p>
      <p>Хорошая новость: это всё те же помощники из модулей 1–7. Нужно только быстро найти его во фразе собеседника.</p>`},
    {id:"echo",title:"Эхо-вопросы: «Да ну? Правда?»",body:`
      <p>Возьми помощник из фразы, поставь его вперёд и замени местоимение (I → you, we → you):</p>
      ${rows(["Собеседник","Эхо"],[
        [mn("I've been to Japan."),ex("Have you?")],[mn("I'm learning Chinese."),ex("Are you?")],
        [mn("She can speak five languages."),ex("Can she?")],[mn("He's getting married."),ex("Is he?")],
        [mn("We went to Paris."),ex("Did you?")],[mn("My sister works in a bank."),ex("Does she?")],
        [mn("I don't like chocolate."),ex("Don't you?")],[mn("It isn't working."),ex("Isn't it?")]])}
      <p>Эхо повторяет знак: на минус — минус (Don't you?). Нет помощника — do / does / did.</p>`},
    {id:"soneither",title:"So do I / Neither do I",body:`
      <div class="cols">
        <div class="col"><h3>«Я тоже» — на плюс</h3><div class="pairs">
          <span>I'm tired.</span>${ex("So am I.")}<span>I love jazz.</span>${ex("So do I.")}<span>I went there.</span>${ex("So did I.")}<span>I've finished.</span>${ex("So have I.")}<span>I can swim.</span>${ex("So can I.")}</div></div>
        <div class="col"><h3>«Я тоже не» — на минус</h3><div class="pairs">
          <span>I'm not hungry.</span>${ex("Neither am I.")}<span>I don't smoke.</span>${ex("Neither do I.")}<span>I didn't go.</span>${ex("Neither did I.")}<span>I haven't seen it.</span>${ex("Neither have I.")}<span>I can't dance.</span>${ex("Neither can I.")}</div></div>
      </div>
      <div class="note">После So / Neither порядок как в вопросе: <b>помощник, потом I</b>. ${strike("So I do")} — это «Да, правда люблю», а не «я тоже».</div>
      <p>Разговорный вариант без грамматики: <b>Me too</b> (я тоже) и <b>Me neither</b> (я тоже не). Nor do I — то же, что Neither do I.</p>`},
    {id:"short",title:"Краткие ответы — сводка",body:`
      ${rows(["Вопрос с…","Да","Нет"],[
        ["be",mn("Yes, I am."),mn("No, I'm not.")],["do / does",mn("Yes, I do."),mn("No, I don't.")],["did",mn("Yes, I did."),mn("No, I didn't.")],
        ["have",mn("Yes, I have."),mn("No, I haven't.")],["can",mn("Yes, I can."),mn("No, I can't.")],["will",mn("Yes, I will."),mn("No, I won't.")]])}
      <p>Правило одно: отвечаем <b>помощником из вопроса</b>, глагол не повторяем.</p>`},
    {id:"thinkso",title:"I think so, I hope not…",body:`
      ${rows(["Фраза","Значение"],[
        [ex("I think so."),"Думаю, да."],[ex("I don't think so."),"Думаю, нет."],
        [ex("I hope so."),"Надеюсь, да."],[ex("I hope not."),"Надеюсь, нет."],
        [ex("I'm afraid so."),"Боюсь, что да."],[ex("I'm afraid not."),"К сожалению, нет."],
        [ex("I guess so."),"Наверное, да."],[ex("Not yet."),"Ещё нет."],[ex("Not really."),"Не особо."]])}
      <p>${strike("I think yes")} и ${strike("I hope no")} — кальки с русского. Только so и not.</p>`},
    {id:"sound",title:"Интонация",body:`
      <p>Эхо с интересом — голос <b>вверх</b> ↗: ${ex("Have you?")} («Да? Расскажи!»)</p>
      <p>Эхо с удивлением — голос сначала вверх, потом вниз: ${ex("Is he?")} («Да ты что!»)</p>
      <p>So do I — ударение на <b>I</b>: <span class="mono">So do I.</span></p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Найди помощника — и готово","Любая реакция строится на помощнике собеседника: Have you? So have I. Neither have I.",[]],
      ["mem","So / Neither — как вопрос","После них порядок вопроса: помощник, потом I. So do I, Neither can I.",[]],
      ["mem","Neither = «тоже не»","Отрицание уже внутри Neither. Помощник после него — без n't.",["Neither do I."]],
      ["mem","so / not — не yes / no","I think so, I hope not. Никаких I think yes.",["I hope so."]],
      ["obs","Эхо — знак интереса","Have you? Did she? — так носители показывают, что слушают. Без них разговор звучит холодно.",[]],
      ["obs","Me too / Me neither — нормально","В разговоре это даже чаще, чем So do I. Но So do I звучит увереннее.",["Me too!","Me neither."]],
      ["obs","I'm afraid — не страх","I'm afraid not — просто вежливое «к сожалению, нет».",["I'm afraid not."]],
      ["obs","Really? — универсальное эхо","Если не успел найти помощника, Really? всегда подходит.",["Really?"]],
      ["hack","Эхо + вопрос = разговор","Have you? When? / Did you? How was it? — сразу продолжаешь беседу.",["Did you? How was it?"]],
      ["hack","Не согласен? Используй помощник с ударением","I don't like it. — I DO! (А я люблю!) I'm not tired. — I AM!",["I do!"]],
      ["hack","Not really — мягкое «нет»","Вместо резкого No: Do you like it? — Not really.",["Not really."]],
      ["hack","I guess so — неуверенное «да»","Когда соглашаешься без энтузиазма: Shall we go? — I guess so.",["I guess so."]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["So I do.","So do I.","Помощник перед I."],["Neither don't I.","Neither do I.","Neither уже отрицание."],
      ["So am I. (на I like it)","So do I.","like — глагол → do."],["I think yes.","I think so.","Только so."],
      ["I hope no.","I hope not.","Только not."],["Me too don't.","Me neither.","Тоже не — me neither."],
      ["Are you? (на I've been there)","Have you?","I've = I have."],["Do you? (на I'm tired)","Are you?","I'm = I am."],
      ["Yes, I like. ","Yes, I do.","Отвечай помощником."],["Did you? (на She went)","Did she?","Местоимение — she."],
      ["I don't think.","I don't think so.","Без so фраза обрывается."],["Also me.","Me too.","Also в конце не ставят."]])}
    ];
  },
  tasks: [
  {type:"react",say:"I've been to Japan.",about:"Удивись и переспроси: «Да ну?»",f:"a:Have|s:you",ru:"Правда? (Да ну?)",acc:["Really","Have you really"],hint:"Эхо: помощник have + you: Have you?",alt:[["Really? When?","с продолжением"],["Oh, have you? Lucky you!","эмоционально"]]},
  {type:"react",say:"I don't like chocolate.",about:"Удивись: «Правда? Не любишь?»",f:"a:Don't|s:you",ru:"Правда? Не любишь?",acc:["Really"],hint:"Повтори don't + you: Don't you?",alt:[["Really? Why not?","с вопросом"],["You don't? I love it!","разговорно"]]},
  {type:"react",say:"She can speak five languages.",about:"Удивись: «Правда? Умеет?»",f:"a:Can|s:she",ru:"Правда?",acc:["Can she really"],hint:"can → Can she?",alt:[["Wow, really?","разговорно"],["Five? That's impressive!","эмоционально"]]},
  {type:"react",say:"I'm tired.",about:"Скажи «Я тоже» через So.",f:"o:So|a:am|s:I",end:".",ru:"Я тоже.",acc:["Me too"],hint:"I'm = I am (плюс) → So am I.",alt:[["Me too.","разговорно"],["Same here.","разговорно"]]},
  {type:"react",say:"I don't eat meat.",about:"Скажи «Я тоже не ем» через Neither.",f:"o:Neither|a:do|s:I",end:".",ru:"Я тоже не ем.",acc:["Me neither","Nor do I"],hint:"Минус → Neither + do + I.",alt:[["Me neither.","разговорно"],["Nor do I.","брит."]]},
  {type:"react",say:"We went to Paris last month.",about:"Переспроси с интересом: «Да? Правда?»",f:"a:Did|s:you",ru:"Да? Правда?",acc:["Really","Did you really"],hint:"went → did: Did you?",alt:[["Oh, did you? How was it?","с продолжением"],["Really? Nice!","разговорно"]]},
  {type:"react",say:"It isn't working.",about:"Переспроси: «Не работает?»",f:"a:Isn't|s:it",ru:"Не работает?",acc:["Really"],hint:"isn't → Isn't it?",alt:[["Really? What's wrong?","с вопросом"],["Again?","разговорно"]]},
  {type:"react",say:"I love jazz.",about:"Скажи «Я тоже» через So.",f:"o:So|a:do|s:I",end:".",ru:"Я тоже.",acc:["Me too"],hint:"love — глагол → So do I.",alt:[["Me too!","разговорно"],["Same here!","разговорно"]]},
  {type:"react",say:"I haven't seen that film.",about:"Скажи «Я тоже не видел» через Neither.",f:"o:Neither|a:have|s:I",end:".",ru:"Я тоже не видел.",acc:["Me neither","Nor have I"],hint:"haven't → Neither have I.",alt:[["Me neither.","разговорно"],["Nor have I.","брит."]]},
  {type:"react",say:"He's getting married!",about:"Удивись: «Да ты что?»",f:"a:Is|s:he",ru:"Да ты что?",acc:["Is he really","Really"],hint:"He's = he is → Is he?",alt:[["No way!","эмоционально"],["Really? Who to?","с вопросом"]]},
  {type:"react",say:"I was born in Canada.",about:"Переспроси: «Правда?»",f:"a:Were|s:you",ru:"Правда?",acc:["Really","Were you really"],hint:"I was → you were: Were you?",alt:[["Oh, were you? Whereabouts?","с вопросом"],["Really? I didn't know that.","разговорно"]]},
  {type:"react",say:"I can't swim.",about:"Скажи «Я тоже не умею» через Neither.",f:"o:Neither|a:can|s:I",end:".",ru:"Я тоже не умею.",acc:["Me neither","Nor can I"],hint:"can't → Neither can I.",alt:[["Me neither.","разговорно"],["Nor can I.","брит."]]},
  {type:"react",say:"I'll be there at six.",about:"Скажи «Я тоже буду» через So.",f:"o:So|a:will|s:I",end:".",ru:"Я тоже буду.",acc:["Me too"],hint:"will → So will I.",alt:[["Me too.","разговорно"],["See you there!","разговорно"]]},
  {type:"react",say:"They live next door to a famous actor.",about:"Удивись: «Да ну?»",f:"a:Do|s:they",ru:"Да ну?",acc:["Really","Do they really"],hint:"live — глагол → Do they?",alt:[["Seriously?","разговорно"],["You're joking!","эмоционально"]]},
  {type:"react",say:"I've never been to London.",about:"Скажи «Я тоже не был» через Neither.",f:"o:Neither|a:have|s:I",end:".",ru:"Я тоже не был.",acc:["Me neither","Nor have I"],hint:"never — минус, помощник have → Neither have I.",alt:[["Me neither.","разговорно"],["Nor have I.","брит."]]},
  {type:"react",say:"My sister works in a bank.",about:"Переспроси с интересом: «Правда?»",f:"a:Does|s:she",ru:"Правда?",acc:["Really","Does she really"],hint:"works → Does she?",alt:[["Oh, does she? Which one?","с вопросом"],["Really? Does she like it?","с вопросом"]]},
  {type:"choose",q:"«I've lost my keys.» — «___ Where?»",opts:["Have you?","Did you?","Are you?","Do you?"],ans:0,f:"a:Have|s:you",ru:"«Я потерял ключи.» — «Да? Где?»",cat:"echo",hint:"I've = I have → Have you?",why:{1:"В фразе помощник have, а не did.",2:"am / are — не тот помощник.",3:"do — не тот помощник."},alt:[["Oh no! Where?","эмоционально"],["Again?","разговорно"]]},
  {type:"choose",q:"«I like cats.» — «___»",opts:["So do I.","So am I.","Neither do I.","So I do."],ans:0,f:"o:So|a:do|s:I",end:".",ru:"«Я люблю кошек.» — «Я тоже.»",cat:"soneither",hint:"like — глагол (плюс) → So do I.",why:{1:"am — для фраз с be. Здесь глагол like → do.",2:"Neither — для отрицательных фраз.",3:"После So — помощник, потом I."},alt:[["Me too.","разговорно"],["Same here.","разговорно"]]},
  {type:"choose",q:"«I'm not hungry.» — «___»",opts:["Neither am I.","So am I.","Neither do I.","I'm neither."],ans:0,f:"o:Neither|a:am|s:I",end:".",ru:"«Я не голоден.» — «Я тоже.»",cat:"soneither",hint:"Минус + be → Neither am I.",why:{1:"So — для плюса.",2:"Помощник — am, а не do.",3:"Neither ставят в начало."},alt:[["Me neither.","разговорно"],["Nor am I.","брит."]]},
  {type:"choose",q:"«Are you coming tomorrow?» — «I think ___.»",opts:["so","it","yes","that"],ans:0,f:"o:I think|v:so",end:".",ru:"«Ты придёшь завтра?» — «Думаю, да.»",cat:"other",hint:"«Думаю, да» = I think so.",why:{1:"I think it — так не говорят.",2:"I think yes — калька с русского.",3:"I think that — незаконченная фраза."},alt:[["I think so.","нейтрально"],["Probably.","коротко"]]},
  {type:"choose",q:"«Will it rain?» — «I hope ___.»",opts:["not","no","don't","isn't"],ans:0,f:"o:I hope|v:not",end:".",ru:"«Будет дождь?» — «Надеюсь, нет.»",cat:"other",hint:"«Надеюсь, нет» = I hope not.",why:{1:"I hope no — так не говорят.",2:"I hope don't — незаконченная фраза.",3:"I hope isn't — так не говорят."},alt:[["I hope not.","нейтрально"],["Fingers crossed it won't!","разговорно"]]},
  {type:"choose",q:"«She didn't call.» — «___?»",opts:["Didn't she","Doesn't she","Wasn't she","Hasn't she"],ans:0,f:"a:Didn't|s:she",ru:"«Она не позвонила.» — «Не позвонила?»",cat:"echo",hint:"Повтори помощник с тем же знаком: didn't → Didn't she?",why:{1:"Прошлое → did.",2:"call — глагол → did.",3:"В фразе — didn't, а не hasn't."},alt:[["Really? That's strange.","разговорно"],["Still nothing?","разговорно"]]},
  {type:"choose",q:"«I can't come tonight.» — «___»",opts:["Can't you? Why not?","Can you? Why not?","Don't you? Why not?","Aren't you? Why not?"],ans:0,f:"a:Can't|s:you",ru:"«Я не смогу прийти сегодня.» — «Не сможешь? Почему?»",cat:"echo",hint:"can't → Can't you?",why:{1:"Эхо повторяет знак: на can't — can't.",2:"В фразе can't, а не don't.",3:"В фразе can't, а не aren't."},alt:[["Oh no, why not?","разговорно"],["That's a shame.","«жаль»"]]},
  {type:"choose",q:"«Is the shop open?» — «I'm afraid ___.»",opts:["not","no","isn't","don't"],ans:0,f:"o:I'm afraid|v:not",end:".",ru:"«Магазин открыт?» — «К сожалению, нет.»",cat:"other",hint:"Вежливое «к сожалению, нет» = I'm afraid not.",why:{1:"I'm afraid no — так не говорят."},alt:[["I'm afraid not.","вежливо"],["No, sorry. It's closed.","разговорно"]]},
  {type:"choose",q:"«My brother lives in Rome.» — «___?»",opts:["Does he","Is he","Did he","Do he"],ans:0,f:"a:Does|s:he",ru:"«Мой брат живёт в Риме.» — «Правда?»",cat:"echo",hint:"lives → Does he?",why:{1:"lives — глагол, be не подходит.",2:"Настоящее время → does.",3:"he → does."},alt:[["Oh, does he? Lucky him!","эмоционально"],["Really? Since when?","с вопросом"]]},
  {type:"choose",q:"«I didn't sleep well.» — «___»",opts:["Neither did I.","So did I.","Neither didn't I.","Me too didn't."],ans:0,f:"o:Neither|a:did|s:I",end:".",ru:"«Я плохо спал.» — «Я тоже.»",cat:"soneither",hint:"Минус в прошлом → Neither did I.",why:{1:"So — для плюса.",2:"После Neither помощник без n't.",3:"Так не говорят. Можно Me neither."},alt:[["Me neither.","разговорно"],["Nor did I.","брит."]]},
  {type:"choose",q:"«I was really scared.» — «___»",opts:["So was I.","So did I.","Neither was I.","So I was."],ans:0,f:"o:So|a:was|s:I",end:".",ru:"«Мне было очень страшно.» — «Мне тоже.»",cat:"soneither",hint:"was (плюс) → So was I.",why:{1:"Помощник — was, а не did.",2:"Neither — для минуса.",3:"После So — помощник, потом I."},alt:[["Me too!","разговорно"],["Same here!","разговорно"]]},
  {type:"choose",q:"«Do you like it?» — «Yes, I ___.»",opts:["do","like","like it do","am"],ans:0,f:"o:Yes,|s:I|a:do",end:".",ru:"«Тебе нравится?» — «Да.»",cat:"short",hint:"Краткий ответ: Yes, I do.",why:{1:"Глагол не повторяют — только помощник.",3:"am — ответ на вопрос с be."},alt:[["Yes, I love it!","эмоционально"],["Yeah, it's great.","разговорно"]]},
  {type:"choose",q:"«Have you finished?» — «Not ___.»",opts:["yet","already","still","ever"],ans:0,f:"o:Not|v:yet",end:".",ru:"«Ты закончил?» — «Ещё нет.»",cat:"other",hint:"«Ещё нет» = Not yet.",why:{1:"Not already — так не говорят.",2:"Not still — так не говорят.",3:"Not ever — «никогда»."},alt:[["Not yet.","нейтрально"],["Almost!","разговорно"]]},
  {type:"choose",q:"«We've moved to Berlin.» — «___ When?»",opts:["Have you?","Did you?","Are you?","Do you?"],ans:0,f:"a:Have|s:you",ru:"«Мы переехали в Берлин.» — «Правда? Когда?»",cat:"echo",hint:"We've = we have → Have you?",why:{1:"В фразе have, а не did.",2:"am / are — не тот помощник.",3:"do — не тот помощник."},alt:[["Really? How exciting!","эмоционально"],["Wow! Do you like it?","с вопросом"]]},
  {type:"build",f:"o:So|a:do|s:I",end:".",ru:"«I love pizza.» — «Я тоже!»",label:"Собери реакцию из слов",extra:["am","too"],hint:"So + do + I: сначала помощник, потом I.",alt:[["Me too!","разговорно"],["Who doesn't?","шутливо"]]},
  {type:"build",f:"o:Neither|a:can|s:I",end:".",ru:"«I can't dance.» — «Я тоже не умею.»",label:"Собери реакцию из слов",extra:["can't","so"],hint:"Neither + can + I (без n't).",alt:[["Me neither.","разговорно"],["Nor can I.","брит."]]},
  {type:"build",f:"a:Have|s:you",ru:"«I've been to Mars.» — «Да ну?»",label:"Собери реакцию из слов",extra:["did","are"],hint:"Эхо: Have + you?",alt:[["Really?","универсально"],["You're joking!","эмоционально"]]},
  {type:"build",f:"o:I hope|v:so",end:".",ru:"«Will she get the job?» — «Надеюсь, да.»",label:"Собери реакцию из слов",extra:["it","yes"],hint:"«Надеюсь, да» = I hope so.",alt:[["Fingers crossed!","разговорно: «скрестим пальцы»"],["I really hope so.","с усилением"]]},
  {type:"build",f:"o:Neither|a:was|s:I",end:".",ru:"«I wasn't at the meeting.» — «Я тоже не был.»",label:"Собери реакцию из слов",extra:["did","so"],hint:"wasn't → Neither was I.",alt:[["Me neither.","разговорно"],["Nor was I.","брит."]]},
  {type:"build",f:"a:Did|s:she",ru:"«She won the lottery!» — «Правда?»",label:"Собери реакцию из слов",extra:["does","was"],hint:"won → Did she?",alt:[["No way!","эмоционально"],["Really? How much?","с вопросом"]]},
  {type:"build",f:"o:So|a:have|s:I",end:".",ru:"«I've finished.» — «Я тоже.»",label:"Собери реакцию из слов",extra:["did","am"],hint:"have → So have I.",alt:[["Me too.","разговорно"],["Same here.","разговорно"]]},
  {type:"build",f:"o:I'm afraid|v:not",end:".",ru:"«Is there any milk?» — «Боюсь, нет.»",label:"Собери реакцию из слов",extra:["no","isn't"],hint:"I'm afraid not — вежливое «к сожалению, нет».",alt:[["Sorry, we've run out.","«закончилось»"],["No, sorry.","коротко"]]},
  {type:"fix",ctx:"«I like tea.» — «Я тоже.»",wrong:"So I do.",f:"o:So|a:do|s:I",end:".",ru:"Я тоже.",acc:["Me too"],hint:"После So — сначала помощник: So do I.",alt:[["Me too.","разговорно"],["Same here.","разговорно"]]},
  {type:"fix",ctx:"«I don't smoke.» — «Я тоже не курю.»",wrong:"Me too don't.",f:"o:Me|v:neither",end:".",ru:"Я тоже не курю.",acc:["Neither do I","Nor do I"],hint:"Разговорное «я тоже не» = Me neither (или Neither do I).",alt:[["Neither do I.","нейтрально"],["Nor do I.","брит."]]},
  {type:"fix",ctx:"«Is it far?» — «Думаю, да.»",wrong:"I think yes.",f:"o:I think|v:so",end:".",ru:"Думаю, да.",acc:[],hint:"«Думаю, да» = I think so.",alt:[["Probably.","коротко"],["I guess so.","неуверенно"]]},
  {type:"fix",ctx:"«I don't eat fish.» — «Я тоже.»",wrong:"Neither don't I.",f:"o:Neither|a:do|s:I",end:".",ru:"Я тоже не ем.",acc:["Me neither","Nor do I"],hint:"Neither уже отрицание. Помощник — без n't.",alt:[["Me neither.","разговорно"],["Nor do I.","брит."]]},
  {type:"fix",ctx:"«I like this song.» — «Я тоже.»",wrong:"So am I.",f:"o:So|a:do|s:I",end:".",ru:"Я тоже.",acc:["Me too"],hint:"like — глагол → do, а не am.",alt:[["Me too!","разговорно"],["It's great, isn't it?","разделительный"]]},
  {type:"fix",ctx:"«I've been there twice.» — «Правда?»",wrong:"Are you?",f:"a:Have|s:you",ru:"Правда?",acc:["Really"],hint:"I've = I have → Have you?",alt:[["Really? What's it like?","с вопросом"],["Lucky you!","эмоционально"]]},
  {type:"tr",ru:"«I'm learning Chinese.» — «Да ну? Правда?»",label:"Отреагируй по-английски",f:"a:Are|s:you",acc:["Really","Are you really"],hint:"I'm = I am → Are you?",alt:[["Are you? Why Chinese?","с вопросом"],["Wow, is it hard?","с вопросом"]]},
  {type:"tr",ru:"«I don't drink coffee.» — «Я тоже не пью» (через Neither).",label:"Отреагируй по-английски",f:"o:Neither|a:do|s:I",end:".",acc:["Me neither","Nor do I"],hint:"Neither do I.",alt:[["Me neither.","разговорно"],["Nor do I.","брит."]]},
  {type:"tr",ru:"«Are you coming?» — «Думаю, нет.»",label:"Отреагируй по-английски",f:"o:I don't|v:think so",end:".",acc:["I think not"],hint:"«Думаю, нет» = I don't think so.",alt:[["Probably not.","коротко"],["I doubt it.","«сомневаюсь»"]]},
  {type:"tr",ru:"«I was late again.» — «Я тоже!» (через So)",label:"Отреагируй по-английски",f:"o:So|a:was|s:I",end:".",acc:["Me too"],hint:"was → So was I.",alt:[["Me too!","разговорно"],["Same here!","разговорно"]]},
  {type:"tr",ru:"«She has three cats.» — «Правда?»",label:"Отреагируй по-английски",f:"a:Does|s:she",acc:["Really","Has she","Does she really"],hint:"has («иметь») → Does she? (брит. можно Has she?)",alt:[["Three? Wow!","эмоционально"],["Does she? What are their names?","с вопросом"]]},
  {type:"tr",ru:"«Is it going to rain?» — «Боюсь, что да.»",label:"Отреагируй по-английски",f:"o:I'm afraid|v:so",end:".",acc:[],hint:"«Боюсь, что да» = I'm afraid so.",alt:[["Looks like it.","разговорно"],["I think so.","нейтрально"]]}
  ]
};
