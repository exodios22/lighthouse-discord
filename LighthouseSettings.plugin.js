/**
 * @name LighthouseSettings
 * @author Lighthouse
 * @description Settings and features for the Lighthouse theme: colourways (incl. Daylight light mode), command palette, focus mode, server overview card, unread pill, auto-collapsing sidebars, per-server / per-channel / time-of-day accents, hover glow, settings profiles and accessibility mode. Needs the Lighthouse theme enabled.
 * @version 3.6.0
 */

const COLOURWAYS = {
    simforge: {
        label: "SimForge", light: false, swatch: ["#0f1828", "#ffab4c", "#ffc75e"],
        vars: {"--lh-1": "#ffd9a8", "--lh-2": "#ffab4c", "--lh-4": "#ffbb6b", "--lh-5": "#f0953a", "--lh-b": "#ffc75e", "--lh-on-accent": "#1d1206", "--lh-base": "#0a111d", "--lh-panel": "#0f1828", "--lh-raised": "#152034", "--lh-tint": "140 170 220", "--text-1": "#f3f6fa", "--text-2": "#e3e9f2", "--text-3": "#c9d2df", "--text-4": "#93a0b5", "--text-5": "#8190a6"}
    },
    daylight: {
        label: "Daylight", light: true, swatch: ["#fffaf1", "#d9822b", "#f0b03f"],
        vars: {"--lh-1": "#9a5200", "--lh-2": "#d9822b", "--lh-4": "#e5933f", "--lh-5": "#c06f1c", "--lh-b": "#f0b03f", "--lh-on-accent": "#1d1206", "--lh-base": "#efe7d8", "--lh-panel": "#fffaf1", "--lh-raised": "#ffffff", "--lh-tint": "120 90 50", "--text-1": "#1c1712", "--text-2": "#2a231b", "--text-3": "#3a3127", "--text-4": "#5f5345", "--text-5": "#6a5d4e"}
    },
    ember: {
        label: "Ember", light: false, swatch: ["#1a1411", "#ff8a3d", "#ff4d6d"],
        vars: {"--lh-1": "#ffc79e", "--lh-2": "#ff8a3d", "--lh-4": "#ff9d5c", "--lh-5": "#e8772c", "--lh-b": "#ff4d6d", "--lh-on-accent": "#1a0f08", "--lh-base": "#0d0907", "--lh-panel": "#1a1411", "--lh-raised": "#221a16", "--lh-tint": "255 180 140", "--text-1": "#f8f1ec", "--text-2": "#efe4db", "--text-3": "#dccfc5", "--text-4": "#a8988c", "--text-5": "#918174"}
    },
    aurora: {
        label: "Aurora", light: false, swatch: ["#11121c", "#8b7cff", "#50c8ff"],
        vars: {"--lh-1": "#d6d0ff", "--lh-2": "#8b7cff", "--lh-4": "#9d90ff", "--lh-5": "#7466e8", "--lh-b": "#50c8ff", "--lh-on-accent": "#0b0b14", "--lh-base": "#07080d", "--lh-panel": "#11121c", "--lh-raised": "#1a1b27", "--lh-tint": "170 160 255", "--text-1": "#f1f2fa", "--text-2": "#e2e4f2", "--text-3": "#cdd0e2", "--text-4": "#9599b3", "--text-5": "#848aa6"}
    },
    glacier: {
        label: "Glacier", light: false, swatch: ["#0f161e", "#7dd3fc", "#5eead4"],
        vars: {"--lh-1": "#cdeffe", "--lh-2": "#7dd3fc", "--lh-4": "#98ddfd", "--lh-5": "#5cc0ee", "--lh-b": "#5eead4", "--lh-on-accent": "#06121a", "--lh-base": "#060b0f", "--lh-panel": "#0f161e", "--lh-raised": "#16202b", "--lh-tint": "150 210 250", "--text-1": "#eef6fb", "--text-2": "#dceaf3", "--text-3": "#c4d6e2", "--text-4": "#8ba2b3", "--text-5": "#7b93a5"}
    },
    sakura: {
        label: "Sakura", light: false, swatch: ["#1b1319", "#ff7ab6", "#ffb38a"],
        vars: {"--lh-1": "#ffd0e5", "--lh-2": "#ff7ab6", "--lh-4": "#ff93c4", "--lh-5": "#e8609f", "--lh-b": "#ffb38a", "--lh-on-accent": "#1a0a12", "--lh-base": "#0e080c", "--lh-panel": "#1b1319", "--lh-raised": "#251a22", "--lh-tint": "255 170 210", "--text-1": "#fbf0f5", "--text-2": "#f3e2ea", "--text-3": "#e2cdd7", "--text-4": "#b095a3", "--text-5": "#a08595"}
    },
    toxic: {
        label: "Toxic", light: false, swatch: ["#111512", "#c6f432", "#2dd4bf"],
        vars: {"--lh-1": "#ebffad", "--lh-2": "#c6f432", "--lh-4": "#d3f75f", "--lh-5": "#aedb1f", "--lh-b": "#2dd4bf", "--lh-on-accent": "#0b1006", "--lh-base": "#070907", "--lh-panel": "#111512", "--lh-raised": "#182019", "--lh-tint": "200 240 150", "--text-1": "#f2f7ee", "--text-2": "#e3eddc", "--text-3": "#cdd9c6", "--text-4": "#93a38c", "--text-5": "#84957d"}
    },
    mono: {
        label: "Mono", light: false, swatch: ["#141414", "#ededed", "#9ca3af"],
        vars: {"--lh-1": "#ffffff", "--lh-2": "#ededed", "--lh-4": "#ffffff", "--lh-5": "#cfcfcf", "--lh-b": "#9ca3af", "--lh-on-accent": "#0a0a0a", "--lh-base": "#080808", "--lh-panel": "#141414", "--lh-raised": "#1c1c1c", "--lh-tint": "255 255 255", "--text-1": "#f5f5f5", "--text-2": "#e8e8e8", "--text-3": "#d2d2d2", "--text-4": "#9a9a9a", "--text-5": "#8a8a8a"}
    },
    leonida: {
        label: "Leonida", light: false, swatch: ["#16122b", "#ff5c9d", "#ffa04a"],
        vars: {"--lh-1": "#ffc6de", "--lh-2": "#ff5c9d", "--lh-4": "#ff7bb1", "--lh-5": "#e8458a", "--lh-b": "#ffa04a", "--lh-on-accent": "#1c0712", "--lh-base": "#0b0918", "--lh-panel": "#16122b", "--lh-raised": "#201a3b", "--lh-tint": "205 160 255", "--text-1": "#f8f2fb", "--text-2": "#ece3f4", "--text-3": "#d8cbe6", "--text-4": "#a596bb", "--text-5": "#9385ab"}
    }
};

const FONTS = {
    manrope: {label: "Manrope", css: "'Manrope'"},
    jakarta: {label: "Plus Jakarta Sans", css: "'Plus Jakarta Sans'"},
    inter: {label: "Inter", css: "'Inter'"},
    rockstar: {label: "Rockstar (Chalet, GTA V menus)", css: "'Chalet London Nineteen Sixty', 'ChaletLondonNineteenSixty', 'Chalet-LondonNineteenSixty', 'Chalet', 'Archivo'"},
    discord: {label: "Discord default", css: "''"}
};

const CHANNEL_ACCENTS = [
    {name: "Amber", hex: "#ffab4c"}, {name: "Gold", hex: "#f5c04a"}, {name: "Coral", hex: "#e88a95"},
    {name: "Rose", hex: "#ff7ab6"}, {name: "Violet", hex: "#a58bff"}, {name: "Periwinkle", hex: "#8b9cf0"},
    {name: "Sky", hex: "#7dd3fc"}, {name: "Teal", hex: "#6ccfb0"}, {name: "Lime", hex: "#c6f432"}
];

const DEFAULTS = {
    colourway: "simforge",
    motion: true,
    a11y: false,
    customAccent: false,
    accent: "#ffab4c",
    accent2: "#ffc75e",
    serverAccent: false,
    timeOfDay: false,
    focusMode: true,
    collapse: false,
    palette: true,
    paletteKey: "ctrlk",
    dashCard: true,
    unreadPill: true,
    glow: true,
    titleSearch: true,
    colourDot: true,
    nowPlaying: true,
    cheatSheet: true,
    friendsBanner: true,
    autoUpdate: true,
    iconSet: true,
    bannerGlow: true,
    calmRoles: true,
    roundWindow: true,
    splashTheme: true,
    windowRadius: 12,
    healthCheck: true,
    whatsNew: true,
    notes: true,
    bookmarks: true,
    spotifyControls: true,
    winButtons: "minimal",
    dashHeader: true,
    bubbles: true,
    compact: false,
    tintOwn: true,
    codeBlocks: true,
    serverBar: "top",
    filledChannel: true,
    gap: 12,
    avatarRadius: 26,
    panelRadius: 18,
    bodyFont: "manrope",
    displayFont: "bricolage"
};
const SETTING_KEYS = Object.keys(DEFAULTS);

// raw address of this plugin in the Lighthouse GitHub repo (empty = no update checks)
const UPDATE_URL = "https://raw.githubusercontent.com/exodios22/lighthouse-discord/main/LighthouseSettings.plugin.js";

const PAGES_URL = "https://exodios22.github.io/lighthouse-discord";

const STYLE_ID = "lighthouse-settings-overrides";
const FEATURE_STYLE_ID = "lighthouse-features";
const OWN_STYLE_ID = "lighthouse-own-messages";
const TIME_STYLE_ID = "lighthouse-time-of-day";
const SERVER_STYLE_ID = "lighthouse-server-accent";
const CHANNEL_STYLE_ID = "lighthouse-channel-accent";

const GLOW_TARGETS = ".sidebarList_pog62O, .messagesWrapper_8AE1Qq, .container_86es0b, .subtitleContainer_z_gUBg, .panels_pog62O, .channelTextArea_z_gUBg";

const onOff = v => (v ? "on" : "off");
const toHex = v => (typeof v === "number" ? "#" + v.toString(16).padStart(6, "0") : String(v));
const safe = fn => { try { return fn(); } catch (e) { return undefined; } };
const getStore = name => safe(() => BdApi.Webpack.getStore(name));

/* ---------- colour helpers ---------- */
function hexToRgb(hex) {
    const m = String(hex).replace("#", "").match(/^([0-9a-f]{6})$/i);
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
    }
    return [h, s, l];
}
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const hsl = (h, s, l) => `hsl(${Math.round(((h % 360) + 360) % 360)} ${Math.round(clamp(s, 0, 1) * 100)}% ${Math.round(clamp(l, 0, 1) * 100)}%)`;
function mixHex(a, b, t) {
    const x = hexToRgb(a), y = hexToRgb(b);
    if (!x || !y) return a;
    return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
}
/* accent family from a hue/saturation pair */
function accentVars(h, s, light) {
    const L = light ? 0.5 : 0.66;
    return {
        "--lh-2": hsl(h, s, L),
        "--lh-4": hsl(h, s, L + 0.06),
        "--lh-5": hsl(h, s, L - 0.08),
        "--lh-1": light ? hsl(h, s, 0.32) : hsl(h, Math.min(1, s + 0.05), 0.84),
        "--lh-b": hsl(h + 28, s, light ? 0.55 : 0.7)
    };
}
const declare = (sel, obj) => `${sel} {\n${Object.entries(obj).map(([k, v]) => `    ${k}: ${v};`).join("\n")}\n}\n`;

/* most prominent vivid hue in an image; null for grey/monochrome icons */
function sampleAccent(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            try {
                const size = 40;
                const canvas = document.createElement("canvas");
                canvas.width = canvas.height = size;
                const ctx = canvas.getContext("2d", {willReadFrequently: true});
                ctx.drawImage(img, 0, 0, size, size);
                const data = ctx.getImageData(0, 0, size, size).data;
                const bins = new Array(36).fill(0), hueSum = new Array(36).fill(0), satSum = new Array(36).fill(0);
                let total = 0;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] < 200) continue;
                    const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
                    if (s < 0.25 || l < 0.15 || l > 0.9) continue;
                    const w = s * (1 - Math.abs(l - 0.55));
                    const bin = Math.floor(h / 10) % 36;
                    bins[bin] += w; hueSum[bin] += h * w; satSum[bin] += s * w; total += w;
                }
                if (total < 12) return resolve(null);
                let best = 0, bestScore = -1;
                for (let i = 0; i < 36; i++) {
                    const score = bins[i] + 0.5 * (bins[(i + 35) % 36] + bins[(i + 1) % 36]);
                    if (score > bestScore) { bestScore = score; best = i; }
                }
                resolve({h: hueSum[best] / bins[best], s: clamp(satSum[best] / bins[best], 0.62, 0.92)});
            } catch (e) { reject(e); }
        };
        img.onerror = reject;
        img.src = src.replace(/size=\d+/, "size=64");
    });
}

/* ---------- small DOM helpers ---------- */
function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
        if (k === "class") node.className = v;
        else if (k.startsWith("on")) node.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) if (c !== null && c !== undefined) node.append(c);
    return node;
}
const svgIcon = path => {
    const wrap = document.createElement("span");
    wrap.className = "lh-ico";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
    return wrap;
};
const ICONS = {
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    server: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12h8"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    palette: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    note: '<path d="M14.5 3.5H7A3.5 3.5 0 0 0 3.5 7v10A3.5 3.5 0 0 0 7 20.5h10a3.5 3.5 0 0 0 3.5-3.5V9.5z"/><path d="M14.5 3.5v6h6M8 13h8M8 16.5h5"/>',
    bookmark: '<path d="M6 3.5h12v17l-6-4-6 4z"/>',
    prev: '<path d="M6 5v14M19 5 9 12l10 7z"/>',
    next: '<path d="M18 5v14M5 5l10 7-10 7z"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'
};

module.exports = class LighthouseSettings {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(meta.name);
        this.accentCache = new Map();
        this.onKey = this.onKey.bind(this);
        this.onPointer = this.onPointer.bind(this);
        this.tick = this.tick.bind(this);
    }

    /* ================= lifecycle ================= */
    load() {
        const saved = this.api.Data.load("settings") || {};
        if (saved.colourway === "lighthouse") saved.colourway = "simforge";
        this.settings = Object.assign({}, DEFAULTS, saved);
        this.profiles = this.api.Data.load("profiles") || {};
        this.notesData = this.api.Data.load("notes") || {};
        this.bookmarksData = this.api.Data.load("bookmarks") || [];
        this.channelAccents = this.api.Data.load("channelAccents") || {};
    }

    start() {
        if (!this.settings) this.load();
        this.api.DOM.addStyle(FEATURE_STYLE_ID, FEATURE_CSS);
        this.apply();
        document.addEventListener("keydown", this.onKey, true);
        this.tickTimer = setInterval(this.tick, 800);
        this.timeTimer = setInterval(() => this.applyTimeOfDay(), 5 * 60 * 1000);
        this.patchContextMenu();
        this.refreshFeatures();
        this.updateTimer = setTimeout(() => this.checkForUpdate(false), 15000);
        this.healthTimer = setTimeout(() => this.runHealthCheck(false), 25000);
        this.newsTimer = setTimeout(() => this.showWhatsNew(false), 6000);
        this.splashTimer = setTimeout(() => this.writeSplash(), 20000);
        this.splashInterval = setInterval(() => this.writeSplash(), 30000);
    }

    stop() {
        for (const id of [STYLE_ID, FEATURE_STYLE_ID, OWN_STYLE_ID, TIME_STYLE_ID, SERVER_STYLE_ID, CHANNEL_STYLE_ID]) this.api.DOM.removeStyle(id);
        document.removeEventListener("keydown", this.onKey, true);
        document.removeEventListener("pointermove", this.onPointer, true);
        clearInterval(this.tickTimer);
        clearInterval(this.timeTimer);
        safe(() => this.unpatchMenu && this.unpatchMenu());
        document.body.classList.remove("lh-focus");
        document.documentElement.classList.remove("lh-round", "lh-maximised");
        if (this.onResize) { window.removeEventListener("resize", this.onResize); this.onResize = null; }
        document.documentElement.style.removeProperty("--lh-window-radius");
        this.closePalette();
        document.querySelectorAll(".lh-dash-card, .lh-unread-pill, .lh-glow-ring, .lh-titlebar-search, .lh-colour-dot, .lh-swatch-pop, .lh-now-playing, .lh-friends-banner, .lh-cheatsheet, .lh-notes-btn, .lh-notes, .lh-news").forEach(n => n.remove());
        clearTimeout(this.updateTimer);
        clearTimeout(this.healthTimer);
        clearTimeout(this.newsTimer);
        clearTimeout(this.splashTimer);
        clearTimeout(this.splashDebounce);
        clearInterval(this.splashInterval);
        this.closeNotes();
        this.closeNews();
        document.querySelectorAll('.lh-notes-btn').forEach(n => n.remove());
        safe(() => this.unpatchMsgMenu && this.unpatchMsgMenu());
        const sl = document.querySelector('.sidebarList_pog62O'); if (sl) sl.style.removeProperty('--lh-banner');
        this.glowRing = null;
        this.lastGuild = this.lastChannel = undefined;
    }

    save() {
        this.api.Data.save("settings", this.settings);
    }

    set(id, value) {
        this.settings[id] = value;
        this.save();
        this.apply();
        this.refreshFeatures();
    }

    /* re-run everything that depends on settings */
    refreshFeatures() {
        if (!this.settings.focusMode) document.body.classList.remove("lh-focus");
        document.removeEventListener("pointermove", this.onPointer, true);
        if (this.settings.glow && !this.settings.a11y) document.addEventListener("pointermove", this.onPointer, {capture: true, passive: true});
        else if (this.glowRing) this.glowRing.remove();
        this.applyOwnMessages();
        this.applyTimeOfDay();
        this.lastGuild = this.lastChannel = undefined; // force accent re-check
        if (!this.settings.serverAccent) this.api.DOM.removeStyle(SERVER_STYLE_ID);
        if (!this.settings.dashCard) document.querySelectorAll(".lh-dash-card").forEach(n => n.remove());
        if (!this.settings.unreadPill) document.querySelectorAll(".lh-unread-pill").forEach(n => n.remove());
        this.tick();
    }

    /* runs every 0.8 s: cheap DOM checks only */
    tick() {
        safe(() => this.checkGuild());
        safe(() => this.checkChannelAccent());
        safe(() => this.updateDashboard());
        safe(() => this.updateTitleSearch());
        safe(() => this.updateColourDot());
        safe(() => this.updateNowPlaying());
        safe(() => this.updateFriendsBanner());
        safe(() => this.updateBannerGlow());
        safe(() => this.updateNotesButton());
        if (!this.ownApplied) safe(() => this.applyOwnMessages());
    }

    /* ================= base settings → CSS ================= */
    baseAccentHex() {
        const way = COLOURWAYS[this.settings.colourway] || COLOURWAYS.simforge;
        return this.settings.customAccent ? toHex(this.settings.accent) : way.vars["--lh-2"];
    }

    buildCss() {
        const s = this.settings;
        const way = COLOURWAYS[s.colourway] || COLOURWAYS.simforge;
        const root = Object.assign({}, way.vars);

        if (s.customAccent) {
            const a = toHex(s.accent), b = toHex(s.accent2);
            Object.assign(root, {
                "--lh-2": a,
                "--lh-b": b,
                "--lh-4": `color-mix(in srgb, ${a}, ${way.light ? "black 10%" : "white 15%"})`,
                "--lh-5": `color-mix(in srgb, ${a}, black 12%)`,
                "--lh-1": `color-mix(in srgb, ${a}, ${way.light ? "black 45%" : "white 55%"})`
            });
        }

        if (s.a11y) {
            // stronger text and borders: pull the dim text tones towards the brightest one
            root["--text-3"] = mixHex(way.vars["--text-3"], way.vars["--text-1"], 0.4);
            root["--text-4"] = mixHex(way.vars["--text-4"], way.vars["--text-1"], 0.45);
            root["--text-5"] = mixHex(way.vars["--text-5"], way.vars["--text-1"], 0.45);
            root["--border"] = `rgb(${way.vars["--lh-tint"]} / 0.3)`;
            root["--border-light"] = `rgb(${way.vars["--lh-tint"]} / 0.2)`;
        }

        const display = s.displayFont === "bricolage"
            ? "'Bricolage Grotesque', var(--font), sans-serif"
            : s.displayFont === "pricedown"
                ? "'Pricedown Bl', 'Pricedown', 'Pricedown Black', 'Anton', var(--font), sans-serif"
                : "var(--font), sans-serif";
        const motion = s.motion && !s.a11y;

        const body = {
            "--lh-server-bar": s.serverBar,
            "--lh-bubbles": onOff(s.bubbles),
            "--lh-filled-channel": onOff(s.filledChannel),
            "--lh-dash-header": onOff(s.dashHeader),
            "--lh-collapse": onOff(s.collapse),
            "--lh-compact": onOff(s.compact),
            "--lh-code": onOff(s.codeBlocks),
            "--lh-a11y": onOff(s.a11y),
            "--lh-glow": onOff(s.glow && !s.a11y),
            "--lh-winbuttons": s.winButtons,
            "--lh-icons": onOff(s.iconSet),
            "--lh-banner-glow": onOff(s.bannerGlow),
            "--lh-calm-roles": onOff(s.calmRoles),
            "--custom-window-controls": s.winButtons === "dots" ? "on" : "off",
            "--lh-motion": onOff(motion),
            "--animations": onOff(motion),
            "--gap": `${s.gap}px`,
            "--lh-avatar-radius": `${s.avatarRadius}%`,
            "--lh-radius-lg": `${s.panelRadius}px`,
            "--lh-radius-md": `${Math.max(4, s.panelRadius - 4)}px`,
            "--lh-radius-sm": `${Math.max(4, Math.round(s.panelRadius * 0.55))}px`,
            "--font": (FONTS[s.bodyFont] || FONTS.manrope).css,
            "--lh-display-font": display
        };

        // html:root / html body outrank the theme's :root / body, so these win regardless of load order
        return declare("html:root", root) + declare("html body", body);
    }

    apply() {
        this.api.DOM.removeStyle(STYLE_ID);
        this.api.DOM.addStyle(STYLE_ID, this.buildCss());
        const html = document.documentElement;
        html.classList.toggle("lh-round", !!this.settings.roundWindow);
        html.style.setProperty("--lh-window-radius", `${this.settings.windowRadius}px`);
        if (!this.onResize) {
            this.onResize = () => document.documentElement.classList.toggle("lh-maximised",
                !!window.screen && window.outerWidth >= window.screen.availWidth - 2 && window.outerHeight >= window.screen.availHeight - 2);
            window.addEventListener("resize", this.onResize);
        }
        this.onResize();
        clearTimeout(this.splashDebounce);
        this.splashDebounce = setTimeout(() => this.writeSplash(), 3000);
    }

    /* ================= start-up screen (via OpenAsar) ================= */
    splashCss() {
        const s = this.settings;
        const way = (COLOURWAYS[s.colourway] || COLOURWAYS.simforge).vars;
        const c = k => way[k];
        const display = s.displayFont === "pricedown" ? "'Pricedown Bl', 'Pricedown', 'Anton'"
            : s.displayFont === "bricolage" ? "'Bricolage Grotesque'" : (FONTS[s.bodyFont] || FONTS.manrope).css;
        const body = (FONTS[s.bodyFont] || FONTS.manrope).css;
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>`
            + `<path d='M23 15 32 6l9 9z' fill='${c("--lh-2")}'/>`
            + `<rect x='25' y='15' width='14' height='9' rx='2' fill='${c("--lh-b")}'/>`
            + `<rect x='21' y='24' width='22' height='3' rx='1.5' fill='${c("--text-1")}'/>`
            + `<path d='M25 27h14l4 31H21z' fill='${c("--text-1")}'/>`
            + `<path d='M24.2 34h15.6l.8 6H23.4zM23 46h18l.8 6H22.2z' fill='${c("--lh-2")}'/>`
            + `<rect x='29.5' y='51' width='5' height='7' rx='2.5' fill='${c("--lh-base")}'/>`
            + `<rect x='15' y='58' width='34' height='3' rx='1.5' fill='${c("--text-1")}' opacity='.5'/></svg>`;
        const icon = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
        const tint = c("--lh-tint");
        return `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Anton&family=Manrope:wght@600;700&family=Archivo:wght@600;700&display=swap');
html, body { background: radial-gradient(130% 90% at 50% 0%, ${c("--lh-raised")} 0%, ${c("--lh-panel")} 45%, ${c("--lh-base")} 100%) !important; }
body { position: relative; overflow: hidden; }
video { display: none !important; }
body::before {
    content: 'Lighthouse'; display: block; padding-top: 104px; margin-bottom: 16px;
    background: ${icon} top center / 92px 92px no-repeat;
    font: 800 30px/1 ${display}, sans-serif; letter-spacing: -.01em; color: ${c("--text-1")};
    filter: drop-shadow(0 0 22px rgb(from ${c("--lh-b")} r g b / .35));
    position: relative; z-index: 1;
}
body::after {
    content: ''; position: fixed; left: 50%; top: 96px; width: 560px; height: 560px; margin: -280px 0 0 -280px; z-index: 0; pointer-events: none;
    background: conic-gradient(from 0deg, transparent 0deg 300deg, rgb(from ${c("--lh-b")} r g b / .0) 300deg, rgb(from ${c("--lh-b")} r g b / .32) 345deg, transparent 360deg);
    -webkit-mask: radial-gradient(circle, #000 0 8%, rgb(0 0 0 / .6) 30%, transparent 62%);
    animation: lh-beam 3.2s linear infinite;
}
@keyframes lh-beam { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { body::after { animation: none; } }
#text, body > div:not([id]) {
    position: relative; z-index: 1; font: 700 12px/1.4 ${body}, sans-serif !important; font-style: normal !important;
    letter-spacing: .12em; text-transform: uppercase; color: ${c("--text-4")} !important;
}
#barContainer { position: relative; z-index: 1; width: 170px !important; height: 6px !important; border-radius: 999px !important; background: rgb(${tint} / .14) !important; overflow: hidden; }
#barFill { height: 6px !important; border-radius: 999px !important; background: linear-gradient(90deg, ${c("--lh-2")}, ${c("--lh-b")}) !important; box-shadow: 0 0 12px ${c("--lh-2")}; }
button, [role='button'], #skip, #quit, a {
    position: relative; z-index: 1; -webkit-app-region: no-drag; cursor: pointer !important;
    background: rgb(${tint} / .08) !important; color: ${c("--text-3")} !important; border: 1px solid rgb(${tint} / .16) !important;
    border-radius: 999px !important; padding: 4px 12px !important; font: 700 11px ${body}, sans-serif !important; text-decoration: none !important;
}
button:hover, [role='button']:hover, #skip:hover, #quit:hover, a:hover { background: ${c("--lh-2")} !important; color: ${c("--lh-on-accent")} !important; border-color: transparent !important; }
#debug { color: ${c("--text-5")} !important; z-index: 1; }`;
    }

    async writeSplash() {
        const cache = safe(() => window.DiscordNative.userDataCache);
        if (!cache || typeof cache.getCached !== "function" || typeof cache.cacheUserData !== "function") return;
        try {
            const cached = (await cache.getCached()) || {};
            if (!this.settings.splashTheme) {
                if (cached.lighthouseSplash) { delete cached.openasarSplashCSS; delete cached.lighthouseSplash; cache.cacheUserData(JSON.stringify(cached)); }
                return;
            }
            const css = this.splashCss();
            if (cached.openasarSplashCSS === css) return;
            cached.openasarSplashCSS = css;
            cached.lighthouseSplash = true;
            cache.cacheUserData(JSON.stringify(cached));
        } catch (e) { /* splash theming is a nice-to-have */ }
    }

    /* ================= your own messages ================= */
    currentUserId() {
        const fromStore = safe(() => getStore("UserStore").getCurrentUser().id);
        if (fromStore) return fromStore;
        const img = document.querySelector('.panels_pog62O img[src*="/avatars/"]');
        const m = img && img.src.match(/\/avatars\/(\d+)\//);
        return m ? m[1] : null;
    }

    applyOwnMessages() {
        this.api.DOM.removeStyle(OWN_STYLE_ID);
        this.ownApplied = true;
        if (!this.settings.tintOwn) return;
        const id = this.currentUserId();
        if (!id) { this.ownApplied = false; return; } // try again on the next tick
        const li = 'li[id^="chat-messages-"]';
        // your message group starts with your avatar (reply previews use a different class, so they don't count)
        const head = `${li}:has(img[class*="avatar_"][src*="/avatars/${id}/"])`;
        const next = ` + ${li}:not(:has([class*="groupStart"]))`;
        const groups = [];
        for (let n = 0; n <= 12; n++) groups.push(head + next.repeat(n));
        const bubble = ' [id^="message-content-"]:not([class*="repliedTextContent"])';
        const css = `${groups.map(g => g + bubble).join(",\n")} {
    background: color-mix(in srgb, var(--lh-2) 12%, transparent) !important;
    border-color: color-mix(in srgb, var(--lh-2), transparent 55%) !important;
}`;
        this.api.DOM.addStyle(OWN_STYLE_ID, css);
    }

    /* ================= time-of-day accent ================= */
    applyTimeOfDay() {
        this.api.DOM.removeStyle(TIME_STYLE_ID);
        if (!this.settings.timeOfDay) return;
        const rgb = hexToRgb(this.baseAccentHex());
        if (!rgb) return;
        const [h, s] = rgbToHsl(...rgb);
        const now = new Date();
        const t = (now.getHours() * 60 + now.getMinutes()) / 1440;
        // +1 at 21:00 (warmest), -1 at 09:00 (coolest), smooth in between
        const warmth = Math.cos(2 * Math.PI * (t - 0.875));
        const way = COLOURWAYS[this.settings.colourway] || COLOURWAYS.simforge;
        const vars = accentVars(h - 10 * warmth, clamp(s + 0.06 * warmth, 0.45, 0.95), way.light);
        this.api.DOM.addStyle(TIME_STYLE_ID, declare("html:root:root", vars));
    }

    /* ================= per-server accent ================= */
    checkGuild() {
        if (!this.settings.serverAccent) return;
        const node = document.querySelector('[data-list-item-id^="guildsnav___"][aria-selected="true"]');
        const id = node ? node.getAttribute("data-list-item-id").slice(12) : "none";
        if (id === this.lastGuild) return;
        this.lastGuild = id;
        const img = node && node.querySelector("img");
        if (!img || !img.src) return this.setServerAccent(null);
        if (this.accentCache.has(id)) return this.setServerAccent(this.accentCache.get(id));
        sampleAccent(img.src)
            .then(c => { this.accentCache.set(id, c); if (this.lastGuild === id) this.setServerAccent(c); })
            .catch(() => { this.accentCache.set(id, null); if (this.lastGuild === id) this.setServerAccent(null); });
    }

    setServerAccent(c) {
        this.api.DOM.removeStyle(SERVER_STYLE_ID);
        if (!c) return; // DMs, grey icons, no icon: keep the colourway accent
        const way = COLOURWAYS[this.settings.colourway] || COLOURWAYS.simforge;
        this.api.DOM.addStyle(SERVER_STYLE_ID, declare("html:root:root:root", accentVars(c.h, c.s, way.light)));
    }

    /* ================= per-channel accent ================= */
    currentChannelId() {
        const parts = location.pathname.split("/");
        return parts[1] === "channels" ? parts[3] : null;
    }

    checkChannelAccent() {
        const id = this.currentChannelId();
        if (id === this.lastChannel) return;
        this.lastChannel = id;
        this.api.DOM.removeStyle(CHANNEL_STYLE_ID);
        const hex = id && this.channelAccents[id];
        const rgb = hex && hexToRgb(hex);
        if (!rgb) return;
        const [h, s] = rgbToHsl(...rgb);
        const way = COLOURWAYS[this.settings.colourway] || COLOURWAYS.simforge;
        this.api.DOM.addStyle(CHANNEL_STYLE_ID, declare("html:root:root:root:root", accentVars(h, clamp(s, 0.5, 0.95), way.light)));
    }

    setChannelAccent(channelId, hex) {
        if (hex) this.channelAccents[channelId] = hex;
        else delete this.channelAccents[channelId];
        this.api.Data.save("channelAccents", this.channelAccents);
        this.lastChannel = undefined;
        this.checkChannelAccent();
    }

    patchContextMenu() {
        safe(() => {
            this.unpatchMsgMenu = BdApi.ContextMenu.patch("message", (tree, props) => {
                const msg = props && (props.message || (props.target && props.target.message));
                const channel = (props && props.channel) || (msg && safe(() => BdApi.Webpack.getStore("ChannelStore").getChannel(msg.channel_id)));
                if (!this.settings.bookmarks || !tree || !tree.props) return;
                if (!msg || !msg.id || !channel) return;
                const saved = this.bookmarksData.some(b => b.id === msg.id);
                const item = BdApi.ContextMenu.buildItem({
                    label: saved ? "Remove from Lighthouse bookmarks" : "Save to Lighthouse bookmarks",
                    id: "lighthouse-bookmark",
                    action: () => saved ? this.removeBookmark(msg.id) : this.addBookmark(msg, channel)
                });
                const anchors = ["copy-text", "translate", "bookmark", "mark-unread", "copy-link"];
                const isAnchor = c => c && c.props && anchors.includes(c.props.id);
                const hasAnchor = arr => Array.isArray(arr) && arr.some(c => isAnchor(c) || (c && c.props && Array.isArray(c.props.children) && c.props.children.some(isAnchor)));
                const group = safe(() => BdApi.Utils.findInTree(tree, n => n && hasAnchor(n.children), {walkable: ["props", "children"]}));
                if (group && Array.isArray(group.children)) {
                    const inner = group.children.find(c => c && c.props && Array.isArray(c.props.children) && c.props.children.some(isAnchor));
                    const list = inner ? inner.props.children : group.children;
                    const at = list.findIndex(c => c && c.props && /bookmark/.test(String(c.props.id)));
                    at >= 0 ? list.splice(at + 1, 0, item) : list.push(item);
                    return;
                }
                const kids = tree.props.children;
                if (Array.isArray(kids)) kids.push(item);
                else tree.props.children = [kids, item];
            });
        });
        safe(() => {
            this.unpatchMenu = BdApi.ContextMenu.patch("channel-context", (tree, props) => {
                const channel = props && props.channel;
                if (!channel || !tree || !tree.props) return;
                const current = this.channelAccents[channel.id];
                const item = BdApi.ContextMenu.buildItem({
                    type: "submenu",
                    label: "Lighthouse accent",
                    id: "lighthouse-accent",
                    items: [
                        ...CHANNEL_ACCENTS.map(c => ({
                            type: "toggle",
                            label: c.name,
                            id: "lighthouse-accent-" + c.name.toLowerCase(),
                            checked: current === c.hex,
                            action: () => this.setChannelAccent(channel.id, c.hex)
                        })),
                        {type: "separator"},
                        {label: "Use the normal accent", id: "lighthouse-accent-clear", action: () => this.setChannelAccent(channel.id, null)}
                    ]
                });
                const kids = tree.props.children;
                if (Array.isArray(kids)) kids.push(item);
                else tree.props.children = [kids, item];
            });
        });
    }

    /* ================= focus mode + palette keys ================= */
    onKey(e) {
        if (this.passThroughK) return;
        const s = this.settings;
        if (s.focusMode && e.ctrlKey && e.shiftKey && !e.altKey && e.code === "KeyF") {
            e.preventDefault(); e.stopPropagation();
            this.toggleFocus();
            return;
        }
        if (s.cheatSheet && e.ctrlKey && e.shiftKey && !e.altKey && (e.code === "Slash" || e.key === "?")) {
            e.preventDefault(); e.stopPropagation();
            this.cheatEl ? this.closeCheatSheet() : this.openCheatSheet();
            return;
        }
        if (e.key === "Escape" && this.cheatEl) { e.preventDefault(); e.stopPropagation(); this.closeCheatSheet(); return; }
        if (e.key === "Escape" && this.swatchPop) { e.preventDefault(); e.stopPropagation(); this.closeSwatches(); return; }
        if (s.palette) {
            const hit = s.paletteKey === "ctrlk"
                ? (e.ctrlKey && !e.shiftKey && !e.altKey && e.code === "KeyK")
                : (e.ctrlKey && e.shiftKey && !e.altKey && e.code === "KeyK");
            if (hit) {
                e.preventDefault(); e.stopPropagation();
                this.paletteEl ? this.closePalette() : this.openPalette();
            }
        }
    }

    toggleFocus() {
        const on = document.body.classList.toggle("lh-focus");
        BdApi.UI.showToast(on ? "Focus mode on — Ctrl+Shift+F to leave" : "Focus mode off", {type: "info"});
    }

    /* ================= card hover glow =================
       A ring element is moved into whichever card the mouse is over; only that
       card's border lights up near the cursor, and it fades out on leaving. */
    onPointer(e) {
        if (this.glowFrame) return;
        const x = e.clientX, y = e.clientY, target = e.target;
        this.glowFrame = requestAnimationFrame(() => {
            this.glowFrame = null;
            const card = target && target.closest ? target.closest(GLOW_TARGETS) : null;
            if (!this.glowRing) this.glowRing = el("div", {class: "lh-glow-ring", "aria-hidden": "true"});
            const ring = this.glowRing;
            if (!card) { ring.classList.remove("lh-on"); return; }
            if (ring.parentElement !== card) {
                ring.classList.remove("lh-on");
                if (getComputedStyle(card).position === "static") card.style.position = "relative";
                card.append(ring);
            }
            const r = card.getBoundingClientRect();
            ring.style.setProperty("--lh-mx", `${Math.round(x - r.left)}px`);
            ring.style.setProperty("--lh-my", `${Math.round(y - r.top)}px`);
            ring.classList.add("lh-on");
        });
    }

    /* ================= dashboard card + unread pill ================= */
    readStats() {
        const list = document.querySelector(".sidebarList_pog62O");
        const guildNode = document.querySelector('[data-list-item-id^="guildsnav___"][aria-selected="true"]');
        const guildId = guildNode ? guildNode.getAttribute("data-list-item-id").slice(12) : null;
        if (!list || !guildId || !/^\d+$/.test(guildId)) return null;

        const unreadChannels = [...list.querySelectorAll(".wrapper_TNyK-N")].filter(w => /modeUnread/.test(w.className) && !/modeSelected/.test(w.className));
        let mentions = 0;
        list.querySelectorAll(".numberBadge_lMvXrQ").forEach(b => { mentions += parseInt(b.textContent.replace(/\D/g, ""), 10) || 0; });

        const counts = getStore("GuildMemberCountStore");
        const members = safe(() => counts.getMemberCount(guildId));
        let online = safe(() => counts.getOnlineCount(guildId));
        if (typeof online !== "number") {
            // fall back to the member list's group headings ("Online — 212"), skipping the offline group
            let sum = 0, seen = false;
            document.querySelectorAll(".members_86es0b h3, .members_86es0b [class*='membersGroup']").forEach(h => {
                const t = h.textContent || "";
                if (/offline/i.test(t)) return;
                const m = t.match(/[—–-]\s*([\d,]+)/);
                if (m) { sum += parseInt(m[1].replace(/,/g, ""), 10); seen = true; }
            });
            online = seen ? sum : null;
        }
        const name = safe(() => document.querySelector(".name_XH4OpX").textContent.trim()) || "This server";
        return {list, name, members, online, unreadChannels, mentions};
    }

    updateDashboard() {
        const s = this.settings;
        if (!s.dashCard && !s.unreadPill) return;
        const st = this.readStats();
        if (!st) {
            document.querySelectorAll(".lh-dash-card, .lh-unread-pill").forEach(n => n.remove());
            return;
        }
        const fmt = n => (typeof n === "number" ? n.toLocaleString() : "—");

        if (s.dashCard) {
            let card = st.list.querySelector(":scope > .lh-dash-card");
            if (!card) {
                card = el("section", {class: "lh-dash-card", "aria-label": "Server overview"},
                    el("div", {class: "lh-dash-title"}),
                    el("div", {class: "lh-dash-stats"},
                        el("div", {class: "lh-dash-stat"}, el("span", {class: "lh-dash-label"}, "Members"), el("span", {class: "lh-dash-value", "data-k": "members"})),
                        el("div", {class: "lh-dash-stat"}, el("span", {class: "lh-dash-label"}, "Online"), el("span", {class: "lh-dash-value", "data-k": "online"})),
                        el("div", {class: "lh-dash-stat"}, el("span", {class: "lh-dash-label"}, "Unread"), el("span", {class: "lh-dash-value", "data-k": "unread"}))
                    )
                );
                st.list.append(card);
            }
            const set = (k, v) => { const n = card.querySelector(`[data-k="${k}"]`); if (n && n.textContent !== v) n.textContent = v; };
            const title = card.querySelector(".lh-dash-title");
            if (title.textContent !== st.name) title.textContent = st.name;
            set("members", fmt(st.members));
            set("online", fmt(st.online));
            set("unread", st.mentions ? `${st.unreadChannels.length} · @${st.mentions}` : String(st.unreadChannels.length));
        }

        if (s.unreadPill) {
            // lives in the channel header, so it never covers Discord's own notices
            const host = document.querySelector(".subtitleContainer_z_gUBg .toolbar_ybUK7Z");
            let pill = document.querySelector(".lh-unread-pill");
            const n = st.unreadChannels.length;
            if (!host || !n) { if (pill) pill.remove(); return; }
            if (!pill || pill.parentElement !== host) {
                if (pill) pill.remove();
                pill = el("button", {class: "lh-unread-pill", type: "button", onClick: () => this.jumpToUnread()});
                pill.append(svgIcon(ICONS.bell), el("span", {class: "lh-unread-text"}));
                host.prepend(pill);
            }
            const text = `${n} unread${st.mentions ? ` · @${st.mentions}` : ""}`;
            const span = pill.querySelector(".lh-unread-text");
            if (span.textContent !== text) span.textContent = text;
            const label = `${n} unread channel${n === 1 ? "" : "s"}${st.mentions ? `, ${st.mentions} mention${st.mentions === 1 ? "" : "s"}` : ""}. Go to the next one.`;
            if (pill.getAttribute("aria-label") !== label) { pill.setAttribute("aria-label", label); pill.title = label; }
        }
    }

    jumpToUnread() {
        const st = this.readStats();
        if (!st || !st.unreadChannels.length) return;
        const withMention = st.unreadChannels.find(w => w.querySelector(".numberBadge_lMvXrQ"));
        const target = (withMention || st.unreadChannels[0]).querySelector("a, [role='link'], [data-list-item-id^='channels___']");
        if (target) target.click();
    }

    /* ================= colourway dot (title bar quick switcher) ================= */
    updateColourDot() {
        const existing = document.querySelector(".lh-colour-dot");
        if (!this.settings.colourDot) { if (existing) existing.remove(); this.closeSwatches(); return; }
        // Discord keeps more than one title bar; use the one in the main window that is actually showing
        const bars = [...document.querySelectorAll(".trailing_3zSH5d")];
        const visible = b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(b).visibility !== "hidden"; };
        const host = bars.find(b => b.closest(".base_pog62O") && visible(b)) || bars.find(visible);
        if (!host) return;
        if (existing && existing.parentElement === host) return;
        if (existing) existing.remove();
        const dot = el("button", {class: "lh-colour-dot", type: "button", "aria-label": "Change colourway", title: "Change colourway",
            "aria-haspopup": "true", onClick: e => { e.stopPropagation(); this.swatchPop ? this.closeSwatches() : this.openSwatches(dot); }});
        dot.append(el("span", {class: "lh-colour-dot-fill", "aria-hidden": "true"}));
        host.prepend(dot);
    }

    openSwatches(anchor) {
        this.closeSwatches();
        const r = anchor.getBoundingClientRect();
        const pop = el("div", {class: "lh-swatch-pop", role: "dialog", "aria-label": "Colourways"},
            el("div", {class: "lh-swatch-title"}, "Colourway"));
        const grid = el("div", {class: "lh-swatch-grid"});
        for (const [id, way] of Object.entries(COLOURWAYS)) {
            const b = el("button", {class: "lh-swatch" + (id === this.settings.colourway ? " lh-swatch-on" : ""), type: "button",
                "aria-pressed": id === this.settings.colourway ? "true" : "false",
                onClick: () => { this.set("colourway", id); this.closeSwatches(); }},
                el("span", {class: "lh-swatch-chip", "aria-hidden": "true",
                    style: `background: linear-gradient(135deg, ${way.swatch[1]}, ${way.swatch[2]}) 100% 100% / 50% 50% no-repeat, ${way.swatch[0]}`}),
                el("span", {class: "lh-swatch-name"}, way.label));
            grid.append(b);
        }
        pop.append(grid);
        pop.style.top = `${Math.round(r.bottom + 8)}px`;
        pop.style.right = `${Math.max(8, Math.round(window.innerWidth - r.right - 8))}px`;
        document.body.append(pop);
        this.swatchPop = pop;
        this.swatchOutside = e => { if (!pop.contains(e.target) && e.target !== anchor) this.closeSwatches(); };
        setTimeout(() => document.addEventListener("mousedown", this.swatchOutside, true), 0);
        const first = pop.querySelector(".lh-swatch-on") || pop.querySelector(".lh-swatch");
        if (first) first.focus();
    }

    closeSwatches() {
        if (this.swatchPop) this.swatchPop.remove();
        this.swatchPop = null;
        if (this.swatchOutside) document.removeEventListener("mousedown", this.swatchOutside, true);
    }

    /* ================= now playing (Spotify) pill ================= */
    currentTrack() {
        const id = this.currentUserId();
        const acts = safe(() => getStore("PresenceStore").getActivities(id)) || [];
        const sp = acts.find(a => a && (a.name === "Spotify" || (a.id || "").startsWith("spotify")));
        if (sp && sp.details) return {title: sp.details, artist: (sp.state || "").replace(/;/g, ","), end: sp.timestamps && sp.timestamps.end};
        const t = safe(() => getStore("SpotifyStore").getTrack());
        if (t && t.name) return {title: t.name, artist: (t.artists || []).map(a => a.name).join(", ")};
        return null;
    }

    updateNowPlaying() {
        const existing = document.querySelector(".lh-now-playing");
        let track = this.settings.nowPlaying ? this.currentTrack() : null;
        const ended = track && track.end && Date.now() > track.end + 5000;
        if (track && !ended) {
            // Discord keeps reporting a song for a few seconds after pausing; only treat it as playing again after that
            if (!this.paused || Date.now() - (this.pausedAt || 0) > 8000) this.paused = false;
            this.lastTrack = track; this.lastTrackAt = Date.now();
        }
        // keep a paused song on screen for a while so it can be resumed from the pill
        const showPaused = this.settings.spotifyControls && this.paused && this.lastTrack && Date.now() - this.lastTrackAt < 10 * 60 * 1000;
        if ((!track || ended) && !showPaused) { if (existing) existing.remove(); return; }
        if (!track || ended) track = this.lastTrack;
        const host = document.querySelector(".title_3zSH5d");
        if (!host) return;
        let pill = existing;
        if (!pill || pill.parentElement !== host) {
            if (pill) pill.remove();
            pill = el("div", {class: "lh-now-playing", role: "group", "aria-label": "Now playing"},
                el("span", {class: "lh-eq", "aria-hidden": "true"}, el("i"), el("i"), el("i")),
                el("span", {class: "lh-np-text", role: "status"}));
            if (this.settings.spotifyControls) {
                const btn = (label, icon, action) => { const b = el("button", {class: "lh-np-btn", type: "button", "aria-label": label, title: label, onClick: e => { e.stopPropagation(); this.spotify(action); }}); b.append(svgIcon(icon)); return b; };
                pill.append(el("span", {class: "lh-np-controls"}, btn("Previous", ICONS.prev, "previous"), btn("Pause", ICONS.pause, "pause"), btn("Next", ICONS.next, "next")));
            }
            host.append(pill);
        }
        const text = track.artist ? `${track.title} — ${track.artist}` : track.title;
        const pp = pill.querySelector(".lh-np-controls .lh-np-btn:nth-child(2)");
        if (pp) {
            const want = this.paused ? "Play" : "Pause";
            if (pp.getAttribute("aria-label") !== want) { pp.setAttribute("aria-label", want); pp.title = want; pp.textContent = ""; pp.append(svgIcon(this.paused ? ICONS.play : ICONS.pause)); }
        }
        pill.classList.toggle("lh-np-paused", !!this.paused);
        const span = pill.querySelector(".lh-np-text");
        if (span.textContent !== text) { span.textContent = text; pill.title = `Now playing: ${text}`; pill.setAttribute("aria-label", `Now playing: ${text}`); }
    }

    /* ================= friend requests banner on Home ================= */
    updateFriendsBanner() {
        const existing = document.querySelector(".lh-friends-banner");
        const column = document.querySelector("[class*='peopleColumn_']");
        let pending = safe(() => getStore("RelationshipStore").getPendingCount());
        if (typeof pending !== "number") {
            const rel = safe(() => getStore("RelationshipStore").getRelationships()) || {};
            pending = Object.values(rel).filter(t => t === 3).length; // 3 = incoming request
        }
        if (!this.settings.friendsBanner || !column || !pending) { if (existing) existing.remove(); return; }
        let banner = existing;
        if (!banner || banner.parentElement !== column) {
            if (banner) banner.remove();
            banner = el("button", {class: "lh-friends-banner", type: "button", onClick: () => {
                const tab = [...document.querySelectorAll("[class*='tabBar_'] [role='tab']")].find(t => /pending/i.test(t.textContent || ""));
                if (tab) tab.click();
            }}, svgIcon(ICONS.bell), el("span", {class: "lh-fb-text"}), el("span", {class: "lh-fb-cta"}, "Review"));
            column.prepend(banner);
        }
        const text = `${pending} friend request${pending === 1 ? "" : "s"} waiting`;
        const span = banner.querySelector(".lh-fb-text");
        if (span.textContent !== text) span.textContent = text;
    }

    /* ================= keyboard shortcut sheet (Ctrl+?) ================= */
    openCheatSheet() {
        this.closeCheatSheet();
        const s = this.settings;
        const groups = [
            ["Lighthouse", [
                s.palette ? [s.paletteKey === "ctrlk" ? "Ctrl K" : "Ctrl Shift K", "Command palette"] : null,
                s.focusMode ? ["Ctrl Shift F", "Focus mode"] : null,
                ["Ctrl Shift /", "This shortcut sheet"],
                ["Right-click a channel", "Give it its own accent colour"]
            ]],
            ["Moving around", [
                ["Alt ↑ / ↓", "Previous / next channel"],
                ["Alt Shift ↑ / ↓", "Previous / next unread channel"],
                ["Ctrl Alt ↑ / ↓", "Previous / next server"],
                s.paletteKey === "ctrlk" && s.palette ? ["Ctrl K → last item", "Discord's quick switcher"] : ["Ctrl K", "Discord's quick switcher"],
                ["Ctrl I", "Inbox"],
                ["Ctrl Shift A", "Collapse / expand the current category"]
            ]],
            ["Reading and writing", [
                ["Esc", "Mark channel as read"],
                ["Shift Esc", "Mark server as read"],
                ["Page Up / Down", "Scroll the chat"],
                ["Ctrl E / G / S", "Emoji / GIF / sticker picker"],
                ["Ctrl Shift U", "Upload a file"],
                ["↑ in an empty box", "Edit your last message"]
            ]],
            ["Voice", [
                ["Ctrl Shift M", "Mute"],
                ["Ctrl Shift D", "Deafen"],
                ["Ctrl '", "Answer an incoming call"],
                ["Ctrl /", "Discord's full shortcut list"]
            ]]
        ];
        const body = el("div", {class: "lh-cheat-grid"});
        for (const [title, rows] of groups) {
            const col = el("section", {class: "lh-cheat-col"}, el("h3", {class: "lh-cheat-h"}, title));
            for (const row of rows.filter(Boolean)) {
                col.append(el("div", {class: "lh-cheat-row"}, el("kbd", {class: "lh-kbd"}, row[0]), el("span", null, row[1])));
            }
            body.append(col);
        }
        const close = el("button", {class: "lh-btn lh-cheat-close", type: "button", onClick: () => this.closeCheatSheet()}, "Close");
        const card = el("div", {class: "lh-cheat", role: "dialog", "aria-modal": "true", "aria-label": "Keyboard shortcuts"},
            el("div", {class: "lh-cheat-head"}, el("h2", {class: "lh-cheat-title"}, "Keyboard shortcuts"), close), body);
        this.cheatReturnFocus = document.activeElement;
        this.cheatEl = el("div", {class: "lh-palette-backdrop lh-cheatsheet", onMousedown: e => { if (e.target === this.cheatEl) this.closeCheatSheet(); }}, card);
        document.body.append(this.cheatEl);
        close.focus();
    }

    closeCheatSheet() {
        if (!this.cheatEl) return;
        this.cheatEl.remove();
        this.cheatEl = null;
        safe(() => this.cheatReturnFocus && this.cheatReturnFocus.focus());
    }

    /* ================= self-update from GitHub ================= */
    async checkForUpdate(manual) {
        if (!UPDATE_URL || (!manual && !this.settings.autoUpdate)) {
            if (manual) BdApi.UI.showToast(UPDATE_URL ? "Automatic updates are off" : "No update address is set yet", {type: "info"});
            return;
        }
        try {
            const res = await BdApi.Net.fetch(`${UPDATE_URL}?t=${Date.now()}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            const m = text.match(/@version\s+([\d.]+)/);
            const remote = m && m[1];
            const newer = (a, b) => { const x = a.split(".").map(Number), y = b.split(".").map(Number); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); } return false; };
            if (!remote || !/@name\s+LighthouseSettings/.test(text) || !newer(remote, this.meta.version)) {
                if (manual) BdApi.UI.showToast(`LighthouseSettings is up to date (v${this.meta.version})`, {type: "success"});
                return;
            }
            const install = () => {
                const fs = require("fs");
                const path = require("path");
                const addon = BdApi.Plugins.get("LighthouseSettings");
                const file = path.join(BdApi.Plugins.folder, (addon && addon.filename) || "LighthouseSettings.plugin.js");
                fs.writeFileSync(file, text);
                BdApi.UI.showToast(`LighthouseSettings updated to v${remote}`, {type: "success"});
            };
            BdApi.UI.showConfirmationModal("Lighthouse update", `LighthouseSettings v${remote} is available (you have v${this.meta.version}). Install it now? It downloads from ${UPDATE_URL}.`, {
                confirmText: "Update", cancelText: "Not now", onConfirm: () => safe(install)
            });
        } catch (e) {
            if (manual) BdApi.UI.showToast(`Couldn't check for updates: ${e.message}`, {type: "error"});
        }
    }

    /* ================= Spotify controls ================= */
    async spotify(action) {
        const sd = safe(() => getStore("SpotifyStore").getActiveSocketAndDevice());
        const token = sd && sd.socket && sd.socket.accessToken;
        if (!token) { BdApi.UI.showToast("Spotify isn't connected to Discord, or nothing is playing on a device", {type: "error"}); return; }
        if (action === "pause" && this.paused) action = "play";
        const map = {previous: ["POST", "previous"], next: ["POST", "next"], pause: ["PUT", "pause"], play: ["PUT", "play"]};
        const [method, path] = map[action];
        try {
            const res = await BdApi.Net.fetch(`https://api.spotify.com/v1/me/player/${path}`, {method, headers: {Authorization: `Bearer ${token}`}});
            if (res.status === 403) throw new Error("Spotify only allows playback control with Premium");
            if (!res.ok && res.status !== 204) throw new Error(`Spotify said ${res.status}`);
            if (action === "pause") { this.paused = true; this.pausedAt = Date.now(); this.lastTrackAt = Date.now(); }
            if (action === "play") { this.paused = false; this.pausedAt = 0; }
            this.updateNowPlaying();
        } catch (e) {
            BdApi.UI.showToast(e.message, {type: "error"});
        }
    }

    /* ================= server banner glow ================= */
    updateBannerGlow() {
        const list = document.querySelector(".sidebarList_pog62O");
        if (!list) return;
        if (!this.settings.bannerGlow) { list.style.removeProperty("--lh-banner"); return; }
        const banner = list.querySelector("[class*='bannerImg'] img, [class*='bannerImage'] img, img[class*='bannerImg'], img[src*='/banners/']");
        const icon = document.querySelector('[data-list-item-id^="guildsnav___"][aria-selected="true"] img');
        const src = (banner && banner.src) || (icon && icon.src) || "";
        const want = src ? `url("${src.replace(/"/g, "%22")}")` : "";
        if (list.style.getPropertyValue("--lh-banner") !== want) {
            if (want) list.style.setProperty("--lh-banner", want);
            else list.style.removeProperty("--lh-banner");
        }
    }

    /* ================= health check ================= */
    runHealthCheck(manual) {
        if (!manual && !this.settings.healthCheck) return;
        // each pair: a loose match for the part of Discord, and the exact class Lighthouse styles
        const parts = [
            ["Server list", "guilds_", "guilds_pog62O"],
            ["Channel list", "sidebarList_", "sidebarList_pog62O"],
            ["Channels", "link_", "link_TNyK-N", '[data-list-item-id^="channels___"]'],
            ["Chat", "chatContent_", "chatContent_z_gUBg"],
            ["Messages", "message_", "message_SY_P2T", 'li[id^="chat-messages-"]'],
            ["Channel header", "subtitleContainer_", "subtitleContainer_z_gUBg"],
            ["Message box", "channelTextArea_", "channelTextArea_z_gUBg"],
            ["Member list", "membersWrap_", "container_86es0b"],
            ["Your user panel", "panels_", "panels_pog62O"],
            ["Title bar", "trailing_", "trailing_3zSH5d"],
            ["Window layout", "base_", "base_pog62O"],
            ["Server name", "name_", "name_XH4OpX", "header[class*='header_']"]
        ];
        const broken = [];
        for (const [name, prefix, exact, needs] of parts) {
            if (needs && !document.querySelector(needs)) continue; // that part isn't on screen right now
            const present = document.querySelector(`[class*="${prefix}"]`);
            if (!present) continue;
            if (!document.querySelector(`.${CSS.escape(exact)}`)) broken.push(name);
        }
        if (!broken.length) {
            if (manual) BdApi.UI.showToast("Lighthouse health check: everything is being found", {type: "success"});
            return;
        }
        const report = `Lighthouse health check: Discord renamed parts of its layout. Not matching: ${broken.join(", ")}. Plugin v${this.meta.version}.`;
        const close = BdApi.UI.showNotice(`Lighthouse: Discord changed part of its layout, so some styling may not apply (${broken.join(", ")}). An update usually fixes this.`, {
            type: "warning",
            buttons: [
                {label: "Check for updates", onClick: () => { this.checkForUpdate(true); safe(() => close()); }},
                {label: "Copy report", onClick: () => { this.copyText(report); BdApi.UI.showToast("Report copied — paste it to whoever maintains Lighthouse", {type: "info"}); }}
            ]
        });
    }

    copyText(text) {
        if (safe(() => { DiscordNative.clipboard.copy(text); return true; })) return;
        safe(() => navigator.clipboard.writeText(text));
    }

    /* ================= what's new ================= */
    async showWhatsNew(manual) {
        if (!manual && !this.settings.whatsNew) return;
        let entries;
        try {
            const res = await BdApi.Net.fetch(`${PAGES_URL}/changelog.json?t=${Math.floor(Date.now() / 60000)}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            entries = (await res.json()).entries || [];
        } catch (e) {
            if (manual) BdApi.UI.showToast(`Couldn't load what's new: ${e.message}`, {type: "error"});
            return;
        }
        const seen = this.api.Data.load("seenNews") || [];
        const fresh = manual ? entries.slice(0, 3) : entries.filter(e => !seen.includes(e.id));
        if (!seen.length && !manual) {
            // first run: only show the newest entry, remember the rest as seen
            this.api.Data.save("seenNews", entries.map(e => e.id));
            if (entries[0]) this.renderNews([entries[0]]);
            return;
        }
        if (!fresh.length) { if (manual) BdApi.UI.showToast("Nothing new since last time", {type: "info"}); return; }
        this.api.Data.save("seenNews", [...new Set([...seen, ...entries.map(e => e.id)])]);
        this.renderNews(fresh);
    }

    renderNews(list) {
        this.closeNews();
        const body = el("div", {class: "lh-news-list"});
        for (const e of list) {
            const items = el("ul", {class: "lh-news-items"});
            for (const it of (e.items || [])) items.append(el("li", null, String(it)));
            body.append(el("section", {class: "lh-news-entry"},
                el("div", {class: "lh-news-meta"}, el("span", {class: "lh-news-tag"}, e.version ? `v${e.version}` : "Update"), el("span", null, e.date || "")),
                el("h3", {class: "lh-news-title"}, String(e.title || "")), items));
        }
        const close = el("button", {class: "lh-btn lh-btn-accent", type: "button", onClick: () => this.closeNews()}, "Nice");
        const card = el("div", {class: "lh-cheat lh-news", role: "dialog", "aria-modal": "true", "aria-label": "What's new in Lighthouse"},
            el("div", {class: "lh-cheat-head"}, el("h2", {class: "lh-cheat-title"}, "What's new in Lighthouse"), close), body);
        this.newsEl = el("div", {class: "lh-palette-backdrop lh-cheatsheet", onMousedown: ev => { if (ev.target === this.newsEl) this.closeNews(); }}, card);
        document.body.append(this.newsEl);
        close.focus();
    }

    closeNews() {
        if (this.newsEl) this.newsEl.remove();
        this.newsEl = null;
    }

    /* ================= setup codes ================= */
    copySetupCode() {
        const snap = {};
        for (const k of SETTING_KEYS) snap[k] = this.settings[k];
        const code = "LH1:" + btoa(unescape(encodeURIComponent(JSON.stringify(snap))));
        this.copyText(code);
        BdApi.UI.showToast("Setup code copied — send it to a friend with Lighthouse", {type: "success"});
        return code;
    }

    importSetupCode(code) {
        try {
            const raw = String(code || "").trim();
            if (!raw.startsWith("LH1:")) throw new Error("That doesn't look like a Lighthouse setup code");
            const data = JSON.parse(decodeURIComponent(escape(atob(raw.slice(4)))));
            const clean = {};
            for (const k of SETTING_KEYS) if (k in data && typeof data[k] === typeof DEFAULTS[k]) clean[k] = data[k];
            if (!Object.keys(clean).length) throw new Error("The code had no settings in it");
            this.settings = Object.assign({}, DEFAULTS, clean);
            this.save();
            this.apply();
            this.refreshFeatures();
            BdApi.UI.showToast("Setup applied", {type: "success"});
            return true;
        } catch (e) {
            BdApi.UI.showToast(e.message.includes("Lighthouse") || e.message.includes("code") ? e.message : "That code couldn't be read", {type: "error"});
            return false;
        }
    }

    /* ================= channel notes ================= */
    updateNotesButton() {
        const existing = document.querySelector(".lh-notes-btn");
        const host = document.querySelector(".subtitleContainer_z_gUBg .toolbar_ybUK7Z");
        const ch = this.currentChannelId();
        if (!this.settings.notes || !host || !ch) { if (existing) existing.remove(); return; }
        let btn = existing;
        if (!btn || btn.parentElement !== host) {
            if (btn) btn.remove();
            btn = el("button", {class: "lh-notes-btn clickable_ybUK7Z", type: "button", "aria-label": "Channel notes", title: "Channel notes", onClick: () => (this.notesEl ? this.closeNotes() : this.openNotes())});
            btn.append(svgIcon(ICONS.note), el("span", {class: "lh-notes-dot", "aria-hidden": "true"}));
            const pill = host.querySelector(".lh-unread-pill");
            pill ? pill.after(btn) : host.prepend(btn);
        }
        btn.classList.toggle("lh-has-note", !!(this.notesData[ch] && this.notesData[ch].trim()));
        if (this.notesEl && this.notesEl.dataset.channel !== ch) this.openNotes(); // follow channel switches
    }

    openNotes() {
        const ch = this.currentChannelId();
        if (!ch) return;
        this.closeNotes();
        const title = safe(() => document.querySelector(".subtitleContainer_z_gUBg h1, .subtitleContainer_z_gUBg h2").textContent.trim()) || "this channel";
        const area = el("textarea", {class: "lh-notes-area", "aria-label": `Notes for ${title}`, placeholder: "Anything you want to remember about this channel. Saved automatically, only on this computer.", spellcheck: "true"});
        area.value = this.notesData[ch] || "";
        let t;
        area.addEventListener("input", () => {
            clearTimeout(t);
            t = setTimeout(() => {
                if (area.value.trim()) this.notesData[ch] = area.value; else delete this.notesData[ch];
                this.api.Data.save("notes", this.notesData);
                saved.textContent = "Saved";
                safe(() => document.querySelector(".lh-notes-btn").classList.toggle("lh-has-note", !!area.value.trim()));
            }, 400);
            saved.textContent = "Saving…";
        });
        area.addEventListener("keydown", e => { e.stopPropagation(); if (e.key === "Escape") this.closeNotes(); });
        const saved = el("span", {class: "lh-notes-saved", "aria-live": "polite"}, "Saved");
        const close = el("button", {class: "lh-btn lh-btn-ghost lh-notes-close", type: "button", "aria-label": "Close notes", onClick: () => this.closeNotes()}, "Close");
        this.notesEl = el("aside", {class: "lh-notes", role: "dialog", "aria-label": `Notes for ${title}`, "data-channel": ch},
            el("div", {class: "lh-notes-head"}, el("div", null, el("div", {class: "lh-notes-kicker"}, "Notes"), el("div", {class: "lh-notes-title"}, title)), close),
            area,
            el("div", {class: "lh-notes-foot"}, saved));
        const hdr = safe(() => document.querySelector(".subtitleContainer_z_gUBg").getBoundingClientRect());
        if (hdr && hdr.bottom > 0) this.notesEl.style.top = `${Math.round(hdr.bottom + 10)}px`;
        document.body.append(this.notesEl);
        requestAnimationFrame(() => area.focus());
    }

    closeNotes() {
        if (this.notesEl) this.notesEl.remove();
        this.notesEl = null;
    }

    /* ================= bookmarks ================= */
    addBookmark(msg, channel) {
        if (this.bookmarksData.some(b => b.id === msg.id)) return;
        const author = safe(() => msg.author.globalName || msg.author.username) || "Someone";
        const text = String(msg.content || "").replace(/\s+/g, " ").slice(0, 140);
        this.bookmarksData.push({id: msg.id, channelId: channel.id, guildId: channel.guild_id || "@me", author, text, at: Date.now()});
        this.api.Data.save("bookmarks", this.bookmarksData);
        BdApi.UI.showToast("Saved — find it in the command palette", {type: "success"});
    }

    removeBookmark(id) {
        this.bookmarksData = this.bookmarksData.filter(b => b.id !== id);
        this.api.Data.save("bookmarks", this.bookmarksData);
        BdApi.UI.showToast("Bookmark removed", {type: "info"});
    }

    openBookmark(b) {
        const path = `/channels/${b.guildId}/${b.channelId}/${b.id}`;
        const nav = safe(() => BdApi.Webpack.getByKeys("transitionTo"));
        if (nav && typeof nav.transitionTo === "function") return nav.transitionTo(path);
        history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate", {state: {}}));
    }

    /* ================= title bar search pill ================= */
    updateTitleSearch() {
        const existing = document.querySelector(".lh-titlebar-search");
        if (!this.settings.titleSearch || !this.settings.palette) { if (existing) existing.remove(); return; }
        const slot = document.querySelector(".title_3zSH5d");
        if (!slot) return;
        let pill = existing;
        if (!pill || pill.parentElement !== slot) {
            if (pill) pill.remove();
            pill = el("button", {class: "lh-titlebar-search", type: "button", onClick: () => (this.paletteEl ? this.closePalette() : this.openPalette())},
                el("span", {class: "lh-tb-icon", "aria-hidden": "true"}),
                el("span", {class: "lh-tb-label"}),
                el("kbd", {class: "lh-kbd lh-tb-kbd"}, this.settings.paletteKey === "ctrlk" ? "Ctrl K" : "Ctrl ⇧ K"));
            slot.append(pill);
        }
        // mirror Discord's own title (server or DM name) and its icon
        const title = slot.querySelector(".title_LnjVAX");
        const text = (safe(() => title.querySelector("[class*='text-sm']").textContent) || (title && title.textContent) || "Discord").trim();
        const label = pill.querySelector(".lh-tb-label");
        if (label.textContent !== text) label.textContent = text;
        pill.setAttribute("aria-label", `${text}. Search or jump to anything (${this.settings.paletteKey === "ctrlk" ? "Ctrl K" : "Ctrl Shift K"})`);
        const kbd = pill.querySelector(".lh-tb-kbd");
        const keyText = this.settings.paletteKey === "ctrlk" ? "Ctrl K" : "Ctrl ⇧ K";
        if (kbd.textContent !== keyText) kbd.textContent = keyText;
        const iconHolder = pill.querySelector(".lh-tb-icon");
        const srcImg = title && title.querySelector("img");
        const src = srcImg ? srcImg.src : "";
        if (iconHolder.dataset.src !== src) {
            iconHolder.dataset.src = src;
            iconHolder.textContent = "";
            if (src) iconHolder.append(el("img", {src, alt: ""}));
            else iconHolder.append(svgIcon(ICONS.search));
        }
    }

    /* ================= command palette ================= */
    paletteItems() {
        const items = [];
        document.querySelectorAll('.sidebarList_pog62O [data-list-item-id^="channels___"]').forEach(a => {
            const name = (safe(() => a.querySelector("[class*='name_']").textContent) || a.getAttribute("aria-label") || "").trim();
            if (!name) return;
            items.push({group: "Channels", icon: ICONS.hash, label: name, run: () => a.click()});
        });
        document.querySelectorAll('[data-list-item-id^="guildsnav___"]').forEach(g => {
            const id = g.getAttribute("data-list-item-id").slice(12);
            if (!/^\d+$/.test(id)) return;
            const holder = g.closest("[data-dnd-name]");
            const name = (holder && holder.getAttribute("data-dnd-name")) || g.getAttribute("aria-label") || "";
            if (!name) return;
            items.push({group: "Servers", icon: ICONS.server, label: name.trim(), run: () => g.click()});
        });
        const s = this.settings;
        const toggle = (label, key) => ({group: "Lighthouse", icon: ICONS.bolt, label: `${s[key] ? "Turn off" : "Turn on"} ${label}`, run: () => this.set(key, !s[key])});
        items.push(
            {group: "Lighthouse", icon: ICONS.bolt, label: document.body.classList.contains("lh-focus") ? "Leave focus mode" : "Enter focus mode", hint: "Ctrl+Shift+F", run: () => this.toggleFocus()},
            {group: "Lighthouse", icon: ICONS.bolt, label: "Show keyboard shortcuts", hint: "Ctrl Shift /", run: () => this.openCheatSheet()},
            {group: "Lighthouse", icon: ICONS.bolt, label: "Check for Lighthouse updates", run: () => this.checkForUpdate(true)},
            toggle("chat bubbles", "bubbles"),
            toggle("compact mode", "compact"),
            toggle("auto-collapsing sidebars", "collapse"),
            toggle("per-server accent", "serverAccent"),
            toggle("time-of-day accent", "timeOfDay"),
            toggle("accessibility mode", "a11y"),
            toggle("animations", "motion"),
            {group: "Lighthouse", icon: ICONS.bolt, label: s.serverBar === "top" ? "Move servers to the left rail" : "Move servers to the top strip", run: () => this.set("serverBar", s.serverBar === "top" ? "side" : "top")}
        );
        for (const [id, way] of Object.entries(COLOURWAYS)) {
            if (id !== s.colourway) items.push({group: "Colourways", icon: ICONS.palette, label: `Switch to ${way.label}`, run: () => this.set("colourway", id)});
        }
        if (s.bookmarks) {
            for (const b of this.bookmarksData.slice().reverse()) {
                const when = safe(() => new Date(b.at).toLocaleDateString()) || "";
                items.push({group: "Bookmarks", icon: ICONS.bookmark, label: `${b.author}: ${b.text || "(attachment)"}`, hint: when, run: () => this.openBookmark(b)});
            }
        }
        if (s.notes) items.push({group: "Lighthouse", icon: ICONS.note, label: "Open notes for this channel", run: () => this.openNotes()});
        items.push(
            {group: "Lighthouse", icon: ICONS.bolt, label: "Copy my Lighthouse setup code", run: () => this.copySetupCode()},
            {group: "Lighthouse", icon: ICONS.bolt, label: "Run Lighthouse health check", run: () => this.runHealthCheck(true)},
            {group: "Lighthouse", icon: ICONS.bolt, label: "What's new in Lighthouse", run: () => this.showWhatsNew(true)}
        );
        for (const name of Object.keys(this.profiles)) {
            items.push({group: "Profiles", icon: ICONS.palette, label: `Load profile “${name}”`, run: () => this.loadProfile(name)});
        }
        items.push({group: "Discord", icon: ICONS.search, label: "Search all channels, DMs and servers", hint: "Discord's quick switcher", run: () => this.openDiscordSwitcher()});
        return items;
    }

    openDiscordSwitcher() {
        this.passThroughK = true;
        const opts = {key: "k", code: "KeyK", keyCode: 75, which: 75, ctrlKey: true, bubbles: true, cancelable: true};
        safe(() => document.body.dispatchEvent(new KeyboardEvent("keydown", opts)));
        setTimeout(() => { this.passThroughK = false; }, 50);
    }

    openPalette() {
        const all = this.paletteItems();
        let shown = all, active = 0;
        const input = el("input", {class: "lh-palette-input", type: "text", placeholder: "Jump to a channel or server, or run a Lighthouse action…", "aria-label": "Command search", "aria-controls": "lh-palette-list", "aria-autocomplete": "list", autocomplete: "off", spellcheck: "false"});
        const list = el("div", {class: "lh-palette-list", id: "lh-palette-list", role: "listbox"});
        const count = el("span", {class: "lh-palette-count"});
        const score = (label, q) => {
            const l = label.toLowerCase();
            if (!q) return 1;
            if (l.startsWith(q)) return 3;
            if (l.includes(q)) return 2;
            let i = 0; for (const ch of l) if (ch === q[i]) i++;
            return i === q.length ? 1 : 0;
        };
        const highlight = () => {
            list.querySelectorAll(".lh-palette-item").forEach((r, i) => {
                r.classList.toggle("lh-active", i === active);
                r.setAttribute("aria-selected", i === active ? "true" : "false");
            });
            const cur = list.querySelector(".lh-active");
            if (cur) cur.scrollIntoView({block: "nearest"});
            input.setAttribute("aria-activedescendant", shown.length ? `lh-opt-${active}` : "");
        };
        const run = i => {
            const it = shown[i];
            this.closePalette();
            if (it) setTimeout(() => safe(() => it.run()), 10);
            else this.openDiscordSwitcher();
        };
        const render = () => {
            list.textContent = "";
            let group = null;
            shown.slice(0, 60).forEach((it, i) => {
                if (it.group !== group) { group = it.group; list.append(el("div", {class: "lh-palette-group", role: "presentation"}, group)); }
                const row = el("div", {class: "lh-palette-item" + (i === active ? " lh-active" : ""), role: "option", id: `lh-opt-${i}`, "aria-selected": i === active ? "true" : "false",
                    onMousemove: () => { if (active !== i) { active = i; highlight(); } },
                    onClick: () => run(i)});
                row.append(svgIcon(it.icon), el("span", {class: "lh-palette-label"}, it.label));
                if (it.hint) row.append(el("span", {class: "lh-palette-hint"}, it.hint));
                list.append(row);
            });
            if (!shown.length) list.append(el("div", {class: "lh-palette-empty"}, "Nothing matches. Press Enter to search all of Discord instead."));
            count.textContent = `${shown.length} result${shown.length === 1 ? "" : "s"}`;
            input.setAttribute("aria-activedescendant", shown.length ? `lh-opt-${active}` : "");
        };
        input.addEventListener("input", () => {
            const q = input.value.trim().toLowerCase();
            shown = all.map(it => [it, score(it.label, q)]).filter(([, sc]) => sc > 0).sort((a, b) => b[1] - a[1]).map(([it]) => it);
            active = 0;
            render();
        });
        input.addEventListener("keydown", e => {
            e.stopPropagation();
            if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, Math.min(shown.length, 60) - 1); highlight(); }
            else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); highlight(); }
            else if (e.key === "Enter") { e.preventDefault(); run(active); }
            else if (e.key === "Escape") { e.preventDefault(); this.closePalette(); }
        });
        const dialog = el("div", {class: "lh-palette", role: "dialog", "aria-modal": "true", "aria-label": "Lighthouse command palette"},
            el("div", {class: "lh-palette-search"}, svgIcon(ICONS.search), input, el("kbd", {class: "lh-kbd"}, "Esc")),
            list,
            el("div", {class: "lh-palette-foot"}, count, el("span", null, el("kbd", {class: "lh-kbd"}, "↑↓"), " move  ", el("kbd", {class: "lh-kbd"}, "Enter"), " open"))
        );
        this.paletteReturnFocus = document.activeElement;
        this.paletteEl = el("div", {class: "lh-palette-backdrop", onMousedown: e => { if (e.target === this.paletteEl) this.closePalette(); }}, dialog);
        document.body.append(this.paletteEl);
        render();
        requestAnimationFrame(() => input.focus());
    }

    closePalette() {
        if (!this.paletteEl) return;
        this.paletteEl.remove();
        this.paletteEl = null;
        safe(() => this.paletteReturnFocus && this.paletteReturnFocus.focus());
    }

    /* ================= profiles ================= */
    saveProfile(name) {
        const snapshot = {};
        for (const k of SETTING_KEYS) snapshot[k] = this.settings[k];
        this.profiles[name] = snapshot;
        this.api.Data.save("profiles", this.profiles);
    }

    loadProfile(name) {
        const p = this.profiles[name];
        if (!p) return;
        this.settings = Object.assign({}, DEFAULTS, p);
        this.save();
        this.apply();
        this.refreshFeatures();
        BdApi.UI.showToast(`Loaded profile “${name}”`, {type: "success"});
    }

    deleteProfile(name) {
        delete this.profiles[name];
        this.api.Data.save("profiles", this.profiles);
    }

    /* ================= settings window ================= */
    ColourwayPicker() {
        const React = BdApi.React;
        const [picked, setPicked] = React.useState(this.settings.colourway);
        return React.createElement("div", {className: "lh-colourways"},
            Object.entries(COLOURWAYS).map(([id, way]) =>
                React.createElement("button", {
                    key: id,
                    type: "button",
                    className: "lh-colourway" + (picked === id ? " lh-colourway-active" : ""),
                    "aria-pressed": picked === id,
                    onClick: () => { setPicked(id); this.set("colourway", id); }
                },
                React.createElement("span", {
                    className: "lh-colourway-swatch",
                    "aria-hidden": "true",
                    style: {background: `linear-gradient(135deg, ${way.swatch[1]}, ${way.swatch[2]}) 100% 100% / 46% 46% no-repeat, ${way.swatch[0]}`}
                }),
                React.createElement("span", {className: "lh-colourway-name"}, way.label))
            )
        );
    }

    BookmarkList() {
        const React = BdApi.React;
        const h = React.createElement;
        const [list, setList] = React.useState(this.bookmarksData.slice().reverse());
        if (!list.length) return h("div", {className: "lh-profile-empty"}, "No bookmarks yet. Right-click a message and choose Save to Lighthouse bookmarks.");
        return h("div", {className: "lh-profiles"}, list.map(b => h("div", {key: b.id, className: "lh-profile-row"},
            h("button", {type: "button", className: "lh-mark-open", onClick: () => this.openBookmark(b)},
                h("span", {className: "lh-profile-name"}, b.author), h("span", {className: "lh-mark-text"}, b.text || "(attachment)")),
            h("button", {type: "button", className: "lh-btn lh-btn-ghost", "aria-label": `Remove bookmark from ${b.author}`, onClick: () => { this.removeBookmark(b.id); setList(this.bookmarksData.slice().reverse()); }}, "Remove"))));
    }

    ShareBox() {
        const React = BdApi.React;
        const h = React.createElement;
        const [code, setCode] = React.useState("");
        return h("div", {className: "lh-profiles"},
            h("div", {className: "lh-profile-new"},
                h("button", {type: "button", className: "lh-btn lh-btn-accent", onClick: () => this.copySetupCode()}, "Copy my setup code")),
            h("div", {className: "lh-profile-new"},
                h("label", {className: "lh-sr", htmlFor: "lh-share-code"}, "Paste a setup code"),
                h("input", {id: "lh-share-code", className: "lh-input", placeholder: "Paste a code that starts with LH1:", value: code, onChange: e => setCode(e.target.value), onKeyDown: e => { if (e.key === "Enter" && this.importSetupCode(code)) setCode(""); }}),
                h("button", {type: "button", className: "lh-btn", disabled: !code.trim(), onClick: () => { if (this.importSetupCode(code)) setCode(""); }}, "Apply code"))
        );
    }

    ProfileManager() {
        const React = BdApi.React;
        const h = React.createElement;
        const [names, setNames] = React.useState(Object.keys(this.profiles));
        const [draft, setDraft] = React.useState("");
        const refresh = () => setNames(Object.keys(this.profiles));
        const save = () => {
            const n = draft.trim();
            if (!n) return;
            this.saveProfile(n);
            setDraft("");
            refresh();
            BdApi.UI.showToast(`Saved profile “${n}”`, {type: "success"});
        };
        return h("div", {className: "lh-profiles"},
            h("div", {className: "lh-profile-new"},
                h("label", {className: "lh-sr", htmlFor: "lh-profile-name"}, "Profile name"),
                h("input", {id: "lh-profile-name", className: "lh-input", placeholder: "Name this setup, e.g. Work or Chill", value: draft,
                    onChange: e => setDraft(e.target.value), onKeyDown: e => { if (e.key === "Enter") save(); }}),
                h("button", {type: "button", className: "lh-btn lh-btn-accent", onClick: save, disabled: !draft.trim()}, "Save current setup")
            ),
            names.length === 0
                ? h("div", {className: "lh-profile-empty"}, "No saved profiles yet.")
                : names.map(n => h("div", {key: n, className: "lh-profile-row"},
                    h("span", {className: "lh-profile-name"}, n),
                    h("button", {type: "button", className: "lh-btn", onClick: () => this.loadProfile(n)}, "Load"),
                    h("button", {type: "button", className: "lh-btn lh-btn-ghost", "aria-label": `Delete profile ${n}`, onClick: () => { this.deleteProfile(n); refresh(); }}, "Delete")
                ))
        );
    }

    getSettingsPanel() {
        if (!this.settings) this.load();
        const React = BdApi.React;
        const s = this.settings;
        const Picker = () => this.ColourwayPicker();
        const Profiles = () => this.ProfileManager();
        const Share = () => this.ShareBox();
        const Marks = () => this.BookmarkList();
        const themeOn = safe(() => BdApi.Themes.isEnabled("Lighthouse"));
        const channelAccentCount = Object.keys(this.channelAccents).length;

        const settings = [
            {
                type: "category", id: "general", name: "General", collapsible: true, shown: true,
                settings: [
                    {type: "custom", id: "colourway", name: "Colourway", note: "Recolours panels, text and accents. Daylight is a light mode.", children: React.createElement(Picker)},
                    {type: "switch", id: "motion", name: "Animations", note: "Chat-bar ring, message slide-in, sidebar slides, hover effects.", value: s.motion},
                    {type: "switch", id: "a11y", name: "Accessibility mode", note: "Stronger text and borders, clear focus rings, bigger targets, no animations or hover glow.", value: s.a11y}
                ]
            },
            {
                type: "category", id: "features", name: "Features", collapsible: true, shown: true,
                settings: [
                    {type: "switch", id: "palette", name: "Command palette", note: "Jump to any channel or server, switch colourways and toggle Lighthouse features from one search box.", value: s.palette},
                    {type: "dropdown", id: "paletteKey", name: "Command palette shortcut", value: s.paletteKey, options: [
                        {label: "Ctrl+K (Discord's quick switcher stays inside the palette)", value: "ctrlk"},
                        {label: "Ctrl+Shift+K (keeps Discord's Ctrl+K)", value: "ctrlshiftk"}]},
                    {type: "switch", id: "focusMode", name: "Focus mode", note: "Ctrl+Shift+F hides everything except the chat. Press it again to bring it all back.", value: s.focusMode},
                    {type: "switch", id: "dashCard", name: "Server overview card", note: "Members, online and unread counts at the bottom of the channel list.", value: s.dashCard},
                    {type: "switch", id: "unreadPill", name: "Unread pill", note: "A pill in the chat showing unread channels in this server. Click it to jump to the next one.", value: s.unreadPill},
                    {type: "switch", id: "collapse", name: "Auto-collapsing sidebars", note: "Channel and member lists rest as slim rails and slide open over the chat on hover.", value: s.collapse},
                    {type: "switch", id: "iconSet", name: "Matching icon set", note: "Swaps Discord's mixed icons on the main buttons for one consistent line style.", value: s.iconSet},
                    {type: "switch", id: "bannerGlow", name: "Server banner glow", note: "The server's banner, or its icon, glows softly behind the top of the channel list.", value: s.bannerGlow},
                    {type: "switch", id: "glow", name: "Card hover glow", note: "The edge of the card under your mouse lights up in the accent colour near the cursor.", value: s.glow},
                    {type: "switch", id: "dashHeader", name: "Dashboard header", note: "Big bold channel title and round pill buttons.", value: s.dashHeader},
                    {type: "switch", id: "cheatSheet", name: "Shortcut sheet", note: "Ctrl+Shift+/ shows Lighthouse and Discord keyboard shortcuts on one card.", value: s.cheatSheet},
                    {type: "switch", id: "notes", name: "Channel notes", note: "A notes button in the channel header opens a notepad for that channel. Notes stay on this computer.", value: s.notes},
                    {type: "switch", id: "bookmarks", name: "Bookmarks", note: "Right-click a message → Save to Lighthouse bookmarks. Find saved messages in the command palette.", value: s.bookmarks},
                    {type: "switch", id: "friendsBanner", name: "Friend request banner", note: "On Home, a banner at the top shows waiting friend requests. Click it to review them.", value: s.friendsBanner}
                ]
            },
            {
                type: "category", id: "titlebar", name: "Title Bar", collapsible: true, shown: false,
                settings: [
                    {type: "switch", id: "titleSearch", name: "Search pill", note: "The middle of the title bar becomes a search pill with the server's name. Click it to open the command palette. Needs the command palette switched on.", value: s.titleSearch},
                    {type: "switch", id: "colourDot", name: "Colourway dot", note: "A small dot in the title bar that opens a quick colourway picker.", value: s.colourDot},
                    {type: "switch", id: "nowPlaying", name: "Now playing", note: "Shows your current Spotify song as a small pill in the title bar while it plays.", value: s.nowPlaying},
                    {type: "switch", id: "spotifyControls", name: "Spotify buttons", note: "Previous, play/pause and next on the now-playing pill. Spotify only allows this with Premium.", value: s.spotifyControls},
                    {type: "switch", id: "splashTheme", name: "Lighthouse start-up screen", note: "Themes the loading window Discord shows while it starts, in your colourway. Needs OpenAsar (the Lighthouse tune-up script installs it). Shows from the next start.", value: s.splashTheme},
                    {type: "switch", id: "roundWindow", name: "Rounded window corners", note: "Rounds the corners of the whole Discord window. For see-through corners, also turn on BetterDiscord's window transparency setting (Settings → BetterDiscord → Settings → Window) and restart Discord. Corners stay square while the window is maximised.", value: s.roundWindow},
                    {type: "slider", id: "windowRadius", name: "Window corner size", value: s.windowRadius, min: 4, max: 24, step: 1, units: "px", markers: [4, 8, 12, 16, 20, 24]},
                    {type: "dropdown", id: "winButtons", name: "Window buttons", value: s.winButtons, options: [
                        {label: "Minimal (Windows-style icons, coral close)", value: "minimal"},
                        {label: "Coloured dots", value: "dots"}]}
                ]
            },
            {
                type: "category", id: "messages", name: "Messages", collapsible: true, shown: false,
                settings: [
                    {type: "switch", id: "bubbles", name: "Chat bubbles", value: s.bubbles},
                    {type: "switch", id: "tintOwn", name: "Tint my own messages", note: "Your bubbles get a soft accent tint so they stand out.", value: s.tintOwn},
                    {type: "switch", id: "compact", name: "Compact mode", note: "Tighter spacing and slimmer bubbles for busy channels.", value: s.compact},
                    {type: "switch", id: "calmRoles", name: "Calmer role colours", note: "Softens neon role colours so names sit nicely on the dark background.", value: s.calmRoles},
                    {type: "switch", id: "codeBlocks", name: "Editor-style code blocks", note: "Window dots, a language label and SimForge colours for syntax.", value: s.codeBlocks}
                ]
            },
            {
                type: "category", id: "accent", name: "Accent Colours", collapsible: true, shown: false,
                settings: [
                    {type: "switch", id: "serverAccent", name: "Per-server accent", note: "Matches each server's icon. DMs and grey icons keep the normal accent.", value: s.serverAccent},
                    {type: "switch", id: "timeOfDay", name: "Time-of-day accent", note: "The accent drifts warmer towards the evening and cooler in the morning.", value: s.timeOfDay},
                    {type: "switch", id: "customAccent", name: "Use my own accent colours", note: "Overrides the colourway's accent.", value: s.customAccent},
                    {type: "color", id: "accent", name: "Accent", value: toHex(s.accent), defaultValue: DEFAULTS.accent, colors: ["#ffab4c", "#ff8a3d", "#f5c04a", "#e88a95", "#ff7ab6", "#8b9cf0", "#7dd3fc", "#6ccfb0"]},
                    {type: "color", id: "accent2", name: "Second gradient colour", value: toHex(s.accent2), defaultValue: DEFAULTS.accent2, colors: ["#ffc75e", "#ff4d6d", "#50c8ff", "#5eead4", "#ffb38a", "#2dd4bf", "#e88a95", "#8b9cf0"]},
                    {
                        type: "button", id: "clearChannelAccents", name: "Per-channel accents",
                        note: `Right-click any channel → Lighthouse accent to give it its own colour. ${channelAccentCount} channel${channelAccentCount === 1 ? " has" : "s have"} one.`,
                        children: "Clear all channel accents",
                        onClick: () => {
                            this.channelAccents = {};
                            this.api.Data.save("channelAccents", this.channelAccents);
                            this.lastChannel = undefined;
                            this.checkChannelAccent();
                            BdApi.UI.showToast("Channel accents cleared", {type: "success"});
                        }
                    }
                ]
            },
            {
                type: "category", id: "layout", name: "Layout", collapsible: true, shown: false,
                settings: [
                    {type: "dropdown", id: "serverBar", name: "Server list", value: s.serverBar, options: [{label: "Strip across the top", value: "top"}, {label: "Rail on the left (Discord default)", value: "side"}]},
                    {type: "switch", id: "filledChannel", name: "Accent pill for the selected channel", value: s.filledChannel},
                    {type: "slider", id: "gap", name: "Space between panels", min: 4, max: 24, step: 1, units: "px", value: s.gap, markers: [4, 12, 24]}
                ]
            },
            {
                type: "category", id: "shape", name: "Shape", collapsible: true, shown: false,
                settings: [
                    {type: "slider", id: "avatarRadius", name: "Profile picture corners", note: "0% is a hard square, 50% is a circle.", min: 0, max: 50, step: 1, units: "%", value: s.avatarRadius, markers: [0, 26, 50]},
                    {type: "slider", id: "panelRadius", name: "Panel corners", min: 6, max: 28, step: 1, units: "px", value: s.panelRadius, markers: [6, 18, 28]}
                ]
            },
            {
                type: "category", id: "fonts", name: "Fonts", collapsible: true, shown: false,
                settings: [
                    {type: "dropdown", id: "bodyFont", name: "Text font", value: s.bodyFont, options: Object.entries(FONTS).map(([value, f]) => ({label: f.label, value}))},
                    {type: "dropdown", id: "displayFont", name: "Heading font", note: "Server name and channel title. Pricedown and Chalet are used if installed on your PC; otherwise Lighthouse uses Anton and Archivo, the closest free fonts.", value: s.displayFont, options: [{label: "Bricolage Grotesque", value: "bricolage"}, {label: "Pricedown (GTA logo)", value: "pricedown"}, {label: "Same as text font", value: "body"}]}
                ]
            },
            {
                type: "category", id: "profiles", name: "Profiles", collapsible: true, shown: false,
                settings: [
                    {type: "custom", id: "shareCodes", name: "Share your setup", note: "Copy a code of your whole setup to send to a friend, or paste theirs to try it. Your notes and bookmarks are never included.", children: React.createElement(Share)},
                    {type: "custom", id: "profileManager", name: "Saved setups", note: "Save your whole Lighthouse setup under a name and switch between setups. Profiles also show in the command palette. Reopen this window after loading one to see its values.", children: React.createElement(Profiles)}
                ]
            },
            {
                type: "category", id: "bookmarksCat", name: "Bookmarks", collapsible: true, shown: false,
                settings: [
                    {type: "custom", id: "bookmarkList", name: "Saved messages", note: "Click one to jump to it. They also show in the command palette.", children: React.createElement(Marks)}
                ]
            },
            {
                type: "category", id: "updates", name: "Updates", collapsible: true, shown: false,
                settings: [
                    {type: "switch", id: "healthCheck", name: "Breakage alerts", note: "After Discord updates, Lighthouse checks it can still find the parts it styles, and tells you if something stopped matching.", value: s.healthCheck},
                    {type: "button", id: "healthNow", name: "Health check", note: "Check right now.", children: "Run health check", onClick: () => this.runHealthCheck(true)},
                    {type: "switch", id: "whatsNew", name: "What's new card", note: "Shows what changed after Lighthouse updates.", value: s.whatsNew},
                    {type: "switch", id: "autoUpdate", name: "Check for updates", note: "When Discord starts, Lighthouse checks GitHub for a newer version of this plugin and asks before installing it. The theme itself always loads the latest version.", value: s.autoUpdate},
                    {type: "button", id: "checkNow", name: "Check now", note: `You have v${this.meta.version}.`, children: "Check for updates", onClick: () => this.checkForUpdate(true)}
                ]
            },
            {
                type: "category", id: "reset", name: "Reset", collapsible: true, shown: false,
                settings: [
                    {
                        type: "button", id: "resetAll", name: "Reset everything", note: "Puts every setting back to its default. Saved profiles and channel accents are kept. Reopen this window to see the defaults.",
                        children: "Reset to defaults",
                        onClick: () => {
                            this.settings = Object.assign({}, DEFAULTS);
                            this.save();
                            this.apply();
                            this.refreshFeatures();
                            BdApi.UI.showToast("Lighthouse settings reset", {type: "success"});
                        }
                    }
                ]
            }
        ];

        const panel = BdApi.UI.buildSettingsPanel({
            settings,
            onChange: (category, id, value) => {
                if (["colourway", "resetAll", "clearChannelAccents", "profileManager", "checkNow", "healthNow", "shareCodes", "bookmarkList"].includes(id)) return;
                this.set(id, (id === "accent" || id === "accent2") ? toHex(value) : value);
            }
        });

        return React.createElement("div", {className: "lh-settings"},
            themeOn === false ? React.createElement("div", {className: "lh-warning"},
                "The Lighthouse theme is turned off. Turn it on in Settings → Themes for these settings to show.") : null,
            panel
        );
    }
};

/* styles for everything this plugin adds; uses the theme's colours with safe fallbacks */
const FEATURE_CSS = `
/* rounded window corners */
html.lh-round, html.lh-round body { background: transparent !important; }
html.lh-round #app-mount { border-radius: var(--lh-window-radius, 12px); clip-path: inset(0 round var(--lh-window-radius, 12px)); overflow: hidden; background: var(--lh-base, var(--bg-4, #0a111d)) !important; }
@media (display-mode: fullscreen) { html.lh-round #app-mount { border-radius: 0; clip-path: none; } }
html.lh-round.lh-maximised #app-mount { border-radius: 0; clip-path: none; }

.lh-ico { display: inline-flex; flex: none; }
.lh-kbd {
    font: 600 11px/1 var(--code-font, ui-monospace), ui-monospace, monospace; padding: 3px 6px; border-radius: 6px;
    border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.2); color: var(--text-4, #93a0b5); background: rgb(var(--lh-tint, 140 170 220) / 0.06);
}
.lh-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* command palette */
.lh-palette-backdrop {
    position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center; align-items: flex-start; padding-top: 14vh;
    background: rgb(0 0 0 / 0.45);
}
.lh-palette {
    width: min(640px, calc(100vw - 32px)); max-height: 62vh; display: flex; flex-direction: column; overflow: hidden;
    background: var(--lh-raised, #152034); color: var(--text-2, #e3e9f2); border-radius: 20px;
    border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.16);
    box-shadow: 0 40px 100px -20px rgb(0 0 0 / 0.8), 0 0 0 1px rgb(0 0 0 / 0.3);
    font-family: var(--font, 'Manrope'), sans-serif; animation: lh-pop .16s cubic-bezier(.2,.8,.2,1);
}
@keyframes lh-pop { from { opacity: 0; transform: translateY(-6px) scale(.985); } }
.lh-palette-search { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.1); color: var(--text-4, #93a0b5); }
.lh-palette-input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--text-1, #f3f6fa); font-family: inherit; font-size: 16px; font-weight: 500; }
.lh-palette-input::placeholder { color: var(--text-5, #8190a6); }
.lh-palette-list { overflow-y: auto; padding: 6px; }
.lh-palette-group { padding: 10px 10px 4px; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text-5, #8190a6); }
.lh-palette-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 10px; cursor: pointer; color: var(--text-3, #c9d2df); }
.lh-palette-item.lh-active { background: var(--lh-2, #ffab4c); color: var(--lh-on-accent, #1d1206); }
.lh-palette-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.lh-palette-hint { font-size: 12px; opacity: .75; }
.lh-palette-empty { padding: 18px 12px; color: var(--text-4, #93a0b5); }
.lh-palette-foot { display: flex; justify-content: space-between; gap: 10px; padding: 9px 14px; font-size: 12px; color: var(--text-5, #8190a6); border-top: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.1); }

/* card hover glow: the ring is styled by the Lighthouse theme (it draws only the card's edge near the cursor) */
.lh-glow-ring { position: absolute; inset: 0; pointer-events: none; opacity: 0; }

/* title bar search pill */
.lh-titlebar-search {
    -webkit-app-region: no-drag;
    display: inline-flex; align-items: center; gap: 10px; height: 30px; min-width: min(340px, 40vw); max-width: 460px;
    padding: 0 6px 0 5px; border-radius: 999px; cursor: pointer;
    background: rgb(var(--lh-tint, 140 170 220) / 0.06); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.12);
    color: var(--text-2, #e3e9f2); font-family: var(--lh-display-font, sans-serif); font-size: 13px; font-weight: 700;
    transition: background .15s ease, border-color .15s ease, box-shadow .15s ease;
}
.lh-titlebar-search:hover { background: rgb(var(--lh-tint, 140 170 220) / 0.1); border-color: rgb(var(--lh-tint, 140 170 220) / 0.2); }
.lh-titlebar-search:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 2px; }
.lh-tb-icon { width: 20px; height: 20px; flex: none; display: inline-flex; align-items: center; justify-content: center; color: var(--text-4, #93a0b5); }
.lh-tb-icon img { width: 20px; height: 20px; border-radius: 6px; object-fit: cover; }
.lh-tb-label { flex: 1; min-width: 0; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; letter-spacing: -0.01em; }
.lh-tb-kbd { flex: none; }

/* server overview card */
.lh-dash-card {
    flex: none; margin: 8px 10px 10px; padding: 12px 14px; border-radius: 14px;
    background: rgb(var(--lh-tint, 140 170 220) / 0.05); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.1);
}
.lh-dash-title { font: 800 13px/1.2 var(--lh-display-font, sans-serif); color: var(--text-1, #f3f6fa); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px; }
.lh-dash-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.lh-dash-stat { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.lh-dash-label { font-size: 11px; color: var(--text-5, #8190a6); }
.lh-dash-value { font: 800 16px/1.2 var(--lh-display-font, sans-serif); color: var(--text-1, #f3f6fa); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lh-dash-stat:last-child .lh-dash-value { color: var(--lh-2, #ffab4c); }

/* overview card always sits at the bottom of the channel list */
.lh-dash-card { order: 9999; margin-top: auto; }

/* colourway dot */
.lh-colour-dot {
    -webkit-app-region: no-drag; width: 30px; height: 30px; border-radius: 999px; border: 0; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; background: transparent;
    transition: background .15s ease;
}
.lh-colour-dot:hover { background: rgb(var(--lh-tint, 140 170 220) / 0.1); }
.lh-colour-dot:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 2px; }
.lh-colour-dot-fill { width: 14px; height: 14px; border-radius: 999px; background: linear-gradient(135deg, var(--lh-2, #ffab4c), var(--lh-b, #ffc75e)); box-shadow: 0 0 0 2px rgb(var(--lh-tint, 140 170 220) / 0.2), 0 0 10px -2px var(--lh-2, #ffab4c); }
.lh-swatch-pop {
    position: fixed; z-index: 100001; width: 260px; padding: 12px; border-radius: 16px;
    background: var(--lh-raised, #152034); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.16);
    box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.85); animation: lh-pop .14s cubic-bezier(.2,.8,.2,1);
    font-family: var(--font, 'Manrope'), sans-serif;
}
.lh-swatch-title { font: 800 12px/1 var(--lh-display-font, sans-serif); letter-spacing: .06em; text-transform: uppercase; color: var(--text-5, #8190a6); margin: 2px 2px 10px; }
.lh-swatch-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.lh-swatch { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 6px 2px; border-radius: 10px; border: 1px solid transparent; background: none; cursor: pointer; color: var(--text-3, #c9d2df); font: inherit; font-size: 11px; font-weight: 600; }
.lh-swatch:hover { background: rgb(var(--lh-tint, 140 170 220) / 0.08); }
.lh-swatch:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 1px; }
.lh-swatch-on { border-color: var(--lh-2, #ffab4c); color: var(--text-1, #fff); }
.lh-swatch-chip { width: 34px; height: 34px; border-radius: 10px; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1); }

/* now playing */
.lh-now-playing {
    -webkit-app-region: no-drag; display: inline-flex; align-items: center; gap: 8px; height: 28px; max-width: 260px; margin-left: 8px;
    padding: 0 12px 0 10px; border-radius: 999px; background: color-mix(in srgb, #1db954 14%, transparent);
    border: 1px solid color-mix(in srgb, #1db954 35%, transparent); color: var(--text-2, #e3e9f2);
    font-family: var(--font, 'Manrope'), sans-serif; font-size: 12px; font-weight: 700;
}
.lh-np-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.lh-eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 12px; flex: none; }
.lh-eq i { display: block; width: 3px; height: 100%; border-radius: 2px; background: #1db954; transform-origin: bottom; animation: lh-eq 1s ease-in-out infinite; }
.lh-eq i:nth-child(2) { animation-delay: -.35s; } .lh-eq i:nth-child(3) { animation-delay: -.7s; }
@keyframes lh-eq { 0%, 100% { transform: scaleY(.35); } 50% { transform: scaleY(1); } }

/* Spotify controls on the now-playing pill */
.lh-np-controls { display: inline-flex; gap: 2px; margin-left: 4px; flex: none; }
.lh-np-btn { width: 22px; height: 22px; border-radius: 999px; border: 0; background: transparent; color: var(--text-2, #e3e9f2); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
.lh-np-btn .lh-ico svg { width: 13px; height: 13px; }
.lh-np-btn:hover { background: color-mix(in srgb, #1db954 30%, transparent); }
.lh-np-btn:focus-visible { outline: 2px solid #1db954; outline-offset: 1px; }
.lh-now-playing { padding-right: 4px; max-width: 340px; }
.lh-np-paused .lh-eq i { animation-play-state: paused; opacity: .5; }

/* channel notes */
.lh-notes-btn { position: relative; width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.1); background: rgb(var(--lh-tint, 140 170 220) / 0.07); color: var(--text-4, #93a0b5); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; margin-right: 6px; flex: none; }
.lh-notes-btn:hover { color: var(--text-1, #fff); background: rgb(var(--lh-tint, 140 170 220) / 0.14); }
.lh-notes-btn:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 2px; }
.lh-notes-btn .lh-ico svg { width: 18px; height: 18px; }
.lh-notes-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; border-radius: 999px; background: var(--lh-2, #ffab4c); display: none; }
.lh-has-note .lh-notes-dot { display: block; }
.lh-notes {
    position: fixed; z-index: 100000; top: 120px; right: 24px; bottom: 96px; width: min(340px, calc(100vw - 48px));
    display: flex; flex-direction: column; gap: 10px; padding: 16px; border-radius: 20px;
    background: var(--lh-raised, #152034); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.16);
    box-shadow: 0 30px 80px -20px rgb(0 0 0 / 0.85); font-family: var(--font, 'Manrope'), sans-serif;
    animation: lh-slide .2s cubic-bezier(.2,.8,.2,1);
}
@keyframes lh-slide { from { opacity: 0; transform: translateX(16px); } }
.lh-notes-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.lh-notes-kicker { font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--lh-2, #ffab4c); }
.lh-notes-title { font: 800 17px/1.2 var(--lh-display-font, sans-serif); color: var(--text-1, #f3f6fa); overflow-wrap: anywhere; }
.lh-notes-area { flex: 1; resize: none; padding: 12px; border-radius: 14px; font: 500 14px/1.6 var(--font, 'Manrope'), sans-serif; color: var(--text-2, #e3e9f2); background: rgb(0 0 0 / 0.2); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.12); outline: none; }
.lh-notes-area:focus { border-color: color-mix(in srgb, var(--lh-2, #ffab4c), transparent 40%); box-shadow: 0 0 0 3px color-mix(in srgb, var(--lh-2, #ffab4c), transparent 85%); }
.lh-notes-area::placeholder { color: var(--text-5, #8190a6); }
.lh-notes-foot { font-size: 12px; color: var(--text-5, #8190a6); }

/* what's new */
.lh-news { width: min(560px, calc(100vw - 32px)); }
.lh-news-list { display: flex; flex-direction: column; gap: 10px; }
.lh-news-entry { padding: 14px 16px; border-radius: 16px; background: rgb(var(--lh-tint, 140 170 220) / 0.05); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.1); }
.lh-news-meta { display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--text-5, #8190a6); margin-bottom: 4px; }
.lh-news-tag { padding: 2px 8px; border-radius: 999px; background: var(--lh-2, #ffab4c); color: var(--lh-on-accent, #1d1206); font-weight: 800; }
.lh-news-title { margin: 0 0 6px; font: 800 16px/1.3 var(--lh-display-font, sans-serif); color: var(--text-1, #f3f6fa); }
.lh-news-items { margin: 0; padding-left: 18px; color: var(--text-3, #c9d2df); font-size: 14px; line-height: 1.6; }

/* bookmarks list in settings */
.lh-mark-open { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; text-align: left; background: none; border: 0; cursor: pointer; padding: 0; font: inherit; }
.lh-mark-text { color: var(--text-muted, #aaa); font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lh-mark-open:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 2px; border-radius: 8px; }

/* friend requests banner */
.lh-friends-banner {
    display: flex; align-items: center; gap: 10px; margin: 12px 20px 4px; padding: 10px 12px 10px 14px; border-radius: 14px; cursor: pointer;
    background: color-mix(in srgb, var(--lh-2, #ffab4c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--lh-2, #ffab4c) 45%, transparent);
    color: var(--text-1, #f3f6fa); font-family: var(--font, 'Manrope'), sans-serif; font-size: 14px; font-weight: 700; text-align: left;
}
.lh-friends-banner .lh-ico { color: var(--lh-2, #ffab4c); }
.lh-fb-text { flex: 1; }
.lh-fb-cta { padding: 6px 12px; border-radius: 999px; background: var(--lh-2, #ffab4c); color: var(--lh-on-accent, #1d1206); font-size: 13px; }
.lh-friends-banner:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 2px; }

/* shortcut sheet */
.lh-cheat {
    width: min(860px, calc(100vw - 32px)); max-height: 76vh; overflow: auto; padding: 20px 22px 22px; border-radius: 22px;
    background: var(--lh-raised, #152034); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.16);
    box-shadow: 0 40px 100px -20px rgb(0 0 0 / 0.85); color: var(--text-2, #e3e9f2); font-family: var(--font, 'Manrope'), sans-serif;
    animation: lh-pop .16s cubic-bezier(.2,.8,.2,1);
}
.lh-cheatsheet { align-items: center; padding-top: 0; }
.lh-cheat-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.lh-cheat-title { margin: 0; font: 800 22px/1.1 var(--lh-display-font, sans-serif); color: var(--text-1, #f3f6fa); letter-spacing: -.01em; }
.lh-cheat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
.lh-cheat-col { padding: 12px 14px; border-radius: 16px; background: rgb(var(--lh-tint, 140 170 220) / 0.05); border: 1px solid rgb(var(--lh-tint, 140 170 220) / 0.1); }
.lh-cheat-h { margin: 0 0 8px; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--lh-2, #ffab4c); }
.lh-cheat-row { display: flex; align-items: center; gap: 10px; padding: 5px 0; font-size: 13px; color: var(--text-3, #c9d2df); }
.lh-cheat-row .lh-kbd { flex: none; min-width: 88px; text-align: center; }

/* unread pill */
.lh-unread-pill {
    display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; margin-right: 6px; border-radius: 999px; cursor: pointer; flex: none;
    background: var(--lh-2, #ffab4c); color: var(--lh-on-accent, #1d1206); border: 0;
    font-family: var(--font, 'Manrope'), sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 10px 26px -10px rgb(0 0 0 / 0.7);
    transition: transform .15s ease, filter .15s ease;
}
.lh-unread-pill:hover { filter: brightness(1.06); }
.lh-unread-pill:focus-visible { outline: 2px solid var(--text-1, #fff); outline-offset: 2px; }
body.lh-focus .lh-unread-pill { display: none; }

/* settings window bits */
.lh-settings .lh-warning {
    margin-bottom: 16px; padding: 10px 14px; border-radius: 12px;
    background: color-mix(in srgb, #ffab4c, transparent 85%); border: 1px solid color-mix(in srgb, #ffab4c, transparent 55%);
    color: var(--text-default, #fff); font-size: 14px;
}
.bd-setting-item:has(.lh-colourways, .lh-profiles, .lh-profile-empty),
.bd-setting-item:has(.lh-colourways, .lh-profiles, .lh-profile-empty) .bd-setting-header { flex-wrap: wrap; }
*:has(> .lh-colourways), *:has(> .lh-profiles), *:has(> .lh-profile-empty) { flex: 1 1 100% !important; width: 100% !important; max-width: none !important; margin-left: 0 !important; }
.lh-colourways, .lh-profiles, .lh-profile-empty { width: 100%; box-sizing: border-box; }
.lh-colourways { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 10px; margin-top: 8px; }
.lh-colourway {
    display: flex; flex-direction: column; gap: 8px; padding: 8px; border-radius: 14px; cursor: pointer;
    background: rgb(255 255 255 / 0.03); border: 1px solid rgb(255 255 255 / 0.08); color: var(--text-default, #ddd);
    font: inherit; font-size: 13px; font-weight: 600; text-align: left;
    transition: border-color .15s ease, transform .15s ease, background .15s ease;
}
.lh-colourway:hover { border-color: rgb(255 255 255 / 0.2); transform: translateY(-1px); }
.lh-colourway:focus-visible, .lh-btn:focus-visible, .lh-input:focus-visible { outline: 2px solid var(--lh-2, #ffab4c); outline-offset: 2px; }
.lh-colourway-active { border-color: var(--lh-2, #ffab4c); background: color-mix(in srgb, var(--lh-2, #ffab4c), transparent 90%); }
.lh-colourway-swatch { display: block; height: 44px; border-radius: 9px; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.08); }
.lh-profiles { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.lh-profile-new { display: flex; gap: 8px; flex-wrap: wrap; }
.lh-input {
    flex: 1 1 220px; min-width: 0; height: 36px; padding: 0 12px; border-radius: 10px; font: inherit;
    background: rgb(0 0 0 / 0.2); color: var(--text-default, #fff); border: 1px solid rgb(255 255 255 / 0.12);
}
.lh-btn {
    height: 36px; padding: 0 14px; border-radius: 999px; font: inherit; font-weight: 700; cursor: pointer;
    background: rgb(255 255 255 / 0.06); color: var(--text-default, #fff); border: 1px solid rgb(255 255 255 / 0.12);
}
.lh-btn:disabled { opacity: .5; cursor: default; }
.lh-btn-accent { background: var(--lh-2, #ffab4c); color: var(--lh-on-accent, #1d1206); border-color: transparent; }
.lh-btn-ghost { background: none; }
.lh-profile-row { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; background: rgb(255 255 255 / 0.03); border: 1px solid rgb(255 255 255 / 0.06); }
.lh-profile-name { flex: 1; min-width: 0; font-weight: 700; color: var(--text-default, #fff); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lh-profile-empty { color: var(--text-muted, #999); font-size: 14px; }

@media (prefers-reduced-motion: reduce) { .lh-palette, .lh-cheat, .lh-swatch-pop, .lh-notes { animation: none; } .lh-eq i { animation: none; } }
`;
