# dhodgkin.github.io

Personal blog source for **https://dhodgkin.com**, built with Jekyll and hosted on GitHub Pages.

## Local development

1. Install Ruby 3.2+ and Bundler.
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run the site locally:
   ```bash
   bundle exec jekyll serve --watch
   ```
4. Open `http://127.0.0.1:4000`.

## Build

```bash
bundle exec jekyll build
```

## Project structure

- `_posts/` blog posts
- `_layouts/` page layouts
- `_includes/` reusable theme partials
- `css/` site styles
- `_config.yml` Jekyll configuration

## Publishing

Push to the default branch and GitHub Pages serves the site using the `CNAME` in this repository.

## Comments

Post comments are powered by [Utterances](https://utteranc.es/) and use GitHub issues in this repository.
If comments do not appear yet, install/enable the Utterances GitHub app for `dhodgkin/dhodgkin.github.io`.
