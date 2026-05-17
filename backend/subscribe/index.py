import json
import os
import pg8000.native
import urllib.parse


def handler(event: dict, context) -> dict:
    """Сохраняет email подписчика в базу данных. v2"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip().lower()

    if not email or "@" not in email:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Некорректный email"}),
        }

    dsn = os.environ["DATABASE_URL"]
    r = urllib.parse.urlparse(dsn)
    password = urllib.parse.unquote(r.password) if r.password else ""
    conn = pg8000.native.Connection(
        host=r.hostname,
        port=r.port or 5432,
        database=r.path.lstrip("/"),
        user=r.username,
        password=password,
        ssl_context=False,
    )

    safe_email = email.replace("'", "''")
    rows = conn.run(f"SELECT id FROM subscribers WHERE email = '{safe_email}'")
    if rows:
        conn.close()
        return {
            "statusCode": 409,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Этот email уже подписан"}),
        }

    conn.run(f"INSERT INTO subscribers (email) VALUES ('{safe_email}')")
    conn.close()

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True}),
    }