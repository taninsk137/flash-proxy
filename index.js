const http = require('http');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const tracking = url.searchParams.get('se');
  
  if (!tracking) {
    res.writeHead(400);
    res.end('Missing tracking number');
    return;
  }

  const response = await fetch('https://www.flashexpress.co.th/webApi/tools/tracking', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'th',
      'origin': 'https://www.flashexpress.co.th',
      'referer': 'https://www.flashexpress.co.th/fle/tracking?se',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: JSON.stringify({ search: tracking })
  });

  const data = await response.json();
  
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Running on port ${PORT}`));
