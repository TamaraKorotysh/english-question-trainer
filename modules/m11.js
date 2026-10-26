/* Module 11 — negative questions */
CONTENT.m11 = {
  title: "Отрицательные вопросы",
  idea: "Отрицание n't прилипает к помощнику и прыгает вместе с ним: Don't you…? Isn't it…? А отвечают по факту — как если бы вопрос был без not.",
  catSec: {order:"formula",aux_missing:"formula",neg_form:"forms",neg_answer:"answers",do_form:"forms",verb_s:"formula",verb_past:"formula",be_verb:"forms",do_be:"forms",be_form:"forms",do_modal:"forms",modal:"forms",wh:"whynot",short:"answers",article:"errors",other:"formula"},
  cats: {neg_form:["Форма отрицательного вопроса","n't прилипает к помощнику и вместе с ним встаёт перед подлежащим: Don't you…? Isn't it…? Can't you…?"],
    neg_answer:["Ответ на отрицательный вопрос","Отвечай по факту, как будто not не было: нравится → Yes, I do. Не нравится → No, I don't."]},
  diagnose({u,e}){
    if(u.filter(w=>DO.includes(w)).length>=2 && u.includes("not")) return {cat:"neg_form",msg:"n't прилипает к самому помощнику: Don't you…? Второй do не нужен."};
    if(u.includes("amn't") || (u[0]==="am" && u[1]==="not" && u[2]==="i")) return {cat:"neg_form",msg:"Для I отрицательный вопрос — Aren't I…? (Amn't не существует.)"};
    if(e.includes("not") && !u.includes("not")) return {cat:"neg_form",msg:"Вопрос отрицательный: не потеряй n't — Don't you…? Isn't it…? Why didn't you…?"};
    if(u[0]==="why" && u[1]==="not" && e.includes("not")) return {cat:"neg_form",msg:"Why not… — только в коротком ответе. В вопросе n't прилипает к помощнику: Why didn't you…?"};
    return null;
  },
  check: [
    {q:"___ you like it?",opts:["Don't","Not","Do not you"],ans:0,hint:"n't прилипает к помощнику: Don't you…?"},
    {q:"Don't you like tea? — (Люблю.) ___",opts:["Yes, I do.","No, I do.","Yes, I don't."],ans:0,hint:"Отвечай по факту: люблю → Yes, I do."},
    {q:"Как правильно?",opts:["Why didn't you call?","Why you didn't call?","Why not you called?"],ans:0,hint:"didn't — перед подлежащим."}
  ],
  demos: [
    {name:"n't прыгает вместе", frames:[
      {t:[["you","You","s"],["dont","don't","a"],["like","like","v"],["it","it","o"],["p",".","p"]], c:"Отрицание: <b>don't</b> = do + not."},
      {t:[["dont","Don't","a"],["you","you","s"],["like","like","v"],["it","it","o"],["p","?","p"]], c:"<b>Don't</b> прыгает вперёд целиком, вместе с n't: <i>Don't you like it?</i> — «Тебе что, не нравится?»"}]},
    {name:"С вопросительным словом", frames:[
      {t:[["he","He","s"],["didnt","didn't","a"],["come","come","v"],["p",".","p"]], c:"Он не пришёл. Хотим спросить <b>почему</b>."},
      {t:[["w","Why","q"],["didnt","didn't","a"],["he","he","s"],["come","come","v"],["p","?","p"]], c:"Why + <b>didn't</b> + he + come. Не <i>Why he didn't come?</i>"}]},
    {name:"Полная форма", frames:[
      {t:[["dont","Don't","a"],["you","you","s"],["like","like","v"],["it","it","o"],["p","?","p"]], c:"В разговоре — всегда сокращённо."},
      {t:[["dont","Do","a"],["you","you","s"],["not","not","a"],["like","like","v"],["it","it","o"],["p","?","p"]], c:"Полная форма: not стоит <b>после</b> подлежащего: <i>Do you not like it?</i> Звучит официально или очень настойчиво."}]},
    {name:"Ловушка: ответ", frames:[
      {t:[["q","Don't you like coffee?","o"],["a","— Yes.","o","bad"]], c:"По-русски: «Ты не любишь кофе?» — «Да» (= да, не люблю). По-английски Yes значит обратное!"},
      {t:[["q","Don't you like coffee?","o"],["a","— No, I don't.","s"]], c:"Не любишь → <b>No, I don't</b>. Любишь → <b>Yes, I do</b>. Отвечай по факту, как будто not не было."}]}
  ],
  rules(){
    return [
    {id:"why",title:"Зачем нужны отрицательные вопросы",body:`
      <p>Отрицательный вопрос — это не просто «нет». Он передаёт эмоцию или ожидание:</p>
      ${rows(["Смысл","Пример","По-русски"],[
        ["Удивление",ex("Don't you like it?"),"Тебе что, не нравится?"],
        ["Ожидаем «да»",ex("Isn't it beautiful?"),"Правда же красиво?"],
        ["Предложение",ex("Why don't we take a taxi?"),"Давай возьмём такси?"],
        ["Упрёк",ex("Why didn't you call?"),"Почему ты не позвонил?"],
        ["Вежливое приглашение",ex("Won't you sit down?"),"Не хотите присесть?"]])}`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("a","Don't / Isn't / Can't…","помощник + n't")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","like","глагол")}${PLUS}${slot("o","it","остальное")}<span class="plus">?</span></div>
      <div class="formula">${slot("q","Why","вопрос. слово")}${PLUS}${slot("a","didn't","помощник + n't")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","call","глагол")}<span class="plus">?</span></div>
      <p>Всё как в обычном вопросе — только помощник с n't. Глагол после него — по тем же правилам: после don't / doesn't / didn't / can't — начальная форма.</p>`},
    {id:"forms",title:"Все формы",body:`
      ${rows(["Помощник","Вопрос"],[
        ["don't / doesn't",ex("Don't you know?")+" "+ex("Doesn't she eat meat?")],["didn't",ex("Didn't you get my message?")],
        ["isn't / aren't",ex("Isn't it cold?")+" "+ex("Aren't you tired?")],["wasn't / weren't",ex("Wasn't it amazing?")],
        ["haven't / hasn't",ex("Haven't we met before?")],["can't",ex("Can't you wait?")],
        ["won't",ex("Won't you join us?")],["shouldn't",ex("Shouldn't we ask first?")],["aren't I",ex("Aren't I right?")]])}
      <div class="note">Для I — <b>Aren't I…?</b> Форма «amn't» не существует, а <span class="mono">Am I not…?</span> звучит очень официально.</div>
      <p>Полная форма: not стоит <b>после подлежащего</b>: <span class="mono">Do you not know? Is it not cold?</span> Это официально или с нажимом.</p>`},
    {id:"answers",title:"Как отвечать — главная ловушка",body:`
      <p>По-русски мы соглашаемся с вопросом: «Ты не идёшь?» — «Да» (= да, не иду). По-английски так нельзя. <b>Отвечай по факту</b>, как будто вопрос был без not:</p>
      ${rows(["Вопрос","Факт","Ответ"],[
        [ex("Don't you like coffee?"),"люблю",mn("Yes, I do.")],[ex("Don't you like coffee?"),"не люблю",mn("No, I don't.")],
        [ex("Aren't you coming?"),"иду",mn("Yes, I am.")],[ex("Aren't you coming?"),"не иду",mn("No, I'm not.")],
        [ex("Haven't you finished?"),"не закончил",mn("No, I haven't.")]])}
      <div class="note">Yes всегда идёт с утвердительной формой (Yes, I do), No — с отрицательной (No, I don't). Смешивать нельзя: ${strike("Yes, I don't")}.</div>`},
    {id:"whynot",title:"Why don't…? и Why not?",body:`
      <p><b>Why don't you / we…?</b> — часто это не вопрос о причине, а <b>предложение</b>: ${ex("Why don't we go to the cinema?")} = «Давай сходим в кино».</p>
      <p><b>Why not?</b> — короткий ответ «почему бы и нет» или переспрос «почему нет?»: <span class="mono">Let's go! — Why not?</span></p>
      <p>Но в полном вопросе Why not не ставят: ${strike("Why not you came?")} → ${ex("Why didn't you come?")}</p>`},
    {id:"sound",title:"Как это звучит",body:`
      <p>Удивление — голос высоко: ${ex("Don't you know?")}</p>
      <p>Ожидание согласия — голос вниз, почти утверждение: ${ex("Isn't it beautiful?")}</p>
      <p><span class="mono">Didn't you</span> сливается в «диднчу»: ${ex("Didn't you get it?")}</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","n't — прилипала","n't приклеен к помощнику и прыгает вместе с ним. Отдельно в начало не ставится.",["Don't you know?"]],
      ["mem","Отвечай по факту","Представь, что not нет. Любишь? Yes, I do. Не любишь? No, I don't.",[]],
      ["mem","Yes + да, No + нет","Yes, I do / No, I don't. Yes и don't в одном ответе не живут.",[]],
      ["mem","Aren't I — исключение","Для I: Aren't I right? Не «amn't», не «isn't I».",["Aren't I right?"]],
      ["obs","Isn't it…? = «правда же?»","Isn't it beautiful? — не сомнение, а приглашение согласиться.",["Isn't it lovely?"]],
      ["obs","Why don't we…? = давай","Самый частый способ предложить что-то. Отвечают: Good idea! / Sure!",["Why don't we order pizza?"]],
      ["obs","Won't you…? — старомодно-вежливо","Won't you sit down? — очень вежливое приглашение. В жизни чаще Would you like to…?",[]],
      ["obs","Don't you think…? — мягкое мнение","Don't you think it's too late? — способ высказать своё мнение вопросом.",["Don't you think it's too late?"]],
      ["hack","Не уверен в ответе? Дай полную фразу","Вместо Yes / No скажи: I do like it! или I don't, actually. Тогда ошибиться невозможно.",["I do like it!"]],
      ["hack","Удивление без грамматики","You don't like it? — прямой порядок + удивлённая интонация. Работает в разговоре.",["You don't like it?"]],
      ["hack","Why don't you…? — дать совет","Why don't you ask him? — мягче, чем You should ask him.",["Why don't you ask him?"]],
      ["hack","Haven't we met before?","Классическая фраза при знакомстве (иногда — для флирта).",["Haven't we met before?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Why you didn't come?","Why didn't you come?","didn't — перед подлежащим."],["Why not you came?","Why didn't you come?","Why not — только короткий ответ."],
      ["Don't you like? — Yes. (= не люблю)","No, I don't.","Отвечай по факту."],["Yes, I don't.","No, I don't.","No + отрицание."],
      ["Doesn't she knows?","Doesn't she know?","После doesn't — без -s."],["Isn't you a teacher?","Aren't you a teacher?","you → aren't."],
      ["Amn't I right?","Aren't I right?","Для I — aren't."],["Don't you can drive?","Can't you drive?","n't к модальному."],
      ["Do you don't know?","Don't you know?","Один помощник."],["Why didn't you went?","Why didn't you go?","После didn't — начальная форма."],
      ["Doesn't they live here?","Don't they live here?","they → don't."],["Not you are tired?","Aren't you tired?","n't — к помощнику."]])}
    ];
  },
  tasks: [
  {type:"build",f:"a:Don't|s:you|v:like|o:it",ru:"Тебе разве не нравится?",extra:["not","do"],hint:"Don't + you + like. n't прилипает к помощнику.",alt:[["You don't like it?","удивление, прямой порядок"],["Is it not your thing?","разговорно"]]},
  {type:"build",f:"a:Isn't|s:it|o:beautiful",ru:"Правда же красиво?",extra:["not","doesn't"],hint:"Isn't it…? — «правда же…?», ждём согласия.",alt:[["It's beautiful, isn't it?","разделительный вопрос (модуль 12)"],["Wow, how beautiful!","восклицание"]]},
  {type:"choose",q:"___ you hungry? You haven't eaten all day.",opts:["Aren't","Don't","Isn't","Haven't"],ans:0,f:"a:Aren't|s:you|o:hungry",ru:"Ты разве не голоден?",cat:"neg_form",hint:"hungry — состояние → be → Aren't you…?",why:{1:"hungry — не глагол, do не подходит.",2:"you → aren't.",3:"Haven't you hungry — так не говорят."},alt:[["You must be hungry.","утверждение"],["Hungry yet?","коротко"]]},
  {type:"choose",q:"Don't you like coffee? — (Ты любишь кофе.) ___",opts:["Yes, I do.","No, I do.","No, I don't.","Yes, I don't."],ans:0,f:"o:Yes,|s:I|a:do",end:".",ru:"Ты разве не любишь кофе? — Люблю.",cat:"neg_answer",hint:"Отвечай по факту: любишь → Yes, I do.",why:{1:"No + do — противоречие.",2:"No, I don't = «не люблю».",3:"Yes + don't — противоречие."},alt:[["Yes, I do!","нейтрально"],["Of course I do!","эмоционально"]]},
  {type:"tr",ru:"Почему ты не позвонил?",f:"q:Why|a:didn't|s:you|v:call",acc:["Why didn't you call me","Why didn't you phone"],hint:"Why + didn't + you + call.",alt:[["How come you didn't call?","разговорно"],["You could have called!","упрёк"]]},
  {type:"fix",wrong:"Why you don't come with us?",f:"q:Why|a:don't|s:you|v:come|o:with us",ru:"Почему бы тебе не пойти с нами?",acc:[],hint:"don't — перед you.",alt:[["Would you like to come with us?","вежливое приглашение"],["Come with us!","повелительно"]]},
  {type:"focus",s:"He {didn't come} to the party.",f:"q:Why|a:didn't|s:he|v:come|o:to the party",ru:"Почему он не пришёл на вечеринку?",acc:["Why didn't he come"],hint:"Why + didn't + he + come.",alt:[["What happened to him?","к подлежащему"],["Wasn't he invited?","отрицательный с be"]]},
  {type:"answer",reply:"No, I haven't. Is it good?",about:"Удивись: спроси, разве он не видел этот фильм.",f:"a:Haven't|s:you|v:seen|o:this film",ru:"Ты что, не видел этот фильм?",acc:["Haven't you seen it","Haven't you seen this movie"],hint:"Удивление → Haven't + you + seen.",alt:[["You haven't seen it?","удивление, прямой порядок"],["Have you really never seen it?","сильное удивление"]]},
  {type:"build",f:"q:Why|a:don't|s:we|v:go|o:to the cinema",ru:"Почему бы нам не пойти в кино?",extra:["not","let's"],hint:"Why don't we…? — предложение «давай…».",alt:[["Let's go to the cinema.","предложение"],["How about the cinema?","разговорно"]]},
  {type:"choose",q:"Isn't she your sister? — (Это не сестра.) ___",opts:["No, she isn't.","Yes, she isn't.","No, she is.","Yes, she is."],ans:0,f:"o:No,|s:she|a:isn't",end:".",ru:"Разве это не твоя сестра? — Нет.",cat:"neg_answer",hint:"По факту: не сестра → No, she isn't.",why:{1:"Yes + isn't — противоречие.",2:"No + is — противоречие.",3:"Yes, she is = «да, сестра»."},alt:[["No, she's my cousin.","с уточнением"],["No, we're just friends.","разговорно"]]},
  {type:"tr",ru:"Разве ты не устал?",f:"a:Aren't|s:you|o:tired",acc:[],hint:"tired — состояние → Aren't + you + tired.",alt:[["You must be tired.","утверждение"],["Not tired yet?","разговорно"]]},
  {type:"fix",wrong:"Doesn't she knows?",f:"a:Doesn't|s:she|v:know",ru:"Разве она не знает?",acc:[],hint:"После doesn't — know, без -s.",alt:[["Hasn't anyone told her?","Present Perfect"],["Does she really not know?","удивление"]]},
  {type:"focus",s:"She {can't} swim.",f:"a:Can't|s:she|v:swim",ru:"Она что, не умеет плавать?",acc:[],hint:"Can't + she + swim — удивление.",alt:[["She can't swim?","прямой порядок, удивление"],["Doesn't she know how to swim?","через know"]]},
  {type:"build",f:"a:Didn't|s:you|v:get|o:my message",ru:"Ты разве не получил моё сообщение?",extra:["not","got"],hint:"Didn't + you + get.",alt:[["Did you get my message?","нейтрально"],["Have you seen my message?","Present Perfect"]]},
  {type:"choose",q:"Why ___ you tell me earlier?",opts:["didn't","weren't","don't","haven't"],ans:0,f:"q:Why|a:didn't|s:you|v:tell|o:me|t:earlier",ru:"Почему ты не сказал мне раньше?",cat:"neg_form",hint:"Прошлое, глагол tell → didn't.",why:{1:"tell — глагол, be не подходит.",2:"Это было в прошлом → didn't.",3:"Haven't + tell — нужна третья форма told."},alt:[["You should have told me earlier!","упрёк"],["How come you didn't say anything?","разговорно"]]},
  {type:"choose",q:"___ you sit down? (вежливое приглашение)",opts:["Won't","Don't","Aren't","Isn't"],ans:0,f:"a:Won't|s:you|v:sit down",ru:"Не хотите присесть?",cat:"neg_form",hint:"Won't you…? — вежливое приглашение.",why:{1:"Don't you sit down — «разве ты не садишься (обычно)?».",2:"sit — глагол, be не подходит."},alt:[["Would you like to sit down?","вежливо"],["Please, have a seat.","вежливо"]]},
  {type:"answer",reply:"Yes, I do. I just don't have time.",about:"Удивись: спроси, разве он не любит читать (like reading).",f:"a:Don't|s:you|v:like|o:reading",ru:"Ты разве не любишь читать?",acc:["Don't you like to read"],hint:"Don't + you + like + reading.",alt:[["You don't like reading?","прямой порядок"],["Aren't you a reader?","через be"]]},
  {type:"tr",ru:"Разве сегодня не понедельник?",f:"a:Isn't|s:it|o:Monday|t:today",acc:[],hint:"Isn't + it + Monday + today?",alt:[["It's Monday today, isn't it?","разделительный"],["Today's Monday, right?","разговорно"]]},
  {type:"build",f:"a:Haven't|s:we|v:met|t:before",ru:"Мы раньше не встречались?",extra:["didn't","not"],hint:"Haven't + we + met + before.",alt:[["Have we met before?","нейтрально"],["Don't I know you from somewhere?","разговорно"]]},
  {type:"fix",wrong:"Why not you came?",f:"q:Why|a:didn't|s:you|v:come",ru:"Почему ты не пришёл?",acc:[],hint:"Прошлое → didn't перед you, глагол — come.",alt:[["Why weren't you there?","через be"],["What happened? You didn't come.","разговорно"]]},
  {type:"choose",q:"Aren't you coming? — (Не идёшь.) ___",opts:["No, I'm not.","Yes, I'm not.","No, I am.","Yes, I am."],ans:0,f:"o:No,|s:I|a:am not",end:".",ru:"Ты разве не идёшь? — Нет.",cat:"neg_answer",hint:"По факту: не идёшь → No, I'm not.",why:{1:"Yes + not — противоречие.",3:"Yes, I am = «иду»."},alt:[["No, I'm not.","нейтрально"],["No, sorry, I can't.","вежливо"]]},
  {type:"focus",s:"They {haven't finished} yet.",f:"a:Haven't|s:they|v:finished|t:yet",ru:"Они что, ещё не закончили?",acc:[],hint:"Haven't + they + finished + yet.",alt:[["Are they still working?","Continuous"],["Still not finished?","разговорно"]]},
  {type:"build",f:"a:Can't|s:you|v:wait|o:a minute",ru:"Ты не можешь подождать минутку?",extra:["don't","not"],hint:"Can't + you + wait — просьба с ноткой нетерпения.",alt:[["Could you wait a minute?","вежливо"],["Hang on a minute!","разговорно"]]},
  {type:"tr",ru:"Почему ты не ешь?",f:"q:Why|a:aren't|s:you|v:eating",acc:["Why don't you eat"],hint:"Сейчас → Why + aren't + you + eating.",alt:[["Aren't you hungry?","отрицательный с be"],["Is something wrong with the food?","мягко"]]},
  {type:"choose",q:"Didn't you lock the door? — (Запер.) ___",opts:["Yes, I did.","No, I did.","No, I didn't.","Yes, I didn't."],ans:0,f:"o:Yes,|s:I|a:did",end:".",ru:"Ты разве не запер дверь? — Запер.",cat:"neg_answer",hint:"По факту: запер → Yes, I did.",why:{1:"No + did — противоречие.",2:"No, I didn't = «не запер».",3:"Yes + didn't — противоречие."},alt:[["Yes, I did. I'm sure.","с уверенностью"],["Of course I did!","эмоционально"]]},
  {type:"answer",reply:"Because she was ill.",about:"Спроси, почему её не было на работе (wasn't she at work).",f:"q:Why|a:wasn't|s:she|o:at work",ru:"Почему её не было на работе?",acc:["Why didn't she come to work"],hint:"Why + wasn't + she + at work.",alt:[["Where was she?","специальный вопрос"],["Was she off sick?","брит.: «на больничном?»"]]},
  {type:"fix",wrong:"Isn't you a teacher?",f:"a:Aren't|s:you|o:a teacher",ru:"Разве ты не учитель?",acc:[],hint:"you → aren't.",alt:[["You're a teacher, aren't you?","разделительный"],["Don't you teach?","через teach"]]},
  {type:"build",f:"q:Why|a:haven't|s:you|v:called|o:her",ru:"Почему ты ей до сих пор не позвонил?",extra:["didn't","not"],hint:"До сих пор → Present Perfect: Why + haven't + you + called.",alt:[["Have you called her yet?","нейтрально"],["You still haven't called her?","удивление"]]},
  {type:"focus",s:"He {isn't} at home.",f:"a:Isn't|s:he|o:at home",ru:"Его что, нет дома?",acc:[],hint:"Isn't + he + at home.",alt:[["Is he out?","разговорно"],["Where is he?","специальный вопрос"]]},
  {type:"choose",q:"Why ___ we take a taxi?",opts:["don't","aren't","isn't","doesn't"],ans:0,f:"q:Why|a:don't|s:we|v:take|o:a taxi",ru:"Почему бы нам не взять такси?",cat:"neg_form",hint:"Why don't we…? — предложение.",why:{1:"take — глагол, be не подходит.",3:"we → don't."},alt:[["Let's take a taxi.","предложение"],["Shall we get a taxi?","через shall"]]},
  {type:"tr",ru:"Ты разве не знаешь?",f:"a:Don't|s:you|v:know",acc:[],hint:"Don't + you + know.",alt:[["Haven't you heard?","Present Perfect"],["You don't know?","прямой порядок"]]},
  {type:"fix",wrong:"Don't you can drive?",f:"a:Can't|s:you|v:drive",ru:"Ты что, не умеешь водить?",acc:[],hint:"Модальный can сам несёт отрицание: Can't you…?",alt:[["Can you not drive?","формальнее"],["Don't you have a licence?","через have"]]},
  {type:"build",f:"a:Wasn't|s:it|o:amazing",ru:"Правда же было потрясающе?",extra:["didn't","weren't"],hint:"Wasn't + it + amazing — ждём согласия.",alt:[["That was amazing, wasn't it?","разделительный"],["How amazing was that?!","восклицание"]]},
  {type:"choose",q:"Haven't you finished yet? — (Ещё нет.) ___",opts:["No, I haven't.","Yes, I haven't.","No, I have.","Yes, I have."],ans:0,f:"o:No,|s:I|a:haven't",end:".",ru:"Ты ещё не закончил? — Нет.",cat:"neg_answer",hint:"По факту: не закончил → No, I haven't.",why:{1:"Yes + haven't — противоречие.",3:"Yes, I have = «закончил»."},alt:[["No, not yet.","коротко"],["Almost!","разговорно"]]},
  {type:"answer",reply:"No, I don't. I'm too tired.",about:"Удивись: спроси, разве он не хочет пойти (you, want to come).",f:"a:Don't|s:you|v:want|o:to come",ru:"Ты разве не хочешь пойти?",acc:["Don't you want to go"],hint:"Don't + you + want + to come.",alt:[["Are you sure you don't want to come?","уговаривая"],["You don't want to come?","прямой порядок"]]},
  {type:"focus",s:"She {doesn't eat} meat.",f:"a:Doesn't|s:she|v:eat|o:meat",ru:"Она разве не ест мясо?",acc:[],hint:"Doesn't + she + eat.",alt:[["Is she vegetarian?","через be"],["She doesn't eat meat?","прямой порядок"]]},
  {type:"tr",ru:"Почему ты не спишь?",f:"q:Why|a:aren't|s:you|v:sleeping",acc:["Why aren't you asleep","Why are you still awake","Why aren't you in bed"],hint:"Сейчас → Why + aren't + you + sleeping (или asleep).",alt:[["Why are you still up?","разговорно"],["Can't you sleep?","через can"]]},
  {type:"choose",q:"___ I right?",opts:["Aren't","Amn't","Am not","Isn't"],ans:0,f:"a:Aren't|s:I|o:right",ru:"Разве я не прав?",cat:"neg_form",hint:"Для I в отрицательном вопросе — Aren't I…? (Amn't не существует).",why:{1:"Amn't — такой формы нет.",2:"Am not I — неверный порядок. Можно Am I not right? — официально.",3:"I → не is."},alt:[["Am I not right?","формально"],["I'm right, aren't I?","разделительный"]]},
  {type:"fix",wrong:"Why didn't you went?",f:"q:Why|a:didn't|s:you|v:go",ru:"Почему ты не пошёл?",acc:[],hint:"После didn't — go.",alt:[["Why did you stay at home?","через stay"],["What stopped you?","к подлежащему"]]},
  {type:"build",f:"a:Shouldn't|s:we|v:ask|o:first",ru:"Может, нам сначала спросить?",extra:["don't","not"],hint:"Shouldn't we…? — мягкий совет «а не стоит ли…».",alt:[["Maybe we should ask first.","утверждение"],["Do you think we should ask first?","нейтрально"]]},
  {type:"choose",q:"Isn't it too late? — (Не поздно.) ___",opts:["No, it isn't.","Yes, it isn't.","No, it is.","Yes, it is."],ans:0,f:"o:No,|s:it|a:isn't",end:".",ru:"Разве не слишком поздно? — Нет.",cat:"neg_answer",hint:"По факту: не поздно → No, it isn't.",why:{1:"Yes + isn't — противоречие.",3:"Yes, it is = «да, поздно»."},alt:[["No, it's fine.","разговорно"],["Not at all.","нейтрально"]]},
  {type:"answer",reply:"Yes, I can. I just don't want to.",about:"Удивись: спроси, разве он не может прийти (you, come).",f:"a:Can't|s:you|v:come",ru:"Ты разве не можешь прийти?",acc:[],hint:"Can't + you + come.",alt:[["Are you sure you can't come?","уговаривая"],["You can't come?","прямой порядок"]]},
  {type:"tr",ru:"Разве у тебя нет машины?",f:"a:Don't|s:you|v:have|o:a car",acc:["Haven't you got a car"],hint:"Don't + you + have + a car (брит. Haven't you got a car?).",alt:[["Haven't you got a car?","брит."],["You don't have a car?","прямой порядок"]]},
  {type:"fix",wrong:"Why you aren't ready?",f:"q:Why|a:aren't|s:you|o:ready",ru:"Почему ты не готов?",acc:[],hint:"aren't — перед you.",alt:[["Aren't you ready yet?","отрицательный общий"],["What's taking so long?","разговорно"]]},
  {type:"focus",s:"They {weren't} invited.",f:"a:Weren't|s:they|v:invited",ru:"Их что, не пригласили?",acc:[],hint:"Weren't + they + invited.",alt:[["Why weren't they invited?","специальный"],["Didn't anyone invite them?","к подлежащему"]]},
  {type:"choose",q:"___ you hear the news?",opts:["Didn't","Wasn't","Weren't","Don't"],ans:0,f:"a:Didn't|s:you|v:hear|o:the news",ru:"Ты разве не слышал новость?",cat:"neg_form",hint:"hear — глагол, прошлое → Didn't.",why:{1:"hear — глагол, be не подходит.",2:"hear — глагол, be не подходит."},alt:[["Haven't you heard?","Present Perfect"],["Have you heard the news?","нейтрально"]]},
  {type:"build",f:"q:Why|a:isn't|s:it|v:working",ru:"Почему это не работает?",extra:["doesn't","not"],hint:"Сейчас → Why + isn't + it + working.",alt:[["Why doesn't it work?","вообще"],["What's wrong with it?","разговорно"]]},
  {type:"tr",ru:"Разве ты не должен быть на работе?",f:"a:Shouldn't|s:you|v:be|o:at work",acc:["Aren't you supposed to be at work"],hint:"Shouldn't + you + be + at work.",alt:[["Aren't you supposed to be at work?","разговорно"],["Don't you have work today?","через have"]]},
  {type:"answer",reply:"No, it isn't. It's quite cheap.",about:"Спроси с удивлением, разве это не дорого (expensive).",f:"a:Isn't|s:it|o:expensive",ru:"Разве это не дорого?",acc:["Isn't it too expensive"],hint:"Isn't + it + expensive.",alt:[["Is it expensive?","нейтрально"],["Doesn't it cost a lot?","через cost"]]},
  {type:"fix",wrong:"Doesn't they live here?",f:"a:Don't|s:they|v:live|o:here",ru:"Разве они здесь не живут?",acc:[],hint:"they → don't.",alt:[["Do they still live here?","нейтрально"],["Have they moved?","Present Perfect"]]}
  ]
};
