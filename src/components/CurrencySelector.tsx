import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
] as const

export type CurrencyType = typeof CURRENCIES[number]['code']

interface CurrencySelectorProps {
  value: CurrencyType
  onValueChange: (value: CurrencyType) => void
}

export const CurrencySelector = ({ value, onValueChange }: CurrencySelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.symbol} {currency.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}