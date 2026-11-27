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
const GRID_SIZE = 14;
const TEACHER_POLL_INTERVAL_MS = 10000;
const STUDENT_POLL_INTERVAL_MS = 12000;

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
let teacherAuthSession = null;
let teacherProfile = null;
let authMode = "login";

let myPlayerId = "";
let roomPin = "";
let pollTimer = null;
let joinRetryTimer = null;
let lastBuiltGridKey = "";
let victoryModalDismissedForMatch = false;
let isRoomSyncInFlight = false;

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

let sbRealtimeClient = null;
let activeRealtimeChannel = null;
let roomChannelReady = false;
let teacherSaveDebounceTimer = null;

let roomHistoryEntries = [];
let deletedRoomSnapshots = {};
let playerStreak = 0;

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
let adminFilteredCandidates = [];

function openRoleGateway() {
  const gateway = document.getElementById("roleGatewayBox");
  const studentWrap = document.getElementById("studentPortalWrapper");
  const teacherWrap = document.getElementById("teacherPortalWrapper");
  if (gateway) gateway.classList.remove("hidden");
  if (studentWrap) studentWrap.classList.add("hidden");
  if (teacherWrap) teacherWrap.classList.add("hidden");
}

function selectLobbyRole(role) {
  const gateway = document.getElementById("roleGatewayBox");
  const studentWrap = document.getElementById("studentPortalWrapper");
  const teacherWrap = document.getElementById("teacherPortalWrapper");
  if (gateway) gateway.classList.add("hidden");

  if (role === "student") {
    if (studentWrap) studentWrap.classList.remove("hidden");
    if (teacherWrap) teacherWrap.classList.add("hidden");
    const pinInput = document.getElementById("inputPin");
    if (pinInput) pinInput.focus();
  } else if (role === "teacher") {
    if (teacherWrap) teacherWrap.classList.remove("hidden");
    if (studentWrap) studentWrap.classList.add("hidden");
    const emailInput = document.getElementById("authEmail");
    if (emailInput && !emailInput.closest("#teacherAuthBox")?.classList.contains("hidden")) {
      emailInput.focus();
    }
  }
}

window.openRoleGateway = openRoleGateway;
window.selectLobbyRole = selectLobbyRole;

function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3800);
}

function setNetStatus(status, text) {
  const dot = document.getElementById("netDot");
  if (dot) dot.className = "dot " + status;
  const netText = document.getElementById("netText");
  if (netText) netText.textContent = text;
}

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

function makeCanonicalPlayerId(name, cls) {
  const cleanName = (name || "aluno")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanCls = (cls || "geral")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]/g, "");
  return `u_${cleanName}_${cleanCls}`;
}

function renderLeaderboardRows(tbody, topList) {
  if (!tbody) return;
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
        const cfgRows = await cfgRes.json().catch(() => []);
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
    const salasRows = salasRes.ok ? await salasRes.json().catch(() => []) : [];

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
      const lbRows = await lbRes.json().catch(() => []);
      if (Array.isArray(lbRows) && lbRows.length > 0) {
        const filteredRows = lbRows.filter(r => {
          const tsStr = r.updated_at || r.created_at;
          if (!clearedMs || !tsStr) return !clearedMs;
          const rowMs = new Date(tsStr).getTime();
          return Number.isFinite(rowMs) && rowMs > clearedMs;
        });
        renderLeaderboardRows(tbody, filteredRows);
        return;
      }
    }

    const aggregated = {};
    if (Array.isArray(salasRows)) {
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
    }

    const topList = Object.values(aggregated)
      .sort((a, b) => b.pontos_totais - a.pontos_totais || b.total_palavras - a.total_palavras)
      .slice(0, 10);

    renderLeaderboardRows(tbody, topList);
  } catch (e) {
    renderLeaderboardRows(tbody, []);
  }
}

async function syncCloudStoriesBank() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/custom_stories?select=title,html,words&order=created_at.asc&limit=50`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (!res.ok) return;
    const rows = await res.json().catch(() => []);
    if (Array.isArray(rows) && rows.length > 0) {
      try { localStorage.setItem("csi_custom_stories", JSON.stringify(rows)); } catch (e) {}
      STORY_BANK = loadStoryBank(rows);
    }
  } catch (e) {}
}

async function fetchGlobalBotTestFlag() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global&select=bot_test_enabled`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (!res.ok) return;
    const rows = await res.json().catch(() => []);
    if (Array.isArray(rows) && rows.length > 0) {
      isBotTestEnabledGlobally = !!rows[0].bot_test_enabled;
      renderBotTestVisibility();
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

function renderLegends() {
  const html = GRAMMAR_CLASSES.map(cls =>
    `<span class="legend-pill" style="background:${CLASS_COLORS[cls]};">${cls}</span>`
  ).join("");
  ["lobbyLegendBar", "teacherLegendBar", "studentLegendBar", "botLegendBar"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
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
    const rows = await res.json().catch(() => []);
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
      const errTxt = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status}: ${errTxt}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function clearSessionState() {
  try { localStorage.removeItem("csi_active_session"); } catch (e) {}
}

function isSubscriptionValid(profile) {
  if (!profile) return false;
  if (profile.role === "admin") return true;
  if (profile.subscription_status === "active") return true;
  if (profile.subscription_status === "trial" && profile.trial_ends_at) {
    return new Date(profile.trial_ends_at).getTime() > Date.now();
  }
  return true;
}

function renderTeacherAuthUI() {
  const authBox = document.getElementById("teacherAuthBox");
  const loggedBox = document.getElementById("teacherLoggedBox");

  if (!teacherAuthSession || !teacherProfile) {
    if (authBox) authBox.classList.remove("hidden");
    if (loggedBox) loggedBox.classList.add("hidden");
    return;
  }

  if (authBox) authBox.classList.add("hidden");
  if (loggedBox) loggedBox.classList.remove("hidden");

  const roleBadge = teacherProfile.role === "admin" ? " [ADMIN]" : "";
  const profileNameEl = document.getElementById("teacherProfileName");
  if (profileNameEl) profileNameEl.textContent = (teacherProfile.full_name || teacherProfile.email) + roleBadge;

  const valid = isSubscriptionValid(teacherProfile);
  const banner = document.getElementById("subscriptionBanner");
  const statusTxt = document.getElementById("teacherSubStatusText");
  const btnCreate = document.getElementById("btnCreateRoom");
  const upgradeBox = document.getElementById("upgradeBox");

  if (valid) {
    if (banner) banner.classList.remove("expired");
    if (btnCreate) btnCreate.disabled = false;
    if (upgradeBox) upgradeBox.classList.add("hidden");

    if (statusTxt) {
      if (teacherProfile.role === "admin") {
        statusTxt.textContent = "🛡️ Acesso Administrativo Master Ativo";
        statusTxt.style.color = "#c084fc";
      } else if (teacherProfile.subscription_status === "active") {
        statusTxt.textContent = `✅ Plano ${(teacherProfile.plan_tier || "pro").toUpperCase()} Ativo`;
        statusTxt.style.color = "#34d399";
      } else {
        const daysLeft = teacherProfile.trial_ends_at
          ? Math.max(1, Math.ceil((new Date(teacherProfile.trial_ends_at).getTime() - Date.now()) / 86400000))
          : 7;
        statusTxt.textContent = `🎁 Teste Grátis Ativo (${daysLeft} dia(s) restante(s))`;
        statusTxt.style.color = "#fbbf24";
      }
    }
  } else {
    if (banner) banner.classList.add("expired");
    if (btnCreate) btnCreate.disabled = true;
    if (upgradeBox) upgradeBox.classList.remove("hidden");
    if (statusTxt) {
      statusTxt.textContent = "⛔ Assinatura Expirada — Renove para criar salas";
      statusTxt.style.color = "#fda4af";
    }
  }
}

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
    const rows = await res.json().catch(() => []);
    if (Array.isArray(rows)) {
      const emails = rows.map(r => r.email).filter(Boolean);
      moderatorsList = saveModeratorsList(emails);
      renderModeratorsUI();
    }
  } catch (e) {}
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
    const rows = await res.json().catch(() => []);
    const validRooms = Array.isArray(rows) ? rows
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
      .slice(0, 12) : [];

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

async function loadTeacherSubscriptionProfile() {
  if (!teacherAuthSession || !teacherAuthSession.access_token || !teacherAuthSession.user?.id) return false;

  const fallbackEmail = teacherAuthSession.user.email || "";
  teacherProfile = {
    id: teacherAuthSession.user.id,
    email: fallbackEmail,
    full_name: fallbackEmail ? fallbackEmail.split("@")[0] : "Professor",
    role: "teacher",
    subscription_status: "trial",
    plan_tier: "trial",
    trial_ends_at: new Date(Date.now() + 7 * 86400000).toISOString()
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(teacherAuthSession.user.id)}&select=*`, {
      cache: "no-store",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${teacherAuthSession.access_token}`
      }
    });

    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows.length > 0) {
        teacherProfile = { ...teacherProfile, ...rows[0] };
      }
    }
  } catch (e) {}

  renderTeacherAuthUI();
  renderBotTestVisibility();
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();
  await Promise.all([loadRecentTeacherRooms(), syncCloudModeratorsList()]).catch(() => {});
  return true;
}

function unsubscribeRoomRealtime() {
  roomChannelReady = false;
  if (activeRealtimeChannel && sbRealtimeClient) {
    try { sbRealtimeClient.removeChannel(activeRealtimeChannel); } catch (e) {}
  }
  activeRealtimeChannel = null;
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
  isRoomSyncInFlight = false;
  playerStreak = 0;
  document.body.classList.remove("pseudo-fullscreen");
  document.body.classList.remove("focus-wordsearch-mode");
  const fab = document.getElementById("btnExitFocusFab");
  if (fab) fab.classList.add("hidden");
  document.getElementById("viewTeacher")?.classList.add("hidden");
  document.getElementById("viewStudent")?.classList.add("hidden");
  document.getElementById("viewBotTest")?.classList.add("hidden");
  document.getElementById("btnExitRoom")?.classList.add("hidden");
  document.getElementById("viewLobby")?.classList.remove("hidden");
  openRoleGateway();
  setNetStatus("online", "Nuvem Pronta");
}

function bindGlobalLifecycleListeners() {
  document.addEventListener("backbutton", (e) => {
    const inLobby = !document.getElementById("viewLobby")?.classList.contains("hidden");
    if (inLobby) return;
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    showToast("Use o botão 'Sair' no topo para encerrar ou sair da sala com segurança.");
  }, false);

  document.addEventListener("visibilitychange", async () => {
    if (document.hidden || !roomPin || isBotModeActive || isRoomSyncInFlight) return;
    if (!document.getElementById("viewStudent")?.classList.contains("hidden")) {
      isRoomSyncInFlight = true;
      try {
        const roomCheck = await dbGetRoom(roomPin, true);
        if (roomCheck.ok && roomCheck.exists && roomCheck.state) {
          reconcileRemoteStudentRoomState(roomCheck.state);
        }
      } finally {
        isRoomSyncInFlight = false;
      }
    }
  });
}

async function bootApp() {
  openRoleGateway();
  loadRoomHistoryLocal();
  renderLegends();
  renderModeratorsUI();
  renderRoomHistoryPanel();
  renderDeletedRoomsFolder();
  bindGlobalLifecycleListeners();

  Promise.all([
    syncCloudStoriesBank().catch(() => {}),
    fetchGlobalBotTestFlag().catch(() => {}),
    loadBestPlayersRanking().catch(() => {})
  ]);

  try {
    const savedAuth = localStorage.getItem("csi_teacher_auth");
    if (savedAuth) {
      teacherAuthSession = JSON.parse(savedAuth);
      if (teacherAuthSession && teacherAuthSession.access_token) {
        await loadTeacherSubscriptionProfile();
      }
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
