import re

with open('contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add reveal to contact wrapper
content = re.sub(r'(<div class="contact-wrapper")', r'\1 reveal-scale', content)

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Injected reveal classes to contact.html")
