/* Module 16 — advanced cases */
CONTENT.m16 = {
  title: "Сложные случаи",
  idea: "Сложные вопросы собраны из знакомых деталей: прыгает всегда только первый помощник. How long have you been waiting? What would you do if…? А после How come и What if порядок вообще прямой.",
  catSec: {order:"why",aux_missing:"why",perfcont:"perfcont",cond:"cond",howcome:"nodo",v3:"pastperf",do_form:"usedto",verb_s:"why",verb_past:"usedto",be_verb:"why",do_be:"why",be_form:"perfcont",modal:"cond",modal_to:"cond",subj_do:"else",wh:"else",short:"errors",article:"errors",other:"why"},
  cats: {howcome:["How come / How about / What if","После How come и What if — прямой порядок. После How about / What about — глагол с -ing."],
    cond:["Условные вопросы","Воображаемое → would; в части с if — прошедшая форма (if you won, if you were). Прошлое, которое не случилось → would have + третья форма."],
    perfcont:["Perfect Continuous","Процесс, который длится до сих пор: How long have you been waiting? — have / has + been + -ing."]},
  diagnose({t,u}){
    const em=norm(mainText(t)).split(" ");
    if(em[0]==="how" && em[1]==="come" && AUXW.includes(u[2]) && !AUXW.includes(em[2])) return {cat:"howcome",msg:"После How come порядок прямой, как в утверждении: How come you're late? — без перестановки."};
    if(em[0]==="what" && em[1]==="if" && u.includes("will") && !em.includes("will")) return {cat:"cond",msg:"После What if — как после if: без will. What if it rains?"};
    if((em[0]==="how"||em[0]==="what") && em[1]==="about" && em[2] && em[2].endsWith("ing") && !u.includes(em[2])) return {cat:"howcome",msg:`После How about / What about — глагол с -ing: ${em[2]}.`};
    const uIf=u.indexOf("if"), eIf=em.indexOf("if");
    if(uIf>-1 && eIf>-1){
      const tail=u.slice(uIf+1, uIf+5), etail=em.slice(eIf+1, eIf+5);
      if((tail.includes("will")||tail.includes("would")) && !etail.includes("will") && !etail.includes("would")) return {cat:"cond",msg:"В части с if не ставят will / would: if you won, if you had time, if you were me."};
      if(etail.includes("were") && tail.includes("are")) return {cat:"cond",msg:"Воображаемое условие → прошедшая форма: if you were (не are)."};
      if(etail.includes("could") && tail.includes("can")) return {cat:"cond",msg:"«Если бы мог» → if you could (не can)."};
    }
    if(em.includes("would") && !u.includes("would") && u.includes("will")) return {cat:"cond",msg:"Это воображаемая ситуация («бы») → would, а не will."};
    const wi=em.indexOf("would");
    if(wi>-1 && em.includes("have") && em.indexOf("have")>wi && !u.includes("have")) return {cat:"cond",msg:"Про прошлое, которое не случилось: would have + третья форма — What would you have done?"};
    if(em.includes("been") && em.some(w=>w.endsWith("ing")&&w.length>4) && !u.includes("been")) return {cat:"perfcont",msg:"Процесс, который длится до сих пор (или до момента в прошлом): have / has / had + been + -ing."};
    return null;
  },
  check: [
    {q:"How long have you ___ waiting?",opts:["been","be","being"],ans:0,hint:"Perfect Continuous: have + been + -ing."},
    {q:"What would you do if you ___ the lottery?",opts:["won","will win","would win"],ans:0,hint:"В части с if — прошедшая форма: won."},
    {q:"Как правильно?",opts:["How come you're late?","How come are you late?","How come do you late?"],ans:0,hint:"После How come — прямой порядок."}
  ],
  demos: [
    {name:"Perfect Continuous", frames:[
      {t:[["you","You","s"],["have","have","a"],["been","been waiting","v"],["long","for an hour","o"],["p",".","p"]], c:"Процесс длится до сих пор: <b>have been waiting</b>."},
      {t:[["h","How long","q"],["have","have","a"],["you","you","s"],["been","been waiting","v"],["p","?","p"]], c:"Прыгает только первый помощник — <b>have</b>. been waiting остаётся: <i>How long have you been waiting?</i>"}]},
    {name:"Would + if", frames:[
      {t:[["w","What","q"],["would","would","a"],["you","you","s"],["do","do","v"],["p","?","p"]], c:"<i>What would you do?</i> — «Что бы ты сделал?» Would прыгает, как модальный."},
      {t:[["w","What","q"],["would","would","a"],["you","you","s"],["do","do","v"],["if","if you won","o"],["p","?","p"]], c:"Добавляем условие. В части с if — <b>прошедшая форма</b> (won), не will и не would: <i>What would you do if you won?</i>"}]},
    {name:"Would have", frames:[
      {t:[["w","What","q"],["would","would","a"],["you","you","s"],["do","do","v"],["p","?","p"]], c:"Воображаемое настоящее: что бы ты сделал (сейчас)."},
      {t:[["w","What","q"],["would","would","a"],["you","you","s"],["do","have done","v"],["p","?","p"]], c:"Воображаемое прошлое: <b>would have + третья форма</b> — <i>What would you have done?</i> («Что бы ты сделал тогда?»)"}]},
    {name:"How come", frames:[
      {t:[["w","Why","q"],["are","are","a"],["you","you","s"],["late","late","o"],["p","?","p"]], c:"Обычный вопрос: are прыгает вперёд."},
      {t:[["w","How come","q"],["you","you","s"],["are","are","a"],["late","late","o"],["p","?","p"]], c:"С <b>How come</b> порядок прямой: <i>How come you're late?</i> Это разговорное «как так вышло, что…»."}]}
  ],
  rules(){
    return [
    {id:"why",title:"Сложное = знакомое × 2",body:`
      <p>Сложные вопросы не требуют новых правил. Это комбинации того, что ты уже знаешь: помощник + ещё помощник + глагол. Ключевое правило одно — <b>вперёд прыгает только первый помощник</b>:</p>
      ${rows(["Утверждение","Вопрос"],[
        [mn("You <b>have</b> been waiting."),ex("Have you been waiting?")],[mn("She <b>had</b> left."),ex("Had she left?")],
        [mn("You <b>would</b> have done it."),ex("Would you have done it?")],[mn("It <b>will</b> be finished."),ex("Will it be finished?")]])}`},
    {id:"perfcont",title:"Perfect Continuous: «давно ли и до сих пор»",body:`
      <p>Процесс начался в прошлом и <b>длится до сих пор</b> (или только что закончился и видны следы):</p>
      <div class="formula">${slot("q","How long","вопрос. слово")}${PLUS}${slot("a","have / has","помощник")}${PLUS}${slot("s","you","подлежащее")}${PLUS}${slot("v","been waiting","been + -ing")}<span class="plus">?</span></div>
      <p>${ex("How long have you been learning English?")} ${ex("Have you been crying?")} ${ex("What have you been doing lately?")}</p>
      <div class="note">${strike("How long are you waiting?")} — по-русски «ждёшь» в настоящем, но по-английски нужен Perfect Continuous.</div>`},
    {id:"pastperf",title:"Past Perfect: «до того момента»",body:`
      <p>Действие случилось <b>раньше другого</b> прошлого момента: <span class="mono">had + третья форма</span>.</p>
      <p>${ex("Had you ever been abroad before 2020?")} ${ex("What had happened before you arrived?")}</p>
      <p>С процессом: ${ex("How long had you been waiting when the bus came?")}</p>`},
    {id:"cond",title:"Условные вопросы: «что бы ты…?»",body:`
      ${rows(["Ситуация","Формула","Пример"],[
        ["Воображаемое сейчас","would + глагол … if + прошедшая форма",ex("What would you do if you won the lottery?")],
        ["«Если бы ты мог»","if you could …, would…",ex("If you could fly, where would you go?")],
        ["«На моём месте»","if you were me",ex("What would you do if you were me?")],
        ["Воображаемое прошлое","would have + V3 … if + had + V3",ex("What would you have done if you had been there?")],
        ["Вежливая просьба","Would you mind if I + прошедшая форма",ex("Would you mind if I opened the window?")]])}
      <div class="note">Главное правило: в части с <b>if</b> не бывает will и would. ${strike("if you will win")} → <span class="mono">if you won</span>.</div>`},
    {id:"usedto",title:"Used to и have to в вопросах",body:`
      <p><b>Used to</b> («раньше, бывало»): в вопросе — <span class="mono">Did you use to…?</span> (без d после did).</p>
      <p>${ex("Did you use to play football?")} ${ex("Where did you use to live?")}</p>
      <p><b>Have to</b> («приходилось»): ${ex("What did you have to do?")} ${ex("Do you have to work tomorrow?")}</p>`},
    {id:"nodo",title:"Вопросы без перестановки",body:`
      ${rows(["Начало","Что после","Пример"],[
        ["How come…?","прямой порядок",ex("How come you didn't call?")],
        ["What if…?","прямой порядок, без will",ex("What if it rains?")],
        ["How about…? / What about…?","-ing или существительное",ex("How about going for a walk?")+" "+ex("What about tomorrow?")]])}
      <p>Это разговорные «спасатели»: если запутался в помощниках, How come и What if выручат.</p>`},
    {id:"else",title:"Else: кто ещё, что ещё",body:`
      <p><b>Else</b> = «ещё» и стоит сразу после вопросительного слова:</p>
      ${rows(["Вопрос","Перевод"],[
        [ex("Who else is coming?"),"Кто ещё придёт?"],[ex("What else do you need?"),"Что ещё тебе нужно?"],
        [ex("Where else have you been?"),"Где ещё ты был?"],[ex("Who else knows about this?"),"Кто ещё знает об этом?"]])}
      <p>Who else / What else могут быть подлежащим — тогда без do: <span class="mono">Who else knows?</span></p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Прыгает только первый","Have you been…? Would you have…? Will it be…? Остальные помощники стоят на месте.",[]],
      ["mem","В if — без will и would","if you won, if you were, if you had time. Will и would живут только во второй части.",[]],
      ["mem","Would have = «бы» про прошлое","What would you have done? — «Что бы ты сделал тогда?»",["What would you have done?"]],
      ["mem","How long … been + -ing","«Как давно ты (делаешь)» → How long have you been + -ing.",["How long have you been working here?"]],
      ["obs","What would you do if…? — лучшая тема для разговора","Вопросы-фантазии: If you could live anywhere…, What would you do with a million… Отличный small talk.",["If you could live anywhere, where would you live?"]],
      ["obs","What have you been up to? = Как жизнь?","Типичный вопрос при встрече после перерыва.",["What have you been up to?"]],
      ["obs","If I were you — а не was","В условиях с I и he носители часто говорят were: If I were you…",["If I were you, I'd go."]],
      ["obs","Have you been crying?","Perfect Continuous для следов: глаза красные — Have you been crying? Руки в краске — Have you been painting?",[]],
      ["hack","How come — спасательный круг","Не уверен в помощнике? How come + обычное утверждение: How come you're here?",["How come you're here?"]],
      ["hack","What if…? — предложить вариант","What if we leave earlier? — мягкое предложение.",["What if we leave earlier?"]],
      ["hack","How about + -ing","How about meeting tomorrow? — предложение без грамматических рисков.",["How about meeting tomorrow?"]],
      ["hack","What else? — продлить разговор","Собеседник закончил? What else? / Anything else? — и он продолжит.",["What else?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["How long are you waiting?","How long have you been waiting?","До сих пор → have been + -ing."],["What would you do if you will win?","What would you do if you won?","В if — без will."],
      ["How come are you late?","How come you're late?","После How come — прямой порядок."],["What if it will rain?","What if it rains?","После What if — без will."],
      ["How about to go?","How about going?","После How about — -ing."],["Did you used to smoke?","Did you use to smoke?","После did — use."],
      ["If you would have time…","If you had time…","В if — без would."],["What would you do if you are rich?","What would you do if you were rich?","Воображаемое → were."],
      ["What would you done?","What would you have done?","Нужен have."],["Have you been cry?","Have you been crying?","После been — -ing."],
      ["Who else does know?","Who else knows?","Who else — подлежащее, без do."],["If you can fly, where would you go?","If you could fly, where would you go?","«Если бы мог» → could."]])}
    ];
  },
  tasks: [
  {type:"build",f:"q:How long|a:have|s:you|v:been waiting",ru:"Как долго ты ждёшь?",extra:["are","did"],hint:"Процесс до сейчас → How long + have + you + been waiting.",alt:[["Have you been waiting long?","общий вопрос"],["How long have you been here?","через be"]]},
  {type:"build",f:"q:What|a:would|s:you|v:do|o:if you won the lottery",ru:"Что бы ты сделал, если бы выиграл в лотерею?",extra:["will","win"],hint:"Воображаемое: What would you do + if you won (прошедшая форма).",alt:[["If you won the lottery, what would you do?","if-часть в начале"],["What's the first thing you'd buy?","разговорно"]]},
  {type:"choose",q:"Have you ___ crying?",opts:["been","being","be","were"],ans:0,f:"a:Have|s:you|v:been crying",ru:"Ты что, плакала?",cat:"perfcont",hint:"Have + you + been + -ing — процесс, следы которого видны сейчас.",why:{1:"being — не после have.",2:"После have — been.",3:"have + were не сочетаются."},alt:[["Are you OK? You look upset.","мягко"],["What's wrong?","разговорно"]]},
  {type:"choose",q:"If you could live anywhere, where ___ you live?",opts:["would","will","do","did"],ans:0,f:"o:If you could live anywhere,|q:where|a:would|s:you|v:live",ru:"Если бы ты мог жить где угодно, где бы ты жил?",cat:"cond",hint:"Воображаемая ситуация → would.",why:{1:"will — для реального будущего. Здесь «бы» → would.",2:"do — настоящее. Нужно «бы».",3:"did — прошлое."},alt:[["Where would you live if you could choose?","if-часть в конце"],["Where's your dream place to live?","через be"]]},
  {type:"tr",ru:"Как долго ты учишь английский?",f:"q:How long|a:have|s:you|v:been learning|o:English",acc:["How long have you been studying English","How long have you learned English","How long have you studied English"],hint:"How long + have + you + been learning.",alt:[["When did you start learning English?","Past Simple"],["How long have you studied English?","Present Perfect"]]},
  {type:"fix",wrong:"How come are you so late?",f:"q:How come|s:you|a:are|o:so late",ru:"Как так, что ты так опоздал?",acc:[],hint:"После How come порядок прямой: you are.",alt:[["Why are you so late?","обычный вопрос"],["What kept you?","разговорно"]]},
  {type:"focus",s:"I've been working here {for ten years}.",f:"q:How long|a:have|s:you|v:been working|t:here",ru:"Как давно ты здесь работаешь?",acc:["How long have you worked here"],hint:"How long + have + you + been working.",alt:[["When did you start here?","Past Simple"],["Have you been here long?","общий вопрос"]]},
  {type:"answer",reply:"I'd travel around the world.",about:"Спроси, что бы он сделал, будь у него миллион (if you had a million).",f:"q:What|a:would|s:you|v:do|o:if you had a million",ru:"Что бы ты сделал, если бы у тебя был миллион?",acc:["What would you do if you had a million dollars","If you had a million what would you do","What would you do with a million","If you had a million dollars what would you do"],hint:"What would you do + if you had a million.",alt:[["How would you spend a million?","через spend"],["What would you buy with a million?","через buy"]]},
  {type:"build",f:"a:Did|s:you|v:use to|o:play football",ru:"Ты раньше играл в футбол?",extra:["used","were"],hint:"used to → Did you use to…? (без d).",alt:[["Did you play football as a kid?","проще"],["Were you into football when you were younger?","разговорно"]]},
  {type:"choose",q:"How about ___ to the beach?",opts:["going","go","to go","went"],ans:0,f:"q:How about|v:going|o:to the beach",ru:"Как насчёт пойти на пляж?",cat:"howcome",hint:"После How about — глагол с -ing.",why:{1:"После about — -ing.",2:"После about — -ing, без to.",3:"Прошедшая форма здесь не подходит."},alt:[["Shall we go to the beach?","через shall"],["Why don't we go to the beach?","через why don't"]]},
  {type:"tr",ru:"Что бы ты сделал на моём месте?",f:"q:What|a:would|s:you|v:do|o:if you were me",acc:["What would you do in my place","What would you do in my position","What would you do in my shoes","If you were me what would you do"],hint:"What would you do + if you were me.",alt:[["What would you do in my shoes?","идиома"],["What do you think I should do?","просьба о совете"]]},
  {type:"fix",wrong:"What would you do if you will win?",f:"q:What|a:would|s:you|v:do|o:if you won",ru:"Что бы ты сделал, если бы выиграл?",acc:[],hint:"В части с if не ставят will: if you won.",alt:[["What if you won?","коротко"],["Imagine you won — what then?","разговорно"]]},
  {type:"focus",s:"We had met {at a conference} before.",f:"q:Where|a:had|s:you|v:met|t:before",ru:"Где вы встречались до этого?",acc:["Where did you meet before"],hint:"Past Perfect: Where + had + you + met.",alt:[["Where did you meet?","Past Simple"],["Had you met before?","общий вопрос"]]},
  {type:"build",f:"q:What|a:had|v:happened|o:before you arrived",ru:"Что случилось до того, как ты пришёл?",extra:["did","has"],hint:"What — подлежащее. Past Perfect: had + happened.",alt:[["What happened before you got there?","Past Simple"],["What had gone on?","разговорно"]]},
  {type:"choose",q:"What would you have done ___?",opts:["if you had been there","if you were there","if you would be there","if you have been there"],ans:0,f:"q:What|a:would|s:you|v:have done|o:if you had been there",ru:"Что бы ты сделал, если бы был там (тогда)?",cat:"cond",hint:"Прошлое, которое не случилось: would have done + if you had been.",why:{1:"if you were — про воображаемое сейчас, а вопрос про прошлое.",2:"В if — без would.",3:"have been — реальный опыт, а нужно «если бы»."},alt:[["What would you have done in my place?","in my place"],["How would you have handled it?","через handle"]]},
  {type:"choose",q:"How long ___ she been living in London?",opts:["has","is","does","did"],ans:0,f:"q:How long|a:has|s:she|v:been living|o:in London",ru:"Как долго она живёт в Лондоне?",cat:"perfcont",hint:"she → has + been living.",why:{1:"is + been не сочетаются.",2:"does + been не сочетаются.",3:"did + been не сочетаются."},alt:[["How long has she lived in London?","Present Perfect"],["When did she move to London?","Past Simple"]]},
  {type:"answer",reply:"Yes, I used to go every summer.",about:"Спроси, ездил ли он раньше в летний лагерь (use to go to summer camp).",f:"a:Did|s:you|v:use to go|o:to summer camp",ru:"Ты раньше ездил в летний лагерь?",acc:["Did you use to go to camp","Did you go to summer camp"],hint:"Did you use to go…?",alt:[["Did you go to summer camp as a kid?","проще"],["Were you a summer camp kid?","разговорно"]]},
  {type:"tr",ru:"А что если пойдёт дождь?",f:"q:What if|s:it|v:rains",acc:["What if it starts raining","What if it starts to rain"],hint:"What if + прямой порядок: What if it rains?",alt:[["What do we do if it rains?","полнее"],["And if it rains?","разговорно"]]},
  {type:"build",f:"q:Who else|a:is|v:coming",ru:"Кто ещё придёт?",extra:["are","does"],hint:"Who else — подлежащее. is + coming.",alt:[["Who's coming?","без else"],["Anyone else coming?","разговорно"]]},
  {type:"fix",wrong:"Did you used to smoke?",f:"a:Did|s:you|v:use to|o:smoke",ru:"Ты раньше курил?",acc:[],hint:"После did — use, без d.",alt:[["Have you ever smoked?","Present Perfect"],["Were you a smoker?","через be"]]},
  {type:"choose",q:"If you ___ fly, where would you go?",opts:["could","can","will","would"],ans:0,f:"o:If you could fly,|q:where|a:would|s:you|v:go",ru:"Если бы ты мог летать, куда бы ты полетел?",cat:"cond",hint:"Воображаемое условие: if you could.",why:{1:"can — реальная возможность. «Если бы мог» → could.",2:"will в if-части не ставят.",3:"would в if-части не ставят."},alt:[["Where would you go if you could fly?","if-часть в конце"],["Imagine you could fly — where to?","разговорно"]]},
  {type:"focus",s:"They have been arguing {all morning}.",f:"q:How long|a:have|s:they|v:been arguing",ru:"Как долго они спорят?",acc:[],hint:"How long + have + they + been arguing.",alt:[["What are they arguing about?","предлог в конце"],["Are they still arguing?","Continuous"]]},
  {type:"build",f:"q:What|a:would|s:you|v:like|o:to do|t:tonight",ru:"Чем бы ты хотел заняться вечером?",extra:["will","want"],hint:"What + would + you + like + to do.",alt:[["What do you fancy doing tonight?","брит."],["What do you want to do tonight?","проще"]]},
  {type:"tr",ru:"Как так вышло, что ты не пришёл?",f:"q:How come|s:you|v:didn't come",acc:["Why didn't you come"],hint:"How come + прямой порядок: you didn't come.",alt:[["Why didn't you come?","обычный вопрос"],["What happened? You didn't show up.","разговорно"]]},
  {type:"choose",q:"Had you ever ___ abroad before 2020?",opts:["been","went","go","being"],ans:0,f:"a:Had|s:you|t:ever|v:been|o:abroad|t:before 2020",ru:"Ты бывал за границей до 2020 года?",cat:"v3",hint:"Past Perfect: had + been.",why:{1:"went — вторая форма. После had — третья: been.",2:"После had — третья форма.",3:"being — не после had."},alt:[["Was 2020 your first time abroad?","через be"],["Had you travelled much before then?","через travel"]]},
  {type:"answer",reply:"I'd probably take it to the police.",about:"Спроси, что бы он сделал, если бы нашёл кошелёк (found a wallet).",f:"q:What|a:would|s:you|v:do|o:if you found a wallet",ru:"Что бы ты сделал, если бы нашёл кошелёк?",acc:["If you found a wallet what would you do","What would you do if you found a wallet in the street","What would you do if you found someone's wallet"],hint:"What would you do + if you found a wallet.",alt:[["Would you keep it?","общий вопрос"],["Would you hand it in?","«сдал бы?»"]]},
  {type:"fix",wrong:"How long are you waiting here?",f:"q:How long|a:have|s:you|v:been waiting|t:here",ru:"Как долго ты здесь ждёшь?",acc:["How long have you waited here"],hint:"Длительность до сейчас → have been + -ing.",alt:[["Have you been here long?","общий вопрос"],["When did you get here?","Past Simple"]]},
  {type:"build",f:"q:Where else|a:have|s:you|v:been",ru:"Где ещё ты был?",extra:["did","went"],hint:"Where else + have + you + been.",alt:[["Have you been anywhere else?","общий вопрос"],["What other places have you visited?","через other"]]},
  {type:"focus",s:"I used to live {in Odessa}.",f:"q:Where|a:did|s:you|v:use to live",ru:"Где ты жил раньше?",acc:["Where did you live before","Where did you live"],hint:"Where + did + you + use to live.",alt:[["Where did you live before?","проще"],["Where are you from originally?","разговорно"]]},
  {type:"choose",q:"What ___ you have done differently?",opts:["would","will","did","had"],ans:0,f:"q:What|a:would|s:you|v:have done|o:differently",ru:"Что бы ты сделал по-другому?",cat:"cond",hint:"Воображаемое прошлое → would have done.",why:{1:"will have done — про будущее.",2:"did + have done не сочетаются.",3:"had + have done не сочетаются."},alt:[["What would you change?","проще"],["Any regrets?","разговорно"]]},
  {type:"tr",ru:"Как насчёт того, чтобы заказать пиццу?",f:"q:How about|v:ordering|o:pizza",acc:["What about ordering pizza","How about ordering a pizza","What about ordering a pizza","How about ordering some pizza"],hint:"How about + -ing: How about ordering pizza?",alt:[["Shall we order pizza?","через shall"],["Fancy a pizza?","брит."]]},
  {type:"fix",wrong:"If you would have time, would you help me?",f:"o:If you had time,|a:would|s:you|v:help|o:me",ru:"Если бы у тебя было время, ты бы мне помог?",acc:["Would you help me if you had time"],hint:"В части с if не ставят would: If you had time.",alt:[["Could you help me if you have time?","реальная просьба"],["Have you got time to help me?","проще"]]},
  {type:"build",f:"q:How long|a:had|s:you|v:been waiting|o:when the bus came",ru:"Как долго ты ждал, когда пришёл автобус?",extra:["have","were"],hint:"Past Perfect Continuous: had + been + -ing.",alt:[["Did you wait long?","Past Simple"],["Was the bus late?","через be"]]},
  {type:"choose",q:"Would you mind if I ___ the window?",opts:["opened","open","will open","opening"],ans:0,f:"a:Would|s:you|v:mind|o:if I opened the window",ru:"Вы не против, если я открою окно?",cat:"cond",hint:"Would you mind if I + прошедшая форма (вежливость).",why:{1:"Do you mind if I open — тоже можно, но после would — opened.",2:"will в части с if не ставят.",3:"После if I — глагол в форме, не -ing."},alt:[["Do you mind if I open the window?","чуть проще"],["Is it OK if I open the window?","разговорно"]]},
  {type:"answer",reply:"I've been reading a lot lately.",about:"Спроси, чем он занимался в последнее время (what, you, been doing, lately).",f:"q:What|a:have|s:you|v:been doing|t:lately",ru:"Чем ты занимался в последнее время?",acc:["What have you been up to lately","What have you been up to","What have you been doing recently"],hint:"What + have + you + been doing + lately.",alt:[["What have you been up to?","разговорно"],["What's new?","разговорно"]]},
  {type:"focus",s:"He would buy {a boat} if he were rich.",f:"q:What|a:would|s:he|v:buy|o:if he were rich",ru:"Что бы он купил, если бы был богат?",acc:["What would he buy if he was rich"],hint:"What + would + he + buy + if he were rich.",alt:[["What's his dream purchase?","через be"],["If he were rich, what would he buy?","if-часть в начале"]]},
  {type:"tr",ru:"Кто ещё знает об этом?",f:"q:Who else|v:knows|o:about this",acc:["Who else knows about it","Who else knows","Does anyone else know about this"],hint:"Who else — подлежащее, глагол с -s: knows.",alt:[["Does anyone else know?","общий вопрос"],["Have you told anyone else?","Present Perfect"]]},
  {type:"choose",q:"How come she ___ here?",opts:["isn't","is not she","doesn't be","not"],ans:0,f:"q:How come|s:she|a:isn't|o:here",ru:"Как так, что её здесь нет?",cat:"howcome",hint:"How come + прямой порядок: she isn't here.",why:{1:"После How come — прямой порядок, без перестановки.",2:"be с doesn't не сочетаются.",3:"Нужен глагол: isn't."},alt:[["Why isn't she here?","обычный вопрос"],["Where is she?","через where"]]},
  {type:"fix",wrong:"What if it will rain?",f:"q:What if|s:it|v:rains",ru:"А что если пойдёт дождь?",acc:[],hint:"После What if (как после if) — без will: it rains.",alt:[["What do we do if it rains?","полнее"],["What's plan B if it rains?","разговорно"]]},
  {type:"build",f:"a:Have|s:you|v:been sleeping|o:well",ru:"Ты хорошо спишь в последнее время?",extra:["did","slept"],hint:"Have + you + been sleeping + well.",alt:[["How have you been sleeping?","специальный"],["Are you sleeping OK?","Continuous"]]},
  {type:"choose",q:"What did you ___ to do at school?",opts:["have","had","has","having"],ans:0,f:"q:What|a:did|s:you|v:have to do|o:at school",ru:"Что тебе приходилось делать в школе?",cat:"verb_past",hint:"После did — have to (начальная форма).",why:{1:"had — прошедшая форма, а прошлое уже показал did.",2:"После did — начальная форма.",3:"-ing после did не ставят."},alt:[["What were you made to do at school?","пассив"],["What did school involve?","через involve"]]},
  {type:"answer",reply:"Because I'd forgotten my keys.",about:"Спроси, почему он не смог войти (couldn't, get in).",f:"q:Why|a:couldn't|s:you|v:get in",ru:"Почему ты не смог войти?",acc:["Why weren't you able to get in"],hint:"Why + couldn't + you + get in.",alt:[["What happened?","к подлежащему"],["Were you locked out?","пассив"]]},
  {type:"tr",ru:"Если бы ты мог встретиться с кем угодно, кто бы это был?",f:"o:If you could meet anyone,|q:who|a:would|s:it|v:be",acc:["If you could meet anyone who would you meet","Who would you meet if you could meet anyone","If you could meet anybody who would it be"],hint:"If you could meet anyone, who would it be?",alt:[["Who would you most like to meet?","проще"],["Who's your dream dinner guest?","разговорно"]]},
  {type:"fix",wrong:"How about to go for a walk?",f:"q:How about|v:going|o:for a walk",ru:"Как насчёт прогулки?",acc:["What about going for a walk"],hint:"После How about — -ing.",alt:[["Shall we go for a walk?","через shall"],["Fancy a walk?","брит."]]},
  {type:"focus",s:"I had never seen snow {before I moved to Canada}.",f:"a:Had|s:you|t:ever|v:seen|o:snow before you moved to Canada",ru:"Ты видел снег до переезда в Канаду?",acc:["Had you seen snow before you moved to Canada","Had you ever seen snow before"],hint:"Had + you + ever + seen + snow + before…",alt:[["Was that your first time seeing snow?","через be"],["Did you see snow for the first time in Canada?","Past Simple"]]},
  {type:"choose",q:"What ___ you been doing all day?",opts:["have","are","did","do"],ans:0,f:"q:What|a:have|s:you|v:been doing|t:all day",ru:"Что ты делал весь день?",cat:"perfcont",hint:"been + -ing → have.",why:{1:"are + been не сочетаются.",2:"did + been не сочетаются.",3:"do + been не сочетаются."},alt:[["What did you do all day?","Past Simple"],["Have you been busy?","общий вопрос"]]},
  {type:"build",f:"q:What|a:would|s:you|v:have done|o:without me",ru:"Что бы ты без меня делал?",extra:["will","did"],hint:"Воображаемое прошлое: would + have done.",alt:[["Where would you be without me?","шутливо"],["Aren't you glad I was there?","отрицательный"]]},
  {type:"tr",ru:"Ты раньше носил очки?",f:"a:Did|s:you|v:use to wear|o:glasses",acc:["Did you wear glasses before","Did you use to wear glasses before"],hint:"Did + you + use to wear + glasses.",alt:[["Did you wear glasses as a kid?","проще"],["Have you always worn glasses?","Present Perfect"]]},
  {type:"answer",reply:"No, it was my first time.",about:"Спроси, был ли он там раньше — до этой поездки (had, been there before).",f:"a:Had|s:you|v:been|o:there|t:before",ru:"Ты был там раньше?",acc:["Had you ever been there before","Have you been there before","Had you been there"],hint:"Past Perfect: Had + you + been + there + before.",alt:[["Was it your first time there?","через be"],["Had you visited before?","через visit"]]},
  {type:"fix",wrong:"What would you do if you are rich?",f:"q:What|a:would|s:you|v:do|o:if you were rich",ru:"Что бы ты сделал, если бы был богат?",acc:["What would you do if you was rich"],hint:"Воображаемое условие: if you were.",alt:[["If you were rich, what would you do?","if-часть в начале"],["What would you do with lots of money?","проще"]]}
  ]
};
