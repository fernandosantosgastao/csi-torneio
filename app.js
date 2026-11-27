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
const GRID_SIZE = 14;
const MATH_INTERVAL_MS = 120000;
const PENALTY_DEFAULT_MS = 60000;
const RESTORE_WINDOW_DAYS = 30;
const RESTORE_WINDOW_MS = RESTORE_WINDOW_DAYS * 24 * 60 * 60 * 1000;

const DEFAULT_24H_ROOMS = [
  { pin: "A24H", label: "Arena 24h • Alfa", storyIdx: 0 },
  { pin: "B24H", label: "Arena 24h • Beta", storyIdx: 1 },
  { pin: "C24H", label: "Arena 24h • Gama", storyIdx: 2 },
  { pin: "D24H", label: "Arena 24h • Delta", storyIdx: 3 }
];

const STORIES = [
  {
    title: "O Enigma da Cabana do Mago",
    html: `1. Na <span class="word-tag" data-w="VELHA">(1) velha</span> <span class="word-tag" data-w="CABANA">(2) cabana</span> abandonada, existia <span class="word-tag" data-w="UM">(3) um</span> baú <span class="word-tag" data-w="AMARELO">(4) amarelo</span> <span class="word-tag" data-w="COM">(5) com</span> <span class="word-tag" data-w="TRINTA">(6) trinta</span> moedas de prata.<br>2. O mágico <span class="word-tag" data-w="QUE">(7) que</span> <span class="word-tag" data-w="CUIDA">(8) cuida</span> do lugar exige o dobro das moedas <span class="word-tag" data-w="PARA">(9) para</span> entregar a chave.<br>3. <span class="word-tag" data-w="ONTEM">(10) Ontem</span>, dividimos doze pergaminhos igualmente entre quatro cofres, <span class="word-tag" data-w="MAS">(11) mas</span> <span class="word-tag" data-w="NINGUEM">(12) ninguém</span> <span class="word-tag" data-w="ABRIU">(13) abriu</span> a porta.<br>4. — <span class="word-tag" data-w="CUIDADO">(14) Cuidado!</span> — gritou o guardião, descendo quinze degraus <span class="word-tag" data-w="DEPRESSA">(15) depressa</span> antes de subir <span class="word-tag" data-w="SEIS">(16) seis</span>.`,
    words: [
      { word: "VELHA", display: "(1) velha", cls: "Adjetivo", sentence: "Na [velha] cabana abandonada...", hint: "Caracteriza o substantivo 'cabana'." },
      { word: "CABANA", display: "(2) cabana", cls: "Substantivo", sentence: "Na velha [cabana] abandonada...", hint: "Nomeia a construção." },
      { word: "UM", display: "(3) um", cls: "Artigo", sentence: "Existia [um] baú amarelo...", hint: "Artigo indefinido." },
      { word: "AMARELO", display: "(4) amarelo", cls: "Adjetivo", sentence: "Um baú [amarelo]...", hint: "Indica cor/qualidade." },
      { word: "COM", display: "(5) com", cls: "Preposição", sentence: "Baú amarelo [com] trinta moedas...", hint: "Palavra invariável que liga termos." },
      { word: "TRINTA", display: "(6) trinta", cls: "Numeral", sentence: "[Trinta] moedas de prata.", hint: "Quantidade numérica exata." },
      { word: "QUE", display: "(7) que", cls: "Pronome", sentence: "O mágico [que] cuida...", hint: "Pronome relativo." },
      { word: "CUIDA", display: "(8) cuida", cls: "Verbo", sentence: "Que [cuida] do lugar...", hint: "Indica ação." },
      { word: "PARA", display: "(9) para", cls: "Preposição", sentence: "[Para] entregar a chave.", hint: "Preposição de finalidade." },
      { word: "ONTEM", display: "(10) Ontem", cls: "Advérbio", sentence: "[Ontem], dividimos doze pergaminhos...", hint: "Advérbio de tempo." },
      { word: "MAS", display: "(11) mas", cls: "Conjunção", sentence: "...entre quatro cofres, [mas] ninguém abriu...", hint: "Conjunção de oposição." },
      { word: "NINGUEM", display: "(12) ninguém", cls: "Pronome", sentence: "...mas [ninguém] abriu a porta.", hint: "Pronome indefinido." },
      { word: "ABRIU", display: "(13) abriu", cls: "Verbo", sentence: "...ninguém [abriu] a porta.", hint: "Verbo no passado." },
      { word: "CUIDADO", display: "(14) Cuidado!", cls: "Interjeição", sentence: "— [Cuidado!] — gritou o guardião...", hint: "Interjeição de advertência." },
      { word: "DEPRESSA", display: "(15) depressa", cls: "Advérbio", sentence: "...descendo quinze degraus [depressa]...", hint: "Advérbio de modo." },
      { word: "SEIS", display: "(16) seis", cls: "Numeral", sentence: "...antes de subir [seis].", hint: "Numeral cardinal." }
    ]
  },
  {
    title: "O Tesouro do Navio Fantasma",
    html: `1. O <span class="word-tag" data-w="GRANDE">(1) grande</span> <span class="word-tag" data-w="NAVIO">(2) navio</span> ancorou <span class="word-tag" data-w="PERTO">(3) perto</span> da ilha <span class="word-tag" data-w="ESCURA">(4) escura</span> <span class="word-tag" data-w="COM">(5) com</span> <span class="word-tag" data-w="VINTE">(6) vinte</span> caixas de ouro.<br>2. O capitão <span class="word-tag" data-w="NOS">(7) nos</span> <span class="word-tag" data-w="AVISOU">(8) avisou</span> que cada caixa guarda o triplo <span class="word-tag" data-w="DE">(9) de</span> rubis brilhantes.<br>3. <span class="word-tag" data-w="HOJE">(10) Hoje</span>, repartimos dezoito mapas antigos entre três marujos, <span class="word-tag" data-w="POREM">(11) porém</span> <span class="word-tag" data-w="ALGUEM">(12) alguém</span> <span class="word-tag" data-w="ESCONDEU">(13) escondeu</span> <span class="word-tag" data-w="AS">(14) as</span> chaves.<br>4. — <span class="word-tag" data-w="SOCORRO">(15) Socorro!</span> — gritou o pirata, navegando <span class="word-tag" data-w="QUATRO">(16) quatro</span> léguas para o norte.`,
    words: [
      { word: "GRANDE", display: "(1) grande", cls: "Adjetivo", sentence: "O [grande] navio ancorou...", hint: "Caracteriza 'navio'." },
      { word: "NAVIO", display: "(2) navio", cls: "Substantivo", sentence: "O grande [navio] ancorou...", hint: "Substantivo comum." },
      { word: "PERTO", display: "(3) perto", cls: "Advérbio", sentence: "...ancorou [perto] da ilha...", hint: "Advérbio de lugar." },
      { word: "ESCURA", display: "(4) escura", cls: "Adjetivo", sentence: "...da ilha [escura]...", hint: "Qualifica 'ilha'." },
      { word: "COM", display: "(5) com", cls: "Preposição", sentence: "...[com] vinte caixas...", hint: "Preposição." },
      { word: "VINTE", display: "(6) vinte", cls: "Numeral", sentence: "...[vinte] caixas de ouro.", hint: "Numeral cardinal." },
      { word: "NOS", display: "(7) nos", cls: "Pronome", sentence: "O capitão [nos] avisou...", hint: "Pronome oblíquo." },
      { word: "AVISOU", display: "(8) avisou", cls: "Verbo", sentence: "O capitão nos [avisou]...", hint: "Verbo de ação." },
      { word: "DE", display: "(9) de", cls: "Preposição", sentence: "...o triplo [de] rubis...", hint: "Preposição." },
      { word: "HOJE", display: "(10) Hoje", cls: "Advérbio", sentence: "[Hoje], repartimos dezoito mapas...", hint: "Advérbio de tempo." },
      { word: "POREM", display: "(11) porém", cls: "Conjunção", sentence: "...entre três marujos, [porém] alguém...", hint: "Conjunção adversativa." },
      { word: "ALGUEM", display: "(12) alguém", cls: "Pronome", sentence: "...porém [alguém] escondeu...", hint: "Pronome indefinido." },
      { word: "ESCONDEU", display: "(13) escondeu", cls: "Verbo", sentence: "...alguém [escondeu] as chaves.", hint: "Verbo no pretérito." },
      { word: "AS", display: "(14) as", cls: "Artigo", sentence: "...escondeu [as] chaves.", hint: "Artigo definido." },
      { word: "SOCORRO", display: "(15) Socorro!", cls: "Interjeição", sentence: "— [Socorro!] — gritou o pirata...", hint: "Interjeição de socorro." },
      { word: "QUATRO", display: "(16) quatro", cls: "Numeral", sentence: "...navegando [quatro] léguas...", hint: "Numeral cardinal." }
    ]
  },
  {
    title: "O Laboratório do Alquimista",
    html: `1. <span class="word-tag" data-w="AQUELE">(1) Aquele</span> <span class="word-tag" data-w="CIENTISTA">(2) cientista</span> <span class="word-tag" data-w="MALUCO">(3) maluco</span> <span class="word-tag" data-w="MISTUROU">(4) misturou</span> <span class="word-tag" data-w="OITO">(5) oito</span> gotas <span class="word-tag" data-w="AZUIS">(6) azuis</span> <span class="word-tag" data-w="EM">(7) em</span> <span class="word-tag" data-w="CADA">(8) cada</span> frasco.<br>2. <span class="word-tag" data-w="ELE">(9) Ele</span> usou cinco vidros grandes <span class="word-tag" data-w="E">(10) e</span> anotou <span class="word-tag" data-w="TUDO">(11) tudo</span> <span class="word-tag" data-w="RAPIDAMENTE">(12) rapidamente</span> no caderno.<br>3. <span class="word-tag" data-w="SEMPRE">(13) Sempre</span> <span class="word-tag" data-w="SOBRA">(14) sobra</span> <span class="word-tag" data-w="UMA">(15) uma</span> poção mágica!<br>4. — <span class="word-tag" data-w="EURECA">(16) Eureca!</span> — comemorou o mestre ao ver o brilho dourado.`,
    words: [
      { word: "AQUELE", display: "(1) Aquele", cls: "Pronome", sentence: "[Aquele] cientista maluco...", hint: "Pronome demonstrativo." },
      { word: "CIENTISTA", display: "(2) cientista", cls: "Substantivo", sentence: "Aquele [cientista] maluco...", hint: "Substantivo comum." },
      { word: "MALUCO", display: "(3) maluco", cls: "Adjetivo", sentence: "Aquele cientista [maluco]...", hint: "Adjetivo." },
      { word: "MISTUROU", display: "(4) misturou", cls: "Verbo", sentence: "...[misturou] oito gotas...", hint: "Verbo." },
      { word: "OITO", display: "(5) oito", cls: "Numeral", sentence: "...[oito] gotas azuis...", hint: "Numeral." },
      { word: "AZUIS", display: "(6) azuis", cls: "Adjetivo", sentence: "...gotas [azuis]...", hint: "Adjetivo." },
      { word: "EM", display: "(7) em", cls: "Preposição", sentence: "...[em] cada frasco.", hint: "Preposição." },
      { word: "CADA", display: "(8) cada", cls: "Pronome", sentence: "...em [cada] frasco.", hint: "Pronome indefinido." },
      { word: "ELE", display: "(9) Ele", cls: "Pronome", sentence: "[Ele] usou cinco vidros...", hint: "Pronome pessoal." },
      { word: "E", display: "(10) e", cls: "Conjunção", sentence: "...grandes [e] anotou tudo...", hint: "Conjunção aditiva." },
      { word: "TUDO", display: "(11) tudo", cls: "Pronome", sentence: "...anotou [tudo] rapidamente...", hint: "Pronome indefinido." },
      { word: "RAPIDAMENTE", display: "(12) rapidamente", cls: "Advérbio", sentence: "...anotou tudo [rapidamente]...", hint: "Advérbio de modo." },
      { word: "SEMPRE", display: "(13) Sempre", cls: "Advérbio", sentence: "[Sempre] sobra uma poção...", hint: "Advérbio de tempo." },
      { word: "SOBRA", display: "(14) sobra", cls: "Verbo", sentence: "Sempre [sobra] uma poção...", hint: "Verbo." },
      { word: "UMA", display: "(15) uma", cls: "Artigo", sentence: "...[uma] poção mágica!", hint: "Artigo indefinido." },
      { word: "EURECA", display: "(16) Eureca!", cls: "Interjeição", sentence: "— [Eureca!] — comemorou...", hint: "Interjeição." }
    ]
  },
  {
    title: "A Torre do Relógio Antigo",
    html: `1. <span class="word-tag" data-w="DOZE">(1) Doze</span> <span class="word-tag" data-w="ENGRENAGENS">(2) engrenagens</span> <span class="word-tag" data-w="PESADAS">(3) pesadas</span> <span class="word-tag" data-w="GIRAM">(4) giram</span> <span class="word-tag" data-w="LENTAMENTE">(5) lentamente</span> <span class="word-tag" data-w="DENTRO">(6) dentro</span> <span class="word-tag" data-w="DA">(7) da</span> torre.<br>2. <span class="word-tag" data-w="NOSSO">(8) Nosso</span> relojoeiro <span class="word-tag" data-w="CONSERTOU">(9) consertou</span> sete peças <span class="word-tag" data-w="ANTES">(10) antes</span> <span class="word-tag" data-w="DO">(11) do</span> meio-dia.<br>3. O sino <span class="word-tag" data-w="DOURADO">(12) dourado</span> toca <span class="word-tag" data-w="QUANDO">(13) quando</span> <span class="word-tag" data-w="OS">(14) os</span> ponteiros <span class="word-tag" data-w="SE">(15) se</span> encontram.<br>4. — <span class="word-tag" data-w="SILENCIO">(16) Silêncio!</span> — pediu o guarda ao ouvir o mecanismo.`,
    words: [
      { word: "DOZE", display: "(1) Doze", cls: "Numeral", sentence: "[Doze] engrenagens pesadas...", hint: "Numeral." },
      { word: "ENGRENAGENS", display: "(2) engrenagens", cls: "Substantivo", sentence: "Doze [engrenagens] pesadas...", hint: "Substantivo." },
      { word: "PESADAS", display: "(3) pesadas", cls: "Adjetivo", sentence: "Doze engrenagens [pesadas]...", hint: "Adjetivo." },
      { word: "GIRAM", display: "(4) giram", cls: "Verbo", sentence: "...engrenagens pesadas [giram]...", hint: "Verbo." },
      { word: "LENTAMENTE", display: "(5) lentamente", cls: "Advérbio", sentence: "...giram [lentamente]...", hint: "Advérbio." },
      { word: "DENTRO", display: "(6) dentro", cls: "Advérbio", sentence: "...[dentro] da torre.", hint: "Advérbio." },
      { word: "DA", display: "(7) da", cls: "Preposição", sentence: "...dentro [da] torre.", hint: "Preposição/contração." },
      { word: "NOSSO", display: "(8) Nosso", cls: "Pronome", sentence: "[Nosso] relojoeiro consertou...", hint: "Pronome possessivo." },
      { word: "CONSERTOU", display: "(9) consertou", cls: "Verbo", sentence: "Nosso relojoeiro [consertou]...", hint: "Verbo." },
      { word: "ANTES", display: "(10) antes", cls: "Advérbio", sentence: "...sete peças [antes]...", hint: "Advérbio." },
      { word: "DO", display: "(11) do", cls: "Preposição", sentence: "...antes [do] meio-dia.", hint: "Preposição/contração." },
      { word: "DOURADO", display: "(12) dourado", cls: "Adjetivo", sentence: "O sino [dourado] toca...", hint: "Adjetivo." },
      { word: "QUANDO", display: "(13) quando", cls: "Conjunção", sentence: "...toca [quando] os ponteiros...", hint: "Conjunção temporal." },
      { word: "OS", display: "(14) os", cls: "Artigo", sentence: "...quando [os] ponteiros...", hint: "Artigo definido." },
      { word: "SE", display: "(15) se", cls: "Pronome", sentence: "...os ponteiros [se] encontram.", hint: "Pronome." },
      { word: "SILENCIO", display: "(16) Silêncio!", cls: "Interjeição", sentence: "— [Silêncio!] — pediu...", hint: "Interjeição." }
    ]
  }
];

const VALID_ROUTES = ["/login", "/", "/painel-de-controle", "/gerador-de-salas", "/salas-online"];
const LAST_ROUTE_KEY = "csi_last_route_v1";

let authSession = null;
let currentProfile = null;
let moderatorsEmails = [];
let botTestAllowed = false;
let authLoadedOnce = false;
let gateSignupMode = false;
let routeStack = [];
let handlingPopState = false;

let activeRoomPin = "";
let activeRoomState = null;
let activeRoomMeta = null;
let activePlayerNick = "";
let activePlayerClass = "Geral";
let lastProcessedEventId = 0;
let eventStreamChannel = null;
let sbClient = null;
let uiRenderDebounce = null;
let twoMinTimerInterval = null;
let nextMathAtMs = 0;
let currentMathTask = null;

let activeQuizItem = null;
let quizWrongSet = new Set();
let quizTries = 0;

let isPointerDragging = false;
let dragStartCoord = null;
let selectedCoords = [];

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function toggleMobileNavDrawer(forceClose = false) {
  const nav = document.getElementById("mainNavPills");
  if (!nav) return;
  if (forceClose) {
    nav.classList.remove("mobile-open");
  } else {
    nav.classList.toggle("mobile-open");
  }
}

function syncFullscreenButtonLabel() {
  const btn = document.getElementById("btnFullscreenToggle");
  if (!btn) return;
  const active = !!(document.fullscreenElement || document.webkitFullscreenElement);
  btn.textContent = active ? "🗗 Sair Tela Cheia" : "⛶ Tela Cheia";
}

async function toggleFullscreenMode() {
  try {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const root = document.documentElement;
      if (root.requestFullscreen) {
        await root.requestFullscreen();
      } else if (root.webkitRequestFullscreen) {
        await root.webkitRequestFullscreen();
      } else {
        toast("Use F11 no teclado para alternar tela cheia neste navegador.");
      }
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    }
  } catch (e) {
    toast("Use F11 no teclado para alternar tela cheia.");
  } finally {
    syncFullscreenButtonLabel();
  }
}

document.addEventListener("fullscreenchange", syncFullscreenButtonLabel);
document.addEventListener("webkitfullscreenchange", syncFullscreenButtonLabel);

function openGateQuickCode() {
  document.getElementById("gateQuickCodeBox")?.classList.remove("hidden");
  document.getElementById("gateAccountBox")?.classList.add("hidden");
}

function openGateAccountForm(isSignup) {
  gateSignupMode = !!isSignup;
  document.getElementById("gateAccountBox")?.classList.remove("hidden");
  document.getElementById("gateQuickCodeBox")?.classList.add("hidden");
  const titleEl = document.getElementById("gateAccountTitle");
  const btnEl = document.getElementById("gateAuthSubmitBtn");
  if (titleEl) titleEl.textContent = gateSignupMode ? "✨ Criar uma Conta" : "🔐 Fazer Login";
  if (btnEl) btnEl.textContent = gateSignupMode ? "Criar Conta e Entrar" : "Entrar na Conta";
}

async function submitGateQuickCode() {
  const nick = String(document.getElementById("gateCodeName")?.value || "").trim();
  const cls = String(document.getElementById("gateCodeClass")?.value || "Geral").trim() || "Geral";
  const pin = String(document.getElementById("gateCodePin")?.value || "").trim().toUpperCase();
  if (!nick) return toast("Digite seu nome.");
  if (!/^[A-Z0-9]{4}$/.test(pin)) return toast("Digite o PIN de 4 letras.");

  document.getElementById("quickCodeName").value = nick;
  document.getElementById("quickCodeClass").value = cls;
  document.getElementById("quickCodePin").value = pin;
  await navigateToRoute("/");
  await enterRoomByQuickCode();
}

async function submitGateAccount() {
  const email = String(document.getElementById("gateAuthEmail")?.value || "").trim().toLowerCase();
  const password = String(document.getElementById("gateAuthPassword")?.value || "");
  if (!email || password.length < 6) return toast("Informe e-mail e senha (mínimo 6 caracteres).");

  const endpoint = gateSignupMode ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password";
  const res = await fetch(`${SUPABASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    return toast(data.msg || data.error_description || "Falha na autenticação.");
  }

  authSession = { access_token: data.access_token, user: data.user };
  localStorage.setItem("csi_teacher_auth", JSON.stringify(authSession));
  await loadSessionAndProfile();
  await loadPlatformState();
  toast(gateSignupMode ? "Conta criada com sucesso!" : "Login realizado com sucesso!");
  await navigateToRoute("/");
}

function getHeaders(json = false) {
  const h = { "apikey": SUPABASE_KEY };
  if (authSession?.access_token) h["Authorization"] = `Bearer ${authSession.access_token}`;
  if (json) h["Content-Type"] = "application/json";
  return h;
}

function isAdminUser() {
  return !!(authSession && currentProfile && currentProfile.role === "admin");
}

function isModUser() {
  if (!authSession) return false;
  if (isAdminUser()) return true;
  const em = String(currentProfile?.email || authSession.user?.email || "").trim().toLowerCase();
  return !!(em && moderatorsEmails.includes(em));
}

function canAccessControlPanel() {
  return isAdminUser() || isModUser();
}

function canAccessTeacherGenerator() {
  if (!authSession) return false;
  if (isAdminUser() || isModUser()) return true;
  return currentProfile?.role === "teacher" || currentProfile?.subscription_status === "active" || currentProfile?.subscription_status === "trial";
}

function isMasterBlockedRoom(meta = activeRoomMeta, state = activeRoomState) {
  return !!(meta?.admin_deleted || meta?.admin_locked || state?.adminDeleted || state?.adminLocked);
}

function canTeacherManageRoom(row) {
  if (!authSession || !row) return false;
  if (isAdminUser()) return true;
  const myId = authSession.user?.id;
  if (!myId || row.owner_id !== myId) return false;
  if (row.admin_deleted || row.admin_locked || row.state?.adminDeleted || row.state?.adminLocked) return false;
  return true;
}

function isWithin30Days(deletedAtIso) {
  if (!deletedAtIso) return false;
  const ts = Date.parse(deletedAtIso);
  if (Number.isNaN(ts)) return false;
  return (Date.now() - ts) <= RESTORE_WINDOW_MS;
}

function getCurrentPlayerRecord() {
  if (!activeRoomState || !activePlayerNick) return null;
  const pk = makePlayerKey(activePlayerNick, activePlayerClass);
  return activeRoomState.players?.[pk] || null;
}

function isCurrentPlayerEliminated() {
  const me = getCurrentPlayerRecord();
  if (!me || !me.eliminated) return false;
  if (me.penaltyUntilMs && Date.now() >= me.penaltyUntilMs) {
    me.eliminated = false;
    me.penaltyUntilMs = 0;
    return false;
  }
  return true;
}

function syncEliminationPenaltyUi() {
  const banner = document.getElementById("arenaElimPenaltyBanner");
  const playable = document.getElementById("arenaPlayableContent");
  const clockEl = document.getElementById("arenaElimClock");
  const descEl = document.getElementById("arenaElimPenaltyDesc");

  const me = getCurrentPlayerRecord();
  const elim = isCurrentPlayerEliminated();

  if (elim && me) {
    banner?.classList.remove("hidden");
    playable?.classList.add("arena-locked-overlay");
    const leftMs = Math.max(0, Number(me.penaltyUntilMs || 0) - Date.now());
    const sec = Math.ceil(leftMs / 1000);
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${mm}:${ss}`;
    if (descEl) {
      descEl.textContent = `Tempo de espera/castigo restante para recomposição: ${mm}:${ss}. Aguarde ou peça recomposição.`;
    }
  } else {
    banner?.classList.add("hidden");
    playable?.classList.remove("arena-locked-overlay");
  }
}

function updateNavVisibility() {
  const canCtrl = canAccessControlPanel();
  document.getElementById("navControlPanelBtn")?.classList.toggle("hidden", !canCtrl);
  const homeAdminCard = document.getElementById("homeAdminCard");
  if (homeAdminCard) homeAdminCard.style.display = canCtrl ? "flex" : "none";
}

function normalizePath(pathname) {
  const p = String(pathname || "/").replace(/\/+$/, "") || "/";
  if (p === "/index.html") return "/";
  if (VALID_ROUTES.includes(p)) return p;
  return "/";
}

function readInitialRoute() {
  const rawPath = String(window.location.pathname || "/").replace(/\/+$/, "") || "/";
  if (rawPath === "/") {
    return "/login";
  }
  return normalizePath(rawPath);
}

function showRouteSection(route) {
  toggleMobileNavDrawer(true);
  document.body.classList.toggle("login-gate-active", route === "/login");
  document.querySelectorAll(".route-view").forEach(sec => sec.classList.add("hidden"));
  document.getElementById("navLoginBtn")?.classList.toggle("active", route === "/login");
  document.getElementById("navHomeBtn")?.classList.toggle("active", route === "/");
  document.getElementById("navSalas24hBtn")?.classList.toggle("active", route === "/salas-online");
  document.getElementById("navCreateClassBtn")?.classList.toggle("active", route === "/gerador-de-salas");
  document.getElementById("navControlPanelBtn")?.classList.toggle("active", route === "/painel-de-controle");

  if (route === "/login") {
    document.getElementById("routeLoginGate")?.classList.remove("hidden");
  } else if (route === "/") {
    document.getElementById("routeHome")?.classList.remove("hidden");
  } else if (route === "/salas-online") {
    document.getElementById("routeSalasOnline")?.classList.remove("hidden");
  } else if (route === "/gerador-de-salas") {
    document.getElementById("routeCreateClass")?.classList.remove("hidden");
  } else if (route === "/painel-de-controle") {
    document.getElementById("routeControlPanel")?.classList.remove("hidden");
  }
}

function pushBackSentinel(route) {
  try {
    window.history.replaceState({ route, sentinel: false }, "", route);
    window.history.pushState({ route, sentinel: true }, "", route);
  } catch (e) {}
}

function recordRouteHistory(route, replaceState = false) {
  if (handlingPopState) return;
  try {
    if (replaceState) {
      pushBackSentinel(route);
    } else if (window.location.pathname !== route || !window.history.state?.sentinel) {
      window.history.pushState({ route, sentinel: true }, "", route);
    }
  } catch (e) {}
}

async function navigateToRoute(targetPath, replaceState = false) {
  const route = normalizePath(targetPath);

  if (authLoadedOnce && route === "/painel-de-controle" && !canAccessControlPanel()) {
    toast("Acesso restrito a administradores e moderadores autorizados.");
    return navigateToRoute("/", replaceState);
  }

  if (authLoadedOnce && route === "/gerador-de-salas" && !authSession) {
    toast("Faça login como professor para acessar o portal do professor.");
  }

  const prevRoute = routeStack[routeStack.length - 1];
  if (!handlingPopState && prevRoute !== route) {
    routeStack.push(route);
  }

  try { localStorage.setItem(LAST_ROUTE_KEY, route); } catch (e) {}

  recordRouteHistory(route, replaceState);
  showRouteSection(route);

  if (route === "/") {
    await loadGlobalRankingTable();
  } else if (route === "/salas-online") {
    syncSalas24hView();
  } else if (route === "/gerador-de-salas") {
    syncTeacherGeneratorView();
    if (authSession && canAccessTeacherGenerator()) {
      await loadTeacherOwnRooms();
    }
  } else if (route === "/painel-de-controle" && canAccessControlPanel()) {
    await refreshControlPanel();
  }
}

async function loadSessionAndProfile() {
  try {
    const raw = localStorage.getItem("csi_teacher_auth");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed?.access_token || !parsed?.user?.id) return;
    authSession = parsed;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(authSession.user.id)}&select=*`, {
      cache: "no-store",
      headers: getHeaders(false)
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      currentProfile = Array.isArray(rows) && rows[0]
        ? rows[0]
        : { id: authSession.user.id, email: authSession.user.email, role: "student", subscription_status: "active" };
    }
  } catch (e) {}
}

async function loadPlatformState() {
  try {
    const cfgRes = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global&select=bot_test_enabled`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (cfgRes.ok) {
      const rows = await cfgRes.json().catch(() => []);
      if (Array.isArray(rows) && rows[0]) botTestAllowed = !!rows[0].bot_test_enabled;
    }
  } catch (e) {}

  moderatorsEmails = [];
  try {
    if (authSession?.access_token) {
      const modRes = await fetch(`${SUPABASE_URL}/rest/v1/moderators?select=email`, {
        cache: "no-store",
        headers: getHeaders(false)
      });
      if (modRes.ok) {
        const rows = await modRes.json().catch(() => []);
        if (Array.isArray(rows)) {
          moderatorsEmails = rows.map(r => String(r.email || "").trim().toLowerCase()).filter(Boolean);
        }
      }
    }
  } catch (e) {}

  updateNavVisibility();
}

function logoutAccountSession() {
  authSession = null;
  currentProfile = null;
  activeRoomPin = "";
  activeRoomState = null;
  activeRoomMeta = null;
  try { localStorage.removeItem("csi_teacher_auth"); } catch (e) {}
  leaveCurrentMatchToHub();
  updateNavVisibility();
  toast("Sessão encerrada.");
  navigateToRoute("/login");
}

function buildSeedRng(seed) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function() {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildWordSearchMatrix(seedStr, wordsList) {
  const rng = buildSeedRng(seedStr);
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  const placements = [];
  const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const sorted = [...wordsList].sort((a, b) => b.word.length - a.word.length);

  for (const item of sorted) {
    let ok = false;
    let attempts = 0;
    while (!ok && attempts < 400) {
      attempts++;
      const [dr, dc] = dirs[Math.floor(rng() * dirs.length)];
      const r0 = Math.floor(rng() * GRID_SIZE);
      const c0 = Math.floor(rng() * GRID_SIZE);
      const r1 = r0 + dr * (item.word.length - 1);
      const c1 = c0 + dc * (item.word.length - 1);
      if (r1 < 0 || r1 >= GRID_SIZE || c1 < 0 || c1 >= GRID_SIZE) continue;

      let free = true;
      const coords = [];
      for (let i = 0; i < item.word.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        if (grid[r][c] !== "" && grid[r][c] !== item.word[i]) {
          free = false;
          break;
        }
        coords.push(`${r},${c}`);
      }
      if (free) {
        coords.forEach((coord, idx) => {
          const [rr, cc] = coord.split(",").map(Number);
          grid[rr][cc] = item.word[idx];
        });
        placements.push({ word: item.word, coords });
        ok = true;
      }
    }
  }

  const abc = "ABCDEFGHIJLMNOPQRSTUVXZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = abc[Math.floor(rng() * abc.length)];
    }
  }
  return { grid, placements };
}

function makePlayerKey(name, cls) {
  const n = (name || "jogador").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const c = (cls || "geral").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return `p_${n}_${c}`;
}

function ensurePlayerEntry(pk, name, cls) {
  if (!activeRoomState.players) activeRoomState.players = {};
  if (!activeRoomState.players[pk]) {
    activeRoomState.players[pk] = {
      key: pk,
      name: name || "Jogador",
      cls: cls || "Geral",
      stageScore: 0,
      score: 0,
      words: [],
      mathSolved: 0,
      eliminated: false,
      penaltyUntilMs: 0
    };
  }
  const p = activeRoomState.players[pk];
  if (!p.key) p.key = pk;
  if (p.stageScore === undefined) p.stageScore = Number(p.score || 0);
  if (p.penaltyUntilMs === undefined) p.penaltyUntilMs = 0;
  return p;
}

async function enterRoomByQuickCode() {
  const nick = String(document.getElementById("quickCodeName")?.value || "").trim();
  const cls = String(document.getElementById("quickCodeClass")?.value || "Geral").trim() || "Geral";
  const pin = String(document.getElementById("quickCodePin")?.value || "").trim().toUpperCase();

  if (!nick) return toast("Digite seu nome para entrar na sala.");
  if (!/^[A-Z0-9]{4}$/.test(pin)) return toast("Digite o código PIN de 4 caracteres da sala.");

  let roomRow = null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(pin)}&select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=1`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows[0]) roomRow = rows[0];
    }
  } catch (e) {}

  if (!roomRow || !roomRow.state?.grid) {
    return toast(`Sala ${pin} não encontrada. Verifique o PIN com o professor.`);
  }
  if (roomRow.admin_deleted || roomRow.state.adminDeleted) {
    return toast(`Sala ${pin} removida pela administração.`);
  }
  if (roomRow.deleted_at) {
    return toast(`Sala ${pin} está na lixeira no momento.`);
  }
  if (roomRow.closed || roomRow.state.closed || roomRow.admin_locked || roomRow.state.adminLocked) {
    return toast(`A sala ${pin} está fechada ou bloqueada no momento.`);
  }

  activeRoomPin = pin;
  activeRoomState = roomRow.state;
  activeRoomMeta = roomRow;
  activePlayerNick = nick;
  activePlayerClass = cls;
  lastProcessedEventId = 0;

  const pKey = makePlayerKey(nick, cls);
  ensurePlayerEntry(pKey, nick, cls);

  document.getElementById("activeArenaSection")?.classList.remove("hidden");
  document.getElementById("btnLeaveActiveRoom")?.classList.remove("hidden");
  document.getElementById("arenaPlayerTitle").textContent = nick;
  document.getElementById("arenaRoomSub").textContent = `(${cls}) • Sala ${pin}`;

  renderArenaBoard(true);
  startTwoMinMathLoop();
  await fetchRecentEventsAndSubscribe(pin, pKey, nick, cls);
  toast(`Entrou na sala ${pin}!`);
}

function syncSalas24hView() {
  const gate = document.getElementById("salas24hAuthGate");
  const lobby = document.getElementById("salas24hLobbyBox");
  if (!authSession) {
    gate?.classList.remove("hidden");
    lobby?.classList.add("hidden");
    return;
  }
  gate?.classList.add("hidden");
  lobby?.classList.remove("hidden");
  const label = currentProfile?.full_name || currentProfile?.email || authSession.user?.email || "Usuário";
  document.getElementById("salas24hLoggedUser").textContent = label;
  const nickInput = document.getElementById("playerNick24h");
  if (nickInput && !nickInput.value) {
    nickInput.value = (currentProfile?.full_name || (currentProfile?.email || "").split("@")[0] || "Jogador").slice(0, 22);
  }
  render24hRoomCards();
}

async function loginFromSalas24h(isSignup) {
  const email = String(document.getElementById("salas24hEmail")?.value || "").trim().toLowerCase();
  const password = String(document.getElementById("salas24hPassword")?.value || "");
  if (!email || password.length < 6) return toast("Informe e-mail e senha (mínimo 6 caracteres).");
  const endpoint = isSignup ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password";
  const res = await fetch(`${SUPABASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) return toast(data.msg || data.error_description || "Falha na autenticação.");
  authSession = { access_token: data.access_token, user: data.user };
  localStorage.setItem("csi_teacher_auth", JSON.stringify(authSession));
  await loadSessionAndProfile();
  await loadPlatformState();
  toast("Conta conectada! Agora você já pode entrar nas salas 24h.");
  syncSalas24hView();
}

function render24hRoomCards() {
  const grid = document.getElementById("rooms24hCardsGrid");
  if (!grid) return;
  grid.innerHTML = DEFAULT_24H_ROOMS.map(rm => `
    <div class="room-24h-card">
      <div>
        <div style="font-size:0.76rem; color:var(--success); font-weight:800;">● ONLINE 24H • ATÉ 40–80 JOGADORES</div>
        <div style="font-size:1.15rem; font-weight:900; color:var(--gold); margin-top:4px;">${rm.pin} — ${rm.label}</div>
        <div style="font-size:0.84rem; color:#cbd5e1; margin-top:4px;">Conto: ${STORIES[rm.storyIdx].title}</div>
      </div>
      <button type="button" class="btn-primary btn-sm" onclick="enterRoom24h('${rm.pin}', '${rm.label.replace(/'/g, "\\'")}', ${rm.storyIdx})">Entrar na Sala</button>
    </div>
  `).join("");
}

function joinRoom24hByCustomPin() {
  const pin = String(document.getElementById("customPinJoin24h")?.value || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{4}$/.test(pin)) return toast("Digite um PIN válido de 4 caracteres.");
  enterRoom24h(pin, `Sala ${pin}`, 0);
}

async function enterRoom24h(pin, label, storyIdx = 0) {
  if (!authSession) return toast("Faça login para entrar na sala 24h.");
  const nick = String(document.getElementById("playerNick24h")?.value || currentProfile?.full_name || "Jogador").trim();
  const cls = String(document.getElementById("playerClass24h")?.value || "Geral").trim() || "Geral";
  if (!nick) return toast("Digite seu nome para jogar.");

  activeRoomPin = pin;
  activePlayerNick = nick;
  activePlayerClass = cls;
  lastProcessedEventId = 0;

  let roomState = null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(pin)}&select=pin,state,admin_deleted,admin_locked&limit=1`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows[0]) {
        activeRoomMeta = rows[0];
        if (rows[0].admin_deleted || rows[0].state?.adminDeleted) {
          return toast(`Sala ${pin} bloqueada pela administração.`);
        }
        if (rows[0].state?.grid) roomState = rows[0].state;
      }
    }
  } catch (e) {}

  if (!roomState || roomState.closed) {
    const story = STORIES[storyIdx % STORIES.length];
    const built = buildWordSearchMatrix(`24h_${pin}`, story.words);
    roomState = {
      pin,
      roomLabel: label,
      is24h: true,
      started: true,
      closed: false,
      stage: 1,
      storyIdx: storyIdx % STORIES.length,
      grid: built.grid,
      wordPlacements: built.placements,
      claimedWords: {},
      players: {}
    };
    await fetch(`${SUPABASE_URL}/rest/v1/salas`, {
      method: "POST",
      headers: { ...getHeaders(true), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify({ pin, state: roomState, updated_at: new Date().toISOString() })
    }).catch(() => {});
  }

  activeRoomState = roomState;
  const pKey = makePlayerKey(nick, cls);
  ensurePlayerEntry(pKey, nick, cls);

  document.getElementById("activeArenaSection")?.classList.remove("hidden");
  document.getElementById("btnLeaveActiveRoom")?.classList.remove("hidden");
  document.getElementById("arenaPlayerTitle").textContent = nick;
  document.getElementById("arenaRoomSub").textContent = `(${cls}) • Sala ${pin}`;

  renderArenaBoard(true);
  startTwoMinMathLoop();
  await fetchRecentEventsAndSubscribe(pin, pKey, nick, cls);
}

function applyEventToLocalRoom(ev) {
  if (!activeRoomState || !ev) return;
  if (ev.id && ev.id <= lastProcessedEventId) return;
  if (ev.id) lastProcessedEventId = ev.id;

  if (!activeRoomState.players) activeRoomState.players = {};
  if (!activeRoomState.claimedWords) activeRoomState.claimedWords = {};

  const pk = ev.player_key || makePlayerKey(ev.player_name, ev.player_class);
  if (pk && !String(pk).startsWith("admin_")) {
    const pl = ensurePlayerEntry(pk, ev.player_name, ev.player_class);

    if (ev.event_type === "CLAIM_WORD" && ev.word) {
      if (!pl.eliminated && !activeRoomState.claimedWords[ev.word]) {
        const pts = Number(ev.points || 100);
        activeRoomState.claimedWords[ev.word] = { by: pl.name, points: pts };
        pl.score = Number(pl.score || 0) + pts;
        pl.stageScore = Number(pl.stageScore || 0) + pts;
        if (!Array.isArray(pl.words)) pl.words = [];
        if (!pl.words.includes(ev.word)) pl.words.push(ev.word);
      }
    } else if (ev.event_type === "MATH_SOLVED") {
      if (!pl.eliminated) {
        const pts = Number(ev.points || 60);
        pl.score = Number(pl.score || 0) + pts;
        pl.stageScore = Number(pl.stageScore || 0) + pts;
        pl.mathSolved = Number(pl.mathSolved || 0) + 1;
      }
    }
  }

  if (ev.event_type === "ADMIN_BONUS_POINTS") {
    const targetKey = ev.target_player_key || pk;
    const targetPlayer = activeRoomState.players[targetKey];
    if (targetPlayer) {
      const addPts = Number(ev.bonus_points ?? ev.points ?? 50);
      targetPlayer.score = Number(targetPlayer.score || 0) + addPts;
      targetPlayer.stageScore = Number(targetPlayer.stageScore || 0) + addPts;
    }
  } else if (ev.event_type === "ADMIN_REVIVE_PLAYER") {
    const targetKey = ev.target_player_key || pk;
    if (activeRoomState.players[targetKey]) {
      activeRoomState.players[targetKey].eliminated = false;
      activeRoomState.players[targetKey].penaltyUntilMs = 0;
    }
  } else if (ev.event_type === "ADMIN_ELIMINATE_PLAYER") {
    const targetKey = ev.target_player_key || pk;
    if (activeRoomState.players[targetKey]) {
      const penaltyMs = Number(ev.bonus_points || PENALTY_DEFAULT_MS);
      activeRoomState.players[targetKey].eliminated = true;
      activeRoomState.players[targetKey].penaltyUntilMs = Date.now() + penaltyMs;
    }
  } else if (ev.event_type === "ADMIN_END_MATCH") {
    activeRoomState.started = false;
    activeRoomState.ended = true;
  } else if (ev.event_type === "ADMIN_NEW_MATCH") {
    activeRoomState.started = true;
    activeRoomState.ended = false;
    activeRoomState.closed = false;
    activeRoomState.stage = 1;
    activeRoomState.claimedWords = {};
    Object.values(activeRoomState.players).forEach(p => {
      p.score = 0;
      p.stageScore = 0;
      p.words = [];
      p.mathSolved = 0;
      p.eliminated = false;
      p.penaltyUntilMs = 0;
    });
  } else if (ev.event_type === "ADMIN_TOGGLE_ROOM") {
    activeRoomState.closed = !activeRoomState.closed;
  }
}

function scheduleArenaUiUpdate() {
  if (uiRenderDebounce) clearTimeout(uiRenderDebounce);
  uiRenderDebounce = setTimeout(() => {
    uiRenderDebounce = null;
    renderArenaBoard(false);
    renderTeacherConsole();
    renderAdminRoomInspector();
    syncEliminationPenaltyUi();
  }, 150);
}

async function fetchRecentEventsAndSubscribe(pin, pKey, nick, cls) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/sala_eventos?room_pin=eq.${encodeURIComponent(pin)}&order=id.asc&limit=1000`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows)) rows.forEach(applyEventToLocalRoom);
    }
  } catch (e) {}

  if (pKey && nick) {
    await publishRoomEvent({
      room_pin: pin,
      stage: activeRoomState?.stage || 1,
      event_type: "JOIN",
      player_key: pKey,
      player_name: nick,
      player_class: cls,
      word: null,
      target_player_key: null,
      bonus_points: 0,
      points: 0
    });
  }

  scheduleArenaUiUpdate();

  if (eventStreamChannel && sbClient) {
    try { sbClient.removeChannel(eventStreamChannel); } catch (e) {}
  }

  if (window.supabase?.createClient) {
    sbClient = sbClient || window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    eventStreamChannel = sbClient
      .channel(`events-${pin}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "sala_eventos", filter: `room_pin=eq.${pin}` }, (payload) => {
        if (payload?.new) {
          applyEventToLocalRoom(payload.new);
          scheduleArenaUiUpdate();
        }
      })
      .subscribe();
  }
}

async function publishRoomEvent(payload) {
  const fullPayload = {
    room_pin: payload.room_pin || activeRoomPin,
    stage: payload.stage ?? (activeRoomState?.stage || 1),
    event_type: payload.event_type,
    player_key: payload.player_key || "admin_system",
    player_name: payload.player_name || "Sistema/Admin",
    player_class: payload.player_class || "Geral",
    word: payload.word ?? null,
    target_player_key: payload.target_player_key ?? null,
    bonus_points: payload.bonus_points ?? 0,
    points: payload.points ?? 0
  };
  applyEventToLocalRoom(fullPayload);
  scheduleArenaUiUpdate();
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/sala_eventos`, {
      method: "POST",
      headers: { ...getHeaders(true), "Prefer": "return=minimal" },
      body: JSON.stringify(fullPayload)
    });
  } catch (e) {}
}

function renderArenaBoard(rebuildGrid = false) {
  if (!activeRoomState) return;
  syncEliminationPenaltyUi();
  const story = STORIES[(activeRoomState.storyIdx || 0) % STORIES.length];
  document.getElementById("arenaStoryTitle").textContent = `📜 ${story.title}`;
  document.getElementById("arenaStoryBox").innerHTML = story.html;

  const me = activeRoomState.players?.[makePlayerKey(activePlayerNick, activePlayerClass)];
  document.getElementById("arenaScore").textContent = String(me?.score || 0);

  const claimed = activeRoomState.claimedWords || {};
  document.getElementById("arenaRemaining").textContent = String(Math.max(0, story.words.length - Object.keys(claimed).length));

  const wordClsMap = {};
  story.words.forEach(w => { wordClsMap[w.word] = w.cls; });

  document.querySelectorAll("#arenaStoryBox .word-tag").forEach(tag => {
    const w = tag.getAttribute("data-w");
    if (claimed[w]) {
      tag.classList.add("solved");
      tag.style.backgroundColor = CLASS_COLORS[wordClsMap[w]] || "#10b981";
    } else {
      tag.classList.remove("solved");
      tag.style.backgroundColor = "";
    }
  });

  document.getElementById("arenaWordChips").innerHTML = story.words.map(item => {
    const info = claimed[item.word];
    if (info) {
      return `<div class="chip claimed" style="background:${CLASS_COLORS[item.cls] || "#10b981"};">✅ ${item.display} (${info.by})</div>`;
    }
    return `<div class="chip">🔍 ${item.display}</div>`;
  }).join("");

  const gridEl = document.getElementById("arenaWsGrid");
  if (!gridEl) return;
  if (rebuildGrid || gridEl.children.length !== GRID_SIZE * GRID_SIZE) {
    gridEl.innerHTML = "";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.textContent = activeRoomState.grid[r][c];
        gridEl.appendChild(cell);
      }
    }
  }

  const foundCoords = {};
  (activeRoomState.wordPlacements || []).forEach(pl => {
    if (claimed[pl.word]) {
      const col = CLASS_COLORS[wordClsMap[pl.word]] || "#10b981";
      pl.coords.forEach(coord => { foundCoords[coord] = col; });
    }
  });

  for (let i = 0; i < gridEl.children.length; i++) {
    const cell = gridEl.children[i];
    const key = `${cell.dataset.r},${cell.dataset.c}`;
    if (foundCoords[key]) {
      cell.classList.add("found");
      cell.style.background = foundCoords[key];
    } else {
      cell.classList.remove("found");
      cell.style.background = "";
    }
  }
}

function resetTwoMinClock() {
  nextMathAtMs = Date.now() + MATH_INTERVAL_MS;
}

function startTwoMinMathLoop() {
  if (twoMinTimerInterval) clearInterval(twoMinTimerInterval);
  resetTwoMinClock();
  twoMinTimerInterval = setInterval(() => {
    syncEliminationPenaltyUi();
    const leftSec = Math.max(0, Math.ceil((nextMathAtMs - Date.now()) / 1000));
    const mm = String(Math.floor(leftSec / 60)).padStart(2, "0");
    const ss = String(leftSec % 60).padStart(2, "0");
    const formatted = `${mm}:${ss}`;
    const clockEl = document.getElementById("arenaMathClock");
    if (clockEl) clockEl.textContent = formatted;
    const indEl = document.getElementById("arenaMathIndicator");
    if (indEl) indEl.textContent = `⏱️ Questão em ${formatted}`;

    if (Date.now() >= nextMathAtMs) {
      resetTwoMinClock();
      if (!isCurrentPlayerEliminated()) {
        openTwoMinMathModal();
      }
    }
  }, 1000);
}

function generateMathProblem() {
  const ops = ["+", "-", "×", "÷"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let q = "";
  let ans = 0;

  if (op === "+") {
    const a = Math.floor(Math.random() * 40) + 10;
    const b = Math.floor(Math.random() * 30) + 8;
    ans = a + b;
    q = `Quanto é ${a} + ${b}?`;
  } else if (op === "-") {
    const a = Math.floor(Math.random() * 50) + 30;
    const b = Math.floor(Math.random() * 20) + 5;
    ans = a - b;
    q = `Quanto é ${a} - ${b}?`;
  } else if (op === "×") {
    const a = Math.floor(Math.random() * 8) + 3;
    const b = Math.floor(Math.random() * 8) + 3;
    ans = a * b;
    q = `Quanto é ${a} × ${b}?`;
  } else {
    const b = Math.floor(Math.random() * 6) + 3;
    const c = Math.floor(Math.random() * 8) + 3;
    ans = c;
    q = `Quanto é ${b * c} ÷ ${b}?`;
  }

  const choices = new Set([ans]);
  while (choices.size < 4) {
    const delta = (Math.floor(Math.random() * 7) + 1) * (Math.random() < 0.5 ? 1 : -1);
    const cand = ans + delta;
    if (cand > 0) choices.add(cand);
  }

  return {
    op: `MATEMÁTICA (${op})`,
    question: q,
    correct: String(ans),
    options: Array.from(choices).sort(() => Math.random() - 0.5).map(String)
  };
}

function openTwoMinMathModal() {
  if (isCurrentPlayerEliminated()) return;
  currentMathTask = generateMathProblem();
  document.getElementById("twoMinMathOp").textContent = currentMathTask.op;
  document.getElementById("twoMinMathQuestion").textContent = currentMathTask.question;
  const optsBox = document.getElementById("twoMinMathOptions");
  optsBox.innerHTML = "";
  currentMathTask.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "math-btn";
    btn.textContent = opt;
    btn.onclick = () => resolveTwoMinMath(opt);
    optsBox.appendChild(btn);
  });
  document.getElementById("twoMinMathModal")?.classList.remove("hidden");
}

async function resolveTwoMinMath(choice) {
  if (!currentMathTask) return;
  if (isCurrentPlayerEliminated()) {
    document.getElementById("twoMinMathModal")?.classList.add("hidden");
    return;
  }
  if (String(choice) === currentMathTask.correct) {
    document.getElementById("twoMinMathModal")?.classList.add("hidden");
    currentMathTask = null;
    resetTwoMinClock();
    toast("🧮 Questão de matemática resolvida! +60 pts");

    await publishRoomEvent({
      room_pin: activeRoomPin,
      stage: activeRoomState?.stage || 1,
      event_type: "MATH_SOLVED",
      player_key: makePlayerKey(activePlayerNick, activePlayerClass),
      player_name: activePlayerNick,
      player_class: activePlayerClass,
      points: 60
    });
  } else {
    toast("Resposta incorreta. Tente novamente.");
  }
}

function attachArenaPointerSelection() {
  const gridEl = document.getElementById("arenaWsGrid");
  if (!gridEl) return;

  gridEl.addEventListener("pointerdown", (e) => {
    if (isCurrentPlayerEliminated()) return;
    e.preventDefault();
    const cell = e.target.closest(".cell");
    if (!cell || !activeRoomState) return;
    isPointerDragging = true;
    dragStartCoord = { r: Number(cell.dataset.r), c: Number(cell.dataset.c) };
    highlightLine(gridEl, dragStartCoord);
  });

  gridEl.addEventListener("pointermove", (e) => {
    if (!isPointerDragging || !dragStartCoord || isCurrentPlayerEliminated()) return;
    e.preventDefault();
    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest(".cell");
    if (target) highlightLine(gridEl, { r: Number(target.dataset.r), c: Number(target.dataset.c) });
  });

  window.addEventListener("pointerup", () => {
    if (!isPointerDragging) return;
    isPointerDragging = false;
    if (!isCurrentPlayerEliminated()) {
      evaluateArenaWordSelection();
    }
    document.querySelectorAll("#arenaWsGrid .cell.selected").forEach(c => c.classList.remove("selected"));
  });
}

function highlightLine(gridEl, endCoord) {
  document.querySelectorAll("#arenaWsGrid .cell.selected").forEach(c => c.classList.remove("selected"));
  const dr = endCoord.r - dragStartCoord.r;
  const dc = endCoord.c - dragStartCoord.c;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) {
    selectedCoords = [dragStartCoord];
  } else if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
    const sr = dr === 0 ? 0 : dr / steps;
    const sc = dc === 0 ? 0 : dc / steps;
    selectedCoords = [];
    for (let i = 0; i <= steps; i++) {
      selectedCoords.push({ r: dragStartCoord.r + sr * i, c: dragStartCoord.c + sc * i });
    }
  } else {
    selectedCoords = [dragStartCoord];
  }
  selectedCoords.forEach(p => {
    gridEl.querySelector(`.cell[data-r="${p.r}"][data-c="${p.c}"]`)?.classList.add("selected");
  });
}

function evaluateArenaWordSelection() {
  if (isCurrentPlayerEliminated() || !selectedCoords.length || !activeRoomState) return;
  const wordStr = selectedCoords.map(p => activeRoomState.grid[p.r][p.c]).join("");
  const revStr = wordStr.split("").reverse().join("");
  const story = STORIES[(activeRoomState.storyIdx || 0) % STORIES.length];
  const found = story.words.find(w => w.word === wordStr || w.word === revStr);
  if (!found) return;
  if (activeRoomState.claimedWords?.[found.word]) {
    toast(`Palavra já encontrada por ${activeRoomState.claimedWords[found.word].by}.`);
    return;
  }
  openGrammarQuiz(found);
}

function openGrammarQuiz(item) {
  if (isCurrentPlayerEliminated()) return;
  activeQuizItem = item;
  quizWrongSet = new Set();
  quizTries = 0;
  document.getElementById("quizWordLabel").textContent = item.display;
  document.getElementById("quizContextBox").textContent = item.sentence;
  document.getElementById("quizFeedbackBox")?.classList.add("hidden");
  renderGrammarChoiceButtons();
  document.getElementById("grammarQuizModal")?.classList.remove("hidden");
}

function closeGrammarQuizModal() {
  document.getElementById("grammarQuizModal")?.classList.add("hidden");
  activeQuizItem = null;
}

function renderGrammarChoiceButtons() {
  const box = document.getElementById("quizClassOptions");
  if (!box) return;
  box.innerHTML = "";
  GRAMMAR_CLASSES.forEach(cls => {
    const wrong = quizWrongSet.has(cls);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "class-btn";
    btn.disabled = wrong;
    btn.innerHTML = `<span class="color-dot" style="background:${CLASS_COLORS[cls]};"></span> ${cls}`;
    btn.onclick = () => checkGrammarChoice(cls);
    box.appendChild(btn);
  });
}

async function checkGrammarChoice(cls) {
  if (!activeQuizItem) return;
  if (isCurrentPlayerEliminated()) {
    closeGrammarQuizModal();
    return;
  }
  if (cls === activeQuizItem.cls) {
    const pts = quizTries === 0 ? 100 : 70;
    const word = activeQuizItem.word;
    closeGrammarQuizModal();
    await publishRoomEvent({
      room_pin: activeRoomPin,
      stage: activeRoomState?.stage || 1,
      event_type: "CLAIM_WORD",
      player_key: makePlayerKey(activePlayerNick, activePlayerClass),
      player_name: activePlayerNick,
      player_class: activePlayerClass,
      word,
      points: pts
    });
    toast(`✅ Correto! +${pts} pts`);
  } else {
    quizTries++;
    quizWrongSet.add(cls);
    renderGrammarChoiceButtons();
    const fb = document.getElementById("quizFeedbackBox");
    if (fb) {
      fb.textContent = `Incorreto. Dica: ${activeQuizItem.hint}`;
      fb.classList.remove("hidden");
    }
    if (quizTries >= 3) closeGrammarQuizModal();
  }
}

function leaveCurrentMatchToHub() {
  if (twoMinTimerInterval) clearInterval(twoMinTimerInterval);
  activeRoomPin = "";
  activeRoomState = null;
  document.getElementById("activeArenaSection")?.classList.add("hidden");
  document.getElementById("btnLeaveActiveRoom")?.classList.add("hidden");
}

function syncTeacherGeneratorView() {
  const loginCard = document.getElementById("teacherLoginCard");
  const genBox = document.getElementById("teacherGeneratorBox");
  if (!authSession || !canAccessTeacherGenerator()) {
    loginCard?.classList.remove("hidden");
    genBox?.classList.add("hidden");
    return;
  }
  loginCard?.classList.add("hidden");
  genBox?.classList.remove("hidden");
  document.getElementById("teacherActiveName").textContent = currentProfile?.full_name || currentProfile?.email || "Professor";
}

async function loginFromTeacherRoute() {
  const email = String(document.getElementById("teacherLoginEmail")?.value || "").trim().toLowerCase();
  const password = String(document.getElementById("teacherLoginPassword")?.value || "");
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) return toast("E-mail ou senha inválidos.");
  authSession = { access_token: data.access_token, user: data.user };
  localStorage.setItem("csi_teacher_auth", JSON.stringify(authSession));
  await loadSessionAndProfile();
  await loadPlatformState();
  syncTeacherGeneratorView();
  await loadTeacherOwnRooms();
}

async function loadTeacherOwnRooms() {
  const tbody = document.getElementById("teacherOwnRoomsBody");
  if (!tbody || !authSession?.user?.id) return;

  const myId = authSession.user.id;
  const master = isAdminUser();

  try {
    const query = master
      ? `${SUPABASE_URL}/rest/v1/salas?select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=200`
      : `${SUPABASE_URL}/rest/v1/salas?owner_id=eq.${encodeURIComponent(myId)}&select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=100`;

    const res = await fetch(query, { cache: "no-store", headers: getHeaders(false) });
    const rows = res.ok ? await res.json().catch(() => []) : [];
    const list = Array.isArray(rows) ? rows : [];

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Você ainda não criou nenhuma sala. Crie uma acima (ex.: AT74).</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(r => {
      const pCount = Object.keys(r.state?.players || {}).length;
      const isMasterBlocked = !!(r.admin_deleted || r.admin_locked || r.state?.adminDeleted || r.state?.adminLocked);
      const isTrash = !!r.deleted_at && !isMasterBlocked;
      const canRestoreTrash = isTrash && isWithin30Days(r.deleted_at);

      let estadoHtml = r.state?.closed
        ? '<span class="status-pill-elim">Sala Encerrada</span>'
        : '<span class="status-pill-active">Aberta</span>';
      if (isMasterBlocked) {
        estadoHtml = '<span class="status-pill-elim">Bloqueada/Removida pelo Admin</span>';
      } else if (isTrash) {
        estadoHtml = canRestoreTrash
          ? '<span style="color:var(--gold); font-weight:800;">Na Lixeira (até 30 dias)</span>'
          : '<span class="status-pill-elim">Prazo de 30 dias expirado</span>';
      }

      let acoesHtml = "";
      if (isMasterBlocked && !master) {
        acoesHtml = `<span style="font-size:0.78rem; color:#fda4af;">Sem permissão (bloqueio do Admin)</span>`;
      } else if (isTrash) {
        acoesHtml = canRestoreTrash
          ? `<button type="button" class="btn-success btn-xs" onclick="teacherRestoreRoom('${r.pin}')">♻️ Restaurar Sala</button>`
          : `<span style="font-size:0.78rem; color:var(--text-muted);">Expirada</span>`;
      } else {
        acoesHtml = `
          <div class="mod-btn-row">
            <button type="button" class="btn-primary btn-xs" onclick="teacherOpenOwnRoom('${r.pin}')">Gerenciar Sala</button>
            <button type="button" class="btn-danger btn-xs" onclick="teacherSoftDeleteRoom('${r.pin}')">🗑️ Excluir (30d)</button>
          </div>
        `;
      }

      return `
        <tr>
          <td><strong style="color:var(--gold);">${r.pin}</strong></td>
          <td><strong>${r.state?.roomLabel || `Sala ${r.pin}`}</strong></td>
          <td>${pCount}</td>
          <td>${estadoHtml}</td>
          <td>${acoesHtml}</td>
        </tr>
      `;
    }).join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Erro ao carregar suas salas.</td></tr>`;
  }
}

async function teacherOpenOwnRoom(pin) {
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!cleanPin || !authSession?.user?.id) return;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}&select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=1`, {
      cache: "no-store",
      headers: getHeaders(false)
    });
    const rows = res.ok ? await res.json().catch(() => []) : [];
    const row = Array.isArray(rows) ? rows[0] : null;
    if (!row) return toast("Sala não encontrada.");
    if (!canTeacherManageRoom(row)) {
      return toast("Acesso negado: você só pode gerenciar suas próprias salas sem bloqueio do Admin.");
    }
    if (row.deleted_at) {
      return toast("Esta sala está na lixeira. Restaure-a primeiro para gerenciar.");
    }

    activeRoomPin = cleanPin;
    activeRoomMeta = row;
    activeRoomState = row.state;
    lastProcessedEventId = 0;

    document.getElementById("teacherLiveConsole")?.classList.remove("hidden");
    await fetchRecentEventsAndSubscribe(cleanPin, null, null, null);
    renderTeacherConsole();
  } catch (e) {
    toast("Falha ao abrir a sala.");
  }
}

async function teacherSoftDeleteRoom(pin) {
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!cleanPin || !authSession?.user?.id) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}&select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=1`, {
    cache: "no-store",
    headers: getHeaders(false)
  });
  const rows = res.ok ? await res.json().catch(() => []) : [];
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row || !canTeacherManageRoom(row)) {
    return toast("Você não pode excluir esta sala.");
  }
  if (!window.confirm(`Mover a sala ${cleanPin} para a lixeira? Você poderá restaurá-la por até 30 dias.`)) return;

  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ deleted_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  });

  if (patchRes.ok) {
    if (activeRoomPin === cleanPin) {
      activeRoomPin = "";
      activeRoomState = null;
      activeRoomMeta = null;
      document.getElementById("teacherLiveConsole")?.classList.add("hidden");
    }
    await loadTeacherOwnRooms();
    toast(`Sala ${cleanPin} movida para a lixeira (restauração disponível por 30 dias).`);
  } else {
    toast("Não foi possível excluir a sala.");
  }
}

async function teacherRestoreRoom(pin) {
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!cleanPin || !authSession?.user?.id) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}&select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=1`, {
    cache: "no-store",
    headers: getHeaders(false)
  });
  const rows = res.ok ? await res.json().catch(() => []) : [];
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row) return;
  if (row.admin_deleted || row.admin_locked || row.state?.adminDeleted || row.state?.adminLocked) {
    return toast("Sala bloqueada ou excluída pela administração. O professor não pode restaurar.");
  }
  if (!isAdminUser() && row.owner_id !== authSession.user.id) {
    return toast("Apenas o dono da sala pode restaurá-la.");
  }
  if (!isWithin30Days(row.deleted_at)) {
    return toast("O prazo de 30 dias para restauração expirou.");
  }

  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ deleted_at: null, updated_at: new Date().toISOString() })
  });

  if (patchRes.ok) {
    await loadTeacherOwnRooms();
    toast(`Sala ${cleanPin} restaurada com sucesso!`);
  } else {
    toast("Não foi possível restaurar a sala.");
  }
}

async function createManagedClassRoom() {
  if (!canAccessTeacherGenerator()) return;
  const label = String(document.getElementById("newClassLabelInput")?.value || "Turma A").trim() || "Turma A";
  let pin = String(document.getElementById("newClassCustomPinInput")?.value || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{4}$/.test(pin)) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    pin = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const story = STORIES[Math.floor(Math.random() * STORIES.length)];
  const built = buildWordSearchMatrix(`${pin}_${Date.now()}`, story.words);
  activeRoomPin = pin;
  activeRoomState = {
    pin,
    roomLabel: label,
    started: false,
    ended: false,
    closed: false,
    adminLocked: false,
    adminDeleted: false,
    stage: 1,
    storyIdx: STORIES.indexOf(story),
    grid: built.grid,
    wordPlacements: built.placements,
    claimedWords: {},
    players: {}
  };
  activeRoomMeta = {
    pin,
    owner_id: authSession.user.id,
    deleted_at: null,
    admin_locked: false,
    admin_deleted: false,
    state: activeRoomState
  };

  await fetch(`${SUPABASE_URL}/rest/v1/salas`, {
    method: "POST",
    headers: { ...getHeaders(true), "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify({
      pin,
      owner_id: authSession.user.id,
      deleted_at: null,
      admin_locked: false,
      admin_deleted: false,
      state: activeRoomState,
      updated_at: new Date().toISOString()
    })
  });

  document.getElementById("teacherLiveConsole")?.classList.remove("hidden");
  await fetchRecentEventsAndSubscribe(pin, null, null, null);
  renderTeacherConsole();
  await loadTeacherOwnRooms();
  toast(`Sala ${pin} criada!`);
}

async function assertRoomActionAllowed() {
  if (!activeRoomPin || !activeRoomState) {
    toast("Selecione ou abra uma sala primeiro.");
    return false;
  }
  if (!isAdminUser() && isMasterBlockedRoom(activeRoomMeta, activeRoomState)) {
    toast("Esta sala foi bloqueada/fechada/removida pela administração. O professor não pode alterá-la.");
    return false;
  }
  return true;
}

async function persistRoomStatePatch(patchObj) {
  if (!(await assertRoomActionAllowed())) return false;
  Object.assign(activeRoomState, patchObj);
  await fetch(`${SUPABASE_URL}/rest/v1/salas`, {
    method: "POST",
    headers: { ...getHeaders(true), "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify({
      pin: activeRoomPin,
      owner_id: activeRoomMeta?.owner_id || authSession?.user?.id || null,
      admin_locked: !!activeRoomState.adminLocked,
      admin_deleted: !!activeRoomState.adminDeleted,
      state: activeRoomState,
      updated_at: new Date().toISOString()
    })
  }).catch(() => {});
  return true;
}

async function consoleStartMatch() {
  if (!(await persistRoomStatePatch({ started: true, ended: false }))) return;
  renderTeacherConsole();
  renderAdminRoomInspector();
  await loadTeacherOwnRooms();
  toast("Partida iniciada!");
}

async function consoleEndMatch() {
  if (!(await persistRoomStatePatch({ started: false, ended: true }))) return;
  await publishRoomEvent({
    room_pin: activeRoomPin,
    event_type: "ADMIN_END_MATCH"
  });
  await loadTeacherOwnRooms();
  toast("Partida encerrada!");
}

async function consoleNewMatch() {
  if (!(await assertRoomActionAllowed())) return;
  const nextStoryIdx = ((activeRoomState.storyIdx || 0) + 1) % STORIES.length;
  const story = STORIES[nextStoryIdx];
  const built = buildWordSearchMatrix(`${activeRoomPin}_match_${Date.now()}`, story.words);
  const ok = await persistRoomStatePatch({
    started: true,
    ended: false,
    closed: false,
    stage: 1,
    storyIdx: nextStoryIdx,
    grid: built.grid,
    wordPlacements: built.placements,
    claimedWords: {},
    players: {}
  });
  if (!ok) return;
  await publishRoomEvent({
    room_pin: activeRoomPin,
    event_type: "ADMIN_NEW_MATCH"
  });
  await loadTeacherOwnRooms();
  toast("Novo torneio iniciado!");
}

async function consoleAdvanceStage() {
  if (!(await assertRoomActionAllowed())) return;
  const nextStage = (activeRoomState.stage || 1) + 1;
  const nextStoryIdx = ((activeRoomState.storyIdx || 0) + 1) % STORIES.length;
  const story = STORIES[nextStoryIdx];
  const built = buildWordSearchMatrix(`${activeRoomPin}_s${nextStage}_${Date.now()}`, story.words);
  Object.values(activeRoomState.players || {}).forEach(p => { p.stageScore = 0; });
  const ok = await persistRoomStatePatch({
    started: true,
    ended: false,
    stage: nextStage,
    storyIdx: nextStoryIdx,
    claimedWords: {},
    grid: built.grid,
    wordPlacements: built.placements
  });
  if (!ok) return;
  renderTeacherConsole();
  renderAdminRoomInspector();
  await loadTeacherOwnRooms();
  toast(`Fase ${nextStage} iniciada e classificada!`);
}

async function consoleToggleClose() {
  if (!(await assertRoomActionAllowed())) return;
  const nextClosed = !activeRoomState.closed;
  const masterLock = isAdminUser() ? nextClosed : !!activeRoomState.adminLocked;
  const ok = await persistRoomStatePatch({ closed: nextClosed, adminLocked: masterLock });
  if (!ok) return;
  await publishRoomEvent({
    room_pin: activeRoomPin,
    event_type: "ADMIN_TOGGLE_ROOM"
  });
  await loadTeacherOwnRooms();
  toast(nextClosed ? "Sala encerrada!" : "Sala reaberta!");
}

async function adminToggleLockRoom(pin) {
  if (!isAdminUser()) return toast("Apenas Master Admin pode trancar/bloquear salas.");
  const cleanPin = String(pin || activeRoomPin || "").trim().toUpperCase();
  if (!cleanPin) return;
  if (activeRoomPin !== cleanPin) {
    await inspectRoomInConsole(cleanPin);
  }
  if (!activeRoomState) return;
  const nextLock = !activeRoomState.adminLocked;
  activeRoomState.adminLocked = nextLock;
  activeRoomState.closed = nextLock ? true : activeRoomState.closed;
  await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({
      admin_locked: nextLock,
      state: activeRoomState,
      updated_at: new Date().toISOString()
    })
  });
  await refreshControlPanel();
  renderAdminRoomInspector();
  toast(nextLock
    ? `Sala ${cleanPin} trancada/bloqueada para o professor.`
    : `Bloqueio master da sala ${cleanPin} removido.`);
}

async function adminSoftDeleteRoomMaster(pin) {
  if (!isAdminUser()) return toast("Apenas Master Admin pode excluir salas com bloqueio total.");
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!cleanPin) return;
  if (!window.confirm(`Excluir a sala ${cleanPin} como Master Admin? O professor não poderá mais mexer nem restaurar.`)) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({
      admin_deleted: true,
      admin_locked: true,
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
  });

  if (res.ok) {
    await refreshControlPanel();
    toast(`Sala ${cleanPin} excluída e bloqueada para o professor.`);
  }
}

async function adminAwardPointsToPlayer(playerKey, bonusPts = 50) {
  if (!(await assertRoomActionAllowed())) return;
  const pl = activeRoomState.players?.[playerKey];
  if (!pl) return;
  await publishRoomEvent({
    room_pin: activeRoomPin,
    event_type: "ADMIN_BONUS_POINTS",
    player_key: playerKey,
    target_player_key: playerKey,
    player_name: pl.name,
    player_class: pl.cls || "Geral",
    bonus_points: bonusPts,
    points: bonusPts
  });
  toast(`+${bonusPts} pts para ${pl.name}!`);
}

async function adminRevivePlayer(playerKey) {
  if (!(await assertRoomActionAllowed())) return;
  const pl = activeRoomState.players?.[playerKey];
  if (!pl) return;
  await publishRoomEvent({
    room_pin: activeRoomPin,
    event_type: "ADMIN_REVIVE_PLAYER",
    player_key: playerKey,
    target_player_key: playerKey,
    player_name: pl.name,
    player_class: pl.cls || "Geral"
  });
  toast(`${pl.name} recolocado na disputa!`);
}

async function adminEliminatePlayer(playerKey, penaltyMinutes = 1) {
  if (!(await assertRoomActionAllowed())) return;
  const pl = activeRoomState.players?.[playerKey];
  if (!pl) return;
  const penaltyMs = Math.max(1, Number(penaltyMinutes || 1)) * 60000;
  await publishRoomEvent({
    room_pin: activeRoomPin,
    event_type: "ADMIN_ELIMINATE_PLAYER",
    player_key: playerKey,
    target_player_key: playerKey,
    player_name: pl.name,
    player_class: pl.cls || "Geral",
    bonus_points: penaltyMs
  });
  toast(`${pl.name} eliminado por ${penaltyMinutes} min de castigo.`);
}

function exportRoomCsv() {
  if (!activeRoomState) return toast("Selecione uma sala primeiro.");
  const entries = Object.values(activeRoomState.players || {}).sort((a, b) => (b.score || 0) - (a.score || 0));
  const lines = ["Posicao,Investigador,Turma,Status,PontosFase,PontosTotal,Palavras,Matematica"];
  entries.forEach((p, idx) => {
    lines.push([
      idx + 1,
      `"${String(p.name || "").replace(/"/g, '""')}"`,
      `"${String(p.cls || "Geral").replace(/"/g, '""')}"`,
      p.eliminated ? "Eliminado" : "Na Disputa",
      p.stageScore ?? p.score ?? 0,
      p.score || 0,
      Array.isArray(p.words) ? p.words.length : 0,
      p.mathSolved || 0
    ].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `torneio_${activeRoomState.pin || "sala"}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast("CSV exportado!");
}

function buildPodiumCardsHtml(entries) {
  const medals = ["🥇", "🥈", "🥉"];
  return [0, 1, 2].map(idx => {
    const p = entries[idx];
    return `
      <div class="podium-card-item rank-${idx + 1}">
        <div class="podium-medal-icon">${medals[idx]}</div>
        <div class="podium-name-txt">${p ? p.name : "---"}</div>
        <div class="podium-pts-txt">${p ? `${p.score || 0} pts` : "0 pts"}</div>
      </div>
    `;
  }).join("");
}

function buildModerationRowsHtml(entries) {
  return entries.slice(0, 80).map((p, idx) => {
    const inPenalty = !!(p.eliminated && p.penaltyUntilMs && Date.now() < p.penaltyUntilMs);
    const leftSec = inPenalty ? Math.ceil((p.penaltyUntilMs - Date.now()) / 1000) : 0;
    const statusLabel = p.eliminated
      ? (inPenalty ? `<span class="status-pill-elim">Castigo (${leftSec}s)</span>` : '<span class="status-pill-elim">Eliminado</span>')
      : '<span class="status-pill-active">Na Disputa</span>';

    return `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td>
          <strong>${p.name}</strong>
          <div style="font-size:0.74rem; color:var(--text-muted);">(${p.cls || "Geral"})</div>
        </td>
        <td>${statusLabel}</td>
        <td>${p.stageScore ?? p.score ?? 0}</td>
        <td style="color:var(--gold); font-weight:900;">${p.score || 0}</td>
        <td>${Array.isArray(p.words) ? p.words.length : 0}</td>
        <td>${p.mathSolved || 0}</td>
        <td>
          <div class="mod-btn-group">
            <div class="mod-btn-row">
              <button type="button" class="btn-gold btn-xs" onclick="adminAwardPointsToPlayer('${p.key}', 50)">+50 pts</button>
              <button type="button" class="btn-success btn-xs" onclick="adminRevivePlayer('${p.key}')">Recolocar</button>
            </div>
            <div class="mod-btn-row">
              <button type="button" class="btn-danger btn-xs" onclick="adminEliminatePlayer('${p.key}', 1)">Eliminar 1m</button>
              <button type="button" class="btn-danger btn-xs" onclick="adminEliminatePlayer('${p.key}', 2)">Eliminar 2m</button>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function renderTeacherConsole() {
  if (!activeRoomState) return;
  const story = STORIES[(activeRoomState.storyIdx || 0) % STORIES.length];
  const stageNum = activeRoomState.stage || 1;
  const claimed = activeRoomState.claimedWords || {};
  const lockedByAdmin = !isAdminUser() && isMasterBlockedRoom(activeRoomMeta, activeRoomState);

  document.getElementById("consolePinDisplay").textContent = activeRoomState.pin;
  document.getElementById("consoleRoomName").textContent = activeRoomState.roomLabel || `Sala ${activeRoomState.pin}`;
  document.getElementById("consoleRoomPhaseTitle").textContent = lockedByAdmin
    ? "Bloqueada/Fechada pela Administração"
    : `Fase ${stageNum} • "${story.title}"`;

  const entries = Object.entries(activeRoomState.players || {})
    .map(([k, v]) => ({ key: k, ...v }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const activeCount = entries.filter(p => !p.eliminated).length;
  document.getElementById("consolePlayersCount").textContent = `${activeCount} ativos / ${entries.length} total`;

  const btnClose = document.getElementById("btnConsoleToggleRoom");
  if (btnClose) btnClose.textContent = activeRoomState.closed ? "🔓 Reabrir Sala" : "🔒 Encerrar Sala";

  ["btnConsoleStartMatch", "btnConsoleEndMatch", "btnConsoleStartOrNext", "btnConsoleToggleRoom", "btnConsoleNewMatch"].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.disabled = lockedByAdmin;
  });

  const podiumEl = document.getElementById("consolePodiumGrid");
  if (podiumEl) podiumEl.innerHTML = buildPodiumCardsHtml(entries);

  const tbody = document.getElementById("consoleScoreTableBody");
  if (tbody) {
    tbody.innerHTML = entries.length
      ? buildModerationRowsHtml(entries)
      : `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">Nenhum jogador na sala ainda.</td></tr>`;
  }

  const evTitle = document.getElementById("consoleEvidenceTitle");
  if (evTitle) evTitle.textContent = `📋 Evidências da Fase ( ${Object.keys(claimed).length}/${story.words.length} )`;

  const evChips = document.getElementById("consoleEvidenceChips");
  if (evChips) {
    evChips.innerHTML = story.words.map(w => {
      const done = claimed[w.word];
      if (done) {
        return `<span class="evidence-chip-btn found-chip" style="background:${CLASS_COLORS[w.cls] || "#38bdf8"};">✅ ${w.display}</span>`;
      }
      return `<span class="evidence-chip-btn">🔍 ${w.display}</span>`;
    }).join("");
  }

  const legendEl = document.getElementById("consoleGrammarLegend");
  if (legendEl) {
    legendEl.innerHTML = GRAMMAR_CLASSES.map(cls =>
      `<span class="legend-pill-tag" style="background:${CLASS_COLORS[cls]};">${cls}</span>`
    ).join("");
  }
}

async function inspectRoomInConsole(pin) {
  if (!canAccessControlPanel()) {
    return toast("Acesso restrito a administradores e moderadores.");
  }
  const cleanPin = String(pin || "").trim().toUpperCase();
  if (!cleanPin) return toast("Informe um PIN válido.");

  activeRoomPin = cleanPin;
  lastProcessedEventId = 0;

  const inspectorBox = document.getElementById("adminRoomInspector");
  if (inspectorBox) inspectorBox.classList.remove("hidden");
  document.getElementById("inspRoomPin").textContent = cleanPin;
  document.getElementById("inspRoomTitle").textContent = `Sala ${cleanPin}`;
  document.getElementById("inspRoomMeta").textContent = "Carregando participantes e eventos...";
  document.getElementById("inspPlayersBody").innerHTML =
    `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">Carregando jogadores da sala ${cleanPin}...</td></tr>`;

  let roomRow = null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(cleanPin)}&select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=1`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows[0]) roomRow = rows[0];
    }
  } catch (e) {}

  activeRoomMeta = roomRow;
  let roomState = roomRow?.state && Array.isArray(roomRow.state.grid) ? roomRow.state : null;

  if (!roomState) {
    const built = buildWordSearchMatrix(`inspect_${cleanPin}`, STORIES[0].words);
    roomState = {
      pin: cleanPin,
      roomLabel: roomRow?.state?.roomLabel || `Sala ${cleanPin}`,
      started: true,
      ended: false,
      closed: !!roomRow?.state?.closed,
      adminLocked: !!roomRow?.admin_locked,
      adminDeleted: !!roomRow?.admin_deleted,
      stage: roomRow?.state?.stage || 1,
      storyIdx: roomRow?.state?.storyIdx || 0,
      grid: built.grid,
      wordPlacements: built.placements,
      claimedWords: roomRow?.state?.claimedWords || {},
      players: roomRow?.state?.players || {}
    };
  }

  activeRoomState = roomState;
  await fetchRecentEventsAndSubscribe(cleanPin, null, null, null);
  renderAdminRoomInspector();
  inspectorBox?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderAdminRoomInspector() {
  const box = document.getElementById("adminRoomInspector");
  if (!box || box.classList.contains("hidden")) return;

  if (!activeRoomState || !activeRoomPin) {
    document.getElementById("inspRoomPin").textContent = "----";
    document.getElementById("inspRoomTitle").textContent = "Sala";
    document.getElementById("inspRoomMeta").textContent = "---";
    document.getElementById("inspPlayersBody").innerHTML =
      `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">Selecione uma sala acima.</td></tr>`;
    return;
  }

  const story = STORIES[(activeRoomState.storyIdx || 0) % STORIES.length];
  document.getElementById("inspRoomPin").textContent = activeRoomState.pin || activeRoomPin;
  document.getElementById("inspRoomTitle").textContent = activeRoomState.roomLabel || `Sala ${activeRoomPin}`;

  const entries = Object.entries(activeRoomState.players || {})
    .map(([k, v]) => ({ key: k, ...v }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const activeCount = entries.filter(p => !p.eliminated).length;
  const lockFlag = isMasterBlockedRoom(activeRoomMeta, activeRoomState) ? " • BLOQUEADA/REMOVIDA PELO ADMIN" : "";
  document.getElementById("inspRoomMeta").textContent =
    `Fase ${activeRoomState.stage || 1} • "${story.title}" • ${activeCount} ativos / ${entries.length} total • ${activeRoomState.closed ? "Fechada" : "Aberta"}${lockFlag}`;

  const podium = document.getElementById("inspPodiumGrid");
  if (podium) podium.innerHTML = buildPodiumCardsHtml(entries);

  const tbody = document.getElementById("inspPlayersBody");
  if (tbody) {
    tbody.innerHTML = entries.length
      ? buildModerationRowsHtml(entries)
      : `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">Nenhum jogador encontrado nesta sala.</td></tr>`;
  }
}

async function controlRemoveModerator(email) {
  if (!isAdminUser()) return toast("Apenas Master Admin pode remover moderadores.");
  const targetEmail = String(email || "").trim().toLowerCase();
  if (!targetEmail) return;
  if (!window.confirm(`Remover ${targetEmail} da lista de moderadores?`)) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/moderators?email=eq.${encodeURIComponent(targetEmail)}`, {
    method: "DELETE",
    headers: getHeaders(false)
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    return toast(`Não foi possível remover moderador: ${errTxt || res.status}`);
  }

  moderatorsEmails = moderatorsEmails.filter(em => em !== targetEmail);
  await loadPlatformState();
  await refreshControlPanel();
  toast(`${targetEmail} removido dos moderadores.`);
}

async function controlChangeUserRole(userId, email, nextRole) {
  if (!isAdminUser()) return toast("Apenas Master Admin pode alterar cargos.");
  if (!userId || !nextRole) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ role: nextRole })
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    return toast(`Erro ao alterar cargo: ${errTxt || res.status}`);
  }

  if (nextRole !== "moderator" && email) {
    await fetch(`${SUPABASE_URL}/rest/v1/moderators?email=eq.${encodeURIComponent(String(email).toLowerCase())}`, {
      method: "DELETE",
      headers: getHeaders(false)
    }).catch(() => {});
  }

  await loadPlatformState();
  await refreshControlPanel();
  toast(`Cargo de ${email || userId} alterado para ${nextRole}.`);
}

async function refreshControlPanel() {
  if (!canAccessControlPanel()) return;
  document.getElementById("controlOperatorEmail").textContent = currentProfile?.email || authSession?.user?.email || "---";
  document.getElementById("controlRoleBadge").textContent = isAdminUser() ? "MASTER ADMIN" : "MODERADOR";

  const isMaster = isAdminUser();
  document.getElementById("btnControlNukeAll")?.classList.toggle("hidden", !isMaster);
  document.getElementById("btnCtrlClearRanking")?.classList.toggle("hidden", !isMaster);
  if (document.getElementById("btnCtrlAddMod")) document.getElementById("btnCtrlAddMod").disabled = !isMaster;
  if (document.getElementById("btnCtrlToggleBot")) document.getElementById("btnCtrlToggleBot").disabled = !isMaster;

  document.getElementById("ctrlKpiMods").textContent = String(moderatorsEmails.length);
  document.getElementById("ctrlKpiBots").textContent = botTestAllowed ? "LIBERADO" : "BLOQUEADO";
  document.getElementById("ctrlBotDesc").textContent = botTestAllowed ? "Liberado" : "Bloqueado";

  document.getElementById("ctrlModsTags").innerHTML = moderatorsEmails.length
    ? moderatorsEmails.map(em => `
        <span class="mod-chip">
          👮 ${em}
          ${isMaster ? `<button type="button" class="btn-danger btn-xs" style="margin-left:6px;" onclick="controlRemoveModerator('${em.replace(/'/g, "\\'")}')">Remover</button>` : ""}
        </span>
      `).join("")
    : `<span style="font-size:0.8rem; color:var(--text-muted);">Nenhum moderador cadastrado.</span>`;

  const profilesById = new Map();
  try {
    const uRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&limit=200`, { cache: "no-store", headers: getHeaders(false) });
    const users = uRes.ok ? await uRes.json().catch(() => []) : [];
    const listUsers = Array.isArray(users) ? users : [];
    listUsers.forEach(u => { if (u.id) profilesById.set(u.id, u.full_name || u.email || "Professor"); });
    document.getElementById("ctrlKpiUsers").textContent = String(listUsers.length);
    document.getElementById("ctrlUsersBody").innerHTML = listUsers.map(u => {
      const safeEmail = String(u.email || "").replace(/'/g, "\\'");
      const curRole = u.role || "teacher";
      return `
        <tr>
          <td><strong>${u.full_name || "Usuário"}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${u.email || ""}</div></td>
          <td>
            ${isMaster ? `
              <select onchange="controlChangeUserRole('${u.id}', '${safeEmail}', this.value)" style="padding:4px 8px; border-radius:6px; background:#0b1c3d; color:#f8fafc; border:1px solid rgba(148,163,184,0.35);">
                <option value="student" ${curRole === "student" ? "selected" : ""}>student</option>
                <option value="teacher" ${curRole === "teacher" ? "selected" : ""}>teacher</option>
                <option value="moderator" ${curRole === "moderator" ? "selected" : ""}>moderator</option>
                <option value="admin" ${curRole === "admin" ? "selected" : ""}>admin</option>
              </select>
            ` : `<span>${curRole}</span>`}
          </td>
          <td>${u.subscription_status || "trial"}</td>
          <td><button type="button" class="btn-ghost btn-xs" onclick="prefillResetPassword('${safeEmail}')">🔑 Senha</button></td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="4" style="text-align:center;">Sem contas visíveis.</td></tr>`;
  } catch (e) {}

  try {
    const roomMap = new Map();
    DEFAULT_24H_ROOMS.forEach(rm => {
      roomMap.set(rm.pin, {
        pin: rm.pin,
        label: `${rm.label} (24h)`,
        mode: "24h",
        closed: false,
        locked: false,
        deleted: false,
        playersCount: 0
      });
    });

    const rRes = await fetch(`${SUPABASE_URL}/rest/v1/salas?select=pin,owner_id,state,deleted_at,admin_locked,admin_deleted&limit=200`, { cache: "no-store", headers: { "apikey": SUPABASE_KEY } });
    const rooms = rRes.ok ? await rRes.json().catch(() => []) : [];
    if (Array.isArray(rooms)) {
      rooms.forEach(r => {
        const ownerName = r.owner_id && profilesById.get(r.owner_id) ? ` • ${profilesById.get(r.owner_id)}` : "";
        const pCount = Object.keys(r.state?.players || {}).length;
        roomMap.set(r.pin, {
          pin: r.pin,
          label: `${r.state?.roomLabel || `Sala ${r.pin}`}${ownerName}`,
          mode: r.state?.is24h ? "24h" : "Turma",
          closed: !!r.state?.closed,
          locked: !!(r.admin_locked || r.state?.adminLocked),
          deleted: !!(r.admin_deleted || r.state?.adminDeleted),
          trashed: !!r.deleted_at,
          playersCount: pCount
        });
      });
    }

    const evRes = await fetch(`${SUPABASE_URL}/rest/v1/sala_eventos?select=room_pin,player_key&limit=1000`, { cache: "no-store", headers: { "apikey": SUPABASE_KEY } });
    const evRows = evRes.ok ? await evRes.json().catch(() => []) : [];
    if (Array.isArray(evRows)) {
      const playersByPin = new Map();
      evRows.forEach(ev => {
        if (!ev.room_pin) return;
        if (!playersByPin.has(ev.room_pin)) playersByPin.set(ev.room_pin, new Set());
        if (ev.player_key && !String(ev.player_key).startsWith("admin_")) {
          playersByPin.get(ev.room_pin).add(ev.player_key);
        }
      });
      playersByPin.forEach((setKeys, pin) => {
        if (!roomMap.has(pin)) {
          roomMap.set(pin, {
            pin,
            label: `Sala / Teste ${pin}`,
            mode: "Eventos",
            closed: false,
            locked: false,
            deleted: false,
            playersCount: setKeys.size
          });
        } else {
          const item = roomMap.get(pin);
          item.playersCount = Math.max(item.playersCount, setKeys.size);
        }
      });
    }

    const allRooms = Array.from(roomMap.values());
    document.getElementById("ctrlKpiRooms").textContent = String(allRooms.length);
    document.getElementById("ctrlRoomsBody").innerHTML = allRooms.map(r => {
      const statusText = r.deleted
        ? "Removida (Admin)"
        : (r.locked ? "Trancada (Admin)" : (r.trashed ? "Lixeira (30d)" : (r.closed ? "Fechada" : "Aberta")));
      return `
        <tr>
          <td><strong style="color:var(--gold);">${r.pin}</strong></td>
          <td>${r.label}</td>
          <td>${r.mode}</td>
          <td><strong>${r.playersCount}</strong></td>
          <td>${statusText}</td>
          <td>
            <div class="mod-btn-row">
              <button type="button" class="btn-primary btn-xs" onclick="inspectRoomInConsole('${r.pin}')">👁️ Abrir Sala</button>
              ${isMaster ? `
                <button type="button" class="btn-gold btn-xs" onclick="adminToggleLockRoom('${r.pin}')">${r.locked ? "🔓 Destrancar" : "🔐 Trancar"}</button>
                <button type="button" class="btn-danger btn-xs" onclick="adminSoftDeleteRoomMaster('${r.pin}')">Excluir (Master)</button>
              ` : ""}
            </div>
          </td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="6" style="text-align:center;">Nenhuma sala.</td></tr>`;
  } catch (e) {}
}

function prefillResetPassword(email) {
  const input = document.getElementById("ctrlResetEmailInput");
  if (input) {
    input.value = email;
    controlSendPasswordReset();
  }
}

async function controlSendPasswordReset() {
  const email = String(document.getElementById("ctrlResetEmailInput")?.value || "").trim().toLowerCase();
  if (!email) return toast("Informe o e-mail.");
  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, redirect_to: `${window.location.origin}/conta.html` })
  });
  toast(res.ok ? `Link de redefinição enviado para ${email}.` : "Não foi possível enviar o link.");
}

async function controlAddModerator() {
  if (!isAdminUser()) return;
  const email = String(document.getElementById("ctrlNewModInput")?.value || "").trim().toLowerCase();
  if (!email.includes("@")) return toast("E-mail inválido.");
  await fetch(`${SUPABASE_URL}/rest/v1/moderators`, {
    method: "POST",
    headers: { ...getHeaders(true), "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify({ email, added_by: authSession.user.id })
  }).catch(() => {});
  if (!moderatorsEmails.includes(email)) moderatorsEmails.push(email);
  document.getElementById("ctrlNewModInput").value = "";
  await refreshControlPanel();
  toast(`Moderador ${email} autorizado.`);
}

async function controlToggleBotFlag() {
  if (!isAdminUser()) return;
  const next = !botTestAllowed;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ bot_test_enabled: next, updated_at: new Date().toISOString() })
  });
  if (res.ok) {
    botTestAllowed = next;
    await refreshControlPanel();
  }
}

async function controlDeleteRoom(pin) {
  if (!isAdminUser()) return;
  await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(pin)}`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});
  await refreshControlPanel();
  toast(`Sala ${pin} excluída.`);
}

async function controlClearRankingOnly() {
  if (!isAdminUser()) return;
  await fetch(`${SUPABASE_URL}/rest/v1/global_leaderboard?pontos_totais=gte.0`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});
  toast("Ranking global limpo.");
}

async function controlCloseAllRoomsAndClearRanking() {
  if (!isAdminUser()) return;
  if (!window.confirm("Excluir todas as salas e limpar o ranking global?")) return;
  await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=not.is.null`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});
  await controlClearRankingOnly();
  await refreshControlPanel();
}

async function loadGlobalRankingTable() {
  const tbody = document.getElementById("homeRankingBody");
  if (!tbody) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/global_leaderboard?select=*&order=pontos_totais.desc&limit=10`, {
      cache: "no-store",
      headers: { "apikey": SUPABASE_KEY }
    });
    const rows = res.ok ? await res.json().catch(() => []) : [];
    if (!Array.isArray(rows) || !rows.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Nenhuma pontuação registrada ainda.</td></tr>`;
      return;
    }
    tbody.innerHTML = rows.map((r, i) => `
      <tr>
        <td><strong>#${i + 1}</strong></td>
        <td><strong>${r.nome}</strong></td>
        <td>${r.turma || "Geral"}</td>
        <td style="color:var(--gold); font-weight:900;">${r.pontos_totais || 0}</td>
        <td>${r.total_palavras || 0}</td>
        <td>${r.total_matematica || 0}</td>
      </tr>
    `).join("");
  } catch (e) {}
}

window.addEventListener("popstate", async () => {
  handlingPopState = true;
  try {
    if (routeStack.length > 1) {
      routeStack.pop();
      const target = routeStack[routeStack.length - 1] || "/login";
      pushBackSentinel(target);
      await navigateToRoute(target, true);
    } else {
      const fallback = normalizePath(window.location.pathname || "/login");
      pushBackSentinel(fallback);
      await navigateToRoute(fallback, true);
    }
  } finally {
    handlingPopState = false;
  }
});

async function initPortal() {
  syncFullscreenButtonLabel();
  attachArenaPointerSelection();
  const initialRoute = readInitialRoute();
  routeStack = [initialRoute];
  await navigateToRoute(initialRoute, true);
  await loadSessionAndProfile();
  await loadPlatformState();
  authLoadedOnce = true;

  const postAuthRoute = normalizePath(window.location.pathname);
  if (postAuthRoute === "/painel-de-controle" && !canAccessControlPanel()) {
    toast("Acesso restrito a administradores e moderadores autorizados.");
    await navigateToRoute("/", true);
  } else {
    await navigateToRoute(postAuthRoute, true);
  }
}

initPortal();
