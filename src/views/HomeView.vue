<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'

// Configuration object with all your site's sharing data
const siteConfig = {
  siteName: 'Demo Website',
  baseUrl: 'https://demo-site.com',
  defaultImage: '/maxresdefault.jpg',
  twitterHandle: '@demohandle',
  facebookAppId: '123456789',
}

// Page-specific data with dummy content
const pageData = ref({
  title: 'Sample Blog Post',
  description: 'This is a demonstration of a blog post with social sharing capabilities. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  image: '/maxresdefault.jpg',
  path: '/sample-post',
  author: 'Jane Smith',
  publishedTime: new Date().toISOString(),
  tags: ['demo', 'sample', 'test', 'example'],
})

// Computed values for sharing
const fullUrl = computed(() => `${siteConfig.baseUrl}${pageData.value.path}`)
const shareTitle = computed(() => `${pageData.value.title} | ${siteConfig.siteName}`)

// Generate all meta tags
useHead({
  // Basic page title and template
  title: pageData.value.title,
  titleTemplate: `%s | ${siteConfig.siteName}`,

  // Meta tags
  meta: [
    // Basic SEO
    { name: 'description', content: pageData.value.description },
    { name: 'keywords', content: pageData.value.tags.join(', ') },
    { name: 'author', content: pageData.value.author },
    
    // Open Graph (Facebook, WhatsApp, etc.)
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: shareTitle.value },
    { property: 'og:description', content: pageData.value.description },
    { property: 'og:image', content: pageData.value.image },
    { property: 'og:url', content: fullUrl.value },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:article:published_time', content: pageData.value.publishedTime },
    { property: 'og:article:author', content: pageData.value.author },
    { property: 'og:article:tag', content: pageData.value.tags.join(', ') },
    
    // Image specifications
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: pageData.value.title },
    
    // Facebook specific
    { property: 'fb:app_id', content: siteConfig.facebookAppId },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteConfig.twitterHandle },
    { name: 'twitter:creator', content: siteConfig.twitterHandle },
    { name: 'twitter:title', content: shareTitle.value },
    { name: 'twitter:description', content: pageData.value.description },
    { name: 'twitter:image', content: pageData.value.image },
    { name: 'twitter:image:alt', content: pageData.value.title },
    
    // WhatsApp specific (uses Open Graph but with some size considerations)
    { property: 'og:image:type', content: 'image/jpeg' },
    
    // Pinterest specific
    { name: 'pinterest-rich-pin', content: 'true' },
    
    // LinkedIn specific
    { property: 'linkedin:owner', content: siteConfig.siteName },
    { property: 'linkedin:title', content: shareTitle.value },
    { property: 'linkedin:description', content: pageData.value.description },
    { property: 'linkedin:image', content: pageData.value.image },
  ],

  // Link tags
  link: [
    { rel: 'canonical', href: fullUrl.value },
    { rel: 'image_src', href: pageData.value.image },
  ],

  // Structured data for Google
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageData.value.title,
        image: pageData.value.image,
        author: {
          '@type': 'Person',
          name: pageData.value.author
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.siteName,
          logo: {
            '@type': 'ImageObject',
            url: siteConfig.defaultImage
          }
        },
        datePublished: pageData.value.publishedTime,
        description: pageData.value.description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl.value
        }
      })
    }
  ]
})

// Sharing functions
const shareLinks = computed(() => ({
  whatsapp: `whatsapp://send?text=${encodeURIComponent(`${shareTitle.value} - ${fullUrl.value}`)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl.value)}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(fullUrl.value)}&via=${siteConfig.twitterHandle.slice(1)}`,
  linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl.value)}&title=${encodeURIComponent(shareTitle.value)}&summary=${encodeURIComponent(pageData.value.description)}`,
  pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl.value)}&media=${encodeURIComponent(pageData.value.image)}&description=${encodeURIComponent(pageData.value.description)}`
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