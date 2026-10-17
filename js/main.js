/* ============================================================
   EPL Hub · Renderer v2 (live data + interactive labs)
   ============================================================ */

function zoneClass(rank) {
  if (rank <= 4) return "zone-cl";
  if (rank === 5) return "zone-el";
  if (rank >= 18) return "zone-rel";
  return "";
}

function formBadges(form) {
  return (form || "").split("").map(function (r) {
    var cls = r === "W" ? "form-w" : (r === "D" ? "form-d" : "form-l");
    return '<span class="form-badge ' + cls + '">' + r + "</span>";
  }).join("");
}

function crest(teamName, size) {
  var s = STANDINGS.filter(function (x) { return x.team === teamName; })[0];
  var code = s ? s.short : teamName.slice(0, 3).toUpperCase();
  var t = (DATA.teams[code]) || { color: "#888", color2: "#fff" };
  return '<span class="crest' + (size ? " lg" : "") +
    '" style="background:' + t.color + ";color:" + t.color2 + '">' + code + "</span>";
}

function renderStandings(el, limit) {
  el.innerHTML = STANDINGS.slice(0, limit || STANDINGS.length).map(function (s) {
    return (
      "<tr class='" + zoneClass(s.rank) + "'>" +
      "<td class='pos'>" + s.rank + "</td>" +
      "<td class='team-cell'>" + crest(s.team) + "<span class='team-name'>" + s.team + "</span></td>" +
      "<td>" + s.played + "</td><td>" + s.win + "</td><td>" + s.draw + "</td><td>" + s.loss + "</td>" +
      "<td>" + s.gf + ":" + s.ga + "</td>" +
      "<td class='" + (s.gd >= 0 ? "gd-pos" : "gd-neg") + "'>" + (s.gd > 0 ? "+" : "") + s.gd + "</td>" +
      "<td class='pts'>" + s.pts + "</td>" +
      "<td class='form-cell'>" + formBadges(s.form) + "</td></tr>"
    );
  }).join("");
}

function standingsHead() {
  return "<tr><th>Pos</th><th>Club</th><th>Pl</th><th>W</th><th>D</th><th>L</th>" +
    "<th>GF:GA</th><th>GD</th><th>Pts</th><th>Form</th></tr";
}

function renderResults(el) {
  el.innerHTML = DATA.results.map(function (m) {
    var hw = m.hg > m.ag, dr = m.hg === m.ag;
    return (
      '<div class="match-row">' +
      '<div class="match-date">MD' + m.gw + "</div>" +
      '<div class="match-team right">' + m.home + "</div>" +
      '<div class="match-score">' +
      '<span class="' + (hw ? "score-win" : (dr ? "" : "score-lose")) + '">' + m.hg + "</span>" +
      "<span class='colon'>-</span>" +
      '<span class="' + (!hw && !dr ? "score-win" : (dr ? "" : "score-lose")) + '">' + m.ag + "</span>" +
      "</div>" +
      '<div class="match-team left">' + m.away + "</div></div>"
    );
  }).join("");
}

function fmtCountdown(ms) {
  if (ms <= 0) return "Kick-off";
  var d = Math.floor(ms / 86400000);
  var h = Math.floor((ms % 86400000) / 3600000);
  var m = Math.floor((ms % 3600000) / 60000);
  if (d > 0) return d + "d " + h + "h " + m + "m";
  if (h > 0) return h + "h " + m + "m";
  return m + "m";
}

function renderUpcoming(el) {
  el.innerHTML = DATA.upcoming.map(function (m) {
    return (
      '<div class="match-row fixture">' +
      '<div class="match-date">MD' + m.gw + "<br><small>" + m.date + "</small></div>" +
      '<div class="match-team right">' + m.home + "</div>" +
      '<div class="match-score"><span class="vs">VS</span></div>' +
      '<div class="match-team left">' + m.away + "</div>" +
      '<div class="countdown" data-kickoff="' + m.kickoff + '">—</div>' +
      "</div>"
    );
  }).join("");
  tickCountdown();
}

function tickCountdown() {
  var now = Date.now();
  document.querySelectorAll(".countdown").forEach(function (el) {
    el.textContent = fmtCountdown(Number(el.getAttribute("data-kickoff")) - now);
  });
}

function renderTeams(el) {
  el.innerHTML = STANDINGS.map(function (row) {
    var t = DATA.teams[row.short] || { color: "#888", color2: "#fff" };
    var stats = row.played + " played · " + row.pts + " pts · " + row.gf + ":" + row.ga;
    return (
      '<div class="team-card" style="--c1:' + t.color + ";--c2:" + t.color2 + '">' +
      '<div class="team-card-top"></div>' +
      '<div class="team-card-body">' + crest(row.team, true) +
      "<h3>" + row.team + "</h3>" +
      '<p class="team-stats">' + stats + "</p>" +
      '<p class="team-stats sub">' + row.stadium + ", " + row.city + "</p>" +
      "</div></div>"
    );
  }).join("");
}

function renderPointsBars(el, limit) {
  var max = STANDINGS[0].pts;
  el.innerHTML = STANDINGS.slice(0, limit || 6).map(function (s) {
    var w = Math.max(8, Math.round((s.pts / max) * 100));
    return (
      '<div class="bar-row"><span class="bar-label">' + s.rank + ". " + s.team + "</span>" +
      '<div class="bar-track"><div class="bar-fill" style="width:' + w + '%"></div>' +
      '<span class="bar-value">' + s.pts + " pts</span></div></div>"
    );
  }).join("");
}

function renderNews(el) {
  el.innerHTML = NEWS.map(function (n) {
    return (
      '<article class="news-card">' +
      '<div class="news-meta"><span class="news-tag">' + n.tag + "</span><span class='news-date'>" + n.date + "</span></div>" +
      "<h3>" + n.title + "</h3><p>" + n.body + "</p></article>"
    );
  }).join("");
}

function renderScorers(el) {
  el.innerHTML = TOP_SCORERS.map(function (p, i) {
    return (
      "<tr><td class='pos'>" + (i + 1) + "</td>" +
      "<td class='team-cell'>" + crest(p.team) + "<span class='team-name'>" + p.name + "</span></td>" +
      "<td>" + p.team + "</td>" +
      "<td class='pts'>" + p.goals + " <small>goals</small></td></tr>"
    );
  }).join("");
}

function renderProjection(el) {
  var proj = STANDINGS.map(function (s) {
    var ppg = s.played ? s.pts / s.played : 0;
    return { s: s, final: Math.round(ppg * 38) };
  }).sort(function (a, b) { return b.final - a.final; });

  el.innerHTML = proj.map(function (p, i) {
    var diff = p.s.rank - (i + 1);
    var arrow = diff > 0 ? '<span class="rise">▲ ' + diff + "</span>"
      : (diff < 0 ? '<span class="drop">▼ ' + (-diff) + "</span>" : '<span class="flat">—</span>');
    return (
      "<tr><td class='pos'>" + (i + 1) + "</td>" +
      "<td class='team-cell'>" + crest(p.s.team) + "<span class='team-name'>" + p.s.team + "</span></td>" +
      "<td>" + p.s.pts + "</td><td>" + (p.s.pts / p.s.played).toFixed(2) + "</td>" +
      "<td class='pts'>" + p.final + "</td><td>" + arrow + "</td></tr>"
    );
  }).join("");
}

function renderDifficulty(el) {
  var pts = {};
  STANDINGS.forEach(function (s) { pts[s.team] = s.pts; });

  var diff = STANDINGS.map(function (s) {
    var opp = [];
    DATA.upcoming.forEach(function (m) {
      if (opp.length < 5) {
        if (m.home === s.team) opp.push(m.away);
        else if (m.away === s.team) opp.push(m.home);
      }
    });
    var avg = opp.length
      ? (opp.reduce(function (a, t) { return a + (pts[t] || 0); }, 0) / opp.length).toFixed(1)
      : "—";
    return { s: s, avg: avg, n: opp.length };
  }).sort(function (a, b) { return b.avg - a.avg; });

  var max = Math.max.apply(null, diff.map(function (d) { return Number(d.avg); }));
  el.innerHTML = diff.map(function (d) {
    var w = Math.round((Number(d.avg) / max) * 100);
    var lvl = Number(d.avg) >= 14 ? ("hard") : (Number(d.avg) >= 10 ? ("mid") : ("easy"));
    return (
      '<div class="bar-row"><span class="bar-label">' + crest(d.s.team) + " " + d.s.team + "</span>" +
      '<div class="bar-track"><div class="bar-fill ' + lvl + '" style="width:' + w + '%"></div>' +
      '<span class="bar-value">' + d.avg + " pts avg · " + d.n + " next</span></div></div>"
    );
  }).join("");
}

function findTeam(name) { return STANDINGS.filter(function (s) { return s.team === name; })[0]; }

function renderH2H(selA, selB, out) {
  var a = findTeam(selA), b = findTeam(selB);
  if (!a || !b) { out.innerHTML = ""; return; }

  var h2h = DATA.results.filter(function (m) {
    return (m.home === a.team && m.away === b.team) ||
           (m.home === b.team && m.away === a.team);
  });

  function cell(label, va, vb) {
    return '<div class="h2h-row"><span class="h2h-label">' + label + "</span>" +
      '<span class="h2h-val va">' + va + "</span>" +
      '<span class="h2h-val vb">' + vb + "</span></div>";
  }

  out.innerHTML =
    '<div class="h2h-head">' +
    crest(a.team, true) + "<b>" + a.team + "</b>" +
    '<span class="h2h-vs">VS</span>' +
    "<b>" + b.team + "</b>" + crest(b.team, true) + "</div>" +
    cell("League position", "#" + a.rank, "#" + b.rank) +
    cell("Points / game", (a.pts / a.played).toFixed(2), (b.pts / b.played).toFixed(2)) +
    cell("Goals for / game", (a.gf / a.played).toFixed(2), (b.gf / b.played).toFixed(2)) +
    cell("Goals against / game", (a.ga / a.played).toFixed(2), (b.ga / b.played).toFixed(2)) +
    cell("Home record", a.homeW + "W " + a.homeD + "D " + a.homeL + "L",
                        b.homeW + "W " + b.homeD + "D " + b.homeL + "L") +
    '<div class="h2h-form">Form: ' + formBadges(a.form) + " &nbsp;vs&nbsp; " + formBadges(b.form) + "</div>" +
    '<div class="h2h-games"><h4>This season meetings</h4>' +
    (h2h.length
      ? h2h.map(function (m) {
          return "<p>" + m.home + " " + m.hg + "-" + m.ag + " " + m.away + "</p>";
        }).join("")
      : "<p>Not met yet this season.</p>") +
    "</div>";
}

function stampDates() {
  document.querySelectorAll("[data-asof]").forEach(function (el) {
    el.textContent = DATA.asOf;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  stampDates();
  var hl = document.getElementById("hero-leaders");
  if (hl && STANDINGS.length) hl.textContent = STANDINGS[0].pts;

  var t = document.getElementById("standings-table");
  if (t) t.innerHTML = standingsHead();
  var tb = document.getElementById("standings-body");
  if (tb) renderStandings(tb);
  var t6 = document.getElementById("standings-top");
  if (t6) renderStandings(t6, 6);
  var pb = document.getElementById("points-bars");
  if (pb) renderPointsBars(pb, 6);

  var rs = document.getElementById("results-md6");
  if (rs) renderResults(rs);
  var fx = document.getElementById("fixtures-md7");
  if (fx) renderUpcoming(fx);

  var tc = document.getElementById("teams-grid");
  if (tc) renderTeams(tc);
  var nw = document.getElementById("news-list");
  if (nw) renderNews(nw);

  var sc = document.getElementById("scorers-body");
  if (sc) renderScorers(sc);
  var pr = document.getElementById("projection-body");
  if (pr) renderProjection(pr);
  var df = document.getElementById("difficulty");
  if (df) renderDifficulty(df);

  var sa = document.getElementById("h2h-a"), sb = document.getElementById("h2h-b"), out = document.getElementById("h2h-out");
  if (sa && sb && out) {
    STANDINGS.forEach(function (s) {
      sa.innerHTML += '<option>' + s.team + "</option>";
      sb.innerHTML += '<option>' + s.team + "</option>";
    });
    sa.selectedIndex = 0; sb.selectedIndex = 1;
    function go() { renderH2H(sa.value, sb.value, out); }
    sa.onchange = go; sb.onchange = go; go();
  }

  setInterval(tickCountdown, 60000);
});
