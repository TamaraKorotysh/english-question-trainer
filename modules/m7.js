/* Module 7 — Continuous, Perfect, Future */
CONTENT.m7 = {
  title: "Continuous, Perfect, Future",
  idea: "У каждого времени свой помощник: be для Continuous, have для Perfect, will или be going to для будущего. Помощник прыгает вперёд, а глагол остаётся как был — с -ing или в третьей форме.",
  catSec: {order:"formula",aux_missing:"formula",cont:"cont",perfect:"ppps",v3:"perfect",do_form:"formula",verb_s:"formula",verb_past:"ppps",be_verb:"cont",do_be:"cont",be_form:"cont",do_modal:"future",modal:"future",modal_to:"future",wh:"formula",short:"short",article:"errors",other:"formula"},
  cats: {cont:["Continuous: be + -ing","Действие в процессе (сейчас или в тот момент) → am / is / are / was / were + глагол с -ing. Do здесь не нужен."],
    perfect:["Perfect или Past Simple","Опыт и результат без точного времени → have / has + третья форма. Точное время (yesterday, when, ago) → did."],
    v3:["Третья форма после have","После have / has — третья форма: been, seen, done, eaten, gone, finished."]},
  diagnose({u,e,verb,eAux}){
    const vts=verb?norm(verb).split(" "):[];
    const ing=vts.find(w=>w.endsWith("ing")&&w.length>4);
    if(BE.includes(eAux) && ing){
      if(u.some(w=>DO.includes(w)) && !e.some(w=>DO.includes(w))) return {cat:"cont",msg:"Это действие в процессе (Continuous): помощник — форма be, а глагол с -ing. Do здесь не нужен."};
      if(u.includes(eAux) && !u.includes(ing)) return {cat:"cont",msg:`В Continuous после be глагол с окончанием -ing: ${ing}.`};
    }
    if(HAVE.includes(eAux)){
      if(u.includes("did")) return {cat:"perfect",msg:"Здесь Present Perfect: опыт или результат без точного времени. Помощник — have / has, а глагол — в третьей форме."};
      if(e.includes("long") && u.some(w=>DO.includes(w))) return {cat:"perfect",msg:"«Как долго / с каких пор» до сегодняшнего дня → How long + have / has + третья форма. Do здесь не подходит."};
      const v3=vts[0];
      if(v3 && u.some(w=>HAVE.includes(w)) && !u.includes(v3)) return {cat:"v3",msg:`После have / has нужна третья форма глагола: ${v3}.`};
    }
    if(eAux==="did" && u.some(w=>HAVE.includes(w))) return {cat:"perfect",msg:"Есть точное время или вопрос When → Past Simple: did + глагол. Have / has здесь не подходит."};
    return null;
  },
  check: [
    {q:"What ___ you doing now?",opts:["are","do","have"],ans:0,hint:"Сейчас, в процессе → are + doing."},
    {q:"Have you ever ___ to Paris?",opts:["been","went","go"],ans:0,hint:"После have — третья форма: been."},
    {q:"Как правильно?",opts:["How long have you lived here?","How long do you live here?","How long you live here?"],ans:0,hint:"«Как долго» до сегодняшнего дня → have + lived."}
  ],
  demos: [
    {name:"Continuous", frames:[
      {t:[["she","She","s"],["is","is","a"],["working","working","v"],["p",".","p"]], c:"Действие в процессе: <b>is working</b>."},
      {t:[["is","Is","a"],["she","she","s"],["working","working","v"],["p","?","p"]], c:"Прыгает только <b>is</b>. Глагол <b>working</b> остаётся как был — с -ing. Сравни: в модуле 2 глагол терял -s, а здесь ничего не теряет."}]},
    {name:"Perfect", frames:[
      {t:[["you","You","s"],["have","have","a"],["seen","seen","v"],["film","this film","o"],["p",".","p"]], c:"Present Perfect: <b>have + seen</b> (третья форма)."},
      {t:[["have","Have","a"],["you","you","s"],["seen","seen","v"],["film","this film","o"],["p","?","p"]], c:"<b>Have</b> прыгает вперёд, seen остаётся: <i>Have you seen this film?</i>"}]},
    {name:"Going to", frames:[
      {t:[["you","You","s"],["are","are","a"],["going","going to move","v"],["p",".","p"]], c:"План: <b>be going to</b> + глагол."},
      {t:[["are","Are","a"],["you","you","s"],["going","going to move","v"],["p","?","p"]], c:"Прыгает только <b>are</b>: <i>Are you going to move?</i>"}]},
    {name:"Ловушка: How long", frames:[
      {t:[["h","How long","q"],["do","do","a","bad"],["you","you","s"],["live","live","v"],["here","here","o"],["p","?","p"]], c:"«Как долго ты здесь живёшь?» — по-русски настоящее время. Но <i>How long do you live</i> — ошибка."},
      {t:[["h","How long","q"],["do","have","a"],["you","you","s"],["live","lived","v"],["here","here","o"],["p","?","p"]], c:"Ты живёшь здесь <b>с прошлого до сейчас</b> — это Present Perfect: <i>How long have you lived here?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Помощник прыгает, глагол остаётся",body:`
      <p>В этих временах помощник уже есть в утверждении: <span class="mono">She <b>is</b> working. They <b>have</b> left. I <b>am</b> going to move.</span> В вопросе он просто прыгает вперёд — как be в модуле 1.</p>
      <p>Главное отличие от do / did: <b>глагол не меняется</b>. С do / did глагол «раздевался» (works → work, went → go). Здесь working остаётся working, seen остаётся seen.</p>
      ${rows(["Время","Помощник","Глагол","Вопрос"],[
        ["Present Continuous",tA("am / is / are"),"-ing",ex("Are you working?")],["Past Continuous",tA("was / were"),"-ing",ex("What were you doing?")],
        ["Present Perfect",tA("have / has"),"3-я форма",ex("Have you finished?")],["Будущее: план",tA("am / is / are")+" going to","глагол",ex("Are you going to stay?")],
        ["Будущее: решение, прогноз",tA("will"),"глагол",ex("Will it rain?")]])}`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("q","What","вопрос. слово")}${PLUS}${slot("a","are / were","be")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","doing","глагол + ing")}<span class="plus">?</span></div>
      <div class="formula">${slot("a","Have / Has","have")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","seen","3-я форма")}${PLUS}${slot("o","it","остальное")}<span class="plus">?</span></div>
      <div class="formula">${slot("q","What","вопрос. слово")}${PLUS}${slot("a","are","be")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","going to do","going to + глагол")}<span class="plus">?</span></div>`},
    {id:"cont",title:"Continuous: что происходит",body:`
      <p><b>Present Continuous</b> — действие прямо сейчас или временное: ${ex("What are you doing?")} ${ex("Is it raining?")} ${ex("Are you working this week?")}</p>
      <p>А ещё — договорённости на ближайшее будущее: ${ex("What are you doing tonight?")} ${ex("Are you coming to the party?")}</p>
      <p><b>Past Continuous</b> — процесс в какой-то момент в прошлом: ${ex("What were you doing at eight?")} ${ex("Were you sleeping when I called?")}</p>
      <div class="note">Не путай: ${ex("What do you do?")} — кем работаешь (всегда). ${ex("What are you doing?")} — что делаешь сейчас.</div>`},
    {id:"perfect",title:"Present Perfect: опыт и результат",body:`
      <p><b>Опыт</b> за всю жизнь, без точного времени: ${ex("Have you ever been to Japan?")}</p>
      <p><b>Результат</b>, важный сейчас: ${ex("Have you finished?")} ${ex("Has the train left?")}</p>
      <p><b>Длительность</b> с прошлого до сейчас: ${ex("How long have you known her?")}</p>
      <p>Маленькие слова: <b>ever</b> («когда-нибудь») — перед глаголом, <b>yet</b> («уже» в вопросе) — в конце: ${ex("Have you eaten yet?")}</p>
      ${rows(["Глагол","3-я форма"],[["be","been"],["see","seen"],["do","done"],["eat","eaten"],["go","gone / been"],["have","had"],["meet","met"],["buy","bought"],["know","known"],["finish, work, live","finished, worked, lived"]])}`},
    {id:"ppps",title:"Have you…? или Did you…?",body:`
      <div class="cols">
        <div class="col"><h3>Без точного времени → have</h3><div class="pairs">
          <span>опыт</span>${ex("Have you ever been to Rome?")}<span>результат</span>${ex("Have you seen my keys?")}<span>до сейчас</span>${ex("How long have you lived here?")}</div></div>
        <div class="col"><h3>Есть «когда» → did</h3><div class="pairs">
          <span>yesterday</span>${ex("Did you see him yesterday?")}<span>when</span>${ex("When did you go to Rome?")}<span>ago</span>${ex("Did you move two years ago?")}</div></div>
      </div>
      <div class="note">Типичный разговор: сначала Perfect, потом Past Simple. <span class="mono">Have you ever been to Rome? — Yes, I have. — When did you go?</span></div>
      <p>${strike("When have you arrived?")} — с When Present Perfect не бывает.</p>`},
    {id:"future",title:"Будущее: will, going to, Continuous",body:`
      ${rows(["Форма","Когда","Пример"],[
        ["will","решение сейчас, прогноз, просьба",ex("Will you help me?")+" "+ex("Will it be expensive?")],
        ["be going to","план, намерение",ex("Are you going to buy a car?")],
        ["Present Continuous","договорились, есть время и место",ex("What are you doing on Saturday?")]])}
      <p>Самый естественный вопрос о планах: ${ex("What are you doing this weekend?")}</p>`},
    {id:"short",title:"Краткие ответы",body:`
      ${rows(["Вопрос","Да","Нет"],[
        [ex("Are you working?"),mn("Yes, I am."),mn("No, I'm not.")],[ex("Were they sleeping?"),mn("Yes, they were."),mn("No, they weren't.")],
        [ex("Have you finished?"),mn("Yes, I have."),mn("No, I haven't.")],[ex("Has she called?"),mn("Yes, she has."),mn("No, she hasn't.")],
        [ex("Are you going to stay?"),mn("Yes, I am."),mn("No, I'm not.")]])}
      <p>На <span class="mono">Have you ever…?</span> часто отвечают: <span class="mono">No, never. / Yes, once. / Not yet!</span></p>`},
    {id:"sound",title:"Как это звучит",body:`
      <p><span class="mono">Have you</span> сливается в «хэвъю»: ${ex("Have you ever been there?")}</p>
      <p><span class="mono">going to</span> в разговоре звучит как «gonna»: ${ex("Are you going to stay?")} Писать gonna можно только в чатах.</p>
      <p><span class="mono">What are you</span> — почти «вотаю»: ${ex("What are you doing?")}</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Помощник уже внутри","В Continuous, Perfect, going to помощник есть в утверждении. Его не надо звать — только переставить.",[]],
      ["mem","Глагол не раздевается","С do / did глагол теряет -s и прошлое. С be / have — остаётся как есть: working, seen.",["Is she working?"]],
      ["mem","Ever — перед глаголом, yet — в конце","Have you ever been…? Have you finished yet?",[]],
      ["mem","When не дружит с Perfect","Если спрашиваешь «когда» — сразу did: When did you arrive?",[]],
      ["obs","Сначала have, потом did","Have you ever been to Italy? — Yes! — When did you go? Так строится живой разговор об опыте.",[]],
      ["obs","What do you do ≠ What are you doing","Первое — профессия, второе — что делаешь сейчас. Путают даже продвинутые.",[]],
      ["obs","Американцы проще","В американском английском вместо Have you eaten yet? часто говорят Did you eat yet? Оба варианта нормальны.",["Did you eat yet?"]],
      ["obs","Have you got…? — это не Perfect","Have you got a car? = Do you have a car? Это владение, а не опыт.",[]],
      ["hack","Вопрос о планах — Continuous","What are you doing tonight / this weekend? Звучит естественнее, чем will.",["What are you doing this weekend?"]],
      ["hack","How long + have — про «до сих пор»","Если ответ будет «уже 5 лет» или «с 2019», вопрос — How long have you…?",["How long have you known him?"]],
      ["hack","Have you ever…? — лучший вопрос для знакомства","Have you ever tried / been / seen…? Сразу даёт тему для разговора.",["Have you ever tried surfing?"]],
      ["hack","Проверка через ответ","Yes, I am → вопрос с be. Yes, I have → с have. Yes, I did → с did.",[]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Do you working?","Are you working?","-ing → be."],["Are you work now?","Are you working now?","После be — глагол с -ing."],
      ["Have you ever went…?","Have you ever been…?","После have — третья форма."],["Did you ever been…?","Have you ever been…?","been → have."],
      ["How long do you live here?","How long have you lived here?","До сейчас → Present Perfect."],["Have you seen him yesterday?","Did you see him yesterday?","Точное время → did."],
      ["Has you finished?","Have you finished?","you → have."],["Have she finished?","Has she finished?","she → has."],
      ["What you are going to do?","What are you going to do?","are — перед you."],["Is raining?","Is it raining?","Подлежащее it обязательно."],
      ["When have you arrived?","When did you arrive?","When → Past Simple."],["Have you finished already?","Have you finished yet?","В обычном вопросе — yet."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:What|a:are|s:you|v:doing",ru:"Что ты делаешь (сейчас)?",extra:["do","does"],hint:"Сейчас, в процессе → are + you + doing.",alt:[["What are you up to?","разговорно"],["What's going on?","«что происходит?»"]]},
  {type:"build",f:"a:Have|s:you|t:ever|v:been|o:to Japan",ru:"Ты когда-нибудь был в Японии?",extra:["did","went"],hint:"Опыт за всю жизнь → Have + you + ever + been.",alt:[["Have you been to Japan before?","нейтрально"],["Have you ever visited Japan?","через visit"]]},
  {type:"choose",q:"___ it raining?",opts:["Is","Does","Has","Do"],ans:0,f:"a:Is|s:it|v:raining",ru:"Идёт дождь?",cat:"cont",hint:"Сейчас, в процессе → Is + it + raining.",why:{1:"Does it rain — «бывают ли дожди вообще». Сейчас → Is it raining?",2:"Has it rained — «был ли дождь (уже)».",3:"it → не do. И -ing требует be."},alt:[["Is it still raining?","«всё ещё»"],["Is it wet outside?","через be"]]},
  {type:"choose",q:"Has she ___ the report yet?",opts:["finished","finish","finishing","finishes"],ans:0,f:"a:Has|s:she|v:finished|o:the report|t:yet",ru:"Она уже закончила отчёт?",cat:"v3",hint:"После has — третья форма: finished.",alt:[["Is the report ready yet?","через be"],["Is she done with the report?","разговорно"]]},
  {type:"tr",ru:"Как долго ты здесь живёшь?",f:"q:How long|a:have|s:you|v:lived|t:here",acc:["How long have you been living here"],hint:"С прошлого до сих пор → How long + have + you + lived.",alt:[["How long have you been living here?","Perfect Continuous"],["When did you move here?","Past Simple"]]},
  {type:"fix",wrong:"Do you working now?",f:"a:Are|s:you|v:working|t:now",ru:"Ты сейчас работаешь?",acc:[],hint:"Continuous: be + -ing. Do не нужен.",alt:[["Are you at work now?","через be"],["Are you busy right now?","через be"]]},
  {type:"focus",s:"She is cooking {dinner}.",f:"q:What|a:is|s:she|v:cooking",ru:"Что она готовит?",acc:[],hint:"Что? → What. is + she + cooking.",alt:[["What's she making?","разговорно"],["What's for dinner?","разговорно"]]},
  {type:"answer",reply:"Yes, I have. Twice!",about:"Спроси, видел ли он этот фильм (you, see this film).",f:"a:Have|s:you|v:seen|o:this film",ru:"Ты видел этот фильм?",acc:["Have you ever seen this film","Have you seen this movie","Have you watched this film","Have you seen it","Have you ever seen this movie"],hint:"«I have» → Present Perfect: Have + you + seen.",alt:[["Have you watched this film?","через watch"],["Did you see this film?","если речь о конкретном показе"]]},
  {type:"build",f:"q:What|a:are|s:you|v:going to do|t:tonight",ru:"Что ты собираешься делать вечером?",extra:["will","doing"],hint:"Планы → are + you + going to do.",alt:[["What are you doing tonight?","договорённость, Continuous"],["Any plans for tonight?","разговорно"]]},
  {type:"choose",q:"Have you finished? — Yes, I ___.",opts:["have","did","am","finished"],ans:0,f:"o:Yes,|s:I|a:have",end:".",ru:"Ты закончил? — Да.",cat:"short",hint:"Спросили с have — отвечаем have.",why:{1:"did — ответ на Did you…?",3:"Глагол в кратком ответе не повторяют."},alt:[["Yes, I have.","нейтрально"],["Yes, all done.","разговорно"]]},
  {type:"tr",ru:"Что ты делал в тот момент?",f:"q:What|a:were|s:you|v:doing|t:at that moment",acc:["What were you doing then","What were you doing at the time","What were you doing at that time"],hint:"Процесс в прошлом → were + you + doing.",alt:[["What were you up to then?","разговорно"],["What were you doing when I called?","с when"]]},
  {type:"fix",wrong:"Have you ever went to Paris?",f:"a:Have|s:you|t:ever|v:been|o:to Paris",ru:"Ты когда-нибудь был в Париже?",acc:["Have you ever visited Paris"],hint:"После have — третья форма: been. Went — вторая форма.",alt:[["Have you been to Paris?","без ever"],["Have you ever visited Paris?","через visit"]]},
  {type:"focus",s:"I have lived here {for five years}.",f:"q:How long|a:have|s:you|v:lived|t:here",ru:"Как долго ты здесь живёшь?",acc:["How long have you been living here"],hint:"Длительность до сейчас → How long + have + you + lived.",alt:[["When did you move here?","Past Simple"],["How long have you been here?","через be"]]},
  {type:"build",f:"q:Where|a:were|s:you|v:going",ru:"Куда ты шёл (тогда)?",extra:["did","was"],hint:"Процесс в прошлом → were + you + going.",alt:[["Where were you off to?","разговорно"],["Where were you heading?","нейтрально"]]},
  {type:"choose",q:"___ you ever eaten sushi?",opts:["Have","Did","Do","Are"],ans:0,f:"a:Have|s:you|t:ever|v:eaten|o:sushi",ru:"Ты когда-нибудь ел суши?",cat:"perfect",hint:"ever + опыт → Have you ever + третья форма.",why:{1:"Did you ever eat — бывает в амер., но с eaten (третья форма) нужен have.",2:"Do — настоящее, а eaten — третья форма.",3:"Are + eaten — это пассив, «съедены ли вы»."},alt:[["Have you tried sushi?","через try"],["Do you like sushi?","про вкусы"]]},
  {type:"choose",q:"Are you ___ to buy a car?",opts:["going","go","went","goes"],ans:0,f:"a:Are|s:you|v:going to buy|o:a car",ru:"Ты собираешься купить машину?",cat:"cont",hint:"Планы → be + going to + глагол.",alt:[["Are you planning to buy a car?","через plan"],["Will you buy a car?","решение, прогноз"]]},
  {type:"answer",reply:"No, thanks. I'm just looking.",about:"В магазине спроси, ищет ли он что-то (you, look for something).",f:"a:Are|s:you|v:looking for|o:something",ru:"Вы что-то ищете?",acc:["Are you looking for anything","Are you looking for something special","Are you looking for anything in particular"],hint:"Сейчас → Are + you + looking for…",alt:[["Can I help you?","продавец"],["Are you looking for anything in particular?","продавец, вежливо"]]},
  {type:"tr",ru:"Ты уже поел?",f:"a:Have|s:you|v:eaten|t:yet",acc:["Have you had lunch yet","Have you eaten already","Have you had dinner yet","Did you eat yet","Did you eat"],hint:"«Уже» в вопросе → yet в конце. Have + you + eaten + yet.",alt:[["Have you had lunch yet?","про обед"],["Did you eat yet?","амер., разговорно"]]},
  {type:"build",f:"q:How long|a:have|s:you|v:known|o:her",ru:"Как давно ты её знаешь?",extra:["do","know"],hint:"Длительность до сейчас → How long + have + you + known.",alt:[["When did you meet her?","Past Simple"],["Have you known her long?","общий вопрос"]]},
  {type:"fix",wrong:"How long do you live here?",f:"q:How long|a:have|s:you|v:lived|t:here",ru:"Как долго ты здесь живёшь?",acc:["How long have you been living here"],hint:"«Как давно» (с прошлого до сейчас) → Present Perfect: have + lived.",alt:[["How long have you been living here?","Perfect Continuous"],["When did you move here?","Past Simple"]]},
  {type:"choose",q:"What ___ you doing when I called?",opts:["were","did","was","are"],ans:0,f:"q:What|a:were|s:you|v:doing|o:when I called",ru:"Что ты делал, когда я позвонил?",cat:"be_form",hint:"Процесс в прошлом → were + you + doing.",why:{1:"did + doing не сочетаются. -ing → be.",2:"you → were.",3:"when I called — прошлое → were."},alt:[["What were you up to when I called?","разговорно"],["Were you busy when I called?","общий вопрос"]]},
  {type:"focus",s:"They have gone {to Spain}.",f:"q:Where|a:have|s:they|v:gone",ru:"Куда они уехали?",acc:["Where did they go"],hint:"Место → Where. have + they + gone.",alt:[["Where did they go?","Past Simple"],["Where are they now?","через be"]]},
  {type:"build",f:"a:Has|s:the train|v:left",ru:"Поезд уже ушёл?",extra:["did","have"],hint:"Результат сейчас → Has + the train + left.",alt:[["Has the train gone already?","«уже» с удивлением"],["Did I miss the train?","Past Simple"]]},
  {type:"tr",ru:"Ты идёшь на вечеринку в субботу?",f:"a:Are|s:you|v:coming|o:to the party|t:on Saturday",acc:["Are you going to the party on Saturday","Are you going to the party","Are you coming to the party"],hint:"Договорённость на будущее → Present Continuous: Are you coming…?",alt:[["Will you be at the party on Saturday?","через will"],["Are you going to come to the party?","going to"]]},
  {type:"choose",q:"Is she working today? — No, she ___.",opts:["isn't","doesn't","hasn't","not"],ans:0,f:"o:No,|s:she|a:isn't",end:".",ru:"Она сегодня работает? — Нет.",cat:"short",hint:"Спросили с is — отвечаем isn't.",why:{1:"doesn't — ответ на Does she…?",2:"hasn't — ответ на Has she…?"},alt:[["No, she isn't.","нейтрально"],["No, it's her day off.","разговорно"]]},
  {type:"answer",reply:"I've been waiting for twenty minutes.",about:"Спроси, как долго он ждёт (you, wait).",f:"q:How long|a:have|s:you|v:been waiting",ru:"Как долго ты ждёшь?",acc:["How long have you waited"],hint:"Процесс до сейчас → How long + have + you + been waiting.",alt:[["Have you been waiting long?","общий вопрос"],["How long have you been here?","через be"]]},
  {type:"fix",wrong:"Have you seen him yesterday?",f:"a:Did|s:you|v:see|o:him|t:yesterday",ru:"Ты видел его вчера?",acc:[],hint:"Есть точное время (yesterday) → Past Simple: did.",alt:[["Have you seen him today?","today ещё не закончился — можно Perfect"],["Did you run into him yesterday?","разговорно"]]},
  {type:"build",f:"q:What|a:will|s:you|v:do|o:after university",ru:"Что ты будешь делать после университета?",extra:["are","going"],hint:"Будущее → What + will + you + do.",alt:[["What are you going to do after university?","планы"],["What are your plans after university?","через be"]]},
  {type:"focus",s:"He has lost {his phone}.",f:"q:What|a:has|s:he|v:lost",ru:"Что он потерял?",acc:["What did he lose"],hint:"Что? → What + has + he + lost.",alt:[["What's he lost?","разговорно"],["What did he lose?","Past Simple"]]},
  {type:"choose",q:"Have you finished ___?",opts:["yet","already","still","ever"],ans:0,f:"a:Have|s:you|v:finished|t:yet",ru:"Ты уже закончил?",cat:"other",hint:"«Уже» в обычном вопросе → yet в конце.",why:{1:"already в вопросе — удивление «что, уже?!». Обычный вопрос — yet.",2:"still — «всё ещё».",3:"ever — «когда-нибудь»."},alt:[["Are you done yet?","разговорно"],["Have you finished already?","удивление: «уже?!»"]]},
  {type:"tr",ru:"Что ты сейчас читаешь?",f:"q:What|a:are|s:you|v:reading|t:now",acc:["What are you reading at the moment","What are you reading right now","What book are you reading"],hint:"Сейчас → are + you + reading.",alt:[["What are you reading at the moment?","«в последнее время»"],["Read anything good lately?","разговорно"]]},
  {type:"fix",wrong:"Has you finished the book?",f:"a:Have|s:you|v:finished|o:the book",ru:"Ты дочитал книгу?",acc:[],hint:"you → have.",alt:[["Are you done with the book?","разговорно"],["Did you finish the book?","амер."]]},
  {type:"build",f:"q:Why|a:are|s:you|v:laughing",ru:"Почему ты смеёшься?",extra:["do","laugh"],hint:"Сейчас → Why + are + you + laughing.",alt:[["What's so funny?","разговорно"],["What are you laughing at?","предлог в конце"]]},
  {type:"choose",q:"When ___ you arrive in London?",opts:["did","have","are","has"],ans:0,f:"q:When|a:did|s:you|v:arrive|o:in London",ru:"Когда ты приехал в Лондон?",cat:"perfect",hint:"When — про конкретное время → Past Simple: did. When и Present Perfect не сочетаются.",why:{1:"When have you arrived — ошибка. When + Present Perfect не сочетаются.",3:"you → не has. И с When нужен did."},alt:[["When did you get to London?","разговорно"],["How long have you been in London?","Present Perfect"]]},
  {type:"answer",reply:"I'm going to visit my parents.",about:"Спроси о его планах на выходные (what, you, at the weekend).",f:"q:What|a:are|s:you|v:going to do|o:at the weekend",ru:"Что ты собираешься делать на выходных?",acc:["What are you doing at the weekend","What will you do at the weekend","What are you going to do this weekend","What are you doing this weekend"],hint:"Планы → What + are + you + going to do.",alt:[["Any plans for the weekend?","разговорно"],["What are you up to this weekend?","разговорно"]]},
  {type:"focus",s:"She has worked here {since 2019}.",f:"q:How long|a:has|s:she|v:worked|t:here",ru:"Как долго она здесь работает?",acc:["How long has she been working here"],hint:"Длительность до сейчас → How long + has + she + worked.",alt:[["When did she start working here?","Past Simple"],["Has she been here long?","общий вопрос"]]},
  {type:"tr",ru:"Ты когда-нибудь видел снег?",f:"a:Have|s:you|t:ever|v:seen|o:snow",acc:[],hint:"Опыт → Have you ever + seen.",alt:[["Have you seen snow before?","нейтрально"],["Is this your first time seeing snow?","через be"]]},
  {type:"choose",q:"Where ___ she going?",opts:["is","does","has","did"],ans:0,f:"q:Where|a:is|s:she|v:going",ru:"Куда она идёт?",cat:"cont",hint:"Сейчас, в процессе → is + she + going.",why:{1:"Does + going не сочетаются. -ing → be."},alt:[["Where's she off to?","разговорно"],["Where's she headed?","амер."]]},
  {type:"fix",wrong:"When have you met him?",f:"q:When|a:did|s:you|v:meet|o:him",ru:"Когда ты с ним познакомился?",acc:[],hint:"When → Past Simple: did + meet.",alt:[["How long have you known him?","Present Perfect"],["Where did you meet him?","через where"]]},
  {type:"build",f:"a:Is|s:he|v:going to call|o:us",ru:"Он собирается нам позвонить?",extra:["will","calls"],hint:"Планы → Is + he + going to call.",alt:[["Will he call us?","прогноз"],["Is he planning to call us?","через plan"]]},
  {type:"choose",q:"Have you ever been to Italy? — No, I ___.",opts:["haven't","didn't","don't","wasn't"],ans:0,f:"o:No,|s:I|a:haven't",end:".",ru:"Ты бывал в Италии? — Нет.",cat:"short",hint:"Спросили с have — отвечаем haven't.",why:{1:"didn't — ответ на Did you…?"},alt:[["No, I haven't.","нейтрально"],["No, never.","коротко"],["Not yet!","«пока нет»"]]},
  {type:"answer",reply:"I was watching TV.",about:"Спроси, что он делал в тот момент (you, do).",f:"q:What|a:were|s:you|v:doing",ru:"Что ты делал?",acc:["What were you doing then"],hint:"Процесс в прошлом → were + you + doing.",alt:[["What were you up to?","разговорно"],["Were you busy?","общий вопрос"]]},
  {type:"tr",ru:"Ты уже купил билеты?",f:"a:Have|s:you|v:bought|o:the tickets|t:yet",acc:["Did you buy the tickets yet","Have you got the tickets yet","Have you bought tickets yet","Did you buy the tickets"],hint:"Have + you + bought + the tickets + yet.",alt:[["Have you got the tickets yet?","разговорно"],["Did you buy the tickets?","амер."]]},
  {type:"fix",wrong:"Are you go to the cinema tonight?",f:"a:Are|s:you|v:going|o:to the cinema|t:tonight",ru:"Ты идёшь в кино сегодня вечером?",acc:[],hint:"Continuous: be + -ing.",alt:[["Will you go to the cinema tonight?","через will"],["Fancy the cinema tonight?","предложение, брит."]]},
  {type:"focus",s:"It will cost {about 100 dollars}.",f:"q:How much|a:will|s:it|v:cost",ru:"Сколько это будет стоить?",acc:["How much is it going to cost"],hint:"Цена в будущем → How much + will + it + cost.",alt:[["How much is it going to cost?","going to"],["What will it cost?","через what"]]},
  {type:"choose",q:"How long ___ you been learning English?",opts:["have","are","do","did"],ans:0,f:"q:How long|a:have|s:you|v:been learning|o:English",ru:"Как долго ты учишь английский?",cat:"perfect",hint:"been + -ing → have.",why:{1:"are + been не сочетаются.",2:"do + been не сочетаются.",3:"did + been не сочетаются."},alt:[["When did you start learning English?","Past Simple"],["How long have you studied English?","Present Perfect"]]},
  {type:"build",f:"q:What|a:have|s:you|v:done|o:to your hair",ru:"Что ты сделала с волосами?",extra:["did","do"],hint:"Результат виден сейчас → What + have + you + done.",alt:[["Have you changed your hair?","общий вопрос"],["New haircut?","разговорно"]]},
  {type:"tr",ru:"Ты смотрел новости сегодня?",f:"a:Have|s:you|v:seen|o:the news|t:today",acc:["Did you see the news today","Have you watched the news today","Did you watch the news today"],hint:"Today ещё не закончился → Have you seen…? (в амер. можно Did you see…?)",alt:[["Did you catch the news?","разговорно"],["Have you heard the news?","«слышал новость?»"]]},
  {type:"answer",reply:"No, not yet. Maybe tomorrow.",about:"Спроси, позвонила ли она уже (she, call, yet).",f:"a:Has|s:she|v:called|t:yet",ru:"Она уже позвонила?",acc:["Did she call yet","Has she phoned yet","Has she rung yet"],hint:"«Not yet» → Has + she + called + yet.",alt:[["Has she been in touch?","«выходила на связь?»"],["Any word from her?","разговорно"]]},
  {type:"fix",wrong:"What you are going to do?",f:"q:What|a:are|s:you|v:going to do",ru:"Что ты собираешься делать?",acc:[],hint:"are — перед you.",alt:[["What's your plan?","через be"],["What will you do?","через will"]]}
  ]
};
