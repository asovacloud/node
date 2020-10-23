const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    switch (url) {
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.write(`
              <html>
                <head>
                  <title>Homepage</title>  
                </head>
                <body>
                  <form
                    action="/message"
                    method="POST"
                  >
                    <input name="letter" placeholder="Leave your message..." />
                    <button type="send">Send</button>
                  </form>
                </body>
              </html>
            `);
            break;

        case '/contact-us':
            res.write(`
              <html>
                <head>
                  <title>Contact Us</title>  
                </head>
                <body>
                  <h1>This is a Contact Us.</h1>
                </body>
              </html>
            `);
            break;

        case '/message':
            if (method === 'POST') {
                const body = [];
                req.on('data', (chunk) => {
                    body.push(chunk);
                });
                return req.on('end', () => {
                    const parseBody = Buffer.concat(body).toString();
                    const message = parseBody.split('=')[1]
                        .split('+').join(' ');
                    fs.writeFileSync('message.txt', message);
                    res.statusCode = 302;
                    res.setHeader('Location', '/message');
                    return res.end();
                });
            }

            if (method === 'GET') {
                res.write(`
              <html>
                <head>
                  <title>Message</title>  
                </head>
                <body>
                  <h1>This is a Message.</h1>
                </body>
              </html>
            `);
            }
            break;

        default:
            res.write(`
            <html>
              <head>
                <title>Not Found</title>  
              </head>
              <body>
                <h1>This is a Not Found.</h1>
              </body>
            </html>
          `);
            break;
    };

    return res.end();
};

module.exports = requestHandler;