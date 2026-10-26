/* Module 13 — indirect and polite questions */
CONTENT.m13 = {
  title: "Косвенные и вежливые вопросы",
  idea: "Вежливый вопрос начинается с фразы «Не подскажете…», а внутри — уже не вопрос, а утверждение: прямой порядок слов и никакого do. Could you tell me where the station is?",
  catSec: {order:"transform",aux_missing:"formula",ind_order:"transform",ind_do:"transform",ind_if:"ifwhether",ind_verb:"transform",do_form:"transform",verb_s:"transform",verb_past:"transform",be_verb:"transform",do_be:"transform",be_form:"transform",wh:"phrases",short:"errors",article:"errors",other:"formula"},
  cats: {ind_order:["Порядок в косвенном вопросе","После Do you know / Could you tell me порядок прямой: where the station is, what time it is."],
    ind_do:["Лишний do / does / did","В косвенном вопросе do / does / did не нужен: where she lives, why you left."],
    ind_if:["if / whether","Вопрос «да / нет» внутри фразы — через if или whether: Do you know if she's coming?"],
    ind_verb:["Форма глагола без do","Без does у глагола возвращается -s (where she lives), без did — прошедшая форма (where she went)."]},
  diagnose({t,u,e}){
    const em=norm(mainText(t)).split(" ");
    const cnt=(arr)=>arr.filter(w=>DO.includes(w)).length;
    if(cnt(u)>cnt(em)) return {cat:"ind_do",msg:"В косвенном вопросе do / does / did не нужен: порядок как в утверждении — where she lives, what he wants, why you left."};
    if(sameBag(u,em) || sameBag(u,e)) return {cat:"ind_order",msg:"В косвенном вопросе порядок прямой: сначала подлежащее, потом глагол — where the station is, what time it is."};
    if((em.includes("if")||em.includes("whether")) && !u.includes("if") && !u.includes("whether")) return {cat:"ind_if",msg:"Вопрос «да / нет» внутри фразы вводится словом if или whether: Do you know if…?"};
    const v=(parseF(t.f).find(s=>s.tag==="v")||{}).text;
    if(v){
      const vt=norm(v).split(" ")[0];
      if(!u.includes(vt)){
        if(vt.endsWith("s") && (u.includes(vt.slice(0,-1)) || u.includes(vt.replace(/es$/,"")))) return {cat:"ind_verb",msg:`Без does глагол возвращает окончание -s: ${vt}.`};
        const base=Object.keys(IRREG).find(k=>IRREG[k]===vt) || vt.replace(/ed$/,"");
        if(base!==vt && (u.includes(base) || u.includes(base+"e"))) return {cat:"ind_verb",msg:`Без did глагол сам показывает прошлое: ${vt}.`};
      }
    }
    return null;
  },
  check: [
    {q:"Do you know where ___?",opts:["the station is","is the station","does the station"],ans:0,hint:"Внутри косвенного вопроса — прямой порядок: the station is."},
    {q:"Could you tell me what time ___?",opts:["it starts","does it start","it does start"],ans:0,hint:"Без does, -s возвращается: it starts."},
    {q:"I wonder ___ he's coming.",opts:["if","that","does"],ans:0,hint:"«Ли» → if."}
  ],
  demos: [
    {name:"Прямой → косвенный", frames:[
      {t:[["w","Where","q"],["is","is","a"],["st","the station","s"],["p","?","p"]], c:"Прямой вопрос: is стоит перед подлежащим."},
      {t:[["i","Could you tell me","o"],["w","where","q"],["is","is","a"],["st","the station","s"],["p","?","p"]], c:"Добавляем вежливое начало. Но <i>…where is the station?</i> — ошибка: вопрос уже задан началом фразы."},
      {t:[["i","Could you tell me","o"],["w","where","q"],["st","the station","s"],["is","is","a"],["p","?","p"]], c:"Внутри — порядок утверждения: <i>Could you tell me where the station is?</i>"}]},
    {name:"Do исчезает", frames:[
      {t:[["w","Where","q"],["does","does","a"],["she","she","s"],["live","live","v"],["p","?","p"]], c:"Прямой вопрос с does."},
      {t:[["i","Do you know","o"],["w","where","q"],["she","she","s"],["live","lives","v"],["p","?","p"]], c:"В косвенном вопросе <b>does исчезает</b>, и -s возвращается к глаголу: <i>Do you know where she lives?</i>"}]},
    {name:"Да / нет → if", frames:[
      {t:[["is","Is","a"],["he","he","s"],["m","married","o"],["p","?","p"]], c:"Вопрос «да / нет»."},
      {t:[["i","Do you know","o"],["if","if","q"],["he","he","s"],["is","is","a"],["m","married","o"],["p","?","p"]], c:"Внутри ставим <b>if</b> («ли»), порядок прямой: <i>Do you know if he's married?</i>"}]},
    {name:"Ловушка: did", frames:[
      {t:[["i","I wonder","o"],["w","where","q"],["did","did","a","bad"],["she","she","s"],["go","go","v"],["p",".","p"]], c:"<i>I wonder where did she go</i> — ошибка: did в косвенном вопросе не нужен."},
      {t:[["i","I wonder","o"],["w","where","q"],["she","she","s"],["go","went","v"],["p",".","p"]], c:"Без did глагол сам показывает прошлое: <i>I wonder where she went.</i> И в конце — точка: это утверждение."}]}
  ],
  rules(){
    return [
    {id:"why",title:"Вопрос внутри фразы",body:`
      <p>Косвенный вопрос — это вопрос, «спрятанный» в другую фразу: <span class="mono">Could you tell me…? Do you know…? I wonder…</span> Так спрашивают <b>вежливо</b>: незнакомцев, коллег, в магазине, по телефону.</p>
      <p>Главное: вопрос уже задан началом фразы. Поэтому вторая часть — <b>не вопрос, а утверждение</b>: прямой порядок слов, никаких do / does / did.</p>
      <p>${ex("Where is the station?")} → ${ex("Could you tell me where the station is?")}</p>`},
    {id:"formula",title:"Формула",body:`
      <div class="formula">${slot("o","Do you know / Could you tell me","вежливое начало")}${PLUS}${slot("q","where","вопрос. слово")}${PLUS}${slot("s","the station","подлежащее")}${PLUS}${slot("a","is","глагол")}<span class="plus">?</span></div>
      <div class="formula">${slot("o","Do you know","вежливое начало")}${PLUS}${slot("q","if / whether","«ли»")}${PLUS}${slot("s","she","подлежащее")}${PLUS}${slot("v","likes jazz","глагол")}<span class="plus">?</span></div>
      <div class="note">После вопросительного слова — сразу подлежащее. Как в утверждении: <span class="mono">the station is, she lives, you left</span>.</div>`},
    {id:"phrases",title:"Вежливые начала",body:`
      ${rows(["Фраза","Перевод","В конце"],[
        ["Do you know…?","Вы не знаете…?","?"],["Could you tell me…?","Не подскажете…?","?"],
        ["Can you tell me…?","Можешь сказать…?","?"],["Do you have any idea…?","Ты не в курсе…?","?"],
        ["Would you mind telling me…?","Вы не против сказать…?","?"],["Do you remember…?","Ты помнишь…?","?"],
        ["I wonder…","Интересно…","."],["I'd like to know…","Я бы хотел знать…","."],
        ["I'm not sure…","Я не уверен…","."],["I don't know / I have no idea…","Я не знаю / понятия не имею…","."]])}
      <p>Знак в конце зависит от <b>начала</b>: если начало — вопрос, ставим «?», если утверждение — точку.</p>`},
    {id:"transform",title:"Как переделать прямой вопрос",body:`
      ${rows(["Прямой вопрос","Косвенный"],[
        [ex("Where is the bank?"),ex("Do you know where the bank is?")],
        [ex("What time is it?"),ex("Could you tell me what time it is?")],
        [ex("Where does she live?"),ex("Do you know where she lives?")],
        [ex("What did he say?"),ex("I don't know what he said.")],
        [ex("Where can I park?"),ex("Could you tell me where I can park?")],
        [ex("How much does it cost?"),ex("Do you know how much it costs?")],
        [ex("Why were you late?"),ex("I'd like to know why you were late.")]])}
      <ol class="steps"><li>Убери do / does / did. С does к глаголу возвращается -s, с did — прошедшая форма.</li>
        <li>Поставь подлежащее перед be, have, can, will.</li><li>Знак в конце — по началу фразы.</li></ol>`},
    {id:"ifwhether",title:"Вопрос «да / нет» → if / whether",body:`
      <p>Если прямой вопрос без вопросительного слова (Is he…? Do you…? Can I…?), внутри косвенного появляется <b>if</b> или <b>whether</b> = «ли».</p>
      ${rows(["Прямой","Косвенный"],[
        [ex("Is he married?"),ex("Do you know if he's married?")],[ex("Does she like jazz?"),ex("Do you know if she likes jazz?")],
        [ex("Will it rain?"),ex("I wonder whether it will rain.")],[ex("Can I park here?"),ex("Could you tell me if I can park here?")]])}
      <p><b>Whether</b> чуть официальнее и часто идёт с <span class="mono">or not</span>: <span class="mono">I don't know whether or not he's coming.</span></p>`},
    {id:"subject",title:"Вопрос к подлежащему не меняется",body:`
      <p>Если вопрос уже без do (вопрос к подлежащему, модуль 8), порядок и так прямой — ничего не меняем:</p>
      <p>${ex("Who called?")} → ${ex("Do you know who called?")}</p>
      <p>${ex("What happened?")} → ${ex("Can you tell me what happened?")}</p>`},
    {id:"tips",title:"Лайфхаки и запоминалки",body:tipsHTML([
      ["mem","Вопрос уже задан","Do you know / Could you tell me — это и есть вопрос. Вторая половина — обычное утверждение.",[]],
      ["mem","Do прячется","В косвенном вопросе do / does / did исчезает. Но его след остаётся: -s или прошлое у глагола.",["Do you know where she lives?"]],
      ["mem","«Ли» = if","Будет ли, есть ли, знает ли → if / whether.",["I wonder if he knows."]],
      ["mem","Точка или знак вопроса — по началу","I wonder… → точка. Do you know…? → вопросительный знак.",[]],
      ["obs","Чем длиннее, тем вежливее","Where's the toilet? → Could you tell me where the toilet is? → Would you mind telling me…",[]],
      ["obs","I wonder — мягкая просьба","I wonder if you could help me. — очень вежливая просьба о помощи.",["I wonder if you could help me."]],
      ["obs","Носители тоже ошибаются","В быстрой речи можно услышать «Do you know where is it?». Но в экзаменах и письмах — только прямой порядок.",[]],
      ["obs","Do you know — не про знания","Do you know where…? — это просто вежливое «не подскажете». Ответ «Yes» без информации звучит как шутка.",[]],
      ["hack","Не помнишь порядок — скажи утверждение","Начни с Could you tell me, а дальше говори, как будто отвечаешь: …where the station is.",[]],
      ["hack","Any idea…? — коротко и дружелюбно","Any idea where my keys are? — разговорный вариант Do you have any idea.",["Any idea where my keys are?"]],
      ["hack","Выигрываешь время","I'm not sure what… / I wonder why… — дают время подумать и звучат естественно.",[]],
      ["hack","Вежливость в магазине и на улице","Excuse me, could you tell me… — универсальный старт для любого вопроса к незнакомцу.",["Excuse me, could you tell me where the bank is?"]]])},
    {id:"errors",title:"Типичные ошибки",body:errsHTML([
      ["Do you know where is the station?","Do you know where the station is?","Прямой порядок."],["Could you tell me what time is it?","Could you tell me what time it is?","is — в конец."],
      ["Do you know where does she live?","Do you know where she lives?","does исчезает, -s возвращается."],["I wonder where did she go.","I wonder where she went.","did исчезает, глагол в прошлом."],
      ["Do you know does she like jazz?","Do you know if she likes jazz?","Да / нет → if."],["Could you tell me where can I park?","Could you tell me where I can park?","can — после подлежащего."],
      ["I don't know what does it mean.","I don't know what it means.","Без does."],["Do you know how much is it?","Do you know how much it is?","is — в конец."],
      ["I wonder that he will come.","I wonder if he will come.","«Ли» → if."],["I wonder where she is?","I wonder where she is.","Начало — утверждение → точка."],
      ["Do you know where she live?","Do you know where she lives?","Без does -s возвращается."],["Can you tell me who did call?","Can you tell me who called?","Вопрос к подлежащему без did."]])}
    ];
  },
  tasks: [
  {type:"build",f:"o:Do you know|q:where|s:the station|a:is",ru:"Вы не знаете, где вокзал?",extra:["does","are"],hint:"После Do you know порядок прямой: where + the station + is.",alt:[["Where's the station?","прямой вопрос"],["Could you tell me where the station is?","вежливее"]]},
  {type:"build",f:"o:Could you tell me|q:what time|s:it|a:is",ru:"Не подскажете, который час?",extra:["does","are"],hint:"Could you tell me + what time + it + is.",alt:[["What time is it?","прямой вопрос"],["Have you got the time?","брит., вежливо"]]},
  {type:"choose",q:"Do you know where ___?",opts:["she lives","does she live","she does live","lives she"],ans:0,f:"o:Do you know|q:where|s:she|v:lives",ru:"Ты знаешь, где она живёт?",cat:"ind_order",hint:"Порядок прямой, does исчезает, а -s возвращается: where she lives.",why:{1:"Это порядок прямого вопроса. В косвенном — как в утверждении.",2:"does не нужен.",3:"Сначала подлежащее, потом глагол."},alt:[["Where does she live?","прямой вопрос"],["Have you got her address?","через have got"]]},
  {type:"choose",q:"I wonder ___ he will come.",opts:["if","that","what","does"],ans:0,f:"o:I wonder|q:if|s:he|a:will|v:come",end:".",ru:"Интересно, придёт ли он.",cat:"ind_if",hint:"«Ли» → if или whether.",why:{1:"that — «что», а нам нужно «ли» → if.",2:"what — «что именно».",3:"does — вопросительный помощник, в косвенном не нужен."},alt:[["Will he come?","прямой вопрос"],["Do you think he'll come?","через think"]]},
  {type:"tr",ru:"Ты не знаешь, сколько это стоит?",f:"o:Do you know|q:how much|s:it|v:costs",acc:["Do you know how much this costs","Do you know how much it is","Do you know how much this is"],hint:"Do you know + how much + it + costs (с -s, без does).",alt:[["How much is it?","прямой вопрос"],["Any idea how much it costs?","разговорно"]]},
  {type:"fix",wrong:"Can you tell me where is the bank?",f:"o:Can you tell me|q:where|s:the bank|a:is",ru:"Не подскажете, где банк?",acc:[],hint:"В косвенном вопросе is уходит в конец: where the bank is.",alt:[["Where's the bank?","прямой вопрос"],["Is there a bank near here?","через there"]]},
  {type:"focus",s:"The meeting starts {at ten}.",about:"Начни вежливо: Could you tell me…",f:"o:Could you tell me|q:when|s:the meeting|v:starts",ru:"Не подскажете, когда начинается встреча?",acc:["Could you tell me what time the meeting starts","Do you know when the meeting starts","Do you know what time the meeting starts","Can you tell me when the meeting starts","Can you tell me what time the meeting starts"],hint:"Could you tell me + when + the meeting + starts.",alt:[["When does the meeting start?","прямой вопрос"],["What time's the meeting?","разговорно"]]},
  {type:"answer",reply:"Sorry, I have no idea where she is.",about:"Спроси, знает ли он, где Анна (Do you know…).",f:"o:Do you know|q:where|s:Anna|a:is",ru:"Ты не знаешь, где Анна?",acc:["Do you know where Anna is now","Do you have any idea where Anna is","Have you any idea where Anna is"],hint:"Do you know + where + Anna + is.",alt:[["Where's Anna?","прямой вопрос"],["Have you seen Anna?","Present Perfect"]]},
  {type:"build",f:"o:I'd like to know|q:why|s:you|v:left",end:".",ru:"Я бы хотел знать, почему ты ушёл.",extra:["did","leave"],hint:"Прямой порядок, did исчезает, глагол в прошлом: why you left.",alt:[["Why did you leave?","прямой вопрос"],["Can I ask why you left?","вежливо"]]},
  {type:"choose",q:"Could you tell me ___ the museum is open today?",opts:["if","what","does","is"],ans:0,f:"o:Could you tell me|q:if|s:the museum|a:is|o:open today",ru:"Не подскажете, открыт ли музей сегодня?",cat:"ind_if",hint:"Вопрос «да / нет» внутри → if.",why:{1:"what — «что». Нужно «ли» → if.",2:"does — не нужен.",3:"is уже есть дальше."},alt:[["Is the museum open today?","прямой вопрос"],["Do you know if the museum's open today?","через know"]]},
  {type:"tr",ru:"Я не знаю, где он работает.",f:"o:I don't know|q:where|s:he|v:works",end:".",acc:["I have no idea where he works"],hint:"Прямой порядок, без does: where he works.",alt:[["I've no idea where he works.","разговорно"],["Where does he work?","прямой вопрос"]]},
  {type:"fix",wrong:"Do you know what time does the train leave?",f:"o:Do you know|q:what time|s:the train|v:leaves",ru:"Вы не знаете, во сколько уходит поезд?",acc:["Do you know when the train leaves"],hint:"does убираем, -s возвращаем: the train leaves.",alt:[["What time does the train leave?","прямой вопрос"],["When's the train?","разговорно"]]},
  {type:"focus",s:"She is {in the garden}.",about:"Начни с Do you know…",f:"o:Do you know|q:where|s:she|a:is",ru:"Ты не знаешь, где она?",acc:["Do you know where she is now"],hint:"Do you know + where + she + is.",alt:[["Where is she?","прямой вопрос"],["Have you seen her?","Present Perfect"]]},
  {type:"build",f:"o:Can you tell me|q:how|s:I|v:get|o:to the airport",ru:"Не подскажете, как добраться до аэропорта?",extra:["do","can"],hint:"Can you tell me + how + I + get to the airport.",alt:[["How do I get to the airport?","прямой вопрос"],["Which way is the airport?","через which"]]},
  {type:"choose",q:"Do you know ___ she's married?",opts:["whether","what","that","does"],ans:0,f:"o:Do you know|q:whether|s:she|a:is|o:married",ru:"Ты не знаешь, замужем ли она?",cat:"ind_if",hint:"«Ли» → whether или if.",why:{1:"what — «что именно». Нужно «ли».",2:"that — «что». Нужно «ли».",3:"does — не нужен в косвенном вопросе."},alt:[["Is she married?","прямой вопрос"],["Is she single?","прямой вопрос"]]},
  {type:"choose",q:"I'm not sure what ___.",opts:["he wants","does he want","he does want","wants he"],ans:0,f:"o:I'm not sure|q:what|s:he|v:wants",end:".",ru:"Я не уверен, чего он хочет.",cat:"ind_order",hint:"Прямой порядок: what he wants.",why:{1:"Это порядок прямого вопроса.",2:"does не нужен.",3:"Сначала подлежащее."},alt:[["What does he want?","прямой вопрос"],["I've no idea what he wants.","разговорно"]]},
  {type:"answer",reply:"Yes, it's on the second floor.",about:"Вежливо спроси, есть ли здесь туалет (Could you tell me if there's…).",f:"o:Could you tell me|q:if|s:there|a:is|o:a toilet here",ru:"Не подскажете, здесь есть туалет?",acc:["Could you tell me where the toilet is","Can you tell me if there is a toilet here","Do you know if there is a toilet here","Could you tell me if there's a toilet","Could you tell me whether there is a toilet here","Could you tell me where the toilets are"],hint:"Could you tell me + if + there is + a toilet here.",alt:[["Where's the toilet, please?","прямой вопрос"],["Is there a toilet here?","прямой вопрос"]]},
  {type:"tr",ru:"Ты помнишь, как его зовут?",f:"o:Do you remember|q:what|s:his name|a:is",acc:["Do you remember his name"],hint:"Do you remember + what + his name + is.",alt:[["What's his name again?","прямой вопрос: «напомни»"],["Can you remember his name?","через can"]]},
  {type:"build",f:"o:Do you know|q:who|s:that man|a:is",ru:"Ты знаешь, кто этот мужчина?",extra:["does","are"],hint:"Do you know + who + that man + is.",alt:[["Who's that man?","прямой вопрос"],["Any idea who that guy is?","разговорно"]]},
  {type:"fix",wrong:"I wonder where did she go.",f:"o:I wonder|q:where|s:she|v:went",end:".",ru:"Интересно, куда она пошла.",acc:["I wonder where she has gone"],hint:"did убираем, глагол — в прошлом: she went.",alt:[["Where did she go?","прямой вопрос"],["I wonder where she's gone.","Present Perfect"]]},
  {type:"choose",q:"Could you tell me how much ___?",opts:["this costs","does this cost","costs this","this does cost"],ans:0,f:"o:Could you tell me|q:how much|s:this|v:costs",ru:"Не подскажете, сколько это стоит?",cat:"ind_order",hint:"Прямой порядок: how much this costs.",why:{1:"Порядок прямого вопроса не подходит.",2:"Сначала подлежащее.",3:"does не нужен."},alt:[["How much is this?","прямой вопрос"],["What's the price of this?","через price"]]},
  {type:"focus",s:"The shop closes {at nine}.",about:"Начни с Do you know…",f:"o:Do you know|q:what time|s:the shop|v:closes",ru:"Ты не знаешь, во сколько закрывается магазин?",acc:["Do you know when the shop closes"],hint:"Do you know + what time + the shop + closes.",alt:[["What time does the shop close?","прямой вопрос"],["When does the shop shut?","брит., разговорно"]]},
  {type:"build",f:"o:I have no idea|q:what|s:you|a:are|v:talking about",end:".",ru:"Понятия не имею, о чём ты говоришь.",extra:["do","is"],hint:"Прямой порядок: what you are talking about.",alt:[["What are you talking about?","прямой вопрос"],["I don't follow.","«не понимаю»"]]},
  {type:"tr",ru:"Можешь сказать, когда начинается фильм?",f:"o:Can you tell me|q:when|s:the film|v:starts",acc:["Could you tell me when the film starts","Can you tell me what time the film starts","Could you tell me what time the film starts","Can you tell me when the movie starts"],hint:"Can you tell me + when + the film + starts.",alt:[["When does the film start?","прямой вопрос"],["What time's the film?","разговорно"]]},
  {type:"choose",q:"Do you know if ___ any milk?",opts:["there is","is there","there does","does there"],ans:0,f:"o:Do you know|q:if|s:there|a:is|o:any milk",ru:"Не знаешь, есть ли молоко?",cat:"ind_order",hint:"После if — прямой порядок: there is.",why:{1:"Порядок прямого вопроса не подходит.",2:"does с there не используют.",3:"does не нужен."},alt:[["Is there any milk?","прямой вопрос"],["Have we got any milk?","брит."]]},
  {type:"answer",reply:"It's about two kilometres.",about:"Вежливо спроси, как далеко до станции (Could you tell me how far…).",f:"o:Could you tell me|q:how far|s:the station|a:is",ru:"Не подскажете, далеко ли до станции?",acc:["Could you tell me how far it is to the station","Do you know how far the station is","Can you tell me how far the station is"],hint:"Could you tell me + how far + the station + is.",alt:[["How far is the station?","прямой вопрос"],["Is the station far?","прямой вопрос"]]},
  {type:"fix",wrong:"Do you know does she like jazz?",f:"o:Do you know|q:if|s:she|v:likes|o:jazz",ru:"Ты не знаешь, она любит джаз?",acc:["Do you know whether she likes jazz"],hint:"Вопрос «да / нет» внутри → if, does убираем, -s возвращаем.",alt:[["Does she like jazz?","прямой вопрос"],["Is she into jazz?","разговорно"]]},
  {type:"build",f:"o:Do you know|q:how long|s:it|v:takes",ru:"Ты знаешь, сколько это займёт времени?",extra:["does","take"],hint:"Do you know + how long + it + takes.",alt:[["How long does it take?","прямой вопрос"],["Any idea how long it'll take?","разговорно"]]},
  {type:"focus",s:"He left {because he was tired}.",about:"Начни с Do you know…",f:"o:Do you know|q:why|s:he|v:left",ru:"Ты не знаешь, почему он ушёл?",acc:[],hint:"Do you know + why + he + left (без did, глагол в прошлом).",alt:[["Why did he leave?","прямой вопрос"],["What made him leave?","к подлежащему"]]},
  {type:"choose",q:"Would you mind telling me ___?",opts:["how old you are","how old are you","how old do you be","how you are old"],ans:0,f:"o:Would you mind telling me|q:how old|s:you|a:are",ru:"Вы не против сказать, сколько вам лет?",cat:"ind_order",hint:"Прямой порядок: how old you are.",why:{1:"Порядок прямого вопроса не подходит.",3:"How old — блок, его не разрывают."},alt:[["How old are you?","прямой вопрос"],["May I ask your age?","вежливо"]]},
  {type:"tr",ru:"Интересно, что он сейчас делает.",f:"o:I wonder|q:what|s:he|a:is|v:doing|t:now",end:".",acc:["I wonder what he is up to"],hint:"I wonder + what + he + is doing. Прямой порядок, в конце точка.",alt:[["What's he doing now?","прямой вопрос"],["I wonder what he's up to.","разговорно"]]},
  {type:"fix",wrong:"Could you tell me where can I park?",f:"o:Could you tell me|q:where|s:I|a:can|v:park",ru:"Не подскажете, где можно припарковаться?",acc:[],hint:"Модальный тоже уходит после подлежащего: where I can park.",alt:[["Where can I park?","прямой вопрос"],["Is there a car park near here?","через there"]]},
  {type:"build",f:"o:Can you tell me|q:which bus|s:I|a:should|v:take",ru:"Не подскажете, на какой автобус мне сесть?",extra:["do","can"],hint:"Прямой порядок: which bus I should take.",alt:[["Which bus should I take?","прямой вопрос"],["Which bus goes to the centre?","к подлежащему"]]},
  {type:"choose",q:"I'd like to know ___ you were late.",opts:["why","why were","if why","that why"],ans:0,f:"o:I'd like to know|q:why|s:you|a:were|o:late",end:".",ru:"Я бы хотел знать, почему ты опоздал.",cat:"ind_order",hint:"Прямой порядок: why you were late.",why:{1:"were уже есть в продолжении — второй не нужен, и порядок прямой.",2:"if и why вместе не ставят."},alt:[["Why were you late?","прямой вопрос"],["Can you explain why you were late?","вежливо"]]},
  {type:"answer",reply:"No idea, sorry. I'm new here too.",about:"Спроси, знает ли он, во сколько открывается магазин (Do you know what time…).",f:"o:Do you know|q:what time|s:the shop|v:opens",ru:"Ты не знаешь, во сколько открывается магазин?",acc:["Do you know when the shop opens","Do you know what time the store opens","Do you know when the store opens"],hint:"Do you know + what time + the shop + opens.",alt:[["What time does the shop open?","прямой вопрос"],["When does the shop open?","прямой вопрос"]]},
  {type:"focus",s:"She bought {a new car}.",about:"Начни с Do you know…",f:"o:Do you know|q:what|s:she|v:bought",ru:"Ты не знаешь, что она купила?",acc:[],hint:"Do you know + what + she + bought (без did).",alt:[["What did she buy?","прямой вопрос"],["What did she get?","разговорно"]]},
  {type:"tr",ru:"Ты не знаешь, он женат?",f:"o:Do you know|q:if|s:he|a:is|o:married",acc:["Do you know whether he is married"],hint:"Do you know + if + he + is married.",alt:[["Is he married?","прямой вопрос"],["Is he seeing anyone?","разговорно"]]},
  {type:"choose",q:"Do you have any idea ___?",opts:["where my keys are","where are my keys","where do my keys be","my keys where are"],ans:0,f:"o:Do you have any idea|q:where|s:my keys|a:are",ru:"Ты не знаешь, где мои ключи?",cat:"ind_order",hint:"Прямой порядок: where my keys are.",why:{1:"Порядок прямого вопроса не подходит.",3:"Вопросительное слово — в начале части."},alt:[["Where are my keys?","прямой вопрос"],["Have you seen my keys?","Present Perfect"]]},
  {type:"fix",wrong:"I don't know what does this word mean.",f:"o:I don't know|q:what|s:this word|v:means",end:".",ru:"Я не знаю, что значит это слово.",acc:[],hint:"does убираем, -s возвращаем: this word means.",alt:[["What does this word mean?","прямой вопрос"],["What's the meaning of this word?","через be"]]},
  {type:"build",f:"o:Could you tell me|q:where|s:the toilets|a:are",ru:"Не подскажете, где туалеты?",extra:["is","do"],hint:"Could you tell me + where + the toilets + are.",alt:[["Where are the toilets?","прямой вопрос"],["Excuse me, where's the bathroom?","амер."]]},
  {type:"choose",q:"I wonder ___ it will rain tomorrow.",opts:["whether","that","what","does"],ans:0,f:"o:I wonder|q:whether|s:it|a:will|v:rain|t:tomorrow",end:".",ru:"Интересно, будет ли завтра дождь.",cat:"ind_if",hint:"«Ли» → whether или if.",why:{1:"that — «что». Нужно «ли».",2:"what — «что именно».",3:"does не нужен."},alt:[["Will it rain tomorrow?","прямой вопрос"],["Do you think it'll rain tomorrow?","через think"]]},
  {type:"answer",reply:"Sure. It's 555 2041.",about:"Вежливо спроси его номер телефона (Could you tell me what…).",f:"o:Could you tell me|q:what|s:your phone number|a:is",ru:"Не подскажете ваш номер телефона?",acc:["Could you tell me your phone number","Can you tell me what your phone number is","Can you tell me your phone number","Could I have your phone number","May I have your phone number"],hint:"Could you tell me + what + your phone number + is.",alt:[["What's your number?","прямой вопрос"],["Can I get your number?","разговорно"]]},
  {type:"tr",ru:"Я не помню, где я припарковался.",f:"o:I don't remember|q:where|s:I|v:parked",end:".",acc:["I can't remember where I parked","I can't remember where I parked the car","I don't remember where I parked the car"],hint:"Прямой порядок: where I parked.",alt:[["Where did I park?","прямой вопрос"],["I've forgotten where I parked.","Present Perfect"]]},
  {type:"fix",wrong:"Do you know how much is it?",f:"o:Do you know|q:how much|s:it|a:is",ru:"Ты не знаешь, сколько это стоит?",acc:[],hint:"is уходит в конец: how much it is.",alt:[["How much is it?","прямой вопрос"],["What's the price?","через be"]]},
  {type:"focus",s:"The film is {about a boy who can fly}.",about:"Начни с Do you know…",f:"o:Do you know|q:what|s:the film|a:is|o:about",ru:"Ты не знаешь, о чём фильм?",acc:["Do you know what it is about"],hint:"Do you know + what + the film + is + about.",alt:[["What's the film about?","прямой вопрос"],["What's the story?","разговорно"]]},
  {type:"choose",q:"Can you tell me ___ the train leaves?",opts:["when","when does","does when","if when"],ans:0,f:"o:Can you tell me|q:when|s:the train|v:leaves",ru:"Не подскажете, когда отправляется поезд?",cat:"ind_order",hint:"Без does: when the train leaves.",why:{1:"does в косвенном вопросе не нужен.",3:"if и when вместе не ставят."},alt:[["When does the train leave?","прямой вопрос"],["What time's the train?","разговорно"]]},
  {type:"build",f:"o:I'm not sure|q:if|s:I|a:can|v:come",end:".",ru:"Я не уверен, что смогу прийти.",extra:["do","what"],hint:"I'm not sure + if + I + can come.",alt:[["I might not be able to come.","утверждение"],["I don't know if I can make it.","разговорно"]]},
  {type:"tr",ru:"Скажите, пожалуйста, где ближайшая аптека?",f:"o:Could you tell me|q:where|s:the nearest pharmacy|a:is",acc:["Can you tell me where the nearest pharmacy is","Could you tell me where the nearest chemist is","Do you know where the nearest pharmacy is","Could you tell me where the nearest chemist's is","Could you please tell me where the nearest pharmacy is"],hint:"Could you tell me + where + the nearest pharmacy + is.",alt:[["Where's the nearest pharmacy?","прямой вопрос"],["Is there a chemist's near here?","брит."]]},
  {type:"answer",reply:"She left about an hour ago.",about:"Спроси, знает ли он, когда ушла Анна (Do you know when…).",f:"o:Do you know|q:when|s:Anna|v:left",ru:"Ты не знаешь, когда ушла Анна?",acc:["Do you know what time Anna left","Do you know when Anna went"],hint:"Do you know + when + Anna + left (прошлое без did).",alt:[["When did Anna leave?","прямой вопрос"],["Has Anna gone?","Present Perfect"]]},
  {type:"fix",wrong:"Can you tell me what time is it?",f:"o:Can you tell me|q:what time|s:it|a:is",ru:"Не подскажете, который час?",acc:[],hint:"is — в конец: what time it is.",alt:[["What time is it?","прямой вопрос"],["Have you got the time?","брит., вежливо"]]}
  ]
};
