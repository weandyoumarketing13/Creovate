import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add reveal to the Hero text
content = re.sub(r'(<div class="hero-content)', r'\1 reveal', content)

# Add reveal-up to about section text
content = re.sub(r'(<div class="about-text)', r'\1 reveal-right', content)
content = re.sub(r'(<div class="about-image)', r'\1 reveal-left', content)

# Add reveal to section titles
content = re.sub(r'(<h2 class="section-title")', r'\1 reveal', content)

# Add reveal-scale to service cards (staggered)
content = re.sub(r'(<div class="service-card"[^>]*>)', r'\1\n<!-- reveal-marker -->', content)
# We can't easily stagger via simple regex, so we'll just add reveal-scale to them all
content = content.replace('<!-- reveal-marker -->', ' reveal-scale')
# Actually wait, replacing inside the div tag is safer:
content = re.sub(r'(<div class="service-card)', r'\1 reveal-scale', content)

# Add reveal-scale to why-choose-us cards
content = re.sub(r'(<div class="why-card)', r'\1 reveal-scale', content)

# Add reveal to the footer
content = re.sub(r'(<footer class="footer")', r'\1 reveal', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Injected reveal classes to index.html")
