const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
        <html>
          <head><title>Homepage</title></head>
          <body>
            <h1>Welcome, traveler!</h1>
            <form
              action="/create-user"
              method="POST"
            >
              <input type="text" name="username" placeholder="Please enter your name..." />
              <button type="submit">Send</button>
            </form>
          </body>
        </html>
      `);
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
      <html>
        <head><title>Users</title></head>
        <body>
          <h1>Welcome, users!</h1>
          <ul>
            <li>Sveta</li>
            <li>Sofiya</li>
            <li>Natali</li>
            <li>Tanya</li>
          </ul>
        </body>
      </html>
      `);
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('telega.txt', message);

            res.statusCode = 302;
            res.setHeader('Location', '/create-user');
            return res.end();
        });

    }

    if (url === '/create-user' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
      <html>
        <head><title>Users</title></head>
        <body>
          <h1>Welcome, new User!</h1>
        </body>
      </html>
    `);
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head><title>Not Found</title></head>
        <body>
          <h1>Not FOUND page!</h1>
        </body>
      </html>
    `);
    return res.end();

});

server.listen(3000, 'localhost');