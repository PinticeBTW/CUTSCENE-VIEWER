import OBR from "@owlbear-rodeo/sdk";

const gmUI = document.getElementById("gmUI");
const playerUI = document.getElementById("playerUI");
const video = document.getElementById("cutsceneVideo");
const sendBtn = document.getElementById("sendBtn");
const videoUrlInput = document.getElementById("videoUrl");

OBR.onReady(async () => {
  const role = await OBR.player.getRole();

  if (role === "GM") {
    gmUI.style.display = "block";
  } else {
    playerUI.style.display = "block";
  }

  sendBtn?.addEventListener("click", () => {
    const url = videoUrlInput.value.trim();
    if (!url.endsWith(".mp4")) return alert("URL precisa terminar em .mp4");
    OBR.broadcast.sendMessage("CUTSCENE_PLAY", url);
  });

  OBR.broadcast.onMessage("CUTSCENE_PLAY", (url) => {
    if (video) {
      video.src = url;
      video.play().catch(() => {
        console.warn("Autoplay falhou, o utilizador pode ter de clicar");
      });
    }
  });
});