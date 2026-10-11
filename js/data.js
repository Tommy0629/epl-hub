/* ============================================================
   EPL HUB · 2026/27 Season Data
   Data as of: 2026-10-11 (Matchweek 6)
   Sources: Premier League official / nowscore / dongqiudi
   ============================================================ */

const SEASON = "2026/27";
const DATA_AS_OF = "October 11, 2026 · Matchweek 6";

/* Standings: team, short, played, win, draw, loss, gf, ga, gd, pts, form */
const STANDINGS = [
  { rank: 1,  team: "Manchester City",        short: "MCI", played: 6, win: 6, draw: 0, loss: 0, gf: 16, ga: 5,  gd: 11, pts: 18, form: "WWWWWW" },
  { rank: 2,  team: "Arsenal",                short: "ARS", played: 6, win: 5, draw: 0, loss: 1, gf: 10, ga: 5,  gd: 5,  pts: 15, form: "WWWWLW" },
  { rank: 3,  team: "Brighton & Hove Albion", short: "BHA", played: 6, win: 4, draw: 1, loss: 1, gf: 18, ga: 5,  gd: 13, pts: 13, form: "WLDWWW" },
  { rank: 4,  team: "Brentford",              short: "BRE", played: 6, win: 2, draw: 4, loss: 0, gf: 12, ga: 6,  gd: 6,  pts: 10, form: "WDDDWD" },
  { rank: 5,  team: "Everton",                short: "EVE", played: 6, win: 2, draw: 4, loss: 0, gf: 8,  ga: 5,  gd: 3,  pts: 10, form: "WDDDWD" },
  { rank: 6,  team: "Chelsea",                short: "CHE", played: 6, win: 3, draw: 1, loss: 2, gf: 15, ga: 13, gd: 2,  pts: 10, form: "WWLDLW" },
  { rank: 7,  team: "Leeds United",           short: "LEE", played: 6, win: 2, draw: 3, loss: 1, gf: 8,  ga: 5,  gd: 3,  pts: 9,  form: "WDDWDL" },
  { rank: 8,  team: "Hull City",              short: "HUL", played: 6, win: 2, draw: 3, loss: 1, gf: 8,  ga: 6,  gd: 2,  pts: 9,  form: "WWDDLD" },
  { rank: 9,  team: "Liverpool",              short: "LIV", played: 6, win: 2, draw: 3, loss: 1, gf: 7,  ga: 7,  gd: 0,  pts: 9,  form: "DDWDWL" },
  { rank: 10, team: "Ipswich Town",           short: "IPS", played: 6, win: 3, draw: 0, loss: 3, gf: 9,  ga: 12, gd: -3, pts: 9,  form: "WLLWLW" },
  { rank: 11, team: "Newcastle United",       short: "NEW", played: 5, win: 2, draw: 2, loss: 1, gf: 9,  ga: 9,  gd: 0,  pts: 8,  form: "DWDLW" },
  { rank: 12, team: "Crystal Palace",         short: "CRY", played: 6, win: 2, draw: 1, loss: 3, gf: 9,  ga: 12, gd: -3, pts: 7,  form: "LLWLDW" },
  { rank: 13, team: "Manchester United",      short: "MUN", played: 6, win: 1, draw: 3, loss: 2, gf: 9,  ga: 9,  gd: 0,  pts: 6,  form: "LWDLDD" },
  { rank: 14, team: "Nottingham Forest",      short: "NFO", played: 6, win: 1, draw: 2, loss: 3, gf: 5,  ga: 8,  gd: -3, pts: 5,  form: "LDDWLL" },
  { rank: 15, team: "Aston Villa",            short: "AVL", played: 6, win: 1, draw: 2, loss: 3, gf: 6,  ga: 11, gd: -5, pts: 5,  form: "LLDLWD" },
  { rank: 16, team: "Sunderland",             short: "SUN", played: 6, win: 1, draw: 1, loss: 4, gf: 6,  ga: 12, gd: -6, pts: 4,  form: "LWDLLL" },
  { rank: 17, team: "AFC Bournemouth",        short: "BOU", played: 6, win: 0, draw: 3, loss: 3, gf: 7,  ga: 13, gd: -6, pts: 3,  form: "LDDDLL" },
  { rank: 18, team: "Tottenham Hotspur",      short: "TOT", played: 6, win: 0, draw: 3, loss: 3, gf: 3,  ga: 9,  gd: -6, pts: 3,  form: "LLDDLD" },
  { rank: 19, team: "Coventry City",          short: "COV", played: 5, win: 1, draw: 0, loss: 4, gf: 1,  ga: 10, gd: -9, pts: 3,  form: "LLLW" },
  { rank: 20, team: "Fulham",                 short: "FUL", played: 6, win: 0, draw: 2, loss: 4, gf: 6,  ga: 10, gd: -4, pts: 2,  form: "LLLDDL" }
];

/* Matchweek 6 results (Oct 10-11, 2026) */
const RESULTS_MD6 = [
  { home: "Arsenal",            hg: 2, ag: 1, away: "Leeds United" },
  { home: "Aston Villa",        hg: 2, ag: 2, away: "Brentford" },
  { home: "Chelsea",            hg: 5, ag: 1, away: "AFC Bournemouth" },
  { home: "Ipswich Town",       hg: 2, ag: 1, away: "Fulham" },
  { home: "Sunderland",         hg: 0, ag: 2, away: "Brighton & Hove Albion" },
  { home: "Manchester United",  hg: 1, ag: 1, away: "Tottenham Hotspur" },
  { home: "Crystal Palace",     hg: 3, ag: 1, away: "Nottingham Forest" },
  { home: "Hull City",          hg: 2, ag: 2, away: "Everton" },
  { home: "Liverpool",          hg: 0, ag: 3, away: "Manchester City" }
];

/* Matchweek 7 fixtures (Oct 17, 2026) */
const FIXTURES_MD7 = [
  { date: "Oct 17", time: "12:30", home: "Everton",           away: "Chelsea",          note: "Featured" },
  { date: "Oct 17", time: "15:00", home: "Brentford",         away: "Liverpool" },
  { date: "Oct 17", time: "15:00", home: "Fulham",            away: "Hull City" },
  { date: "Oct 17", time: "15:00", home: "Manchester City",   away: "Ipswich Town" },
  { date: "Oct 17", time: "15:00", home: "AFC Bournemouth",   away: "Sunderland" },
  { date: "Oct 17", time: "15:00", home: "Brighton & Hove Albion", away: "Crystal Palace" },
  { date: "Oct 17", time: "15:00", home: "Leeds United",      away: "Manchester United", note: "Featured" },
  { date: "Oct 17", time: "15:00", home: "Nottingham Forest", away: "Arsenal" },
  { date: "Oct 17", time: "15:00", home: "Tottenham Hotspur", away: "Coventry City" },
  { date: "Oct 17", time: "17:30", home: "Newcastle United",  away: "Aston Villa" }
];

/* News — all items written from verified Matchweek 6 data */
const NEWS = [
  {
    tag: "Match Report", date: "2026-10-11",
    title: "Man City make it six from six after victory at Anfield",
    body: "A 3-0 win at Liverpool stretched Manchester City's perfect start to six straight wins. The champions lead the table on 18 points with a 16-5 goal record, five clear of Arsenal."
  },
  {
    tag: "Analysis", date: "2026-10-11",
    title: "Brighton's blistering start: 18 goals and the league's best goal difference",
    body: "No side attacks like Brighton right now. Six games in, the Seagulls have scored 18 and conceded just five — a +13 goal difference, the best in the division — to sit third with 13 points."
  },
  {
    tag: "Match Report", date: "2026-10-11",
    title: "Chelsea hit five past Bournemouth to end the wobble",
    body: "Chelsea responded to back-to-back defeats with a 5-1 demolition of Bournemouth at Stamford Bridge, climbing to sixth on ten points. Bournemouth remain winless and sit 17th."
  },
  {
    tag: "Match Report", date: "2026-10-11",
    title: "Arsenal keep pace with hard-fought win over Leeds",
    body: "A 2-1 victory at the Emirates kept Arsenal within five points of the leaders. Leeds, promoted with real intent this season, stay seventh but will rue a defeat that halted their unbeaten run."
  },
  {
    tag: "Match Report", date: "2026-10-11",
    title: "United and Spurs play out tense Old Trafford stalemate",
    body: "Manchester United remain 13th after a 1-1 draw with Tottenham, who stay 18th and still without a win. Both sides are searching for answers after a difficult opening month."
  }
];

/* Club theme colours */
const TEAMS = {
  "Manchester City":        { color: "#6cabdd", color2: "#1c2c5b" },
  "Arsenal":                { color: "#ef0107", color2: "#ffffff" },
  "Brighton & Hove Albion": { color: "#0057b8", color2: "#ffffff" },
  "Brentford":              { color: "#e30613", color2: "#ffffff" },
  "Everton":                { color: "#003399", color2: "#ffffff" },
  "Chelsea":                { color: "#034694", color2: "#ffffff" },
  "Leeds United":           { color: "#ffcd00", color2: "#1d428a" },
  "Hull City":              { color: "#ffb81c", color2: "#0b0b0b" },
  "Liverpool":              { color: "#c8102e", color2: "#ffffff" },
  "Ipswich Town":           { color: "#0033a0", color2: "#ffffff" },
  "Newcastle United":       { color: "#241f20", color2: "#ffffff" },
  "Crystal Palace":         { color: "#1b458f", color2: "#c4122e" },
  "Manchester United":      { color: "#da291c", color2: "#fbe122" },
  "Nottingham Forest":      { color: "#dd0000", color2: "#ffffff" },
  "Aston Villa":            { color: "#95bfe5", color2: "#670e36" },
  "Sunderland":             { color: "#eb172b", color2: "#ffffff" },
  "AFC Bournemouth":        { color: "#da291c", color2: "#0b0b0b" },
  "Tottenham Hotspur":      { color: "#132257", color2: "#ffffff" },
  "Coventry City":          { color: "#78d0f0", color2: "#012169" },
  "Fulham":                 { color: "#141414", color2: "#ffffff" }
};
