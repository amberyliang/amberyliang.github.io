/* ============================================================
   互動 — 純原生，無動畫函式庫
   側欄、複製 Email、發表手風琴、潛點 Pin、章節標籤列
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. 手機版側欄 Drawer ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var closeBtn = document.querySelector(".drawer-close");
  var mask = document.querySelector(".drawer-mask");

  function closeDrawer() { document.body.classList.remove("drawer-open"); }

  if (toggle) toggle.addEventListener("click", function () { document.body.classList.add("drawer-open"); });
  [closeBtn, mask].forEach(function (el) {
    if (el) el.addEventListener("click", closeDrawer);
  });
  document.querySelectorAll(".drawer-nav a").forEach(function (a) {
    a.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---------- 2. 複製 Email ---------- */
  document.querySelectorAll(".copy-email").forEach(function (btn) {
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(btn.dataset.email).then(function () {
        var original = btn.textContent;
        btn.textContent = "COPIED ✓";
        setTimeout(function () { btn.textContent = original; }, 1600);
      });
    });
  });

  /* ---------- 3. 手風琴（研究發表） ---------- */
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    if (!trigger || !panel) return;
    trigger.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open);
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });

  /* ---------- 4. 潛點地圖：Pin 針 → 日誌卡片 ---------- */
  var activeLog = null;
  document.querySelectorAll(".map-pin").forEach(function (pin) {
    var card = document.getElementById(pin.dataset.log);
    if (!card) return;
    function show() {
      if (activeLog && activeLog !== card) activeLog.classList.remove("is-visible");
      card.classList.add("is-visible");
      activeLog = card;
    }
    function hide() { card.classList.remove("is-visible"); }
    pin.addEventListener("mouseenter", show);
    pin.addEventListener("mouseleave", hide);
    pin.addEventListener("click", function (e) {   // 觸控裝置
      e.stopPropagation();
      card.classList.contains("is-visible") ? hide() : show();
    });
  });
  document.addEventListener("click", function () {
    if (activeLog) activeLog.classList.remove("is-visible");
  });

  /* ---------- 5. 章節標籤列：點擊捲動 + Scroll Spy ---------- */
  var pills = document.querySelectorAll(".pill");
  if (!pills.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      var target = document.querySelector(pill.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  var sections = [];
  pills.forEach(function (pill) {
    var el = document.querySelector(pill.dataset.target);
    if (el) sections.push({ el: el, selector: pill.dataset.target });
  });

  function setActivePill(selector) {
    pills.forEach(function (p) {
      p.classList.toggle("is-active", p.dataset.target === selector);
    });
  }

  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var match = sections.filter(function (s) { return s.el === entry.target; })[0];
        if (match) setActivePill(match.selector);
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  sections.forEach(function (s) { observer.observe(s.el); });
})();
