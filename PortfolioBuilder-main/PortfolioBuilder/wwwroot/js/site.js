// Screenshot viewer on project pages. Without JavaScript the links simply open the image.
(function () {
  const dialog = document.getElementById("lightbox");
  const links = Array.from(document.querySelectorAll("a[data-lightbox]"));
  if (!dialog || !links.length || typeof dialog.showModal !== "function") return;

  const img = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");
  const count = dialog.querySelector(".lightbox__count");
  const nav = dialog.querySelector(".lightbox__nav");
  let current = 0;

  nav.hidden = links.length < 2;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const thumb = link.querySelector("img");
    img.src = link.href;
    img.alt = thumb ? thumb.alt : "";
    caption.textContent = link.closest("figure").querySelector("figcaption").textContent;
    count.textContent = (current + 1) + " / " + links.length;
  }

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  nav.addEventListener("click", function (event) {
    const step = event.target.getAttribute("data-step");
    if (step) show(current + Number(step));
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") show(current + 1);
    if (event.key === "ArrowLeft") show(current - 1);
  });

  // Clicking the dark area around the image closes the viewer.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
})();
