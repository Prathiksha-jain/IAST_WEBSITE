// js/include-footer.js
(async function () {
  try {
    const resp = await fetch("footer.html", { cache: "no-store" });
    if (!resp.ok) throw new Error("Failed to load footer.html");

    const html = await resp.text();

    let root = document.getElementById("footer-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "footer-root";
      document.body.appendChild(root);
    }

    root.innerHTML = html;

  } catch (err) {
    console.error("Footer include error:", err);
  }
})();
