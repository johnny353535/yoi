---
layout: base
group: components
title: Article
permalink: components/article
status: draft
---

# Article

This component is basically a wrapper around markup which you cannot control &mdash; eg. because it is provided by a content management system. The CSS-class `.article` adds the context to style the bare html tags:

```html
<!-- example -->
<div class="article">
    <h1>Yoshino, Nara</h1>
    <p>Yoshino (吉野町 Yoshino-chō) is a town located in Yoshino District, Nara Prefecture, Japan.</p>
    <p>As of September 1, 2007, the town had an estimated population of 9,397 and a density of 97.93 per square kilometre (253.6/sq mi). The total area was 95.65 km2 (36.93 sq mi).</p>
    <h2>Geography</h2>
    <p>The town of Yoshino is located in the northern portion of Yoshino District. Most of the area is mountainous, but the section along the Yoshino River is somewhat flatter and contains most of the town's roads, train tracks and houses.</p>
    <h2>Industry</h2>
    <h3>Lumber</h3>
    <p>The town of Yoshino produces a wide variety of wood-based goods made from lumber harvested from the local forest land. Most of the forest within the Yoshino area is artificial, consisting of red cedar and cypress trees that have been planted and harvested in cycles for 500 years.[3] The Yoshino River served in past times as a means of transportation for the lumber harvested in the region.</p>
    <h3>Paper</h3>
    <p>The Kuzu district of Yoshino has a long history of traditional Japanese washi paper production. According to a local story, Prince Oama (later to become Emperor Tenmu), taught the residents of Kuzu the process of making washi in the 7th century.</p>
    <h2>Surrounding municipalities</h2>
    <ul>
        <li>Asuka</li>
        <li>Sakurai</li>
        <li>Higashiyoshino</li>
        <li>Kawakami</li>
        <li>Kurotaki</li>
        <li>Shimoichi</li>
        <li>Ōyodo</li>
        <li>Uda</li>
    </ul>
</div>
```