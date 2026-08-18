import glob, re

new_services_html = """        <div>
          <div class="footer-col-title">Core Services</div>
          <ul class="footer-links">
            <li><a href="service-branding.html">Branding Development</a></li>
            <li><a href="service-email-marketing.html">Email Marketing</a></li>
            <li><a href="service-google-ads.html">Google Ads Advertising</a></li>
            <li><a href="service-seo.html">Search Engine Optimization</a></li>
            <li><a href="service-smm.html">Social Media Marketing</a></li>
            <li><a href="service-smo.html">Social Media Optimization</a></li>
            <li><a href="service-software.html">Software Development</a></li>
            <li><a href="service-ui-ux.html">UI/UX Design</a></li>
            <li><a href="service-web-design.html">Web Design & Development</a></li>
          </ul>
        </div>"""

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We find the Core Services block and replace it
    pattern = re.compile(r'<div>\s*<div class="footer-col-title">Core Services</div>\s*<ul class="footer-links">.*?</ul>\s*</div>', re.DOTALL)
    
    new_content = pattern.sub(new_services_html, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')
