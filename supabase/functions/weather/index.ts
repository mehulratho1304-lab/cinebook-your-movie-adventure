import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, lat, lon, type } = await req.json();
    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let url: string;

    if (type === 'forecast') {
      const params = city
        ? `q=${encodeURIComponent(city)}`
        : `lat=${lat}&lon=${lon}`;
      url = `https://api.openweathermap.org/data/2.5/forecast?${params}&units=metric&appid=${apiKey}`;
    } else {
      const params = city
        ? `q=${encodeURIComponent(city)}`
        : `lat=${lat}&lon=${lon}`;
      url = `https://api.openweathermap.org/data/2.5/weather?${params}&units=metric&appid=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || 'City not found' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
