/**
 * @name LighthouseBoost
 * @author Lighthouse
 * @description Makes Discord faster: freezes animated profile cosmetics, collapses huge stage audiences, unloads the member list in giant servers, cuts layout work in chat, pauses everything in the background, frees memory, and measures lag. Works with any theme.
 * @version 2.4.0
 * @source https://github.com/exodios22/lighthouse-discord
 */

const UPDATE_URL = "https://raw.githubusercontent.com/exodios22/lighthouse-discord/main/LighthouseBoost.plugin.js";
const STYLE_ID = "lighthouse-boost";

const DEFAULTS = {
    pauseInBackground: true,
    backgroundDelay: 5,
    freeMemory: true,
    freeMemoryAfter: 2,
    liteEffects: true,
    reduceMotion: false,
    smartRendering: false,
    hideClutter: false,
    hideActiveNow: false,
    staticCosmetics: true,
    containChat: true,
    stageLite: true,
    stageThreshold: 150,
    bigServerMembers: false,
    memberThreshold: 20000,
    quietMembers: false,
    keepCodeCache: true,
    keepShaderCache: true,
    fastGameScan: true,
    quietVoiceLog: true,
    xpStartupCaches: true,
    xpVoiceCpu: true,
    xpGamePerf: true,
    xpLazyImages: true,
    xpTypingDots: true,
    xpRivePerf: true,
    xpNativeMarkdown: false,
    quietBigServers: true,
    quietThreshold: 5000,
    leanDispatcher: true,
    autoUpdate: true
};

/* Discord's own start-up settings (found in its desktop bootstrap). The app is allowed to set these itself. */
const APP_TUNING = {
    keepCodeCache: {key: "DESKTOP_TTI_REMOVE_V8_CACHE_CLEAR", on: true, off: false},
    keepShaderCache: {key: "DESKTOP_TTI_REMOVE_SHADER_CACHE_CLEAR", on: true, off: false},
    fastGameScan: {key: "DESKTOP_PROCESS_POLLING_PERF", on: true, off: false},
    quietVoiceLog: {key: "debugLogging", on: false, off: true}
};

/* Discord's own performance experiments (found in its web app). Switched on with session-only overrides:
   not saved to Discord's servers and not reported back, re-applied each time Discord connects. */
const EXPERIMENTS = {
    xpStartupCaches: [["2026-04-desktop-tti-v8-cache", 1], ["2026-09-desktop-tti-shader-cache", 1]],
    xpVoiceCpu: [["2026-10-desktop-general-perf", 1]],
    xpGamePerf: [["2026-10-desktop-game-perf", 1]],
    xpLazyImages: [["2026-02-lazy-load-all-images", 2]],
    xpTypingDots: [["2026-07-typing-users-css-dots", 1]],
    xpRivePerf: [["2026-08-rive-web-perf", 1]],
    xpNativeMarkdown: [["2025-04-native-markdown", 1]]
};
const REAPPLY_ON = ["POST_CONNECTION_OPEN", "CONNECTION_OPEN_STATE_UPDATE", "APEX_EXPERIMENTS_FETCH_SUCCESS"];

const safe = fn => { try { return fn(); } catch (e) { return undefined; } };
const native = () => safe(() => window.DiscordNative && window.DiscordNative.processUtils);
const mb = kb => `${Math.round(kb / 1024)} MB`;

/* Videos that belong to calls, streams and stages are never touched. */
const CALL_AREA = "[data-call-tile], [class*='callContainer_'], [class*='videoWrapper_'], [class*='pictureInPicture'], [class*='streamPreview'], [class*='stageVideo']";
const CHAT_MEDIA = "[id^='chat-messages-'] video, [class*='embed'] video, [class*='imageWrapper_'] video, [class*='gifFavoriteButton'] ~ video";

const CSS = {
    paused: `
html.lb-paused *, html.lb-paused *::before, html.lb-paused *::after {
    animation-play-state: paused !important;
    transition: none !important;
}`,
    lite: `
html.lb-lite *, html.lb-lite *::before, html.lb-lite *::after {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
}
html.lb-lite [class*='layerContainer_'] [class*='backdrop_'] { background: rgb(0 0 0 / .7) !important; }`,
    motion: `
html.lb-still *, html.lb-still *::before, html.lb-still *::after {
    animation-duration: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
}`,
    smart: `
html.lb-smart li[id^='chat-messages-'] {
    content-visibility: auto;
    contain-intrinsic-size: auto 72px;
}`,
    clutter: `
html.lb-tidy [href='/store'], html.lb-tidy [href='/shop'], html.lb-tidy [href='/quest-home'], html.lb-tidy [href*='/discovery/quests'],
html.lb-tidy [data-list-item-id$='___nitro'], html.lb-tidy [data-list-item-id$='___shop'], html.lb-tidy [data-list-item-id$='___quests'],
html.lb-tidy button[aria-label='Send a gift' i], html.lb-tidy [class*='channelTextArea_'] button[aria-label*='gift' i],
html.lb-tidy [class*='channelTextArea_'] [class*='app-launcher'], html.lb-tidy [class*='channelTextArea_'] button[aria-label='Apps' i],
html.lb-tidy [class*='nowPlayingColumn_'] [class*='upsell'], html.lb-tidy [class*='premiumPromo'] {
    display: none !important;
}`,
    activeNow: `
html.lb-no-active-now [class*='nowPlayingColumn_'] { display: none !important; }`,
    cosmetics: `
html.lb-static [class*='usernameGradient' i], html.lb-static [class*='gradientText' i], html.lb-static [class*='holographic' i],
html.lb-static [class*='roleStyle' i], html.lb-static [class*='clanTag' i] * {
    animation: none !important;
}
html.lb-static [class*='profileEffects' i] { display: none !important; }`,
    contain: `
html.lb-contain li[id^='chat-messages-'] { contain: layout style; }
html.lb-contain [class*='members_'] [class*='member_'], html.lb-contain .container_86es0b [role='listitem'] { contain: layout style; }`,
    quietMembers: `
html.lb-quiet-members .container_86es0b [class*='activity' i],
html.lb-quiet-members .container_86es0b [class*='nameplate_'] { display: none !important; }`
};

module.exports = class LighthouseBoost {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(meta.name);
    }

    start() {
        this.settings = Object.assign({}, DEFAULTS, this.api.Data.load("settings") || {});
        this.pausedVideos = new Set();
        this.api.DOM.addStyle(STYLE_ID, Object.values(CSS).join("\n"));
        this.applyClasses();

        this.onVisibility = () => this.scheduleBackground();
        document.addEventListener("visibilitychange", this.onVisibility);
        window.addEventListener("blur", this.onVisibility);
        window.addEventListener("focus", this.onVisibility);
        this.scheduleBackground();

        this.lag = {tasks: [], lastSwitch: null};
        this.watchLongTasks();
        this.observer = new MutationObserver(muts => this.onMutations(muts));
        this.observer.observe(document.body, {childList: true, subtree: true});
        this.lastPath = location.pathname;
        this.navTimer = setInterval(() => this.onNavigate(), 400);
        this.origPush = history.pushState;
        this.origReplace = history.replaceState;
        const self = this;
        history.pushState = function (...a) { const r = self.origPush.apply(this, a); self.onNavigate(); return r; };
        history.replaceState = function (...a) { const r = self.origReplace.apply(this, a); self.onNavigate(); return r; };
        this.onPop = () => this.onNavigate();
        window.addEventListener("popstate", this.onPop);

        this.applyAppTuning();
        this.startExperiments();
        this.startDispatcherPatches();

        if (this.settings.autoUpdate) this.updateTimer = setTimeout(() => this.checkForUpdate(false), 20000);
    }

    stop() {
        document.removeEventListener("visibilitychange", this.onVisibility);
        window.removeEventListener("blur", this.onVisibility);
        window.removeEventListener("focus", this.onVisibility);
        clearTimeout(this.bgTimer);
        clearTimeout(this.memTimer);
        clearTimeout(this.updateTimer);
        this.setBackground(false);
        document.documentElement.classList.remove("lb-paused", "lb-lite", "lb-still", "lb-smart", "lb-tidy", "lb-no-active-now", "lb-static", "lb-contain", "lb-quiet-members");
        if (this.observer) this.observer.disconnect();
        if (this.longTaskObserver) this.longTaskObserver.disconnect();
        clearInterval(this.navTimer);
        this.stopExperiments();
        this.stopDispatcherPatches();
        if (this.origPush) { history.pushState = this.origPush; history.replaceState = this.origReplace; }
        window.removeEventListener("popstate", this.onPop);
        this.api.DOM.removeStyle(STYLE_ID);
    }

    save() {
        this.api.Data.save("settings", this.settings);
        this.applyAppTuning();
        this.applyExperiments();
        this.applyClasses();
        this.scheduleBackground();
        this.stageCollapsed = false;
        this.checkMemberList();
    }

    applyClasses() {
        const c = document.documentElement.classList, s = this.settings;
        c.toggle("lb-lite", s.liteEffects);
        c.toggle("lb-still", s.reduceMotion);
        c.toggle("lb-smart", s.smartRendering);
        c.toggle("lb-tidy", s.hideClutter);
        c.toggle("lb-no-active-now", s.hideActiveNow);
        c.toggle("lb-static", s.staticCosmetics);
        c.toggle("lb-contain", s.containChat);
        c.toggle("lb-quiet-members", s.quietMembers);
    }

    /* ================= background mode ================= */
    inBackground() {
        return document.hidden || !document.hasFocus();
    }

    scheduleBackground() {
        clearTimeout(this.bgTimer);
        clearTimeout(this.memTimer);
        if (!this.inBackground()) { this.setBackground(false); return; }
        if (this.settings.pauseInBackground) {
            this.bgTimer = setTimeout(() => { if (this.inBackground()) this.setBackground(true); }, this.settings.backgroundDelay * 1000);
        }
        if (this.settings.freeMemory) {
            this.memTimer = setTimeout(() => { if (this.inBackground()) this.freeMemory(false); }, this.settings.freeMemoryAfter * 60000);
        }
    }

    setBackground(on) {
        document.documentElement.classList.toggle("lb-paused", on);
        if (on) {
            document.querySelectorAll(CHAT_MEDIA).forEach(v => {
                if (v.closest(CALL_AREA) || v.paused) return;
                safe(() => v.pause());
                this.pausedVideos.add(v);
            });
        } else {
            this.pausedVideos.forEach(v => { if (v.isConnected) safe(() => v.play().catch(() => {})); });
            this.pausedVideos.clear();
        }
    }

    /* ================= gateway + dispatcher ================= */
    startDispatcherPatches() {
        if (this.patchActive()) return;
        const d = this.dispatcher();
        if (!d) return;
        // 1. Big servers: don't ask Discord to stream every member's activity changes.
        this.interceptor = action => {
            if (action && action.type === "GUILD_SUBSCRIPTIONS_FLUSH" && this.settings.quietBigServers && action.subscriptions) {
                const counts = safe(() => BdApi.Webpack.getStore("GuildMemberCountStore"));
                for (const [guildId, sub] of Object.entries(action.subscriptions)) {
                    const n = safe(() => counts.getMemberCount(guildId)) || 0;
                    if (sub && sub.activities && n >= this.settings.quietThreshold) {
                        sub.activities = false;
                        this.quietedGuilds = (this.quietedGuilds || new Set()).add(guildId);
                    }
                }
            }
            return false;
        };
        safe(() => d.addInterceptor(this.interceptor));
        // 2. Lean action logger: Discord times every store handler for every event and fires a trace event
        //    for each, even though nothing reads it outside the first seconds of start-up or developer mode.
        const logger = d.actionLogger;
        if (logger && typeof logger.log === "function" && !this.origLog) {
            this.origLog = logger.log;
            const orig = this.origLog, self = this;
            logger.log = function (action, run) {
                if (!self.settings.leanDispatcher || this.persist || performance.now() < 20000) return orig.call(this, action, run);
                const entry = {name: action.type, action, totalTime: 0, traces: []};
                run((name, fn) => fn());
                return entry;
            };
        }
    }

    stopDispatcherPatches() {
        const d = this.dispatcher();
        if (!d) return;
        if (this.interceptor && Array.isArray(d._interceptors)) d._interceptors = d._interceptors.filter(f => f !== this.interceptor);
        if (this.origLog && d.actionLogger) d.actionLogger.log = this.origLog;
        this.origLog = null;
        this.interceptor = null;
    }

    /* ================= Discord's own speed experiments ================= */
    dispatcher() {
        return this._dispatcher || (this._dispatcher = safe(() => BdApi.Webpack.getByKeys("dispatch", "subscribe", "unsubscribe")));
    }

    patchActive() {
        return !!(window.__lighthousePatch && window.__lighthousePatch.applied);
    }

    startExperiments() {
        if (this.patchActive()) return;
        const d = this.dispatcher();
        if (!d) return;
        this.onReapply = () => { clearTimeout(this.xpTimer); this.xpTimer = setTimeout(() => this.applyExperiments(), 600); };
        for (const t of REAPPLY_ON) safe(() => d.subscribe(t, this.onReapply));
        this.applyExperiments();
    }

    stopExperiments() {
        const d = this.dispatcher();
        clearTimeout(this.xpTimer);
        if (!d) return;
        for (const t of REAPPLY_ON) safe(() => d.unsubscribe(t, this.onReapply));
        for (const list of Object.values(EXPERIMENTS)) for (const [name] of list)
            safe(() => d.dispatch({type: "APEX_EXPERIMENT_SESSION_OVERRIDE_DELETE", experimentName: name}));
    }

    applyExperiments() {
        if (this.patchActive()) return;
        const d = this.dispatcher();
        const store = safe(() => BdApi.Webpack.getStore("ApexExperimentStore"));
        if (!d || !store) return;
        const registered = safe(() => store.getRegisteredExperiments()) || {};
        const session = safe(() => store.getSessionOverrides()) || {};
        for (const [id, list] of Object.entries(EXPERIMENTS)) for (const [name, variant] of list) {
            if (Object.keys(registered).length && !registered[name]) continue;
            const have = session[name] && session[name].variantId;
            if (this.settings[id] && have !== variant) safe(() => d.dispatch({type: "APEX_EXPERIMENT_SESSION_OVERRIDE_CREATE", experimentName: name, variantId: variant}));
            else if (!this.settings[id] && have != null) safe(() => d.dispatch({type: "APEX_EXPERIMENT_SESSION_OVERRIDE_DELETE", experimentName: name}));
        }
    }

    experimentState() {
        const store = safe(() => BdApi.Webpack.getStore("ApexExperimentStore"));
        if (!store) return null;
        const session = safe(() => store.getSessionOverrides()) || {};
        let want = 0, on = 0;
        for (const [id, list] of Object.entries(EXPERIMENTS)) if (this.settings[id]) for (const [name, variant] of list) { want++; if (session[name] && session[name].variantId === variant) on++; }
        return {want, on};
    }

    /* ================= app tuning: Discord's own desktop settings ================= */
    appSettingsApi() {
        return safe(() => window.DiscordNative.settings) || null;
    }

    appTuningState() {
        const api = this.appSettingsApi();
        const out = {};
        for (const [id, t] of Object.entries(APP_TUNING)) out[id] = api ? safe(() => api.getSync(t.key, t.off)) : undefined;
        return out;
    }

    async applyAppTuning() {
        const api = this.appSettingsApi();
        if (!api || typeof api.set !== "function") return false;
        let changed = false;
        for (const [id, t] of Object.entries(APP_TUNING)) {
            const want = this.settings[id] ? t.on : t.off;
            const have = safe(() => api.getSync(t.key, t.off));
            if (have !== want) {
                try { await api.set(t.key, want); changed = true; } catch (e) { /* key not allowed in this Discord version */ }
            }
        }
        return changed;
    }

    /* ================= deep: cosmetics, chat, stages, member list ================= */
    onMutations(muts) {
        if (!this.settings.staticCosmetics) return;
        this.pending = this.pending || [];
        for (const m of muts) for (const n of m.addedNodes) if (n.nodeType === 1) this.pending.push(n);
        if (this.pendingScheduled) return;
        this.pendingScheduled = true;
        const run = () => {
            const nodes = this.pending; this.pending = []; this.pendingScheduled = false;
            for (const n of nodes) {
                if (!n.isConnected) continue;
                if (n.tagName === "IMG" || n.tagName === "VIDEO") this.calmMedia(n);
                else if (n.firstElementChild) n.querySelectorAll("img[src*='avatar-decoration'], [class*='nameplate'] video, video[src*='nameplate']").forEach(x => this.calmMedia(x));
            }
        };
        (window.requestIdleCallback || (f => setTimeout(f, 50)))(run, {timeout: 300});
    }

    calmMedia(el) {
        if (el.tagName === "IMG") {
            const src = el.getAttribute("src") || "";
            if (src.includes("avatar-decoration") && src.includes("passthrough=true")) el.setAttribute("src", src.replace("passthrough=true", "passthrough=false"));
        } else if (el.tagName === "VIDEO" && !el.closest(CALL_AREA)) {
            const src = el.getAttribute("src") || (el.querySelector("source") && el.querySelector("source").getAttribute("src")) || "";
            if (src.includes("nameplate") || el.closest("[class*='nameplate']")) {
                el.autoplay = false; el.loop = false; el.preload = "metadata";
                safe(() => el.pause());
                el.addEventListener("play", () => { if (this.settings.staticCosmetics && !el.matches(":hover")) safe(() => el.pause()); });
            }
        }
    }

    onNavigate() {
        const path = location.pathname;
        if (path !== this.lastPath) {
            this.lastPath = path;
            this.timeSwitch(path);
            this.stageCollapsed = false;
            this.checkMemberList();
        }
        if (this.settings.stageLite && !this.stageCollapsed) this.checkStage();
    }

    timeSwitch(path) {
        const parts = path.split("/");
        if (parts[1] !== "channels" || !parts[3]) return;
        const id = parts[3], t0 = performance.now();
        const wait = () => {
            if (document.querySelector(`li[id^='chat-messages-${id}-']`)) { this.lag.lastSwitch = Math.round(performance.now() - t0); return; }
            if (performance.now() - t0 < 5000) requestAnimationFrame(wait);
        };
        requestAnimationFrame(wait);
    }

    checkStage() {
        const now = Date.now();
        if (this.lastStageScan && now - this.lastStageScan < 1200) return;
        this.lastStageScan = now;
        const header = [...document.querySelectorAll("h2, h3, [role='heading']")]
            .find(h => /^\s*Audience\s*[—–-]\s*([\d,]+)/i.test(h.textContent || "") && h.textContent.length < 40);
        if (!header) return;
        const count = parseInt(header.textContent.replace(/[^\d]/g, ""), 10) || 0;
        if (count < this.settings.stageThreshold) { this.stageCollapsed = true; return; }
        const scope = header.closest("[class*='header' i]") || header.parentElement;
        const toggle = scope && (scope.querySelector("[aria-expanded='true']") || (scope.matches("[aria-expanded='true']") ? scope : null));
        if (toggle) {
            toggle.click();
            this.stageCollapsed = true;
            BdApi.UI.showToast(`Collapsed the stage audience (${count.toLocaleString()} people) to keep things smooth. Click it to open.`, {type: "info"});
        }
    }

    checkMemberList() {
        if (!this.settings.bigServerMembers) {
            if (this.hidMembers) this.toggleMembers(true);
            return;
        }
        const guildId = location.pathname.split("/")[2];
        const count = safe(() => BdApi.Webpack.getStore("GuildMemberCountStore").getMemberCount(guildId)) || 0;
        setTimeout(() => {
            if (count >= this.settings.memberThreshold) this.toggleMembers(false);
            else if (this.hidMembers) this.toggleMembers(true);
        }, 600);
    }

    toggleMembers(show) {
        const btn = document.querySelector(show ? "[aria-label='Show Member List' i]" : "[aria-label='Hide Member List' i]");
        if (!btn) return;
        btn.click();
        this.hidMembers = !show;
    }

    watchLongTasks() {
        safe(() => {
            this.longTaskObserver = new PerformanceObserver(list => {
                const now = performance.now();
                for (const e of list.getEntries()) this.lag.tasks.push({at: now, ms: e.duration});
                this.lag.tasks = this.lag.tasks.filter(t => now - t.at < 60000);
            });
            this.longTaskObserver.observe({type: "longtask", buffered: false});
        });
    }

    lagSummary() {
        const now = performance.now();
        const recent = (this.lag && this.lag.tasks || []).filter(t => now - t.at < 60000);
        return {freezes: recent.length, worst: recent.reduce((a, t) => Math.max(a, t.ms), 0), lastSwitch: this.lag && this.lag.lastSwitch};
    }

    launchBoost() {
        const argv = safe(() => window.DiscordNative.processUtils.getMainArgvSync()) || [];
        if (!Array.isArray(argv) || !argv.length) return null;
        return argv.some(a => String(a).includes("enable-gpu-rasterization"));
    }

    /* ================= memory ================= */
    memoryKB() {
        const n = native();
        const kb = safe(() => n.getCurrentMemoryUsageKB());
        if (typeof kb === "number") return kb;
        const heap = safe(() => performance.memory.usedJSHeapSize);
        return typeof heap === "number" ? heap / 1024 : null;
    }

    async freeMemory(manual) {
        const now = Date.now();
        if (!manual && this.lastPurge && now - this.lastPurge < 10 * 60000) return;
        this.lastPurge = now;
        const before = this.memoryKB();
        const n = native();
        if (!n || typeof n.purgeMemory !== "function") {
            if (manual) BdApi.UI.showToast("This Discord version doesn't allow freeing memory from a plugin.", {type: "info"});
            return;
        }
        await safe(() => n.purgeMemory());
        if (!manual) return;
        setTimeout(() => {
            const after = this.memoryKB();
            const msg = before && after ? `Freed memory: ${mb(before)} → ${mb(after)}` : "Asked Discord to free memory.";
            BdApi.UI.showToast(msg, {type: "success"});
        }, 1500);
    }

    measureFps() {
        return new Promise(resolve => {
            let frames = 0;
            const start = performance.now();
            const tick = t => { frames++; if (t - start < 1000) requestAnimationFrame(tick); else resolve(Math.round(frames * 1000 / (t - start))); };
            requestAnimationFrame(tick);
        });
    }

    /* ================= self-update ================= */
    async checkForUpdate(manual) {
        try {
            const res = await BdApi.Net.fetch(`${UPDATE_URL}?t=${Date.now()}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            const remote = (text.match(/@version\s+([\d.]+)/) || [])[1];
            const newer = (a, b) => { const x = a.split(".").map(Number), y = b.split(".").map(Number); for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); return false; };
            if (!remote || !/@name\s+LighthouseBoost/.test(text) || !newer(remote, this.meta.version)) {
                if (manual) BdApi.UI.showToast(`LighthouseBoost is up to date (v${this.meta.version})`, {type: "success"});
                return;
            }
            BdApi.UI.showConfirmationModal("LighthouseBoost update", `LighthouseBoost v${remote} is available (you have v${this.meta.version}). Install it now? It downloads from ${UPDATE_URL}.`, {
                confirmText: "Update", cancelText: "Not now",
                onConfirm: () => safe(() => {
                    const fs = require("fs"), path = require("path");
                    const addon = BdApi.Plugins.get("LighthouseBoost");
                    fs.writeFileSync(path.join(BdApi.Plugins.folder, (addon && addon.filename) || "LighthouseBoost.plugin.js"), text);
                    BdApi.UI.showToast(`LighthouseBoost updated to v${remote}`, {type: "success"});
                })
            });
        } catch (e) {
            if (manual) BdApi.UI.showToast(`Couldn't check for updates: ${e.message}`, {type: "error"});
        }
    }

    /* ================= settings ================= */
    Stats() {
        const React = BdApi.React, h = React.createElement;
        const [mem, setMem] = React.useState(this.memoryKB());
        const [fps, setFps] = React.useState(null);
        React.useEffect(() => {
            let alive = true;
            const tick = async () => { if (!alive) return; setMem(this.memoryKB()); const f = await this.measureFps(); if (alive) setFps(f); };
            tick();
            const t = setInterval(tick, 3000);
            return () => { alive = false; clearInterval(t); };
        }, []);
        const box = {display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", width: "100%"};
        const stat = {padding: "8px 12px", borderRadius: "10px", background: "rgb(140 170 220 / .08)", border: "1px solid rgb(140 170 220 / .14)", color: "var(--text-normal, #e3e9f2)", fontSize: "13px"};
        const btn = {padding: "8px 14px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 700, background: "var(--lh-2, var(--brand-500, #5865f2))", color: "var(--lh-on-accent, #fff)"};
        const lag = this.lagSummary();
        const boost = this.launchBoost();
        return h("div", {style: box},
            h("span", {style: stat}, "Memory: ", h("b", null, mem ? mb(mem) : "unknown")),
            h("span", {style: stat}, "Frame rate: ", h("b", null, fps ? `${fps} fps` : "…")),
            h("span", {style: stat}, "Freezes (last min): ", h("b", null, `${lag.freezes}`), lag.worst ? ` · worst ${Math.round(lag.worst)} ms` : ""),
            h("span", {style: stat}, "Last channel switch: ", h("b", null, lag.lastSwitch != null ? `${lag.lastSwitch} ms` : "switch channel to measure")),
            h("span", {style: stat}, "Launch boost: ", h("b", null, boost === null ? "can't tell" : boost ? "on" : "off")),
            h("span", {style: stat}, "Lighthouse Patch: ", h("b", null, this.patchActive() ? `active (${window.__lighthousePatch.applied.join(", ")})` : "not installed")),
            h("span", {style: stat}, "Speed experiments: ", h("b", null, (() => { const x = this.experimentState(); return x ? `${x.on} of ${x.want} on` : "unavailable"; })())),
            h("span", {style: stat}, "App tuning: ", h("b", null, (() => { const st = this.appTuningState(); const ok = Object.entries(APP_TUNING).filter(([id, t]) => st[id] === (this.settings[id] ? t.on : t.off)).length; return st.keepCodeCache === undefined ? "unavailable" : `${ok} of ${Object.keys(APP_TUNING).length} set`; })())),
            h("button", {type: "button", style: btn, onClick: () => this.freeMemory(true).then(() => setTimeout(() => setMem(this.memoryKB()), 1600))}, "Free memory now"));
    }

    getSettingsPanel() {
        const s = this.settings;
        const React = BdApi.React;
        const Stats = () => this.Stats();
        return BdApi.UI.buildSettingsPanel({
            settings: [
                {type: "custom", id: "stats", name: "Right now", note: "Freezes are moments Discord was stuck for over 50 ms (the stutter you feel). Lower is better. Launch boost shows whether Discord was started with the Lighthouse launch script.", children: React.createElement(Stats)},
                {
                    type: "category", id: "deep", name: "Deep optimisations", collapsible: true, shown: true,
                    settings: [
                        {type: "switch", id: "staticCosmetics", name: "Freeze animated profile cosmetics", note: "Avatar decorations show a still frame, nameplate videos stop playing (they play on hover), and animated role-colour effects stand still. Busy member lists and chats get much lighter.", value: s.staticCosmetics},
                        {type: "switch", id: "containChat", name: "Cheaper chat layout", note: "Tells the browser engine each message and member row can be laid out on its own, so new messages and presence updates don't re-measure the whole list.", value: s.containChat},
                        {type: "switch", id: "stageLite", name: "Collapse big stage audiences", note: "When you join a stage with a big audience, its audience grid starts collapsed, so Discord doesn't draw thousands of avatars. Click the Audience header to open it.", value: s.stageLite},
                        {type: "slider", id: "stageThreshold", name: "Collapse audiences bigger than", min: 50, max: 2000, step: 50, value: s.stageThreshold, markers: [50, 150, 500, 1000, 2000]},
                        {type: "switch", id: "bigServerMembers", name: "Unload member list in giant servers", note: "In servers bigger than the size below, the member list is switched off (using Discord's own button), so it stops processing thousands of status changes. It comes back in smaller servers.", value: s.bigServerMembers},
                        {type: "slider", id: "memberThreshold", name: "Giant server size", min: 1000, max: 200000, step: 1000, value: s.memberThreshold, markers: [1000, 20000, 50000, 100000, 200000]},
                        {type: "switch", id: "quietBigServers", name: "Calm giant servers", note: "In servers bigger than the size below, Discord stops streaming every member's game and activity changes to you, which is a constant flood in big servers. Messages, typing, voice, the member list and online status still work; activity lines just update less often. Takes effect the next time you open each server.", value: s.quietBigServers},
                        {type: "slider", id: "quietThreshold", name: "Calm servers bigger than", min: 500, max: 100000, step: 500, value: s.quietThreshold, markers: [500, 5000, 20000, 50000, 100000]},
                        {type: "switch", id: "leanDispatcher", name: "Lean event processing", note: "Discord times every internal handler for every event it processes and announces each timing, even though nothing uses it. This skips that bookkeeping (Discord's own developer mode is left alone).", value: s.leanDispatcher},
                        {type: "switch", id: "quietMembers", name: "Simple member list", note: "Hides game activity lines and nameplates in the member list.", value: s.quietMembers}
                    ]
                },
                {
                    type: "category", id: "experiments", name: "Discord's own speed experiments", collapsible: true, shown: true,
                    settings: [
                        {type: "switch", id: "xpStartupCaches", name: "Faster start-up (keep code and shader caches)", note: "Discord's experiments 2026-04-desktop-tti-v8-cache and 2026-09-desktop-tti-shader-cache. Without these, Discord writes 'clear the caches' back into its settings every time it connects, undoing any manual tweak.", value: s.xpStartupCaches},
                        {type: "switch", id: "xpVoiceCpu", name: "Lighter calls and stages", note: "2026-10-desktop-general-perf: the voice engine skips audio-delay analysis during silence, game detection uses the cheaper scan, and the log file stays open instead of being reopened for every line.", value: s.xpVoiceCpu},
                        {type: "switch", id: "xpGamePerf", name: "Lighter while gaming", note: "2026-10-desktop-game-perf: native CPU stats, the overlay only animates itself and pauses hidden voice waves, popups over fullscreen games are occluded, notification icons drawn on a cheap canvas.", value: s.xpGamePerf},
                        {type: "switch", id: "xpLazyImages", name: "Lazy-load every image", note: "2026-02-lazy-load-all-images: images in chat load only when they're about to scroll into view, so busy channels open faster.", value: s.xpLazyImages},
                        {type: "switch", id: "xpTypingDots", name: "Simple typing dots", note: "2026-07-typing-users-css-dots: the 'is typing' dots are drawn with plain CSS instead of an animation player.", value: s.xpTypingDots},
                        {type: "switch", id: "xpRivePerf", name: "Faster animated graphics", note: "2026-08-rive-web-perf: Discord's performance fixes for its Rive animation player.", value: s.xpRivePerf},
                        {type: "switch", id: "xpNativeMarkdown", name: "Native message formatting (experimental)", note: "2025-04-native-markdown: formats messages with Discord's new native parser instead of the JavaScript one. Faster, but still in testing; turn off if formatting looks wrong.", value: s.xpNativeMarkdown}
                    ]
                },
                {
                    type: "category", id: "app", name: "Discord app tuning (takes effect next start)", collapsible: true, shown: true,
                    settings: [
                        {type: "switch", id: "keepCodeCache", name: "Keep compiled code between starts", note: "Out of the box, Discord deletes its compiled JavaScript cache every time it starts, so it recompiles its whole app on each launch. This stops that, for a faster start. (Discord's own hidden setting DESKTOP_TTI_REMOVE_V8_CACHE_CLEAR.)", value: s.keepCodeCache},
                        {type: "switch", id: "keepShaderCache", name: "Keep graphics shaders between starts", note: "Discord also wipes its GPU shader cache on every start, which causes stutter for the first minute while shaders recompile. This keeps them. (DESKTOP_TTI_REMOVE_SHADER_CACHE_CLEAR.)", value: s.keepShaderCache},
                        {type: "switch", id: "fastGameScan", name: "Faster game detection", note: "Uses Discord's newer, cheaper way of scanning running programs for games. (DESKTOP_PROCESS_POLLING_PERF.)", value: s.fastGameScan},
                        {type: "switch", id: "quietVoiceLog", name: "Turn off voice debug logging", note: "Discord's voice engine writes a debug log during every call and stage by default. This switches it off. (debugLogging.)", value: s.quietVoiceLog}
                    ]
                },
                {
                    type: "category", id: "background", name: "When Discord is in the background", collapsible: true, shown: true,
                    settings: [
                        {type: "switch", id: "pauseInBackground", name: "Pause animations and GIFs", note: "When Discord is minimised or you're in another window, animations stop and GIFs in chat pause. Calls, streams and stages keep playing.", value: s.pauseInBackground},
                        {type: "slider", id: "backgroundDelay", name: "Pause after", min: 1, max: 60, step: 1, units: "s", value: s.backgroundDelay, markers: [1, 5, 15, 30, 60]},
                        {type: "switch", id: "freeMemory", name: "Free memory when you're away", note: "Asks Discord to release memory it isn't using. At most once every 10 minutes.", value: s.freeMemory},
                        {type: "slider", id: "freeMemoryAfter", name: "Free memory after", min: 1, max: 30, step: 1, units: " min", value: s.freeMemoryAfter, markers: [1, 2, 5, 10, 30]}
                    ]
                },
                {
                    type: "category", id: "always", name: "All the time", collapsible: true, shown: true,
                    settings: [
                        {type: "switch", id: "liteEffects", name: "Turn off blur effects", note: "Frosted-glass blur is the most expensive effect to draw. Popups and menus get a plain dark backdrop instead.", value: s.liteEffects},
                        {type: "switch", id: "reduceMotion", name: "No animations", note: "Everything appears instantly. Saves the most, but Discord feels less smooth.", value: s.reduceMotion},
                        {type: "switch", id: "smartRendering", name: "Skip drawing off-screen messages (experimental)", note: "Big channels scroll more smoothly. If messages jump while scrolling, turn this off.", value: s.smartRendering},
                        {type: "switch", id: "hideClutter", name: "Hide shop and upsells", note: "Hides Nitro, Shop and Quests links, the gift button and the apps button.", value: s.hideClutter},
                        {type: "switch", id: "hideActiveNow", name: "Hide Active Now", note: "Hides the activity column on the Friends page.", value: s.hideActiveNow}
                    ]
                },
                {
                    type: "category", id: "updates", name: "Updates", collapsible: true, shown: false,
                    settings: [
                        {type: "switch", id: "autoUpdate", name: "Check for updates", note: "When Discord starts, LighthouseBoost checks GitHub for a newer version and asks before installing it.", value: s.autoUpdate},
                        {type: "button", id: "checkNow", name: "Check now", note: `You have v${this.meta.version}.`, children: "Check for updates", onClick: () => this.checkForUpdate(true)}
                    ]
                }
            ],
            onChange: (category, id, value) => {
                if (!(id in DEFAULTS)) return;
                this.settings[id] = value;
                this.save();
            }
        });
    }
};
