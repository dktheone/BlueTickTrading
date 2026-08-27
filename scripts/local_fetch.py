import urllib.request

req = urllib.request.Request("http://localhost:3000", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")
    with open("scripts/page_fetched.html", "w", encoding="utf-8") as f:
        f.write(html)
print("Fetched HTML successfully, size:", len(html))
