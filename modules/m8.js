/* Module 8 — subject questions */
CONTENT.m8 = {
  title: "Вопрос к подлежащему",
  idea: "Если who или what — это тот, КТО делает действие, они просто встают на место подлежащего. Ничего не прыгает, do не нужен, глагол — как в утверждении.",
  catSec: {order:"compare",aux_missing:"compare",subj_do:"why",subj_verb:"verbform",do_form:"compare",verb_s:"verbform",verb_past:"verbform",be_verb:"compare",do_be:"compare",be_form:"verbform",wh:"words",short:"errors",article:"errors",other:"formula"},
  cats: {subj_do:["Лишний do в вопросе к подлежащему","Who / what — подлежащее? Тогда do / does / did не нужен: Who called you? What happened?"],
    subj_verb:["Форма глагола после who / what","После who / what-подлежащего глагол как с he / she / it: Who lives here? (с -s). В прошлом — вторая форма: Who called?"]},
  diagnose({t,u,e,segs}){
    const subjQ=!segs.some(s=>s.tag==="s");
    if(subjQ){
      const uDo=u.find(w=>DO.includes(w));
      if(uDo && !e.includes(uDo)) return {cat:"subj_do",msg:`Здесь who / what — само подлежащее (тот, кто делает). Помощник ${uDo} не нужен: глагол стоит сразу после вопросительного слова.`};
      const vt=(segs.find(s=>s.tag==="v")||{text:""}).text.split(" ")[0].toLowerCase();
      if(vt && !u.includes(vt)){
        if(vt.endsWith("s") && (u.includes(vt.slice(0,-1)) || u.includes(vt.replace(/es$/,"")))) return {cat:"subj_verb",msg:`Who / what в роли подлежащего — это «он / она». Поэтому глагол с -s: ${vt}.`};
        return {cat:"subj_verb",msg:`Глагол после who / what стоит в той же форме, что в утверждении: ${vt}.`};
      }
    } else {
      if(segs.some(s=>s.tag==="a") && !u.some(w=>AUXW.includes(w))) return {cat:"aux_missing",msg:"Здесь спрашиваем НЕ о том, кто делает, а о том, кого / что. Подлежащее другое — значит, нужен помощник do / does / did, как в обычном вопросе."};
    }
    return null;
  },
  check: [
    {q:"Who ___ you? — Anna called me.",opts:["called","did call","did you call"],ans:0,hint:"Who — тот, кто звонил (подлежащее). Do не нужен: Who called you?"},
    {q:"What ___? — There was an accident.",opts:["happened","did happen","happens did"],ans:0,hint:"What — подлежащее. What happened?"},
    {q:"Как правильно (кому ты звонил)?",opts:["Who did you call?","Who called you?","Who you called?"],ans:0,hint:"Подлежащее — you, а who — тот, кому звонили. Значит, нужен did: Who did you call?"}
  ],
  demos: [
    {name:"Кто сделал?", frames:[
      {t:[["anna","Anna","s"],["called","called","v"],["you","you","o"],["p",".","p"]], c:"Хотим узнать, <b>кто</b> звонил. Звонила Anna — это подлежащее."},
      {t:[["anna","Who","q"],["called","called","v"],["you","you","o"],["p","?","p"]], c:"Anna просто заменяем на <b>Who</b>. Больше ничего не меняется: ни did, ни перестановки. <i>Who called you?</i>"}]},
    {name:"Кого?", frames:[
      {t:[["you","You","s"],["called","called","v"],["anna","Anna","o"],["p",".","p"]], c:"Теперь хотим узнать, <b>кому</b> ты звонил. Anna — не подлежащее, а дополнение."},
      {t:[["anna","Who","q"],["you","you","s"],["called","called","v"],["p","?","p"]], c:"Anna → Who, в начало. Подлежащее you осталось — значит, нужен помощник…"},
      {t:[["anna","Who","q"],["did","did","a"],["you","you","s"],["called","call","v"],["p","?","p"]], c:"…как в модуле 3: <i>Who did you call?</i>"}]},
    {name:"Что случилось?", frames:[
      {t:[["acc","An accident","s"],["happened","happened","v"],["p",".","p"]], c:"Что-то произошло — это «что-то» и есть подлежащее."},
      {t:[["acc","What","q"],["happened","happened","v"],["p","?","p"]], c:"<i>What happened?</i> — без did. <i>What did happen?</i> говорят только с сильным ударением на did, когда спорят."}]},
    {name:"Ловушка: -s", frames:[
      {t:[["w","Who","q"],["live","live","v","bad"],["here","here","o"],["p","?","p"]], c:"«Кто здесь живёт?» Хочется сказать live — ведь живут, может, несколько человек."},
      {t:[["w","Who","q"],["live","lives","v"],["here","here","o"],["p","?","p"]], c:"Но who грамматически — «он». Поэтому <i>Who lives here?</i> — с -s, как he lives."}]}
  ],
  rules(){
    return [
    {id:"why",title:"Два разных «кто»",body:`
      <p>Сравни два вопроса:</p>
      <p>${ex("Who called you?")} — <b>Кто</b> тебе звонил? (who — тот, кто действует)</p>
      <p>${ex("Who did you call?")} — <b>Кому</b> ты звонил? (действуешь ты, who — тот, на кого направлено действие)</p>
      <p>Если who / what — это <b>подлежащее</b>, оно просто занимает его место. Порядок слов как в утверждении, помощник do не нужен.</p>`},
    {id:"formula",title:"Формула",body:`
      <p class="muted">Вопрос к подлежащему</p>
      <div class="formula">${slot("q","Who / What","вместо подлежащего")}${PLUS}${slot("v","called","глагол как в утверждении")}${PLUS}${slot("o","you","остальное")}<span class="plus">?</span></div>
      <p class="muted">Обычный вопрос (к дополнению)</p>
      <div class="formula">${slot("q","Who","вопрос. слово")}${PLUS}${slot("a","did","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","call","глагол")}<span class="plus">?</span></div>`},
    {id:"compare",title:"Как понять, какой вопрос нужен",body:`
      <p>Составь ответ. Если ответ начинается с того, о ком спрашиваешь, — это вопрос к подлежащему.</p>
      ${rows(["Ответ","Спрашиваем о…","Вопрос"],[
        [mn("<b>Tom</b> broke the window."),"том, кто сделал",ex("Who broke the window?")],
        [mn("Tom broke <b>the window</b>."),"том, что сломал",ex("What did Tom break?")],
        [mn("<b>Mary</b> loves Jack."),"той, кто любит",ex("Who loves Jack?")],
        [mn("Mary loves <b>Jack</b>."),"том, кого любит",ex("Who does Mary love?")],
        [mn("<b>The noise</b> woke me up."),"том, что разбудило",ex("What woke you up?")]])}
      <div class="note">Проверка по-русски: «Кто…?» (именительный падеж) → без do. «Кого, кому, что (сделал)…?» → с do / did.</div>`},
    {id:"verbform",title:"Форма глагола",body:`
      <p>Глагол стоит в той же форме, что в утверждении. Who и what считаются как <b>he / she / it</b>:</p>
      ${rows(["Время","Пример"],[
        ["Present Simple (-s!)",ex("Who lives here?")+" "+ex("What makes you happy?")],
        ["Past Simple (2-я форма)",ex("Who won?")+" "+ex("What happened?")],
        ["be",ex("Who is there?")+" "+ex("What was that?")],
        ["Continuous",ex("Who is singing?")],["Perfect",ex("Who has taken my pen?")],
        ["Модальные, will",ex("Who can help me?")+" "+ex("What will happen?")]])}
      <p>Даже если ответ — несколько человек, в вопросе глагол с -s: <span class="mono">Who wants coffee? — We all do!</span></p>`},
    {id:"words",title:"Какие слова бывают подлежащим",body:`
      ${rows(["Слово","Пример"],[
        ["Who",ex("Who told you?")],["What",ex("What happened?")],
        ["Which + сущ.",ex("Which team won?")],["Whose + сущ.",ex("Whose car is blocking the road?")],
        ["How many + сущ.",ex("How many people came?")],["What + сущ.",ex("What bus goes to the airport?")]])}`},
    {id:"phrases",title:"Самые частые вопросы к подлежащему",body:`
      ${rows(["Вопрос","Перевод"],[
        [ex("What happened?"),"Что случилось?"],[ex("What's going on?"),"Что происходит?"],
        [ex("Who knows?"),"Кто знает?"],[ex("Who wants some tea?"),"Кто хочет чаю?"],
        [ex("What's wrong?"),"Что не так?"],[ex("Who said that?"),"Кто это сказал?"],
        [ex("What made you change your mind?"),"Что заставило тебя передумать?"],[ex("Who's next?"),"Кто следующий?"]])}`},
    {id:"short",title:"Как отвечать",body:`
      <p>Отвечают подлежащим + помощником: <span class="mono">Who called? — <b>Anna did.</b></span> <span class="mono">Who wants tea? — <b>I do!</b></span> <span class="mono">Who's there? — <b>It's me.</b></span></p>
      <p>Или просто именем: <span class="mono">Who broke it? — Tom.</span></p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Who занимает чужое место","В вопросе к подлежащему who / what просто садится на место того, кто делает. Остальные слова не двигаются.",["Who called you?"]],
      ["mem","«Кто?» — без do, «кого?» — с do","Именительный падеж (кто, что сделало) → без помощника. Кого, кому, что (сделал) → с помощником.",[]],
      ["mem","Who — всегда «он»","Who lives here? Who wants tea? Глагол с -s, даже если ответ — «мы все».",["Who wants tea?"]],
      ["mem","What happened — заучи","Самый частый вопрос к подлежащему. Не What did happen и не What happens.",["What happened?"]],
      ["obs","Did с ударением — для спора","What DID happen? — «Так что же всё-таки случилось?» Это эмоция, а не обычный вопрос.",[]],
      ["obs","What's going on? = What is happening?","Тоже вопрос к подлежащему, только в Continuous. Звучит живо.",["What's going on?"]],
      ["obs","Короткий ответ — с помощником","Who did it? — I did. Who's coming? — We are. Помощник берётся из ответа, не из вопроса.",[]],
      ["obs","What made you…? — мягкое «почему»","What made you leave? звучит мягче, чем Why did you leave?",["What made you leave?"]],
      ["hack","Проверь ответом","Представь ответ. Стоит искомое слово первым? Значит, вопрос к подлежащему — без do.",[]],
      ["hack","Who's in? — кто участвует","На работе: «Who's in for lunch?» — кто идёт на обед? Готовая фраза.",["Who's in?"]],
      ["hack","Which one works? — для выбора","Which bus goes to the centre? Which one is better? Подлежащее Which + сущ.",["Which one is better?"]],
      ["hack","How many people…? — тоже подлежащее","How many people came? — без did, глагол во второй форме.",["How many people came?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Who did call you?","Who called you?","who — подлежащее, did не нужен."],["What did happen?","What happened?","what — подлежащее."],
      ["Who live here?","Who lives here?","who = he → -s."],["Who does live here?","Who lives here?","does лишний."],
      ["What happens yesterday?","What happened yesterday?","Прошлое → вторая форма."],["Who you called?","Who did you call?","Кому звонил → нужен did."],
      ["Who did tell you?","Who told you?","who — подлежащее."],["How many people did come?","How many people came?","Подлежащее → без did."],
      ["Which team did win?","Which team won?","Which team — подлежащее."],["What makes you happy? — It make me…","What makes you happy?","what = it → -s."],
      ["Who want coffee?","Who wants coffee?","who = he → -s."],["Who are coming?","Who is coming?","who — единственное число."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:Who|v:called|o:you",ru:"Кто тебе звонил?",extra:["did","call"],hint:"Who — тот, кто звонил. Do не нужен: Who + called + you.",alt:[["Who was that on the phone?","через be"],["Who rang you?","брит."]]},
  {type:"build",f:"q:What|v:happened",ru:"Что случилось?",extra:["did","happen"],hint:"What — подлежащее. Глагол во второй форме, без did.",alt:[["What's wrong?","через be"],["What's going on?","«что происходит?»"],["Is everything OK?","мягко"]]},
  {type:"choose",q:"Who ___ here? — The Smiths.",opts:["lives","live","does live","living"],ans:0,f:"q:Who|v:lives|o:here",ru:"Кто здесь живёт?",cat:"subj_verb",hint:"Who = «он» → lives, с -s. Do не нужен.",why:{1:"Who грамматически единственное число → lives.",2:"Who — подлежащее, does не нужен.",3:"Нужен глагол в форме Present Simple: lives."},alt:[["Whose house is this?","через whose"],["Who owns this house?","«кто владелец»"]]},
  {type:"choose",q:"Who ___ you? — I called Anna.",opts:["did you call","called","you called","did call"],ans:0,f:"q:Who|a:did|s:you|v:call",ru:"Кому ты звонил?",cat:"subj_do",hint:"Звонил ты (подлежащее — you), а who — кому. Значит, нужен did: Who did you call?",why:{1:"Who called you — «кто тебе звонил». А вопрос — кому звонил ты.",2:"Без did получается утверждение.",3:"Who did call — это «кто же звонил» с ударением."},alt:[["Who were you talking to?","предлог в конце"],["Who was on the phone?","через be"]]},
  {type:"tr",ru:"Кто это сказал?",f:"q:Who|v:said|o:that",acc:["Who said this"],hint:"Who — подлежащее (кто сказал) → Who + said, без did.",alt:[["Who told you that?","через tell"],["Where did you hear that?","«откуда ты это слышал?»"]]},
  {type:"fix",wrong:"Who did call you?",f:"q:Who|v:called|o:you",ru:"Кто тебе звонил?",acc:[],hint:"Who — тот, кто звонил. Did не нужен.",alt:[["Who rang you?","брит."],["Who was it on the phone?","через be"]]},
  {type:"focus",s:"{Tom} broke the window.",f:"q:Who|v:broke|o:the window",ru:"Кто разбил окно?",acc:[],hint:"Tom — подлежащее → заменяем на Who. Глагол как был: broke.",alt:[["Who's broken the window?","Present Perfect: результат"],["Who did this?","разговорно"]]},
  {type:"answer",reply:"Anna did. She called this morning.",about:"Спроси, кто звонил (call).",f:"q:Who|v:called",ru:"Кто звонил?",acc:["Who phoned","Who rang"],hint:"«Anna did» — значит, вопрос к подлежащему: Who + called.",alt:[["Did anyone call?","общий вопрос"],["Who was on the phone?","через be"]]},
  {type:"build",f:"q:What|v:made|o:you change your mind",ru:"Что заставило тебя передумать?",extra:["did","make"],hint:"What — подлежащее (что заставило). made, без did.",alt:[["Why did you change your mind?","через why"],["What changed your mind?","короче"]]},
  {type:"choose",q:"What ___ you up? — The noise.",opts:["woke","did wake","does wake","waked"],ans:0,f:"q:What|v:woke|o:you up",ru:"Что тебя разбудило?",cat:"subj_do",hint:"What — то, что разбудило (подлежащее). Без did: What woke you up?",why:{1:"did лишний: what — подлежащее.",3:"waked — такой формы нет. wake → woke."},alt:[["Why did you wake up?","через why"],["What was that noise?","через be"]]},
  {type:"tr",ru:"Кто хочет кофе?",f:"q:Who|v:wants|o:coffee",acc:["Who wants some coffee","Who would like coffee","Who would like some coffee","Who wants a coffee"],hint:"Who = «он» → wants, с -s.",alt:[["Who'd like some coffee?","вежливо"],["Anyone for coffee?","разговорно"]]},
  {type:"fix",wrong:"Who live in this house?",f:"q:Who|v:lives|o:in this house",ru:"Кто живёт в этом доме?",acc:[],hint:"Who = «он» → lives.",alt:[["Whose house is this?","через whose"],["Who owns this house?","«кто владелец»"]]},
  {type:"focus",s:"{The film} made her cry.",f:"q:What|v:made|o:her cry",ru:"Что заставило её плакать?",acc:[],hint:"The film — подлежащее → What. Глагол как был: made.",alt:[["Why did she cry?","через why"],["What upset her?","через upset"]]},
  {type:"build",f:"q:Who|v:won|o:the game",ru:"Кто выиграл игру?",extra:["did","win"],hint:"Who — тот, кто выиграл. won, без did.",alt:[["Which team won?","через which"],["What was the score?","через be"]]},
  {type:"choose",q:"How many people ___ to the meeting?",opts:["came","did come","did they come","comes"],ans:0,f:"q:How many people|v:came|o:to the meeting",ru:"Сколько человек пришло на встречу?",cat:"subj_do",hint:"How many people — подлежащее. Без did: came.",why:{1:"Подлежащее — how many people, did не нужен.",2:"they лишнее: подлежащее уже есть — how many people."},alt:[["Was the meeting busy?","через be"],["Were there many people at the meeting?","через there"]]},
  {type:"choose",q:"What ___ you? — Nothing, I'm fine.",opts:["is worrying","are worrying","do worry","worries you do"],ans:0,f:"q:What|a:is|v:worrying|o:you",ru:"Что тебя беспокоит?",cat:"subj_verb",hint:"What — подлежащее (= it) → is worrying.",why:{1:"what = it → is, а не are.",2:"Подлежащее what, do не нужен."},alt:[["What's bothering you?","разговорно"],["What's on your mind?","«о чём думаешь?»"]]},
  {type:"answer",reply:"I did. Sorry!",about:"Спроси, кто съел торт (eat the cake).",f:"q:Who|v:ate|o:the cake",ru:"Кто съел торт?",acc:["Who has eaten the cake","Who's eaten the cake"],hint:"«I did» → вопрос к подлежащему: Who + ate + the cake.",alt:[["Who's eaten the cake?","Present Perfect: торта нет сейчас"],["Where's the cake gone?","разговорно"]]},
  {type:"tr",ru:"Кого ты видел вчера?",f:"q:Who|a:did|s:you|v:see|t:yesterday",acc:["Whom did you see yesterday"],hint:"Видел ты (подлежащее), who — кого. Значит, did: Who did you see?",alt:[["Did you see anyone yesterday?","общий вопрос"],["Who did you bump into yesterday?","«случайно встретил»"]]},
  {type:"build",f:"q:Which team|v:won",ru:"Какая команда выиграла?",extra:["did","win"],hint:"Which team — подлежащее → won, без did.",alt:[["Who won?","короче"],["What was the result?","через be"]]},
  {type:"fix",wrong:"What did happen yesterday?",f:"q:What|v:happened|t:yesterday",ru:"Что случилось вчера?",acc:[],hint:"What — подлежащее. Без did: What happened?",alt:[["What went on yesterday?","разговорно"],["Did something happen yesterday?","общий вопрос"]]},
  {type:"choose",q:"Who ___ to the party tonight?",opts:["is coming","are coming","do come","coming"],ans:0,f:"q:Who|a:is|v:coming|o:to the party|t:tonight",ru:"Кто придёт на вечеринку сегодня?",cat:"subj_verb",hint:"Who = «он» → is coming.",why:{1:"Who — единственное число → is, даже если придут многие.",2:"Это Continuous и вопрос к подлежащему — do не нужен.",3:"Без is не хватает помощника Continuous."},alt:[["Who's going to the party?","разговорно"],["Who's invited?","через be"]]},
  {type:"focus",s:"{My sister} told me about it.",f:"q:Who|v:told|o:you about it",ru:"Кто тебе об этом рассказал?",acc:["Who told you"],hint:"Подлежащее → Who. my sister told me → Who told you.",alt:[["How did you find out?","через how"],["Where did you hear about it?","через where"]]},
  {type:"build",f:"q:What|v:makes|o:you happy",ru:"Что делает тебя счастливым?",extra:["does","make"],hint:"What = it → makes, с -s.",alt:[["What do you enjoy?","через enjoy"],["What puts a smile on your face?","разговорно"]]},
  {type:"tr",ru:"Что тебе сказала мама?",f:"q:What|a:did|s:your mum|v:say",acc:["What did your mother say","What did your mom say","What did your mum tell you","What did your mother tell you"],hint:"Говорила мама (подлежащее), what — что сказала. Нужен did.",alt:[["What did your mum tell you?","tell + кому"],["What was your mum's answer?","через be"]]},
  {type:"choose",q:"What ___ you to learn English?",opts:["made","did make","did you make","makes did"],ans:0,f:"q:What|v:made|o:you learn English",ru:"Что заставило тебя учить английский?",cat:"subj_do",hint:"What — подлежащее. Без did: What made you…",why:{1:"what — подлежащее, did лишний.",2:"you здесь не подлежащее."},alt:[["Why did you decide to learn English?","через why"],["What got you into English?","разговорно"]]},
  {type:"answer",reply:"The red one. It's faster.",about:"Спроси, какая машина выиграла гонку (which car, win the race).",f:"q:Which car|v:won|o:the race",ru:"Какая машина выиграла гонку?",acc:["Which car won"],hint:"Which car — подлежащее → won, без did.",alt:[["Who won the race?","через who"],["Which one came first?","разговорно"]]},
  {type:"fix",wrong:"Who does know the answer?",f:"q:Who|v:knows|o:the answer",ru:"Кто знает ответ?",acc:[],hint:"Who — подлежащее, does лишний. Who = «он» → knows.",alt:[["Does anyone know the answer?","общий вопрос"],["Any ideas?","разговорно"]]},
  {type:"build",f:"q:Who|v:wrote|o:this book",ru:"Кто написал эту книгу?",extra:["did","write"],hint:"Who — тот, кто написал → wrote, без did.",alt:[["Who's the author of this book?","через be"],["Who is this book by?","предлог в конце"]]},
  {type:"focus",s:"Kate loves {Jack}.",f:"q:Who|a:does|s:Kate|v:love",ru:"Кого любит Кейт?",acc:["Whom does Kate love"],hint:"Jack — не подлежащее (подлежащее — Kate). Значит, нужен does: Who does Kate love?",alt:[["Who is Kate in love with?","предлог в конце"],["Who's Kate's boyfriend?","через be"]]},
  {type:"choose",q:"Who ___ my pen? I can't find it.",opts:["has taken","have taken","did taken","has took"],ans:0,f:"q:Who|a:has|v:taken|o:my pen",ru:"Кто взял мою ручку?",cat:"subj_verb",hint:"Who = «он» → has + taken.",why:{1:"Who — единственное число → has.",2:"did + taken не сочетаются.",3:"После has — третья форма: taken."},alt:[["Who took my pen?","Past Simple"],["Has anyone seen my pen?","общий вопрос"]]},
  {type:"tr",ru:"Что произошло на работе?",f:"q:What|v:happened|o:at work",acc:[],hint:"What — подлежащее → happened, без did.",alt:[["How was work?","через be"],["Did something happen at work?","общий вопрос"]]},
  {type:"fix",wrong:"Who want to go first?",f:"q:Who|v:wants|o:to go first",ru:"Кто хочет пойти первым?",acc:[],hint:"Who = «он» → wants.",alt:[["Who'd like to go first?","вежливо"],["Any volunteers?","разговорно"]]},
  {type:"build",f:"q:Who|a:is|v:sitting|o:next to you",ru:"Кто сидит рядом с тобой?",extra:["does","are"],hint:"Who = «он» → is + sitting.",alt:[["Who's that next to you?","разговорно"],["Who are you sitting with?","к дополнению, предлог в конце"]]},
  {type:"choose",q:"What ___ in the box?",opts:["is","does","are","do"],ans:0,f:"q:What|a:is|o:in the box",ru:"Что в коробке?",cat:"subj_verb",hint:"What = it → is.",alt:[["What's inside?","разговорно"],["What have you got in the box?","через have got"]]},
  {type:"answer",reply:"Nothing. I'm just tired.",about:"Спроси, что случилось с ним (what, happen, to you).",f:"q:What|v:happened|o:to you",ru:"Что с тобой случилось?",acc:["What is wrong with you","What is the matter with you","What has happened to you","What's wrong","What happened"],hint:"What — подлежащее → happened.",alt:[["What's wrong?","через be"],["Are you OK?","мягко"]]},
  {type:"focus",s:"{The storm} damaged the roof.",f:"q:What|v:damaged|o:the roof",ru:"Что повредило крышу?",acc:[],hint:"Подлежащее → What. Глагол как был: damaged.",alt:[["How did the roof get damaged?","через how"],["What happened to the roof?","через happen"]]},
  {type:"tr",ru:"Кто тебе помог?",f:"q:Who|v:helped|o:you",acc:[],hint:"Who — тот, кто помог → helped, без did.",alt:[["Did anyone help you?","общий вопрос"],["Did you do it on your own?","«сам?»"]]},
  {type:"choose",q:"Who ___ you this present?",opts:["gave","did give","did you give","give"],ans:0,f:"q:Who|v:gave|o:you this present",ru:"Кто тебе подарил этот подарок?",cat:"subj_do",hint:"Who — тот, кто подарил → gave.",why:{1:"Who — подлежащее, did лишний.",2:"Who did you give — «кому ты подарил».",3:"Прошлое → gave."},alt:[["Who's it from?","предлог в конце"],["Where did you get it?","через where"]]},
  {type:"fix",wrong:"Who you met at the party?",f:"q:Who|a:did|s:you|v:meet|o:at the party",ru:"С кем ты познакомился на вечеринке?",acc:["Whom did you meet at the party"],hint:"Познакомился ты (подлежащее you) → нужен did: Who did you meet?",alt:[["Did you meet anyone nice at the party?","общий вопрос"],["Who was at the party?","к подлежащему"]]},
  {type:"build",f:"q:How many people|v:work|o:here",ru:"Сколько людей здесь работает?",extra:["do","works"],hint:"How many people — подлежащее (они) → work, без do.",alt:[["How big is the team?","через be"],["How many employees are there?","через there"]]},
  {type:"choose",q:"What ___ to your phone? It's broken.",opts:["happened","did happen","happens","has happen"],ans:0,f:"q:What|v:happened|o:to your phone",ru:"Что случилось с твоим телефоном?",cat:"subj_do",hint:"What — подлежащее → happened.",why:{1:"did лишний — what подлежащее.",2:"Это уже произошло → happened.",3:"После has — happened (третья форма)."},alt:[["What's wrong with your phone?","через be"],["How did you break your phone?","к дополнению, с did"]]},
  {type:"answer",reply:"My boss does. Not me.",about:"Спроси, кто принимает решения (make the decisions).",f:"q:Who|v:makes|o:the decisions",ru:"Кто принимает решения?",acc:["Who makes decisions","Who decides"],hint:"«My boss does» → Who + makes (с -s).",alt:[["Who's in charge?","через be"],["Who has the final say?","«за кем последнее слово»"]]},
  {type:"tr",ru:"Кто следующий?",f:"q:Who|a:is|o:next",acc:[],hint:"Who + is + next.",alt:[["Who's next?","разговорно"],["Who's up next?","разговорно"]]},
  {type:"fix",wrong:"What did make you laugh?",f:"q:What|v:made|o:you laugh",ru:"Что тебя рассмешило?",acc:[],hint:"What — подлежащее. Без did: What made you laugh?",alt:[["What's so funny?","через be"],["Why are you laughing?","через why"]]},
  {type:"build",f:"q:Who|a:can|v:help|o:me",ru:"Кто может мне помочь?",extra:["does","helps"],hint:"Who + can + help. Модальный работает как обычно.",alt:[["Can anyone help me?","общий вопрос"],["Could someone give me a hand?","вежливо"]]},
  {type:"focus",s:"I met {your brother} yesterday.",f:"q:Who|a:did|s:you|v:meet|t:yesterday",ru:"Кого ты встретил вчера?",acc:["Whom did you meet yesterday"],hint:"Your brother — не подлежащее. Значит, did: Who did you meet?",alt:[["Did you see anyone yesterday?","общий вопрос"],["Who did you run into yesterday?","разговорно"]]},
  {type:"tr",ru:"Что тебя беспокоит?",f:"q:What|v:worries|o:you",acc:["What is worrying you","What is bothering you","What bothers you"],hint:"What = it → worries.",alt:[["What's bothering you?","разговорно"],["Is something on your mind?","мягко"]]},
  {type:"answer",reply:"Number 12 goes there.",about:"Спроси, какой автобус идёт в аэропорт (which bus, go to the airport).",f:"q:Which bus|v:goes|o:to the airport",ru:"Какой автобус идёт в аэропорт?",acc:["What bus goes to the airport"],hint:"Which bus — подлежащее (= it) → goes.",alt:[["How do I get to the airport?","через get"],["Is there a bus to the airport?","через there"]]},
  {type:"tr",ru:"Что тебя удивило?",f:"q:What|v:surprised|o:you",acc:["What surprised you most"],hint:"What — то, что удивило (подлежащее) → surprised, без did.",alt:[["Were you surprised by anything?","общий вопрос"],["What was the biggest surprise?","через be"]]},
  {type:"fix",wrong:"How many people did come?",f:"q:How many people|v:came",ru:"Сколько людей пришло?",acc:[],hint:"How many people — подлежащее. Без did.",alt:[["Was it busy?","через be"],["Did many people come?","общий вопрос"]]}
  ]
};
