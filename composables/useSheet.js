let sheetRange = "シート1!A1:D200";
const {google} = require('googleapis');

const getVars = () => {
  const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID;
  const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;

  return { SPREAD_SHEET_ID, GOOGLE_API_KEY }
}

export async function allRows() {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();
  const url = 
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`
  // return await useFetch(url)
  const response = await fetch(url)
  const result = await response.json()
  console.log(result)
  return result
}

export async function singleRow(row) {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

  const rowRange = `シート1!A${row}:D${row}`

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${rowRange}?key=${GOOGLE_API_KEY}`
  return await useFetch(url)
}

export async function addRow() {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

  const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({version: 'v4', auth});

  const req = {
      spreadsheetId: SPREAD_SHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
          values: [
              ['a', 'b', 'c'],
          ],
      },
  };

  await sheets.spreadsheets.values.append(req);
}
