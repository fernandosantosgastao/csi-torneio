let adminSession = null;
let adminProfile = null;
let adminUsersList = [];
let adminModerators = [];
let adminRoomsList = [];
let adminBotEnabled = false;
let adminAuditLogs = [];

function showAdminToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3800);
}

function loadAdminLogs() {
  try {
    const raw = localStorage.getItem("csi_admin_audit_logs_v1");
    const parsed = raw ? JSON.parse(raw) : [];
    adminAuditLogs = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    adminAuditLogs = [];
  }
}

function saveAdminLogs() {
  try {
    localStorage.setItem("csi_admin_audit_logs_v1", JSON.stringify(adminAuditLogs.slice(0, 80)));
  } catch (e) {}
}

function appendAdminLog(actionText) {
  loadAdminLogs();
  adminAuditLogs.unshift({
    text: actionText,
    by: adminProfile?.email || adminSession?.user?.email || "admin",
    at: new Date().toLocaleString("pt-BR")
  });
  saveAdminLogs();
  renderAdminLogs();
}

function clearAdminAuditLogs() {
  adminAuditLogs = [];
  try { localStorage.removeItem("csi_admin_audit_logs_v1"); } catch (e) {}
  renderAdminLogs();
  showAdminToast("Logs locais limpos.");
}

function renderAdminLogs() {
  const box = document.getElementById("adminAuditLogBox");
  if (!box) return;
  if (!adminAuditLogs.length) {
    box.innerHTML = `<div style="color:var(--text-muted);">Nenhuma ação registrada ainda.</div>`;
    return;
  }
  box.innerHTML = adminAuditLogs.map(item => `
    <div class="admin-log-item">
      <div style="font-weight:700; color:#f8fafc;">${item.text}</div>
      <div style="font-size:0.74rem; color:var(--text-muted);">${item.by} • ${item.at}</div>
    </div>
  `).join("");
}

function isMasterAdmin() {
  return !!(adminSession && adminProfile && adminProfile.role === "admin");
}

function isAuthorizedModerator() {
  if (!adminSession) return false;
  if (isMasterAdmin()) return true;
  const myEmail = String(adminProfile?.email || adminSession.user?.email || "").trim().toLowerCase();
  return !!(myEmail && adminModerators.includes(myEmail));
}

function getHeaders(includeJson = false) {
  const h = { "apikey": SUPABASE_KEY };
  if (adminSession?.access_token) {
    h["Authorization"] = `Bearer ${adminSession.access_token}`;
  }
  if (includeJson) {
    h["Content-Type"] = "application/json";
  }
  return h;
}

async function verifyAdminAccessOrRedirect() {
  try {
    const raw = localStorage.getItem("csi_teacher_auth");
    if (!raw) {
      window.location.replace("index.html");
      return false;
    }
    adminSession = JSON.parse(raw);
    if (!adminSession?.access_token || !adminSession?.user?.id) {
      window.location.replace("index.html");
      return false;
    }
  } catch (e) {
    window.location.replace("index.html");
    return false;
  }

  try {
    const profRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(adminSession.user.id)}&select=*`,
      { cache: "no-store", headers: getHeaders(false) }
    );
    const profRows = profRes.ok ? await profRes.json().catch(() => []) : [];
    adminProfile = Array.isArray(profRows) && profRows[0]
      ? profRows[0]
      : { id: adminSession.user.id, email: adminSession.user.email, role: "teacher" };
  } catch (e) {
    adminProfile = { id: adminSession.user.id, email: adminSession.user.email, role: "teacher" };
  }

  await loadModerators();

  if (!isMasterAdmin() && !isAuthorizedModerator()) {
    window.location.replace("index.html");
    return false;
  }

  document.getElementById("adminProtectedContent").style.display = "block";
  document.getElementById("adminOperatorEmail").textContent = adminProfile.email || adminSession.user.email;
  document.getElementById("adminAccessRoleBadge").textContent = isMasterAdmin() ? "ADMIN MASTER" : "MODERADOR";

  const isAdmin = isMasterAdmin();
  document.getElementById("btnMasterNukeAll").classList.toggle("hidden", !isAdmin);
  document.getElementById("btnClearRankingGlobal").classList.toggle("hidden", !isAdmin);
  document.getElementById("btnAddModerator").disabled = !isAdmin;
  document.getElementById("btnToggleBotFlag").disabled = !isAdmin;

  return true;
}

async function loadModerators() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/moderators?select=email`, {
      cache: "no-store",
      headers: getHeaders(false)
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows)) {
        adminModerators = Array.from(new Set(
          rows.map(r => String(r.email || "").trim().toLowerCase()).filter(Boolean)
        ));
      }
    }
  } catch (e) {}

  try {
    const localRaw = localStorage.getItem("csi_moderators_emails");
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed)) {
        adminModerators = Array.from(new Set([
          ...adminModerators,
          ...parsed.map(e => String(e || "").trim().toLowerCase()).filter(Boolean)
        ]));
      }
    }
  } catch (e) {}

  try {
    localStorage.setItem("csi_moderators_emails", JSON.stringify(adminModerators));
  } catch (e) {}

  document.getElementById("kpiTotalMods").textContent = String(adminModerators.length);
  const box = document.getElementById("adminModsListContainer");
  if (!box) return;
  if (!adminModerators.length) {
    box.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">Nenhum moderador autorizado.</span>`;
    return;
  }
  box.innerHTML = adminModerators.map(email => `
    <span class="mod-chip">
      <span>👮 ${email}</span>
      ${isMasterAdmin() ? `<button type="button" onclick="removeAdminModerator('${email.replace(/'/g, "\\'")}')">✕</button>` : ""}
    </span>
  `).join("");
}

async function addAdminModerator() {
  if (!isMasterAdmin()) {
    showAdminToast("Somente o Admin Master pode adicionar moderadores.");
    return;
  }
  const input = document.getElementById("newModEmailInput");
  const email = String(input.value || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    showAdminToast("Informe um e-mail válido.");
    return;
  }

  await fetch(`${SUPABASE_URL}/rest/v1/moderators`, {
    method: "POST",
    headers: { ...getHeaders(true), "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify({ email, added_by: adminSession.user.id })
  }).catch(() => {});

  adminModerators = Array.from(new Set([...adminModerators, email]));
  localStorage.setItem("csi_moderators_emails", JSON.stringify(adminModerators));
  input.value = "";
  appendAdminLog(`Autorizou moderador: ${email}`);
  await loadModerators();
  showAdminToast(`Moderador ${email} adicionado.`);
}

async function removeAdminModerator(email) {
  if (!isMasterAdmin()) return;
  await fetch(`${SUPABASE_URL}/rest/v1/moderators?email=eq.${encodeURIComponent(email)}`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});

  adminModerators = adminModerators.filter(e => e !== email);
  localStorage.setItem("csi_moderators_emails", JSON.stringify(adminModerators));
  appendAdminLog(`Removeu moderador: ${email}`);
  await loadModerators();
  showAdminToast(`Moderador ${email} removido.`);
}

async function loadUsersProfiles() {
  const tbody = document.getElementById("adminUsersTableBody");
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&order=created_at.desc&limit=100`, {
      cache: "no-store",
      headers: getHeaders(false)
    });
    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Sem permissão para listar todos os perfis no banco.</td></tr>`;
      return;
    }
    const rows = await res.json().catch(() => []);
    adminUsersList = Array.isArray(rows) ? rows : [];
    document.getElementById("kpiTotalUsers").textContent = String(adminUsersList.length);
    renderUsersTable();
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Erro ao carregar usuários.</td></tr>`;
  }
}

function renderUsersTable() {
  const tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;
  const term = String(document.getElementById("filterUsersInput")?.value || "").trim().toLowerCase();

  const filtered = adminUsersList.filter(u => {
    if (!term) return true;
    return String(u.full_name || "").toLowerCase().includes(term) ||
      String(u.email || "").toLowerCase().includes(term);
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Nenhum usuário encontrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(u => {
    const email = u.email || "";
    const status = u.subscription_status || "trial";
    const role = u.role || "teacher";
    const nextStatus = status === "active" ? "suspended" : "active";

    return `
      <tr>
        <td>
          <strong>${u.full_name || "Sem nome"}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${email}</div>
        </td>
        <td>
          <span class="status-tag st-waiting">${role}</span>
          <div style="font-size:0.74rem; color:var(--gold); margin-top:2px;">${u.plan_tier || "trial"}</div>
        </td>
        <td><span class="status-tag ${status === 'active' ? 'st-active' : 'st-eliminated'}">${status}</span></td>
        <td>
          <div class="mod-actions-cell">
            <button type="button" class="btn-ghost btn-xs" onclick="prefillAndResetPassword('${email.replace(/'/g, "\\'")}')">🔑 Senha</button>
            ${isMasterAdmin() ? `<button type="button" class="btn-primary btn-xs" onclick="toggleUserSubscriptionStatus('${u.id}', '${nextStatus}', '${email.replace(/'/g, "\\'")}')">${nextStatus === 'active' ? 'Ativar' : 'Suspender'}</button>` : ""}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function prefillAndResetPassword(email) {
  const input = document.getElementById("resetPasswordEmailInput");
  if (input) {
    input.value = email;
    input.focus();
  }
  sendPasswordResetToUser();
}

async function sendPasswordResetToUser() {
  const emailInput = document.getElementById("resetPasswordEmailInput");
  const email = String(emailInput?.value || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    showAdminToast("Informe um e-mail válido para redefinir a senha.");
    return;
  }

  const redirectTo = `${window.location.origin}/conta.html`;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, redirect_to: redirectTo })
  });

  if (res.ok) {
    appendAdminLog(`Enviou link de redefinição de senha para ${email}`);
    showAdminToast(`Link de redefinição enviado para ${email}!`);
  } else {
    showAdminToast("Não foi possível enviar a redefinição agora.");
  }
}

async function toggleUserSubscriptionStatus(userId, newStatus, email) {
  if (!isMasterAdmin() || !userId) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ subscription_status: newStatus })
  });
  if (res.ok) {
    appendAdminLog(`Alterou assinatura de ${email} para ${newStatus}`);
    await loadUsersProfiles();
    showAdminToast(`Status de ${email} atualizado para ${newStatus}.`);
  } else {
    showAdminToast("Erro ao atualizar status da conta.");
  }
}

async function loadBotConfig() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global&select=bot_test_enabled`, {
      cache: "no-store",
      headers: getHeaders(false)
    });
    if (res.ok) {
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows[0]) {
        adminBotEnabled = !!rows[0].bot_test_enabled;
      }
    }
  } catch (e) {}

  document.getElementById("kpiBotStatus").textContent = adminBotEnabled ? "LIBERADO" : "BLOQUEADO";
  document.getElementById("adminBotFlagText").textContent = adminBotEnabled
    ? "Liberado para teste com 4 bots"
    : "Bloqueado para visitantes";
  document.getElementById("btnToggleBotFlag").textContent = adminBotEnabled ? "🔒 Bloquear" : "🔓 Liberar";
}

async function toggleGlobalBotFlag() {
  if (!isMasterAdmin()) return;
  const nextVal = !adminBotEnabled;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ bot_test_enabled: nextVal, updated_at: new Date().toISOString() })
  });
  if (res.ok) {
    adminBotEnabled = nextVal;
    appendAdminLog(`${nextVal ? "Liberou" : "Bloqueou"} o Modo Teste (4 Bots)`);
    await loadBotConfig();
    showAdminToast(nextVal ? "Modo 4 Bots liberado." : "Modo 4 Bots bloqueado.");
  }
}

async function loadAllRooms() {
  const tbody = document.getElementById("adminRoomsTableBody");
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?select=pin,state,updated_at&limit=100`, {
      cache: "no-store",
      headers: getHeaders(false)
    });
    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Erro ao consultar salas.</td></tr>`;
      return;
    }
    const rows = await res.json().catch(() => []);
    adminRoomsList = Array.isArray(rows) ? rows.filter(r => r && r.pin) : [];
    document.getElementById("kpiTotalRooms").textContent = String(adminRoomsList.length);

    if (!adminRoomsList.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Nenhuma sala cadastrada no momento.</td></tr>`;
      return;
    }

    tbody.innerHTML = adminRoomsList.map(r => {
      const st = r.state || {};
      const playersCount = Object.keys(st.players || {}).length;
      const isClosed = !!st.closed;
      return `
        <tr>
          <td><strong style="color:var(--gold); letter-spacing:2px;">${r.pin}</strong></td>
          <td>${st.roomLabel || "Sala"}</td>
          <td><span class="status-tag ${isClosed ? 'st-eliminated' : 'st-active'}">${isClosed ? 'Encerrada' : 'Aberta'}</span></td>
          <td>${playersCount}</td>
          <td>
            <div class="mod-actions-cell">
              <button type="button" class="btn-ghost btn-xs" onclick="setRoomClosed('${r.pin}', ${!isClosed})">${isClosed ? 'Reabrir' : 'Fechar'}</button>
              ${isMasterAdmin() ? `<button type="button" class="btn-danger btn-xs" onclick="deleteRoomAdmin('${r.pin}')">Excluir</button>` : ""}
            </div>
          </td>
        </tr>
      `;
    }).join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Falha ao carregar salas.</td></tr>`;
  }
}

async function setRoomClosed(pin, closedFlag) {
  const found = adminRoomsList.find(r => r.pin === pin);
  const nextState = { ...(found?.state || {}), closed: !!closedFlag, started: closedFlag ? false : !!(found?.state?.started), v: ((found?.state?.v) || 1) + 1 };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(pin)}`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ state: nextState, updated_at: new Date().toISOString() })
  });
  if (res.ok) {
    appendAdminLog(`${closedFlag ? "Fechou" : "Reabriu"} a sala ${pin}`);
    await loadAllRooms();
    showAdminToast(`Sala ${pin} ${closedFlag ? "fechada" : "reaberta"}.`);
  }
}

async function deleteRoomAdmin(pin) {
  if (!isMasterAdmin()) return;
  await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=eq.${encodeURIComponent(pin)}`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});
  appendAdminLog(`Excluiu permanentemente a sala ${pin}`);
  await loadAllRooms();
  showAdminToast(`Sala ${pin} excluída.`);
}

async function clearGlobalRankingNow() {
  if (!isMasterAdmin()) return;
  const nowIso = new Date().toISOString();
  await fetch(`${SUPABASE_URL}/rest/v1/global_leaderboard?pontos_totais=gte.0`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});
  await fetch(`${SUPABASE_URL}/rest/v1/platform_config?id=eq.global`, {
    method: "PATCH",
    headers: { ...getHeaders(true), "Prefer": "return=minimal" },
    body: JSON.stringify({ leaderboard_cleared_at: nowIso, updated_at: nowIso })
  }).catch(() => {});
  appendAdminLog("Limpou o ranking global para todos os usuários");
  showAdminToast("Ranking global limpo para todos.");
}

async function masterCloseAllRoomsAndClearRanking() {
  if (!isMasterAdmin()) return;
  const ok = window.confirm("Deseja fechar e excluir todas as salas e limpar o ranking global?");
  if (!ok) return;
  await fetch(`${SUPABASE_URL}/rest/v1/salas?pin=not.is.null`, {
    method: "DELETE",
    headers: getHeaders(false)
  }).catch(() => {});
  await clearGlobalRankingNow();
  appendAdminLog("Executou reset master: excluiu todas as salas e limpou o ranking");
  await loadAllRooms();
}

async function refreshAllAdminData() {
  await Promise.all([loadModerators(), loadUsersProfiles(), loadBotConfig(), loadAllRooms()]);
  renderAdminLogs();
}

async function bootAdminPage() {
  loadAdminLogs();
  renderAdminLogs();
  const allowed = await verifyAdminAccessOrRedirect();
  if (!allowed) return;
  await refreshAllAdminData();
}

bootAdminPage();
