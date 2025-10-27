import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface FlagRegisterProps {
  zero: boolean;
  negative: boolean;
  carry: boolean;
  overflow: boolean;
  show: boolean;
}

export const FlagRegister = ({ zero, negative, carry, overflow, show }: FlagRegisterProps) => {
  const flags = [
    { name: "Z", label: "Zero", active: zero, description: "Result is zero" },
    { name: "N", label: "Negative", active: negative, description: "MSB is 1 (negative in 2's complement)" },
    { name: "C", label: "Carry", active: carry, description: "Carry generated from MSB" },
    { name: "V", label: "Overflow", active: overflow, description: "Arithmetic overflow occurred" },
  ];

  return (
    <Card className="p-6 bg-card border-2 border-accent/30">
      <h3 className="text-lg font-bold text-accent mb-4">Status Flags</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {flags.map((flag) => (
          <div
            key={flag.name}
            className={`
              p-4 rounded-lg border-2 transition-all
              ${show && flag.active 
                ? 'border-secondary bg-secondary/20 glow-green' 
                : 'border-border bg-muted/20'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              {show && flag.active ? (
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
              <div>
                <div className="font-bold text-lg">{flag.name}</div>
                <div className="text-xs text-muted-foreground">{flag.label}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{flag.description}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
