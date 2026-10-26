/* Module 10 — alternative questions */
CONTENT.m10 = {
  title: "Альтернативные вопросы",
  idea: "Альтернативный вопрос — это обычный вопрос «да / нет», в конце которого предлагают выбор через or. Отвечают на него вариантом, а не Yes или No.",
  catSec: {order:"formula",aux_missing:"formula",alt:"why",alt_answer:"answers",do_form:"formula",verb_s:"formula",verb_past:"formula",be_verb:"formula",do_be:"formula",be_form:"formula",modal_to:"rather",wh:"which",short:"answers",article:"errors",other:"short"},
  cats: {alt:["Слово or","Варианты в альтернативном вопросе соединяет or: Tea or coffee? «Или нет» — or not."],
    alt_answer:["Ответ на вопрос с or","На альтернативный вопрос отвечают вариантом, а не Yes / No: Coffee, please."]},
  diagnose({t,u,e}){
    const em=norm(mainText(t)).split(" ");
    if(em.includes("or") && !u.includes("or")) return {cat:"alt",msg: u.includes("and") ? "Выбор между вариантами — or, а не and." : "Альтернативный вопрос: варианты соединяются словом or."};
    if(u.some((w,i)=>w==="or"&&u[i+1]==="no") && em.join(" ").includes("or not")) return {cat:"alt",msg:"«Или нет» — or not, а не or no."};
    if(em.includes("than") && u.includes("as") && !u.includes("than")) return {cat:"other",msg:"При сравнении нужен than: older than you."};
    if(em.includes("rather") && u.includes("to") && !em.includes("to")) return {cat:"modal_to",msg:"После would rather глагол идёт без to: Would you rather walk or drive?"};
    return null;
  },
  check: [
    {q:"Do you want tea ___ coffee?",opts:["or","and","either"],ans:0,hint:"Выбор → or."},
    {q:"Tea or coffee? — ___",opts:["Coffee, please.","Yes, please.","No."],ans:0,hint:"На вопрос с or отвечают вариантом."},
    {q:"Как правильно?",opts:["Are you coming or not?","Are you coming or no?","Are you coming and not?"],ans:0,hint:"«Или нет» = or not."}
  ],
  demos: [
    {name:"Вопрос + or", frames:[
      {t:[["do","Do","a"],["you","you","s"],["want","want","v"],["tea","tea","o"],["p","?","p"]], c:"Обычный вопрос «да / нет»: <i>Do you want tea?</i>"},
      {t:[["do","Do","a"],["you","you","s"],["want","want","v"],["tea","tea","o"],["or","or coffee","o"],["p","?","p"]], c:"Добавляем выбор: <b>or coffee</b>. Всё остальное не меняется: <i>Do you want tea or coffee?</i>"}]},
    {name:"Сжатый вопрос", frames:[
      {t:[["w","Would","a"],["you","you","s"],["like","like","v"],["tea","tea","o"],["or","or coffee","o"],["p","?","p"]], c:"Полный вежливый вопрос."},
      {t:[["tea","Tea","o"],["or","or coffee","o"],["p","?","p"]], c:"В жизни часто остаются только варианты: <i>Tea or coffee?</i> Так спрашивают официанты, друзья, коллеги."}]},
    {name:"С вопросительным словом", frames:[
      {t:[["w","Which","q"],["do","do","a"],["you","you","s"],["prefer","prefer","v"],["p","?","p"]], c:"Специальный вопрос: <i>Which do you prefer?</i>"},
      {t:[["w","Which","q"],["do","do","a"],["you","you","s"],["prefer","prefer","v"],["c",", cats or dogs","o"],["p","?","p"]], c:"Варианты добавляем после запятой: <i>Which do you prefer, cats or dogs?</i>"}]},
    {name:"Ловушка: and", frames:[
      {t:[["do","Do","a"],["you","you","s"],["want","want","v"],["tea","tea","o"],["and","and coffee","o","bad"],["p","?","p"]], c:"<i>Do you want tea and coffee?</i> — «хочешь чай и кофе (вместе)?»"},
      {t:[["do","Do","a"],["you","you","s"],["want","want","v"],["tea","tea","o"],["and","or coffee","o"],["p","?","p"]], c:"Выбор — только <b>or</b>: <i>Do you want tea or coffee?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Вопрос с выбором",body:`
      <p>Альтернативный вопрос предлагает варианты: «чай <b>или</b> кофе?», «сегодня <b>или</b> завтра?». Строится он очень просто: берём обычный вопрос «да / нет» и добавляем <b>or + второй вариант</b>.</p>
      <p>Никакой новой грамматики: помощник, подлежащее и глагол — как в модулях 1–4.</p>`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("a","Do / Is / Did / Can…","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","want","глагол")}${PLUS}${slot("o","tea","вариант 1")}${PLUS}${slot("o","or coffee","or + вариант 2")}<span class="plus">?</span></div>
      ${rows(["Помощник","Пример"],[
        ["be",ex("Is your flat big or small?")],["do / does",ex("Do you work or study?")],["did",ex("Did you walk or take a taxi?")],
        ["will",ex("Will you come today or tomorrow?")],["can",ex("Can you come on Monday or Tuesday?")],["shall",ex("Shall we go now or later?")]])}
      <div class="note">Вторую часть не повторяем целиком: ${ex("Is he Spanish or Italian?")} Можно и полностью — <span class="mono">Is he Spanish or is he Italian?</span> — это звучит настойчивее.</div>`},
    {id:"which",title:"Which… X or Y?",body:`
      <p>Можно начать с вопросительного слова, а варианты дать после запятой:</p>
      ${rows(["Вопрос","Перевод"],[
        [ex("Which do you prefer, cats or dogs?"),"Кого предпочитаешь — кошек или собак?"],
        [ex("Which is better, the red one or the blue one?"),"Какой лучше — красный или синий?"],
        [ex("Where shall we eat, here or at home?"),"Где поедим — здесь или дома?"]])}`},
    {id:"short",title:"Короткие вопросы с or",body:`
      <p>В живой речи часто остаются только варианты:</p>
      ${rows(["Короткий","Полный"],[
        [ex("Tea or coffee?"),mn("Would you like tea or coffee?")],[ex("Cash or card?"),mn("Will you pay in cash or by card?")],
        [ex("Window or aisle?"),mn("Would you like a window seat or an aisle seat?")],[ex("Single or return?"),mn("Would you like a single or a return ticket?")],
        [ex("Now or later?"),mn("Shall we go now or later?")]])}
      <p><b>Or not</b> в конце — «или нет»: ${ex("Are you coming or not?")} Звучит нетерпеливо.</p>`},
    {id:"rather",title:"Would you rather…?",body:`
      <p><b>Would you rather X or Y?</b> — «Ты бы предпочёл X или Y?». После rather — <b>голый глагол</b>, без to:</p>
      <p>${ex("Would you rather stay in or go out?")}</p>
      <p>${strike("Would you rather to walk?")} — ошибка. В ответе: <span class="mono">I'd rather stay in.</span></p>
      <p>Это ещё и популярная игра: <span class="mono">Would you rather be invisible or be able to fly?</span></p>`},
    {id:"answers",title:"Как отвечать",body:`
      <p>На вопрос с or <b>не отвечают Yes / No</b> — называют вариант:</p>
      ${rows(["Вопрос","Ответы"],[
        [ex("Tea or coffee?"),mn("Coffee, please. / Tea for me.")],[ex("Did you walk or take a taxi?"),mn("I walked.")],
        [ex("Do you prefer summer or winter?"),mn("Summer, definitely.")]])}
      <p>Полезные универсальные ответы: <span class="mono">Either is fine</span> (всё равно), <span class="mono">I don't mind</span> (без разницы), <span class="mono">Both</span> (оба), <span class="mono">Neither</span> (ни то, ни другое).</p>`},
    {id:"sound",title:"Интонация — главное",body:`
      <p>В альтернативном вопросе голос идёт <b>вверх на первом варианте ↗ и вниз на последнем ↘</b>: ${ex("Would you like tea or coffee?")}</p>
      <p>Если голос идёт вверх в самом конце, смысл меняется: «Хотите что-нибудь — чай, кофе?» Тогда можно ответить Yes, please.</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Вопрос «да / нет» + or","Ничего нового: тот же вопрос, только в конце — or и второй вариант.",[]],
      ["mem","Or — выбор, and — вместе","Tea or coffee? — выбери одно. Tea and coffee? — и то, и другое.",[]],
      ["mem","На or — не Yes","Yes на «чай или кофе» — значит «да, что-нибудь из этого». Назови вариант.",[]],
      ["mem","Rather — без to","Would you rather stay or go? Как после модальных — голый глагол.",[]],
      ["obs","Интонация решает","Tea↗ or coffee↘ — выбери. Tea or coffee↗ — хочешь что-нибудь попить?",["Would you like tea or coffee?"]],
      ["obs","Короткие вопросы — норма","Cash or card? Window or aisle? Официанты и кассиры почти всегда говорят так.",["Cash or card?"]],
      ["obs","Or not — нетерпеливо","Are you coming or not? звучит раздражённо. Мягче: Are you coming?",[]],
      ["obs","Either / neither / both","Either is fine — «любой подойдёт». Neither — «ни тот, ни другой». Both — «оба».",["Either is fine."]],
      ["hack","Не можешь подобрать вопрос? Дай варианты","Не знаешь, как спросить «каким способом»? Предложи варианты: Did you walk or take a taxi?",[]],
      ["hack","Would you rather — для small talk","Would you rather live in the city or the country? Отличный вопрос для разговора.",["Would you rather live in the city or the country?"]],
      ["hack","Уточняй через or","Не расслышал число? Fifteen or fifty? Так переспрашивают носители.",["Fifteen or fifty?"]],
      ["hack","I don't mind — спасательный ответ","Не можешь выбрать? I don't mind / Whatever's easier — вежливо и естественно.",["I don't mind."]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Do you want tea and coffee?","Do you want tea or coffee?","Выбор — or."],["Tea or coffee? — Yes.","Coffee, please.","Назови вариант."],
      ["Are you coming or no?","Are you coming or not?","Или нет — or not."],["Is he Spanish or is Italian?","Is he Spanish or Italian?","Не обрывай вторую часть."],
      ["Would you rather to walk?","Would you rather walk?","После rather без to."],["Are you agree or not?","Do you agree or not?","agree — глагол → do."],
      ["Do you want stay or go?","Do you want to stay or go?","want + to."],["Older or younger as you?","Older or younger than you?","Сравнение — than."],
      ["Are you student or…?","Are you a student or…?","Артикль перед профессией."],["Do you go by bus or by walk?","Do you go by bus or on foot?","Пешком — on foot."],
      ["Which do you prefer: cats and dogs?","Which do you prefer, cats or dogs?","Выбор — or."],["You want tea or coffee?","Do you want tea or coffee?","Нужен помощник."]])}
    ];
  },
  tasks: [
  {type:"build",f:"a:Do|s:you|v:want|o:tea or coffee",ru:"Ты хочешь чай или кофе?",extra:["and","are"],hint:"Общий вопрос + варианты через or: Do you want tea or coffee?",alt:[["Tea or coffee?","коротко"],["Would you prefer tea or coffee?","вежливо"]]},
  {type:"build",f:"a:Is|s:your flat|o:big or small",ru:"Твоя квартира большая или маленькая?",extra:["and","does"],hint:"Be: Is + your flat + big or small.",alt:[["How big is your flat?","специальный вопрос"],["What size is your flat?","через size"]]},
  {type:"choose",q:"Did you walk ___ take a taxi?",opts:["or","and","either","but"],ans:0,f:"a:Did|s:you|v:walk|o:or take a taxi",ru:"Ты шёл пешком или взял такси?",cat:"alt",hint:"Выбор → or.",why:{1:"and — «и то, и другое». Выбор — or.",2:"either — в ответах: either is fine."},alt:[["How did you get here?","специальный вопрос"],["Did you get a taxi?","общий вопрос"]]},
  {type:"choose",q:"Tea or coffee? — ___",opts:["Coffee, please.","Yes, please.","No, thanks.","Yes, I do."],ans:0,f:"o:Coffee,|v:please",end:".",ru:"Чай или кофе? — Кофе, пожалуйста.",cat:"alt_answer",hint:"На альтернативный вопрос не отвечают Yes / No — называют вариант.",why:{1:"Yes — непонятно, что именно. Нужно выбрать вариант.",2:"No — можно, если не хочешь ничего, но вопрос о выборе.",3:"Yes, I do — ответ на Do you…?"},alt:[["Coffee, please.","нейтрально"],["I'll have coffee.","разговорно"],["Either is fine.","«всё равно»"]]},
  {type:"tr",ru:"Ты приедешь сегодня или завтра?",f:"a:Will|s:you|v:come|o:today or tomorrow",acc:["Are you coming today or tomorrow","Will you arrive today or tomorrow","Are you arriving today or tomorrow"],hint:"Will + you + come + today or tomorrow.",alt:[["When are you coming?","специальный вопрос"],["Is it today or tomorrow you're coming?","эмфатически"]]},
  {type:"fix",wrong:"Do you want tea and coffee?",f:"a:Do|s:you|v:want|o:tea or coffee",ru:"Ты хочешь чай или кофе?",acc:[],hint:"Выбор между вариантами — or, а не and.",alt:[["Tea or coffee?","коротко"],["What would you like to drink?","специальный вопрос"]]},
  {type:"focus",s:"She lives {in the city}, not in the country.",f:"a:Does|s:she|v:live|o:in the city or in the country",ru:"Она живёт в городе или в деревне?",acc:["Does she live in the city or the country","Does she live in the country or in the city"],hint:"Предложи оба варианта: in the city or in the country.",alt:[["Where does she live?","специальный вопрос"],["Is she a city girl or a country girl?","разговорно"]]},
  {type:"answer",reply:"By train. It's faster.",about:"Спроси, как он поедет: на поезде или на машине (you, go by train or by car).",f:"a:Are|s:you|v:going|o:by train or by car",ru:"Ты поедешь на поезде или на машине?",acc:["Will you go by train or by car","Are you going by train or car","Will you go by train or car","Are you travelling by train or by car"],hint:"Are + you + going + by train or by car.",alt:[["How are you getting there?","специальный вопрос"],["Train or car?","коротко"]]},
  {type:"build",f:"q:Which|a:do|s:you|v:prefer|o:cats or dogs",ru:"Кого ты предпочитаешь — кошек или собак?",extra:["what","and"],hint:"Which do you prefer, X or Y?",alt:[["Are you a cat person or a dog person?","разговорно"],["Do you like cats or dogs better?","через like better"]]},
  {type:"choose",q:"Are you coming with us ___?",opts:["or not","or no","and not","or don't"],ans:0,f:"a:Are|s:you|v:coming|o:with us or not",ru:"Ты идёшь с нами или нет?",cat:"alt",hint:"«Или нет» = or not.",why:{1:"or no — так не говорят. Только or not.",3:"or don't — нужен целый вопрос: or don't you want to?"},alt:[["Are you coming or what?","разговорно, нетерпеливо"],["So, are you in?","разговорно"]]},
  {type:"tr",ru:"Это правда или шутка?",f:"a:Is|s:it|o:true or a joke",acc:["Is this true or a joke","Is that true or a joke","Is it true or is it a joke","Are you serious or joking","Are you serious or are you joking"],hint:"Is + it + true or a joke.",alt:[["Are you serious?","общий вопрос"],["Are you kidding?","разговорно"]]},
  {type:"fix",wrong:"Is he Spanish or is Italian?",f:"a:Is|s:he|o:Spanish or Italian",ru:"Он испанец или итальянец?",acc:["Is he Spanish or is he Italian"],hint:"Вторую часть не обрываем: Spanish or Italian (или полностью: or is he Italian).",alt:[["Where is he from?","специальный вопрос"],["What nationality is he?","через nationality"]]},
  {type:"focus",s:"We met {at university}, not at work.",f:"a:Did|s:you|v:meet|o:at university or at work",ru:"Вы познакомились в университете или на работе?",acc:["Did you meet at work or at university","Did you meet at university or work"],hint:"Did + you + meet + at university or at work.",alt:[["Where did you meet?","специальный вопрос"],["How did you two meet?","через how"]]},
  {type:"build",f:"a:Shall|s:we|v:go|o:now or later",ru:"Пойдём сейчас или позже?",extra:["do","and"],hint:"Предложение → Shall we + go + now or later.",alt:[["Now or later?","коротко"],["Do you want to go now or later?","через want"]]},
  {type:"choose",q:"Would you rather stay in ___ go out?",opts:["or","than","and","to"],ans:0,f:"a:Would|s:you|v:rather stay in|o:or go out",ru:"Ты бы предпочёл остаться дома или пойти куда-нибудь?",cat:"alt",hint:"Would you rather X or Y? После rather — глагол без to.",why:{1:"than — в утверждении: I'd rather stay in than go out. В вопросе — or."},alt:[["Do you want to stay in or go out?","через want"],["In or out tonight?","разговорно"]]},
  {type:"choose",q:"Is it your car ___ your wife's?",opts:["or","and","either","nor"],ans:0,f:"a:Is|s:it|o:your car or your wife's",ru:"Это твоя машина или жены?",cat:"alt",hint:"Выбор → or.",alt:[["Whose car is it?","специальный вопрос"],["Is the car yours?","общий вопрос"]]},
  {type:"answer",reply:"I don't mind. Either is fine.",about:"Спроси, хочет он пиццу или пасту (would like).",f:"a:Would|s:you|v:like|o:pizza or pasta",ru:"Хочешь пиццу или пасту?",acc:["Do you want pizza or pasta","Would you prefer pizza or pasta","Pizza or pasta"],hint:"Would + you + like + pizza or pasta.",alt:[["Pizza or pasta?","коротко"],["What do you fancy, pizza or pasta?","брит., разговорно"]]},
  {type:"tr",ru:"Ты работаешь или учишься?",f:"a:Do|s:you|v:work|o:or study",acc:["Are you working or studying","Do you work or are you a student","Do you work or do you study"],hint:"Do + you + work + or study. Второй глагол — тоже в начальной форме.",alt:[["Are you a student?","общий вопрос"],["What do you do?","специальный вопрос"]]},
  {type:"build",f:"q:Where|a:shall|s:we|v:eat|o:here or at home",ru:"Где поедим — здесь или дома?",extra:["and","do"],hint:"Where shall we eat, here or at home?",alt:[["Shall we eat here or at home?","общий вопрос + or"],["Eat in or eat out?","разговорно"]]},
  {type:"fix",wrong:"Are you agree or not?",f:"a:Do|s:you|v:agree|o:or not",ru:"Ты согласен или нет?",acc:[],hint:"agree — глагол → do.",alt:[["Do you agree?","общий вопрос"],["Are you with me or not?","разговорно, через be"]]},
  {type:"choose",q:"Did they win ___ lose?",opts:["or","and","but","nor"],ans:0,f:"a:Did|s:they|v:win|o:or lose",ru:"Они выиграли или проиграли?",cat:"alt",hint:"Выбор → or. Оба глагола — в начальной форме после did.",alt:[["Who won?","к подлежащему"],["What was the result?","через be"]]},
  {type:"focus",s:"I want the {blue} one, not the red one.",f:"a:Do|s:you|v:want|o:the blue one or the red one",ru:"Ты хочешь синий или красный?",acc:["Do you want the red one or the blue one","Which one do you want the blue one or the red one","Which do you want the blue one or the red one"],hint:"Do + you + want + the blue one or the red one.",alt:[["Which one do you want?","через which"],["Blue or red?","коротко"]]},
  {type:"build",f:"a:Was|s:the film|o:good or bad",ru:"Фильм был хороший или плохой?",extra:["did","and"],hint:"Be в прошлом: Was + the film + good or bad.",alt:[["How was the film?","специальный вопрос"],["Did you like the film?","общий вопрос"]]},
  {type:"tr",ru:"Тебе больше нравится лето или зима?",f:"a:Do|s:you|v:prefer|o:summer or winter",acc:["Do you like summer or winter more","Do you like summer or winter better","Which do you prefer summer or winter","Which do you like more summer or winter","Do you prefer winter or summer"],hint:"Do + you + prefer + summer or winter.",alt:[["Which season do you like best?","специальный вопрос"],["Are you a summer person or a winter person?","разговорно"]]},
  {type:"choose",q:"Do you want to sit inside or outside? — ___",opts:["Outside, please.","Yes, I do.","No, I don't.","Yes, please."],ans:0,f:"o:Outside,|v:please",end:".",ru:"Хотите сесть внутри или снаружи? — Снаружи, пожалуйста.",cat:"alt_answer",hint:"На вопрос с or отвечают вариантом, а не Yes / No.",alt:[["Outside would be nice.","нейтрально"],["Wherever's free.","«где свободно»"]]},
  {type:"answer",reply:"Single, please. I'm not coming back.",about:"На вокзале спроси, нужен ли билет в одну сторону или туда-обратно (single or return).",f:"o:Single or return",ru:"В одну сторону или туда и обратно?",acc:["Do you want a single or a return","Would you like a single or a return","Do you want a single or return","Would you like a single or return ticket","Is it a single or a return"],hint:"Билетный вопрос коротко: Single or return? Полностью: Would you like a single or a return?",alt:[["One way or round trip?","амер."],["Would you like a return ticket?","общий вопрос"]]},
  {type:"fix",wrong:"Do you want stay or go?",f:"a:Do|s:you|v:want|o:to stay or go",ru:"Ты хочешь остаться или уйти?",acc:["Do you want to stay or to go"],hint:"want + to + глагол.",alt:[["Are you staying or going?","Continuous"],["Should I stay or should I go?","классика"]]},
  {type:"build",f:"a:Can|s:you|v:come|o:on Monday or Tuesday",ru:"Ты можешь прийти в понедельник или во вторник?",extra:["and","do"],hint:"Can + you + come + on Monday or Tuesday.",alt:[["Which day can you come?","специальный вопрос"],["Monday or Tuesday — what suits you?","разговорно"]]},
  {type:"focus",s:"He is {a doctor}, not a nurse.",f:"a:Is|s:he|o:a doctor or a nurse",ru:"Он врач или медбрат?",acc:["Is he a nurse or a doctor"],hint:"Is + he + a doctor or a nurse.",alt:[["What does he do?","специальный вопрос"],["What's his job?","через be"]]},
  {type:"choose",q:"Which is bigger, London ___ Paris?",opts:["or","and","than","with"],ans:0,f:"q:Which|a:is|s:bigger|o:London or Paris",ru:"Какой город больше — Лондон или Париж?",cat:"alt",hint:"Which is …, X or Y? Варианты через or.",why:{2:"than — в сравнении в утверждении: London is bigger than Paris."},alt:[["Is London bigger than Paris?","общий вопрос"],["Which city is larger?","нейтрально"]]},
  {type:"tr",ru:"Ты хочешь остаться или уйти?",f:"a:Do|s:you|v:want|o:to stay or leave",acc:["Do you want to stay or to leave","Do you want to stay or go","Would you like to stay or leave","Do you want to stay or to go"],hint:"Do + you + want + to stay or leave.",alt:[["Shall we stay or go?","предложение"],["Are you staying or leaving?","Continuous"]]},
  {type:"fix",wrong:"Are you student or do you work?",f:"a:Are|s:you|o:a student or do you work",ru:"Ты студент или работаешь?",acc:[],hint:"Перед профессией нужен артикль: a student.",alt:[["What do you do?","специальный вопрос"],["Are you working or studying?","Continuous"]]},
  {type:"build",f:"a:Did|s:you|v:call|o:her or text her",ru:"Ты ей позвонил или написал?",extra:["called","and"],hint:"Did + you + call her or text her.",alt:[["How did you contact her?","специальный вопрос"],["Did you get in touch with her?","общий вопрос"]]},
  {type:"choose",q:"Would you like a window seat ___ an aisle seat?",opts:["or","and","either","nor"],ans:0,f:"a:Would|s:you|v:like|o:a window seat or an aisle seat",ru:"Вам место у окна или у прохода?",cat:"alt",hint:"Выбор → or.",alt:[["Window or aisle?","коротко, в самолёте"],["Do you have a seat preference?","официально"]]},
  {type:"answer",reply:"Neither. I'd like some water.",about:"Спроси, хочет он сок или колу (juice or cola).",f:"a:Would|s:you|v:like|o:juice or cola",ru:"Хочешь сок или колу?",acc:["Do you want juice or cola","Juice or cola","Would you like some juice or cola","Do you want some juice or cola"],hint:"Would + you + like + juice or cola.",alt:[["Juice or cola?","коротко"],["What would you like to drink?","специальный вопрос"]]},
  {type:"focus",s:"They came {on Friday}, not on Saturday.",f:"a:Did|s:they|v:come|o:on Friday or on Saturday",ru:"Они приехали в пятницу или в субботу?",acc:["Did they come on Friday or Saturday","Did they come on Saturday or on Friday","Did they arrive on Friday or on Saturday"],hint:"Did + they + come + on Friday or on Saturday.",alt:[["When did they come?","специальный вопрос"],["Which day did they come?","через which"]]},
  {type:"tr",ru:"Мне позвонить тебе или написать?",f:"a:Shall|s:I|v:call|o:you or text you",acc:["Should I call you or text you","Shall I call or text you","Should I call or text you","Shall I phone you or text you"],hint:"Предложение → Shall + I + call you or text you.",alt:[["Call or text?","коротко"],["How should I contact you?","специальный вопрос"]]},
  {type:"choose",q:"Is she married ___ single?",opts:["or","and","but","nor"],ans:0,f:"a:Is|s:she|o:married or single",ru:"Она замужем или нет?",cat:"alt",hint:"Выбор → or.",alt:[["Is she seeing anyone?","разговорно: «встречается с кем-то?»"],["Is she married?","общий вопрос"]]},
  {type:"fix",wrong:"Do you go by bus or by walk?",f:"a:Do|s:you|v:go|o:by bus or on foot",ru:"Ты ездишь на автобусе или ходишь пешком?",acc:["Do you take the bus or walk","Do you go by bus or walk"],hint:"Пешком — on foot (или walk: Do you take the bus or walk?).",alt:[["How do you get to work?","специальный вопрос"],["Do you walk to work?","общий вопрос"]]},
  {type:"build",f:"q:Which|a:is|s:better|o:the red one or the blue one",ru:"Какой лучше — красный или синий?",extra:["what","and"],hint:"Which is better, X or Y?",alt:[["Which one do you prefer?","через prefer"],["Red or blue?","коротко"]]},
  {type:"choose",q:"Are we meeting at six ___ at seven?",opts:["or","and","nor","but"],ans:0,f:"a:Are|s:we|v:meeting|o:at six or at seven",ru:"Мы встречаемся в шесть или в семь?",cat:"alt",hint:"Выбор → or.",alt:[["What time are we meeting?","специальный вопрос"],["Six or seven?","коротко"]]},
  {type:"answer",reply:"Both! I love them all.",about:"Спроси, кого он больше любит — кошек или собак (prefer).",f:"a:Do|s:you|v:prefer|o:cats or dogs",ru:"Ты больше любишь кошек или собак?",acc:["Which do you prefer cats or dogs","Do you like cats or dogs","Do you like cats or dogs more","Do you like cats or dogs better"],hint:"Do + you + prefer + cats or dogs.",alt:[["Cat person or dog person?","разговорно"],["Do you have any pets?","общий вопрос"]]},
  {type:"tr",ru:"Ты будешь платить наличными или картой?",f:"a:Will|s:you|v:pay|o:in cash or by card",acc:["Are you paying in cash or by card","Will you pay cash or card","Cash or card","Are you paying cash or card","Would you like to pay in cash or by card","Will you pay by cash or card"],hint:"Will + you + pay + in cash or by card.",alt:[["Cash or card?","коротко, на кассе"],["How would you like to pay?","официально"]]},
  {type:"fix",wrong:"Is your brother older or younger as you?",f:"a:Is|s:your brother|o:older or younger than you",ru:"Твой брат старше или младше тебя?",acc:[],hint:"Сравнение → than.",alt:[["How old is your brother?","специальный вопрос"],["Are you the oldest?","общий вопрос"]]},
  {type:"focus",s:"I prefer {tea}, not coffee.",f:"a:Do|s:you|v:prefer|o:tea or coffee",ru:"Ты предпочитаешь чай или кофе?",acc:["Do you prefer coffee or tea","Which do you prefer tea or coffee","Which do you prefer coffee or tea"],hint:"Do + you + prefer + tea or coffee.",alt:[["Tea or coffee?","коротко"],["Are you a tea person?","разговорно"]]},
  {type:"choose",q:"Shall I pay now ___ later?",opts:["or","and","but","than"],ans:0,f:"a:Shall|s:I|v:pay|o:now or later",ru:"Мне заплатить сейчас или потом?",cat:"alt",hint:"Выбор → or.",alt:[["When should I pay?","специальный вопрос"],["Do I pay now?","общий вопрос"]]},
  {type:"build",f:"a:Do|s:they|v:live|o:in a house or a flat",ru:"Они живут в доме или в квартире?",extra:["does","and"],hint:"Do + they + live + in a house or a flat.",alt:[["What kind of place do they live in?","специальный вопрос"],["Have they got a house?","общий вопрос"]]},
  {type:"tr",ru:"Ты ешь мясо или ты вегетарианец?",f:"a:Do|s:you|v:eat|o:meat or are you a vegetarian",acc:["Do you eat meat or are you vegetarian","Are you a vegetarian or do you eat meat","Are you vegetarian or do you eat meat"],hint:"Две разные части → два вопроса через or: Do you eat meat or are you a vegetarian?",alt:[["Are you vegetarian?","общий вопрос"],["Any dietary requirements?","официально: «особые пожелания по еде?»"]]},
  {type:"answer",reply:"Today, please. It's urgent.",about:"Спроси, нужно ли это ему сегодня или завтра (need it).",f:"a:Do|s:you|v:need|o:it today or tomorrow",ru:"Тебе это нужно сегодня или завтра?",acc:["Do you need it today or is tomorrow OK","Is it for today or tomorrow","Do you need it today or tomorrow"],hint:"Do + you + need + it + today or tomorrow.",alt:[["When do you need it by?","специальный вопрос"],["Is tomorrow OK?","общий вопрос"]]},
  {type:"fix",wrong:"Would you rather to walk or drive?",f:"a:Would|s:you|v:rather walk|o:or drive",ru:"Ты бы предпочёл пойти пешком или поехать?",acc:[],hint:"После would rather — без to.",alt:[["Do you want to walk or drive?","через want"],["Shall we walk or drive?","предложение"]]}
  ]
};
