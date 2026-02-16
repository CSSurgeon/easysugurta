from flask import Flask, jsonify, send_from_directory
import os
import requests

app = Flask(__name__, static_folder='.', static_url_path='')

# Serve index.html at root
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Serve static files (css, js, images)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# News API endpoint
@app.route('/api/news')
def get_news():
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": '"ОСАГО" OR "автострахование" OR "insurance Uzbekistan"',
        "language": "ru",
        "sortBy": "publishedAt",
        "pageSize": 6,
        "apiKey": os.getenv("NEWS_API_KEY")
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        data = response.json()

        articles = []
        for article in data.get("articles", []):
            articles.append({
                "title": article.get("title"),
                "description": article.get("description"),
                "url": article.get("url"),
                "source": article.get("source", {}).get("name"),
                "publishedAt": article.get("publishedAt")
            })

        return jsonify(articles)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Flask server at http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
