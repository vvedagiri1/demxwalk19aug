export default function decorate(block) {
  //const location = block.textContent.trim();
  //block.textContent = ''; // Clear the block

  // 2. Fetch weather data (Example using a placeholder API)
  const API_KEY = '3237161ae1634c9a8e051934260902';
  const loc = 'ny';
  //const url = `https://api.weatherapi.com/v1/current.json?key=3237161ae1634c9a8e051934260902&q=ny`;
  //const options ={};
  const url = `https://20092-securbankdemo-stage.adobeio-static.net/api/v1/web/dx-excshell-1/forex?baseCurrency=USD`;
  const options = {};
  const response = await fetch(url,options);
  const data = await response.json();

  // 3. Create HTML structure
  const weatherHTML = `
    <div class="weather-card">
      <h3>${data.location.name}</h3>
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" />
      <p class="temp">${data.current.temp_c}°C</p>
      <p class="condition">${data.current.condition.text}</p>
    </div>
  `;
  
 // block.innerHTML = weatherHTML;



  
  const [quoteWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);
}
