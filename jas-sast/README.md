# JAS — SAST (Static Application Security Testing)

Frogbot (with Advanced Security) runs language-specific code analysis to find vulnerability patterns directly in source code — independent of dependencies.

## What's in here

### `python/sql_injection.py`
- **SQL injection** — `request.args` concatenated into a SQL string
- **Unsafe deserialization** — `pickle.loads(request.get_data())`
- **Command injection** — `os.system("echo " + user_input)`

### `javascript/xss_and_eval.js`
- **Reflected XSS** — query param echoed into HTML
- **Code injection via eval** — `eval(req.query.expr)`
- **Command injection** — `exec("ping -c 1 " + req.query.host)`

## Expected outcome

JFrog Platform Frogbot view lists each finding with CWE mapping, the exact line, and the data-flow path from source (request) to sink (sql/exec/eval).
