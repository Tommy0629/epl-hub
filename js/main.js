/* ============================================================
   EPL HUB · Renderer
   ============================================================ */

function zoneClass(rank) {
  if (rank <= 4) return "zone-cl";
  if (rank === 5) return "zone-el";
  if (rank >= 18) return "zone-rel";
  return "";
}

function formBadges(form) {
  return form.split("").map(function (r) {
    var cls = r === "W" ? "form-w" : (r === "D" ? "form-d" : "form-l");
    return '<span class="form-badge ' + cls + '">' + r + "</span>";
  }).join("");
}

function crest(teamName, size) {
  var t = TEAMS[teamName] || { color: "#888", color2: "#fff" };
  var code = (STANDINGS.filter(function (s) { return s.team === teamName; })[0] || {}).short ||
             teamName.slice(0, 3).toUpperCase();
  return '<span class="crest' + (size ? " lg" : "") + '" style="background:' + t.color + ";color:" + t.color2 + '">' + code + "</span>";
}

function renderStandings(el, limit) {
  var rows = STANDINGS.slice(0, limit || STANDINGS.length)
    .map(function (s) {
      return (
        "<tr class='" + zoneClass(s.rank) + "'>" +
        "<td class='pos'>" + s.rank + "</td>" +
        "<td class='team-cell'>" + crest(s.team) + "<span class='team-name'>" + s.team + "</span></td>" +
        "<td>" + s.played + "</td>" +
        "<td>" + s.win + "</td>" +
        "<td>" + s.draw + "</td>" +
        "<td>" + s.loss + "</td>" +
        "<td>" + s.gf + ":" + s.ga + "</td>" +
        "<td class='" + (s.gd >= 0 ? "gd-pos" : "gd-neg") + "'>" + (s.gd > 0 ? "+" : "") + s.gd + "</td>" +
        "<td class='pts'>" + s.pts + "</td>" +
        "<td class='form-cell'>" + formBadges(s.form) + "</td>" +
        "</tr>"
      );
    })
    .join("");
  el.innerHTML = rows;
}

function standingsHead() {
  return (
    "<tr><th>Pos</th><th>Club</th><th>Pl</th><th>W</th><th>D</th><th>L</th>" +
    "<th>GF:GA</th><th>GD</th><th>Pts</th><th>Form</th></tr>"
  );
}

function renderResults(el) {
  el.innerHTML = RESULTS_MD6.map(function (m) {
    var hw = m.hg > m.ag, aw = m.ag > m.hg, dr = m.hg === m.ag;
    return (
      '<div class="match-row">' +
      '<div class="match-team right">' + m.home + "</div>" +
      '<div class="match-score">' +
      '<span class="' + (hw ? "score-win" : (dr ? "" : "score-lose")) + '">' + m.hg + "</span>" +
      "<span class='colon'>-</span>" +
      '<span class="' + (aw ? "score-win" : (dr ? "" : "score-lose")) + '">' + m.ag + "</span>" +
      "</div>" +
      '<div class="match-team left">' + m.away + "</div>" +
      "</div>"
    );
  }).join("");
}

function renderFixtures(el) {
  el.innerHTML = FIXTURES_MD7.map(function (m) {
    return (
      '<div class="match-row fixture">' +
      '<div class="match-date">' + m.date + "<br><small>" + m.time + " BST</small></div>" +
      '<div class="match-team right">' + m.home + "</div>" +
      '<div class="match-score"><span class="vs">VS</span></div>' +
      '<div class="match-team left">' + m.away + "</div>" +
      (m.note ? '<div class="match-note">' + m.note + "</div>" : "") +
      "</div>"
    );
  }).join("");
}

function renderTeams(el) {
  el.innerHTML = Object.keys(TEAMS).map(function (name) {
    var t = TEAMS[name];
    var row = STANDINGS.filter(function (s) { return s.team === name; })[0];
    var stats = row
      ? row.played + " played · " + row.pts + " pts · " + row.gf + ":" + row.ga
      : "—";
    return (
      '<div class="team-card" style="--c1:' + t.color + ";--c2:" + t.color2 + '">' +
      '<div class="team-card-top"></div>' +
      '<div class="team-card-body">' + crest(name, true) +
      "<h3>" + name + "</h3>" +
      '<p class="team-stats">' + stats + "</p>" +
      "</div></div>"
    );
  }).join("");
}

function renderPointsBars(el, limit) {
  var max = STANDINGS[0].pts;
  el.innerHTML = STANDINGS.slice(0, limit || 6).map(function (s) {
    var w = Math.max(8, Math.round((s.pts / max) * 100));
    return (
      '<div class="bar-row">' +
      '<span class="bar-label">' + s.rank + ". " + s.team + "</span>" +
      '<div class="bar-track"><div class="bar-fill" style="width:' + w + '%"></div>' +
      '<span class="bar-value">' + s.pts + " pts</span></div>" +
      "</div>"
    );
  }).join("");
}

function renderNews(el) {
  el.innerHTML = NEWS.map(function (n) {
    return (
      '<article class="news-card">' +
      '<div class="news-meta"><span class="news-tag">' + n.tag + "</span><span class='news-date'>" + n.date + "</span></div>" +
      "<h3>" + n.title + "</h3>" +
      "<p>" + n.body + "</p>" +
      "</article>"
    );
  }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
  var t = document.getElementById("standings-table");
  if (t) {
    t.innerHTML = standingsHead();
    renderStandings(document.getElementById("standings-body"));
  }
  var t6 = document.getElementById("standings-top");
  if (t6) renderStandings(t6, 6);
  var pb = document.getElementById("points-bars");
  if (pb) renderPointsBars(pb, 6);
  var rs = document.getElementById("results-md6");
  if (rs) renderResults(rs);
  var fx = document.getElementById("fixtures-md7");
  if (fx) renderFixtures(fx);
  var tc = document.getElementById("teams-grid");
  if (tc) renderTeams(tc);
  var nw = document.getElementById("news-list");
  if (nw) renderNews(nw);
});
