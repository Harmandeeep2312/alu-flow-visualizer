import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface HistoryEntry {
  operation: string;
  inputA: number;
  inputB: number;
  result: number;
  timestamp: number;
}

interface OperationHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export const OperationHistory = ({ history, onClear }: OperationHistoryProps) => {
  const formatBinary = (num: number) => num.toString(2).padStart(8, '0');
  
  return (
    <Card className="p-6 bg-card border-2 border-primary/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary">Operation History</h3>
        {history.length > 0 && (
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[200px]">
        {history.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No operations yet. Execute an operation to see history.
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((entry) => (
              <div
                key={entry.timestamp}
                className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-accent">{entry.operation}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="font-mono text-sm text-foreground">
                  {formatBinary(entry.inputA)} {entry.operation === 'NOT' ? '' : `${entry.operation === 'ADD' ? '+' : entry.operation === 'SUB' ? '-' : entry.operation.toLowerCase()} ${formatBinary(entry.inputB)}`} = {formatBinary(entry.result)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  ({entry.inputA} {entry.operation === 'NOT' ? '' : `${entry.operation === 'ADD' ? '+' : entry.operation === 'SUB' ? '-' : entry.operation.toLowerCase()} ${entry.inputB}`} = {entry.result}
                  {entry.operation === 'SUB' && (entry.inputA - entry.inputB) < 0 ? ` → 2's complement of ${entry.inputA - entry.inputB}` : ''})
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};
