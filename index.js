export default {
  async fetch(request) {
    const url = new URL(request.url);
    const tracking = url.searchParams.get('se');
    
    if (!tracking) {
      return new Response('Missing tracking number', { status: 400 });
    }

    const res = await fetch('https://www.flashexpress.co.th/webApi/tools/tracking', {
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

    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      headers: { 
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};