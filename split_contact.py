import sys

def modify_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    start = -1
    end = -1
    for i, line in enumerate(lines):
        if '<!-- Contact Us Section & Estimator -->' in line:
            start = i
        if start != -1 and '</section>' in line:
            if i > start:
                end = i
                break
    
    if start != -1 and end != -1:
        del lines[start:end+1]
        
    text = ''.join(lines)
    text = text.replace('href="#contact"', 'href="contact.html"')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)

def modify_contact():
    with open('contact.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    start = -1
    end = -1
    for i, line in enumerate(lines):
        if '<!-- Hero Section -->' in line:
            start = i
        if '<!-- Contact Us Section & Estimator -->' in line:
            end = i
            break
            
    if start != -1 and end != -1:
        del lines[start:end]
        
    text = ''.join(lines)
    text = text.replace('href="#home"', 'href="index.html#home"')
    text = text.replace('href="#vision-mission"', 'href="index.html#vision-mission"')
    text = text.replace('href="#about"', 'href="index.html#about"')
    text = text.replace('href="#services"', 'href="index.html#services"')
    text = text.replace('href="#motion-gallery"', 'href="index.html#motion-gallery"')
    text = text.replace('href="#why-choose-us"', 'href="index.html#why-choose-us"')
    text = text.replace('href="#contact"', 'href="#"')
    
    with open('contact.html', 'w', encoding='utf-8') as f:
        f.write(text)

modify_index()
modify_contact()
