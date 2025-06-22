const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async () => {
  try {
    const dir = path.join(__dirname, '../../content/posts');
    const files = fs.readdirSync(dir);

    const posts = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        ...data,
        body: content,
        slug: file.replace(/\.md$/, ''),
      };
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
