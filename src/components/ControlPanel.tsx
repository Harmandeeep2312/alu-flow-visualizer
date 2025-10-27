import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Zap, Database, Shuffle, RotateCcw } from "lucide-react";

export type Operation = 'ADD' | 'SUB' | 'AND' | 'OR' | 'XOR' | 'NOT';

interface ControlPanelProps {
  selectedOperation: Operation;
  onOperationChange: (op: Operation) => void;
  onExecute: () => void;
  isProcessing: boolean;
}

const operations = [
  { id: 'ADD' as Operation, label: 'ADD', icon: Plus, description: 'Addition', color: 'text-secondary' },
  { id: 'SUB' as Operation, label: 'SUB', icon: Minus, description: 'Subtraction', color: 'text-secondary' },
  { id: 'AND' as Operation, label: 'AND', icon: Database, description: 'Bitwise AND', color: 'text-accent' },
  { id: 'OR' as Operation, label: 'OR', icon: Zap, description: 'Bitwise OR', color: 'text-accent' },
  { id: 'XOR' as Operation, label: 'XOR', icon: Shuffle, description: 'Bitwise XOR', color: 'text-accent' },
  { id: 'NOT' as Operation, label: 'NOT', icon: RotateCcw, description: 'Bitwise NOT', color: 'text-accent' },
];

export const ControlPanel = ({ 
  selectedOperation, 
  onOperationChange, 
  onExecute,
  isProcessing 
}: ControlPanelProps) => {
  return (
    <Card className="p-6 bg-card border-2 border-accent/30">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-accent mb-2">Control Signals</h3>
          <p className="text-sm text-muted-foreground">Select ALU Operation</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {operations.map((op) => {
            const Icon = op.icon;
            const isSelected = selectedOperation === op.id;
            
            return (
              <Button
                key={op.id}
                onClick={() => onOperationChange(op.id)}
                variant={isSelected ? 'default' : 'outline'}
                className={`
                  h-20 flex flex-col gap-2 transition-all
                  ${isSelected 
                    ? 'bg-accent text-accent-foreground glow-amber scale-105' 
                    : 'border-2 border-border hover:border-accent/50'
                  }
                `}
              >
                <Icon className={`w-6 h-6 ${isSelected ? '' : op.color}`} />
                <div className="text-xs font-bold">{op.label}</div>
              </Button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground mb-3">
            Operation: <span className="text-accent font-bold">
              {operations.find(op => op.id === selectedOperation)?.description}
            </span>
          </div>
          
          <Button
            onClick={onExecute}
            disabled={isProcessing}
            className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg hover:brightness-110 glow-cyan"
          >
            {isProcessing ? 'PROCESSING...' : 'EXECUTE'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
