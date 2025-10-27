import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface DecimalInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const DecimalInput = ({ label, value, onChange }: DecimalInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    // Clamp between 0-255 for 8-bit
    const clamped = Math.max(0, Math.min(255, val));
    onChange(clamped);
  };

  const binaryString = value.toString(2).padStart(8, '0');

  return (
    <Card className="p-4 bg-card/50 border border-border">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-1 block">{label} (Decimal)</label>
          <Input
            type="number"
            min="0"
            max="255"
            value={value}
            onChange={handleChange}
            className="h-10 text-lg font-bold text-center"
          />
        </div>
        <ArrowRight className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-1 block">Binary</label>
          <div className="h-10 flex items-center justify-center font-mono text-sm bg-muted rounded-md px-2">
            {binaryString}
          </div>
        </div>
      </div>
    </Card>
  );
};
