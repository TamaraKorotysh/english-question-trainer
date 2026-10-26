/* Module 3 — did: Past Simple */
CONTENT.m3 = {
  title: "Did: Past Simple",
  idea: "В прошлом вперёд выходит помощник did — один для всех. Он забирает прошлое у глагола, и тот возвращается в начальную форму.",
  catSec: {order:"formula",aux_missing:"why",do_form:"when",verb_past:"forms",verb_s:"forms",do_be:"bedo",be_verb:"bedo",be_form:"bedo",wh:"wh",short:"short",article:"errors",other:"formula"},
  tips: {aux_missing:"Обычный глагол в прошлом тоже не прыгает. Вперёд выходит did: Where did you go?",
    order:"Формула: (вопрос. слово) → did → подлежащее → глагол в начальной форме."},
  check: [
    {q:"___ you see the match yesterday?",opts:["Did","Were","Do"],ans:0,hint:"yesterday → прошлое, see — глагол → Did."},
    {q:"Did she ___ the letter?",opts:["write","wrote","written"],ans:0,hint:"После did — начальная форма: write."},
    {q:"Как правильно?",opts:["Where did you go?","Where you went?","Where did you went?"],ans:0,hint:"Did показывает прошлое, поэтому глагол — go, без изменений."}
  ],
  demos: [
    {name:"Да / нет", frames:[
      {t:[["she","She","s"],["went","went","v"],["paris","to Paris","o"],["p",".","p"]], c:"Утверждение в прошлом: <b>went</b> — вторая форма глагола go."},
      {t:[["did","Did","a"],["she","she","s"],["went","went","v"],["paris","to Paris","o"],["p","?","p"]], c:"Зовём помощника <b>did</b> — он один для всех лиц — и ставим перед подлежащим."},
      {t:[["did","Did","a"],["she","she","s"],["went","go","v"],["paris","to Paris","o"],["p","?","p"]], c:"Прошлое теперь показывает did, поэтому глагол возвращается в начальную форму: went → <b>go</b>. <i>Did she go to Paris?</i>"}]},
    {name:"С вопросительным словом", frames:[
      {t:[["they","They","s"],["bought","bought","v"],["car","a car","o"],["p",".","p"]], c:"Хотим спросить, <b>что</b> они купили."},
      {t:[["wh","What","q"],["they","they","s"],["bought","bought","v"],["p","?","p"]], c:"a car → <b>What</b>, в начало. <i>What they bought?</i> — ещё не вопрос."},
      {t:[["wh","What","q"],["did","did","a"],["they","they","s"],["bought","buy","v"],["p","?","p"]], c:"Добавляем <b>did</b>, а bought → <b>buy</b>: <i>What did they buy?</i>"}]},
    {name:"Из настоящего в прошлое", frames:[
      {t:[["wh","Where","q"],["do","do","a"],["you","you","s"],["work","work","v"],["p","?","p"]], c:"Вопрос в настоящем, который ты уже умеешь строить (модуль 2)."},
      {t:[["wh","Where","q"],["do","did","a"],["you","you","s"],["work","work","v"],["p","?","p"]], c:"Меняем одно слово: do → <b>did</b>. Всё остальное на месте: <i>Where did you work?</i>"}]},
    {name:"Ловушка: was или did", frames:[
      {t:[["you","You","s"],["were","were","a"],["tired","tired","o"],["p",".","p"]], c:"Здесь нет глагола-действия: tired — состояние."},
      {t:[["did","Did","a","bad"],["you","you","s"],["were","were","a"],["tired","tired","o"],["p","?","p"]], c:"<i>Did you were tired?</i> — ошибка. Did и was / were не встречаются."},
      {t:[["were","Were","a"],["you","you","s"],["tired","tired","o"],["p","?","p"]], c:"Без глагола работает be, как в модуле 1: <i>Were you tired?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Did — машина времени",body:`
      <p>В прошлом обычные глаголы тоже не умеют прыгать вперёд. Поэтому снова нужен помощник — <b>did</b>. Это прошедшая форма do.</p>
      <p>Хорошая новость: did <b>один для всех</b>. Не нужно выбирать между do и does: <span class="mono">Did I / you / he / she / they…?</span></p>
      <p>Вторая хорошая новость: did забирает прошлое на себя, и глагол возвращается в начальную форму. В вопросах <b>не нужно помнить вторую форму неправильных глаголов</b>: <span class="mono">went, saw, bought</span> превращаются в <span class="mono">go, see, buy</span>.</p>`},
    {id:"formula",title:"Формула и порядок действий",body:`
      <p class="muted">Вопрос «да / нет»</p>
      <div class="formula">${slot("a","Did","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","see","начальная форма")}${PLUS}${slot("o","the film","остальное")}<span class="plus">?</span></div>
      <p class="muted">Вопрос с вопросительным словом</p>
      <div class="formula">${slot("q","Where","вопрос. слово")}${PLUS}${slot("a","did","помощник")}${PLUS}${slot("s","she","подлежащее")}${PLUS}${slot("v","go","начальная форма")}<span class="plus">?</span></div>
      <ol class="steps">
        <li>Утверждение: <span class="mono">She <b>went</b> to Paris.</span></li>
        <li>Поставь <b>did</b> перед подлежащим.</li>
        <li>Верни глагол в начальную форму: went → <b>go</b>. <span class="mono">Did she go to Paris?</span></li>
        <li>Вопросительное слово — в начало: <span class="mono">Where did she go?</span></li></ol>`},
    {id:"forms",title:"Одно прошлое на вопрос",body:`
      <p>Как в модуле 2 буква s была одна на вопрос, так и прошлое показывается <b>один раз</b> — словом did. Глагол остаётся «голым».</p>
      ${rows(["В утверждении","В вопросе после did"],[
        ["worked, played, studied","work, play, study"],["went, saw, came","go, see, come"],
        ["bought, brought, thought","buy, bring, think"],["had, did, made","have, do, make"],
        ["said, told, took","say, tell, take"],["got, met, left","get, meet, leave"]])}
      <div class="note">Проверка: если в вопросе есть did, а глагол в нём — вторая форма (<span class="mono">went, saw, -ed</span>), это ошибка.</div>`},
    {id:"when",title:"Когда нужен Past Simple",body:`
      <p>Действие закончилось в прошлом, и понятно когда. Слова-маркеры: <span class="mono">yesterday, last night / week / year, two days ago, in 2019, when you were a child, this morning</span> (если утро прошло).</p>
      ${rows(["Что спрашиваем","Пример"],[
        ["Что произошло",ex("What did you do yesterday?")],["Когда",ex("When did you arrive?")+" "+ex("How long ago did you move?")],
        ["Как прошло",ex("Did you have a good time?")],["Мнение о прошедшем",ex("What did you think of the film?")],
        ["Детство, прошлые привычки",ex("Did you use to play football?")]])}
      <p>Сравни время помощника: <span class="mono">Where <b>do</b> you work?</span> — сейчас. <span class="mono">Where <b>did</b> you work?</span> — раньше.</p>`},
    {id:"bedo",title:"Was / were или did",body:`
      <p>Тот же выбор, что в модуле 2, только в прошлом. <b>Есть глагол-действие — did. Нет — was / were.</b></p>
      <div class="cols">
        <div class="col"><h3>Нет глагола → was / were</h3><div class="pairs">
          <span>на вечеринке</span>${ex("Were you at the party?")}<span>дорого</span>${ex("Was it expensive?")}
          <span>опоздал</span>${ex("Was he late?")}<span>устал</span>${ex("Were you tired?")}</div></div>
        <div class="col"><h3>Есть глагол → did</h3><div class="pairs">
          <span>ходил</span>${ex("Did you go to the party?")}<span>стоило</span>${ex("Did it cost a lot?")}
          <span>пришёл поздно</span>${ex("Did he come late?")}<span>спал</span>${ex("Did you sleep?")}</div></div>
      </div>
      <div class="note">Исключение, которое ломает интуицию: «родиться» — <b>be born</b>. Поэтому <span class="mono">Where were you born?</span>, а не ${strike("Where did you born?")}</div>`},
    {id:"special",title:"Have, do и use to в прошлом",body:`
      <p><b>Have</b> — обычный глагол: ${ex("Did you have a good time?")} Не ${strike("Had you a good time?")}</p>
      <p><b>Do</b> бывает дважды — помощник и глагол «делать»: ${ex("What did you do?")}</p>
      <p><b>Have to</b> («пришлось»): ${ex("Did you have to wait long?")}</p>
      <p><b>Used to</b> («раньше, бывало»): в вопросе после did — <b>use</b> без d: ${ex("Did you use to live here?")}</p>
      <p><b>Did you know…?</b> — классическое начало для интересного факта: ${ex("Did you know that octopuses have three hearts?")}</p>`},
    {id:"wh",title:"Вопросительные слова с did",body:`
      ${rows(["Слово","Пример","Перевод"],[
        ["What",ex("What did you do?"),"Что ты делал?"],["Where",ex("Where did you go?"),"Куда ты ездил?"],
        ["When",ex("When did you arrive?"),"Когда ты приехал?"],["What time",ex("What time did you get home?"),"Во сколько пришёл домой?"],
        ["Why",ex("Why did you leave?"),"Почему ты ушёл?"],["How",ex("How did you know?"),"Откуда ты узнал?"],
        ["How long",ex("How long did it take?"),"Сколько времени заняло?"],["How much",ex("How much did it cost?"),"Сколько стоило?"],
        ["Who",ex("Who did you meet?"),"Кого ты встретил?"],["Which",ex("Which one did you choose?"),"Какой ты выбрал?"]])}
      <div class="note">Внимание: <span class="mono">Who did you call?</span> — кому ты звонил. <span class="mono">Who called you?</span> — кто тебе звонил: тут did не нужен. Это вопрос к подлежащему, он в модуле 8.</div>`},
    {id:"short",title:"Краткие ответы",body:`
      ${rows(["Вопрос","Да","Нет"],[
        [ex("Did you lock the door?"),mn("Yes, I did."),mn("No, I didn't.")],
        [ex("Did she pass?"),mn("Yes, she did."),mn("No, she didn't.")],
        [ex("Did they like it?"),mn("Yes, they did."),mn("No, they didn't.")]])}
      <p>Отвечаем помощником did, глагол не повторяем: ${strike("Yes, I locked.")}</p>`},
    {id:"sound",title:"Как это звучит",body:`
      <p><span class="mono">Did you</span> в быстрой речи сливается в «диджу»: ${ex("Did you eat?")}</p>
      <p><span class="mono">What did you</span> — почти «вадиджу»: ${ex("What did you do?")}</p>
      <p>Интонация прежняя: «да / нет» — вверх ↗, с вопросительным словом — вниз ↘.</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Did — машина времени","Did забирает прошлое на себя. Глагол возвращается в настоящее — в начальную форму.",["Did you go?"]],
      ["mem","Одно прошлое на вопрос","Прошлое показывается один раз. Did + went — это два прошлых, так нельзя.",[]],
      ["mem","Did — один для всех","Нет ни «dids», ни отдельной формы для he / she. Did I, did you, did she, did they.",[]],
      ["mem","Отвечай помощником","Did you…? → Yes, I did. Глагол второй раз не нужен.",["Did you like it? Yes, I did."]],
      ["obs","Вторая форма в вопросе не нужна","Неправильные глаголы в вопросах можно не вспоминать: Did you buy, did you see, did you go. Половина таблицы неправильных глаголов здесь просто не нужна.",[]],
      ["obs","Did you know…?","Так начинают интересный факт: «Did you know that…?» Это не вопрос о знаниях, а «а ты знал, что…»",["Did you know that?"]],
      ["obs","Small talk в понедельник","Коллеги спрашивают: «How was your weekend?», «Did you do anything nice?», «What did you get up to?» Ответа ждут короткого.",["What did you get up to?"]],
      ["obs","Was и did не дружат","Даже в прошлом be обходится без помощника: Were you…? Was it…? Did с ними — всегда ошибка.",[]],
      ["hack","Строй через настоящее","Сначала составь вопрос в настоящем: Where do you go? Потом поменяй do / does → did. Больше ничего менять не нужно.",["Where did you go?"]],
      ["hack","Мнение о прошедшем","What did you think of…? — «как тебе (было)…?» Подходит для фильма, поездки, ресторана.",["What did you think of the film?"]],
      ["hack","How long ago…?","Вместо When можно спросить «как давно»: How long ago did you move here?",["How long ago did you move here?"]],
      ["hack","Проверь через ответ","Подставь ответ: «Yes, I did» — значит, did. «Yes, I was» — значит, was / were.",[]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Did you went?","Did you go?","Одно прошлое на вопрос."],["Where you went?","Where did you go?","Нужен помощник did."],
      ["Did she saw it?","Did she see it?","После did — начальная форма."],["What did you did?","What did you do?","Второй do — глагол в начальной форме."],
      ["Did you were at home?","Were you at home?","С was / were did не нужен."],["Was you like it?","Did you like it?","like — глагол → did."],
      ["Where did you born?","Where were you born?","born — с was / were."],["Had you a good time?","Did you have a good time?","have — обычный глагол."],
      ["Yes, I went.","Yes, I did.","Краткий ответ — помощником."],["What did happen?","What happened?","Вопрос к подлежащему — без did (модуль 8)."],
      ["Did you used to…?","Did you use to…?","После did — use, без d."],["Why you didn't come?","Why didn't you come?","didn't — перед подлежащим."]])}
    ];
  },
  tasks: [
  {type:"build",f:"a:Did|s:you|v:sleep|o:well",ru:"Ты хорошо спал?",extra:["slept","were"],hint:"Прошлое показывает Did, глагол — в начальной форме: sleep (не slept).",alt:[["How did you sleep?","нейтрально"],["Did you get enough sleep?","«выспался?»"],["Sleep well?","коротко, разговорно"]]},
  {type:"build",f:"a:Did|s:she|v:call|o:you",ru:"Она тебе звонила?",extra:["called","does"],hint:"Did + she + call — без -ed.",alt:[["Has she called you?","Present Perfect: результат важен сейчас (модуль 7)"],["Did she ring you?","брит."],["Did you hear from her?","«она давала о себе знать?»"]]},
  {type:"choose",q:"___ you go out last night?",opts:["Did","Were","Do","Was"],ans:0,f:"a:Did|s:you|v:go out|t:last night",ru:"Ты куда-нибудь выходил вчера вечером?",cat:"do_form",hint:"last night → прошлое, go out — глагол → Did.",why:{1:"Were — для вопросов без глагола. Здесь есть глагол go out → did.",2:"Do — настоящее. last night — прошлое → did."},alt:[["Did you go anywhere last night?","нейтрально"],["What did you do last night?","специальный вопрос"]]},
  {type:"choose",q:"Did they ___ the train?",opts:["catch","caught","catches","catching"],ans:0,f:"a:Did|s:they|v:catch|o:the train",ru:"Они успели на поезд?",cat:"verb_past",hint:"После did — начальная форма: catch.",why:{1:"caught — прошедшая форма. Прошлое уже показал did."},alt:[["Did they make the train?","разговорно: «успели»"],["Did they get the train in time?","брит."]]},
  {type:"tr",ru:"Что ты делал вчера?",f:"q:What|a:did|s:you|v:do|t:yesterday",acc:["What were you doing yesterday"],hint:"What + did + you + do. Второй do — глагол «делать».",alt:[["What did you get up to yesterday?","разговорно"],["How did you spend yesterday?","«как провёл?»"]]},
  {type:"fix",wrong:"Did you went to the party?",f:"a:Did|s:you|v:go|o:to the party",ru:"Ты ходил на вечеринку?",acc:[],hint:"После did — go, а не went.",alt:[["Were you at the party?","через be"],["Did you make it to the party?","«ты добрался?»"]]},
  {type:"focus",s:"She arrived {at midnight}.",f:"q:When|a:did|s:she|v:arrive",ru:"Когда она приехала?",acc:["What time did she arrive","What time did she get here"],hint:"Время → When / What time. arrived → did + arrive.",alt:[["What time did she get in?","разговорно"],["How late did she arrive?","«насколько поздно»"]]},
  {type:"answer",reply:"I bought a new jacket.",about:"Спроси, что он купил (you).",f:"q:What|a:did|s:you|v:buy",ru:"Что ты купил?",acc:["What did you get"],hint:"bought → did + buy.",alt:[["What did you get?","разговорно: get = купить"],["What did you pick up?","разговорно: «что прихватил»"]]},
  {type:"build",f:"q:Where|a:did|s:you|v:meet|o:your wife",ru:"Где ты познакомился с женой?",extra:["met","were"],hint:"met → did + meet.",alt:[["How did you two meet?","разговорно"],["Where did you and your wife meet?","нейтрально"]]},
  {type:"choose",q:"Did you lock the door? — Yes, I ___.",opts:["did","locked","was","do"],ans:0,f:"o:Yes,|s:I|a:did",end:".",ru:"Ты запер дверь? — Да.",cat:"short",hint:"Спросили с did → отвечаем did.",why:{1:"Yes, I locked — так кратко не отвечают. Повторяем помощник.",2:"was — ответ на вопрос с be."},alt:[["Yes, I did.","нейтрально"],["Yes, I'm sure I did.","с уверенностью"]]},
  {type:"tr",ru:"Почему ты ушёл?",f:"q:Why|a:did|s:you|v:leave",acc:["Why did you go"],hint:"Ушёл = left → did + leave.",alt:[["What made you leave?","мягче"],["How come you left?","разговорно, порядок прямой"]]},
  {type:"fix",wrong:"What did you did at the weekend?",f:"q:What|a:did|s:you|v:do|o:at the weekend",ru:"Что ты делал на выходных?",acc:["What did you do on the weekend"],hint:"После did — do (начальная форма), а не did.",alt:[["What did you get up to at the weekend?","разговорно"],["How was your weekend?","через be"],["Did you do anything nice at the weekend?","общий вопрос"]]},
  {type:"focus",s:"We stayed {at a hotel}.",f:"q:Where|a:did|s:you|v:stay",ru:"Где вы останавливались?",acc:[],hint:"Место → Where. We → you, stayed → stay.",alt:[["What hotel did you stay at?","уточнение, предлог в конце"],["Where were you staying?","Past Continuous"]]},
  {type:"build",f:"q:How much|a:did|s:it|v:cost",ru:"Сколько это стоило?",extra:["was","costed"],hint:"Did + it + cost. Cost — неправильный глагол, «costed» не бывает.",alt:[["How much was it?","через be"],["What did you pay for it?","«сколько ты заплатил?»"]]},
  {type:"choose",q:"What time ___ you get home?",opts:["did","were","do","was"],ans:0,f:"q:What time|a:did|s:you|v:get|o:home",ru:"Во сколько ты пришёл домой?",cat:"do_form",hint:"get home — глагол, прошлое → did.",alt:[["When did you get back?","нейтрально"],["How late did you get home?","«насколько поздно»"]]},
  {type:"choose",q:"___ you tired after the trip?",opts:["Were","Did","Was","Do"],ans:0,f:"a:Were|s:you|o:tired|t:after the trip",ru:"Ты устал после поездки?",cat:"do_be",hint:"tired — не глагол, а состояние → were.",why:{1:"Did нужен только с глаголом. Tired — прилагательное → Were you tired?",2:"you всегда с were."},alt:[["Did the trip tire you out?","через глагол tire — тогда did"],["Were you exhausted after the trip?","сильнее"]]},
  {type:"answer",reply:"No, I didn't. I was too busy.",about:"Спроси, смотрел ли он матч (you).",f:"a:Did|s:you|v:watch|o:the match",ru:"Ты смотрел матч?",acc:["Did you see the match","Did you watch the game","Did you see the game"],hint:"«I didn't» → вопрос с did: Did you watch…?",alt:[["Did you catch the match?","разговорно"],["Did you see the game last night?","амер."]]},
  {type:"tr",ru:"Тебе понравился фильм?",f:"a:Did|s:you|v:like|o:the film",acc:["Did you like the movie","Did you enjoy the film","Did you enjoy the movie"],hint:"Прошлое + глагол like → Did you like…?",alt:[["Did you enjoy the film?","нейтрально"],["What did you think of the film?","«как тебе фильм?»"],["How was the film?","через be"]]},
  {type:"build",f:"q:Why|a:did|s:you|v:change|o:your mind",ru:"Почему ты передумал?",extra:["changed","were"],hint:"Передумать = change your mind. did + change.",alt:[["What changed your mind?","вопрос к подлежащему (модуль 8)"],["What made you change your mind?","мягче"]]},
  {type:"fix",wrong:"Where you went on holiday?",f:"q:Where|a:did|s:you|v:go|o:on holiday",ru:"Куда ты ездил в отпуск?",acc:["Where did you go on vacation"],hint:"Нужен did, а went → go.",alt:[["Where did you go for your holiday?","брит."],["Where did you go on vacation?","амер."]]},
  {type:"choose",q:"How ___ you know about it?",opts:["did","were","was","do"],ans:0,f:"q:How|a:did|s:you|v:know|o:about it",ru:"Откуда ты узнал об этом?",cat:"do_form",hint:"know — глагол, прошлое → did.",alt:[["Who told you?","вопрос к подлежащему (модуль 8)"],["How did you find out?","«как ты узнал»"]]},
  {type:"focus",s:"He left {two hours ago}.",f:"q:When|a:did|s:he|v:leave",ru:"Когда он ушёл?",acc:["How long ago did he leave","What time did he leave"],hint:"When + did + he + leave.",alt:[["How long ago did he leave?","«как давно»"],["What time did he go?","разговорно"]]},
  {type:"build",f:"a:Did|s:you|v:have|o:a good time",ru:"Ты хорошо провёл время?",extra:["had","were"],hint:"had → did + have. Не «Had you…».",alt:[["Did you enjoy yourself?","нейтрально"],["Was it fun?","через be"],["How was it?","коротко"]]},
  {type:"tr",ru:"Когда ты переехал сюда?",f:"q:When|a:did|s:you|v:move|t:here",acc:["How long ago did you move here"],hint:"When + did + you + move here.",alt:[["How long ago did you move here?","«как давно»"],["How long have you lived here?","Present Perfect (модуль 7)"]]},
  {type:"choose",q:"Did she pass the exam? — No, she ___.",opts:["didn't","doesn't","wasn't","not"],ans:0,f:"o:No,|s:she|a:didn't",end:".",ru:"Она сдала экзамен? — Нет.",cat:"short",hint:"did → didn't. Для всех лиц одинаково.",why:{1:"doesn't — настоящее. Вопрос в прошлом → didn't.",2:"wasn't — ответ на вопрос с be."},alt:[["No, she didn't.","нейтрально"],["No, she failed it.","полнее"],["Unfortunately not.","мягко"]]},
  {type:"answer",reply:"We went to the mountains.",about:"Спроси, куда они ездили (you).",f:"q:Where|a:did|s:you|v:go",ru:"Куда вы ездили?",acc:["Where did you travel","Where did you go on holiday"],hint:"went → did + go.",alt:[["Where did you go on holiday?","брит."],["Where did you end up going?","разговорно: «куда в итоге»"]]},
  {type:"fix",wrong:"Did you were at home yesterday?",f:"a:Were|s:you|o:at home|t:yesterday",ru:"Ты был дома вчера?",acc:["Were you home yesterday"],hint:"Без глагола — значит, be. Did с was / were не используется.",alt:[["Did you stay at home yesterday?","через stay — тогда did"],["Were you in yesterday?","брит., разговорно"]]},
  {type:"build",f:"q:What|a:did|s:he|v:say",ru:"Что он сказал?",extra:["said","does"],hint:"said → did + say.",alt:[["What did he tell you?","tell + кому"],["What was his answer?","через be"]]},
  {type:"focus",s:"They had {pizza} for dinner.",f:"q:What|a:did|s:they|v:have|o:for dinner",ru:"Что они ели на ужин?",acc:["What did they eat for dinner","What did they have"],hint:"had → did + have. Did they have, а не Had they.",alt:[["What did they eat?","проще"],["What was for dinner?","через be"]]},
  {type:"choose",q:"Did you ___ your keys?",opts:["find","found","finded","finding"],ans:0,f:"a:Did|s:you|v:find|o:your keys",ru:"Ты нашёл ключи?",cat:"verb_past",hint:"После did — find.",why:{1:"found — прошедшая форма, а прошлое уже есть в did.",2:"finded — такой формы нет: find — неправильный глагол."},alt:[["Have you found your keys?","Present Perfect: результат сейчас"],["Any luck with your keys?","разговорно"]]},
  {type:"tr",ru:"Как прошли выходные?",f:"q:How|a:was|s:your weekend",acc:["How did your weekend go","How did the weekend go","How was the weekend"],hint:"Без глагола → was: How was your weekend? Или с глаголом go: How did your weekend go?",alt:[["Did you have a good weekend?","общий вопрос"],["What did you get up to at the weekend?","разговорно"]]},
  {type:"fix",wrong:"Did she saw you?",f:"a:Did|s:she|v:see|o:you",ru:"Она тебя видела?",acc:[],hint:"После did — see.",alt:[["Did she notice you?","«заметила»"],["Did she spot you?","разговорно"]]},
  {type:"build",f:"q:How long|a:did|s:it|v:take",ru:"Сколько времени это заняло?",extra:["took","was"],hint:"took → did + take.",alt:[["How long was the journey?","про дорогу, через be"],["How much time did it take?","нейтрально"]]},
  {type:"choose",q:"Where ___ you born?",opts:["were","did","was","are"],ans:0,f:"q:Where|a:were|s:you|v:born",ru:"Где ты родился?",cat:"do_be",hint:"Born — исключение: «быть рождённым» → were, а не did.",why:{1:"«Did you born» — частая ошибка. Born работает с was / were.",2:"you всегда с were."},alt:[["Where are you from originally?","разговорно"],["What's your place of birth?","официально"]]},
  {type:"answer",reply:"I met her at university.",about:"Спроси, где он с ней познакомился (you, her).",f:"q:Where|a:did|s:you|v:meet|o:her",ru:"Где ты с ней познакомился?",acc:["How did you meet her","Where did you two meet","Where did you first meet her"],hint:"met → did + meet.",alt:[["How did you two meet?","разговорно"],["Where did you first meet her?","first — «впервые»"]]},
  {type:"focus",s:"She cried {because the film was sad}.",f:"q:Why|a:did|s:she|v:cry",ru:"Почему она плакала?",acc:[],hint:"cried → did + cry.",alt:[["What made her cry?","вопрос к подлежащему"],["Why was she crying?","Past Continuous"]]},
  {type:"tr",ru:"Ты закончил отчёт?",f:"a:Did|s:you|v:finish|o:the report",acc:["Have you finished the report"],hint:"finished → did + finish. Можно и Have you finished — это модуль 7.",alt:[["Have you finished the report?","Present Perfect: результат важен сейчас"],["Is the report done?","через be, разговорно"]]},
  {type:"choose",q:"What ___ you think of the hotel?",opts:["did","were","was","do"],ans:0,f:"q:What|a:did|s:you|v:think|o:of the hotel",ru:"Как тебе понравился отель? (поездка закончилась)",cat:"do_form",hint:"think — глагол, поездка в прошлом → did.",why:{3:"do — если ты всё ещё там. Поездка закончилась → did."},alt:[["How was the hotel?","через be"],["Did you like the hotel?","общий вопрос"]]},
  {type:"fix",wrong:"Had you a good holiday?",f:"a:Did|s:you|v:have|o:a good holiday",ru:"Ты хорошо отдохнул?",acc:[],hint:"have — обычный глагол → Did you have…?",alt:[["How was your holiday?","через be"],["Did you enjoy your holiday?","нейтрально"]]},
  {type:"build",f:"q:When|a:did|s:the film|v:start",ru:"Когда начался фильм?",extra:["started","was"],hint:"started → did + start.",alt:[["What time did the film start?","точнее"],["When did the movie begin?","амер."]]},
  {type:"choose",q:"Did your parents like it? — Yes, they ___.",opts:["did","liked","were","do"],ans:0,f:"o:Yes,|s:they|a:did",end:".",ru:"Твоим родителям понравилось? — Да.",cat:"short",hint:"Помощник did — для всех: they did.",why:{1:"Глагол в кратком ответе не повторяют: Yes, they did.",3:"do — настоящее. Спрашивали в прошлом."},alt:[["Yes, they did.","нейтрально"],["They loved it!","эмоционально"]]},
  {type:"answer",reply:"It took about three hours.",about:"Спроси, сколько времени заняла дорога (it).",f:"q:How long|a:did|s:it|v:take",ru:"Сколько времени это заняло?",acc:["How long did the journey take","How long did the trip take"],hint:"took → did + take.",alt:[["How long was the journey?","через be"],["How long did it take to get there?","уточнение"]]},
  {type:"tr",ru:"Кого ты встретил на вечеринке?",f:"q:Who|a:did|s:you|v:meet|o:at the party",acc:["Who did you see at the party","Whom did you meet at the party"],hint:"Ты встретил кого? Who + did + you + meet. Did нужен, потому что подлежащее — you.",alt:[["Who did you bump into at the party?","разговорно: «случайно встретил»"],["Who was at the party?","вопрос к подлежащему, через be"]]},
  {type:"fix",wrong:"Why you didn't call me?",f:"q:Why|a:didn't|s:you|v:call|o:me",ru:"Почему ты мне не позвонил?",acc:["Why did you not call me"],hint:"didn't стоит перед подлежащим, как и did.",alt:[["How come you didn't call me?","разговорно, порядок прямой"],["Why didn't you ring me?","брит."]]},
  {type:"focus",s:"I lost {my wallet}.",f:"q:What|a:did|s:you|v:lose",ru:"Что ты потерял?",acc:[],hint:"lost → did + lose. I → you.",alt:[["What have you lost?","Present Perfect: ищешь сейчас"],["What's missing?","разговорно"]]},
  {type:"choose",q:"Did you ___ to live here?",opts:["use","used","uses","using"],ans:0,f:"a:Did|s:you|v:use to|o:live here",ru:"Ты раньше здесь жил?",cat:"verb_past",hint:"used to → Did you use to…? После did — use, без d.",why:{1:"used — прошедшая форма. После did → use to."},alt:[["Did you live here before?","проще"],["Have you lived here before?","Present Perfect"]]},
  {type:"build",f:"q:Who|a:did|s:you|v:go|o:with",ru:"С кем ты ходил?",extra:["went","were"],hint:"went → did + go. Предлог with — в конце (модуль 9).",alt:[["Who went with you?","вопрос к подлежащему (модуль 8)"],["Did you go alone?","общий вопрос"]]},
  {type:"tr",ru:"Сколько ты заплатил?",f:"q:How much|a:did|s:you|v:pay",acc:["How much did you pay for it"],hint:"paid → did + pay.",alt:[["What did you pay for it?","нейтрально"],["How much did it set you back?","разговорно, шутливо"]]},
  {type:"answer",reply:"Yes, I did! It was amazing.",about:"Спроси, понравился ли ему концерт (you, enjoy).",f:"a:Did|s:you|v:enjoy|o:the concert",ru:"Тебе понравился концерт?",acc:["Did you like the concert"],hint:"«I did» → Did you enjoy…?",alt:[["How was the concert?","через be"],["Was the concert good?","через be"]]},
  {type:"fix",wrong:"When did you arrived?",f:"q:When|a:did|s:you|v:arrive",ru:"Когда ты приехал?",acc:[],hint:"После did — arrive, без -ed.",alt:[["When did you get here?","разговорно"],["What time did you get in?","разговорно"]]}
  ]
};
