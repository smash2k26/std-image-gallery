const classPhotos = {
  common: ["PASS.jpg", "PASS BLUE copy.jpg", "PASS  ed copy 2.jpg", "logo.png"],
  1: ["ABDUL HADI K.jpg", "ALI BISHRUL HAFI V.jpg", "AMAL JAHAN PK.jpg", "FAHAD VP.jpg", "HAMDAN HASAN P.jpg", "IHSAN TA.jpg", "MUHAMMED ADEEB K.jpg", "MUHAMMED ADHEEB.jpg", "MUHAMMED ADHIL.jpg", "MUHAMMED AFTHASH C.jpg", "MUHAMMED AJSAR TA.jpg", "MUHAMMED ANSIF KT.jpg", "MUHAMMED FAIZAN NP.jpg", "MUHAMMED FARHAN KK.jpg", "MUHAMMED FARHAN YUSUF.jpg", "MUHAMMED JESEEM KK.jpg", "MUHAMMED SAFWAN MS.jpg", "MUHAMMED SHAHZAD KP.jpg", "MUHAMMED SINAN.jpg", "MUHAMMED SWALIH M.jpg", "MUHAMMED ZAYAN IP.jpg", "SAEED SIRAJUDHEEN.jpg", "SAIHAAN ABDUL RAHIM.jpg", "SHAFARUL HAQUE K.jpg", "UMARUL FAROOQ TS.jpg"],
  2: ["ABDUL BASITH PC.jpg", "AFNAN M.jpg", "AHMED THALHATH.jpg", "FIDAN.jpg", "MOHAMMED SHAHABAS.jpg", "MUHAMMAD ANSHID KK.jpg", "MUHAMMAD IRFAN.jpg", "MUHAMMAD JURAIJ KU.jpg", "MUHAMMED AFEEF CK.jpg", "MUHAMMED AJSAL VT.jpg", "MUHAMMED HASHID T.jpg", "MUHAMMED HASHIM PP.jpg", "MUHAMMED MAZIN P.jpg", "MUHAMMED MUZAMMIL P.jpg", "MUHAMMED NISHAD T.jpg", "MUHAMMED RAIHAN.jpg", "MUHAMMED SHIFAN M.jpg", "MUHAMMED YASEEN TA.jpg", "MUHAMMED ZAYYAN P.jpg", "RAZEEN AHMED M.jpg", "SHEHIN MOHAMMED TK.jpg"],
  3: ["HASHIM BIN FAISAL . P.jpg", "MUHAMMED ADHIL T.jpg", "MUHAMMED AFLAH PN.jpg", "MUHAMMED ASHMIL P.jpg", "MUHAMMED BILAL CS.jpg", "MUHAMMED FARHAN VV.jpg", "MUHAMMED HAFEEF CP.jpg", "MUHAMMED HASAN KN.jpg", "MUHAMMED MISHAL K.jpg", "MUHAMMED MUSTHAFA P.jpg", "MUHAMMED SABAH KP.jpg", "MUHAMMED SABITH M.jpg", "MUHAMMED SHAFIN KK.jpg", "MUHAMMED SHAMVEEL.jpg", "MUHAMMED SHIFAN M.jpg", "MUHAMMED ZAYAN MK.jpg", "MUHSINE AMEEN.jpg", "NAZIM FAISAL K.jpg", "SIRAJUDHEEN.jpg"],
  4: ["ADEEB RAHMAN.jpg", "ADIL K.jpg", "AFLAH KM.jpg", "AHMED FAWAZ K.jpg", "AMEEN.jpg", "ANSHIF K.jpg", "DHAKIR.jpg", "JASIL PK.jpg", "NAFIH M.jpg", "RISWAN K.jpg", "SAHAL CP.jpg", "SHIBILI KT.jpg", "SWALAHUDHEENAP.jpg", "SWALIH KK.jpg", "WAMEEZ AHMAD.jpg"],
  5: ["ALFAN VF.jpg", "ANSHID K.jpg", "ASLAM.jpg", "ChatGPT Image Jul 18, 2026, 03_37_32 PM.png", "HABEEB RAHMAN.jpg", "HASHIM.jpg", "JUNAIS.jpg", "MEHROOF.jpg", "MUHSIN.jpg", "RINSHAD C.jpg", "RISHAN AP.jpg", "SHAHAL V.jpg", "SHEFIN MN.jpg", "SINAN PP.jpg", "SINAN U.jpg", "SWALIH.jpg", "UVAISE.jpg"],
  6: ["ABDUL BASITH M M.png", "AHMED YASIR M.K.jpg", "HADHI M.F.jpg", "JAZIB MOHAMMED.K.jpg", "MOHAMMED ANSHIF.jpg", "MUHAMMED AJSAL CM.jpg", "MUHAMMED ALI MUNAVVIR P.A.jpg", "MUHAMMED ARSHID.jpg", "MUHAMMED HABEEBU RAHMAN E.jpg", "MUHAMMED HADI AMEEN.jpg", "MUHAMMED NIHAL O.N.jpg", "MUHAMMED RASI .A.png", "MUHAMMED RISHAM M.K.jpg", "MUHAMMED RIYAN K.jpg", "NIZAMUDHEEN CK.jpg", "SHAHAFAS IBI AK.jpg", "SWALAHUDHEEN PS.jpg"],
  7: ["AJWAD IHSAN P.jpg", "MOHAMMED FYROOSE.jpg", "MUHAMED MUSHFIQ.jpg", "MUHAMMED BADUSHA.jpg", "MUHAMMED JURAIJ K.jpg", "MUHAMMED RISWAN.jpg", "MUHAMMED SHIFAN.jpg", "MUHAMMED SWALIH.jpg", "SHAHINSHA.jpg", "SUHAIL MUHAMMAD.jpg"]
};

const grid = document.querySelector("#gallery-grid");
const emptyState = document.querySelector("#empty-state");
const classTitle = document.querySelector("#class-title");
const classCount = document.querySelector("#class-count");
const searchInput = document.querySelector("#search-input");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxName = document.querySelector("#lightbox-name");
const lightboxClass = document.querySelector("#lightbox-class");
let activeClass = 1;

const readableName = (filename) => filename.replace(/\.[^.]+$/, "");
const imagePath = (classNumber, filename) => `public/photos/${classNumber === "common" ? "common" : `class-${classNumber}`}/${encodeURIComponent(filename)}`;

function renderGallery() {
  const query = searchInput.value.trim().toLowerCase();
  const photos = classPhotos[activeClass].filter((filename) => readableName(filename).toLowerCase().includes(query));
  classTitle.textContent = activeClass === "common" ? "Common" : `Class ${activeClass}`;
  classCount.textContent = `${photos.length} portrait${photos.length === 1 ? "" : "s"}`;
  grid.innerHTML = "";
  emptyState.hidden = photos.length > 0;

  photos.forEach((filename, index) => {
    const button = document.createElement("button");
    button.className = "photo-card";
    button.type = "button";
    button.style.animationDelay = `${Math.min(index * 24, 300)}ms`;
    button.innerHTML = `<span class="photo-frame"><img src="${imagePath(activeClass, filename)}" alt="Portrait of ${readableName(filename)}" loading="lazy"></span><span class="photo-name">${readableName(filename)}</span><span class="photo-number">${String(index + 1).padStart(2, "0")}</span>`;
    button.addEventListener("click", () => openLightbox(filename));
    grid.append(button);
  });
}

function openLightbox(filename) {
  lightboxImage.src = imagePath(activeClass, filename);
  lightboxImage.alt = `Portrait of ${readableName(filename)}`;
  lightboxName.textContent = readableName(filename);
  lightboxClass.textContent = activeClass === "common" ? "Common" : `Class ${activeClass}`;
  lightbox.showModal();
}

document.querySelectorAll(".tab-button").forEach((tab) => {
  tab.addEventListener("click", () => {
    activeClass = tab.dataset.class === "common" ? "common" : Number(tab.dataset.class);
    document.querySelectorAll(".tab-button").forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive);
    });
    searchInput.value = "";
    renderGallery();
  });
});

searchInput.addEventListener("input", renderGallery);
document.querySelector("#close-lightbox").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderGallery();
