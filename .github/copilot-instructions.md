# Copilot instructions for this repository

## Build, test, and lint commands

- **Ruby/Bundler:** use Ruby 3.2.x (`.ruby-version` is `3.2.6`; CI uses Ruby `3.2`).
- **Install dependencies:** `bundle install`
- **Run locally:** `bundle exec jekyll serve --watch`
- **Production-style build (matches CI):** `bundle exec jekyll build --trace`
- **Create a post scaffold:** `bundle exec rake post title="My Title" desc="Short description" cat="Category" date="YYYY-MM-DD"`
- **Create a page scaffold:** `bundle exec rake page name="my-page.html" desc="Short description"`
- **Tests:** no automated test suite is configured in this repo, so there is no single-test command.
- **Linting:** no dedicated lint command/tool is configured.

## High-level architecture

- This is a Jekyll blog source repo; GitHub Actions builds it with `bundle exec jekyll build --trace` on pushes/PRs to `main` and `master`.
- `_config.yml` controls site-wide behavior (pretty permalinks, pagination, excerpt separator `<!--more-->`, plugins like `jekyll-paginate`, `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`).
- Rendering pipeline is:
  1. Content files (`index.html`, `archive.html`, `tags.html`, `categories.html`, `pages.html`, `_posts/*.md`)
  2. `_layouts/{default,page,post}.html`
  3. `_includes/themes/agem-theme/*` partials (header/footer/page/post wrappers)
- The home page (`index.html`) depends on `paginator.posts` and renders `post.excerpt`; excerpt cutoffs are controlled by `_config.yml` `excerpt_separator` (`<!--more-->`).
- Taxonomy/archive pages use Jekyll Bootstrap helpers in `_includes/JB/*` (`posts_collate`, `pages_list`, `tags_list`, `categories_list`).
- Theme styling/behavior is implemented in `css/agem-theme.css` and `javascripts/main.js` (theme toggle + reveal animation).

## Key repository conventions

- **Edit source, not output:** `_site/` is generated build output and is gitignored.
- **Current active theme path is `themes/agem-theme`:** `_layouts/*.html` includes `themes/agem-theme/*` directly.
- **Legacy theme files remain for fallback only:** `_includes/themes/dhodgkin/*` and `css/stylesheet.css` are not part of the active render path.
- **Internal URLs:** use Liquid `| relative_url` for links to keep local/dev/prod URLs correct.
- **Post front matter shape:** posts consistently use `layout: post`, `title`, `description`, `category` (singular), and `tags` (array).
- **Post excerpts on home:** add `<!--more-->` in post content to control `post.excerpt` cutoffs used by the homepage feed.
- **Navigation ownership:** global navigation lives in `header.html` and `footer.html` under `_includes/themes/agem-theme/`.
- **Legal pages use explicit `.html` permalinks:** keep header/footer links and `permalink` values aligned for `privacy-policy.html` and `term-of-service.html`.
