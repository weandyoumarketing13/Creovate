import os

seo_p1 = "Visibility is the foundation of digital success. Our Search Engine Optimization (SEO) strategies are designed to push your brand to the top of search results, ensuring that when your customers are looking for solutions, they find you first. We go beyond basic keywords to build a holistic, authoritative online presence."
seo_p2 = "Through meticulous on-page optimization, technical SEO audits, and high-quality link-building, we establish your brand as an industry leader in the eyes of search engines. This creates a sustainable, long-term stream of high-intent organic traffic that grows your business day after day."

content_map = {
    "service-app-development.html": (
        "In a mobile-first world, a custom application can be the ultimate differentiator for your business. We design and develop bespoke mobile applications tailored precisely to your operational needs and customer expectations. We turn complex problems into elegant digital solutions.",
        "Our engineering team focuses on creating robust, scalable architectures that guarantee smooth performance across all devices. We partner with you through the entire lifecycle—from initial ideation and prototyping to deployment and ongoing proactive maintenance."
    ),
    "service-creative-ad-shoots.html": (
        "Visual storytelling is at the heart of memorable brands. Our creative ad shoots combine professional photography and videography to capture the essence of your brand. We handle everything from concept development to flawless execution.",
        "Through cinematic brand storytelling and high-quality ad creatives, we produce content that stops the scroll. We ensure that every shot and frame resonates with your target audience, driving engagement and brand loyalty."
    ),
    "service-ecommerce-management.html": (
        "Running a successful online store requires more than just listing products. We provide comprehensive e-commerce management, focusing on platform performance and a seamless user experience. Our strategies ensure your store is optimized for conversions.",
        "We drive sustainable growth through a mix of SEO, SEM, and content strategies specifically tailored for e-commerce. From optimizing the customer journey to implementing retention and personalization tactics, we help you maximize lifetime value."
    ),
    "service-influencer-marketing.html": (
        "Trust is the currency of the modern digital landscape. Our influencer marketing campaigns connect your brand with the right voices to amplify your reach and foster genuine audience connections. We identify influencers whose values align perfectly with yours.",
        "We design and launch impactful campaigns that go beyond vanity metrics. By meticulously measuring performance and analyzing results, we ensure every collaboration delivers tangible ROI and deepens your brand's relationship with its community."
    ),
    "service-ppc-ads.html": (
        "When you need immediate, targeted visibility, Pay-Per-Click (PPC) advertising delivers. We run highly optimized paid ads on Google and other major platforms to put your brand directly in front of audiences who are ready to convert.",
        "We focus on targeting the right audience to achieve quick, measurable results. Through continuous monitoring, A/B testing, and campaign optimization, we ensure every dollar spent maximizes your Return on Investment (ROI)."
    ),
    "service-smm.html": (
        "Social media is the heartbeat of modern brand communication. We build and grow your presence on platforms like Instagram, Facebook, and LinkedIn. Our approach turns passive followers into active brand advocates.",
        "Through engaging posts, reels, and stories, we manage your accounts to boost audience engagement. Our content-driven strategies are meticulously designed to drive leads, sales, and lasting brand awareness."
    ),
    "service-social-media-ads.html": (
        "Organic reach only goes so far. Our targeted social media ad campaigns on Instagram, Facebook, Meta, and beyond ensure your message reaches the exact demographic you want. We combine creative ad designs with persuasive copywriting.",
        "Performance tracking is built into our DNA. We provide continuous monitoring and optimization for all your ad campaigns, turning data insights into actionable strategies that lower acquisition costs and increase conversions."
    ),
    "service-talent-management.html": (
        "Navigating the creator economy requires strategy and finesse. We discover and manage creative talent and influencers, helping them build strong, enduring personal brands. We handle the complexities of brand collaborations and partnerships.",
        "Our dedicated talent management team ensures smooth communication and strategic growth. We align talent with the right opportunities, fostering long-term success and impactful brand integrations."
    ),
    "service-web-development.html": (
        "Your website is the digital storefront of your business. We create responsive, professional websites engineered for speed, security, and scalability. Whether it's a corporate site or a complex web application, we deliver excellence.",
        "We specialize in e-commerce and business website solutions that feature fast, secure, and user-friendly designs. Our optimized builds ensure a flawless user experience across all devices, driving engagement and conversions."
    )
}

for filename, (p1, p2) in content_map.items():
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace(seo_p1, p1)
        content = content.replace(seo_p2, p2)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
