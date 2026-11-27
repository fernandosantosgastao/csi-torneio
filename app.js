const CLASS_COLORS = {
  "Substantivo": "#38bdf8",
  "Adjetivo":    "#c084fc",
  "Artigo":      "#2dd4bf",
  "Numeral":     "#fb923c",
  "Pronome":     "#818cf8",
  "Verbo":       "#fbbf24",
  "Advérbio":    "#34d399",
  "Preposição":  "#f472b6",
  "Conjunção":   "#a3e635",
  "Interjeição": "#f87171"
};

const GRAMMAR_CLASSES = Object.keys(CLASS_COLORS);
const MAX_QUIZ_ATTEMPTS = 3;
const TEACHER_RESTORE_WINDOW_MS = 7 * 86400000;
const MATH_GATE_INTERVAL = 5;
const MATH_TIME_INTERVAL_MS = 180000;
const MATH_PERSONAL_COOLDOWN_MS = 90000;
const RECOMP_WAIT_SECONDS = 60;

const DEFAULT_STORIES = [
  {
    title: "O Enigma da Cabana do Mago",
    html: `
      1. Na <span class="word-tag" data-w="VELHA">(1) velha</span> <span class="word-tag" data-w="CABANA">(2) cabana</span> abandonada, existia <span class="word-tag" data-w="UM">(3) um</span> baú <span class="word-tag" data-w="AMARELO">(4) amarelo</span> <span class="word-tag" data-w="COM">(5) com</span> <span class="word-tag" data-w="TRINTA">(6) trinta</span> moedas de prata.<br>
      2. O mágico <span class="word-tag" data-w="QUE">(7) que</span> <span class="word-tag" data-w="CUIDA">(8) cuida</span> do lugar exige o dobro das moedas <span class="word-tag" data-w="PARA">(9) para</span> entregar a chave.<br>
      3. <span class="word-tag" data-w="ONTEM">(10) Ontem</span>, dividimos doze pergaminhos igualmente entre quatro cofres, <span class="word-tag" data-w="MAS">(11) mas</span> <span class="word-tag" data-w="NINGUEM">(12) ninguém</span> <span class="word-tag" data-w="ABRIU">(13) abriu</span> a porta.<br>
      4. — <span class="word-tag" data-w="CUIDADO">(14) Cuidado!</span> — gritou o guardião, descendo quinze degraus <span class="word-tag" data-w="DEPRESSA">(15) depressa</span> antes de subir <span class="word-tag" data-w="SEIS">(16) seis</span>.
    `,
    words: [
      { word: "VELHA", display: "(1) velha", cls: "Adjetivo", sentence: "1. Na [velha] cabana abandonada...", hint: "Atribui uma característica ao substantivo 'cabana'." },
      { word: "CABANA", display: "(2) cabana", cls: "Substantivo", sentence: "1. Na velha [cabana] abandonada...", hint: "Nomeia a construção onde o baú estava guardado." },
      { word: "UM", display: "(3) um", cls: "Artigo", sentence: "1. ...existia [um] baú amarelo...", hint: "Artigo indefinido que acompanha o substantivo 'baú'." },
      { word: "AMARELO", display: "(4) amarelo", cls: "Adjetivo", sentence: "1. ...existia um baú [amarelo]...", hint: "Indica a cor/qualidade do substantivo 'baú'." },
      { word: "COM", display: "(5) com", cls: "Preposição", sentence: "1. ...um baú amarelo [com] trinta moedas...", hint: "Palavra invariável que liga dois termos da oração." },
      { word: "TRINTA", display: "(6) trinta", cls: "Numeral", sentence: "1. ...com [trinta] moedas de prata.", hint: "Indica a quantidade exata de moedas no baú." },
      { word: "QUE", display: "(7) que", cls: "Pronome", sentence: "2. O mágico [que] cuida do lugar...", hint: "Pronome relativo que retoma 'O mágico'." },
      { word: "CUIDA", display: "(8) cuida", cls: "Verbo", sentence: "2. O mágico que [cuida] do lugar...", hint: "Indica uma ação no presente do indicativo." },
      { word: "PARA", display: "(9) para", cls: "Preposição", sentence: "2. ...exige o dobro das moedas [para] entregar a chave.", hint: "Palavra invariável que estabelece relação de finalidade." },
      { word: "ONTEM", display: "(10) Ontem", cls: "Advérbio", sentence: "3. [Ontem], dividimos doze pergaminhos...", hint: "Palavra invariável que indica circunstância de tempo." },
      { word: "MAS", display: "(11) mas", cls: "Conjunção", sentence: "3. ...entre quatro cofres, [mas] ninguém abriu a porta.", hint: "Liga duas orações indicando ideia de oposição/contraste." },
      { word: "NINGUEM", display: "(12) ninguém", cls: "Pronome", sentence: "3. ...mas [ninguém] abriu a porta.", hint: "Pronome indefinido que indica ausência de pessoa." },
      { word: "ABRIU", display: "(13) abriu", cls: "Verbo", sentence: "3. ...ninguém [abriu] a porta.", hint: "Indica uma ação concluída no passado (pretérito perfeito)." },
      { word: "CUIDADO", display: "(14) Cuidado!", cls: "Interjeição", sentence: "4. — [Cuidado!] — gritou o guardião...", hint: "Expressa uma advertência ou emoção súbita." },
      { word: "DEPRESSA", display: "(15) depressa", cls: "Advérbio", sentence: "4. ...descendo quinze degraus [depressa]...", hint: "Invariável! Modifica o verbo indicando o modo como desceu." },
      { word: "SEIS", display: "(16) seis", cls: "Numeral", sentence: "4. ...antes de subir [seis].", hint: "Indica a quantidade exata de degraus subidos." }
    ]
  },
  {
    title: "O Tesouro do Navio Fantasma",
    html: `
      1. O <span class="word-tag" data-w="GRANDE">(1) grande</span> <span class="word-tag" data-w="NAVIO">(2) navio</span> ancorou <span class="word-tag" data-w="PERTO">(3) perto</span> da ilha <span class="word-tag" data-w="ESCURA">(4) escura</span> <span class="word-tag" data-w="COM">(5) com</span> <span class="word-tag" data-w="VINTE">(6) vinte</span> caixas de ouro.<br>
      2. O capitão <span class="word-tag" data-w="NOS">(7) nos</span> <span class="word-tag" data-w="AVISOU">(8) avisou</span> que cada caixa guarda o triplo <span class="word-tag" data-w="DE">(9) de</span> rubis brilhantes.<br>
      3. <span class="word-tag" data-w="HOJE">(10) Hoje</span>, repartimos dezoito mapas antigos entre três marujos, <span class="word-tag" data-w="POREM">(11) porém</span> <span class="word-tag" data-w="ALGUEM">(12) alguém</span> <span class="word-tag" data-w="ESCONDEU">(13) escondeu</span> <span class="word-tag" data-w="AS">(14) as</span> chaves.<br>
      4. — <span class="word-tag" data-w="SOCORRO">(15) Socorro!</span> — gritou o pirata, navegando <span class="word-tag" data-w="QUATRO">(16) quatro</span> léguas para o norte.
    `,
    words: [
      { word: "GRANDE", display: "(1) grande", cls: "Adjetivo", sentence: "1. O [grande] navio ancorou...", hint: "Caracteriza o tamanho do substantivo 'navio'." },
      { word: "NAVIO", display: "(2) navio", cls: "Substantivo", sentence: "1. O grande [navio] ancorou...", hint: "Nomeia a embarcação fantasma." },
      { word: "PERTO", display: "(3) perto", cls: "Advérbio", sentence: "1. ...ancorou [perto] da ilha escura...", hint: "Indica circunstância de lugar." },
      { word: "ESCURA", display: "(4) escura", cls: "Adjetivo", sentence: "1. ...da ilha [escura]...", hint: "Qualifica o substantivo 'ilha'." },
      { word: "COM", display: "(5) com", cls: "Preposição", sentence: "1. ...[com] vinte caixas de ouro.", hint: "Conecta termos estabelecendo relação de companhia/posse." },
      { word: "VINTE", display: "(6) vinte", cls: "Numeral", sentence: "1. ...com [vinte] caixas de ouro.", hint: "Indica a quantidade numérica exata de caixas." },
      { word: "NOS", display: "(7) nos", cls: "Pronome", sentence: "2. O capitão [nos] avisou...", hint: "Pronome pessoal oblíquo (a nós)." },
      { word: "AVISOU", display: "(8) avisou", cls: "Verbo", sentence: "2. O capitão nos [avisou]...", hint: "Indica uma ação realizada no passado." },
      { word: "DE", display: "(9) de", cls: "Preposição", sentence: "2. ...o triplo [de] rubis brilhantes.", hint: "Palavra invariável que liga dois substantivos." },
      { word: "HOJE", display: "(10) Hoje", cls: "Advérbio", sentence: "3. [Hoje], repartimos dezoito mapas...", hint: "Indica circunstância de tempo." },
      { word: "POREM", display: "(11) porém", cls: "Conjunção", sentence: "3. ...entre três marujos, [porém] alguém escondeu...", hint: "Conjunção adversativa (equivale a 'mas')." },
      { word: "ALGUEM", display: "(12) alguém", cls: "Pronome", sentence: "3. ...porém [alguém] escondeu as chaves.", hint: "Pronome indefinido referente a pessoa não identificada." },
      { word: "ESCONDEU", display: "(13) escondeu", cls: "Verbo", sentence: "3. ...alguém [escondeu] as chaves.", hint: "Ação praticada no pretérito perfeito." },
      { word: "AS", display: "(14) as", cls: "Artigo", sentence: "3. ...escondeu [as] chaves.", hint: "Artigo definido feminino plural." },
      { word: "SOCORRO", display: "(15) Socorro!", cls: "Interjeição", sentence: "4. — [Socorro!] — gritou o pirata...", hint: "Exclamação que expressa pedido urgente de ajuda." },
      { word: "QUATRO", display: "(16) quatro", cls: "Numeral", sentence: "4. ...navegando [quatro] léguas...", hint: "Indica quantidade exata de léguas." }
    ]
  },
  {
    title: "O Laboratório do Alquimista",
    html: `
      1. <span class="word-tag" data-w="AQUELE">(1) Aquele</span> <span class="word-tag" data-w="CIENTISTA">(2) cientista</span> <span class="word-tag" data-w="MALUCO">(3) maluco</span> <span class="word-tag" data-w="MISTUROU">(4) misturou</span> <span class="word-tag" data-w="OITO">(5) oito</span> gotas <span class="word-tag" data-w="AZUIS">(6) azuis</span> <span class="word-tag" data-w="EM">(7) em</span> <span class="word-tag" data-w="CADA">(8) cada</span> frasco.<br>
      2. <span class="word-tag" data-w="ELE">(9) Ele</span> usou cinco vidros grandes <span class="word-tag" data-w="E">(10) e</span> anotou <span class="word-tag" data-w="TUDO">(11) tudo</span> <span class="word-tag" data-w="RAPIDAMENTE">(12) rapidamente</span> no caderno.<br>
      3. <span class="word-tag" data-w="SEMPRE">(13) Sempre</span> <span class="word-tag" data-w="SOBRA">(14) sobra</span> <span class="word-tag" data-w="UMA">(15) uma</span> poção mágica!<br>
      4. — <span class="word-tag" data-w="EURECA">(16) Eureca!</span> — comemorou o mestre ao ver o brilho dourado.
    `,
    words: [
      { word: "AQUELE", display: "(1) Aquele", cls: "Pronome", sentence: "1. [Aquele] cientista maluco...", hint: "Pronome demonstrativo que situa o substantivo." },
      { word: "CIENTISTA", display: "(2) cientista", cls: "Substantivo", sentence: "1. Aquele [cientista] maluco...", hint: "Nomeia o profissional do laboratório." },
      { word: "MALUCO", display: "(3) maluco", cls: "Adjetivo", sentence: "1. Aquele cientista [maluco]...", hint: "Caracteriza o substantivo 'cientista'." },
      { word: "MISTUROU", display: "(4) misturou", cls: "Verbo", sentence: "1. ...[misturou] oito gotas azuis...", hint: "Indica uma ação no passado." },
      { word: "OITO", display: "(5) oito", cls: "Numeral", sentence: "1. ...misturou [oito] gotas azuis...", hint: "Indica quantidade exata de gotas." },
      { word: "AZUIS", display: "(6) azuis", cls: "Adjetivo", sentence: "1. ...oito gotas [azuis]...", hint: "Indica a cor das gotas." },
      { word: "EM", display: "(7) em", cls: "Preposição", sentence: "1. ...gotas azuis [em] cada frasco.", hint: "Palavra invariável que estabelece relação de lugar." },
      { word: "CADA", display: "(8) cada", cls: "Pronome", sentence: "1. ...em [cada] frasco.", hint: "Pronome indefinido invariável." },
      { word: "ELE", display: "(9) Ele", cls: "Pronome", sentence: "2. [Ele] usou cinco vidros grandes...", hint: "Pronome pessoal do caso reto." },
      { word: "E", display: "(10) e", cls: "Conjunção", sentence: "2. ...cinco vidros grandes [e] anotou tudo...", hint: "Conjunção coordenativa aditiva que liga duas ações." },
      { word: "TUDO", display: "(11) tudo", cls: "Pronome", sentence: "2. ...anotou [tudo] rapidamente...", hint: "Pronome indefinido invariável." },
      { word: "RAPIDAMENTE", display: "(12) rapidamente", cls: "Advérbio", sentence: "2. ...anotou tudo [rapidamente]...", hint: "Indica o modo como ele anotou." },
      { word: "SEMPRE", display: "(13) Sempre", cls: "Advérbio", sentence: "3. [Sempre] sobra uma poção...", hint: "Indica circunstância de tempo/frequência." },
      { word: "SOBRA", display: "(14) sobra", cls: "Verbo", sentence: "3. Sempre [sobra] uma poção mágica!", hint: "Forma verbal no presente do indicativo." },
      { word: "UMA", display: "(15) uma", cls: "Artigo", sentence: "3. ...sobra [uma] poção mágica!", hint: "Artigo indefinido feminino singular." },
      { word: "EURECA", display: "(16) Eureca!", cls: "Interjeição", sentence: "4. — [Eureca!] — comemorou o mestre...", hint: "Exclamação usada ao fazer uma grande descoberta." }
    ]
  },
  {
    title: "A Torre do Relógio Antigo",
    html: `
      1. <span class="word-tag" data-w="DOZE">(1) Doze</span> <span class="word-tag" data-w="ENGRENAGENS">(2) engrenagens</span> <span class="word-tag" data-w="PESADAS">(3) pesadas</span> <span class="word-tag" data-w="GIRAM">(4) giram</span> <span class="word-tag" data-w="LENTAMENTE">(5) lentamente</span> <span class="word-tag" data-w="DENTRO">(6) dentro</span> <span class="word-tag" data-w="DA">(7) da</span> torre.<br>
      2. <span class="word-tag" data-w="NOSSO">(8) Nosso</span> relojoeiro <span class="word-tag" data-w="CONSERTOU">(9) consertou</span> sete peças <span class="word-tag" data-w="ANTES">(10) antes</span> <span class="word-tag" data-w="DO">(11) do</span> meio-dia.<br>
      3. O sino <span class="word-tag" data-w="DOURADO">(12) dourado</span> toca <span class="word-tag" data-w="QUANDO">(13) quando</span> <span class="word-tag" data-w="OS">(14) os</span> ponteiros <span class="word-tag" data-w="SE">(15) se</span> encontram.<br>
      4. — <span class="word-tag" data-w="SILENCIO">(16) Silêncio!</span> — pediu o guarda ao ouvir o mecanismo.
    `,
    words: [
      { word: "DOZE", display: "(1) Doze", cls: "Numeral", sentence: "1. [Doze] engrenagens pesadas...", hint: "Indica a quantidade exata de engrenagens." },
      { word: "ENGRENAGENS", display: "(2) engrenagens", cls: "Substantivo", sentence: "1. Doze [engrenagens] pesadas...", hint: "Nomeia as peças dentadas do relógio." },
      { word: "PESADAS", display: "(3) pesadas", cls: "Adjetivo", sentence: "1. Doze engrenagens [pesadas]...", hint: "Caracteriza o substantivo 'engrenagens'." },
      { word: "GIRAM", display: "(4) giram", cls: "Verbo", sentence: "1. ...engrenagens pesadas [giram] lentamente...", hint: "Indica ação no presente do indicativo." },
      { word: "LENTAMENTE", display: "(5) lentamente", cls: "Advérbio", sentence: "1. ...giram [lentamente] dentro da torre.", hint: "Modifica o verbo indicando o modo como giram." },
      { word: "DENTRO", display: "(6) dentro", cls: "Advérbio", sentence: "1. ...[dentro] da torre.", hint: "Indica circunstância de lugar." },
      { word: "DA", display: "(7) da", cls: "Preposição", sentence: "1. ...dentro [da] torre.", hint: "Contração da preposição 'de' + artigo 'a'." },
      { word: "NOSSO", display: "(8) Nosso", cls: "Pronome", sentence: "2. [Nosso] relojoeiro consertou...", hint: "Pronome possessivo." },
      { word: "CONSERTOU", display: "(9) consertou", cls: "Verbo", sentence: "2. Nosso relojoeiro [consertou] sete peças...", hint: "Ação concluída no passado." },
      { word: "ANTES", display: "(10) antes", cls: "Advérbio", sentence: "2. ...sete peças [antes] do meio-dia.", hint: "Indica circunstância de tempo." },
      { word: "DO", display: "(11) do", cls: "Preposição", sentence: "2. ...antes [do] meio-dia.", hint: "Contração da preposição 'de' + artigo 'o'." },
      { word: "DOURADO", display: "(12) dourado", cls: "Adjetivo", sentence: "3. O sino [dourado] toca...", hint: "Qualifica a cor do substantivo 'sino'." },
      { word: "QUANDO", display: "(13) quando", cls: "Conjunção", sentence: "3. ...toca [quando] os ponteiros se encontram.", hint: "Conjunção temporal que liga duas orações." },
      { word: "OS", display: "(14) os", cls: "Artigo", sentence: "3. ...quando [os] ponteiros se encontram.", hint: "Artigo definido masculino plural." },
      { word: "SE", display: "(15) se", cls: "Pronome", sentence: "3. ...os ponteiros [se] encontram.", hint: "Pronome reflexivo/recíproco." },
      { word: "SILENCIO", display: "(16) Silêncio!", cls: "Interjeição", sentence: "4. — [Silêncio!] — pediu o guarda...", hint: "Exclamação usada para pedir quietude." }
    ]
  }
];

function getLocalCustomStories() {
  try {
    const customRaw = localStorage.getItem("csi_custom_stories");
    if (customRaw) {
      const parsed = JSON.parse(customRaw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function loadStoryBank(cloudStories = null) {
  const localStories = getLocalCustomStories();
  const mergedCustom = Array.isArray(cloudStories) && cloudStories.length > 0
    ? cloudStories
    : localStories;
  return [...DEFAULT_STORIES, ...mergedCustom];
}

let STORY_BANK = loadStoryBank();

async function syncCloudStoriesBank() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/custom_stories?select=title,html,words&order=created_at.asc&limit=50`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (!res.ok) return;
    const rows = await res.json();
    if (Array.isArray(rows) && rows.length > 0) {
      try { localStorage.setItem("csi_custom_stories", JSON.stringify(rows)); } catch (e) {}
      STORY_BANK = loadStoryBank(rows);
    }
  } catch (e) {}
}

function loadModeratorsList() {
  try {
    const raw = localStorage.getItem("csi_moderators_emails");
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return arr.map(e => String(e || "").trim().toLowerCase()).filter(Boolean);
      }
    }
  } catch (e) {}
  return [];
}

function saveModeratorsList(list) {
  const clean = Array.from(new Set(
    (list || []).map(e => String(e || "").trim().toLowerCase()).filter(Boolean)
  ));
  try {
    localStorage.setItem("csi_moderators_emails", JSON.stringify(clean));
  } catch (e) {}
  return clean;
}

let moderatorsList = loadModeratorsList();

async function syncCloudModeratorsList() {
  if (!teacherAuthSession || !teacherAuthSession.access_token) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/moderators?select=email`, {
      cache: "no-store",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${teacherAuthSession.access_token}`
      }
    });
    if (!res.ok) return;
    const rows = await res.json();
    if (Array.isArray(rows)) {
      const emails = rows.map(r => r.email).filter(Boolean);
      moderatorsList = saveModeratorsList(emails);
      renderModeratorsUI();
    }
  } catch (e) {}
}

function isUserAdmin() {
  return !!(teacherAuthSession && teacherProfile && teacherProfile.role === "admin");
}

function isUserModerator() {
  if (!teacherAuthSession || !teacherProfile) return false;
  if (teacherProfile.role === "admin") return true;
  const myEmail = String(teacherProfile.email || teacherAuthSession.user?.email || "").trim().toLowerCase();
  const roomMods = Array.isArray(gameState.moderators) ? gameState.moderators : [];
  return !!(myEmail && (moderatorsList.includes(myEmail) || roomMods.includes(myEmail)));
}

function canModerateCurrentRoom() {
  return isUserModerator();
}

function isRoomDeletedByAdmin(pin) {
  const cleanPin = String(pin || "").trim().toUpperCase();
  const histEntry = roomHistoryEntries.find(h => h.pin === cleanPin);
  return !!(histEntry && histEntry.deleted && histEntry.deletedByAdmin);
}

function isRoomCreator(roomRowOrState, pin) {
  const myUserId = teacherAuthSession?.user?.id || teacherProfile?.id || "";
  const myEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase();
  const ownerId = roomRowOrState?.owner_id || roomRowOrState?.ownerId || "";
  const ownerEmail = String(roomRowOrState?.state?.ownerEmail || roomRowOrState?.ownerEmail || "").trim().toLowerCase();
  if (myUserId && ownerId && String(ownerId) === String(myUserId)) return true;
  if (myEmail && ownerEmail && myEmail === ownerEmail) return true;

  const cleanPin = String(pin || "").trim().toUpperCase();
  const histEntry = roomHistoryEntries.find(h => h.pin === cleanPin);
  return !!(histEntry && myEmail && histEntry.teacherEmail && String(histEntry.teacherEmail).toLowerCase() === myEmail);
}

function canUserManageRoom(roomRowOrState, pin) {
  if (isUserAdmin()) return true;
  if (isRoomDeletedByAdmin(pin)) return false;
  if (isUserModerator()) return true;
  return isRoomCreator(roomRowOrState, pin);
}

function canRestoreDeletedRoom(pin) {
  if (isUserAdmin()) return true;
  const cleanPin = String(pin || "").trim().toUpperCase();
  const histEntry = roomHistoryEntries.find(h => h.pin === cleanPin);
  if (!histEntry || !histEntry.deleted || histEntry.deletedByAdmin) return false;

  const myEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase();
  const isCreator = !!(myEmail && histEntry.teacherEmail && String(histEntry.teacherEmail).toLowerCase() === myEmail);
  if (!isCreator) return false;

  const deletedAtMs = histEntry.deletedAt ? new Date(histEntry.deletedAt).getTime() : 0;
  if (!deletedAtMs) return false;
  return (Date.now() - deletedAtMs) <= TEACHER_RESTORE_WINDOW_MS;
}

function renderModeratorsUI() {
  const listEl = document.getElementById("adminModeratorsList");
  if (!listEl) return;
  if (!moderatorsList.length) {
    listEl.innerHTML = `<span style="font-size:0.76rem; color:var(--text-muted);">Nenhum moderador cadastrado ainda.</span>`;
    return;
  }
  listEl.innerHTML = moderatorsList.map(email => `
    <span class="mod-chip">
      <span>👮 ${email}</span>
      <button type="button" title="Remover moderador" onclick="removeModeratorEmail('${email.replace(/'/g, "\\'")}')">✕</button>
    </span>
  `).join("");
}

async function addModeratorEmail() {
  if (!isUserAdmin()) {
    showToast("⛔ Apenas o administrador pode adicionar moderadores.");
    return;
  }
  const input = document.getElementById("adminModEmailInput");
  const email = String(input.value || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    showToast("Digite um e-mail válido para o moderador.");
    return;
  }
  moderatorsList = saveModeratorsList([...moderatorsList, email]);
  input.value = "";
  renderModeratorsUI();

  if (teacherAuthSession && teacherAuthSession.access_token) {
    await fetch(`${SUPABASE_URL}/rest/v1/moderators`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${teacherAuthSession.access_token}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
      },
      body: JSON.stringify({ email, added_by: teacherAuthSession.user?.id || null })
    }).catch(() => {});
  }

  if (roomPin) {
    gameState.moderators = [...moderatorsList];
    gameState.v = (gameState.v || 1) + 1;
    broadcastRoomStateNow();
    await flushTeacherRoomSaveNow();
  }
  showToast(`👮 ${email} adicionado como moderador!`);
}

async function removeModeratorEmail(email) {
  if (!isUserAdmin()) return;
  moderatorsList = saveModeratorsList(moderatorsList.filter(e => e !== email));
  renderModeratorsUI();

  if (teacherAuthSession && teacherAuthSession.access_token) {
    await fetch(`${SUPABASE_URL}/rest/v1/moderators?email=eq.${encodeURIComponent(email)}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${teacherAuthSession.access_token}`
      }
    }).catch(() => {});
  }

  if (roomPin) {
    gameState.moderators = [...moderatorsList];
    gameState.v = (gameState.v || 1) + 1;
    broadcastRoomStateNow();
    await flushTeacherRoomSaveNow();
  }
  showToast(`Moderador ${email} removido.`);
}

async function moderatePlayerAction(playerKey, actionType, bonusAmount = 50) {
  if (!canModerateCurrentRoom()) {
    showToast("⛔ Sem permissão de moderação.");
    return;
  }
  const p = gameState.players && gameState.players[playerKey];
  if (!p) return;

  if (actionType === "BONUS") {
    p.score = Number(p.score || 0) + Number(bonusAmount || 50);
    p.stageScore = Number(p.stageScore || 0) + Number(bonusAmount || 50);
    showToast(`🎁 +${bonusAmount} pts bônus enviados para ${p.name}!`);
  } else if (actionType === "REINSTATE") {
    p.status = "active";
    showToast(`♻️ ${p.name} foi recolocado na partida!`);
  } else if (actionType === "ELIMINATE") {
    p.status = "eliminated";
    showToast(`🚫 ${p.name} foi eliminado da partida!`);
  }

  gameState.v = (gameState.v || 1) + 1;
  renderTeacherDashboard();
  broadcastRoomStateNow();
  await flushTeacherRoomSaveNow();
}

function inferWordClassHeuristic(rawToken) {
  const clean = String(rawToken || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toUpperCase().replace(/[^A-Z]/g, "");

  if (["O", "A", "OS", "AS", "UM", "UMA", "UNS", "UMAS"].includes(clean)) return "Artigo";
  if (["EM", "DE", "DO", "DA", "DOS", "DAS", "COM", "PARA", "POR", "SEM", "SOB", "SOBRE", "ATE", "ANTE", "APOS"].includes(clean)) return "Preposição";
  if (["E", "MAS", "POREM", "CONTUDO", "TODAVIA", "QUANDO", "SE", "PORQUE", "PORTANTO", "LOGO"].includes(clean)) return "Conjunção";
  if (["EU", "TU", "ELE", "ELA", "NOS", "ELES", "ELAS", "MEU", "NOSSO", "AQUELE", "ESSA", "ESTE", "QUE", "ALGUEM", "NINGUEM", "TUDO", "CADA"].includes(clean)) return "Pronome";
  if (["UM", "DOIS", "TRES", "QUATRO", "CINCO", "SEIS", "SETE", "OITO", "NOVE", "DEZ", "DOZE", "QUINZE", "VINTE", "TRINTA", "CEM", "MIL"].includes(clean)) return "Numeral";
  if (["ONTEM", "HOJE", "AMANHA", "SEMPRE", "NUNCA", "AQUI", "ALI", "PERTO", "LONGE", "DENTRO", "FORA", "ANTES", "DEPOIS", "DEPRESSA"].includes(clean) || clean.endsWith("MENTE")) return "Advérbio";
  if (["CUIDADO", "SOCORRO", "EURECA", "SILENCIO", "OLHA", "OPA", "UFA"].includes(clean)) return "Interjeição";
  if (clean.endsWith("OU") || clean.endsWith("ARAM") || clean.endsWith("IRAM") || clean.endsWith("ERAM") || clean.endsWith("ANDO") || clean.endsWith("ENDO") || clean.endsWith("INDO") || ["E", "FOI", "ERA", "TEM", "FAZ", "VEIO", "VIU", "SOBRA", "GIRAM", "CUIDA", "ABRIU", "AVISOU", "ESCONDEU", "MISTUROU", "CONSERTOU"].includes(clean)) return "Verbo";
  if (clean.endsWith("O") || clean.endsWith("A") || clean.endsWith("OS") || clean.endsWith("AS") || clean.endsWith("AGEM") || clean.endsWith("URA") || clean.endsWith("CAO")) return "Substantivo";
  return "Adjetivo";
}

function buildRandomSupportSentence(wordObj, storyTitle) {
  const templates = [
    `Na investigação "${storyTitle}", observe o uso de [${wordObj.word}] no trecho: ${wordObj.sentence}`,
    `Analise como [${wordObj.word}] funciona na frase do conto: ${wordObj.sentence}`,
    `Contexto em análise (${storyTitle}): ${wordObj.sentence} — qual é a classe de [${wordObj.word}]?`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function randomizeStorySupportSentences(story) {
  const clonedWords = story.words.map(w => ({
    ...w,
    sentence: buildRandomSupportSentence(w, story.title)
  }));
  return { ...story, words: clonedWords };
}

let adminFilteredCandidates = [];

function filterAdminStoryWords() {
  const title = document.getElementById("adminStoryTitle").value.trim() || "Conto Personalizado";
  const text = document.getElementById("adminStoryText").value.trim();
  if (!text) {
    showToast("Escreva ou cole o texto do conto antes de filtrar.");
    return;
  }

  const tokens = text
    .split(/\s+/)
    .map(t => t.replace(/^["""'“”«»()[\],.;:!?—–-]+|["""'“”«»()[\],.;:!?—–-]+$/g, ""))
    .filter(Boolean);

  const seen = new Set();
  const candidates = [];

  for (const rawTok of tokens) {
    const norm = rawTok
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toUpperCase().replace(/[^A-Z]/g, "");

    if (!norm || norm.length > 14 || seen.has(norm)) continue;
    seen.add(norm);

    const guessedCls = inferWordClassHeuristic(rawTok);
    const snippet = text.length > 110 ? text.slice(0, 110) + "..." : text;

    candidates.push({
      word: norm,
      display: `(${candidates.length + 1}) ${rawTok}`,
      cls: guessedCls,
      sentence: snippet,
      hint: `Observe a função de '${rawTok}' (${guessedCls}) no contexto do conto.`
    });

    if (candidates.length >= 24) break;
  }

  adminFilteredCandidates = candidates;
  const previewEl = document.getElementById("adminFilteredPreview");
  const listEl = document.getElementById("adminFilteredWordsList");
  previewEl.classList.remove("hidden");

  if (candidates.length === 0) {
    listEl.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted);">Nenhuma palavra válida encontrada.</div>`;
    return;
  }

  listEl.innerHTML = candidates.map((c, idx) => {
    const checkedAttr = idx < 16 ? "checked" : "";
    const optionsHtml = GRAMMAR_CLASSES.map(cls =>
      `<option value="${cls}" ${cls === c.cls ? "selected" : ""}>${cls}</option>`
    ).join("");
    return `
      <div class="filter-word-item">
        <label>
          <input type="checkbox" class="admin-word-check" data-idx="${idx}" ${checkedAttr}>
          <span>${c.word}</span>
        </label>
        <select class="admin-word-cls" data-idx="${idx}" style="width:auto; padding:4px 6px; font-size:0.74rem;">
          ${optionsHtml}
        </select>
      </div>
    `;
  }).join("");

  showToast(`🔍 ${candidates.length} palavra(s) filtrada(s) em "${title}"! Marque as desejadas e salve.`);
}

async function saveFilteredAdminStory() {
  const title = document.getElementById("adminStoryTitle").value.trim() || "Conto Personalizado";
  const rawText = document.getElementById("adminStoryText").value.trim();

  if (!rawText) {
    showToast("Escreva um conto e filtre as palavras antes de salvar.");
    return;
  }

  if (adminFilteredCandidates.length === 0) {
    filterAdminStoryWords();
  }

  const checks = Array.from(document.querySelectorAll(".admin-word-check"));
  const selects = Array.from(document.querySelectorAll(".admin-word-cls"));
  const selectedWords = [];

  checks.forEach((chk, i) => {
    if (chk.checked && adminFilteredCandidates[i] && selectedWords.length < 16) {
      const chosenCls = selects[i] ? selects[i].value : adminFilteredCandidates[i].cls;
      selectedWords.push({
        ...adminFilteredCandidates[i],
        display: `(${selectedWords.length + 1}) ${adminFilteredCandidates[i].word.toLowerCase()}`,
        cls: chosenCls,
        hint: `Classificação selecionada: ${chosenCls}. Analise o papel da palavra no texto.`
      });
    }
  });

  if (selectedWords.length < 4) {
    showToast("Selecione pelo menos 4 palavras filtradas para montar o conto.");
    return;
  }

  const taggedHtml = rawText.replace(/\b([A-Za-zÀ-ÿ0-9]+)\b/g, (match) => {
    const norm = match.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
    const found = selectedWords.find(w => w.word === norm);
    return found ? `<span class="word-tag" data-w="${found.word}">${match}</span>` : match;
  });

  const newStory = {
    title,
    html: taggedHtml.replace(/\n+/g, "<br>"),
    words: selectedWords
  };

  try {
    const existingCustom = getLocalCustomStories();
    existingCustom.push(newStory);
    localStorage.setItem("csi_custom_stories", JSON.stringify(existingCustom));
  } catch (e) {}

  if (teacherAuthSession && teacherAuthSession.access_token) {
    await fetch(`${SUPABASE_URL}/rest/v1/custom_stories`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${teacherAuthSession.access_token}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        title: newStory.title,
        html: newStory.html,
        words: newStory.words,
        created_by: teacherAuthSession.user?.id || null
      })
    }).catch(() => {});
  }

  STORY_BANK = loadStoryBank();
  document.getElementById("adminStoryTitle").value = "";
  document.getElementById("adminStoryText").value = "";
  document.getElementById("adminFilteredPreview").classList.add("hidden");
  adminFilteredCandidates = [];
  showToast(`💾 Conto "${title}" salvo com ${selectedWords.length} palavras! Já disponível nos sorteios.`);
}

async function pushScoreToGlobalLeaderboard(pointsDelta, wordsDelta, mathDelta) {
  if (!myName || pointsDelta <= 0) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_leaderboard_score`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        p_player_key: myPlayerId || makeCanonicalPlayerId(myName, myClass),
        p_nome: myName,
        p_turma: myClass || "Geral",
        p_pontos: pointsDelta,
        p_palavras: wordsDelta,
        p_matematica: mathDelta
      })
    });
  } catch (e) {}
}

function generateDynamicMathQuestion() {
  const ops = ["ADD", "SUB", "MUL", "DIV"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const contexts = [
    { item: "moedas de prata", place: "no bau do mago" },
    { item: "cristais azuis", place: "no laboratorio" },
    { item: "pergaminhos antigos", place: "na biblioteca secreta" },
    { item: "engrenagens de bronze", place: "na torre do relogio" },
    { item: "rubis brilhantes", place: "no navio fantasma" }
  ];
  const ctx = contexts[Math.floor(Math.random() * contexts.length)];

  let label = "";
  let question = "";
  let correctNum = 0;

  if (op === "ADD") {
    const a = Math.floor(Math.random() * 45) + 15;
    const b = Math.floor(Math.random() * 35) + 12;
    correctNum = a + b;
    label = "ADICAO (+)";
    question = `Havia ${a} ${ctx.item} ${ctx.place} e voce encontrou mais ${b} escondidas. Com quantas ${ctx.item} ficou ao todo?`;
  } else if (op === "SUB") {
    const total = Math.floor(Math.random() * 50) + 40;
    const lost = Math.floor(Math.random() * 25) + 11;
    correctNum = total - lost;
    label = "SUBTRACAO (-)";
    question = `De um total de ${total} ${ctx.item} ${ctx.place}, foram retiradas ${lost}. Quantas ${ctx.item} restaram?`;
  } else if (op === "MUL") {
    const groups = Math.floor(Math.random() * 7) + 3;
    const perGroup = Math.floor(Math.random() * 8) + 4;
    correctNum = groups * perGroup;
    label = "MULTIPLICACAO (x)";
    question = `Existem ${groups} cofres ${ctx.place} e cada cofre guarda exatamente ${perGroup} ${ctx.item}. Qual o total de ${ctx.item}?`;
  } else {
    const divisor = Math.floor(Math.random() * 6) + 3;
    const quotient = Math.floor(Math.random() * 8) + 4;
    const dividend = divisor * quotient;
    correctNum = quotient;
    label = "DIVISAO (/)";
    question = `Voce precisa repartir ${dividend} ${ctx.item} ${ctx.place} igualmente entre ${divisor} investigadores. Quantas cada um recebe?`;
  }

  const wrongs = new Set();
  while (wrongs.size < 3) {
    const offset = (Math.floor(Math.random() * 9) + 1) * (Math.random() < 0.5 ? 1 : -1);
    const candidate = correctNum + offset;
    if (candidate > 0 && candidate !== correctNum) {
      wrongs.add(candidate);
    }
  }

  const allOpts = [correctNum, ...Array.from(wrongs)]
    .sort(() => Math.random() - 0.5)
    .map(n => String(n));

  return {
    op: label,
    question,
    options: allOpts,
    correct: String(correctNum)
  };
}

const GRID_SIZE = 14;

let sbRealtimeClient = null;
let activeRealtimeChannel = null;
let roomChannelReady = false;
let teacherSaveDebounceTimer = null;

let roomHistoryEntries = [];
let deletedRoomSnapshots = {};
let playerStreak = 0;

function getLeaderboardClearedAtMs() {
  try {
    const v = Number(localStorage.getItem("csi_leaderboard_cleared_at_ms") || 0);
    return Number.isFinite(v) ? v : 0;
  } catch (e) {
    return 0;
  }
}

function setLeaderboardClearedAtMs(ts) {
  try {
    localStorage.setItem("csi_leaderboard_cleared_at_ms", String(Number(ts || Date.now())));
  } catch (e) {}
}

function loadRoomHistoryLocal() {
  try {
    const raw = localStorage.getItem("csi_room_history_v2");
    const parsed = raw ? JSON.parse(raw) : [];
    roomHistoryEntries = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    roomHistoryEntries = [];
  }
  try {
    const snapRaw = localStorage.getItem("csi_deleted_room_snapshots_v1");
    const snapParsed = snapRaw ? JSON.parse(snapRaw) : {};
    deletedRoomSnapshots = (snapParsed && typeof snapParsed === "object") ? snapParsed : {};
  } catch (e) {
    deletedRoomSnapshots = {};
  }
}

function saveRoomHistoryLocal() {
  try {
    localStorage.setItem("csi_room_history_v2", JSON.stringify(roomHistoryEntries.slice(0, 100)));
  } catch (e) {}
  try {
    localStorage.setItem("csi_deleted_room_snapshots_v1", JSON.stringify(deletedRoomSnapshots));
  } catch (e) {}
}

function clearRoomHistoryManually() {
  roomHistoryEntries = [];
  deletedRoomSnapshots = {};
  try {
    localStorage.removeItem("csi_room_history_v2");
    localStorage.removeItem("csi_deleted_room_snapshots_v1");
  } catch (e) {}
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();
  showToast("🧹 Histórico limpo manualmente.");
}

async function logRoomHistoryEvent(pin, label, eventType, isOpen, stateSnapshot = null, forceAdminDelete = false) {
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!cleanPin) return;
  const cleanLabel = String(label || `Sala ${cleanPin}`).trim();
  const teacherEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase() || null;
  const existing = roomHistoryEntries.find(r => r.pin === cleanPin);

  if (stateSnapshot && typeof stateSnapshot === "object" && Array.isArray(stateSnapshot.grid)) {
    deletedRoomSnapshots[cleanPin] = JSON.parse(JSON.stringify(stateSnapshot));
  }

  const isDeletedNow = eventType === "DELETED"
    ? true
    : (eventType === "RESTORED" || eventType === "REOPENED" ? false : !!existing?.deleted);

  const deletedByAdminFlag = eventType === "DELETED"
    ? !!(forceAdminDelete || isUserAdmin())
    : (eventType === "RESTORED" || eventType === "REOPENED" ? false : !!existing?.deletedByAdmin);

  const deletedAtIso = eventType === "DELETED"
    ? new Date().toISOString()
    : (eventType === "RESTORED" || eventType === "REOPENED" ? null : (existing?.deletedAt || null));

  const entry = {
    pin: cleanPin,
    label: cleanLabel,
    teacherEmail: existing?.teacherEmail || teacherEmail,
    eventType,
    isOpen: !!isOpen,
    deleted: isDeletedNow,
    deletedByAdmin: deletedByAdminFlag,
    deletedAt: deletedAtIso,
    at: new Date().toISOString()
  };

  roomHistoryEntries = [
    entry,
    ...roomHistoryEntries.filter(r => r.pin !== cleanPin)
  ];
  saveRoomHistoryLocal();
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/room_history_logs`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        room_pin: cleanPin,
        room_label: cleanLabel,
        teacher_email: entry.teacherEmail,
        event_type: eventType,
        is_open: !!isOpen
      })
    });
  } catch (e) {}
}

function renderRoomHistoryPanel() {
  const listEl = document.getElementById("roomHistoryList");
  if (!listEl) return;

  const isAdmin = isUserAdmin();
  const myEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase();

  const visibleHistory = (roomHistoryEntries || []).filter(item => {
    if (item.deleted && item.deletedByAdmin && !isAdmin) return false;
    if (isAdmin) return true;
    return !!(myEmail && item.teacherEmail && String(item.teacherEmail).toLowerCase() === myEmail);
  });

  if (visibleHistory.length === 0) {
    listEl.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted);">Nenhuma sala registrada no histórico ainda.</div>`;
    return;
  }

  listEl.innerHTML = visibleHistory.map(item => {
    const canManage = canUserManageRoom(item, item.pin);
    const badge = item.deleted
      ? `<span style="color:#fda4af; font-weight:800;">🗑️ Excluída</span>`
      : (item.isOpen
        ? `<span style="color:#34d399; font-weight:800;">● Aberta</span>`
        : `<span style="color:#fbbf24; font-weight:800;">🔒 Fechada</span>`);

    let actionBtn = "";
    if (!item.deleted && canManage) {
      actionBtn = item.isOpen
        ? `<button type="button" class="btn-ghost btn-sm" onclick="closeRoomByPin('${item.pin}', '${item.label.replace(/'/g, "\\'")}')">🔒 Fechar</button>`
        : `<button type="button" class="btn-success btn-sm" onclick="reopenRoomByPin('${item.pin}', '${item.label.replace(/'/g, "\\'")}')">🔓 Reabrir Sala</button>`;
    }

    return `
      <div class="saved-room-row">
        <div>
          <strong style="color:var(--gold); letter-spacing:2px;">${item.pin}</strong>
          <span style="font-weight:700; margin-left:6px;">${item.label}</span>
          <div style="font-size:0.75rem; margin-top:2px;">${badge}</div>
        </div>
        <div>${actionBtn}</div>
      </div>
    `;
  }).join("");
}

function renderDeletedRoomsFolder() {
  const boxEl = document.getElementById("adminDeletedRoomsBox");
  const listEl = document.getElementById("adminDeletedRoomsList");
  if (!boxEl || !listEl) return;

  const myEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase();
  const isAdmin = isUserAdmin();

  const deletedItems = (roomHistoryEntries || []).filter(item => {
    if (!item || !item.deleted) return false;
    if (item.deletedByAdmin) return isAdmin;
    return !!(myEmail && item.teacherEmail && String(item.teacherEmail).toLowerCase() === myEmail);
  });

  boxEl.classList.toggle("hidden", !teacherAuthSession || (deletedItems.length === 0 && !isAdmin));
  if (!teacherAuthSession) return;

  if (deletedItems.length === 0) {
    listEl.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted);">Nenhuma sala excluída no momento.</div>`;
    return;
  }

  listEl.innerHTML = deletedItems.map(item => {
    const hasSnap = !!(deletedRoomSnapshots[item.pin] && Array.isArray(deletedRoomSnapshots[item.pin].grid));
    const canRestore = hasSnap && canRestoreDeletedRoom(item.pin);
    let statusNote = "Excluída";
    if (item.deletedByAdmin) {
      statusNote = "Excluída pelo Admin • Somente Admin pode restaurar";
    } else if (!isAdmin) {
      const deletedAtMs = item.deletedAt ? new Date(item.deletedAt).getTime() : 0;
      const within7Days = deletedAtMs && (Date.now() - deletedAtMs) <= TEACHER_RESTORE_WINDOW_MS;
      statusNote = within7Days ? "Excluída por você • Restaurável até 7 dias" : "Excluída por você • Prazo de 7 dias expirado";
    }

    const restoreBtn = canRestore
      ? `<button type="button" class="btn-gold btn-sm" onclick="restoreDeletedRoomByPin('${item.pin}', '${item.label.replace(/'/g, "\\'")}')">♻️ Restaurar Sala</button>`
      : `<span style="font-size:0.75rem; color:var(--text-muted);">Bloqueado</span>`;

    return `
      <div class="saved-room-row">
        <div>
          <strong style="color:#fda4af; letter-spacing:2px;">${item.pin}</strong>
          <span style="font-weight:700; margin-left:6px;">${item.label}</span>
          <div style="font-size:0.75rem; color:var(--text-muted);">${statusNote}</div>
        </div>
        <div>${restoreBtn}</div>
      </div>
    `;
  }).join("");
}

async function refreshRoomHistoryAndRooms() {
  loadRoomHistoryLocal();
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();
  await loadRecentTeacherRooms();
  showToast("↻ Histórico e salas atualizados.");
}

async function deleteRoomByPin(targetPin, targetLabel) {
  const cleanPin = String(targetPin || roomPin || "").trim().toUpperCase();
  if (!cleanPin) return;

  const lookup = await dbGetRoom(cleanPin, false);
  const currentState = (lookup && lookup.exists && lookup.state)
    ? lookup.state
    : (cleanPin === roomPin ? gameState : null);

  if (!canUserManageRoom(lookup, cleanPin) && !canUserManageRoom(currentState, cleanPin)) {
    showToast("⛔ Apenas o criador da sala ou o Admin pode excluir esta sala.");
    return;
  }

  const deletedByAdminAction = isUserAdmin();
  const snapshot = currentState && currentState.grid
    ? { ...currentState, closed: false, started: false, deletedByAdmin: deletedByAdminAction, v: (currentState.v || 1) + 1 }
    : (deletedRoomSnapshots[cleanPin] || null);

  if (currentState) {
    const closedBeforeDelete = { ...currentState, closed: true, started: false, deletedByAdmin: deletedByAdminAction, v: (currentState.v || 1) + 1 };
    await dbSaveRoom(cleanPin, closedBeforeDelete, !teacherAuthSession).catch(() => {});
  }

  await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}`, {
    method: "DELETE",
    headers: getAuthHeaders(false)
  }).catch(() => {});

  if (cleanPin === roomPin) {
    clearSessionState();
    resetToLobby();
  }

  await logRoomHistoryEvent(cleanPin, targetLabel || currentState?.roomLabel || `Sala ${cleanPin}`, "DELETED", false, snapshot, deletedByAdminAction);
  await loadRecentTeacherRooms();
  showToast(deletedByAdminAction
    ? `🗑️ Sala ${cleanPin} excluída pelo Admin! Somente o Admin pode acessar ou restaurar.`
    : `🗑️ Sala ${cleanPin} excluída! Você pode restaurá-la em até 7 dias.`
  );
}

async function restoreDeletedRoomByPin(targetPin, targetLabel) {
  const cleanPin = String(targetPin || "").trim().toUpperCase();
  if (!canRestoreDeletedRoom(cleanPin)) {
    if (isRoomDeletedByAdmin(cleanPin) && !isUserAdmin()) {
      showToast("⛔ Esta sala foi excluída pelo Admin: somente o Admin pode reabrir, acessar ou restaurar.");
    } else {
      showToast("⛔ Prazo de 7 dias para restauração expirado ou sem permissão.");
    }
    return;
  }

  const snap = deletedRoomSnapshots[cleanPin];
  if (!snap || !Array.isArray(snap.grid)) {
    showToast(`⚠️ Sem snapshot salvo para restaurar a sala ${cleanPin}.`);
    return;
  }

  const restoredState = {
    ...snap,
    closed: false,
    deletedByAdmin: false,
    v: (snap.v || 1) + 1
  };

  const saved = await dbSaveRoom(cleanPin, restoredState, false);
  if (!saved.ok) {
    showToast("⚠️ Erro ao restaurar sala no banco: " + saved.error);
    return;
  }

  await logRoomHistoryEvent(cleanPin, targetLabel || restoredState.roomLabel || `Sala ${cleanPin}`, "RESTORED", true, restoredState, false);
  await loadRecentTeacherRooms();
  await createTeacherRoom(cleanPin, targetLabel || restoredState.roomLabel || `Sala ${cleanPin}`);
  showToast(`♻️ Sala ${cleanPin} restaurada com sucesso!`);
}

async function adminNukeAllRoomsAndRanking() {
  if (!isUserAdmin()) {
    showToast("⛔ Apenas o Admin pode executar esta ação.");
    return;
  }
  const confirmed = window.confirm(
    "ATENÇÃO ADMIN: Isso vai FECHAR e EXCLUIR TODAS as salas criadas e LIMPAR o ranking para todos. O histórico será mantido até você limpar manualmente. Deseja continuar?"
  );
  if (!confirmed) return;

  const clearedTs = Date.now();
  const clearedIso = new Date(clearedTs).toISOString();
  setLeaderboardClearedAtMs(clearedTs);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?select=pin,state`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    const rows = res.ok ? await res.json() : [];

    for (const r of (Array.isArray(rows) ? rows : [])) {
      if (!r || !r.pin) continue;
      const p = String(r.pin).trim().toUpperCase();
      const st = { ...(r.state || {}), leaderboardClearedAt: clearedIso, closed: true, started: false, deletedByAdmin: true };
      await logRoomHistoryEvent(p, st.roomLabel || `Sala ${p}`, "DELETED", false, st, true);
      await dbSaveRoom(p, st, false).catch(() => {});
    }

    await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=not.is.null`, {
      method: "DELETE",
      headers: getAuthHeaders(false)
    }).catch(() => {});

    await fetch(`${SUPABASE_URL}/rest/v1/global_leaderboard?pontos_totais=gte.0`, {
      method: "DELETE",
      headers: getAuthHeaders(false)
    }).catch(() => {});

    await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global`, {
      method: "PATCH",
      headers: {
        ...getAuthHeaders(true),
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ leaderboard_cleared_at: clearedIso })
    }).catch(() => {});
  } catch (e) {}

  try {
    localStorage.removeItem("csi_leaderboard_cache");
  } catch (e) {}

  clearSessionState();
  resetToLobby();
  await loadBestPlayersRanking();
  await loadRecentTeacherRooms();
  renderDeletedRoomsFolder();
  showToast("🧨 Todas as salas foram fechadas/excluídas e o ranking foi limpo para todos! Histórico preservado.");
}

async function closeRoomByPin(targetPin, targetLabel) {
  const cleanPin = String(targetPin || roomPin || "").trim().toUpperCase();
  if (!cleanPin) return;

  const lookup = await dbGetRoom(cleanPin, false);
  const currentState = (lookup && lookup.exists && lookup.state)
    ? lookup.state
    : (cleanPin === roomPin ? gameState : { players: {} });

  if (!canUserManageRoom(lookup, cleanPin) && !canUserManageRoom(currentState, cleanPin)) {
    showToast("⛔ Apenas o criador da sala ou o Admin pode fechar esta sala.");
    return;
  }

  const closedState = {
    ...currentState,
    closed: true,
    started: false,
    v: (currentState.v || 1) + 1
  };

  if (cleanPin === roomPin) {
    gameState = closedState;
    renderTeacherDashboard();
  }

  await dbSaveRoom(cleanPin, closedState, !teacherAuthSession);
  broadcastRoomStateNow();
  await logRoomHistoryEvent(cleanPin, targetLabel || closedState.roomLabel || `Sala ${cleanPin}`, "CLOSED", false, closedState, false);
  await loadRecentTeacherRooms();
  showToast(`🔒 Sala ${cleanPin} encerrada! Todos os alunos foram removidos e novas entradas estão bloqueadas.`);
}

async function reopenRoomByPin(targetPin, targetLabel) {
  const cleanPin = String(targetPin || "").trim().toUpperCase();
  if (!cleanPin) return;

  if (isRoomDeletedByAdmin(cleanPin) && !isUserAdmin()) {
    showToast("⛔ Esta sala foi excluída pelo Admin: somente o Admin pode reabrir, acessar ou restaurar.");
    return;
  }

  const histEntry = roomHistoryEntries.find(h => h.pin === cleanPin);
  if (histEntry && histEntry.deleted) {
    await restoreDeletedRoomByPin(cleanPin, targetLabel);
    return;
  }

  const lookup = await dbGetRoom(cleanPin, false);
  const currentState = (lookup && lookup.exists && lookup.state)
    ? lookup.state
    : deletedRoomSnapshots[cleanPin];

  if (!canUserManageRoom(lookup, cleanPin) && !canUserManageRoom(currentState, cleanPin)) {
    showToast("⛔ Apenas o criador da sala ou o Admin pode reabrir esta sala.");
    return;
  }

  if (!currentState) {
    showToast(`Não foi possível localizar os dados da sala ${cleanPin}.`);
    return;
  }

  const reopenedState = {
    ...currentState,
    closed: false,
    v: (currentState.v || 1) + 1
  };

  await dbSaveRoom(cleanPin, reopenedState, !teacherAuthSession);
  await logRoomHistoryEvent(cleanPin, targetLabel || reopenedState.roomLabel || `Sala ${cleanPin}`, "REOPENED", true, reopenedState, false);
  await loadRecentTeacherRooms();

  if (teacherAuthSession && isSubscriptionValid(teacherProfile)) {
    await createTeacherRoom(cleanPin, targetLabel || reopenedState.roomLabel || `Sala ${cleanPin}`);
  }
  showToast(`🔓 Sala ${cleanPin} reaberta! Os alunos já podem entrar novamente.`);
}

function getRealtimeClient() {
  if (sbRealtimeClient) return sbRealtimeClient;
  if (window.supabase && typeof window.supabase.createClient === "function") {
    sbRealtimeClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      realtime: { params: { eventsPerSecond: 60 } }
    });
  }
  return sbRealtimeClient;
}

function subscribeRoomRealtime(pin, onRoomUpdate, onStudentBroadcast) {
  unsubscribeRoomRealtime();
  roomChannelReady = false;
  const client = getRealtimeClient();
  if (!client || !pin) return;

  activeRealtimeChannel = client
    .channel(`room-live-${pin}`, {
      config: { broadcast: { ack: false, self: false } }
    })
    .on("broadcast", { event: "student_action" }, (payload) => {
      if (payload && payload.payload && typeof onStudentBroadcast === "function") {
        onStudentBroadcast(payload.payload);
      }
    })
    .on("broadcast", { event: "room_state" }, (payload) => {
      if (payload && payload.payload && payload.payload.state && typeof onRoomUpdate === "function") {
        onRoomUpdate(payload.payload.state);
      }
    })
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "salas", filter: `pin=eq.${pin}` },
      (payload) => {
        if (payload.new && payload.new.state && typeof onRoomUpdate === "function") {
          onRoomUpdate(payload.new.state);
        }
      }
    )
    .subscribe((status) => {
      roomChannelReady = status === "SUBSCRIBED";
    });
}

function unsubscribeRoomRealtime() {
  roomChannelReady = false;
  if (activeRealtimeChannel && sbRealtimeClient) {
    sbRealtimeClient.removeChannel(activeRealtimeChannel);
  }
  activeRealtimeChannel = null;
}

function broadcastStudentAction(msg) {
  if (activeRealtimeChannel && roomChannelReady) {
    try {
      activeRealtimeChannel.send({
        type: "broadcast",
        event: "student_action",
        payload: msg
      });
    } catch (e) {}
  }
}

function broadcastRoomStateNow() {
  if (activeRealtimeChannel && roomChannelReady && gameState && gameState.grid) {
    try {
      activeRealtimeChannel.send({
        type: "broadcast",
        event: "room_state",
        payload: { state: gameState }
      });
    } catch (e) {}
  }
}

function scheduleTeacherRoomSave() {
  if (teacherSaveDebounceTimer) clearTimeout(teacherSaveDebounceTimer);
  teacherSaveDebounceTimer = setTimeout(async () => {
    teacherSaveDebounceTimer = null;
    if (!roomPin || !gameState || !gameState.grid) return;
    await dbSaveRoom(roomPin, gameState, false);
  }, 1500);
}

async function flushTeacherRoomSaveNow() {
  if (teacherSaveDebounceTimer) {
    clearTimeout(teacherSaveDebounceTimer);
    teacherSaveDebounceTimer = null;
  }
  if (!roomPin || !gameState || !gameState.grid) return { ok: false, error: "Sala não inicializada" };
  return await dbSaveRoom(roomPin, gameState, false);
}

function buildNextStageStateFromCurrent(current) {
  const playersMap = current.players && typeof current.players === "object" ? current.players : {};
  const competingEntries = sortPlayersByTotalScore(
    Object.entries(playersMap).filter(([_, p]) => p && (p.status === "active" || p.status === "repechage")),
    true
  );

  if (competingEntries.length <= 3) {
    competingEntries.forEach(([_, p]) => { p.status = "active"; });
    return {
      ...current,
      finished: true,
      v: (current.v || 1) + 1
    };
  }

  const keepCount = competingEntries.length === 4
    ? 3
    : Math.max(3, Math.ceil(competingEntries.length / 2));

  const eliminateTailCount = competingEntries.length > 5
    ? Math.max(1, Math.floor((competingEntries.length - keepCount) / 2))
    : 0;

  competingEntries.forEach(([_, p], index) => {
    const wasRepechage = p.status === "repechage";
    if (index < keepCount) {
      p.status = "active";
    } else if (wasRepechage || index >= competingEntries.length - eliminateTailCount) {
      p.status = "eliminated";
    } else {
      p.status = "repechage";
    }
    p.stageScore = 0;
  });

  const remainingAfterCut = Object.values(playersMap).filter(
    p => p && (p.status === "active" || p.status === "repechage")
  );
  if (remainingAfterCut.length <= 3) {
    remainingAfterCut.forEach(p => { p.status = "active"; });
    return {
      ...current,
      finished: true,
      v: (current.v || 1) + 1
    };
  }

  const nextStage = (current.stage || 1) + 1;
  let nextStoryIdx = Math.floor(Math.random() * STORY_BANK.length);
  if (nextStoryIdx === current.storyIdx && STORY_BANK.length > 1) {
    nextStoryIdx = (current.storyIdx + 1) % STORY_BANK.length;
  }
  const nextStory = randomizeStorySupportSentences(STORY_BANK[nextStoryIdx]);
  const { grid, placements } = generateGrid(
    (current.roomPin || roomPin || "SALA") + "_stage_" + nextStage + "_" + Date.now(),
    nextStory.words
  );

  return {
    ...current,
    v: (current.v || 1) + 1,
    stage: nextStage,
    storyIdx: nextStoryIdx,
    activeStory: nextStory,
    finished: false,
    grid,
    wordPlacements: placements,
    claimedWords: {}
  };
}

async function persistStudentActionDirectlyToRoom(msg) {
  if (!roomPin || !msg || !msg.name) return;
  const lookup = await dbGetRoom(roomPin, false);
  if (!lookup || !lookup.ok || !lookup.exists || !lookup.state) return;

  let latest = lookup.state;
  if (latest.closed) {
    leaveClosedRoomToJoinScreen("🔒 Esta sala foi encerrada pelo professor. Digite o código de outra sala.");
    return;
  }

  if (!latest.players || typeof latest.players !== "object") latest.players = {};
  if (!latest.claimedWords || typeof latest.claimedWords !== "object") latest.claimedWords = {};

  const canonicalId = makeCanonicalPlayerId(msg.name, msg.cls);
  if (!latest.players[canonicalId]) {
    latest.players[canonicalId] = {
      name: msg.name,
      cls: msg.cls || "Geral",
      score: 0,
      stageScore: 0,
      words: [],
      mathSolved: 0,
      errors: 0,
      status: "active"
    };
  }
  const p = latest.players[canonicalId];

  if (msg.type === "CLAIM_WORD" && latest.started && !latest.finished) {
    const eventStage = msg.stage || latest.stage;
    if (eventStage === latest.stage && p.status === "active" && !latest.claimedWords[msg.word]) {
      latest.claimedWords[msg.word] = { by: p.name, points: msg.points };
      p.score = Number(p.score || 0) + Number(msg.points || 0);
      p.stageScore = Number(p.stageScore || 0) + Number(msg.points || 0);
      if (!Array.isArray(p.words)) p.words = [];
      if (!p.words.includes(msg.word)) p.words.push(msg.word);
    }
  } else if (msg.type === "MATH_SOLVED") {
    p.score = Number(p.score || 0) + Number(msg.points || 0);
    p.stageScore = Number(p.stageScore || 0) + Number(msg.points || 0);
    p.mathSolved = Number(p.mathSolved || 0) + 1;
  } else if (msg.type === "REGISTER_ERROR") {
    p.errors = Number(p.errors || 0) + 1;
  } else if (msg.type === "RECOMP_ELIMINATED" || msg.type === "REPECHAGE_FAIL") {
    p.status = "eliminated";
  } else if (msg.type === "REPECHAGE_PASS") {
    p.status = "active";
    p.score = Number(p.score || 0) + 80;
  }

  const activeStoryObj = (latest.activeStory && Array.isArray(latest.activeStory.words))
    ? latest.activeStory
    : STORY_BANK[(latest.storyIdx || 0) % STORY_BANK.length];
  if (latest.started && !latest.finished && Object.keys(latest.claimedWords).length >= activeStoryObj.words.length) {
    latest = buildNextStageStateFromCurrent({ ...latest, roomPin });
  } else {
    latest.v = (latest.v || 1) + 1;
  }

  await dbSaveRoom(roomPin, latest, true);
  if (activeRealtimeChannel && roomChannelReady) {
    try {
      activeRealtimeChannel.send({
        type: "broadcast",
        event: "room_state",
        payload: { state: latest }
      });
    } catch (e) {}
  }
  reconcileRemoteStudentRoomState(latest);
}

function launchConfettiBurst(count = 65) {
  const layer = document.getElementById("confettiLayer");
  if (!layer) return;
  layer.innerHTML = "";
  layer.classList.remove("hidden");

  const palette = ["#fbbf24", "#38bdf8", "#a855f7", "#10b981", "#f472b6", "#fb923c"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor = palette[i % palette.length];
    piece.style.width = (Math.random() * 8 + 6) + "px";
    piece.style.height = (Math.random() * 10 + 8) + "px";
    const duration = (Math.random() * 1.8 + 1.8).toFixed(2);
    const delay = (Math.random() * 0.6).toFixed(2);
    piece.style.animationDuration = duration + "s";
    piece.style.animationDelay = delay + "s";
    layer.appendChild(piece);
  }

  setTimeout(() => {
    layer.classList.add("hidden");
    layer.innerHTML = "";
  }, 3800);
}

function configureWinnerModalStyle(isWinnerUser) {
  const card = document.getElementById("victoryModalCard");
  const badge = document.getElementById("winnerSpecialBadge");
  const emoji = document.getElementById("victoryEmoji");

  if (isWinnerUser) {
    card.classList.add("winner-showcase");
    badge.classList.remove("hidden");
    emoji.textContent = "👑";
    launchConfettiBurst(75);
  } else {
    card.classList.remove("winner-showcase");
    badge.classList.add("hidden");
    emoji.textContent = "🏆";
  }
}

function triggerFinalBoardCelebration() {
  victoryModalDismissedForMatch = true;
  document.getElementById("victoryModal").classList.add("hidden");
  launchConfettiBurst(45);

  const activeGrid = isBotModeActive
    ? document.getElementById("botWsGrid")
    : document.getElementById("wsGrid");

  if (activeGrid) {
    activeGrid.classList.add("celebration-mode");
    const foundCells = Array.from(activeGrid.querySelectorAll(".cell.found"));
    foundCells.forEach((cell, idx) => {
      setTimeout(() => {
        cell.classList.remove("celebrate-pop");
        void cell.offsetWidth;
        cell.classList.add("celebrate-pop");
      }, idx * 28);
    });
    setTimeout(() => {
      activeGrid.classList.remove("celebration-mode");
    }, 3600);
  }

  showToast("🎉 Tabuleiro final iluminado! Parabéns pela investigação!");
}

function renderLeaderboardRows(tbody, topList) {
  if (!topList || topList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Nenhum participante pontuou ainda.</td></tr>`;
    return;
  }
  const medals = ["🥇", "🥈", "🥉"];
  tbody.innerHTML = topList.map((r, i) => `
    <tr>
      <td><strong>${medals[i] || ("#" + (i + 1))}</strong></td>
      <td><strong>${r.nome}</strong></td>
      <td style="color:var(--text-muted);">${r.turma || "Geral"}</td>
      <td style="color:var(--gold); font-weight:900;">${r.pontos_totais} pts</td>
      <td>${r.total_palavras}</td>
      <td style="color:#d8b4fe; font-weight:700;">🧮 ${r.total_matematica}</td>
    </tr>
  `).join("");
}

async function loadBestPlayersRanking() {
  const tbody = document.getElementById("bestRankingBody");
  if (!tbody) return;

  try {
    let clearedMs = getLeaderboardClearedAtMs();
    try {
      const cfgRes = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global&select=leaderboard_cleared_at`, {
        cache: "no-store",
        headers: { "apikey": SUPABASE_KEY }
      });
      if (cfgRes.ok) {
        const cfgRows = await cfgRes.json();
        if (Array.isArray(cfgRows) && cfgRows[0]?.leaderboard_cleared_at) {
          const remoteMs = new Date(cfgRows[0].leaderboard_cleared_at).getTime();
          if (Number.isFinite(remoteMs) && remoteMs > clearedMs) {
            clearedMs = remoteMs;
            setLeaderboardClearedAtMs(remoteMs);
          }
        }
      }
    } catch (e) {}

    const salasRes = await fetch(`${SUPABASE_URL}/rest/v1/salas?select=state,updated_at&limit=30`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    const salasRows = salasRes.ok ? await salasRes.json() : [];

    if (Array.isArray(salasRows)) {
      salasRows.forEach(row => {
        const stCleared = row?.state?.leaderboardClearedAt ? new Date(row.state.leaderboardClearedAt).getTime() : 0;
        if (Number.isFinite(stCleared) && stCleared > clearedMs) {
          clearedMs = stCleared;
          setLeaderboardClearedAtMs(stCleared);
        }
      });
    }

    const lbRes = await fetch(
      `${SUPABASE_URL}/rest/v1/global_leaderboard?select=*&order=pontos_totais.desc&limit=10`,
      { cache: "no-store", headers: { "apikey": SUPABASE_KEY } }
    );
    if (lbRes.ok) {
      const lbRows = await lbRes.json();
      if (Array.isArray(lbRows) && lbRows.length > 0) {
        const filteredRows = lbRows.filter(r => {
          const tsStr = r.updated_at || r.created_at;
          if (!clearedMs || !tsStr) return !clearedMs;
          const rowMs = new Date(tsStr).getTime();
          return Number.isFinite(rowMs) && rowMs > clearedMs;
        });
        if (filteredRows.length > 0) {
          renderLeaderboardRows(tbody, filteredRows);
          return;
        }
        renderLeaderboardRows(tbody, []);
        return;
      }
    }

    const aggregated = {};
    salasRows.forEach(row => {
      const updatedMs = row?.updated_at ? new Date(row.updated_at).getTime() : 0;
      if (clearedMs && (!updatedMs || updatedMs <= clearedMs)) return;

      const players = row && row.state && row.state.players;
      if (!players || typeof players !== "object") return;
      Object.values(players).forEach(p => {
        if (!p || !p.name) return;
        const key = makeCanonicalPlayerId(p.name, p.cls);
        if (!aggregated[key]) {
          aggregated[key] = {
            nome: p.name,
            turma: p.cls || "Geral",
            pontos_totais: 0,
            total_palavras: 0,
            total_matematica: 0
          };
        }
        aggregated[key].pontos_totais += (p.score || 0);
        aggregated[key].total_palavras += Array.isArray(p.words) ? p.words.length : 0;
        aggregated[key].total_matematica += (p.mathSolved || 0);
      });
    });

    const topList = Object.values(aggregated)
      .sort((a, b) => b.pontos_totais - a.pontos_totais || b.total_palavras - a.total_palavras)
      .slice(0, 10);

    renderLeaderboardRows(tbody, topList);
  } catch (e) {
    renderLeaderboardRows(tbody, []);
  }
}

let isBotTestEnabledGlobally = false;
let isBotModeActive = false;
let botTimer = null;
let botPlayers = [];
let botStory = STORY_BANK[0];
let botGrid = [];
let botPlacements = [];
let botClaimedWords = {};
let botLastMilestone = 0;
let lastBuiltBotGridKey = "";

async function fetchGlobalBotTestFlag() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global&select=bot_test_enabled`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (!res.ok) return;
    const rows = await res.json();
    if (rows.length > 0) {
      isBotTestEnabledGlobally = !!rows[0].bot_test_enabled;
      renderBotTestVisibility();
    }
  } catch (e) {}
}

function renderBotTestVisibility() {
  const btnVisitor = document.getElementById("btnOpenBotTest");
  const isAdmin = isUserAdmin();

  if (btnVisitor) {
    btnVisitor.classList.toggle("hidden", !isBotTestEnabledGlobally);
  }

  const adminBox = document.getElementById("adminBotControlBox");
  const modBox = document.getElementById("adminModPanelBox");
  const storyBox = document.getElementById("adminStoryCreatorBox");
  const dangerResetBox = document.getElementById("adminDangerResetBox");
  const toggleBtn = document.getElementById("btnToggleBotTest");
  const statusLbl = document.getElementById("adminBotStatusLabel");

  if (modBox) {
    modBox.classList.toggle("hidden", !isAdmin);
    if (isAdmin) renderModeratorsUI();
  }

  if (storyBox) {
    storyBox.classList.toggle("hidden", !isAdmin);
  }

  if (dangerResetBox) {
    dangerResetBox.classList.toggle("hidden", !isAdmin);
  }

  renderDeletedRoomsFolder();

  if (adminBox && toggleBtn && statusLbl) {
    adminBox.classList.toggle("hidden", !isAdmin);
    if (isBotTestEnabledGlobally) {
      statusLbl.textContent = "Status: LIBERADO para teste com 4 bots";
      statusLbl.style.color = "#34d399";
      toggleBtn.textContent = "🔒 Bloquear Teste";
    } else {
      statusLbl.textContent = "Status: BLOQUEADO (somente você pode liberar)";
      statusLbl.style.color = "#fda4af";
      toggleBtn.textContent = "🔓 Liberar Teste";
    }
  }
}

async function toggleBotTestPermission() {
  if (!isUserAdmin()) {
    showToast("⛔ Apenas o administrador da plataforma pode liberar ou bloquear o modo teste.");
    return;
  }

  const nextValue = !isBotTestEnabledGlobally;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${teacherAuthSession.access_token}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({ bot_test_enabled: nextValue, updated_at: new Date().toISOString() })
  });

  if (res.ok) {
    isBotTestEnabledGlobally = nextValue;
    renderBotTestVisibility();
    showToast(nextValue
      ? "🔓 Modo Teste (4 Bots) liberado na tela inicial!"
      : "🔒 Modo Teste (4 Bots) bloqueado na tela inicial.");
  } else {
    showToast("⚠️ Erro ao atualizar permissão no banco. Verifique a política SQL do admin.");
  }
}

let teacherAuthSession = null;
let teacherProfile = null;
let authMode = "login";

function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById("tabLogin").classList.toggle("active", mode === "login");
  document.getElementById("tabSignup").classList.toggle("active", mode === "signup");
  document.getElementById("signupNameGroup").classList.toggle("hidden", mode === "login");
  document.getElementById("btnAuthSubmit").textContent = mode === "login"
    ? "🔐 Entrar como Professor"
    : "✨ Criar Conta e Iniciar 7 Dias Grátis";
}

async function submitTeacherAuth() {
  const email = document.getElementById("authEmail").value.trim().toLowerCase();
  const password = document.getElementById("authPassword").value;
  const fullName = document.getElementById("authTeacherName").value.trim();

  if (!email || password.length < 6) {
    showToast("Informe um e-mail válido e senha com no mínimo 6 caracteres.");
    return;
  }

  const btn = document.getElementById("btnAuthSubmit");
  btn.disabled = true;

  try {
    if (authMode === "signup") {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          data: { full_name: fullName || email.split("@")[0] }
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("Erro ao cadastrar: " + (data.msg || data.error_description || "verifique os dados"));
        return;
      }
      if (data.access_token) {
        teacherAuthSession = { access_token: data.access_token, user: data.user };
        localStorage.setItem("csi_teacher_auth", JSON.stringify(teacherAuthSession));
        await loadTeacherSubscriptionProfile();
        showToast("Conta criada! Seu teste gratuito de 7 dias está ativo.");
      } else {
        showToast("Cadastro realizado! Confirme o link enviado no seu e-mail e faça login.");
        switchAuthTab("login");
      }
    } else {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        showToast("E-mail ou senha inválidos.");
        return;
      }
      teacherAuthSession = { access_token: data.access_token, user: data.user };
      localStorage.setItem("csi_teacher_auth", JSON.stringify(teacherAuthSession));
      await loadTeacherSubscriptionProfile();
      showToast("Login realizado com sucesso!");
    }
  } finally {
    btn.disabled = false;
  }
}

async function loadTeacherSubscriptionProfile() {
  if (!teacherAuthSession || !teacherAuthSession.access_token) return false;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${teacherAuthSession.user.id}&select=*`, {
      cache: "no-store",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${teacherAuthSession.access_token}`
      }
    });

    if (!res.ok) {
      logoutTeacher(true);
      return false;
    }

    const rows = await res.json();
    if (rows.length === 0) {
      teacherProfile = {
        id: teacherAuthSession.user.id,
        email: teacherAuthSession.user.email,
        full_name: teacherAuthSession.user.email.split("@")[0],
        role: "teacher",
        subscription_status: "trial",
        plan_tier: "trial",
        trial_ends_at: new Date(Date.now() + 7 * 86400000).toISOString()
      };
    } else {
      teacherProfile = rows[0];
    }

    renderTeacherAuthUI();
    renderBotTestVisibility();
    renderRoomHistoryPanel();
    renderDeletedRoomsFolder();
    await Promise.all([loadRecentTeacherRooms(), syncCloudModeratorsList()]);
    return true;
  } catch (e) {
    return false;
  }
}

async function loadRecentTeacherRooms() {
  const listEl = document.getElementById("savedRoomsList");
  const headerTitleEl = document.getElementById("savedRoomsHeaderTitle");
  if (!listEl) return;

  const isAdmin = isUserAdmin();
  const myUserId = teacherAuthSession?.user?.id || teacherProfile?.id || "";
  const myEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase();

  if (headerTitleEl) {
    headerTitleEl.textContent = isAdmin
      ? "📂 Todas as Salas Abertas / Recentes (Admin)"
      : "📂 Minhas Salas Criadas";
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?select=pin,state,owner_id&limit=50`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (!res.ok) {
      listEl.innerHTML = `<div style="font-size:0.82rem; color:var(--text-muted);">Não foi possível consultar salas recentes.</div>`;
      return;
    }
    const rows = await res.json();
    const validRooms = rows
      .filter(r => {
        if (!r || !r.pin || !r.state || !r.state.grid) return false;
        const cleanPin = String(r.pin).trim().toUpperCase();
        const histEntry = roomHistoryEntries.find(h => h.pin === cleanPin);
        if (histEntry && histEntry.deleted) return false;
        if (r.state.deletedByAdmin && !isAdmin) return false;
        if (isAdmin) return true;
        const ownerMatch = !!(myUserId && r.owner_id === myUserId);
        const stateEmailMatch = !!(myEmail && r.state.ownerEmail && String(r.state.ownerEmail).toLowerCase() === myEmail);
        return ownerMatch || stateEmailMatch;
      })
      .slice(0, 12);

    if (validRooms.length === 0) {
      listEl.innerHTML = `<div style="font-size:0.82rem; color:var(--text-muted);">Nenhuma sala criada por você encontrada.</div>`;
      return;
    }

    listEl.innerHTML = validRooms.map(r => {
      const st = r.state;
      const pCount = Object.keys(st.players || {}).length;
      const label = st.roomLabel || "Sala";
      const isClosed = !!st.closed;
      const statusTxt = isClosed
        ? "🔒 Encerrada"
        : (st.finished ? "Finalizada" : (st.started ? `Fase ${st.stage || 1}` : "Espera"));

      const toggleStateBtn = isClosed
        ? `<button type="button" class="btn-success btn-sm" onclick="reopenRoomByPin('${r.pin}', '${label.replace(/'/g, "\\'")}')">🔓 Reabrir</button>`
        : `<button type="button" class="btn-ghost btn-sm" onclick="closeRoomByPin('${r.pin}', '${label.replace(/'/g, "\\'")}')">🔒 Fechar</button>`;

      const actionButtons = `
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${!isClosed ? `<button type="button" class="btn-primary btn-sm" onclick="reopenExistingRoom('${r.pin}', '${label.replace(/'/g, "\\'")}')">Abrir</button>` : ""}
          ${toggleStateBtn}
          <button type="button" class="btn-danger btn-sm" onclick="deleteRoomByPin('${r.pin}', '${label.replace(/'/g, "\\'")}')">🗑️ Excluir</button>
        </div>
      `;

      return `
        <div class="saved-room-row">
          <div>
            <strong style="color:var(--gold); letter-spacing:2px;">${r.pin}</strong>
            <span style="font-weight:700; margin-left:6px;">${label}</span>
            <div style="font-size:0.76rem; color:${isClosed ? '#fda4af' : 'var(--text-muted)'};">${statusTxt} • ${pCount} aluno(s)</div>
          </div>
          ${actionButtons}
        </div>
      `;
    }).join("");
  } catch (e) {
    listEl.innerHTML = `<div style="font-size:0.82rem; color:var(--text-muted);">Erro ao carregar salas.</div>`;
  }
}

async function reopenExistingRoom(pin, label) {
  await reopenRoomByPin(pin, label);
}

function isSubscriptionValid(profile) {
  if (!profile) return false;
  if (profile.role === "admin") return true;
  if (profile.subscription_status === "active") return true;
  if (profile.subscription_status === "trial" && profile.trial_ends_at) {
    return new Date(profile.trial_ends_at).getTime() > Date.now();
  }
  return false;
}

function renderTeacherAuthUI() {
  const authBox = document.getElementById("teacherAuthBox");
  const loggedBox = document.getElementById("teacherLoggedBox");

  if (!teacherAuthSession || !teacherProfile) {
    authBox.classList.remove("hidden");
    loggedBox.classList.add("hidden");
    return;
  }

  authBox.classList.add("hidden");
  loggedBox.classList.remove("hidden");

  const roleBadge = teacherProfile.role === "admin" ? " [ADMIN]" : "";
  document.getElementById("teacherProfileName").textContent = (teacherProfile.full_name || teacherProfile.email) + roleBadge;

  const valid = isSubscriptionValid(teacherProfile);
  const banner = document.getElementById("subscriptionBanner");
  const statusTxt = document.getElementById("teacherSubStatusText");
  const btnCreate = document.getElementById("btnCreateRoom");
  const upgradeBox = document.getElementById("upgradeBox");

  if (valid) {
    banner.classList.remove("expired");
    btnCreate.disabled = false;
    upgradeBox.classList.add("hidden");

    if (teacherProfile.role === "admin") {
      statusTxt.textContent = "🛡️ Acesso Administrativo Master Ativo";
      statusTxt.style.color = "#c084fc";
    } else if (teacherProfile.subscription_status === "active") {
      statusTxt.textContent = `✅ Plano ${teacherProfile.plan_tier.toUpperCase()} Ativo`;
      statusTxt.style.color = "#34d399";
    } else {
      const daysLeft = Math.max(1, Math.ceil((new Date(teacherProfile.trial_ends_at).getTime() - Date.now()) / 86400000));
      statusTxt.textContent = `🎁 Teste Grátis Ativo (${daysLeft} dia(s) restante(s))`;
      statusTxt.style.color = "#fbbf24";
    }
  } else {
    banner.classList.add("expired");
    btnCreate.disabled = true;
    upgradeBox.classList.remove("hidden");
    statusTxt.textContent = "⛔ Assinatura Expirada — Renove para criar salas";
    statusTxt.style.color = "#fda4af";
  }
}

function logoutTeacher(silent = false) {
  teacherAuthSession = null;
  teacherProfile = null;
  localStorage.removeItem("csi_teacher_auth");
  clearSessionState();
  renderTeacherAuthUI();
  renderBotTestVisibility();
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();
  if (!silent) showToast("Você saiu da conta de professor.");
}

function makeCanonicalPlayerId(name, cls) {
  const cleanName = (name || "aluno")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanCls = (cls || "geral")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]/g, "");
  return `u_${cleanName}_${cleanCls}`;
}

let myPlayerId = "";
let roomPin = "";
let pollTimer = null;
let joinRetryTimer = null;
let lastBuiltGridKey = "";
let victoryModalDismissedForMatch = false;

let gameState = {
  v: 1,
  started: false,
  closed: false,
  stage: 1,
  storyIdx: 0,
  finished: false,
  roomLabel: "",
  ownerEmail: "",
  moderators: [],
  grid: [],
  wordPlacements: [],
  claimedWords: {},
  players: {},
  activeStory: null
};

let myName = "";
let myClass = "";
let activeQuizWord = null;
let quizAttempts = 0;
let wrongQuizClasses = new Set();

let myLocalWords = new Set();
let myLocalScore = 0;
let isMathLocked = false;
let currentMathChallenge = null;
let mathAttempts = 0;
let solvedMathCount = 0;
let lastTriggeredGlobalMilestone = 0;
let lastMathPromptAtMs = 0;

let isRecompLocked = false;
let recompTimerInterval = null;
let recompSecondsLeft = RECOMP_WAIT_SECONDS;
let recompMathProgress = 0;
let recompMathErrors = 0;
let currentRecompMathQuestion = null;

let repStep = 0;
let currentRepQuestion = null;
let isAdvancingStage = false;

function saveSessionState(role, extra = {}) {
  try {
    const session = {
      role,
      pin: roomPin,
      name: myName,
      cls: myClass,
      roomLabel: extra.roomLabel || gameState.roomLabel || "",
      repStep,
      solvedMathCount,
      lastTriggeredGlobalMilestone
    };
    localStorage.setItem("csi_active_session", JSON.stringify(session));
  } catch (e) {}
}

function clearSessionState() {
  try { localStorage.removeItem("csi_active_session"); } catch (e) {}
}

function exitAndClearSession() {
  clearSessionState();
  resetToLobby();
  loadBestPlayersRanking();
  if (teacherAuthSession && teacherProfile) {
    loadRecentTeacherRooms();
  }
}

function hideAllStudentModals() {
  document.getElementById("quizModal").classList.add("hidden");
  activeQuizWord = null;
  wrongQuizClasses = new Set();
  ["mathModal", "recompositionModal", "repechageModal", "eliminatedModal", "victoryModal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function leaveClosedRoomToJoinScreen(toastMsg = "🔒 A sala foi encerrada pelo professor. Entre em outra sala.") {
  clearSessionState();
  roomPin = "";
  gameState = {
    v: 1,
    started: false,
    closed: false,
    stage: 1,
    storyIdx: 0,
    finished: false,
    roomLabel: "",
    ownerEmail: "",
    moderators: [],
    grid: [],
    wordPlacements: [],
    claimedWords: {},
    players: {},
    activeStory: null
  };
  hideAllStudentModals();
  resetToLobby();
  if (typeof window.selectLobbyRole === "function") {
    window.selectLobbyRole("student");
  }
  const pinInput = document.getElementById("inputPin");
  if (pinInput) {
    pinInput.value = "";
    pinInput.focus();
  }
  if (toastMsg) showToast(toastMsg);
}

function getCurrentStory() {
  if (gameState && gameState.activeStory && Array.isArray(gameState.activeStory.words)) {
    return gameState.activeStory;
  }
  const idx = (gameState.storyIdx || 0) % STORY_BANK.length;
  return STORY_BANK[idx];
}

function getWordClassMap() {
  const map = {};
  getCurrentStory().words.forEach(w => { map[w.word] = w.cls; });
  return map;
}

function renderLegends() {
  const html = GRAMMAR_CLASSES.map(cls =>
    `<span class="legend-pill" style="background:${CLASS_COLORS[cls]};">${cls}</span>`
  ).join("");
  ["lobbyLegendBar", "teacherLegendBar", "studentLegendBar", "botLegendBar"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

function resetToLobby() {
  if (pollTimer) clearInterval(pollTimer);
  if (joinRetryTimer) clearInterval(joinRetryTimer);
  if (botTimer) clearInterval(botTimer);
  if (recompTimerInterval) clearInterval(recompTimerInterval);
  if (teacherSaveDebounceTimer) clearTimeout(teacherSaveDebounceTimer);
  unsubscribeRoomRealtime();
  isBotModeActive = false;
  isRecompLocked = false;
  victoryModalDismissedForMatch = false;
  playerStreak = 0;
  document.body.classList.remove("pseudo-fullscreen");
  document.body.classList.remove("focus-wordsearch-mode");
  const fab = document.getElementById("btnExitFocusFab");
  if (fab) fab.classList.add("hidden");
  document.getElementById("viewTeacher").classList.add("hidden");
  document.getElementById("viewStudent").classList.add("hidden");
  document.getElementById("viewBotTest").classList.add("hidden");
  document.getElementById("btnExitRoom").classList.add("hidden");
  document.getElementById("viewLobby").classList.remove("hidden");
  if (typeof window.openRoleGateway === "function") {
    window.openRoleGateway();
  }
  setNetStatus("online", "Nuvem Pronta");
}

function toggleFullscreen() {
  const docEl = document.documentElement;
  const isPseudoFs = document.body.classList.contains("pseudo-fullscreen");
  const isNativeFs = document.fullscreenElement || document.webkitFullscreenElement;
  const playingWordsearch =
    (!document.getElementById("viewStudent").classList.contains("hidden") && gameState.started) ||
    !document.getElementById("viewBotTest").classList.contains("hidden");

  if (!isPseudoFs) {
    document.body.classList.add("pseudo-fullscreen");
    if (playingWordsearch) {
      document.body.classList.add("focus-wordsearch-mode");
      const fab = document.getElementById("btnExitFocusFab");
      if (fab) fab.classList.remove("hidden");
    }
    if (!isNativeFs) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        try { docEl.webkitRequestFullscreen(); } catch (e) {}
      }
    }
    showToast(playingWordsearch ? "Modo foco: grade ampliada para jogar!" : "Tela cheia ativada");
  } else {
    document.body.classList.remove("pseudo-fullscreen");
    document.body.classList.remove("focus-wordsearch-mode");
    const fab = document.getElementById("btnExitFocusFab");
    if (fab) fab.classList.add("hidden");
    if (isNativeFs) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        try { document.webkitExitFullscreen(); } catch (e) {}
      }
    }
    showToast("Tela cheia desativada");
  }
}

function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3800);
}

function setNetStatus(status, text) {
  const dot = document.getElementById("netDot");
  dot.className = "dot " + status;
  document.getElementById("netText").textContent = text;
}

function createSeededRandom(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function() {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateGrid(seedString, wordsList) {
  const rng = createSeededRandom(seedString);
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  const placements = [];
  const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const sortedWords = [...wordsList].sort((a, b) => b.word.length - a.word.length);

  for (const item of sortedWords) {
    let placed = false;
    let tries = 0;
    while (!placed && tries < 400) {
      tries++;
      const [dr, dc] = dirs[Math.floor(rng() * dirs.length)];
      const r0 = Math.floor(rng() * GRID_SIZE);
      const c0 = Math.floor(rng() * GRID_SIZE);
      const rEnd = r0 + dr * (item.word.length - 1);
      const cEnd = c0 + dc * (item.word.length - 1);

      if (rEnd < 0 || rEnd >= GRID_SIZE || cEnd < 0 || cEnd >= GRID_SIZE) continue;

      let canPlace = true;
      const coords = [];
      for (let i = 0; i < item.word.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        if (grid[r][c] !== "" && grid[r][c] !== item.word[i]) {
          canPlace = false;
          break;
        }
        coords.push(`${r},${c}`);
      }

      if (canPlace) {
        for (let i = 0; i < item.word.length; i++) {
          const r = r0 + dr * i;
          const c = c0 + dc * i;
          grid[r][c] = item.word[i];
        }
        placements.push({ word: item.word, coords });
        placed = true;
      }
    }
  }

  const letters = "ABCDEFGHIJLMNOPQRSTUVXZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(rng() * letters.length)];
      }
    }
  }

  return { grid, placements };
}

function getAuthHeaders(includeJson = false) {
  const headers = { "apikey": SUPABASE_KEY };
  if (teacherAuthSession && teacherAuthSession.access_token) {
    headers["Authorization"] = `Bearer ${teacherAuthSession.access_token}`;
  }
  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

async function dbGetRoom(pin, requireTeacherOwner = false) {
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{4}$/.test(cleanPin)) {
    return { ok: false, exists: false, reason: "invalid_pin", state: null };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}&select=pin,state,owner_id&limit=1`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (!res.ok) {
      return { ok: false, exists: false, reason: `http_${res.status}`, state: null };
    }
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return { ok: true, exists: false, reason: "not_found", state: null };
    }

    const row = rows[0];
    const hasValidState = !!(row && row.state && Array.isArray(row.state.grid) && row.state.grid.length === GRID_SIZE);
    const hasTeacherOwner = !requireTeacherOwner || !!(row && row.owner_id);

    if (!hasValidState || !hasTeacherOwner) {
      return { ok: true, exists: false, reason: "invalid_room", state: null };
    }

    return { ok: true, exists: true, reason: "ok", state: row.state, owner_id: row.owner_id };
  } catch (e) {
    return { ok: false, exists: false, reason: "network_error", state: null };
  }
}

async function dbSaveRoom(pin, stateObj, useAnonKeyOnly = false) {
  try {
    const headers = useAnonKeyOnly ? { "apikey": SUPABASE_KEY, "Content-Type": "application/json" } : getAuthHeaders(true);
    headers["Prefer"] = "resolution=merge-duplicates";

    const bodyPayload = { pin, state: stateObj, updated_at: new Date().toISOString() };
    if (!useAnonKeyOnly && teacherAuthSession && teacherAuthSession.user) {
      bodyPayload.owner_id = teacherAuthSession.user.id;
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas`, {
      method: "POST",
      cache: "no-store",
      headers,
      body: JSON.stringify(bodyPayload)
    });
    if (!res.ok) {
      const errTxt = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${errTxt}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function dbPushEvent(pin, payloadObj) {
  broadcastStudentAction(payloadObj);
  await persistStudentActionDirectlyToRoom(payloadObj);
  return { ok: true };
}

function isQuizModalCurrentlyOpen() {
  const qModal = document.getElementById("quizModal");
  return !!(activeQuizWord || (qModal && !qModal.classList.contains("hidden")));
}

function triggerBotModeMathIfNeeded() {
  if (isMathLocked || isRecompLocked || isQuizModalCurrentlyOpen()) return false;
  const now = Date.now();
  if (lastMathPromptAtMs && (now - lastMathPromptAtMs < MATH_PERSONAL_COOLDOWN_MS)) return false;
  const foundCount = Object.keys(botClaimedWords).length;
  const milestone = Math.floor(foundCount / MATH_GATE_INTERVAL) * MATH_GATE_INTERVAL;
  const byWords = milestone >= MATH_GATE_INTERVAL && milestone > botLastMilestone;
  const byTime = !!(lastMathPromptAtMs && (now - lastMathPromptAtMs >= MATH_TIME_INTERVAL_MS));
  if (byWords || byTime) {
    if (byWords) botLastMilestone = milestone;
    openMathLockModal(byWords ? `${milestone} palavras` : "3 minutos de partida");
    return true;
  }
  return false;
}

function startInstantBotMatch() {
  if (!isBotTestEnabledGlobally && !isUserAdmin()) {
    showToast("🔒 O Modo Teste (4 Bots) ainda não foi liberado pelo administrador.");
    return;
  }

  if (pollTimer) clearInterval(pollTimer);
  if (joinRetryTimer) clearInterval(joinRetryTimer);
  if (botTimer) clearInterval(botTimer);
  if (recompTimerInterval) clearInterval(recompTimerInterval);
  unsubscribeRoomRealtime();

  isBotModeActive = true;
  isRecompLocked = false;
  victoryModalDismissedForMatch = false;
  lastMathPromptAtMs = Date.now();
  playerStreak = 0;
  myName = document.getElementById("inputStudentName").value.trim() || "Diretora";
  const baseBotStory = STORY_BANK[Math.floor(Math.random() * STORY_BANK.length)];
  botStory = randomizeStorySupportSentences(baseBotStory);
  const built = generateGrid("bot_" + Date.now(), botStory.words);
  botGrid = built.grid;
  botPlacements = built.placements;
  botClaimedWords = {};
  botLastMilestone = 0;
  isMathLocked = false;
  lastBuiltBotGridKey = "";

  botPlayers = [
    { id: "human", name: myName + " (Você)", score: 0, isHuman: true },
    { id: "bot1",  name: "🤖 Bot Sofia", score: 0, isHuman: false },
    { id: "bot2",  name: "🤖 Bot Lucca", score: 0, isHuman: false },
    { id: "bot3",  name: "🤖 Bot Maya",  score: 0, isHuman: false },
    { id: "bot4",  name: "🤖 Bot Enzo",  score: 0, isHuman: false }
  ];

  document.getElementById("viewLobby").classList.add("hidden");
  document.getElementById("viewTeacher").classList.add("hidden");
  document.getElementById("viewStudent").classList.add("hidden");
  document.getElementById("viewBotTest").classList.remove("hidden");
  document.getElementById("btnExitRoom").classList.remove("hidden");
  setNetStatus("online", "Modo Teste (4 Bots)");

  document.getElementById("botTestStoryLabel").textContent = `• "${botStory.title}"`;
  document.getElementById("botStoryContainer").innerHTML = botStory.html;

  renderBotTestUI(true);
  showToast("🤖 Teste iniciado! Os 4 bots jogam devagar para você vencer.");

  botTimer = setInterval(() => {
    if (!isBotModeActive || isMathLocked || isRecompLocked || isQuizModalCurrentlyOpen()) return;
    const rem = botStory.words.filter(w => !botClaimedWords[w.word]);
    if (rem.length > 3 && Math.random() >= 0.4) {
      const bots = botPlayers.filter(p => !p.isHuman);
      const chosenBot = bots[Math.floor(Math.random() * bots.length)];
      const targetWord = rem[Math.floor(Math.random() * rem.length)];
      const pts = 50;

      botClaimedWords[targetWord.word] = { by: chosenBot.name, points: pts };
      chosenBot.score += pts;
    }

    renderBotTestUI(false);
    triggerBotModeMathIfNeeded();
  }, 7500);
}

function renderBotTestUI(forceRebuild = false) {
  const wordClassMap = {};
  botStory.words.forEach(w => { wordClassMap[w.word] = w.cls; });

  const human = botPlayers.find(p => p.isHuman);
  document.getElementById("botHumanScore").textContent = human ? human.score : 0;

  const foundCount = Object.keys(botClaimedWords).length;
  document.getElementById("botRemaining").textContent = Math.max(0, botStory.words.length - foundCount);
  document.getElementById("botMathGateIndicator").textContent = isRecompLocked
    ? "🛠️ Em Recomposição!"
    : (isMathLocked ? "🔒 Portal Matemático!" : `🧮 Portal: ${foundCount % MATH_GATE_INTERVAL}/${MATH_GATE_INTERVAL} pal. (3m)`);

  const botsSorted = botPlayers.filter(p => !p.isHuman).sort((a, b) => b.score - a.score);
  const topBotScore = botsSorted.length > 0 ? botsSorted[0].score : 0;
  if (human && human.score <= topBotScore && foundCount > 0) {
    human.score = topBotScore + 50;
  }

  const sorted = [...botPlayers].sort((a, b) => b.score - a.score);
  document.getElementById("botScoreboard").innerHTML = sorted.map((p, idx) => `
    <div class="score-tile ${p.isHuman ? 'is-human' : ''}">
      <span style="font-size:0.84rem; font-weight:800; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">#${idx + 1} ${p.name}</span>
      <strong style="color:var(--gold); font-size:0.92rem;">${p.score}</strong>
    </div>
  `).join("");

  document.querySelectorAll("#botStoryContainer .word-tag").forEach(tag => {
    const w = tag.getAttribute("data-w");
    if (botClaimedWords[w]) {
      tag.classList.add("solved");
      tag.style.backgroundColor = CLASS_COLORS[wordClassMap[w]] || "#10b981";
    } else {
      tag.classList.remove("solved");
      tag.style.backgroundColor = "";
    }
  });

  document.getElementById("botWordChips").innerHTML = botStory.words.map(item => {
    const claim = botClaimedWords[item.word];
    const color = CLASS_COLORS[item.cls] || "#10b981";
    if (claim) {
      return `<div class="chip claimed" style="background:${color};">✅ ${item.display} • ${item.cls} (${claim.by})</div>`;
    }
    return `<div class="chip">🔍 ${item.display}</div>`;
  }).join("");

  const gridEl = document.getElementById("botWsGrid");
  const key = "bot_" + botStory.title;
  if (forceRebuild || lastBuiltBotGridKey !== key || gridEl.children.length !== GRID_SIZE * GRID_SIZE) {
    lastBuiltBotGridKey = key;
    gridEl.innerHTML = "";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.textContent = botGrid[r][c];
        gridEl.appendChild(cell);
      }
    }
  }

  const coordColorMap = {};
  botPlacements.forEach(p => {
    if (botClaimedWords[p.word]) {
      const color = CLASS_COLORS[wordClassMap[p.word]] || "#10b981";
      p.coords.forEach(c => { coordColorMap[c] = color; });
    }
  });

  for (let i = 0; i < gridEl.children.length; i++) {
    const cell = gridEl.children[i];
    const cKey = `${cell.dataset.r},${cell.dataset.c}`;
    if (coordColorMap[cKey]) {
      cell.classList.add("found");
      cell.style.background = coordColorMap[cKey];
    } else {
      cell.classList.remove("found");
      cell.style.background = "";
    }
  }
}

function showBotTestRankingModal() {
  if (victoryModalDismissedForMatch) return;
  const human = botPlayers.find(p => p.isHuman);
  const botsSorted = botPlayers.filter(p => !p.isHuman).sort((a, b) => b.score - a.score);
  if (human && botsSorted.length > 0 && human.score <= botsSorted[0].score) {
    human.score = botsSorted[0].score + 150;
  }

  const sorted = [...botPlayers].sort((a, b) => b.score - a.score);
  const isHumanFirst = sorted.length > 0 && sorted[0].isHuman;
  const medals = ["🥇 1º", "🥈 2º", "🥉 3º", "4º", "5º"];

  document.getElementById("victoryModalTitle").textContent = isHumanFirst
    ? "VOCÊ VENCEU!"
    : "Fim da Rodada Teste";
  document.getElementById("victoryModalSubtitle").textContent = isHumanFirst
    ? `Parabéns, ${myName}! Você liderou o pódio contra os 4 bots!`
    : "Classificação final da partida de demonstração:";
  document.getElementById("finalTop3List").innerHTML = sorted.map((p, idx) => `
    <div style="padding:10px 0; border-bottom:${idx < sorted.length - 1 ? '1px solid var(--border)' : 'none'}; display:flex; justify-content:space-between;">
      <span><strong>${medals[idx]}:</strong> ${p.name}</span>
      <strong style="color:var(--gold);">${p.score} pts</strong>
    </div>
  `).join("");

  configureWinnerModalStyle(isHumanFirst);
  document.getElementById("victoryModal").classList.remove("hidden");
}

function generatePin() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let res = "";
  for (let i = 0; i < 4; i++) res += chars[Math.floor(Math.random() * chars.length)];
  return res;
}

function ensurePlayerExists(playerId, name, cls) {
  const canonicalId = makeCanonicalPlayerId(name, cls);
  const key = gameState.players[canonicalId] ? canonicalId : (gameState.players[playerId] ? playerId : canonicalId);

  if (!gameState.players[key]) {
    gameState.players[key] = {
      name: name || "Investigador",
      cls: cls || "Geral",
      score: 0,
      stageScore: 0,
      words: [],
      mathSolved: 0,
      errors: 0,
      status: "active"
    };
  } else {
    if (name) gameState.players[key].name = name;
    if (cls) gameState.players[key].cls = cls;
  }
  return gameState.players[key];
}

function applySingleBroadcastActionToTeacherState(msg) {
  if (!msg || !msg.name) return false;
  const canonicalId = makeCanonicalPlayerId(msg.name, msg.cls);
  let dirty = false;

  if (msg.type === "JOIN") {
    const before = !!gameState.players[canonicalId];
    ensurePlayerExists(canonicalId, msg.name, msg.cls);
    if (!before) dirty = true;
  }

  if (!gameState.started) {
    if (msg.type === "JOIN") {
      gameState.v = (gameState.v || 1) + 1;
      renderTeacherDashboard();
      broadcastRoomStateNow();
      scheduleTeacherRoomSave();
    }
    return dirty;
  }

  if (msg.type === "CLAIM_WORD") {
    const p = ensurePlayerExists(canonicalId, msg.name, msg.cls);
    const w = msg.word;
    const eventStage = msg.stage || gameState.stage;
    if (eventStage === gameState.stage && p.status === "active" && !gameState.claimedWords[w] && !gameState.finished) {
      gameState.claimedWords[w] = { by: p.name, points: msg.points };
      p.score = Number(p.score || 0) + Number(msg.points || 0);
      p.stageScore = Number(p.stageScore || 0) + Number(msg.points || 0);
      if (!Array.isArray(p.words)) p.words = [];
      if (!p.words.includes(w)) p.words.push(w);
      dirty = true;
    }
  } else if (msg.type === "MATH_SOLVED") {
    const p = ensurePlayerExists(canonicalId, msg.name, msg.cls);
    p.score = Number(p.score || 0) + Number(msg.points || 0);
    p.stageScore = Number(p.stageScore || 0) + Number(msg.points || 0);
    p.mathSolved = Number(p.mathSolved || 0) + 1;
    dirty = true;
  } else if (msg.type === "REGISTER_ERROR") {
    const p = ensurePlayerExists(canonicalId, msg.name, msg.cls);
    p.errors = Number(p.errors || 0) + 1;
    dirty = true;
  } else if (msg.type === "RECOMP_ELIMINATED") {
    const p = ensurePlayerExists(canonicalId, msg.name, msg.cls);
    p.status = "eliminated";
    dirty = true;
  } else if (msg.type === "REPECHAGE_PASS") {
    const p = ensurePlayerExists(canonicalId, msg.name, msg.cls);
    if (p.status === "repechage") {
      p.status = "active";
      p.score = Number(p.score || 0) + 80;
      dirty = true;
    }
  } else if (msg.type === "REPECHAGE_FAIL") {
    const p = ensurePlayerExists(canonicalId, msg.name, msg.cls);
    if (p.status === "repechage") {
      p.status = "eliminated";
      dirty = true;
    }
  }

  if (dirty) {
    const currentStory = getCurrentStory();
    if (gameState.started && !gameState.finished && Object.keys(gameState.claimedWords).length >= currentStory.words.length) {
      advanceTournamentStage();
    } else {
      gameState.v = (gameState.v || 1) + 1;
      renderTeacherDashboard();
      broadcastRoomStateNow();
      scheduleTeacherRoomSave();
    }
  }

  return dirty;
}

async function createTeacherRoom(resumePin = null, resumeLabel = null) {
  if (!teacherAuthSession || !isSubscriptionValid(teacherProfile)) {
    showToast("⛔ Acesso restrito: faça login com uma assinatura de professor ativa.");
    return;
  }

  await syncCloudStoriesBank();
  STORY_BANK = loadStoryBank();
  roomPin = resumePin || generatePin();
  isAdvancingStage = false;
  const label = resumeLabel || document.getElementById("inputRoomLabel").value.trim() || "Torneio CSI";
  const ownerEmail = String(teacherProfile?.email || teacherAuthSession?.user?.email || "").trim().toLowerCase();

  let restored = false;
  if (resumePin) {
    const cleanTargetPin = String(resumePin).trim().toUpperCase();
    const roomLookup = await dbGetRoom(cleanTargetPin, true);
    if (isRoomDeletedByAdmin(cleanTargetPin) || roomLookup?.state?.deletedByAdmin) {
      if (!isUserAdmin()) {
        showToast("⛔ Esta sala foi excluída pelo Admin: somente o Admin pode acessar ou restaurar.");
        return;
      }
    }
    const existing = (roomLookup && roomLookup.exists ? roomLookup.state : null) || deletedRoomSnapshots[cleanTargetPin];
    if (existing && existing.grid) {
      gameState = {
        ...existing,
        closed: false,
        deletedByAdmin: false,
        ownerEmail: existing.ownerEmail || ownerEmail,
        moderators: Array.isArray(existing.moderators) ? existing.moderators : [...moderatorsList]
      };
      restored = true;
      await dbSaveRoom(cleanTargetPin, gameState, false);
      showToast(`🔄 Painel da sala ${cleanTargetPin} restaurado com sucesso!`);
    }
  }

  document.getElementById("viewLobby").classList.add("hidden");
  document.getElementById("viewTeacher").classList.remove("hidden");
  document.getElementById("btnExitRoom").classList.remove("hidden");
  document.getElementById("teacherPinDisplay").textContent = roomPin;
  document.getElementById("teacherRoomTitle").textContent = label;
  document.getElementById("dbErrorBanner").classList.add("hidden");

  if (!restored) {
    const initialStoryIdx = Math.floor(Math.random() * STORY_BANK.length);
    const story = randomizeStorySupportSentences(STORY_BANK[initialStoryIdx]);
    const { grid, placements } = generateGrid(roomPin + "_1_" + Date.now(), story.words);
    gameState = {
      v: 1,
      started: false,
      closed: false,
      stage: 1,
      storyIdx: initialStoryIdx,
      activeStory: story,
      finished: false,
      roomLabel: label,
      ownerEmail,
      moderators: [...moderatorsList],
      grid,
      wordPlacements: placements,
      claimedWords: {},
      players: {}
    };

    setNetStatus("", "Abrindo sala de espera...");
    const result = await dbSaveRoom(roomPin, gameState);
    if (result.ok) {
      setNetStatus("online", "Sala de Espera (" + roomPin + ")");
      await logRoomHistoryEvent(roomPin, label, "CREATED", true, gameState, false);
      await loadRecentTeacherRooms();
      showToast(`Sala ${roomPin} aberta! Aguarde os alunos e aperte "Iniciar Partida Agora".`);
    } else {
      setNetStatus("error", "Erro no Supabase");
      document.getElementById("dbErrorBanner").classList.remove("hidden");
      document.getElementById("dbErrorDetail").textContent = result.error;
    }
  } else {
    setNetStatus("online", (gameState.started ? "Torneio Ao Vivo (" : "Sala de Espera (") + roomPin + ")");
    await logRoomHistoryEvent(roomPin, label, "REOPENED", true, gameState, false);
  }

  saveSessionState("teacher", { roomLabel: label });
  renderTeacherDashboard();

  subscribeRoomRealtime(roomPin, (liveRoomState) => {
    if (liveRoomState && liveRoomState.grid && (liveRoomState.v || 0) > (gameState.v || 0)) {
      gameState = liveRoomState;
      const currentStory = getCurrentStory();
      if (gameState.started && !gameState.finished && Object.keys(gameState.claimedWords || {}).length >= currentStory.words.length) {
        advanceTournamentStage();
      } else {
        renderTeacherDashboard();
      }
    }
  }, (studentMsg) => {
    applySingleBroadcastActionToTeacherState(studentMsg);
  });

  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    broadcastRoomStateNow();
    const roomLookup = await dbGetRoom(roomPin, true);
    const latestRoom = roomLookup && roomLookup.exists ? roomLookup.state : null;
    if (latestRoom && latestRoom.grid && (latestRoom.v || 0) > (gameState.v || 0)) {
      gameState = latestRoom;
      const currentStory = getCurrentStory();
      if (gameState.started && !gameState.finished && Object.keys(gameState.claimedWords || {}).length >= currentStory.words.length) {
        await advanceTournamentStage();
      } else {
        renderTeacherDashboard();
      }
    }
  }, 2500);
}

async function startTournamentMatch() {
  if (Object.keys(gameState.players).length === 0) {
    showToast("⚠️ Nenhum aluno foi detectado ainda! Verifique se o código digitado por eles é " + roomPin);
    return;
  }

  victoryModalDismissedForMatch = false;
  lastMathPromptAtMs = Date.now();
  gameState.closed = false;
  gameState.started = true;
  gameState.v = (gameState.v || 1) + 1;
  setNetStatus("online", "Torneio Ao Vivo (" + roomPin + ")");
  renderTeacherDashboard();
  broadcastRoomStateNow();
  await flushTeacherRoomSaveNow();
  showToast(`🚀 Partida iniciada com ${Object.keys(gameState.players).length} aluno(s)!`);
}

function sortPlayersByTotalScore(entriesOrPlayers, isEntries = false) {
  const statusWeight = { active: 3, repechage: 2, eliminated: 1 };
  return entriesOrPlayers.sort((a, b) => {
    const pA = isEntries ? a[1] : a;
    const pB = isEntries ? b[1] : b;
    const wA = Array.isArray(pA.words) ? pA.words.length : 0;
    const wB = Array.isArray(pB.words) ? pB.words.length : 0;
    const participatedA = (pA.score || 0) > 0 && (wA > 0 || (pA.mathSolved || 0) > 0) ? 1 : 0;
    const participatedB = (pB.score || 0) > 0 && (wB > 0 || (pB.mathSolved || 0) > 0) ? 1 : 0;

    return (statusWeight[pB.status] || 0) - (statusWeight[pA.status] || 0) ||
      participatedB - participatedA ||
      (pB.score || 0) - (pA.score || 0) ||
      wB - wA ||
      (pB.stageScore || 0) - (pA.stageScore || 0);
  });
}

async function advanceTournamentStage() {
  if (isAdvancingStage || gameState.finished || !gameState.started) return;
  isAdvancingStage = true;

  try {
    const competingPlayers = sortPlayersByTotalScore(
      Object.entries(gameState.players).filter(([_, p]) => p.status === "active" || p.status === "repechage"),
      true
    );

    gameState = buildNextStageStateFromCurrent({ ...gameState, roomPin });

    renderTeacherDashboard();
    broadcastRoomStateNow();
    await flushTeacherRoomSaveNow();

    if (gameState.finished) {
      showToast("🏆 TORNEIO FINALIZADO! O vencedor foi definido!");
    } else {
      const keepCount = competingPlayers.length === 4
        ? 3
        : Math.max(3, Math.ceil(competingPlayers.length / 2));
      showToast(`⚔️ Fase ${gameState.stage} iniciada! Classificados na frente e demais na Repescagem (top ${keepCount})!`);
    }
  } finally {
    isAdvancingStage = false;
  }
}

async function restartFullTournament() {
  const initialStoryIdx = Math.floor(Math.random() * STORY_BANK.length);
  const story = randomizeStorySupportSentences(STORY_BANK[initialStoryIdx]);
  const { grid, placements } = generateGrid(roomPin + "_reset_" + Date.now(), story.words);

  victoryModalDismissedForMatch = false;
  lastMathPromptAtMs = Date.now();
  gameState.v = (gameState.v || 1) + 1;
  gameState.closed = false;
  gameState.started = false;
  gameState.stage = 1;
  gameState.storyIdx = initialStoryIdx;
  gameState.activeStory = story;
  gameState.finished = false;
  gameState.grid = grid;
  gameState.wordPlacements = placements;
  gameState.claimedWords = {};

  Object.values(gameState.players).forEach(p => {
    p.score = 0;
    p.stageScore = 0;
    p.words = [];
    p.mathSolved = 0;
    p.errors = 0;
    p.status = "active";
  });

  setNetStatus("online", "Sala de Espera (" + roomPin + ")");
  renderTeacherDashboard();
  broadcastRoomStateNow();
  await flushTeacherRoomSaveNow();
  showToast(`Sala reiniciada! Clique em "Iniciar Partida Agora" quando todos estiverem prontos.`);
}

function renderTeacherDashboard() {
  const story = getCurrentStory();
  const canMod = canModerateCurrentRoom();
  const modHeader = document.getElementById("teacherModColHeader");
  if (modHeader) modHeader.classList.toggle("hidden", !canMod);

  const btnStart = document.getElementById("btnStartTournament");
  const btnNext = document.getElementById("btnForceNextStage");
  if (gameState.closed) {
    btnStart.classList.add("hidden");
    btnNext.classList.add("hidden");
    document.getElementById("teacherStageBadge").textContent = `🔒 SALA ENCERRADA • Reabra no histórico para liberar entradas`;
  } else if (!gameState.started) {
    btnStart.classList.remove("hidden");
    btnNext.classList.add("hidden");
    document.getElementById("teacherStageBadge").textContent = `⏳ Sala de Espera • Clique em "Iniciar Partida Agora"`;
  } else {
    btnStart.classList.add("hidden");
    btnNext.classList.toggle("hidden", !!gameState.finished);
    document.getElementById("teacherStageBadge").textContent = gameState.finished
      ? `🏆 TORNEIO ENCERRADO • Resultado Final`
      : `Fase ${gameState.stage} • "${story.title}"`;
  }

  const totalPlayers = Object.keys(gameState.players).length;
  const activeCount = Object.values(gameState.players).filter(p => p.status === "active").length;
  document.getElementById("connectedCount").textContent = gameState.started
    ? `${activeCount} ativos / ${totalPlayers} total`
    : `${totalPlayers} aluno(s) na sala de espera`;

  const claimedCount = Object.keys(gameState.claimedWords).length;
  document.getElementById("teacherProgress").textContent = `${claimedCount}/${story.words.length}`;

  const chipsEl = document.getElementById("teacherWordChips");
  chipsEl.innerHTML = story.words.map(item => {
    const claim = gameState.claimedWords[item.word];
    const color = CLASS_COLORS[item.cls] || "#10b981";
    if (claim) {
      return `<div class="chip claimed" style="background:${color};">✅ ${item.display} • ${item.cls} (${claim.by})</div>`;
    }
    return `<div class="chip">🔍 ${item.display}</div>`;
  }).join("");

  const rankingEntries = sortPlayersByTotalScore(Object.entries(gameState.players), true);
  const ranking = rankingEntries.map(([_, p]) => p);

  const podiumEl = document.getElementById("teacherPodium");
  const medals = ["🥇", "🥈", "🥉"];
  podiumEl.innerHTML = [0, 1, 2].map(idx => {
    const p = ranking[idx];
    return `
      <div class="podium-item rank-${idx + 1}">
        <div style="font-size:1.5rem;">${medals[idx]}</div>
        <div style="font-weight:800; margin:4px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p ? p.name : "Aguardando..."}</div>
        <div style="font-size:0.85rem; color:var(--gold); font-weight:800;">${p ? p.score + " pts" : "-"}</div>
      </div>
    `;
  }).join("");

  const tbody = document.getElementById("teacherTableBody");
  if (rankingEntries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${canMod ? 8 : 7}" style="text-align:center; color:var(--text-muted);">Projete o código ${roomPin} e aguarde os alunos entrarem antes de clicar em Iniciar Partida!</td></tr>`;
    return;
  }

  tbody.innerHTML = rankingEntries.map(([pKey, p], i) => {
    let badge = `<span class="status-tag st-active">Na Disputa</span>`;
    if (!gameState.started) badge = `<span class="status-tag st-waiting">⏳ Pronto na Sala</span>`;
    else if (p.status === "repechage") badge = `<span class="status-tag st-repechage">⚔️ Repescagem</span>`;
    else if (p.status === "eliminated") badge = `<span class="status-tag st-eliminated">Eliminado</span>`;
    else if (gameState.finished && i === 0 && p.status === "active") badge = `<span class="status-tag st-active">👑 VENCEDOR</span>`;
    else if (gameState.finished && i < 3 && p.status === "active") badge = `<span class="status-tag st-active">🏆 PÓDIO</span>`;

    const modCell = canMod ? `
      <td>
        <div class="mod-actions-cell">
          <button type="button" class="btn-gold btn-xs" onclick="moderatePlayerAction('${pKey}', 'BONUS', 50)">+50 pts</button>
          ${p.status !== "active" ? `<button type="button" class="btn-success btn-xs" onclick="moderatePlayerAction('${pKey}', 'REINSTATE')">Recolocar</button>` : ""}
          ${p.status !== "eliminated" ? `<button type="button" class="btn-danger btn-xs" onclick="moderatePlayerAction('${pKey}', 'ELIMINATE')">Eliminar</button>` : ""}
        </div>
      </td>
    ` : "";

    return `
      <tr>
        <td><strong>#${i + 1}</strong></td>
        <td><strong>${p.name}</strong> <span style="font-size:0.75rem; color:var(--text-muted);">(${p.cls})</span></td>
        <td>${badge}</td>
        <td style="color:var(--accent); font-weight:800;">${p.stageScore || 0}</td>
        <td style="color:var(--gold); font-weight:900;">${p.score}</td>
        <td>${p.words.length}</td>
        <td style="color:#d8b4fe; font-weight:700;">🧮 ${p.mathSolved || 0}</td>
        ${modCell}
      </tr>
    `;
  }).join("");
}

function exportCSV() {
  const ranking = sortPlayersByTotalScore(Object.values(gameState.players), false);
  if (ranking.length === 0) {
    showToast("Ainda não há alunos registrados no painel.");
    return;
  }
  let csv = "\uFEFFPosicao;Aluno;Turma;Status;Pontos_Totais;Qtd_Palavras;Desafios_Matematica;Erros\n";
  ranking.forEach((p, idx) => {
    csv += `${idx + 1};"${p.name}";"${p.cls}";"${p.status}";${p.score};${p.words.length};${p.mathSolved || 0};${p.errors}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Torneio_CSI_${gameState.roomLabel.replace(/\s+/g, "_")}.csv`;
  link.click();
}

function reconcileRemoteStudentRoomState(remote) {
  if (!remote) return;

  if (remote.closed || remote.deletedByAdmin) {
    leaveClosedRoomToJoinScreen("🔒 Esta sala foi encerrada pelo professor. Entre em outra sala.");
    return;
  }

  const wasStarted = gameState.started;
  const stageChanged = remote.stage !== gameState.stage || remote.storyIdx !== gameState.storyIdx;

  if (!remote.started) {
    myLocalWords.clear();
    myLocalScore = 0;
    victoryModalDismissedForMatch = false;
    lastMathPromptAtMs = 0;
    playerStreak = 0;
    lastTriggeredGlobalMilestone = 0;
    isMathLocked = false;
    isRecompLocked = false;
    if (recompTimerInterval) {
      clearInterval(recompTimerInterval);
      recompTimerInterval = null;
    }
    repStep = 0;
    hideAllStudentModals();
    gameState = remote;
    updateStudentScreenState();
    return;
  }

  if (!wasStarted && remote.started) {
    victoryModalDismissedForMatch = false;
    lastMathPromptAtMs = Date.now();
    gameState = remote;
    const meStart = gameState.players && gameState.players[myPlayerId];
    if (meStart && typeof meStart.score === "number") {
      myLocalScore = Number(meStart.score);
    }
    applyStoryToStudentUI();
    updateStudentScreenState();
    renderStudentGame(true);
    showToast("🚀 A partida começou! Boa sorte!");
    return;
  }

  if (stageChanged) {
    myLocalWords.clear();
    victoryModalDismissedForMatch = false;
    lastTriggeredGlobalMilestone = 0;
    isMathLocked = false;
    isRecompLocked = false;
    if (recompTimerInterval) {
      clearInterval(recompTimerInterval);
      recompTimerInterval = null;
    }
    repStep = 0;
    isDragging = false;
    clearAllSelectionVisuals();
    hideAllStudentModals();
    gameState = remote;
    const meStage = gameState.players && gameState.players[myPlayerId];
    if (meStage && typeof meStage.score === "number") {
      myLocalScore = Number(meStage.score);
    }
    saveSessionState("student");
    applyStoryToStudentUI();
    updateStudentScreenState();
    renderStudentGame(true);

    const meNow = gameState.players[myPlayerId];
    if (meNow && meNow.status === "repechage") {
      openRepechageModal();
    } else if (meNow && meNow.status === "eliminated") {
      openEliminatedModal("Você foi eliminado na fase anterior.");
    } else {
      document.getElementById("repechageModal").classList.add("hidden");
      showToast(`⚔️ Fase ${gameState.stage}! Novo conto: "${getCurrentStory().title}"`);
    }
    return;
  }

  if (!remote.finished) {
    victoryModalDismissedForMatch = false;
    myLocalWords.forEach(w => {
      if (!remote.claimedWords[w]) {
        remote.claimedWords[w] = { by: myName, points: 100 };
      }
    });
  }
  gameState = remote;

  const me = gameState.players[myPlayerId];
  if (me) {
    if (typeof me.score === "number") {
      myLocalScore = Number(me.score);
    }
    if (me.status === "eliminated") {
      openEliminatedModal("Você foi eliminado da partida.");
      return;
    }
    if (me.status === "active") {
      document.getElementById("eliminatedModal").classList.add("hidden");
      document.getElementById("repechageModal").classList.add("hidden");
    }
    if (me.status === "repechage" && document.getElementById("repechageModal").classList.contains("hidden")) {
      openRepechageModal();
    }
  }

  updateStudentScreenState();
  renderStudentGame(false);

  if (gameState.finished) {
    isMathLocked = false;
    isRecompLocked = false;
    document.getElementById("mathModal").classList.add("hidden");
    document.getElementById("recompositionModal").classList.add("hidden");
    if (!victoryModalDismissedForMatch) {
      showFinalTop3Modal();
    }
  } else if ((!me || me.status === "active") && !isQuizModalCurrentlyOpen()) {
    checkGlobalMathGateTrigger();
  }
}

async function joinAsStudent(savedSession = null) {
  const pin = savedSession ? savedSession.pin : document.getElementById("inputPin").value.trim().toUpperCase();
  const name = savedSession ? savedSession.name : document.getElementById("inputStudentName").value.trim();
  const cls = savedSession ? savedSession.cls : (document.getElementById("inputStudentClass").value.trim() || "Geral");

  if (!/^[A-Z0-9]{4}$/.test(pin) || !name) {
    showToast("⚠️ Código inválido ou incompleto! Digite um código de 4 caracteres criado pelo professor e seu nome.");
    return;
  }

  myName = name;
  myClass = cls;
  roomPin = pin;
  myPlayerId = makeCanonicalPlayerId(myName, myClass);

  myLocalWords.clear();
  myLocalScore = 0;
  victoryModalDismissedForMatch = false;
  lastMathPromptAtMs = Date.now();
  playerStreak = 0;
  lastTriggeredGlobalMilestone = savedSession ? (savedSession.lastTriggeredGlobalMilestone || 0) : 0;
  solvedMathCount = savedSession ? (savedSession.solvedMathCount || 0) : 0;
  isMathLocked = false;
  isRecompLocked = false;
  if (recompTimerInterval) {
    clearInterval(recompTimerInterval);
    recompTimerInterval = null;
  }
  repStep = savedSession ? (savedSession.repStep || 0) : 0;
  lastBuiltGridKey = "";
  hideAllStudentModals();

  const roomLookup = await dbGetRoom(roomPin, true);
  if (!roomLookup.ok) {
    if (savedSession) {
      clearSessionState();
      return;
    }
    showToast("⚠️ Erro ao consultar a sala no servidor. Tente novamente em instantes.");
    return;
  }

  const remoteInitial = roomLookup.exists ? roomLookup.state : null;
  if (remoteInitial && remoteInitial.grid) {
    if (remoteInitial.closed || remoteInitial.deletedByAdmin) {
      leaveClosedRoomToJoinScreen(`🔒 A sala ${roomPin} foi encerrada ou excluída pelo professor.`);
      return;
    }

    gameState = remoteInitial;

    const existingMe = gameState.players && gameState.players[myPlayerId];
    if (existingMe) {
      myLocalScore = existingMe.score || 0;
      (existingMe.words || []).forEach(w => {
        if (gameState.claimedWords[w]) myLocalWords.add(w);
      });
      if (savedSession) {
        showToast(`🔄 Sessão de ${myName} recuperada (${myLocalScore} pts)!`);
      }
    }

    if (!savedSession) {
      lastTriggeredGlobalMilestone = Math.floor(Object.keys(gameState.claimedWords || {}).length / MATH_GATE_INTERVAL) * MATH_GATE_INTERVAL;
    }
  } else {
    if (savedSession) {
      leaveClosedRoomToJoinScreen(`⚠️ A sala ${roomPin} foi encerrada ou não existe mais.`);
      return;
    }
    showToast(`❌ Sala "${roomPin}" inexistente! Somente códigos gerados por professores logados são válidos.`);
    return;
  }

  saveSessionState("student");

  document.getElementById("viewLobby").classList.add("hidden");
  document.getElementById("viewStudent").classList.remove("hidden");
  document.getElementById("btnExitRoom").classList.remove("hidden");
  document.getElementById("studentHeaderName").textContent = myName;
  document.getElementById("studentHeaderClass").textContent = `(${myClass}) • Sala ${roomPin}`;
  document.getElementById("waitingRoomCode").textContent = roomPin;

  applyStoryToStudentUI();
  updateStudentScreenState();

  const meInitial = gameState.players && gameState.players[myPlayerId];
  if (gameState.started) {
    renderStudentGame(true);
    if (meInitial && meInitial.status === "eliminated") {
      openEliminatedModal("Você foi eliminado desta partida.");
    } else if (meInitial && meInitial.status === "repechage") {
      openRepechageModal();
    } else if (gameState.finished) {
      showFinalTop3Modal();
    }
  }

  const sendJoinOnce = async () => {
    broadcastStudentAction({
      type: "JOIN",
      playerId: myPlayerId,
      name: myName,
      cls: myClass
    });
    await persistStudentActionDirectlyToRoom({
      type: "JOIN",
      playerId: myPlayerId,
      name: myName,
      cls: myClass
    });
    const hintEl = document.getElementById("studentSyncHint");
    if (hintEl) {
      hintEl.textContent = "✅ Conectado à sala ao vivo! Funciona mesmo sem o portal do professor aberto.";
    }
  };

  await sendJoinOnce();

  if (joinRetryTimer) clearInterval(joinRetryTimer);
  joinRetryTimer = setInterval(async () => {
    if (gameState.players && gameState.players[myPlayerId]) {
      clearInterval(joinRetryTimer);
      return;
    }
    await sendJoinOnce();
  }, 4000);

  subscribeRoomRealtime(roomPin, (liveState) => {
    reconcileRemoteStudentRoomState(liveState);
  }, null);

  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    if (isQuizModalCurrentlyOpen()) return;
    const roomCheck = await dbGetRoom(roomPin, true);
    if (!roomCheck.ok) return;
    if (!roomCheck.exists) {
      if (roomCheck.reason === "not_found" || roomCheck.reason === "invalid_room") {
        leaveClosedRoomToJoinScreen(`⚠️ A sala ${roomPin} foi encerrada. Digite o código de outra sala.`);
      }
      return;
    }
    reconcileRemoteStudentRoomState(roomCheck.state);
  }, 4500);

  document.addEventListener("visibilitychange", async () => {
    if (!document.hidden && roomPin && !isBotModeActive) {
      const roomCheck = await dbGetRoom(roomPin, true);
      if (roomCheck.ok && roomCheck.exists && roomCheck.state) {
        reconcileRemoteStudentRoomState(roomCheck.state);
      }
    }
  });
}

function updateStudentScreenState() {
  const waitingBox = document.getElementById("studentWaitingLobby");
  const gameArea = document.getElementById("studentGameArea");

  if (!gameState.started) {
    waitingBox.classList.remove("hidden");
    gameArea.classList.add("hidden");
    setNetStatus("", "Aguardando Professor");
    document.getElementById("mathGateIndicator").textContent = "⏳ Aguardando início";

    const playersObj = { ...gameState.players };
    if (!playersObj[myPlayerId]) {
      playersObj[myPlayerId] = { name: myName, cls: myClass };
    }
    const list = Object.entries(playersObj);
    document.getElementById("waitingPlayersCount").textContent = list.length;
    document.getElementById("waitingPlayersList").innerHTML = list.map(([id, p]) =>
      `<span class="player-pill-tag ${id === myPlayerId ? 'me' : ''}">${id === myPlayerId ? '⭐ ' : '🎓 '}${p.name} (${p.cls})</span>`
    ).join("");
  } else {
    waitingBox.classList.add("hidden");
    gameArea.classList.remove("hidden");
    setNetStatus("online", "Ao Vivo (" + roomPin + ")");
  }
}

function applyStoryToStudentUI() {
  const story = getCurrentStory();
  document.getElementById("studentStoryTitle").textContent = `📜 Fase ${gameState.stage}: "${story.title}"`;
  document.getElementById("storyContainer").innerHTML = story.html;
}

function renderStudentGame(forceRebuildGrid = false) {
  if (!gameState.started) return;

  const story = getCurrentStory();
  const wordClassMap = getWordClassMap();

  const remoteMe = gameState.players[myPlayerId];
  const displayScore = remoteMe && typeof remoteMe.score === "number"
    ? Number(remoteMe.score)
    : Number(myLocalScore);
  document.getElementById("studentScore").textContent = displayScore;

  const totalClaimedInRoom = Object.keys(gameState.claimedWords).length;
  const mod = totalClaimedInRoom % MATH_GATE_INTERVAL;
  document.getElementById("mathGateIndicator").textContent =
    isRecompLocked
      ? "🛠️ Em Recomposição!"
      : (isMathLocked
        ? "🔒 Portal Matemático Ativo!"
        : `🧮 Portal da Turma: ${mod}/${MATH_GATE_INTERVAL} pal. (3m)`);

  document.getElementById("studentRemaining").textContent = Math.max(0, story.words.length - totalClaimedInRoom);

  document.querySelectorAll(".word-tag").forEach(tag => {
    const w = tag.getAttribute("data-w");
    if (gameState.claimedWords[w]) {
      const color = CLASS_COLORS[wordClassMap[w]] || "#10b981";
      tag.classList.add("solved");
      tag.style.backgroundColor = color;
    } else {
      tag.classList.remove("solved");
      tag.style.backgroundColor = "";
    }
  });

  const chipsEl = document.getElementById("studentWordChips");
  chipsEl.innerHTML = story.words.map(item => {
    const claim = gameState.claimedWords[item.word];
    const color = CLASS_COLORS[item.cls] || "#10b981";
    if (claim) {
      return `<div class="chip claimed" style="background:${color};">🔒 ${item.display} (${item.cls}) — ${claim.by}</div>`;
    }
    return `<div class="chip">${item.display}</div>`;
  }).join("");

  const gridEl = document.getElementById("wsGrid");
  const gridKey = `${roomPin}_${gameState.stage}_${gameState.storyIdx}`;

  if (forceRebuildGrid || lastBuiltGridKey !== gridKey || gridEl.children.length !== GRID_SIZE * GRID_SIZE) {
    lastBuiltGridKey = gridKey;
    gridEl.innerHTML = "";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.textContent = gameState.grid[r][c];
        gridEl.appendChild(cell);
      }
    }
  }

  const coordColorMap = {};
  gameState.wordPlacements.forEach(p => {
    if (gameState.claimedWords[p.word]) {
      const color = CLASS_COLORS[wordClassMap[p.word]] || "#10b981";
      p.coords.forEach(c => { coordColorMap[c] = color; });
    }
  });

  for (let i = 0; i < gridEl.children.length; i++) {
    const cell = gridEl.children[i];
    const key = `${cell.dataset.r},${cell.dataset.c}`;
    if (coordColorMap[key]) {
      cell.classList.add("found");
      cell.style.background = coordColorMap[key];
    } else {
      cell.classList.remove("found");
      cell.style.background = "";
    }
  }
}

function checkGlobalMathGateTrigger() {
  if (isMathLocked || isRecompLocked || gameState.finished || !gameState.started) return true;
  if (isQuizModalCurrentlyOpen()) return false;

  const now = Date.now();
  if (lastMathPromptAtMs && (now - lastMathPromptAtMs < MATH_PERSONAL_COOLDOWN_MS)) return false;

  const totalClaimedInRoom = Object.keys(gameState.claimedWords).length;
  const story = getCurrentStory();
  if (totalClaimedInRoom >= story.words.length) return false;

  const currentMilestone = Math.floor(totalClaimedInRoom / MATH_GATE_INTERVAL) * MATH_GATE_INTERVAL;
  const triggeredByWords = currentMilestone >= MATH_GATE_INTERVAL && currentMilestone > lastTriggeredGlobalMilestone;
  const triggeredByTime = !!(lastMathPromptAtMs && (now - lastMathPromptAtMs >= MATH_TIME_INTERVAL_MS));

  if (triggeredByWords || triggeredByTime) {
    if (triggeredByWords) lastTriggeredGlobalMilestone = currentMilestone;
    saveSessionState("student");
    openMathLockModal(triggeredByWords ? `${currentMilestone} palavras` : "3 minutos de partida");
    return true;
  }
  return false;
}

function openMathLockModal(reasonLabel) {
  if (isQuizModalCurrentlyOpen()) return;
  isMathLocked = true;
  lastMathPromptAtMs = Date.now();
  mathAttempts = 0;
  isDragging = false;
  clearAllSelectionVisuals();
  const countTxt = reasonLabel || `a cada ${MATH_GATE_INTERVAL} palavras ou 3 min`;
  document.getElementById("mathTriggerReason").textContent = `Desafio matemático ativado (${countTxt})! Resolva a operação abaixo (máximo 3 tentativas antes da recomposição):`;
  document.getElementById("mathAttemptsBadge").textContent = "Tentativas restantes: 3 de 3";
  loadFreshMathQuestionInPortal();
  document.getElementById("mathModal").classList.remove("hidden");
  if (isBotModeActive) renderBotTestUI(false);
  else renderStudentGame(false);
}

function loadFreshMathQuestionInPortal() {
  currentMathChallenge = generateDynamicMathQuestion();
  document.getElementById("mathOpBadge").textContent = currentMathChallenge.op;
  document.getElementById("mathQuestionBox").textContent = currentMathChallenge.question;

  const optsEl = document.getElementById("mathOptionsContainer");
  optsEl.innerHTML = "";
  currentMathChallenge.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "math-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => submitMathAnswer(opt));
    optsEl.appendChild(btn);
  });
}

async function submitMathAnswer(chosenOpt) {
  if (!currentMathChallenge) return;

  if (String(chosenOpt) === String(currentMathChallenge.correct)) {
    const bonusPts = mathAttempts === 0 ? 80 : 50;
    isMathLocked = false;
    lastMathPromptAtMs = Date.now();
    mathAttempts = 0;
    document.getElementById("mathModal").classList.add("hidden");
    document.getElementById("mathHint").classList.add("hidden");
    currentMathChallenge = null;

    if (isBotModeActive) {
      const human = botPlayers.find(p => p.isHuman);
      if (human) human.score += bonusPts;
      showToast(`🧮 Questão resolvida! +${bonusPts} pts!`);
      renderBotTestUI(false);
      if (Object.keys(botClaimedWords).length >= botStory.words.length) {
        showBotTestRankingModal();
      }
      return;
    }

    solvedMathCount++;
    myLocalScore += bonusPts;
    if (gameState.players && gameState.players[myPlayerId]) {
      gameState.players[myPlayerId].score = Number(gameState.players[myPlayerId].score || 0) + bonusPts;
    }
    saveSessionState("student");

    showToast(`🧮 Questão resolvida! +${bonusPts} pts de matemática!`);
    renderStudentGame(false);

    await Promise.all([
      dbPushEvent(roomPin, {
        type: "MATH_SOLVED",
        playerId: myPlayerId,
        name: myName,
        cls: myClass,
        points: bonusPts
      }),
      pushScoreToGlobalLeaderboard(bonusPts, 0, 1)
    ]);
  } else {
    mathAttempts++;
    const remainingTries = Math.max(0, 3 - mathAttempts);
    if (!isBotModeActive) {
      await dbPushEvent(roomPin, { type: "REGISTER_ERROR", playerId: myPlayerId, name: myName, cls: myClass });
    }

    if (mathAttempts >= 3) {
      isMathLocked = false;
      mathAttempts = 0;
      currentMathChallenge = null;
      document.getElementById("mathModal").classList.add("hidden");
      document.getElementById("mathHint").classList.add("hidden");
      openRecompositionModal();
      return;
    }

    document.getElementById("mathAttemptsBadge").textContent = `Tentativas restantes: ${remainingTries} de 3`;
    const hintBox = document.getElementById("mathHint");
    hintBox.textContent = `❌ Resposta incorreta! Nova pergunta gerada (${remainingTries} tentativa(s) restante(s)):`;
    hintBox.classList.remove("hidden");
    loadFreshMathQuestionInPortal();
  }
}

function formatSecondsMMSS(totalSec) {
  const safe = Math.max(0, totalSec);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function ensureRecompCountdownLoop() {
  if (recompTimerInterval) return;
  recompTimerInterval = setInterval(() => {
    if (!isRecompLocked) {
      clearInterval(recompTimerInterval);
      recompTimerInterval = null;
      return;
    }
    recompSecondsLeft = Math.max(0, recompSecondsLeft - 1);
    const displayEl = document.getElementById("recompTimerDisplay");
    if (displayEl) displayEl.textContent = formatSecondsMMSS(recompSecondsLeft);

    const timerAreaVisible = !document.getElementById("recompTimerArea")?.classList.contains("hidden");
    if (timerAreaVisible) {
      document.getElementById("recompModeBadge").textContent = `ESPERA: ${formatSecondsMMSS(recompSecondsLeft)}`;
    }

    if (recompSecondsLeft <= 0) {
      clearInterval(recompTimerInterval);
      recompTimerInterval = null;
      finishRecomposition("⏳ Tempo de 1 minuto concluído! Tabuleiro liberado.");
    }
  }, 1000);
}

function openRecompositionModal() {
  isRecompLocked = true;
  isDragging = false;
  clearAllSelectionVisuals();
  recompSecondsLeft = RECOMP_WAIT_SECONDS;
  recompMathProgress = 0;
  recompMathErrors = 0;
  currentRecompMathQuestion = null;

  document.getElementById("recompTimerDisplay").textContent = formatSecondsMMSS(recompSecondsLeft);
  document.getElementById("recompositionModal").classList.remove("hidden");
  ensureRecompCountdownLoop();
  activateRecompTimer();

  if (isBotModeActive) renderBotTestUI(false);
  else renderStudentGame(false);
}

function activateRecompTimer() {
  ensureRecompCountdownLoop();
  document.getElementById("recompModeBadge").textContent = `ESPERA: ${formatSecondsMMSS(recompSecondsLeft)}`;
  document.getElementById("recompTimerDisplay").textContent = formatSecondsMMSS(recompSecondsLeft);
  document.getElementById("recompTimerArea").classList.remove("hidden");
  document.getElementById("recompMathArea").classList.add("hidden");
}

function activateRecompMath3() {
  ensureRecompCountdownLoop();
  recompMathProgress = 0;
  recompMathErrors = 0;
  document.getElementById("recompTimerArea").classList.add("hidden");
  document.getElementById("recompMathArea").classList.remove("hidden");
  document.getElementById("recompMathHint").classList.add("hidden");
  document.getElementById("recompMathErrorsBadge").textContent = "Erros na recomposição: 0 de 3";
  loadNextRecompMathQuestion();
}

function loadNextRecompMathQuestion() {
  currentRecompMathQuestion = generateDynamicMathQuestion();
  document.getElementById("recompModeBadge").textContent = `META: ${recompMathProgress}/3 • ${currentRecompMathQuestion.op}`;
  document.getElementById("recompMathQuestionBox").textContent = currentRecompMathQuestion.question;

  const optsEl = document.getElementById("recompMathOptionsContainer");
  optsEl.innerHTML = "";
  currentRecompMathQuestion.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "repechage-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => submitRecompMathAnswer(opt));
    optsEl.appendChild(btn);
  });
}

async function submitRecompMathAnswer(chosenOpt) {
  if (!currentRecompMathQuestion) return;

  if (String(chosenOpt) === String(currentRecompMathQuestion.correct)) {
    recompMathProgress++;
    document.getElementById("recompMathHint").classList.add("hidden");
    if (recompMathProgress >= 3) {
      finishRecomposition("🧮 Você acertou as 3 contas! Tabuleiro liberado imediatamente.");
    } else {
      showToast(`✅ Acertou! Faltam ${3 - recompMathProgress} conta(s) para voltar ao tabuleiro.`);
      loadNextRecompMathQuestion();
    }
  } else {
    recompMathErrors++;
    recompMathProgress = 0;
    if (!isBotModeActive) {
      await dbPushEvent(roomPin, { type: "REGISTER_ERROR", playerId: myPlayerId, name: myName, cls: myClass });
    }

    if (recompMathErrors >= 3) {
      if (recompTimerInterval) {
        clearInterval(recompTimerInterval);
        recompTimerInterval = null;
      }
      isRecompLocked = false;
      currentRecompMathQuestion = null;
      document.getElementById("recompositionModal").classList.add("hidden");
      if (!isBotModeActive) {
        if (gameState.players[myPlayerId]) {
          gameState.players[myPlayerId].status = "eliminated";
        }
        await dbPushEvent(roomPin, { type: "RECOMP_ELIMINATED", playerId: myPlayerId, name: myName, cls: myClass });
        openEliminatedModal("Você errou 3 contas durante a recomposição e foi eliminado da partida.");
      } else {
        showToast("🚫 Na sala real, 3 erros na recomposição eliminam o jogador!");
      }
      return;
    }

    document.getElementById("recompMathErrorsBadge").textContent = `Erros na recomposição: ${recompMathErrors} de 3`;
    const hintEl = document.getElementById("recompMathHint");
    hintEl.textContent = `❌ Errou (${recompMathErrors}/3)! Sequência zerada — resolva esta nova conta:`;
    hintEl.classList.remove("hidden");
    loadNextRecompMathQuestion();
  }
}

function finishRecomposition(toastMessage) {
  if (recompTimerInterval) {
    clearInterval(recompTimerInterval);
    recompTimerInterval = null;
  }
  isRecompLocked = false;
  lastMathPromptAtMs = Date.now();
  recompSecondsLeft = RECOMP_WAIT_SECONDS;
  recompMathProgress = 0;
  recompMathErrors = 0;
  currentRecompMathQuestion = null;
  document.getElementById("recompositionModal").classList.add("hidden");
  showToast(toastMessage);

  if (isBotModeActive) {
    renderBotTestUI(false);
    if (Object.keys(botClaimedWords).length >= botStory.words.length) {
      showBotTestRankingModal();
    }
  } else {
    renderStudentGame(false);
  }
}

function openRepechageModal() {
  hideAllStudentModals();
  if (repStep === 0) repStep = 1;
  saveSessionState("student");
  renderRepechageQuestion();
  document.getElementById("repechageModal").classList.remove("hidden");
}

function renderRepechageQuestion() {
  currentRepQuestion = generateDynamicMathQuestion();
  document.getElementById("repProgressBadge").textContent = `QUESTÃO ${repStep} DE 3 • ${currentRepQuestion.op}`;
  document.getElementById("repQuestionBox").textContent = currentRepQuestion.question;

  const optsEl = document.getElementById("repOptionsContainer");
  optsEl.innerHTML = "";
  currentRepQuestion.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "repechage-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => submitRepechageAnswer(opt));
    optsEl.appendChild(btn);
  });
}

async function submitRepechageAnswer(chosenOpt) {
  if (!currentRepQuestion) return;

  if (String(chosenOpt) === String(currentRepQuestion.correct)) {
    if (repStep < 3) {
      repStep++;
      saveSessionState("student");
      showToast(`✅ Acertou! Falta(m) ${4 - repStep} pergunta(s) para voltar ao jogo!`);
      renderRepechageQuestion();
    } else {
      repStep = 0;
      currentRepQuestion = null;
      saveSessionState("student");
      document.getElementById("repechageModal").classList.add("hidden");
      if (gameState.players[myPlayerId]) {
        gameState.players[myPlayerId].status = "active";
        gameState.players[myPlayerId].score = Number(gameState.players[myPlayerId].score || 0) + 80;
      }
      myLocalScore += 80;
      showToast(`🔥 INCRÍVEL! Você acertou as 3 contas e voltou para a Fase ${gameState.stage}!`);
      await Promise.all([
        dbPushEvent(roomPin, { type: "REPECHAGE_PASS", playerId: myPlayerId, name: myName, cls: myClass }),
        pushScoreToGlobalLeaderboard(80, 0, 3)
      ]);
      renderStudentGame(false);
    }
  } else {
    const failedStep = repStep || 1;
    repStep = 0;
    saveSessionState("student");
    document.getElementById("repechageModal").classList.add("hidden");
    if (gameState.players[myPlayerId]) {
      gameState.players[myPlayerId].status = "eliminated";
    }
    await dbPushEvent(roomPin, { type: "REPECHAGE_FAIL", playerId: myPlayerId, name: myName, cls: myClass });
    openEliminatedModal(`Você errou a ${failedStep}ª pergunta da repescagem (a resposta certa era ${currentRepQuestion.correct}) e foi eliminado da partida.`);
  }
}

function openEliminatedModal(reason) {
  if (!roomPin || gameState.closed || gameState.deletedByAdmin) {
    leaveClosedRoomToJoinScreen("🔒 Esta sala foi encerrada pelo professor. Entre em outra sala.");
    return;
  }
  hideAllStudentModals();
  document.getElementById("elimReasonText").textContent = reason;
  document.getElementById("elimScore").textContent = myLocalScore + " pts";
  document.getElementById("eliminatedModal").classList.remove("hidden");
}

function showFinalTop3Modal() {
  if (victoryModalDismissedForMatch) return;
  hideAllStudentModals();

  const ranked = sortPlayersByTotalScore(Object.entries(gameState.players), true);
  const topList = ranked.slice(0, 3).map(([_, p]) => p);
  const isTwoPlayersMatch = ranked.length <= 2;
  const isMeFirst = ranked.length > 0 && ranked[0][0] === myPlayerId && (ranked[0][1].score || 0) > 0;
  const medals = isTwoPlayersMatch
    ? ["👑 VENCEDOR (1º)", "🥈 2º Lugar"]
    : ["🥇 1º Lugar", "🥈 2º Lugar", "🥉 3º Lugar"];

  document.getElementById("victoryModalTitle").textContent = isMeFirst
    ? "VOCÊ VENCEU!"
    : (isTwoPlayersMatch ? "Vencedor da Partida!" : "Pódio Oficial dos 3 Vencedores!");
  document.getElementById("victoryModalSubtitle").textContent = isMeFirst
    ? `Parabéns, ${myName}! Você venceu a partida!`
    : (isTwoPlayersMatch
      ? `Partida encerrada! Confira o vencedor e o placar final:`
      : "O torneio foi encerrado! Confira os 3 grandes campeões da sala:");
  document.getElementById("finalTop3List").innerHTML = topList.map((p, idx) => `
    <div style="padding:10px 0; border-bottom:${idx < topList.length - 1 ? '1px solid var(--border)' : 'none'}; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong style="color:var(--gold);">${medals[idx] || ("#" + (idx + 1))}:</strong> <strong>${p.name}</strong>
        <span style="font-size:0.82rem; color:var(--text-muted);">(${p.cls})</span>
      </div>
      <strong style="color:var(--success);">${p.score} pts</strong>
    </div>
  `).join("");

  configureWinnerModalStyle(isMeFirst);
  document.getElementById("victoryModal").classList.remove("hidden");
}

let isDragging = false;
let startCell = null;
let currentSelection = [];

function attachGridPointerEvents(gridElement, isBotGrid) {
  gridElement.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (isRecompLocked) {
      document.getElementById("recompositionModal").classList.remove("hidden");
      return;
    }
    if (isMathLocked) {
      if (!currentMathChallenge) loadFreshMathQuestionInPortal();
      document.getElementById("mathModal").classList.remove("hidden");
      return;
    }
    if (!isBotGrid) {
      if (!gameState.started) return;
      const me = gameState.players[myPlayerId];
      if (me && me.status === "eliminated") return;
      if (me && me.status === "repechage") { openRepechageModal(); return; }
    }

    const cell = e.target.closest(".cell");
    if (!cell) return;
    isDragging = true;
    startCell = { r: parseInt(cell.dataset.r), c: parseInt(cell.dataset.c) };
    updateSelection(gridElement, startCell);
  });

  gridElement.addEventListener("pointermove", (e) => {
    if (!isDragging || !startCell || isMathLocked || isRecompLocked) return;
    e.preventDefault();
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cell = el ? el.closest(".cell") : null;
    if (!cell) return;
    updateSelection(gridElement, { r: parseInt(cell.dataset.r), c: parseInt(cell.dataset.c) });
  });
}

attachGridPointerEvents(document.getElementById("wsGrid"), false);
attachGridPointerEvents(document.getElementById("botWsGrid"), true);

window.addEventListener("pointerup", () => {
  if (!isDragging) return;
  isDragging = false;
  if (!isMathLocked && !isRecompLocked) {
    if (isBotModeActive) checkBotWordSelection();
    else if (gameState.started) checkSelectedWord();
  }
  clearAllSelectionVisuals();
});

window.addEventListener("pointercancel", () => {
  if (!isDragging) return;
  isDragging = false;
  clearAllSelectionVisuals();
});

function updateSelection(gridElement, endCell) {
  clearAllSelectionVisuals();
  const dr = endCell.r - startCell.r;
  const dc = endCell.c - startCell.c;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));

  if (steps === 0) {
    currentSelection = [startCell];
  } else if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;
    currentSelection = [];
    for (let i = 0; i <= steps; i++) {
      currentSelection.push({ r: startCell.r + stepR * i, c: startCell.c + stepC * i });
    }
  } else {
    currentSelection = [startCell];
  }

  currentSelection.forEach(pos => {
    const el = gridElement.querySelector(`.cell[data-r="${pos.r}"][data-c="${pos.c}"]`);
    if (el) el.classList.add("selected");
  });
}

function clearAllSelectionVisuals() {
  document.querySelectorAll(".cell.selected").forEach(el => el.classList.remove("selected"));
}

function checkBotWordSelection() {
  if (currentSelection.length < 1) return;
  const str = currentSelection.map(pos => botGrid[pos.r][pos.c]).join("");
  const rev = str.split("").reverse().join("");
  const found = botStory.words.find(w => w.word === str || w.word === rev);
  if (!found) return;
  if (botClaimedWords[found.word]) {
    showToast(`Já encontrada por ${botClaimedWords[found.word].by}!`);
    return;
  }
  openQuizModal(found);
}

function checkSelectedWord() {
  if (currentSelection.length < 1) return;
  const selectedStr = currentSelection.map(pos => gameState.grid[pos.r][pos.c]).join("");
  const reversedStr = selectedStr.split("").reverse().join("");
  const story = getCurrentStory();

  const foundObj = story.words.find(item => item.word === selectedStr || item.word === reversedStr);
  if (!foundObj) return;

  if (gameState.claimedWords[foundObj.word]) {
    showToast(`Essa palavra já foi conquistada por ${gameState.claimedWords[foundObj.word].by}!`);
    return;
  }

  openQuizModal(foundObj);
}

function renderQuizOptionsButtons() {
  const optsEl = document.getElementById("classOptionsContainer");
  optsEl.innerHTML = "";
  GRAMMAR_CLASSES.forEach(cls => {
    const isWrong = wrongQuizClasses.has(cls);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "class-btn";
    btn.disabled = isWrong;
    if (isWrong) {
      btn.style.opacity = "0.75";
      btn.style.background = "rgba(244, 63, 94, 0.18)";
      btn.style.borderColor = "#f43f5e";
      btn.style.color = "#fda4af";
      btn.style.textDecoration = "line-through";
    }
    btn.innerHTML = `<span class="color-dot" style="background:${CLASS_COLORS[cls]};"></span> ${cls}${isWrong ? " ✕" : ""}`;
    btn.addEventListener("click", () => submitClassAnswer(cls));
    optsEl.appendChild(btn);
  });
}

function openQuizModal(wordObj) {
  if (isMathLocked || isRecompLocked) return;
  activeQuizWord = wordObj;
  quizAttempts = 0;
  wrongQuizClasses = new Set();
  document.getElementById("modalWordText").textContent = `${wordObj.display} (Tentativa 1/${MAX_QUIZ_ATTEMPTS})`;
  document.getElementById("modalContextSentence").textContent = wordObj.sentence;
  document.getElementById("modalHint").classList.add("hidden");

  renderQuizOptionsButtons();
  document.getElementById("quizModal").classList.remove("hidden");
}

function closeQuizModal(shouldCheckMathAfter = false) {
  document.getElementById("quizModal").classList.add("hidden");
  activeQuizWord = null;
  wrongQuizClasses = new Set();
  if (shouldCheckMathAfter && !isBotModeActive && gameState.started && !gameState.finished) {
    checkGlobalMathGateTrigger();
  }
}

async function submitClassAnswer(chosenClass) {
  if (!activeQuizWord || wrongQuizClasses.has(chosenClass)) return;

  if (isBotModeActive) {
    if (botClaimedWords[activeQuizWord.word]) {
      closeQuizModal(true);
      showToast("⚡ Um bot pegou antes de você!");
      return;
    }
    if (chosenClass === activeQuizWord.cls) {
      const pts = quizAttempts === 0 ? 100 : 70;
      const w = activeQuizWord.word;
      closeQuizModal(false);
      botClaimedWords[w] = { by: myName + " (Você)", points: pts };
      const human = botPlayers.find(p => p.isHuman);
      if (human) human.score += pts;
      renderBotTestUI(false);

      const openedMath = triggerBotModeMathIfNeeded();
      if (!openedMath) {
        showToast(`🎯 Correto! +${pts} pts!`);
        if (Object.keys(botClaimedWords).length >= botStory.words.length) {
          clearInterval(botTimer);
          showBotTestRankingModal();
        }
      }
    } else {
      quizAttempts++;
      wrongQuizClasses.add(chosenClass);
      playerStreak = 0;
      renderQuizOptionsButtons();
      const hintBox = document.getElementById("modalHint");
      if (quizAttempts >= MAX_QUIZ_ATTEMPTS) {
        const wordDisplay = activeQuizWord.display;
        closeQuizModal(true);
        showToast(`❌ Esgotaram as ${MAX_QUIZ_ATTEMPTS} tentativas em ${wordDisplay}! Continue buscando no tabuleiro.`);
        return;
      }
      const left = MAX_QUIZ_ATTEMPTS - quizAttempts;
      document.getElementById("modalWordText").textContent = `${activeQuizWord.display} (Tentativa ${quizAttempts + 1}/${MAX_QUIZ_ATTEMPTS})`;
      hintBox.textContent = `❌ "${chosenClass}" incorreto (${left} tentativa(s) restante(s)). Dica: ${activeQuizWord.hint}`;
      hintBox.classList.remove("hidden");
    }
    return;
  }

  if (!gameState.started) return;

  if (gameState.claimedWords[activeQuizWord.word]) {
    closeQuizModal(true);
    showToast(`⚡ Alguém respondeu antes de você!`);
    return;
  }

  if (chosenClass === activeQuizWord.cls) {
    playerStreak += 1;
    const streakBonus = playerStreak >= 3 ? 10 : 0;
    const earnedPoints = (quizAttempts === 0 ? 100 : 70) + streakBonus;
    const wordToClaim = activeQuizWord.word;
    closeQuizModal(false);

    myLocalWords.add(wordToClaim);
    myLocalScore += earnedPoints;
    if (gameState.players && gameState.players[myPlayerId]) {
      gameState.players[myPlayerId].score = Number(gameState.players[myPlayerId].score || 0) + earnedPoints;
    }
    gameState.claimedWords[wordToClaim] = { by: myName, points: earnedPoints };

    renderStudentGame(false);

    const locked = checkGlobalMathGateTrigger();
    if (!locked) {
      showToast(
        streakBonus > 0
          ? `🔥 Sequência de ${playerStreak}! +${earnedPoints} pts (+${streakBonus} bônus)!`
          : `🎯 Palavra classificada! +${earnedPoints} pts!`
      );
    }

    await Promise.all([
      dbPushEvent(roomPin, {
        type: "CLAIM_WORD",
        playerId: myPlayerId,
        name: myName,
        cls: myClass,
        stage: gameState.stage,
        word: wordToClaim,
        points: earnedPoints
      }),
      pushScoreToGlobalLeaderboard(earnedPoints, 1, 0)
    ]);
  } else {
    quizAttempts++;
    wrongQuizClasses.add(chosenClass);
    playerStreak = 0;
    renderQuizOptionsButtons();
    await dbPushEvent(roomPin, { type: "REGISTER_ERROR", playerId: myPlayerId, name: myName, cls: myClass });

    if (quizAttempts >= MAX_QUIZ_ATTEMPTS) {
      const wordDisplay = activeQuizWord.display;
      closeQuizModal(true);
      showToast(`❌ Você atingiu o limite de ${MAX_QUIZ_ATTEMPTS} tentativas em ${wordDisplay}!`);
      return;
    }

    const left = MAX_QUIZ_ATTEMPTS - quizAttempts;
    document.getElementById("modalWordText").textContent = `${activeQuizWord.display} (Tentativa ${quizAttempts + 1}/${MAX_QUIZ_ATTEMPTS})`;
    const hintBox = document.getElementById("modalHint");
    hintBox.textContent = `❌ "${chosenClass}" incorreto (${left} tentativa(s) restante(s)). Explicação: ${activeQuizWord.hint}`;
    hintBox.classList.remove("hidden");
  }
}

function bindAndroidBackButtonSafety() {
  document.addEventListener("backbutton", (e) => {
    const inLobby = !document.getElementById("viewLobby").classList.contains("hidden");
    if (inLobby) return;
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    showToast("Use o botão 'Sair' no topo para encerrar ou sair da sala com segurança.");
  }, false);
}

async function bootApp() {
  loadRoomHistoryLocal();
  renderLegends();
  renderModeratorsUI();
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();
  bindAndroidBackButtonSafety();
  await Promise.all([syncCloudStoriesBank(), fetchGlobalBotTestFlag(), loadBestPlayersRanking()]);

  try {
    const savedAuth = localStorage.getItem("csi_teacher_auth");
    if (savedAuth) {
      teacherAuthSession = JSON.parse(savedAuth);
      await loadTeacherSubscriptionProfile();
    }
  } catch (e) {}

  let raw = null;
  try { raw = localStorage.getItem("csi_active_session"); } catch (e) {}
  if (!raw) return;

  try {
    const session = JSON.parse(raw);
    if (!session || !session.pin) return;

    const roomLookup = await dbGetRoom(session.pin, true);
    const remote = roomLookup && roomLookup.exists ? roomLookup.state : null;
    if (!remote || !remote.grid || remote.closed || remote.deletedByAdmin) {
      clearSessionState();
      return;
    }

    if (session.role === "teacher" && teacherAuthSession && isSubscriptionValid(teacherProfile)) {
      await createTeacherRoom(session.pin, session.roomLabel);
    } else if (session.role === "student" && session.name) {
      await joinAsStudent(session);
    }
  } catch (e) {
    clearSessionState();
  }
}

bootApp();
