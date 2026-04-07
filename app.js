const siteData = window.siteData;

if (!siteData) {
  throw new Error("siteData is missing. Check site-data.js.");
}

const page = document.body.dataset.page || "home";
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogImageMeta = document.querySelector('meta[property="og:image"]');

const pageTitle =
  page === "videos" ? `${siteData.brandName} | videos` : siteData.brandName;
const pageDescription =
  page === "videos" ? siteData.videoPageDescription : siteData.seoDescription;

document.title = pageTitle;
document.documentElement.style.setProperty(
  "--background-image",
  `url("${siteData.backgroundImage}")`
);

if (descriptionMeta) {
  descriptionMeta.setAttribute("content", pageDescription);
}

if (ogTitleMeta) {
  ogTitleMeta.setAttribute("content", pageTitle);
}

if (ogDescriptionMeta) {
  ogDescriptionMeta.setAttribute("content", pageDescription);
}

if (ogImageMeta) {
  ogImageMeta.setAttribute("content", siteData.backgroundImage);
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
