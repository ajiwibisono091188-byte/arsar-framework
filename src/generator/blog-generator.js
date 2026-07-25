import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');
const contentDir = path.join(srcDir, 'content');
const blogOutputDir = path.join(srcDir, 'pages', 'blog');

// Ensure directories exist
if (!fs.existsSync(blogOutputDir)) {
  fs.mkdirSync(blogOutputDir, { recursive: true });
}

const md = new MarkdownIt({ html: true });

// Load configurations
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(srcDir, file), 'utf8'));
const theme = readJson('config/theme.json');
const company = readJson('config/company.json');
const tracking = readJson('config/tracking.json');
const seo = readJson('config/seo.json');
const navigation = readJson('config/navigation.json');

// Configure Nunjucks Loader
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(srcDir), {
  autoescape: true,
  noCache: true
});

const articles = [];

// Read all markdown files in src/content
if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir);
  
  files.forEach((file) => {
    if (!file.endsWith('.md')) return;
    
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse front matter & markdown content
    const { data, content } = matter(fileContent);
    const htmlContent = md.render(content);
    
    const slug = file.replace(/\.md$/, '');
    const dateFormatted = new Date(data.datePublished).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const articleData = {
      ...data,
      slug,
      dateFormatted,
      contentHtml: htmlContent,
      url: `/pages/blog/${slug}.html`
    };
    
    articles.push(articleData);

    // Compile Single Article Layout
    const articleContext = {
      theme,
      company,
      tracking,
      seo: {
        ...seo,
        defaultTitle: `${data.title} - ${company.name}`,
        defaultDescription: data.description || seo.defaultDescription
      },
      navigation,
      article: articleData,
      breadcrumbs: [
        { name: 'Blog', url: '/pages/blog.html' },
        { name: data.title, url: `/pages/blog/${slug}.html` }
      ],
      pageUrl: `${company.website}/pages/blog/${slug}.html`
    };

    const renderedArticle = env.render('layouts/article.njk', articleContext);
    fs.writeFileSync(path.join(blogOutputDir, `${slug}.html`), renderedArticle, 'utf8');
    console.log(`[Blog Generator] Compiled: pages/blog/${slug}.html`);
  });
}

// Compile Blog Index List Page (src/pages/blog.html)
const blogIndexContext = {
  theme,
  company,
  tracking,
  seo: {
    ...seo,
    defaultTitle: `Blog & Insight Terbaru - ${company.name}`,
    defaultDescription: 'Dapatkan berita dan tutorial terhangat seputar AI dan digital marketing.'
  },
  navigation,
  articles,
  breadcrumbs: [
    { name: 'Blog', url: '/pages/blog.html' }
  ],
  pageUrl: `${company.website}/pages/blog.html`
};

// We will render it directly into layouts/blog.njk but with post listings injected
const blogListTemplate = `
{% extends "layouts/blog.njk" %}
{% block blog_posts %}
  {% for article in articles %}
    <div class="glow-card p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
      <div>
        {% if article.image %}
          <div class="rounded-xl overflow-hidden mb-4 aspect-video">
            <img src="{{ article.image }}" alt="{{ article.title }}" class="w-full h-full object-cover">
          </div>
        {% endif %}
        <span class="text-xs text-indigo-400 font-semibold">{{ article.dateFormatted }}</span>
        <h3 class="text-xl font-bold text-white mt-2 mb-3 hover:text-indigo-400">
          <a href="{{ article.url }}">{{ article.title }}</a>
        </h3>
        <p class="text-gray-400 text-sm leading-relaxed mb-6">{{ article.description }}</p>
      </div>
      <a href="{{ article.url }}" class="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
        Baca Selengkapnya
        <span>&rarr;</span>
      </a>
    </div>
  {% endfor %}
{% endblock %}
`;

const tempTemplateName = 'temp_blog_list.njk';
fs.writeFileSync(path.join(srcDir, tempTemplateName), blogListTemplate, 'utf8');

try {
  const renderedBlogIndex = env.render(tempTemplateName, blogIndexContext);
  fs.writeFileSync(path.join(srcDir, 'pages', 'blog.html'), renderedBlogIndex, 'utf8');
  console.log('[Blog Generator] Compiled: pages/blog.html');
} finally {
  // Cleanup temp template
  fs.unlinkSync(path.join(srcDir, tempTemplateName));
}

console.log('[Blog Generator] Blog compilation completed.');
