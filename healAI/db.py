import psycopg

import config

_conn = None


def get_conn():
    global _conn
    if _conn is None or _conn.closed:
        _conn = psycopg.connect(config.DB_URL, autocommit=True)
    return _conn


def query(sql: str, params: tuple = ()) -> list[dict]:
    with get_conn().cursor() as cur:
        cur.execute(sql, params)
        if cur.description is None:
            return []
        cols = [d.name for d in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]
