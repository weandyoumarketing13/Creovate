import glob, re
for fpath in sorted(glob.glob('service-*.html')):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    # Find the title which is in <div class="services-title-bottom ...">...</div>
    m = re.search(r'<div class="services-title-bottom[^>]*>(.*?)</div>', content, re.DOTALL)
    if m:
        title = m.group(1).strip()
        print(f'{fpath}: {title}')
