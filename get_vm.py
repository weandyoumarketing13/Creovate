import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'(<section id="vision-mission".*?</section>)', content, re.DOTALL)
if m:
    print(m.group(1))
