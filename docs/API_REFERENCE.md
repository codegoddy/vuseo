# API Reference

## VidFast Pro Embed API

This document describes the VidFast Pro embed API endpoints and parameters for integrating movie and TV show playback into your application.

---

## Movie Embed

### Endpoint

```
https://vidfast.pro/movie/{id}
```

### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `{id}` | string | Movie identifier from IMDB (e.g., tt6263850) or TMDB (e.g., 533535) |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | boolean | true | Controls whether the media title is displayed |
| `poster` | boolean | true | Determines if the poster image is shown |
| `autoPlay` | boolean | false | Controls whether the media starts playing automatically |
| `startAt` | number | 0 | Starts the video at the specified time in seconds |
| `theme` | string | - | Changes the player's color (hex code format without #) |
| `server` | string | - | Changes the default server for the player (set to server name) |
| `hideServer` | boolean | false | Controls whether the server selector button is shown or hidden |
| `fullscreenButton` | boolean | true | Controls whether the fullscreen button is shown or hidden |
| `chromecast` | boolean | true | Controls whether the Chromecast button is shown or hidden |
| `sub` | string | - | Sets the default subtitle (e.g., en, es, fr) |

### Examples

**Basic movie embed with IMDB ID:**
```
https://vidfast.pro/movie/tt6263850
```

**Movie with custom theme (TMDB ID):**
```
https://vidfast.pro/movie/533535?theme=16A085
```

**Movie with autoplay and custom subtitle:**
```
https://vidfast.pro/movie/tt6263850?autoPlay=true&sub=en
```

---

## TV Show Embed

### Endpoint

```
https://vidfast.pro/tv/{id}/{season}/{episode}
```

### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `{id}` | string | TV show identifier from IMDB or TMDB |
| `{season}` | number | The season number |
| `{episode}` | number | The episode number |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | boolean | true | Controls whether the media title is displayed |
| `poster` | boolean | true | Determines if the poster image is shown |
| `autoPlay` | boolean | false | Controls whether the media starts playing automatically |
| `startAt` | number | 0 | Starts the video at the specified time in seconds |
| `theme` | string | - | Changes the player's color (hex code format without #) |
| `nextButton` | boolean | false | Displays the "Next Episode" button when 90% of the current episode has been watched |
| `autoNext` | boolean | false | Automatically plays the next episode when the current one ends (requires nextButton) |
| `server` | string | - | Changes the default server for the player (set to server name) |
| `hideServer` | boolean | false | Controls whether the server selector button is shown or hidden |
| `fullscreenButton` | boolean | true | Controls whether the fullscreen button is shown or hidden |
| `chromecast` | boolean | true | Controls whether the Chromecast button is shown or hidden |
| `sub` | string | - | Sets the default subtitle (e.g., en, es, fr) |

### Examples

**Basic TV show embed (Season 1, Episode 5):**
```
https://vidfast.pro/tv/tt4052886/1/5
```

**TV show with next episode functionality:**
```
https://vidfast.pro/tv/63174/1/5?nextButton=true&autoNext=true
```

**TV show with autoplay and custom theme:**
```
https://vidfast.pro/tv/tt4052886/1/5?autoPlay=true&theme=16A085&sub=en
```

---

## Implementation Notes

### ID Format
- **IMDB IDs**: Start with "tt" followed by numbers (e.g., tt6263850)
- **TMDB IDs**: Numeric only (e.g., 533535, 63174)

### Theme Colors
- Provide hex color codes without the "#" symbol
- Example: `16A085` for a teal color

### Subtitle Language Codes
Use ISO 639-1 two-letter language codes:
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- etc.

### Auto-Next Feature
The `autoNext` parameter requires `nextButton=true` to function properly. This creates a seamless binge-watching experience for TV shows.

### Embedding in iframes
```html
<iframe 
  src="https://vidfast.pro/movie/tt6263850?autoPlay=true" 
  width="100%" 
  height="500" 
  frameborder="0" 
  allowfullscreen
  allow="autoplay"
></iframe>
```
