/**
 * @name LighthouseExport
 * @author Lighthouse
 * @description One-off helper: saves Discord's public web-app JavaScript files (the same files every Discord user downloads) to %LOCALAPPDATA%\Discord\lighthouse-re so they can be analysed for performance. Saves no messages, account data or tokens. Delete it after use.
 * @version 1.0.0
 */

module.exports = class LighthouseExport {
    start() {
        this.timer = setTimeout(() => this.run(), 8000);
    }

    stop() {
        clearTimeout(this.timer);
    }

    getSettingsPanel() {
        const b = document.createElement("button");
        b.textContent = "Save the files again";
        b.style.cssText = "padding:8px 14px;border-radius:8px;border:none;cursor:pointer;font-weight:700;background:var(--brand-500,#5865f2);color:#fff";
        b.onclick = () => this.run();
        return b;
    }

    async run() {
        const fs = require("fs"), path = require("path");
        const base = process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || "", "AppData", "Local");
        const out = path.join(base, "Discord", "lighthouse-re");
        fs.mkdirSync(out, {recursive: true});

        const urls = new Set();
        for (const s of document.querySelectorAll("script[src]")) urls.add(s.src);
        for (const l of document.querySelectorAll("link[href$='.js'], link[rel='modulepreload'], link[rel='prefetch'], link[rel='preload'][as='script']")) urls.add(l.href);
        for (const e of performance.getEntriesByType("resource")) if (/\.js(\?|$)/.test(e.name)) urls.add(e.name);
        const own = [...urls].filter(u => /^https:\/\/(canary\.|ptb\.)?discord\.com\/assets\/[^/?#]+\.js/.test(u));

        BdApi.UI.showToast(`Lighthouse: saving ${own.length} Discord web-app files…`, {type: "info"});
        const manifest = [];
        let saved = 0, bytes = 0;
        for (const url of own) {
            try {
                const res = await fetch(url, {credentials: "omit", cache: "force-cache"});
                if (!res.ok) continue;
                const text = await res.text();
                const name = url.split("/").pop().split("?")[0];
                fs.writeFileSync(path.join(out, name), text);
                manifest.push({name, url, size: text.length});
                saved++; bytes += text.length;
            } catch (e) { /* skip */ }
        }
        const build = (() => { try { return window.GLOBAL_ENV && {release: window.GLOBAL_ENV.RELEASE_CHANNEL, version: window.GLOBAL_ENV.VERSION_HASH}; } catch (e) { return null; } })();
        fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify({savedAt: new Date().toISOString(), build, files: manifest}, null, 2));
        BdApi.UI.showToast(`Lighthouse: saved ${saved} files (${Math.round(bytes / 1048576)} MB). You can turn this plugin off now.`, {type: "success", timeout: 8000});
    }
};
