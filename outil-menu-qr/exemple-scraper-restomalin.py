#!/usr/bin/env python3
import re, json, urllib.request, html as htmlmod

CATS = [
    ("Nos Pizzas Taille M", "nos-pizzas-taille-m/865/6881/17155"),
    ("Nos Pizzas Taille L", "nos-pizzas-taille-l/865/6881/57981"),
    ("Nos Sandwichs", "nos-sandwichs/865/6881/51461"),
    ("Nos Tacos", "nos-tacos/865/6881/51457"),
    ("Nos Paninis", "nos-paninis/865/6881/17163"),
    ("Nos Burgers", "nos-burgers/865/6881/17165"),
    ("Nos Menus Enfant", "nos-menus-enfant/865/6881/51459"),
    ("Nos Salades", "nos-salades/865/6881/17159"),
    ("Nos Assiettes", "nos-assiettes/865/6881/17157"),
    ("Nos Tex Mex", "nos-tex-mex/865/6881/17167"),
    ("Nos Desserts", "nos-desserts/865/6881/17169"),
    ("Nos Boissons", "nos-boissons/865/6881/17171"),
]

def clean(s):
    s = re.sub(r"<img[^>]*alt='([^']*)'[^>]*>", r"\1 ", s)
    s = re.sub(r'<img[^>]*alt="([^"]*)"[^>]*>', r"\1 ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    s = htmlmod.unescape(s)
    return re.sub(r"\s+", " ", s).strip()

menu = []
for cat_name, path in CATS:
    url = f"https://snack-le444.fr/livraison/marseille-13014/{path}/"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    page = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    # isolate the active category content
    m = re.search(r'id="div_contenu_categorie".*?(?=<script|<footer|<!-- Colonne de gauche)', page, re.S)
    section = m.group(0) if m else page
    items = []
    # each product block: name+desc then form with prix
    for block in re.finditer(
        r'<p>\s*(.*?)\s*<i class="fas fa-info-circle[^"]*"[^>]*></i>\s*(?:<span>(.*?)</span>)?.*?article_details\[prix\]" value="([\d.]+)"',
        section, re.S):
        name = clean(block.group(1))
        desc = clean(block.group(2) or "")
        price = block.group(3)
        items.append({"name": name, "desc": desc, "price": price})
    # fallback: products without info icon
    if not items:
        for block in re.finditer(
            r'<div class="col-12 col-md-9">\s*<p>\s*(.*?)</p>.*?article_details\[prix\]" value="([\d.]+)"',
            section, re.S):

            raw = block.group(1)
            spans = re.findall(r"<span>(.*?)</span>", raw, re.S)
            name_part = re.sub(r"<span>.*?</span>", "", raw, flags=re.S)
            items.append({"name": clean(name_part), "desc": clean(spans[0]) if spans else "", "price": block.group(2)})
    menu.append({"category": cat_name, "items": items})
    print(f"{cat_name}: {len(items)} items")

with open("/tmp/claude-0/-home-user-devis-c2mt/e756f237-e3be-5c82-b8c2-807ba73fc6b0/scratchpad/menu444.json", "w") as f:
    json.dump(menu, f, ensure_ascii=False, indent=2)
print("done")
