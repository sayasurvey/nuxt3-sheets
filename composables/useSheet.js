let sheetRange = "シート1!A1:D200";

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

export async function addRow(row) {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();
  const inputRange = `シート1!A50`

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${inputRange}:append?valueInputOption=USER_ENTERED&key=${GOOGLE_API_KEY}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(row),
  }
  return await fetch(url, options)
}