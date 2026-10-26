/* Module 9 — prepositions at the end, What … like? */
CONTENT.m9 = {
  title: "Предлог в конце, What … like?",
  idea: "Русский предлог стоит перед вопросительным словом («С кем?»), а английский — в самом конце вопроса: Who did you go with?",
  catSec: {order:"formula",aux_missing:"formula",prep_end:"why",like:"like",do_form:"formula",verb_s:"formula",verb_past:"formula",be_verb:"formula",do_be:"formula",be_form:"formula",wh:"verbs",short:"errors",article:"errors",other:"verbs"},
  cats: {prep_end:["Предлог в конце","В разговорном английском предлог стоит в конце вопроса: Who are you talking to? What is it about?"],
    like:["What … like / look like / How","What is he like? — характер. What does he look like? — внешность. How is he? — самочувствие."]},
  diagnose({t,u,e}){
    const PREPS=["to","with","for","about","at","from","in","on","of","after"];
    const em=norm(mainText(t)).split(" "), last=em[em.length-1];
    if(PREPS.includes(last)){
      const i=u.indexOf(last);
      if(i===0 && u[1]==="who") return {cat:"prep_end",msg:`После предлога нужен whom (${last} whom — официально). В разговоре проще: предлог в конец — …${last}?`};
      if(i>-1 && i<2 && u[u.length-1]!==last) return {cat:"prep_end",msg:`В разговорном английском предлог уходит в конец вопроса: …${last}?`};
      const uLast=u[u.length-1];
      if(i===-1 && PREPS.includes(uLast)) return {cat:"prep_end",msg:`Предлог не тот. С этим глаголом нужен «${last}».`};
      if(i===-1) return {cat:"prep_end",msg:`Не потеряй предлог: в конце вопроса нужен «${last}».`};
    }
    if(e[0]==="what" && e.includes("like")){
      if(u.includes("how")) return {cat:"like",msg:"С like — только What: What is he like? / What does he look like? How — без like: How is he?"};
      if(e.includes("look") && !u.includes("look")) return {cat:"like",msg:"Про внешность — look like: What does she look like? А What is she like — про характер."};
      if(!e.includes("look") && u.includes("look")) return {cat:"like",msg:"Look like — про внешность. Про характер и описание — What is … like?"};
      if(!u.includes("like")) return {cat:"like",msg:"Не забудь like в конце: What is it like?"};
    }
    if(e[0]==="how" && u.includes("like") && !e.includes("like")) return {cat:"like",msg:"How — без like: How is your mum? С like работает только What."};
    return null;
  },
  check: [
    {q:"Who are you talking ___?",opts:["to","with whom","about who"],ans:0,hint:"talk to — предлог в конце: Who are you talking to?"},
    {q:"What is your new boss ___? — Very friendly.",opts:["like","look like","likes"],ans:0,hint:"Характер → What is he like?"},
    {q:"Как правильно?",opts:["What are you afraid of?","Of what are you afraid?","What are you afraid?"],ans:0,hint:"be afraid of — предлог of в конце."}
  ],
  demos: [
    {name:"Предлог уезжает в конец", frames:[
      {t:[["you","You","s"],["are","are","a"],["talking","talking","v"],["to","to","o"],["anna","Anna","o"],["p",".","p"]], c:"Хотим спросить, <b>с кем</b> ты говоришь. По-русски предлог «с» был бы в начале."},
      {t:[["anna","Who","q"],["are","are","a"],["you","you","s"],["talking","talking","v"],["to","to","o"],["p","?","p"]], c:"Anna → Who, в начало. А предлог <b>to</b> остаётся на своём месте — в конце: <i>Who are you talking to?</i>"}]},
    {name:"Официально и в жизни", frames:[
      {t:[["with","With whom","q"],["did","did","a"],["you","you","s"],["go","go","v"],["p","?","p"]], c:"<i>With whom did you go?</i> — грамматически верно, но так говорят в документах и старых книгах."},
      {t:[["who","Who","q"],["did","did","a"],["you","you","s"],["go","go","v"],["with","with","o"],["p","?","p"]], c:"В жизни: <i>Who did you go with?</i> Предлог в конце — это норма, а не ошибка."}]},
    {name:"Три вопроса «какой»", frames:[
      {t:[["w","What","q"],["is","is","a"],["he","he","s"],["like","like","o"],["p","?","p"]], c:"<i>What is he like?</i> — какой он <b>по характеру</b>? Ответ: kind, funny, a bit shy."},
      {t:[["w","What","q"],["is","does","a"],["he","he","s"],["like","look like","v"],["p","?","p"]], c:"<i>What does he look like?</i> — как он <b>выглядит</b>? Ответ: tall, dark hair."},
      {t:[["w","How","q"],["is","is","a"],["he","he","s"],["p","?","p"]], c:"<i>How is he?</i> — как он <b>себя чувствует</b>? Ответ: much better, thanks."}]},
    {name:"Ловушка: How … like", frames:[
      {t:[["w","How","q","bad"],["is","is","a"],["she","she","s"],["like","like","o"],["p","?","p"]], c:"«Какая она?» хочется перевести через How. Но How и like вместе не работают."},
      {t:[["w","What","q"],["is","is","a"],["she","she","s"],["like","like","o"],["p","?","p"]], c:"С like — только <b>What</b>: <i>What is she like?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Предлог — в конец",body:`
      <p>По-русски предлог стоит перед вопросительным словом: «<b>С</b> кем?», «<b>О</b> чём?», «<b>На</b> что?». По-английски вопросительное слово уходит в начало, а предлог <b>остаётся на своём месте</b> — после глагола, то есть в конце вопроса.</p>
      ${rows(["По-русски","По-английски"],[
        ["С кем ты разговариваешь?",ex("Who are you talking to?")],["О чём фильм?",ex("What is the film about?")],
        ["На что ты смотришь?",ex("What are you looking at?")],["Откуда ты?",ex("Where are you from?")],
        ["Чего ты боишься?",ex("What are you afraid of?")],["Для чего это?",ex("What is it for?")]])}`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("q","Who","вопрос. слово")}${PLUS}${slot("a","are","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","talking","глагол")}${PLUS}${slot("o","to","предлог")}<span class="plus">?</span></div>
      <p>Всё как раньше, только в конце остаётся предлог. Помощник и порядок слов не меняются.</p>
      <div class="note">Официальный вариант — предлог в начале и <b>whom</b>: <span class="mono">To whom should I address the letter?</span> С who так нельзя: ${strike("With who did you go?")}</div>`},
    {id:"verbs",title:"Глаголы, которые держат предлог",body:`
      <p>Предлог — часть глагола. Учи их парами:</p>
      ${rows(["Глагол + предлог","Вопрос"],[
        ["talk to / about",ex("Who are you talking to?")],["listen to",ex("What are you listening to?")],
        ["look at / for",ex("What are you looking for?")],["wait for",ex("Who are you waiting for?")],
        ["think about",ex("What are you thinking about?")],["worry about",ex("What are you worried about?")],
        ["depend on",ex("What does it depend on?")],["belong to",ex("Who does this belong to?")],
        ["pay for",ex("What did you pay for?")],["come from",ex("Where do you come from?")],
        ["be afraid of",ex("What are you afraid of?")],["be interested in",ex("What are you interested in?")],
        ["be good at",ex("What are you good at?")],["live with",ex("Who do you live with?")]])}
      <div class="note">Русское «от» не всегда from: depend <b>on</b>, be afraid <b>of</b>. Не переводи предлог — учи вместе с глаголом.</div>`},
    {id:"like",title:"What … like, look like, How",body:`
      ${rows(["Вопрос","О чём","Ответ"],[
        [ex("What is he like?"),"характер, впечатление",mn("He's kind and funny.")],
        [ex("What does he look like?"),"внешность",mn("He's tall with dark hair.")],
        [ex("How is he?"),"самочувствие",mn("He's better, thanks.")],
        [ex("What does he like?"),"что ему нравится",mn("He likes football.")],
        [ex("What is the weather like?"),"описание",mn("Sunny and warm.")]])}
      <p>Like здесь — не «нравится», а «как, похожий на». Поэтому «Какой он?» — это буквально «На что он похож?»</p>`},
    {id:"whatfor",title:"What … for? и короткие вопросы",body:`
      <p><b>What … for?</b> = зачем / для чего: ${ex("What is it for?")} ${ex("What do you need it for?")}</p>
      <p>В разговоре предлог часто остаётся один, в коротком переспросе:</p>
      ${rows(["Фраза","Короткий вопрос"],[
        [mn("I'm going on holiday."),ex("Who with?")],[mn("I'm thinking."),ex("What about?")],
        [mn("I need some money."),ex("What for?")],[mn("We're moving."),ex("Where to?")]])}`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Предлог прилип к глаголу","Talk to, wait for, look at — это одно целое. Вопросительное слово уезжает, а предлог остаётся с глаголом.",[]],
      ["mem","Who + в конце, Whom + в начале","Who did you go with? (жизнь). With whom did you go? (документ). With who — никогда.",[]],
      ["mem","Like = «похожий на»","What is it like? — буквально «На что это похоже?» Поэтому только What.",["What is it like?"]],
      ["mem","Три «какой»","Характер — What is he like? Внешность — What does he look like? Здоровье — How is he?",[]],
      ["obs","Короткие вопросы-предлоги","Who with? What for? Where to? What about? — живая речь, звучит естественно.",["Who with?","What for?"]],
      ["obs","Depend on — не from","«Зависит от» по-английски depend on. That depends — «смотря как».",["What does it depend on?"]],
      ["obs","Discuss — без about","Discuss уже значит «обсуждать что-то»: What did you discuss? Без about.",["What did you discuss?"]],
      ["obs","Where … from? — классика","Where are you from? — первый вопрос при знакомстве. Предлог в конце, как у всех.",["Where are you from?"]],
      ["hack","Строй через утверждение","I'm talking to Anna → Who are you talking to? Убери Anna, поставь Who в начало — предлог не трогай.",[]],
      ["hack","What … like? — универсальный вопрос","What's the new job like? What's London like? Подходит для чего угодно, что хочешь описать.",["What's London like?"]],
      ["hack","What for? вместо Why","What for? — короче и разговорнее, чем Why. Особенно когда спрашиваешь о цели.",["What for?"]],
      ["hack","Не помнишь предлог — используй другой глагол","What are you discussing? вместо What are you talking about? Discuss без предлога.",[]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["With who did you go?","Who did you go with?","В разговоре предлог в конце."],["About what are you talking?","What are you talking about?","about — в конец."],
      ["How is she like?","What is she like?","С like — только What."],["How does he look like?","What does he look like?","С like — только What."],
      ["What does she like? (про внешность)","What does she look like?","look like — внешность."],["Who are you waiting?","Who are you waiting for?","wait for — с предлогом."],
      ["What does it depend from?","What does it depend on?","depend on."],["Of what are you afraid?","What are you afraid of?","of — в конец."],
      ["What for do you need it?","What do you need it for?","for — в конец."],["Where are you from? — I'm from.","I'm from Kyiv.","Ответ — с названием места."],
      ["What did you discuss about?","What did you discuss?","discuss — без about."],["To who should I write?","Who should I write to?","Либо to whom, либо to в конце."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:Who|a:are|s:you|v:talking|o:to",ru:"С кем ты разговариваешь?",extra:["do","about"],hint:"talk to — «разговаривать с». Предлог to — в конце.",alt:[["Who's on the phone?","по телефону"],["Who are you speaking to?","нейтрально"]]},
  {type:"build",f:"q:What|a:are|s:you|v:looking|o:at",ru:"На что ты смотришь?",extra:["for","do"],hint:"look at — «смотреть на». at — в конце.",alt:[["What's caught your eye?","«что привлекло внимание?»"],["What are you staring at?","«уставился»"]]},
  {type:"choose",q:"Where are you ___?",opts:["from","of","out","at"],ans:0,f:"q:Where|a:are|s:you|o:from",ru:"Откуда ты?",cat:"prep_end",hint:"«Откуда» = Where … from.",alt:[["Where do you come from?","нейтрально"],["Where's home?","разговорно"]]},
  {type:"choose",q:"What is your new boss ___?",opts:["like","likes","look like","as"],ans:0,f:"q:What|a:is|s:your new boss|o:like",ru:"Какой твой новый начальник (по характеру)?",cat:"like",hint:"«Какой он?» (характер, описание) → What is he like?",why:{1:"likes — глагол «нравится». Здесь like — «как, похожий на».",2:"look like — про внешность и с does.",3:"What is he as — так не говорят."},alt:[["How do you get on with your new boss?","«как вы ладите?»"],["Is your new boss nice?","общий вопрос"]]},
  {type:"tr",ru:"О чём ты думаешь?",f:"q:What|a:are|s:you|v:thinking|o:about",acc:[],hint:"think about — «думать о». about — в конце.",alt:[["What's on your mind?","разговорно"],["A penny for your thoughts.","идиома: «о чём задумался?»"]]},
  {type:"fix",wrong:"With who did you go?",f:"q:Who|a:did|s:you|v:go|o:with",ru:"С кем ты ходил?",acc:["With whom did you go"],hint:"В разговоре предлог уходит в конец: Who did you go with?",alt:[["Who went with you?","к подлежащему"],["Did you go alone?","общий вопрос"]]},
  {type:"focus",s:"She is waiting {for the bus}.",f:"q:What|a:is|s:she|v:waiting|o:for",ru:"Чего она ждёт?",acc:[],hint:"wait for — «ждать». for — в конце.",alt:[["What's she waiting for?","разговорно"],["Is she waiting for the bus?","общий вопрос"]]},
  {type:"answer",reply:"It's about a family in Rome.",about:"Спроси, о чём фильм (the film).",f:"q:What|a:is|s:the film|o:about",ru:"О чём фильм?",acc:["What is it about","What is the movie about"],hint:"О чём → What + is + the film + about.",alt:[["What's the story?","разговорно"],["What's the plot?","про сюжет"]]},
  {type:"build",f:"q:What|a:does|s:she|v:look like",ru:"Как она выглядит?",extra:["how","likes"],hint:"Внешность → What does she look like?",alt:[["Is she tall?","общий вопрос"],["Can you describe her?","просьба"]]},
  {type:"choose",q:"Who does this bag belong ___?",opts:["to","for","with","at"],ans:0,f:"q:Who|a:does|s:this bag|v:belong|o:to",ru:"Кому принадлежит эта сумка?",cat:"prep_end",hint:"belong to — «принадлежать». to — в конце.",alt:[["Whose bag is this?","через whose"],["Is this anyone's bag?","общий вопрос"]]},
  {type:"tr",ru:"Кого ты ждёшь?",f:"q:Who|a:are|s:you|v:waiting|o:for",acc:["Whom are you waiting for"],hint:"wait for. Who + are + you + waiting + for.",alt:[["Are you waiting for someone?","общий вопрос"],["Who are you meeting?","через meet"]]},
  {type:"fix",wrong:"About what are you talking?",f:"q:What|a:are|s:you|v:talking|o:about",ru:"О чём вы говорите?",acc:[],hint:"Предлог about — в конце.",alt:[["What's the conversation about?","через be"],["What are you two chatting about?","разговорно"]]},
  {type:"focus",s:"He is afraid {of spiders}.",f:"q:What|a:is|s:he|o:afraid of",ru:"Чего он боится?",acc:[],hint:"be afraid of. of — в конце.",alt:[["What scares him?","к подлежащему"],["Is he scared of spiders?","общий вопрос"]]},
  {type:"build",f:"q:Where|a:did|s:you|v:get|o:that from",ru:"Откуда у тебя это?",extra:["got","of"],hint:"get … from. from — в конце.",alt:[["Where did you buy that?","через buy"],["Where's that from?","разговорно"]]},
  {type:"choose",q:"How ___ your mum? — She's much better, thanks.",opts:["is","does","looks","like"],ans:0,f:"q:How|a:is|s:your mum",ru:"Как (себя чувствует) твоя мама?",cat:"like",hint:"Самочувствие → How is…?",why:{1:"How does your mum — нужен ещё глагол. Самочувствие → How is…?",2:"How looks — так не говорят.",3:"How … like — так нельзя. С like только What."},alt:[["How's your mum doing?","разговорно"],["Is your mum feeling better?","общий вопрос"]]},
  {type:"choose",q:"What are you interested ___?",opts:["in","on","at","of"],ans:0,f:"q:What|a:are|s:you|o:interested in",ru:"Чем ты интересуешься?",cat:"prep_end",hint:"be interested in. in — в конце.",alt:[["What are you into?","разговорно"],["What do you do in your free time?","про хобби"]]},
  {type:"answer",reply:"I'm looking for my keys.",about:"Спроси, что он ищет (you, look for).",f:"q:What|a:are|s:you|v:looking|o:for",ru:"Что ты ищешь?",acc:[],hint:"look for — «искать». for — в конце.",alt:[["Have you lost something?","Present Perfect"],["Can I help you find something?","предложить помощь"]]},
  {type:"tr",ru:"Для чего это?",f:"q:What|a:is|s:it|o:for",acc:["What is this for","What is that for"],hint:"Для чего → What + is + it + for.",alt:[["What do you use it for?","через use"],["What does it do?","«что оно делает?»"]]},
  {type:"build",f:"q:Who|a:did|s:you|v:give|o:it to",ru:"Кому ты это отдал?",extra:["gave","for"],hint:"give to. to — в конце.",alt:[["Who has it now?","к подлежащему"],["Who did you hand it to?","«передал»"]]},
  {type:"fix",wrong:"How does he look like?",f:"q:What|a:does|s:he|v:look like",ru:"Как он выглядит?",acc:[],hint:"С like — только What.",alt:[["Can you describe him?","просьба"],["Is he tall or short?","альтернативный вопрос"]]},
  {type:"choose",q:"What does it depend ___?",opts:["on","of","from","at"],ans:0,f:"q:What|a:does|s:it|v:depend|o:on",ru:"От чего это зависит?",cat:"prep_end",hint:"depend on — «зависеть от» (не from!).",why:{2:"По-русски «от», но по-английски depend ON."},alt:[["It depends on what?","переспрос"],["What does it hinge on?","книжно"]]},
  {type:"focus",s:"I'm worried {about the exam}.",f:"q:What|a:are|s:you|o:worried about",ru:"О чём ты беспокоишься?",acc:["What are you worrying about"],hint:"worried about. about — в конце.",alt:[["What's worrying you?","к подлежащему"],["Why are you so worried?","через why"]]},
  {type:"build",f:"q:What|a:was|s:the weather|o:like",ru:"Какая была погода?",extra:["how","did"],hint:"Описание → What + was + the weather + like.",alt:[["How was the weather?","без like"],["Did you have good weather?","общий вопрос"]]},
  {type:"tr",ru:"С кем ты живёшь?",f:"q:Who|a:do|s:you|v:live|o:with",acc:["With whom do you live"],hint:"Who + do + you + live + with.",alt:[["Do you live alone?","общий вопрос"],["Have you got flatmates?","брит."]]},
  {type:"choose",q:"What ___ your new flat like?",opts:["is","does","looks","has"],ans:0,f:"q:What|a:is|s:your new flat|o:like",ru:"Какая у тебя новая квартира?",cat:"like",hint:"What … like + be.",why:{1:"Does + like = «нравится». Здесь описание → is.",2:"What looks your flat like — так не говорят."},alt:[["How's the new flat?","разговорно"],["Do you like your new flat?","про чувства"]]},
  {type:"answer",reply:"From my grandmother.",about:"Спроси, от кого письмо (who, the letter, from).",f:"q:Who|a:is|s:the letter|o:from",ru:"От кого письмо?",acc:["Who is it from","Who sent the letter"],hint:"От кого → Who + is + the letter + from.",alt:[["Who sent it?","к подлежащему"],["Who's it from?","разговорно"]]},
  {type:"fix",wrong:"Of what are you afraid?",f:"q:What|a:are|s:you|o:afraid of",ru:"Чего ты боишься?",acc:[],hint:"Предлог of — в конце.",alt:[["What scares you?","к подлежащему"],["What's your biggest fear?","через be"]]},
  {type:"build",f:"q:Which hotel|a:are|s:you|v:staying|o:at",ru:"В каком отеле ты остановился?",extra:["do","on"],hint:"stay at. at — в конце.",alt:[["Where are you staying?","через where"],["What hotel are you in?","разговорно"]]},
  {type:"focus",s:"They are listening {to the radio}.",f:"q:What|a:are|s:they|v:listening|o:to",ru:"Что они слушают?",acc:[],hint:"listen to. to — в конце.",alt:[["What's on the radio?","через be"],["What's that they're listening to?","разговорно"]]},
  {type:"choose",q:"Who were you talking ___ on the phone?",opts:["to","at","for","of"],ans:0,f:"q:Who|a:were|s:you|v:talking|o:to on the phone",ru:"С кем ты говорил по телефону?",cat:"prep_end",hint:"talk to.",alt:[["Who was on the phone?","к подлежащему"],["Who called?","к подлежащему"]]},
  {type:"tr",ru:"Какой он человек?",f:"q:What|a:is|s:he|o:like",acc:["What kind of person is he","What sort of person is he","What is he like as a person"],hint:"Характер → What + is + he + like.",alt:[["What kind of person is he?","нейтрально"],["Is he nice?","общий вопрос"]]},
  {type:"fix",wrong:"To who should I send the email?",f:"q:Who|a:should|s:I|v:send|o:the email to",ru:"Кому мне отправить письмо?",acc:["To whom should I send the email"],hint:"В разговоре предлог в конце. Официально — To whom…?",alt:[["Who's the email for?","через be"],["Where should I send the email?","про адрес"]]},
  {type:"build",f:"q:What|a:are|s:you|v:laughing|o:at",ru:"Над чем ты смеёшься?",extra:["about","do"],hint:"laugh at — «смеяться над».",alt:[["What's so funny?","через be"],["Why are you laughing?","через why"]]},
  {type:"choose",q:"What does she ___? — She's tall with dark hair.",opts:["look like","like","looks like","is like"],ans:0,f:"q:What|a:does|s:she|v:look like",ru:"Как она выглядит?",cat:"like",hint:"Внешность → look like.",why:{1:"What does she like — «что ей нравится».",2:"После does — look, без -s.",3:"What is she like — характер, а ответ про внешность."},alt:[["Can you describe her?","просьба"],["Is she tall?","общий вопрос"]]},
  {type:"answer",reply:"For my sister. It's her birthday.",about:"Спроси, для кого подарок (who, the present, for).",f:"q:Who|a:is|s:the present|o:for",ru:"Для кого подарок?",acc:["Who is it for"],hint:"Для кого → Who + is + the present + for.",alt:[["Who did you buy it for?","через buy"],["Is it for someone special?","общий вопрос"]]},
  {type:"focus",s:"We were talking {about politics}.",f:"q:What|a:were|s:you|v:talking|o:about",ru:"О чём вы говорили?",acc:[],hint:"talk about. about — в конце. We → you.",alt:[["What was the conversation about?","через be"],["What were you discussing?","через discuss — без предлога"]]},
  {type:"tr",ru:"Где ты вырос?",f:"q:Where|a:did|s:you|v:grow up",acc:[],hint:"grow up — «вырасти». Where + did + you + grow up.",alt:[["Where are you from originally?","разговорно"],["Where did you spend your childhood?","книжно"]]},
  {type:"choose",q:"What are you good ___?",opts:["at","in","on","for"],ans:0,f:"q:What|a:are|s:you|o:good at",ru:"Что у тебя хорошо получается?",cat:"prep_end",hint:"be good at.",alt:[["What are your strengths?","на собеседовании"],["What's your talent?","разговорно"]]},
  {type:"fix",wrong:"How is your sister like?",f:"q:What|a:is|s:your sister|o:like",ru:"Какая твоя сестра?",acc:[],hint:"С like — только What.",alt:[["How's your sister?","про здоровье — без like"],["Tell me about your sister.","просьба"]]},
  {type:"build",f:"q:Who|a:did|s:you|v:get|o:the idea from",ru:"От кого ты взял эту идею?",extra:["got","of"],hint:"get from. from — в конце.",alt:[["Where did you get the idea?","через where"],["Whose idea was it?","через whose"]]},
  {type:"choose",q:"What is this ___? — It's for opening bottles.",opts:["for","to","at","with"],ans:0,f:"q:What|a:is|s:this|o:for",ru:"Для чего это?",cat:"prep_end",hint:"What … for = для чего.",alt:[["What do you use this for?","через use"],["What does this do?","«что это делает?»"]]},
  {type:"answer",reply:"To the seaside. We go every year.",about:"Спроси, куда они едут (where, you, go).",f:"q:Where|a:are|s:you|v:going",ru:"Куда вы едете?",acc:["Where are you going to","Where are you off to"],hint:"Where are you going? (to в конце можно опустить).",alt:[["Where to?","коротко"],["Where are you off to?","брит., разговорно"]]},
  {type:"tr",ru:"О чём эта книга?",f:"q:What|a:is|s:this book|o:about",acc:["What is the book about","What is it about"],hint:"О чём → What + is + this book + about.",alt:[["What's the story?","разговорно"],["Is it a good book?","общий вопрос"]]},
  {type:"fix",wrong:"What for do you need it?",f:"q:What|a:do|s:you|v:need|o:it for",ru:"Зачем тебе это?",acc:[],hint:"for уходит в конец: What do you need it for?",alt:[["Why do you need it?","через why"],["What's it for?","короче"]]},
  {type:"focus",s:"This letter is {from the bank}.",f:"q:Who|a:is|s:this letter|o:from",ru:"От кого это письмо?",acc:["Who is the letter from","Who is it from","Where is this letter from"],hint:"От кого → Who + is + this letter + from.",alt:[["Who sent this letter?","к подлежащему"],["What's this letter about?","о содержании"]]},
  {type:"choose",q:"What did you pay ___?",opts:["for","to","at","on"],ans:0,f:"q:What|a:did|s:you|v:pay|o:for",ru:"За что ты заплатил?",cat:"prep_end",hint:"pay for — «платить за».",alt:[["What was the money for?","через be"],["What did you buy?","через buy"]]},
  {type:"build",f:"q:What|a:are|s:you|o:afraid of",ru:"Чего ты боишься?",extra:["do","for"],hint:"be afraid of. of — в конце.",alt:[["What scares you?","к подлежащему"],["What frightens you?","к подлежащему"]]},
  {type:"tr",ru:"Как она выглядит?",f:"q:What|a:does|s:she|v:look like",acc:[],hint:"Внешность → What does she look like?",alt:[["Is she pretty?","общий вопрос"],["What's she look like?","разговорно"]]},
  {type:"answer",reply:"She's really kind and funny.",about:"Спроси, какая его девушка по характеру (your girlfriend, like).",f:"q:What|a:is|s:your girlfriend|o:like",ru:"Какая твоя девушка?",acc:["What is she like"],hint:"Характер → What + is + your girlfriend + like.",alt:[["Tell me about your girlfriend.","просьба"],["How did you two meet?","другая тема"]]},
  {type:"fix",wrong:"Who are you waiting?",f:"q:Who|a:are|s:you|v:waiting|o:for",ru:"Кого ты ждёшь?",acc:[],hint:"wait for — предлог обязателен.",alt:[["Are you waiting for someone?","общий вопрос"],["Who are you meeting?","через meet"]]}
  ]
};
