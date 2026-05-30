// Square returns money in the smallest currency unit (cents for USD).
// All formatting goes through here so there's exactly one place to fix
// if we ever support non-USD currencies.

export function formatCents(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
