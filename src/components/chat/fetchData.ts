async function fetchData(url: string, data: any): Promise<any> {
  try {
    let apikey = process.env.OPENAI_API_KEY;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Replace 'YOUR_API_KEY' with your actual OpenAI API key
        'Authorization': `Bearer ${apikey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    throw new Error(`Error fetching data from the server: ${error.message}`);
  }
}

export default fetchData;
