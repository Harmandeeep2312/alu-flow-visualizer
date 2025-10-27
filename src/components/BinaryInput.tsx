import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BinaryInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  animate?: boolean;
}

export const BinaryInput = ({ label, value, onChange, animate = false }: BinaryInputProps) => {
  const binaryString = value.toString(2).padStart(8, '0');
  
  const toggleBit = (index: number) => {
    const bitMask = 1 << (7 - index);
    onChange(value ^ bitMask);
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary">{label}</h3>
          <span className="text-sm text-muted-foreground">
            Decimal: <span className="text-foreground font-bold">{value}</span>
          </span>
        </div>
        
        <div className="flex gap-2 justify-center">
          {binaryString.split('').map((bit, index) => (
            <Button
              key={index}
              onClick={() => toggleBit(index)}
              variant={bit === '1' ? 'default' : 'outline'}
              className={`
                w-12 h-12 text-lg font-bold transition-all
                ${bit === '1' 
                  ? 'bg-primary text-primary-foreground glow-cyan hover:brightness-110' 
                  : 'border-2 border-border hover:border-primary/50'
                }
                ${animate ? 'animate-bit-process' : ''}
              `}
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              {bit}
            </Button>
          ))}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>MSB</span>
          <span>LSB</span>
        </div>
      </div>
    </Card>
  );
};
