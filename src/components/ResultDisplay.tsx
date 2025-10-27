import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ResultDisplayProps {
  result: number;
  show: boolean;
}

export const ResultDisplay = ({ result, show }: ResultDisplayProps) => {
  const binaryString = result.toString(2).padStart(8, '0');
  
  if (!show) {
    return (
      <Card className="p-6 bg-card border-2 border-border opacity-50">
        <div className="text-center">
          <h3 className="text-lg font-bold text-muted-foreground mb-4">Result</h3>
          <div className="text-muted-foreground">Execute an operation to see the result</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-2 border-primary/30 glow-cyan animate-scale-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Result
          </h3>
          <span className="text-sm text-muted-foreground">
            Decimal: <span className="text-foreground font-bold text-2xl">{result}</span>
          </span>
        </div>
        
        <div className="flex gap-2 justify-center">
          {binaryString.split('').map((bit, index) => (
            <div
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center text-lg font-bold rounded-md
                transition-all
                ${bit === '1' 
                  ? 'bg-primary text-primary-foreground glow-cyan' 
                  : 'bg-muted text-muted-foreground'
                }
                animate-bit-process
              `}
              style={{
                animationDelay: `${index * 0.08}s`
              }}
            >
              {bit}
            </div>
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
