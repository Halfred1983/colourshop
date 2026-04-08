const siteData = window.siteData;

if (!siteData) {
  throw new Error("siteData is missing. Check site-data.js.");
}

const page = document.body.dataset.page || "home";
const descriptionMeta = document.querySelector('meta[name="description"]');
const canonicalLink = document.querySelector('link[rel="canonical"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogUrlMeta = document.querySelector('meta[property="og:url"]');
const ogImageMeta = document.querySelector('meta[property="og:image"]');
const ogImageAltMeta = document.querySelector('meta[property="og:image:alt"]');
const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
const twitterImageAltMeta = document.querySelector('meta[name="twitter:image:alt"]');
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const headerTools = document.querySelector(".header-tools");

const pageTitle =
  page === "videos" ? `${siteData.brandName} | videos` : siteData.brandName;
const pageDescription =
  page === "videos" ? siteData.videoPageDescription : siteData.seoDescription;
const siteUrl = (siteData.siteUrl || "").replace(/\/+$/, "");
const pagePath = page === "videos" ? "/videos.html" : "/";
const pageUrl = siteUrl ? new URL(pagePath, `${siteUrl}/`).toString() : window.location.href;

const toAbsoluteUrl = (value) => {
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (!siteUrl) {
    return value;
  }

  return new URL(value.replace(/^\/+/, ""), `${siteUrl}/`).toString();
};

const shareImageUrl = toAbsoluteUrl(siteData.shareImage || siteData.backgroundImage);
const shareImageAlt = siteData.shareImageAlt || `${siteData.brandName} official music site`;

document.title = pageTitle;
document.documentElement.style.setProperty(
  "--background-image",
  `url("${siteData.backgroundImage}")`
);

if (descriptionMeta) {
  descriptionMeta.setAttribute("content", pageDescription);
}

if (canonicalLink) {
  canonicalLink.setAttribute("href", pageUrl);
}

if (ogTitleMeta) {
  ogTitleMeta.setAttribute("content", pageTitle);
}

if (ogDescriptionMeta) {
  ogDescriptionMeta.setAttribute("content", pageDescription);
}

if (ogUrlMeta) {
  ogUrlMeta.setAttribute("content", pageUrl);
}

if (ogImageMeta) {
  ogImageMeta.setAttribute("content", shareImageUrl);
}

if (ogImageAltMeta) {
  ogImageAltMeta.setAttribute("content", shareImageAlt);
}

if (twitterTitleMeta) {
  twitterTitleMeta.setAttribute("content", pageTitle);
}

if (twitterDescriptionMeta) {
  twitterDescriptionMeta.setAttribute("content", pageDescription);
}

if (twitterImageMeta) {
  twitterImageMeta.setAttribute("content", shareImageUrl);
}

if (twitterImageAltMeta) {
  twitterImageAltMeta.setAttribute("content", shareImageAlt);
}

for (const brandMark of document.querySelectorAll(".js-brand-mark")) {
  brandMark.textContent = siteData.brandName;
}

const artistName = document.getElementById("artist-name");
const heroPhonetic = document.getElementById("hero-phonetic");
const heroEyebrow = document.getElementById("hero-eyebrow");
const heroText = document.getElementById("hero-text");
const releaseInline = document.getElementById("release-inline");
const releaseTitle = document.getElementById("release-title");
const releaseDate = document.getElementById("release-date");
const listenLink = document.getElementById("listen-link");
const listenNote = document.getElementById("listen-note");
const videoPageLink = document.getElementById("video-page-link");
const socialList = document.getElementById("social-list");
const videoPreviewList = document.getElementById("video-preview-list");
const pagePhonetic = document.getElementById("page-phonetic");
const pageEyebrow = document.getElementById("page-eyebrow");
const videoPageText = document.getElementById("video-page-text");
const videoEmbedGrid = document.getElementById("video-embed-grid");

if (menuToggle && siteHeader && headerTools) {
  const closeMenu = () => {
    siteHeader.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  for (const link of headerTools.querySelectorAll("a")) {
    link.addEventListener("click", closeMenu);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

if (artistName) {
  artistName.textContent = siteData.brandName;
}

if (heroPhonetic) {
  heroPhonetic.textContent = siteData.phonetic;
}

if (heroEyebrow) {
  heroEyebrow.textContent = siteData.eyebrow;
}

if (heroText) {
  const heroCopy = (siteData.heroText || "").trim();
  heroText.textContent = heroCopy;
  heroText.hidden = heroCopy.length === 0;
}

if (pagePhonetic) {
  pagePhonetic.textContent = siteData.phonetic;
}

if (pageEyebrow) {
  pageEyebrow.textContent = siteData.eyebrow;
}

if (videoPageText) {
  videoPageText.textContent = siteData.videoPageDescription;
}

if (releaseInline) {
  const release = siteData.releaseSpotlight;
  if (release?.title) {
    releaseTitle.textContent = release.title;
    releaseDate.textContent = release.date || "";
    releaseInline.hidden = false;
  } else {
    releaseInline.hidden = true;
  }
}

if (listenLink) {
  listenLink.textContent = siteData.listenLink.label;
}

const needsLinktreeUpdate =
  !siteData.listenLink.url ||
  siteData.listenLink.url.includes("replace-with-your-linktree");

if (listenLink) {
  if (needsLinktreeUpdate) {
    listenLink.href = "#";
    listenLink.setAttribute("aria-disabled", "true");
    listenLink.classList.add("is-disabled");
    if (listenNote) {
      listenNote.hidden = false;
      listenNote.textContent = siteData.listenLink.fallbackNote;
    }
  } else {
    listenLink.href = siteData.listenLink.url;
    listenLink.target = "_blank";
    listenLink.rel = "noreferrer";
  }
}

if (videoPageLink) {
  videoPageLink.href = siteData.videoPageLink.url;
  videoPageLink.textContent = siteData.videoPageLink.label;
}

const analyticsMeasurementId = (siteData.analyticsMeasurementId || "").trim();

if (analyticsMeasurementId) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    analyticsMeasurementId
  )}`;
  analyticsScript.dataset.analytics = analyticsMeasurementId;
  document.head.appendChild(analyticsScript);

  window.gtag("js", new Date());
  window.gtag("config", analyticsMeasurementId);
}

if (socialList) {
  for (const link of siteData.socialLinks) {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    const icon = document.createElement("img");
    const label = document.createElement("span");

    anchor.className = "social-link";
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.title = link.label;
    anchor.setAttribute("aria-label", link.label);

    icon.src = link.icon;
    icon.alt = "";
    icon.loading = "lazy";

    label.className = "sr-only";
    label.textContent = link.label;

    anchor.append(icon, label);
    item.appendChild(anchor);
    socialList.appendChild(item);
  }
}

if (videoPreviewList) {
  for (const video of siteData.videos.slice(0, siteData.homePreviewCount)) {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    const title = document.createElement("span");
    const meta = document.createElement("span");

    anchor.className = "video-preview-link";
    anchor.href = `${siteData.videoPageLink.url}#${video.slug}`;

    title.className = "video-preview-title";
    title.textContent = video.title;

    meta.className = "video-preview-meta";
    meta.textContent = video.meta;

    anchor.append(title, meta);
    item.appendChild(anchor);
    videoPreviewList.appendChild(item);
  }
}

if (videoEmbedGrid) {
  for (const video of siteData.videos) {
    const article = document.createElement("article");
    const body = document.createElement("div");
    const title = document.createElement("h2");
    const meta = document.createElement("p");
    const externalLink = document.createElement("a");
    const frame = document.createElement("div");
    const iframe = document.createElement("iframe");

    article.className = "video-card";
    article.id = video.slug;

    body.className = "video-card-body";

    title.className = "video-card-title";
    title.textContent = video.title;

    meta.className = "video-card-meta";
    meta.textContent = video.meta;

    externalLink.className = "video-card-link";
    externalLink.href = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    externalLink.target = "_blank";
    externalLink.rel = "noreferrer";
    externalLink.textContent = "open on youtube";

    frame.className = "video-frame";

    iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?rel=0`;
    iframe.title = video.title;
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    body.append(title, meta, externalLink);
    frame.appendChild(iframe);
    article.append(body, frame);
    videoEmbedGrid.appendChild(article);
  }
}
