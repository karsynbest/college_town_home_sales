'use strict';

const stateNames = {
  CA: 'California', FL: 'Florida', GA: 'Georgia', IL: 'Illinois', IN: 'Indiana',
  IA: 'Iowa', MI: 'Michigan', NC: 'North Carolina', PA: 'Pennsylvania',
  VA: 'Virginia', WI: 'Wisconsin'
};

// CSV fields may contain commas, escaped quotes, and newlines inside quotes.
// Leave fields as text; only sale_price is converted when calculating figures.
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else { quoted = !quoted; }
    } else if (char === ',' && !quoted) {
      row.push(field); field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      if (row.some(value => value !== '')) rows.push(row);
      row = []; field = '';
    } else { field += char; }
  }
  if (quoted) throw new Error('Incomplete CSV field');
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function summarize(rows) {
  const [headers, ...records] = rows;
  const columns = ['city', 'state', 'sale_price'].map(name => headers.indexOf(name));
  if (columns.includes(-1)) throw new Error('Missing required CSV columns');
  const groups = new Map();
  for (const record of records) {
    const [city, state, rawPrice] = columns.map(index => record[index]);
    const price = Number(rawPrice);
    if (!rawPrice?.trim() || !Number.isFinite(price)) throw new Error('Invalid sale price');
    if (price < 10000) continue;
    if (!city || !state) throw new Error('Missing city or state');
    const key = JSON.stringify([city, state]);
    if (!groups.has(key)) groups.set(key, { city, state, prices: [] });
    groups.get(key).prices.push(price);
  }
  return [...groups.values()].map(({ city, state, prices }) => {
    prices.sort((a, b) => a - b);
    const middle = Math.floor(prices.length / 2);
    const median = prices.length % 2 ? prices[middle] : (prices[middle - 1] + prices[middle]) / 2;
    return { city, state, count: prices.length, median };
  }).sort((a, b) => a.city.localeCompare(b.city, 'en') || a.state.localeCompare(b.state, 'en'));
}

async function loadDashboard() {
  const status = document.querySelector('#status');
  try {
    const response = await fetch('data/college_town_home_sales.csv');
    if (!response.ok) throw new Error(`CSV request failed (${response.status})`);
    const cities = summarize(parseCSV(await response.text()));
    if (!cities.length) throw new Error('No included sales');
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const number = new Intl.NumberFormat('en-US');
    const fragment = document.createDocumentFragment();
    for (const city of cities) {
      const row = document.createElement('tr');
      const location = document.createElement('th');
      location.scope = 'row';
      location.append(document.createTextNode(city.city));
      const state = document.createElement('span');
      state.className = 'state';
      state.textContent = stateNames[city.state] || city.state;
      location.append(state);
      const price = document.createElement('td');
      price.className = 'number price';
      price.textContent = currency.format(city.median);
      const count = document.createElement('td');
      count.className = 'number';
      count.textContent = number.format(city.count);
      row.append(location, price, count);
      fragment.append(row);
    }
    document.querySelector('#city-rows').replaceChildren(fragment);
    document.querySelector('#sales-total').textContent = number.format(cities.reduce((total, city) => total + city.count, 0));
    document.querySelector('#cities-total').textContent = number.format(cities.length);
    document.querySelector('#states-total').textContent = number.format(new Set(cities.map(city => city.state)).size);
    document.querySelector('#overview').hidden = false;
    document.querySelector('#city-table').hidden = false;
    status.hidden = true;
  } catch (error) {
    status.textContent = 'The sales data could not be loaded. Please refresh the page to try again.';
    console.error(error);
  }
}

if (typeof document !== 'undefined') loadDashboard();
if (typeof module !== 'undefined') module.exports = { parseCSV, summarize };
