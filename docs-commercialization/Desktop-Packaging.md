# Desktop Packaging (Electron/Tauri)

Targets
- macOS, Windows, Linux installers

Approach
- Bundle SPA + a local Node runtime (or Rust backend in Tauri)
- Detect or bundle Fabric CLI and yt-dlp; provide guided setup
- Store provider keys in OS keychain (keytar); never write to disk in plaintext

Steps
1) Create Electron/Tauri project and load your HTML UI
2) Add a background process that exposes IPC for /chat-like actions
3) Wrap Fabric/yt-dlp calls with timeouts and safe args
4) Build installers and sign/notarize for macOS and Windows

Updates
- Auto-update via Squirrel (Electron) or built-in Tauri updater
