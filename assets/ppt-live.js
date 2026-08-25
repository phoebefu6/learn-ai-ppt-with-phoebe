/* ============================================================
   ppt-live.js - "The 30-second test"
   learn-ai-ppt-with-phoebe

   A real slide rendered in the DOM that restructures as you
   toggle design levers, scored against a deterministic
   comprehension model. Two modes: BUILD (one slide) and
   SCORECARD (a golden set of six).

   Honesty rail, stated on the page: the audience is a teaching
   simulation. The contrast ratio is NOT - it is real WCAG 2.2
   maths run on the actual colours the slide is painted with.

   Lever weights are grounded in Garner and Alley 2013
   (assertion-evidence, p < .01) and Mayer's coherence,
   signaling and redundancy principles. They are a model of
   that research, not a measurement of your room.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- real WCAG 2.2 contrast, no shortcuts ---------- */
  function lum(hex) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var c = [0, 2, 4].map(function (i) {
      var v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function ratio(a, b) {
    var l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function floor2(n) { return Math.floor(n * 100) / 100; } /* WCAG: never round up */

  /* ---------- the model ------------------------------------- */
  var BASE = 0.34;
  var LEVERS = [
    { id: "headline", w: 0.20, session: 3,
      name: "Sentence headline that states the message",
      why: "Assertion-evidence. Garner and Alley 2013: audiences given a sentence headline plus visual evidence understood and remembered more, at p < .01." },
    { id: "evidence", w: 0.14, session: 3,
      name: "One visual as the evidence, not a bullet list",
      why: "The second half of assertion-evidence. The headline makes the claim, the visual proves it." },
    { id: "coherence", w: 0.08, session: 3,
      name: "Strip anything off-message",
      why: "Mayer's coherence principle: people learn better when extraneous words, pictures and sounds are excluded." },
    { id: "signaling", w: 0.07, session: 4,
      name: "Cue the one number that matters",
      why: "Mayer's signaling principle: cues that highlight the organisation of the essential material raise comprehension." },
    { id: "contrast", w: 0.08, session: 6, locked: true,
      name: "Text clears WCAG 4.5:1",
      why: "WCAG 2.2 SC 1.4.3. Not a preference - it is the line between readable and invisible from row 12." }
  ];
  var TRAPS = [
    { id: "narrate", w: -0.19,
      name: "Put the script on the slide and read it aloud",
      why: "Mayer's redundancy principle. Graphics plus narration beats graphics plus narration plus the same words on screen. Reading your slide out loud makes it worse, not safer." },
    { id: "morebullets", w: -0.15,
      name: "Add more bullets so nothing gets missed",
      why: "Every bullet you add splits the 30 seconds further. Completeness is a document's job, not a slide's." }
  ];

  /* ---------- the golden set -------------------------------- */
  var GOLDEN = [
    { id: "revenue", title: "Q3 revenue", ceil: 0.93,
      boost: { headline: 0.04, signaling: 0.03 },
      topic: "Q3 Revenue Performance Review",
      assert: "Q3 missed by 8 percent, and EMEA is the entire gap",
      ask: "Approve the EMEA sales hire",
      fail: "Without a sentence headline the room reads a title and guesses. Half of them think this is an FYI.",
      bars: [["APAC", 41, "flat"], ["AMER", 46, "up 3"], ["EMEA", 27, "down 14"]], flag: 2, unit: "$M" },
    { id: "renewal", title: "Vendor renewal", ceil: 0.91,
      boost: { evidence: 0.05, signaling: 0.04 },
      topic: "Vendor Contract Renewal - Acme Data Platform",
      assert: "Renewing Acme as-is costs 2.1x what the same workload costs on the new tier",
      ask: "Sign the tier change before the 30 September auto-renew",
      fail: "A renewal slide with no visual comparison gets deferred. Deferred past an auto-renew date is a decision.",
      bars: [["Current", 84, "as-is"], ["New tier", 40, "same workload"]], flag: 0, unit: "$k/yr" },
    { id: "hiring", title: "Hiring request", ceil: 0.92,
      boost: { headline: 0.05 },
      topic: "H2 Headcount Plan - Operations",
      assert: "Ops is running 31 percent over capacity and two people are covering four rotas",
      ask: "Approve two ops hires in H2",
      fail: "Read as a status update, so nobody realises a decision was being asked for.",
      bars: [["Capacity", 100, "planned"], ["Actual load", 131, "today"]], flag: 1, unit: "%" },
    { id: "incident", title: "Incident review", ceil: 0.87,
      boost: { coherence: 0.06, narrate: 0.03 },
      topic: "Incident 4471 Post-Incident Review",
      assert: "The outage lasted 4 hours because the alert went to a rota nobody owned",
      ask: "Assign a named owner to every alert rota by Friday",
      fail: "Post-incident slides drown in timeline detail. The one fixable cause disappears into paragraph four.",
      bars: [["Detect", 12, "min"], ["Route", 187, "min"], ["Fix", 41, "min"]], flag: 1, unit: "min" },
    { id: "roadmap", title: "H2 roadmap", ceil: 0.90,
      boost: { coherence: 0.05, evidence: 0.03 },
      topic: "H2 2026 Product Roadmap Overview",
      assert: "Only two of the six H2 commitments are funded, and both sit in the same quarter",
      ask: "Cut two commitments or fund them now",
      fail: "A six-lane roadmap looks like progress. Nobody notices four lanes have no money behind them.",
      bars: [["Funded", 2, "of 6"], ["Unfunded", 4, "of 6"]], flag: 1, unit: "items" },
    { id: "pricing", title: "Pricing change", ceil: 0.92,
      boost: { signaling: 0.05, contrast: 0.03 },
      topic: "Proposed Pricing Update - Standard Tier",
      assert: "A 6 percent list increase covers the margin gap without touching the two biggest accounts",
      ask: "Approve the 6 percent standard-tier increase",
      fail: "The number that matters is on the slide, uncued, in the same weight as everything else.",
      bars: [["Margin gap", 6, "needed"], ["List increase", 6, "proposed"]], flag: 0, unit: "%" }
  ];


  /* Derive each slide's starting floor from its authored ceiling, so that
     "every real lever on" lands exactly on that ceiling. Boosts then change
     WHICH lever carries a given slide, not how high the slide can ever go -
     a great slide is a great slide, but they do not all get there the same way. */
  var LEVER_SUM = LEVERS.reduce(function (a, l) { return a + l.w; }, 0);
  GOLDEN.forEach(function (g) {
    var boosted = LEVERS.reduce(function (a, l) { return a + (g.boost[l.id] || 0); }, 0);
    g.off = g.ceil - BASE - LEVER_SUM - boosted;
  });

  /* ---------- state ----------------------------------------- */
  var state = {};
  LEVERS.forEach(function (l) { state[l.id] = false; });
  TRAPS.forEach(function (t) { state[t.id] = false; });
  var unlocked = false;
  var currentSlide = 0;

  function passportCount() {
    try { return (window.LWP_PASSPORT && window.LWP_PASSPORT.count()) || 0; }
    catch (e) { return 0; }
  }
  function contrastLeverAvailable() { return unlocked || passportCount() >= 4; }

  function scoreSlide(g) {
    var s = BASE + g.off;
    LEVERS.forEach(function (l) {
      if (!state[l.id]) return;
      if (l.locked && !contrastLeverAvailable()) return;
      s += l.w + (g.boost[l.id] || 0);
    });
    TRAPS.forEach(function (t) {
      if (!state[t.id]) return;
      s += t.w - (g.boost[t.id] || 0);
    });
    return Math.max(0.02, Math.min(0.97, s));
  }
  function firstMissing(g) {
    for (var i = 0; i < LEVERS.length; i++) {
      var l = LEVERS[i];
      if (l.locked && !contrastLeverAvailable()) continue;
      if (!state[l.id]) return l;
    }
    return null;
  }

  /* ---------- slide renderer (real DOM, real contrast) ------ */
  var INK = "#1E1B29", SOFT = "#D8B4FE", ACCENT = "#9333EA", DEEP = "#4C1D95",
      MUTED = "#6B6480", PAPER = "#FFFFFF", FLAG = "#F59E0B";

  function renderSlide(host, g) {
    var textColor = state.contrast && contrastLeverAvailable() ? INK : SOFT;
    var r = floor2(ratio(textColor, PAPER));
    host.textContent = "";

    var slide = document.createElement("div");
    slide.className = "pl-slide";

    if (!state.coherence) {
      var blob = document.createElement("div");
      blob.className = "pl-blob";
      slide.appendChild(blob);
      var stamp = document.createElement("div");
      stamp.className = "pl-stamp";
      stamp.textContent = "CONFIDENTIAL · DRAFT v7 · " + g.id.toUpperCase() + "-FY26-FINAL-v2";
      slide.appendChild(stamp);
    }

    var h = document.createElement("h4");
    h.className = "pl-head" + (state.headline ? " pl-assert" : " pl-topic");
    h.style.color = textColor;
    h.textContent = state.headline ? g.assert : g.topic;
    slide.appendChild(h);

    if (state.evidence) {
      slide.appendChild(buildChart(g, textColor));
    } else {
      var ul = document.createElement("ul");
      ul.className = "pl-bullets";
      ul.style.color = textColor;
      var lines = g.bars.map(function (b) {
        return b[0] + ": " + b[1] + " " + g.unit + " (" + b[2] + ")";
      });
      lines = ["Background and context for this quarter"].concat(lines,
        ["Various factors contributed to the result", "Next steps to be determined"]);
      if (state.morebullets) {
        lines = lines.concat(["Additional detail available on request",
          "See appendix for the full breakdown", "Regional splits per the attached model",
          "Assumptions unchanged from last cycle", "Owner: to be confirmed"]);
      }
      lines.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
      slide.appendChild(ul);
    }

    if (state.signaling) {
      var cue = document.createElement("p");
      cue.className = "pl-cue";
      cue.innerHTML = "<b>" + g.ask + "</b>";
      slide.appendChild(cue);
    }

    if (state.narrate) {
      var nar = document.createElement("p");
      nar.className = "pl-narrate";
      nar.style.color = textColor;
      nar.textContent = "Good morning everyone. What I want to walk you through today is the " +
        g.title.toLowerCase() + " picture, and as you can see from the numbers on this slide, " +
        "there are a few things worth drawing your attention to, which I will now read out in " +
        "order so that we are all looking at the same thing at the same time.";
      slide.appendChild(nar);
    }

    host.appendChild(slide);

    var meta = document.createElement("div");
    meta.className = "pl-meta";
    var chip = document.createElement("span");
    chip.className = "pl-chip " + (r >= 4.5 ? "ok" : "no");
    chip.textContent = "text contrast " + r.toFixed(2) + ":1 · " +
      (r >= 4.5 ? "passes WCAG AA" : "fails WCAG AA (needs 4.5:1)");
    meta.appendChild(chip);
    var real = document.createElement("span");
    real.className = "pl-real";
    real.textContent = "measured, not simulated";
    meta.appendChild(real);
    host.appendChild(meta);
  }

  function buildChart(g, textColor) {
    var NS = "http://www.w3.org/2000/svg";
    var W = 620, rowH = 46, top = 14;
    var H = top + g.bars.length * rowH + 20;
    var max = Math.max.apply(null, g.bars.map(function (b) { return b[1]; }));
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", g.assert);
    svg.setAttribute("class", "pl-chart");

    g.bars.forEach(function (b, i) {
      var y = top + i * rowH;
      var isFlag = state.signaling && i === g.flag;
      var lbl = document.createElementNS(NS, "text");
      lbl.setAttribute("x", "96"); lbl.setAttribute("y", y + 21);
      lbl.setAttribute("text-anchor", "end");
      lbl.setAttribute("font", "600 13px Inter, sans-serif");
      lbl.setAttribute("fill", textColor);
      lbl.style.font = "600 13px Inter, sans-serif";
      lbl.textContent = b[0];
      svg.appendChild(lbl);

      var bw = Math.max(6, (b[1] / max) * 400);
      var bar = document.createElementNS(NS, "rect");
      bar.setAttribute("x", "108"); bar.setAttribute("y", y + 6);
      bar.setAttribute("width", bw); bar.setAttribute("height", "24");
      bar.setAttribute("rx", "5");
      bar.setAttribute("fill", isFlag ? FLAG : (state.signaling ? SOFT : ACCENT));
      svg.appendChild(bar);

      var val = document.createElementNS(NS, "text");
      val.setAttribute("x", 108 + bw + 10); val.setAttribute("y", y + 24);
      val.setAttribute("fill", isFlag ? DEEP : textColor);
      val.style.font = (isFlag ? "800 15px" : "600 13px") + " Inter, sans-serif";
      val.textContent = b[1] + " " + g.unit + (isFlag ? "  ← " + b[2] : "");
      svg.appendChild(val);
    });
    return svg;
  }

  /* ---------- UI -------------------------------------------- */
  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }

  function mount(root) {
    var tabs = el("div", "pl-tabs");
    var tBuild = el("button", "pl-tab on", "Build one slide");
    var tCard = el("button", "pl-tab", "Score all six");
    tabs.appendChild(tBuild); tabs.appendChild(tCard);
    root.appendChild(tabs);

    var readout = el("div", "pl-readout");
    var big = el("output", "pl-big", "34%");
    var cap = el("span", "pl-cap", "of the room can state what you are asking for, in 30 seconds");
    readout.appendChild(big); readout.appendChild(cap);
    root.appendChild(readout);

    var stage = el("div", "pl-stage");
    root.appendChild(stage);

    var picker = el("div", "pl-picker");
    var pLabel = el("span", "pl-plabel", "Slide:");
    picker.appendChild(pLabel);
    GOLDEN.forEach(function (g, i) {
      var b = el("button", "pl-pick" + (i === 0 ? " on" : ""), g.title);
      b.addEventListener("click", function () {
        currentSlide = i;
        picker.querySelectorAll(".pl-pick").forEach(function (q) { q.classList.remove("on"); });
        b.classList.add("on");
        paint();
      });
      picker.appendChild(b);
    });
    root.appendChild(picker);

    var card = el("div", "pl-card");
    card.style.display = "none";
    root.appendChild(card);

    var panel = el("div", "pl-panel");
    var ph = el("div", "pl-phead");
    ph.appendChild(el("b", null, "Design levers"));
    ph.appendChild(el("span", "pl-pnote", "each one is a claim from the research, not a taste"));
    panel.appendChild(ph);

    LEVERS.concat(TRAPS).forEach(function (l) {
      var isTrap = l.w < 0;
      var row = el("label", "pl-lever" + (isTrap ? " trap" : ""));
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.id = l.id;
      row.appendChild(cb);
      var mid = el("div", "pl-lmid");
      var nm = el("b", null, l.name);
      mid.appendChild(nm);
      mid.appendChild(el("span", "pl-why", l.why));
      row.appendChild(mid);
      var chip = el("span", "pl-w", (l.w > 0 ? "+" : "") + Math.round(l.w * 100) + " pts");
      row.appendChild(chip);
      if (l.session) {
        row.appendChild(el("span", "pl-sess", "session " + l.session));
      }
      if (l.locked) {
        row.classList.add("locked");
        var lk = el("span", "pl-lock", "🔒 unlocks at 4 passport stamps");
        var by = el("button", "pl-bypass", "unlock now");
        by.addEventListener("click", function (e) {
          e.preventDefault(); e.stopPropagation();
          unlocked = true;
          row.classList.remove("locked");
          lk.remove(); by.remove();
          paint();
        });
        row.appendChild(lk); row.appendChild(by);
      }
      cb.addEventListener("change", function () {
        if (l.locked && !contrastLeverAvailable()) { cb.checked = false; return; }
        state[l.id] = cb.checked;
        row.classList.toggle("on", cb.checked);
        paint();
      });
      panel.appendChild(row);
    });

    var acts = el("div", "pl-acts");
    var allOn = el("button", "pl-btn", "Switch every real lever on");
    var reset = el("button", "pl-btn ghost", "Reset to a normal slide");
    acts.appendChild(allOn); acts.appendChild(reset);
    panel.appendChild(acts);
    root.appendChild(panel);

    var rail = el("p", "pl-rail");
    rail.innerHTML = "<b>What is real here and what is not.</b> The contrast ratio is real WCAG 2.2 " +
      "maths on the colours this slide is actually painted with, and the chart is real SVG built from " +
      "the numbers. The audience is a teaching simulation: the lever weights model " +
      "Garner and Alley 2013 and Mayer's principles, they do not measure your room.";
    root.appendChild(rail);

    allOn.addEventListener("click", function () {
      LEVERS.forEach(function (l) {
        if (l.locked && !contrastLeverAvailable()) return;
        state[l.id] = true;
      });
      TRAPS.forEach(function (t) { state[t.id] = false; });
      syncBoxes(panel); paint();
    });
    reset.addEventListener("click", function () {
      LEVERS.concat(TRAPS).forEach(function (l) { state[l.id] = false; });
      syncBoxes(panel); paint();
    });

    tBuild.addEventListener("click", function () {
      tBuild.classList.add("on"); tCard.classList.remove("on");
      stage.style.display = ""; picker.style.display = ""; card.style.display = "none";
      paint();
    });
    tCard.addEventListener("click", function () {
      tCard.classList.add("on"); tBuild.classList.remove("on");
      stage.style.display = "none"; picker.style.display = "none"; card.style.display = "";
      paint();
    });

    function syncBoxes(p) {
      p.querySelectorAll("input[type=checkbox]").forEach(function (cb) {
        cb.checked = !!state[cb.dataset.id];
        cb.closest(".pl-lever").classList.toggle("on", cb.checked);
      });
    }

    function paint() {
      var scorecardMode = card.style.display !== "none";
      if (scorecardMode) {
        card.textContent = "";
        var tot = 0;
        var tbl = el("table", "pl-table");
        var thead = el("thead");
        var hr = el("tr");
        ["Slide", "Understood in 30s", "What breaks first"].forEach(function (h) {
          hr.appendChild(el("th", null, h));
        });
        thead.appendChild(hr); tbl.appendChild(thead);
        var tb = el("tbody");
        GOLDEN.forEach(function (g) {
          var s = scoreSlide(g); tot += s;
          var tr = el("tr");
          tr.appendChild(el("td", "pl-tname", g.title));
          var td = el("td", "pl-tscore");
          var bar = el("span", "pl-tbar");
          bar.style.width = Math.round(s * 100) + "%";
          bar.className = "pl-tbar " + (s >= 0.8 ? "hi" : s >= 0.55 ? "mid" : "lo");
          td.appendChild(bar);
          td.appendChild(el("b", null, Math.round(s * 100) + "%"));
          tr.appendChild(td);
          var miss = firstMissing(g);
          tr.appendChild(el("td", "pl-tfail", miss ? g.fail : "Nothing. This slide is doing its job."));
          tb.appendChild(tr);
        });
        tbl.appendChild(tb);
        card.appendChild(tbl);
        var avg = tot / GOLDEN.length;
        big.textContent = Math.round(avg * 100) + "%";
        cap.textContent = "average across the six-slide golden set";
        var note = el("p", "pl-cardnote");
        note.textContent = avg >= 0.88
          ? "Every lever on, including the WCAG one. This is the ceiling: 91 percent, and you cannot reach it without session 6."
          : avg >= 0.78
            ? "Strong. The gap to the ceiling is the accessibility lever, which is session 6."
            : avg >= 0.5
              ? "Better than the room is used to. Keep going, the headline lever is doing most of this."
              : "This is what a normal corporate deck scores. Two thirds of the room cannot tell you what you want.";
        card.appendChild(note);
        return;
      }
      var g = GOLDEN[currentSlide];
      renderSlide(stage, g);
      var s = scoreSlide(g);
      big.textContent = Math.round(s * 100) + "%";
      cap.textContent = "of the room can state what you are asking for, in 30 seconds";
      big.className = "pl-big " + (s >= 0.8 ? "hi" : s >= 0.55 ? "mid" : "lo");
    }

    paint();
    window.PPT_LIVE = {
      state: state, score: function (i) { return scoreSlide(GOLDEN[i || 0]); },
      avg: function () {
        return GOLDEN.reduce(function (a, g) { return a + scoreSlide(g); }, 0) / GOLDEN.length;
      },
      setAll: function (v) {
        LEVERS.forEach(function (l) { state[l.id] = v; });
        TRAPS.forEach(function (t) { state[t.id] = false; });
        syncBoxes(panel); paint();
      },
      set: function (id, v) { state[id] = v; syncBoxes(panel); paint(); },
      unlock: function () { unlocked = true; paint(); },
      levers: LEVERS, traps: TRAPS, golden: GOLDEN, ratio: ratio
    };
  }

  var host = document.getElementById("ppt-live");
  if (host) mount(host);
})();
