/* Module 12 — question tags */
CONTENT.m12 = {
  title: "Разделительные вопросы (tags)",
  idea: "Хвостик в конце фразы — это помощник из утверждения + местоимение, только с обратным знаком: плюс → минус, минус → плюс. You're new here, aren't you?",
  catSec: {order:"formula",aux_missing:"formula",tag_sign:"sign",tag_aux:"aux",tag_pron:"aux",do_form:"aux",be_form:"aux",do_be:"aux",be_verb:"aux",verb_s:"aux",verb_past:"aux",wh:"special",short:"answers",article:"errors",other:"formula"},
  cats: {tag_sign:["Плюс-минус в хвостике","Утверждение с плюсом → хвостик с минусом (isn't it?). Утверждение с минусом → хвостик с плюсом (is it?)."],
    tag_aux:["Помощник в хвостике","В хвостике повторяется помощник из утверждения: is → isn't, do → don't, can → can't. Нет помощника — берём do / does / did."],
    tag_pron:["Местоимение в хвостике","В хвостике — только местоимение: Tom → he, the film → it, your parents → they."]},
  diagnose({t,u}){
    const em=norm(mainText(t)).split(" ");
    const tagE=em.slice(-3), tagU=u.slice(-3);
    const eNeg=tagE.includes("not"), uNeg=tagU.includes("not");
    const eAuxT=eNeg?tagE[0]:em[em.length-2], uAuxT=uNeg?tagU[0]:u[u.length-2];
    const ePron=em[em.length-1], uPron=u[u.length-1];
    const body=em.slice(0,em.length-(eNeg?3:2)).join(" ");
    if(!u.join(" ").startsWith(body)) return null;
    if(eNeg!==uNeg) return {cat:"tag_sign",msg: eNeg ? "Утверждение с плюсом → хвостик с минусом: …n't + местоимение?" : "В утверждении уже есть отрицание (или never, no, nobody) → хвостик с плюсом, без n't."};
    if(uAuxT!==eAuxT) return {cat:"tag_aux",msg:`В хвостике нужен помощник «${eAuxT}${eNeg?"n't":""}». Бери его из утверждения; нет помощника — do / does / did.`};
    if(uPron!==ePron) return {cat:"tag_pron",msg:`В хвостике — местоимение «${ePron}», которое заменяет подлежащее.`};
    return null;
  },
  check: [
    {q:"You're new here, ___?",opts:["aren't you","isn't it","don't you"],ans:0,hint:"are → aren't, you → you."},
    {q:"She likes jazz, ___?",opts:["doesn't she","isn't she","don't she"],ans:0,hint:"Нет помощника → does. Плюс → минус: doesn't she?"},
    {q:"He can't swim, ___?",opts:["can he","can't he","does he"],ans:0,hint:"Минус в утверждении → плюс в хвостике: can he?"}
  ],
  demos: [
    {name:"Плюс → минус", frames:[
      {t:[["you","You","s"],["are","are","a"],["new","new here","o"],["p",".","p"]], c:"Утверждение с плюсом. Помощник — <b>are</b>."},
      {t:[["you","You","s"],["are","are","a"],["new","new here,","o"],["tag","aren't","a"],["pr","you","s"],["p","?","p"]], c:"Хвостик: тот же помощник, но с минусом, + местоимение: <i>You're new here, aren't you?</i> — «Ты ведь новенький, да?»"}]},
    {name:"Минус → плюс", frames:[
      {t:[["he","He","s"],["cant","can't","a"],["swim","swim","v"],["p",".","p"]], c:"Утверждение с минусом: <b>can't</b>."},
      {t:[["he","He","s"],["cant","can't","a"],["swim","swim,","v"],["tag","can","a"],["pr","he","s"],["p","?","p"]], c:"Хвостик с плюсом: <i>He can't swim, can he?</i>"}]},
    {name:"Нет помощника", frames:[
      {t:[["she","She","s"],["likes","likes","v"],["jazz","jazz","o"],["p",".","p"]], c:"В утверждении нет помощника — только глагол likes."},
      {t:[["she","She","s"],["likes","likes","v"],["jazz","jazz,","o"],["tag","doesn't","a"],["pr","she","s"],["p","?","p"]], c:"Зовём do: likes → <b>does</b>, плюс → минус: <i>She likes jazz, doesn't she?</i>"}]},
    {name:"Имя → местоимение", frames:[
      {t:[["tom","Tom","s"],["was","was","a"],["late","late,","o"],["tag","wasn't","a"],["pr","Tom","s","bad"],["p","?","p"]], c:"В хвостике не повторяют имя."},
      {t:[["tom","Tom","s"],["was","was","a"],["late","late,","o"],["tag","wasn't","a"],["pr","he","s"],["p","?","p"]], c:"Tom → <b>he</b>: <i>Tom was late, wasn't he?</i>"}]}
  ],
  rules(){
    return [
    {id:"why",title:"Что такое хвостик",body:`
      <p>Разделительный вопрос — это утверждение + короткий «хвостик»: <span class="mono">You're tired, <b>aren't you</b>?</span> По-русски это «…да?», «…правда?», «…не так ли?», «…ведь?».</p>
      <p>Зачем: проверить, что ты прав, или пригласить собеседника согласиться. Это самый «британский» тип вопроса — его слышишь в каждом разговоре.</p>`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("o","Утверждение","как обычно")}<span class="plus">,</span>${slot("a","помощник ± n't","обратный знак")}${PLUS}${slot("s","местоимение","кто")}<span class="plus">?</span></div>
      <ol class="steps">
        <li>Найди помощника в утверждении (is, are, can, have, will…). Нет его — бери do / does / did.</li>
        <li>Поменяй знак: был плюс — ставь n't. Был минус — убирай n't.</li>
        <li>Добавь местоимение, которое заменяет подлежащее.</li></ol>`},
    {id:"sign",title:"Плюс ↔ минус",body:`
      ${rows(["Утверждение","Хвостик"],[
        [mn("It's cold,"),ex("isn't it?")],[mn("It isn't cold,"),ex("is it?")],
        [mn("You can swim,"),ex("can't you?")],[mn("You can't swim,"),ex("can you?")],
        [mn("They've left,"),ex("haven't they?")],[mn("They haven't left,"),ex("have they?")]])}
      <div class="note">Слова <b>never, nobody, nothing, hardly, no</b> делают утверждение отрицательным. Значит, хвостик с плюсом: ${ex("You never call, do you?")} ${ex("Nobody came, did they?")}</div>`},
    {id:"aux",title:"Какой помощник взять",body:`
      ${rows(["В утверждении","Хвостик","Пример"],[
        ["am / is / are",tA("aren't / isn't"),ex("She's Italian, isn't she?")],["was / were",tA("wasn't / weren't"),ex("It was great, wasn't it?")],
        ["глагол (live, likes)",tA("don't / doesn't"),ex("You live here, don't you?")],["прошлое (went, saw)",tA("didn't"),ex("You saw it, didn't you?")],
        ["have / has + 3-я форма",tA("haven't / hasn't"),ex("You've been there, haven't you?")],["can / will / should",tA("can't / won't / shouldn't"),ex("You'll come, won't you?")]])}
      <p>Местоимение: <span class="mono">Tom → he, Anna → she, the film → it, your parents → they, this / that → it, there is → there</span>.</p>`},
    {id:"special",title:"Особые случаи",body:`
      ${rows(["Случай","Хвостик","Пример"],[
        ["I am",mn("aren't I?"),ex("I'm late, aren't I?")],["Let's…",mn("shall we?"),ex("Let's go, shall we?")],
        ["Просьба (повелительное)",mn("will you? / could you?"),ex("Open the window, will you?")],["There is / are",mn("isn't there? / aren't there?"),ex("There's a bank here, isn't there?")],
        ["Nobody / everyone",mn("…they?"),ex("Everyone's here, aren't they?")],["This / that",mn("…it?"),ex("This is yours, isn't it?")]])}`},
    {id:"sound",title:"Интонация меняет смысл",body:`
      <p>Голос <b>вниз ↘</b> — ты уверен и ждёшь согласия: ${ex("It's a lovely day, isn't it?")} («Чудесный день, правда?»)</p>
      <p>Голос <b>вверх ↗</b> — ты сомневаешься и правда спрашиваешь: ${ex("You've paid, haven't you?")} («Ты ведь заплатил? Или нет?»)</p>`},
    {id:"answers",title:"Как отвечать",body:`
      <p>Отвечаем по факту, как на отрицательный вопрос: <span class="mono">It isn't cold, is it? — <b>No, it isn't.</b></span> (не холодно) / <span class="mono"><b>Yes, it is!</b></span> (холодно!)</p>
      <p>Часто хватает согласия: <span class="mono">Yes, it is. / It really is! / I know, right?</span></p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Зеркало со сменой знака","Хвостик — отражение начала: тот же помощник, тот же человек, но знак наоборот.",[]],
      ["mem","Нет помощника — зови do","She works → doesn't she? He went → didn't he? Как в модулях 2–3.",[]],
      ["mem","Имя в хвостик не берём","Только местоимение: Anna → she, the car → it.",[]],
      ["mem","I am → aren't I","Единственное исключение для I: I'm right, aren't I?",["I'm right, aren't I?"]],
      ["obs","Британцы говорят о погоде хвостиками","Lovely day, isn't it? Bit cold, isn't it? — классический способ начать разговор.",["Lovely day, isn't it?"]],
      ["obs","Never = минус","You never listen, do you? Never уже отрицание, поэтому хвостик с плюсом.",["You never listen, do you?"]],
      ["obs","Let's → shall we","Let's go, shall we? — мягкое предложение. Это частая фраза.",["Let's go, shall we?"]],
      ["obs","Американцы проще","В американском английском вместо хвостиков часто говорят right? или huh?: You're new here, right?",["You're new here, right?"]],
      ["hack","Не успеваешь подобрать — скажи right?","Right? — универсальный хвостик. Грамматика не нужна, смысл тот же.",["It's expensive, right?"]],
      ["hack","Хвостик — способ завязать разговор","Утверждение + хвостик приглашает ответить: Great party, isn't it?",["Great party, isn't it?"]],
      ["hack","Просьба помягче","Pass me the salt, could you? — вежливее, чем просто Pass me the salt.",["Pass me the salt, could you?"]],
      ["hack","Проверка через отрицательный вопрос","Хвостик isn't it? — это половинка от Isn't it…? из модуля 11. Те же формы.",[]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["You're new, isn't it?","You're new, aren't you?","Местоимение — you, помощник — are."],["She likes jazz, isn't she?","She likes jazz, doesn't she?","Глагол → does."],
      ["He can't swim, can't he?","He can't swim, can he?","Минус → плюс."],["Tom is here, isn't Tom?","Tom is here, isn't he?","Имя → местоимение."],
      ["You went there, weren't you?","You went there, didn't you?","went → did."],["I'm late, amn't I?","I'm late, aren't I?","I am → aren't I."],
      ["You never call, don't you?","You never call, do you?","never = минус → хвостик с плюсом."],["Let's go, will we?","Let's go, shall we?","Let's → shall we."],
      ["They've finished, didn't they?","They've finished, haven't they?","have → haven't."],["It was good, isn't it?","It was good, wasn't it?","Время то же: was → wasn't."],
      ["You don't smoke, don't you?","You don't smoke, do you?","Минус → плюс."],["There's a lift, isn't it?","There's a lift, isn't there?","there → there."]])}
    ];
  },
  tasks: [
  {type:"build",f:"o:You're new here,|a:aren't|s:you",ru:"Ты новенький, да?",extra:["isn't","don't"],hint:"are → aren't, you → you.",alt:[["You're new here, right?","амер., разговорно"],["Are you new here?","обычный вопрос"]]},
  {type:"build",f:"o:It's cold today,|a:isn't|s:it",ru:"Сегодня холодно, правда?",extra:["doesn't","is"],hint:"is → isn't, it → it.",alt:[["Bit cold today, isn't it?","брит., small talk"],["Freezing, isn't it?","«дубак, да?»"]]},
  {type:"choose",q:"She lives in Paris, ___?",opts:["doesn't she","isn't she","don't she","does she"],ans:0,f:"o:She lives in Paris,|a:doesn't|s:she",ru:"Она ведь живёт в Париже?",cat:"tag_aux",hint:"lives — глагол без помощника → does. Плюс → минус.",why:{1:"В утверждении нет is — есть глагол lives → does.",2:"she → does.",3:"Утверждение с плюсом → хвостик с минусом."},alt:[["She lives in Paris, right?","разговорно"],["Does she live in Paris?","обычный вопрос"]]},
  {type:"choose",q:"You can't drive, ___?",opts:["can you","can't you","do you","don't you"],ans:0,f:"o:You can't drive,|a:can|s:you",ru:"Ты ведь не умеешь водить?",cat:"tag_sign",hint:"Минус в утверждении → плюс в хвостике: can you?",why:{1:"Два минуса подряд — нельзя.",2:"Помощник — can, а не do."},alt:[["You don't drive, do you?","через drive"],["Can you drive?","обычный вопрос"]]},
  {type:"tr",ru:"Ты был там вчера, да?",f:"o:You were there yesterday,|a:weren't|s:you",acc:["You were there yesterday weren't you"],hint:"were → weren't you.",alt:[["You were there yesterday, right?","разговорно"],["Were you there yesterday?","обычный вопрос"]]},
  {type:"fix",wrong:"You're tired, isn't it?",f:"o:You're tired,|a:aren't|s:you",ru:"Ты устал, да?",acc:[],hint:"Подлежащее you → aren't you.",alt:[["You look tired.","утверждение"],["Tired?","коротко"]]},
  {type:"focus",s:"Tom {was} late again.",f:"o:Tom was late again,|a:wasn't|s:he",ru:"Том опять опоздал, да?",acc:[],hint:"was → wasn't, Tom → he.",alt:[["Tom was late again, right?","разговорно"],["Was Tom late again?","обычный вопрос"]]},
  {type:"answer",reply:"Yes, it was! Best concert ever.",about:"Скажи, что концерт был отличный, и добавь хвостик (The concert was great…).",f:"o:The concert was great,|a:wasn't|s:it",ru:"Концерт был отличный, правда?",acc:["The concert was amazing wasn't it","It was great wasn't it"],hint:"was → wasn't, the concert → it.",alt:[["Wasn't the concert great?","отрицательный вопрос"],["Great concert, wasn't it?","коротко"]]},
  {type:"build",f:"o:You've been to London,|a:haven't|s:you",ru:"Ты ведь бывал в Лондоне?",extra:["didn't","weren't"],hint:"have → haven't you.",alt:[["Have you been to London?","обычный вопрос"],["You've been to London, right?","разговорно"]]},
  {type:"choose",q:"They didn't come, ___?",opts:["did they","didn't they","do they","were they"],ans:0,f:"o:They didn't come,|a:did|s:they",ru:"Они ведь не пришли?",cat:"tag_sign",hint:"Минус → плюс: did they?",why:{1:"Два минуса — нельзя.",2:"Прошлое → did.",3:"Помощник — did, не were."},alt:[["Nobody came, did they?","через nobody"],["Did they come?","обычный вопрос"]]},
  {type:"tr",ru:"Ты говоришь по-английски, да?",f:"o:You speak English,|a:don't|s:you",acc:[],hint:"speak — глагол → don't you.",alt:[["You speak English, right?","разговорно"],["Do you speak English?","обычный вопрос"]]},
  {type:"fix",wrong:"She can swim, can she?",f:"o:She can swim,|a:can't|s:she",ru:"Она ведь умеет плавать?",acc:[],hint:"Плюс → минус: can't she?",alt:[["She can swim, right?","разговорно"],["Can she swim?","обычный вопрос"]]},
  {type:"focus",s:"Your parents {live} in Kyiv.",f:"o:Your parents live in Kyiv,|a:don't|s:they",ru:"Твои родители ведь живут в Киеве?",acc:[],hint:"live → don't, your parents → they.",alt:[["Do your parents live in Kyiv?","обычный вопрос"],["Your parents are in Kyiv, right?","разговорно"]]},
  {type:"build",f:"o:Let's go,|a:shall|s:we",ru:"Пойдём, а?",extra:["will","don't"],hint:"Let's → shall we?",alt:[["Shall we go?","обычный вопрос"],["Ready to go?","разговорно"]]},
  {type:"choose",q:"I'm right, ___?",opts:["aren't I","amn't I","isn't I","am I"],ans:0,f:"o:I'm right,|a:aren't|s:I",ru:"Я ведь прав?",cat:"tag_aux",hint:"Исключение: I am → aren't I?",why:{1:"Amn't — такой формы нет.",2:"I → не is.",3:"Плюс → минус."},alt:[["Am I right?","обычный вопрос"],["I'm right, right?","разговорно, шутливо"]]},
  {type:"choose",q:"You never call me, ___?",opts:["do you","don't you","did you","are you"],ans:0,f:"o:You never call me,|a:do|s:you",ru:"Ты мне никогда не звонишь, да?",cat:"tag_sign",hint:"never — уже минус → хвостик с плюсом: do you?",why:{1:"never делает фразу отрицательной → нужен плюс.",2:"Настоящее время → do.",3:"call — глагол → do."},alt:[["Why don't you ever call me?","упрёк"],["You never call!","утверждение"]]},
  {type:"answer",reply:"No, she isn't. She's Spanish.",about:"Предположи, что Мария итальянка, и добавь хвостик (Maria is Italian…).",f:"o:Maria is Italian,|a:isn't|s:she",ru:"Мария ведь итальянка?",acc:[],hint:"is → isn't, Maria → she.",alt:[["Is Maria Italian?","обычный вопрос"],["Maria's Italian, right?","разговорно"]]},
  {type:"tr",ru:"Ты не куришь, да?",f:"o:You don't smoke,|a:do|s:you",acc:[],hint:"Минус → плюс: do you?",alt:[["Do you smoke?","обычный вопрос"],["You're not a smoker, are you?","через be"]]},
  {type:"build",f:"o:He will help us,|a:won't|s:he",ru:"Он ведь нам поможет?",extra:["doesn't","will"],hint:"will → won't he.",alt:[["Will he help us?","обычный вопрос"],["He'll help us, right?","разговорно"]]},
  {type:"fix",wrong:"Tom is here, isn't Tom?",f:"o:Tom is here,|a:isn't|s:he",ru:"Том ведь здесь?",acc:[],hint:"В хвостике — местоимение: Tom → he.",alt:[["Is Tom here?","обычный вопрос"],["Tom's here, right?","разговорно"]]},
  {type:"choose",q:"You went to the party, ___?",opts:["didn't you","weren't you","don't you","did you"],ans:0,f:"o:You went to the party,|a:didn't|s:you",ru:"Ты ведь ходил на вечеринку?",cat:"tag_aux",hint:"went — прошлое без помощника → didn't.",why:{1:"went — глагол → did.",2:"Прошлое → did.",3:"Плюс → минус."},alt:[["Did you go to the party?","обычный вопрос"],["You were at the party, weren't you?","через be"]]},
  {type:"focus",s:"The film {was} boring.",f:"o:The film was boring,|a:wasn't|s:it",ru:"Фильм был скучный, да?",acc:[],hint:"was → wasn't, the film → it.",alt:[["Wasn't the film boring?","отрицательный вопрос"],["Boring film, wasn't it?","коротко"]]},
  {type:"build",f:"o:There's a bank near here,|a:isn't|s:there",ru:"Здесь ведь есть банк рядом?",extra:["it","doesn't"],hint:"There is → isn't there? (не it).",alt:[["Is there a bank near here?","обычный вопрос"],["There's a bank nearby, right?","разговорно"]]},
  {type:"tr",ru:"Ты закончил, да?",f:"o:You've finished,|a:haven't|s:you",acc:["You have finished haven't you"],hint:"have → haven't you.",alt:[["Have you finished?","обычный вопрос"],["All done?","разговорно"]]},
  {type:"choose",q:"Open the window, ___?",opts:["will you","do you","are you","won't I"],ans:0,f:"o:Open the window,|a:will|s:you",ru:"Открой окно, а?",cat:"tag_aux",hint:"После просьбы — will you? / could you?",why:{1:"После повелительного do не используют.",2:"После просьбы — will you."},alt:[["Could you open the window?","вежливо"],["Open the window, could you?","мягче"]]},
  {type:"answer",reply:"Yes, she does. Every Sunday.",about:"Предположи, что сестра ходит в церковь, и добавь хвостик (Your sister goes to church…).",f:"o:Your sister goes to church,|a:doesn't|s:she",ru:"Твоя сестра ведь ходит в церковь?",acc:[],hint:"goes → doesn't she.",alt:[["Does your sister go to church?","обычный вопрос"],["Your sister goes to church, right?","разговорно"]]},
  {type:"fix",wrong:"You went there, weren't you?",f:"o:You went there,|a:didn't|s:you",ru:"Ты ведь туда ходил?",acc:[],hint:"went — глагол → didn't you.",alt:[["Did you go there?","обычный вопрос"],["You were there, weren't you?","через be"]]},
  {type:"build",f:"o:She hasn't called,|a:has|s:she",ru:"Она ведь не звонила?",extra:["hasn't","did"],hint:"Минус → плюс: has she?",alt:[["Has she called?","обычный вопрос"],["No call from her, then?","разговорно"]]},
  {type:"focus",s:"You {can} cook.",f:"o:You can cook,|a:can't|s:you",ru:"Ты ведь умеешь готовить?",acc:[],hint:"can → can't you.",alt:[["Can you cook?","обычный вопрос"],["You're a good cook, aren't you?","через be"]]},
  {type:"choose",q:"Nobody called, ___?",opts:["did they","didn't they","did he","didn't he"],ans:0,f:"o:Nobody called,|a:did|s:they",ru:"Никто ведь не звонил?",cat:"tag_pron",hint:"nobody — минус → плюс. Местоимение для nobody — they.",why:{1:"nobody уже минус → нужен плюс.",2:"Для nobody / everyone — they."},alt:[["Did anyone call?","обычный вопрос"],["No calls?","коротко"]]},
  {type:"tr",ru:"Это твоя сумка, да?",f:"o:This is your bag,|a:isn't|s:it",acc:["This is your bag isn't this"],hint:"this → it в хвостике.",alt:[["Is this your bag?","обычный вопрос"],["This bag's yours, right?","разговорно"]]},
  {type:"fix",wrong:"He can't swim, can't he?",f:"o:He can't swim,|a:can|s:he",ru:"Он ведь не умеет плавать?",acc:[],hint:"Минус → плюс: can he?",alt:[["Can he swim?","обычный вопрос"],["He can't swim, right?","разговорно"]]},
  {type:"build",f:"o:You like pizza,|a:don't|s:you",ru:"Ты ведь любишь пиццу?",extra:["aren't","do"],hint:"like — глагол → don't you.",alt:[["Do you like pizza?","обычный вопрос"],["You're a pizza fan, aren't you?","через be"]]},
  {type:"choose",q:"It wasn't expensive, ___?",opts:["was it","wasn't it","did it","is it"],ans:0,f:"o:It wasn't expensive,|a:was|s:it",ru:"Это ведь было недорого?",cat:"tag_sign",hint:"Минус → плюс: was it?",why:{1:"Два минуса — нельзя.",2:"Помощник — was.",3:"Время то же — прошлое: was."},alt:[["Was it expensive?","обычный вопрос"],["It was cheap, wasn't it?","через cheap"]]},
  {type:"answer",reply:"Yes, we are! Two weeks in Spain.",about:"Предположи, что они едут в отпуск, и добавь хвостик (You're going on holiday…).",f:"o:You're going on holiday,|a:aren't|s:you",ru:"Вы ведь едете в отпуск?",acc:["You are going on holiday aren't you"],hint:"are → aren't you.",alt:[["Are you going on holiday?","обычный вопрос"],["Off on holiday, are you?","брит., разговорно"]]},
  {type:"focus",s:"They {have} two children.",f:"o:They have two children,|a:don't|s:they",ru:"У них ведь двое детей?",acc:["They have two children haven't they"],hint:"have («иметь») — обычный глагол → don't they? (брит. допускает haven't they).",alt:[["They've got two kids, haven't they?","брит."],["Do they have two children?","обычный вопрос"]]},
  {type:"tr",ru:"Давай закажем пиццу, а?",f:"o:Let's order pizza,|a:shall|s:we",acc:["Let's order a pizza shall we","Let's get pizza shall we","Let's get a pizza shall we"],hint:"Let's → shall we?",alt:[["Shall we order pizza?","обычный вопрос"],["How about pizza?","разговорно"]]},
  {type:"choose",q:"Everyone's here, ___?",opts:["aren't they","isn't he","isn't it","aren't we"],ans:0,f:"o:Everyone's here,|a:aren't|s:they",ru:"Все ведь здесь?",cat:"tag_pron",hint:"Для everyone в хвостике — they (и aren't).",why:{1:"Для everyone / nobody — they.",2:"it — для предметов."},alt:[["Is everyone here?","обычный вопрос"],["Are we all here?","через we"]]},
  {type:"fix",wrong:"You don't smoke, don't you?",f:"o:You don't smoke,|a:do|s:you",ru:"Ты ведь не куришь?",acc:[],hint:"Минус → плюс: do you?",alt:[["Do you smoke?","обычный вопрос"],["You're not a smoker, are you?","через be"]]},
  {type:"build",f:"o:It was a great day,|a:wasn't|s:it",ru:"Отличный был день, правда?",extra:["isn't","didn't"],hint:"was → wasn't it.",alt:[["What a great day!","восклицание"],["Wasn't it a great day?","отрицательный вопрос"]]},
  {type:"choose",q:"You'll call me, ___?",opts:["won't you","will you","don't you","shall you"],ans:0,f:"o:You'll call me,|a:won't|s:you",ru:"Ты ведь мне позвонишь?",cat:"tag_sign",hint:"will → won't you.",why:{1:"Плюс → минус.",2:"Помощник — will.",3:"shall с you не используют."},alt:[["Will you call me?","обычный вопрос"],["Promise you'll call?","разговорно"]]},
  {type:"answer",reply:"No, he hasn't. He's still at work.",about:"Предположи, что папа ещё не пришёл домой, и добавь хвостик (Dad hasn't come home yet…).",f:"o:Dad hasn't come home yet,|a:has|s:he",ru:"Папа ведь ещё не пришёл?",acc:[],hint:"Минус → плюс: has he?",alt:[["Is Dad home yet?","обычный вопрос"],["Dad's not back yet, is he?","через be"]]},
  {type:"tr",ru:"Ты устал, да?",f:"o:You're tired,|a:aren't|s:you",acc:["You are tired aren't you"],hint:"are → aren't you.",alt:[["Are you tired?","обычный вопрос"],["You look tired.","утверждение"]]},
  {type:"fix",wrong:"It was good, isn't it?",f:"o:It was good,|a:wasn't|s:it",ru:"Было хорошо, правда?",acc:[],hint:"Время то же: was → wasn't.",alt:[["Wasn't it good?","отрицательный вопрос"],["Good, wasn't it?","коротко"]]},
  {type:"focus",s:"She {should} see a doctor.",f:"o:She should see a doctor,|a:shouldn't|s:she",ru:"Ей ведь стоит сходить к врачу?",acc:[],hint:"should → shouldn't she.",alt:[["Should she see a doctor?","обычный вопрос"],["Don't you think she should see a doctor?","мягко"]]},
  {type:"choose",q:"There aren't any tickets left, ___?",opts:["are there","aren't there","are they","is it"],ans:0,f:"o:There aren't any tickets left,|a:are|s:there",ru:"Билетов ведь не осталось?",cat:"tag_pron",hint:"there → there, минус → плюс: are there?",why:{1:"Два минуса — нельзя.",2:"После there are в хвостике — there."},alt:[["Are there any tickets left?","обычный вопрос"],["Sold out?","коротко"]]},
  {type:"build",f:"o:You didn't forget,|a:did|s:you",ru:"Ты ведь не забыл?",extra:["didn't","do"],hint:"Минус → плюс: did you?",alt:[["Did you forget?","обычный вопрос"],["You remembered, didn't you?","через remember"]]},
  {type:"tr",ru:"Они уже уехали, да?",f:"o:They've already left,|a:haven't|s:they",acc:["They have already left haven't they","They've left haven't they","They left didn't they"],hint:"have → haven't they.",alt:[["Have they left?","обычный вопрос"],["They've gone, haven't they?","через go"]]},
  {type:"answer",reply:"I know! It's freezing.",about:"Скажи, что сегодня холодно, и добавь хвостик (It's cold today…).",f:"o:It's cold today,|a:isn't|s:it",ru:"Холодно сегодня, правда?",acc:["It is cold today isn't it","It's so cold today isn't it","It's freezing today isn't it"],hint:"is → isn't it.",alt:[["Cold today, isn't it?","коротко, small talk"],["Isn't it cold today?","отрицательный вопрос"]]},
  {type:"fix",wrong:"Let's go, will we?",f:"o:Let's go,|a:shall|s:we",ru:"Пойдём, а?",acc:[],hint:"Let's → shall we.",alt:[["Shall we go?","обычный вопрос"],["Shall we make a move?","разговорно"]]}
  ]
};
