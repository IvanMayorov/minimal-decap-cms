const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const dir = path.join(__dirname, '../../src/blog/entries');
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.json'));

    const posts = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const postData = JSON.parse(raw);
      return {
        ...postData,
        slug: file.replace(/\.json$/, ''),
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
