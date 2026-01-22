// src/lib/api.js
const BASE = import.meta.env.VITE_API_URL;

// --- Token helpers ---
export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

// --- Core request ---
async function request(path, { method = "GET", body, headers = {} } = {}) {
  const finalHeaders = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...headers,
  };

  const token = getToken();
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    // ← CORRIGÉ (backticks)
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log("📡 Statut:", res.status);

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("❌ Erreur serveur:", txt);
    throw new Error(txt || `Erreur API ${res.status}`);
  }

  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : null;
}

// --- Auth endpoints ---
export const auth = {
  async register({ name, email, password }) {
    console.log("📨 auth.register appelé avec:", { name, email, password });
    return request("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });
  },

  async login({ email, password }) {
    const data = await request("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    if (data?.token) setToken(data.token);
    return data;
  },

  async logout() {
    const data = await request("/auth/logout", { method: "POST", body: {} });
    clearToken();
    return data;
  },

  me() {
    return request("/auth/me");
  },
};

export const categories = {
  list() {
    return request("/categories");
  },
  get(id) {
    return request(`/categories/${id}`); // ← CORRIGÉ (backticks)
  },
  create({ name, color, icon, max_budget, user_id }) {
    return request("/categories", {
      method: "POST",
      body: { name, color, icon, max_budget, user_id },
    });
  },
  update(id, { name, color, icon, max_budget }) {
    return request(`/categories/${id}`, {
      // ← CORRIGÉ (backticks)
      method: "PATCH",
      body: { name, color, icon, max_budget },
    });
  },
  remove(id) {
    return request(`/categories/${id}`, { method: "DELETE" }); // ← CORRIGÉ
  },
};

export const expenses = {
  list() {
    return request("/expenses");
  },
  listLimit(limit) {
    return request(`/expenses?limit=${encodeURIComponent(limit)}`); // ← CORRIGÉ
  },
  byMonth(yyyyMm) {
    return request(`/expenses/by-month/${yyyyMm}`); // ← CORRIGÉ
  },
  get(id) {
    return request(`/expenses/${id}`); // ← CORRIGÉ
  },
  create({ title, user_id, category_id, amount, date }) {
    return request("/expenses", {
      method: "POST",
      body: { title, user_id, category_id, amount, date },
    });
  },
  update(id, { title, category_id, amount, date }) {
    return request(`/expenses/${id}`, {
      // ← CORRIGÉ
      method: "PATCH",
      body: { title, category_id, amount, date },
    });
  },
  remove(id) {
    return request(`/expenses/${id}`, { method: "DELETE" }); // ← CORRIGÉ
  },
};
