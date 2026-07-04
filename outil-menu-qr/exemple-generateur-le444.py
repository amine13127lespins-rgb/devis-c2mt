#!/usr/bin/env python3
import json, re, html

menu = json.load(open('/tmp/claude-0/-home-user-devis-c2mt/e756f237-e3be-5c82-b8c2-807ba73fc6b0/scratchpad/menu444.json'))

ICONS = {
    "Nos Pizzas Taille M": "🍕", "Nos Pizzas Taille L": "🍕",
    "Nos Sandwichs": "🥙", "Nos Tacos": "🌯", "Nos Paninis": "🥪",
    "Nos Burgers": "🍔", "Nos Menus Enfant": "🧒", "Nos Salades": "🥗",
    "Nos Assiettes": "🍽️", "Nos Tex Mex": "🍗", "Nos Desserts": "🍰",
    "Nos Boissons": "🥤",
}
CAT_IMG = {
    "Nos Pizzas Taille M": "pizzas", "Nos Pizzas Taille L": "pizzas",
    "Nos Sandwichs": "sandwichs", "Nos Tacos": "tacos", "Nos Paninis": "paninis",
    "Nos Burgers": "burgers", "Nos Menus Enfant": "enfant", "Nos Salades": "salades",
    "Nos Assiettes": "assiettes", "Nos Tex Mex": "texmex",
    "Nos Desserts": "desserts", "Nos Boissons": "boissons",
}
SHORT = {
    "Nos Pizzas Taille M": "Pizzas M", "Nos Pizzas Taille L": "Pizzas L",
    "Nos Sandwichs": "Sandwichs", "Nos Tacos": "Tacos", "Nos Paninis": "Paninis",
    "Nos Burgers": "Burgers", "Nos Menus Enfant": "Enfant", "Nos Salades": "Salades",
    "Nos Assiettes": "Assiettes", "Nos Tex Mex": "Tex Mex", "Nos Desserts": "Desserts",
    "Nos Boissons": "Boissons",
}

def clean_name(cat, name):
    n = name.strip()
    if cat.startswith("Nos Pizzas"):
        n = re.sub(r'^Pizza\s+', '', n, flags=re.I)
        n = re.sub(r'\s+[ml]$', '', n, flags=re.I)
    n = n.replace('ognons', 'oignons').replace('Ognons', 'Oignons')
    return n[0].upper() + n[1:] if n else n

def clean_desc(d):
    d = d.replace('ognons', 'oignons').replace('Ognons', 'Oignons')
    d = re.sub(r'\s+', ' ', d).strip()
    return d[0].upper() + d[1:] if d else d

def fmt_price(p):
    return f"{float(p):.2f}".replace('.', ',')

sections, navpills = [], []
for cat in menu:
    cid = re.sub(r'[^a-z0-9]+', '-', cat['category'].lower()).strip('-')
    icon = ICONS[cat['category']]
    navpills.append(f'<a class="pill" href="#{cid}">{icon} {SHORT[cat["category"]]}</a>')
    rows = []
    for it in cat['items']:
        name = html.escape(clean_name(cat['category'], it['name']))
        desc = html.escape(clean_desc(it['desc']))
        desc_html = f'<p class="item-desc">{desc}</p>' if desc else ''
        rows.append(f'''<div class="item">
  <div class="item-head"><span class="item-name">{name}</span><span class="dots"></span><span class="item-price">{fmt_price(it["price"])}&nbsp;€</span></div>
  {desc_html}
</div>''')
    img = CAT_IMG.get(cat['category'])
    sections.append(f'''<section class="cat" id="{cid}">
  <div class="cat-banner" style="background-image:url('le444-cat-{img}.jpg')">
    <div class="cat-banner-txt"><span class="cat-icon">{icon}</span><h2>{html.escape(cat['category'])}</h2><span class="cat-count">{len(cat['items'])}</span></div>
  </div>
  <div class="items">{''.join(rows)}</div>
</section>''')

page = '''<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Le 444 — La Carte | Snack Marseille</title>
<meta name="description" content="La carte du Snack Le 444 — Pizzas, sandwichs, tacos, burgers, tex mex. 444 Boulevard National, 13003 Marseille.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#0d0f14; --card:#151922; --card2:#1a1f2b;
  --gold:#f5b942; --red:#e63946; --text:#f2ede3; --sub:#9aa3b2;
  --line:rgba(245,185,66,.15);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:130px}
body{background:var(--bg);color:var(--text);font-family:'Montserrat',sans-serif}
/* ---------- FOND D'ECRAN ---------- */
#bg{position:fixed;inset:0;z-index:-1;
  background:url('le444-bg.jpg') center/cover no-repeat;}
#bg::after{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 65% at 50% 45%,rgba(13,15,20,.55) 0%,rgba(13,15,20,.35) 55%,rgba(13,15,20,.15) 100%)}
/* colonne centrale posée sur le fond */
.frame{max-width:820px;margin:0 auto;padding:0 10px}
.panel{background:rgba(13,15,20,.86);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  border:1px solid rgba(245,185,66,.18);border-radius:24px;margin:18px 0 30px;
  box-shadow:0 24px 80px rgba(0,0,0,.65)}
/* ---------- HERO ---------- */
.hero{text-align:center;padding:44px 16px 26px;position:relative}
.hero .num{font-family:'Bebas Neue',cursive;font-size:clamp(4.6rem,16vw,7.5rem);line-height:.9;
  background:linear-gradient(180deg,#ffd97a 0%,var(--gold) 45%,#c77b1e 100%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  filter:drop-shadow(0 0 24px rgba(245,185,66,.35));letter-spacing:4px}
.hero .le{font-family:'Bebas Neue',cursive;font-size:clamp(1.2rem,4vw,1.7rem);letter-spacing:10px;color:var(--red);text-transform:uppercase}
.hero .tagline{color:var(--sub);font-size:.95rem;margin-top:10px;letter-spacing:.5px}
.badges{display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap}
.badge{font-size:.75rem;font-weight:600;padding:6px 14px;border-radius:999px;letter-spacing:.5px}
.badge.halal{background:rgba(46,160,90,.15);color:#5fd08a;border:1px solid rgba(95,208,138,.35)}
.badge.loc{background:rgba(245,185,66,.1);color:var(--gold);border:1px solid var(--line)}
.divider{width:70px;height:3px;margin:26px auto 0;border-radius:2px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent)}
/* ---------- NAV ---------- */
nav{position:sticky;top:0;z-index:50;background:rgba(13,15,20,.94);backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line);padding:10px 0}
.pills{display:flex;gap:8px;overflow-x:auto;padding:2px 14px;scrollbar-width:none}
.pills::-webkit-scrollbar{display:none}
.pill{flex:0 0 auto;text-decoration:none;color:var(--sub);font-size:.82rem;font-weight:600;
  padding:8px 14px;border-radius:999px;background:var(--card);border:1px solid transparent;
  transition:all .2s;white-space:nowrap}
.pill:hover,.pill.active{color:var(--gold);border-color:var(--line);background:var(--card2)}
/* ---------- SECTIONS ---------- */
main{max-width:760px;margin:0 auto;padding:10px 16px 40px}
.cat{margin-top:36px}
.cat-banner{position:relative;height:170px;border-radius:18px 18px 0 0;overflow:hidden;
  background-size:cover;background-position:center 35%;
  border:1px solid rgba(245,185,66,.2);border-bottom:none;
  box-shadow:0 8px 30px rgba(0,0,0,.35)}
.cat-banner::before{content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(13,15,20,.15) 0%,rgba(13,15,20,.05) 40%,rgba(21,25,34,.97) 100%)}
.cat-banner-txt{position:absolute;left:0;right:0;bottom:0;padding:12px 18px;
  display:flex;align-items:center;gap:12px}
.cat-icon{font-size:1.5rem;filter:drop-shadow(0 2px 6px rgba(0,0,0,.8))}
.cat h2{font-family:'Bebas Neue',cursive;font-size:1.9rem;letter-spacing:2px;color:var(--gold);
  font-weight:400;text-shadow:0 2px 12px rgba(0,0,0,.95)}
.cat-count{margin-left:auto;font-size:.72rem;color:var(--text);background:rgba(13,15,20,.75);
  padding:4px 10px;border-radius:999px;border:1px solid var(--line)}
.items{background:var(--card);border:1px solid rgba(255,255,255,.05);border-top:none;
  border-radius:0 0 18px 18px;padding:6px 18px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
@media(min-width:700px){.cat-banner{height:210px}}
.item{padding:15px 0;border-bottom:1px dashed rgba(255,255,255,.07)}
.item:last-child{border-bottom:none}
.item-head{display:flex;align-items:baseline;gap:10px}
.item-name{font-weight:600;font-size:.98rem}
.dots{flex:1;border-bottom:2px dotted rgba(245,185,66,.25);transform:translateY(-4px)}
.item-price{font-family:'Bebas Neue',cursive;font-size:1.25rem;color:var(--gold);letter-spacing:1px;white-space:nowrap}
.item-desc{font-size:.82rem;color:var(--sub);margin-top:5px;line-height:1.5;max-width:85%}
/* ---------- FOOTER ---------- */
footer{border-top:1px solid var(--line);margin-top:50px;padding:0 0 46px;text-align:center}
.facade-wrap{position:relative;line-height:0;overflow:hidden;border-radius:0 0 23px 23px}
.facade-wrap img{width:100%;height:auto;display:block}
.facade-wrap::after{content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(13,15,20,.55) 0%,transparent 30%,transparent 60%,rgba(13,15,20,.96) 100%)}
.facade-caption{position:absolute;bottom:12px;left:0;right:0;z-index:2;
  font-family:'Bebas Neue',cursive;font-size:1.15rem;letter-spacing:3px;color:var(--gold);
  text-shadow:0 2px 10px rgba(0,0,0,.9);line-height:1.2}
footer .f-num{font-family:'Bebas Neue',cursive;font-size:2rem;color:var(--gold);letter-spacing:3px;margin-top:22px}
footer p{color:var(--sub);font-size:.88rem;margin-top:8px;line-height:1.7;padding:0 16px}
footer .phone{color:var(--text);font-weight:700;font-size:1.05rem;letter-spacing:1px}
.pay{margin-top:14px;font-size:.75rem;color:var(--sub);opacity:.8}
/* back to top */
#top-btn{position:fixed;right:16px;bottom:16px;width:46px;height:46px;border-radius:50%;
  background:var(--card2);color:var(--gold);border:1px solid var(--line);font-size:1.2rem;
  cursor:pointer;display:none;align-items:center;justify-content:center;z-index:60;
  box-shadow:0 6px 20px rgba(0,0,0,.5)}
@media(max-width:520px){.item-desc{max-width:100%}}
</style>
</head>
<body>

<div id="bg"></div>

<div class="frame"><div class="panel">

<header class="hero">
  <div class="le">Snack&nbsp;Le</div>
  <div class="num">444</div>
  <p class="tagline">Pizzas &bull; Sandwichs &bull; Tacos &bull; Burgers &bull; Tex Mex</p>
  <div class="badges">
    <span class="badge halal">✓ 100% HALAL</span>
    <span class="badge loc">📍 444 Bd National, 13003 Marseille</span>
  </div>
  <div class="divider"></div>
</header>

<nav><div class="pills">__PILLS__</div></nav>

<main>
__SECTIONS__
</main>

<footer>
  <div class="facade-wrap">
    <img src="le444-facade.jpg" alt="Le 444 — 444 Boulevard National, Marseille" loading="lazy">
    <div class="facade-caption">RETROUVEZ-NOUS AU 444 BOULEVARD NATIONAL</div>
  </div>
  <div class="f-num">LE 444</div>
  <p>444 Boulevard National — 13003 Marseille<br>
  <span class="phone">📞 04 91 84 38 80</span><br>
  Ouvert du mardi au dimanche<br>11h30 – 14h00 &nbsp;/&nbsp; 18h00 – 23h00</p>
  <p class="pay">💳 CB &bull; Amex &bull; Apple Pay &bull; Ticket restaurant &bull; Espèces</p>
</footer>

</div></div>

<button id="top-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>
<script>
const btn=document.getElementById('top-btn');
window.addEventListener('scroll',()=>{btn.style.display=window.scrollY>600?'flex':'none';
  let cur=null;document.querySelectorAll('.cat').forEach(s=>{if(s.getBoundingClientRect().top<140)cur=s.id});
  document.querySelectorAll('.pill').forEach(p=>p.classList.toggle('active',p.getAttribute('href')==='#'+cur));
});
</script>
</body>
</html>'''

page = page.replace('__PILLS__', ''.join(navpills)).replace('__SECTIONS__', '\n'.join(sections))
with open('/home/user/devis-c2mt/le444.html', 'w') as f:
    f.write(page)
print('written', len(page), 'bytes')
