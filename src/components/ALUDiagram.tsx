import { Card } from "@/components/ui/card";
import { Operation } from "./ControlPanel";

interface ALUDiagramProps {
  operation: Operation;
  isProcessing: boolean;
}

export const ALUDiagram = ({ operation, isProcessing }: ALUDiagramProps) => {
  const isArithmetic = operation === 'ADD' || operation === 'SUB';
  const isLogic = operation === 'AND' || operation === 'OR' || operation === 'XOR' || operation === 'NOT';

  return (
    <Card className="p-8 bg-card border-2 border-primary/30">
      <h3 className="text-lg font-bold text-primary mb-6 text-center">ALU Internal Architecture</h3>
      
      <div className="relative">
        {/* Input Registers */}
        <div className="flex justify-around mb-8">
          <div className={`
            px-6 py-3 rounded-lg border-2 transition-all
            ${isProcessing ? 'border-primary glow-cyan' : 'border-border'}
          `}>
            <div className="text-sm font-bold text-center">Input A</div>
          </div>
          <div className={`
            px-6 py-3 rounded-lg border-2 transition-all
            ${isProcessing ? 'border-primary glow-cyan' : 'border-border'}
          `}>
            <div className="text-sm font-bold text-center">Input B</div>
          </div>
        </div>

        {/* Vertical Lines */}
        <div className="flex justify-around mb-6">
          <div className={`w-1 h-12 mx-auto ${isProcessing ? 'bg-primary glow-cyan animate-pulse-glow' : 'bg-border'}`}></div>
          <div className={`w-1 h-12 mx-auto ${isProcessing ? 'bg-primary glow-cyan animate-pulse-glow' : 'bg-border'}`}></div>
        </div>

        {/* Multiplexer */}
        <div className="flex justify-center mb-6">
          <div className={`
            px-8 py-4 rounded-lg border-2 transition-all
            ${isProcessing ? 'border-accent glow-amber' : 'border-border'}
          `}>
            <div className="text-sm font-bold text-center text-accent">MULTIPLEXER</div>
            <div className="text-xs text-center text-muted-foreground mt-1">Control Signals</div>
          </div>
        </div>

        {/* Processing Units */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Arithmetic Unit */}
          <div className={`
            p-6 rounded-lg border-2 transition-all
            ${isProcessing && isArithmetic 
              ? 'border-secondary bg-secondary/10 glow-green' 
              : 'border-border'
            }
          `}>
            <div className={`
              text-sm font-bold text-center mb-2
              ${isProcessing && isArithmetic ? 'text-secondary' : 'text-muted-foreground'}
            `}>
              Arithmetic Unit
            </div>
            <div className="text-xs text-center text-muted-foreground">
              ADD / SUB
            </div>
            {isProcessing && isArithmetic && (
              <div className="mt-2 text-xs text-center text-secondary font-bold">
                ⚡ ACTIVE
              </div>
            )}
          </div>

          {/* Logic Unit */}
          <div className={`
            p-6 rounded-lg border-2 transition-all
            ${isProcessing && isLogic 
              ? 'border-accent bg-accent/10 glow-amber' 
              : 'border-border'
            }
          `}>
            <div className={`
              text-sm font-bold text-center mb-2
              ${isProcessing && isLogic ? 'text-accent' : 'text-muted-foreground'}
            `}>
              Logic Unit
            </div>
            <div className="text-xs text-center text-muted-foreground">
              AND / OR / XOR / NOT
            </div>
            {isProcessing && isLogic && (
              <div className="mt-2 text-xs text-center text-accent font-bold">
                ⚡ ACTIVE
              </div>
            )}
          </div>
        </div>

        {/* Vertical Line */}
        <div className="flex justify-center mb-6">
          <div className={`w-1 h-12 ${isProcessing ? 'bg-primary glow-cyan animate-pulse-glow' : 'bg-border'}`}></div>
        </div>

        {/* Output Register */}
        <div className="flex justify-center">
          <div className={`
            px-12 py-4 rounded-lg border-2 transition-all
            ${isProcessing ? 'border-primary bg-primary/10 glow-cyan' : 'border-border'}
          `}>
            <div className="text-sm font-bold text-center">Output Register</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
