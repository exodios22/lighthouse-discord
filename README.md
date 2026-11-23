# Lighthouse

A SimForge-style theme for [BetterDiscord](https://betterdiscord.app): deep navy, warm amber accents, floating cards, chat bubbles, square avatars and a server strip across the top. A companion plugin adds a settings window and extra features.

![Lighthouse: channel list, chat with bubbles and an editor-style code block, member list](preview/lighthouse.png)

| Command palette (Ctrl+K) | Channel notes |
|---|---|
| ![Command palette searching channels, bookmarks and actions](preview/lighthouse-palette.png) | ![Notes panel open beside the chat](preview/lighthouse-notes.png) |

<sub>Previews are mockups with made-up content.</sub>

## Install

1. Download `Lighthouse.theme.css` into your BetterDiscord **themes** folder.
2. Download `LighthouseSettings.plugin.js` into your BetterDiscord **plugins** folder.
3. Turn both on in Discord: Settings → Themes and Settings → Plugins.

The theme file is a small loader. It pulls `lighthouse.css` from this repo's GitHub Pages site every time Discord starts, so theme updates arrive by themselves. The plugin checks this repo for a newer version and asks before installing it.

## What's in it

- **Look:** SimForge navy and amber, floating cards, dashboard channel header, modern title bar, chat bubbles, square avatars, editor-style code blocks, restyled settings, menus, tooltips, pickers, friends page, calls and forums.
- **Plugin features:** matching icon set, channel notes, message bookmarks, Spotify buttons, shareable setup codes, breakage alerts, what's-new card, command palette (Ctrl+K), focus mode (Ctrl+Shift+F), shortcut sheet (Ctrl+Shift+/), title bar search pill, colourway dot and quick picker, now-playing pill, server overview card, unread pill, friend request banner, auto-collapsing sidebars, per-server, per-channel and time-of-day accents, card edge glow, settings profiles, accessibility mode, 8 colourways including the Daylight light mode.

## Credits

- Base: [midnight](https://github.com/refact0r/midnight-discord) by refact0r (MIT), loaded remotely.
- Top server strip adapted from [Horizontal Server List](https://github.com/DiscordStyles/HorizontalServerList) by Gibbu (MIT).
