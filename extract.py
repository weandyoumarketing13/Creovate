import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("--- SECTIONS ---")
sections = re.findall(r'<section\s+id="([^"]+)"', content)
for s in sections:
    print(s)

print("\n--- SERVICES IN CONTENT ---")
services_match = re.search(r'<section\s+id="services".*?</section>', content, re.DOTALL)
if services_match:
    section = services_match.group(0)
    h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', section)
    for h3 in h3s:
        # strip tags
        text = re.sub(r'<[^>]+>', '', h3).strip()
        print(text)
