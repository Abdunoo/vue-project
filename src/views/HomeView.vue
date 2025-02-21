<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'

// Configuration object with all your site's sharing data
const siteConfig = {
  siteName: 'Testing Meta Seo',
  baseUrl: 'https://test-meta-pink.vercel.app',
  defaultImage: '/maxresdefault.jpg',
  twitterHandle: '@yourhandle',
  facebookAppId: '123456789',
  themeColor: '#ffffff',
  language: 'en',
  alternateLanguages: [
    { lang: 'es', url: 'https://test-meta-pink.vercel.app' },
    { lang: 'fr', url: 'https://test-meta-pink.vercel.app' }
  ]
}

// Page-specific data with dummy content
const pageData = ref({
  title: 'Improving SEO with Meta Tags',
  description: 'This is a comprehensive site dedicated to providing insightful and engaging content on a variety of topics. Our goal is to offer valuable information, tips, and resources to help you stay informed and inspired.',
  image: '/maxresdefault.jpg',
  path: '/',
  author: 'Author Name is Hidden',
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  tags: ['SEO', 'Meta Tags', 'SEO Tips', 'SEO Techniques'],
  type: 'article' // Changed from 'website' to 'article' for better sharing
})

// Computed values for sharing
const fullUrl = computed(() => `${siteConfig.baseUrl}${pageData.value.path}`)
const shareTitle = computed(() => `${pageData.value.title} | ${siteConfig.siteName}`)

// Compute full image URL
const fullImageUrl = computed(() => `${siteConfig.baseUrl}${pageData.value.image}`)

// Generate all meta tags
useHead({
  title: pageData.value.title,
  titleTemplate: `%s | ${siteConfig.siteName}`,
  htmlAttrs: {
    lang: siteConfig.language,
    dir: 'ltr'
  },
  meta: [
    // Essential SEO
    { name: 'description', content: pageData.value.description },
    { name: 'keywords', content: pageData.value.tags.join(', ') },
    { name: 'author', content: pageData.value.author },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { name: 'googlebot', content: 'index, follow' },
    
    // Open Graph (WhatsApp and Facebook)
    { property: 'og:type', content: pageData.value.type },
    { property: 'og:title', content: shareTitle.value },
    { property: 'og:description', content: pageData.value.description },
    { property: 'og:image', content: fullImageUrl.value },
    { property: 'og:image:secure_url', content: fullImageUrl.value },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:url', content: fullUrl.value },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:updated_time', content: pageData.value.modifiedTime },
    
    // Article specific (for better sharing)
    { property: 'article:published_time', content: pageData.value.publishedTime },
    { property: 'article:modified_time', content: pageData.value.modifiedTime },
    { property: 'article:author', content: pageData.value.author },
    { property: 'article:tag', content: pageData.value.tags.join(', ') },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteConfig.twitterHandle },
    { name: 'twitter:creator', content: siteConfig.twitterHandle },
    { name: 'twitter:title', content: shareTitle.value },
    { name: 'twitter:description', content: pageData.value.description },
    { name: 'twitter:image', content: fullImageUrl.value },
    { name: 'twitter:image:alt', content: pageData.value.title },
    { name: 'twitter:domain', content: siteConfig.baseUrl },
    
    // Additional SEO
    { name: 'theme-color', content: siteConfig.themeColor },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'format-detection', content: 'telephone=no' },
    
    // Viewport
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' }
  ],
  link: [
    { rel: 'canonical', href: fullUrl.value },
    { rel: 'alternate', hreflang: 'x-default', href: fullUrl.value },
    ...siteConfig.alternateLanguages.map(({ lang, url }) => ({
      rel: 'alternate',
      hreflang: lang,
      href: url
    }))
  ]
})

// Update sharing functions
const shareLinks = computed(() => ({
  whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle.value}\n${pageData.value.description}\n${fullUrl.value}`)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl.value)}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(fullUrl.value)}&via=${siteConfig.twitterHandle.slice(1)}`,
  linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl.value)}&title=${encodeURIComponent(shareTitle.value)}&summary=${encodeURIComponent(pageData.value.description)}`,
  pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl.value)}&media=${encodeURIComponent(fullImageUrl.value)}&description=${encodeURIComponent(pageData.value.description)}`
}))

// Add this share function
const share = (url) => {
  window.open(url, '', 'width=600,height=400')
}
</script>

<template>
  <article class="demo-article">
    <h1>{{ pageData.title }}</h1>
    <img :src="pageData.image" :alt="pageData.title" class="featured-image">
    <p class="author">By {{ pageData.author }}</p>
    <p class="date">Published: {{ new Date(pageData.publishedTime).toLocaleDateString() }}</p>
    <p>{{ pageData.description }}</p>
    
    <div class="tags">
      <span v-for="tag in pageData.tags" :key="tag" class="tag">
        #{{ tag }}
      </span>
    </div>
    
    <!-- Share buttons -->
    <div class="share-buttons">
      <a 
        v-for="(link, platform) in shareLinks" 
        :key="platform"
        :href="link"
        :class="`share-${platform}`"
        target="_blank"
        rel="noopener noreferrer"
        @click.prevent="share(link)"
      >
        Share on {{ platform }}
      </a>
    </div>
  </article>
</template>

<style scoped>
.demo-article {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.featured-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.author {
  color: #666;
  font-style: italic;
}

.date {
  color: #666;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.share-buttons a {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: opacity 0.2s;
}

.share-buttons a:hover {
  opacity: 0.9;
}

.share-whatsapp { background-color: #25D366; }
.share-facebook { background-color: #1877F2; }
.share-twitter { background-color: #1DA1F2; }
.share-linkedin { background-color: #0A66C2; }
.share-pinterest { background-color: #E60023; }
</style>