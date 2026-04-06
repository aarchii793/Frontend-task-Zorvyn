import type { Transaction } from '../types/finance';

/** Trigger a file download from in-memory content */
const triggerDownload = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

/** Download an array of transactions as a CSV file */
export const downloadAsCSV = (rows: Transaction[], filename: string): void => {
  const header = 'id,date,description,category,type,amount';
  const csvRows = rows.map((t) => {
    const desc = t.description.includes(',') ? `"${t.description}"` : t.description;
    return `${t.id},${t.date},${desc},${t.category},${t.kind},${t.amount}`;
  });
  const csvContent = [header, ...csvRows].join('\n');
  triggerDownload(csvContent, filename, 'text/csv;charset=utf-8;');
};

/** Download an array of transactions as a JSON file */
export const downloadAsJSON = (rows: Transaction[], filename: string): void => {
  const jsonContent = JSON.stringify(rows, null, 2);
  triggerDownload(jsonContent, filename, 'application/json');
};
