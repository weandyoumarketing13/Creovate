import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_html = """<section id="vision-mission" style="background: var(--bg-pitch); padding: 120px 0;">
  <div class="container" style="max-width: 1050px;">
    <h2 style="font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 800; text-align: center; margin-bottom: 100px; color: var(--text-primary); letter-spacing: -0.02em;" class="reveal">Our Mission & Vision</h2>
    
    <!-- Mission -->
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 80px; margin-bottom: 120px;" class="reveal">
      <div style="flex: 1; min-width: 300px;">
        <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800" alt="Mission" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; box-shadow: 0 30px 60px rgba(0,0,0,0.08);">
      </div>
      <div style="flex: 1.2; min-width: 300px;">
        <h3 style="font-size: 2.5rem; color: var(--text-primary); margin-bottom: 30px; font-weight: 800; position: relative; padding-left: 24px;">
          <span style="position: absolute; left: 0; top: 8px; bottom: 8px; width: 6px; background: var(--accent-teal); border-radius: 4px;"></span>
          Mission
        </h3>
        <p style="font-size: 1.3rem; line-height: 1.9; color: var(--text-secondary); font-weight: 300;">
          We are a team of strategists, designers, and visual storytellers passionate about building brands that people notice, remember, and trust.
        </p>
      </div>
    </div>
    
    <!-- Vision -->
    <div style="display: flex; flex-wrap: wrap-reverse; align-items: center; gap: 80px;" class="reveal">
      <div style="flex: 1.2; min-width: 300px;">
        <h3 style="font-size: 2.5rem; color: var(--text-primary); margin-bottom: 30px; font-weight: 800; position: relative; padding-left: 24px;">
          <span style="position: absolute; left: 0; top: 8px; bottom: 8px; width: 6px; background: var(--accent-purple); border-radius: 4px;"></span>
          Vision
        </h3>
        <p style="font-size: 1.3rem; line-height: 1.9; color: var(--text-secondary); font-weight: 300;">
          From concept to execution, we craft content and campaigns that inform, inspire, and convert &mdash; turning ideas into measurable growth.
        </p>
      </div>
      <div style="flex: 1; min-width: 300px;">
        <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800" alt="Vision" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; box-shadow: 0 30px 60px rgba(0,0,0,0.08);">
      </div>
    </div>
    
  </div>
</section>"""

# Replace the section
pattern = re.compile(r'<section id="vision-mission".*?</section>', re.DOTALL)
new_content = pattern.sub(new_html, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Replaced vision-mission section.")
