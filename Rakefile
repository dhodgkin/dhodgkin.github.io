require "rubygems"
require "rake"
require "yaml"
require "time"
require "fileutils"

SOURCE = "."
CONFIG = {
  "version" => "0.2.13",
  "themes" => File.join(SOURCE, "_includes", "themes"),
  "layouts" => File.join(SOURCE, "_layouts"),
  "posts" => File.join(SOURCE, "_posts"),
  "pages" => File.join(SOURCE, "_pages"),
  "post_ext" => "md",
  "theme_package_version" => "0.1.0"
}.freeze

desc "Create a post with guided YAML front matter prompts"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless File.directory?(CONFIG["posts"])

  puts "Creating a post (answer prompts for YAML front matter)"
  title = prompt("title", ENV["title"], required: true)
  description = prompt("description", ENV["desc"])
  category = prompt("category", ENV["cat"] || "Uncategorized")
  tags = split_tags(prompt("tags (comma-separated)", ENV["tags"]))
  pin = bool_value(prompt("pin (true/false)", ENV["pin"] || "false"))
  date = prompt_date("date (YYYY-MM-DD)", ENV["date"])
  slug = slugify(prompt("slug", ENV["slug"] || slugify(title), required: true))
  abort("rake aborted: slug cannot be empty.") if slug.empty?

  front_matter = {
    "layout" => "post",
    "title" => title,
    "description" => description,
    "category" => category,
    "tags" => tags,
    "pin" => pin
  }

  filename = File.join(CONFIG["posts"], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  ensure_target_path(filename)

  write_markdown_file(
    filename,
    front_matter,
    [
      "## {{ page.title }}",
      "",
      "posted on: {{ page.date | date_to_string }}",
      "{: .meta}",
      "",
      "<!--more-->",
      ""
    ]
  )

  puts "Created #{filename}"
end

desc "Create a page in _pages with guided YAML front matter prompts"
task :page do
  abort("rake aborted: '#{CONFIG['pages']}' directory not found.") unless File.directory?(CONFIG["pages"])

  puts "Creating a page (answer prompts for YAML front matter)"
  raw_name = prompt("page file name (without extension)", ENV["name"] || "new-page", required: true)
  page_name = raw_name.sub(/\.[^\/.]+\z/, "").tr("\\", "/").gsub(%r{\A/+}, "")
  default_slug = page_name.split("/").map { |segment| slugify(segment) }.join("/")
  page_slug_input = prompt("page slug/path", ENV["slug"] || default_slug, required: true).tr("\\", "/")
  page_slug = page_slug_input.split("/").map { |segment| slugify(segment) }.reject(&:empty?).join("/")
  abort("rake aborted: page slug cannot be empty.") if page_slug.empty?

  default_title = titleize(File.basename(page_slug))
  title = prompt("title", ENV["title"] || default_title, required: true)
  description = prompt("description", ENV["desc"])
  layout = prompt("layout", ENV["layout"] || "page")
  default_permalink = page_slug == "404" ? "/404.html" : "/#{page_slug}/"
  permalink = prompt("permalink", ENV["permalink"] || default_permalink)
  group = prompt("group", ENV["group"])

  front_matter = {
    "layout" => layout,
    "title" => title,
    "description" => description,
    "permalink" => permalink,
    "group" => group
  }

  filename = File.join(CONFIG["pages"], "#{page_slug}.#{CONFIG['post_ext']}")
  ensure_target_path(filename)

  write_markdown_file(
    filename,
    front_matter,
    [
      "## {{ page.title }}",
      "",
      "Add your content here.",
      ""
    ]
  )

  puts "Created #{filename}"
end

desc "Clean Jekyll artifacts and run a fresh build"
task :fresh_build do
  sh "bundle exec jekyll clean"
  sh "bundle exec jekyll build --trace"
end

desc "Launch preview environment"
task :preview do
  sh "bundle exec jekyll serve --watch"
end

def prompt(label, default_value = nil, required: false)
  loop do
    suffix = default_value.nil? || default_value.to_s.empty? ? "" : " [#{default_value}]"
    print "#{label}#{suffix}: "
    input = STDIN.gets
    abort("rake aborted!") if input.nil?

    value = input.chomp
    value = default_value.to_s if value.empty? && !default_value.nil?
    value = value.strip

    if required && value.empty?
      puts "Please provide a value."
      next
    end

    return value
  end
end

def prompt_date(label, default_value = nil)
  fallback = default_value || Time.now.strftime("%Y-%m-%d")
  loop do
    value = prompt(label, fallback, required: true)
    begin
      return Time.parse(value).strftime("%Y-%m-%d")
    rescue ArgumentError
      puts "Invalid date format. Use YYYY-MM-DD."
    end
  end
end

def bool_value(raw_value)
  %w[1 true yes y].include?(raw_value.to_s.downcase)
end

def split_tags(raw_value)
  raw_value.to_s.split(",").map(&:strip).reject(&:empty?)
end

def slugify(value)
  value
    .to_s
    .downcase
    .strip
    .gsub(/[^\w\s-]/, "")
    .gsub(/[\s_]+/, "-")
    .gsub(/-+/, "-")
    .gsub(/\A-|-\z/, "")
end

def titleize(value)
  value
    .to_s
    .tr("_-", " ")
    .split
    .map(&:capitalize)
    .join(" ")
end

def prompt_yes_no(message, default: false)
  hint = default ? "Y/n" : "y/N"
  loop do
    print "#{message} (#{hint}): "
    input = STDIN.gets
    abort("rake aborted!") if input.nil?
    answer = input.chomp.strip.downcase
    return default if answer.empty?
    return true if %w[y yes].include?(answer)
    return false if %w[n no].include?(answer)
  end
end

def ensure_target_path(path)
  if File.exist?(path)
    overwrite = prompt_yes_no("#{path} already exists. Overwrite?", default: false)
    abort("rake aborted!") unless overwrite
  end

  FileUtils.mkdir_p(File.dirname(path))
end

def compact_front_matter(front_matter)
  front_matter.each_with_object({}) do |(key, value), memo|
    next if value.nil?
    next if value.respond_to?(:empty?) && value.empty?

    memo[key] = value
  end
end

def write_markdown_file(path, front_matter, body_lines)
  File.open(path, "w") do |file|
    file.puts "---"
    yaml = compact_front_matter(front_matter).to_yaml.sub(/\A---\s*\n/, "")
    file.write(yaml)
    file.puts "---"
    file.puts
    body_lines.each { |line| file.puts line }
  end
end

# Load custom rake scripts
Dir["_rake/*.rake"].each { |r| load r }
