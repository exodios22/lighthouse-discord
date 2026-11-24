/**
 * @name LighthouseBoost
 * @author Lighthouse
 * @description Makes Discord lighter: pauses animations and GIFs while Discord is in the background, frees memory when you're away, turns off costly blur effects, and can hide clutter. Works with any theme.
 * @version 1.0.0
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
    autoUpdate: true
};

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
html.lb-no-active-now [class*='nowPlayingColumn_'] { display: none !important; }`
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
        document.documentElement.classList.remove("lb-paused", "lb-lite", "lb-still", "lb-smart", "lb-tidy", "lb-no-active-now");
        this.api.DOM.removeStyle(STYLE_ID);
    }

    save() {
        this.api.Data.save("settings", this.settings);
        this.applyClasses();
        this.scheduleBackground();
    }

    applyClasses() {
        const c = document.documentElement.classList, s = this.settings;
        c.toggle("lb-lite", s.liteEffects);
        c.toggle("lb-still", s.reduceMotion);
        c.toggle("lb-smart", s.smartRendering);
        c.toggle("lb-tidy", s.hideClutter);
        c.toggle("lb-no-active-now", s.hideActiveNow);
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
        return h("div", {style: box},
            h("span", {style: stat}, "Memory: ", h("b", null, mem ? mb(mem) : "unknown")),
            h("span", {style: stat}, "Frame rate: ", h("b", null, fps ? `${fps} fps` : "…")),
            h("button", {type: "button", style: btn, onClick: () => this.freeMemory(true).then(() => setTimeout(() => setMem(this.memoryKB()), 1600))}, "Free memory now"));
    }

    getSettingsPanel() {
        const s = this.settings;
        const React = BdApi.React;
        const Stats = () => this.Stats();
        return BdApi.UI.buildSettingsPanel({
            settings: [
                {type: "custom", id: "stats", name: "Right now", note: "Memory is the main Discord window. Frame rate is measured while this window is open.", children: React.createElement(Stats)},
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
