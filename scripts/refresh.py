#!/usr/bin/env python3
"""
EPL Hub · data refresh script
Fetches live data from the Premier League's own public API (footballapi.pulselive.com,
the same backend the official site uses) and regenerates js/data.js.
Stdlib only — runs on GitHub-hosted runners.
"""
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone

SEASON_ID = 841  # 2026/27
BASE = "https://footballapi.pulselive.com/football"
HEADERS = {
    "Origin": "https://www.premierleague.com",
    "User-Agent": "Mozilla/5.0 (compatible; EPLHubBot/1.0)",
}

COLORS = {
    "MCI": ("#6cabdd", "#1c2c5b"), "ARS": ("#ef0107", "#ffffff"),
    "BHA": ("#0057b8", "#ffffff"), "BRE": ("#e30613", "#ffffff"),
    "EVE": ("#003399", "#ffffff"), "CHE": ("#034694", "#ffffff"),
    "LEE": ("#ffcd00", "#1d428a"), "HUL": ("#ffb81c", "#0b0b0b"),
    "LIV": ("#c8102e", "#ffffff"), "IPS": ("#0033a0", "#ffffff"),
    "NEW": ("#241f20", "#ffffff"), "CRY": ("#1b458f", "#c4122e"),
    "MUN": ("#da291c", "#fbe122"), "NFO": ("#dd0000", "#ffffff"),
    "AVL": ("#95bfe5", "#670e36"), "SUN": ("#eb172b", "#ffffff"),
    "BOU": ("#da291c", "#0b0b0b"), "TOT": ("#132257", "#ffffff"),
    "COV": ("#78d0f0", "#012169"), "FUL": ("#141414", "#ffffff"),
}


def get(path):
    req = urllib.request.Request(BASE + path, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def main():
    st = get(f"/standings?compSeasons={SEASON_ID}&competition=1")
    fx = get(f"/fixtures?competition=1&compSeasons={SEASON_ID}&pageSize=200&sort=asc")
    try:
        sc = get(f"/stats/ranked/players/goals?compSeasons={SEASON_ID}&competition=1&pageSize=15")
    except Exception:
        sc = {"stats": {"content": []}}

    teams = {}
    order = []
    for e in st["tables"][0]["entries"]:
        o = e["overall"]
        abbr = e["team"]["club"]["abbr"]
        teams[abbr] = {
            "rank": e["position"], "team": e["team"]["name"], "short": abbr,
            "played": o["played"], "win": o["won"], "draw": o["drawn"], "loss": o["lost"],
            "gf": o["goalsFor"], "ga": o["goalsAgainst"], "gd": o["goalsDifference"], "pts": o["points"],
            "homeW": e["home"]["won"], "homeD": e["home"]["drawn"], "homeL": e["home"]["lost"],
            "awayW": e["away"]["won"], "awayD": e["away"]["drawn"], "awayL": e["away"]["lost"],
            "stadium": e.get("ground", {}).get("name", ""),
            "city": e.get("ground", {}).get("city", ""),
            "form": "",
        }
        order.append(abbr)

    matches = fx["content"]
    now_ms = datetime.now(timezone.utc).timestamp() * 1000
    results, upcoming = [], []
    for m in matches:
        t0, t1 = m["teams"][0], m["teams"][1]
        kick = m["kickoff"]["millis"]
        item = {"gw": int(m["gameweek"]["gameweek"]), "date": m["kickoff"]["label"],
                "kickoff": int(kick), "home": t0["team"]["name"], "away": t1["team"]["name"]}
        hg, ag = t0.get("score"), t1.get("score")
        if hg is not None and ag is not None and m.get("status") == "C":
            item["hg"], item["ag"] = int(hg), int(ag)
            results.append(item)
            res = "W" if hg > ag else ("D" if hg == ag else "L")
            teams[t0["team"]["club"]["abbr"]]["form"] += res
            res = "L" if hg > ag else ("D" if hg == ag else "W")
            teams[t1["team"]["club"]["abbr"]]["form"] += res
        elif kick > now_ms:
            upcoming.append(item)

    results.sort(key=lambda x: x["kickoff"])
    upcoming.sort(key=lambda x: x["kickoff"])
    recent = results[-10:]
    next_up = upcoming[:20]
    for a in teams:
        teams[a]["form"] = teams[a]["form"][-6:]

    scorers = []
    for c in sc.get("stats", {}).get("content", [])[:12]:
        scorers.append({
            "name": c["owner"]["name"]["display"],
            "team": c["owner"]["currentTeam"]["name"],
            "short": c["owner"]["currentTeam"]["club"]["abbr"],
            "goals": int(c["value"]),
        })

    leader = teams[order[0]]
    biggest = max(results[-10:], key=lambda r: abs(r["hg"] - r["ag"])) if results else None
    top = scorers[0] if scorers else None
    best_gd = max(order, key=lambda a: teams[a]["gd"])
    bottom = teams[order[-1]]
    today = datetime.now().strftime("%Y-%m-%d")

    news = [{
        "tag": "Table", "date": today,
        "title": f"{leader['team']} lead the way with {leader['pts']} points after {leader['played']} games",
        "body": f"{leader['team']} sit top on {leader['pts']} points (W{leader['win']} D{leader['draw']} L{leader['loss']}, {leader['gf']}:{leader['ga']}). {teams[order[1]]['team']} are second on {teams[order[1]]['pts']}.",
    }]
    if biggest:
        news.append({
            "tag": "Result", "date": today,
            "title": f"Latest round: {biggest['home']} {biggest['hg']}-{biggest['ag']} {biggest['away']} among {len(recent)} games",
            "body": f"The biggest margin of the round was {biggest['home']} {biggest['hg']}-{biggest['ag']} {biggest['away']}. All recent results are on the Fixtures page.",
        })
    if top:
        news.append({
            "tag": "Golden Boot", "date": today,
            "title": f"{top['name']} leads the Golden Boot race with {top['goals']} goals",
            "body": f"{top['name']} ({top['team']}) is the division's top scorer so far with {top['goals']} goals. See the full table on the Lab page.",
        })
    news.append({
        "tag": "Stats", "date": today,
        "title": f"{teams[best_gd]['team']} boast the best goal difference (+{teams[best_gd]['gd']})",
        "body": f"Best attack-to-defence ratio: {teams[best_gd]['team']} at {teams[best_gd]['gf']}:{teams[best_gd]['ga']}. At the other end, {bottom['team']} prop up the table on {bottom['pts']} points.",
    })

    colours = {a: {"color": COLORS.get(a, ("#888", "#fff"))[0],
                   "color2": COLORS.get(a, ("#888", "#fff"))[1]} for a in order}

    data = {
        "season": "2026/27", "asOf": datetime.now().strftime("%B %d, %Y"),
        "standings": [teams[a] for a in order], "results": recent, "upcoming": next_up,
        "scorers": scorers, "news": news, "teams": colours,
    }

    out_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(out_dir, "js", "data.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write("/* ============================================================\n")
        f.write("   EPL HUB · Live data — auto-generated by scripts/refresh.py\n")
        f.write("   Source: Premier League public API (footballapi.pulselive.com)\n")
        f.write(f"   Generated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}\n")
        f.write("   ============================================================ */\n\n")
        f.write("const DATA = " + json.dumps(data, indent=1, ensure_ascii=False) + ";\n")
        f.write("""
const SEASON = DATA.season;
const DATA_AS_OF = DATA.asOf;
const STANDINGS = DATA.standings;
const RESULTS_MD6 = DATA.results;
const FIXTURES_MD7 = DATA.upcoming;
const NEWS = DATA.news;
const TOP_SCORERS = DATA.scorers;
const TEAMS = DATA.teams;
""")
    print(f"Wrote {out}: {len(order)} teams, {len(recent)} recent, {len(next_up)} upcoming, {len(scorers)} scorers")


if __name__ == "__main__":
    main()
