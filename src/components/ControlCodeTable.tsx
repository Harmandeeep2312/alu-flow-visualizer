import { Card } from "@/components/ui/card";
import { Operation } from "./ControlPanel";

interface ControlCodeTableProps {
  selectedOperation: Operation;
}

const controlCodes = {
  'ADD': { s2: 0, s1: 1, s0: 0, code: '010' },
  'SUB': { s2: 1, s1: 1, s0: 0, code: '110' },
  'AND': { s2: 0, s1: 0, s0: 0, code: '000' },
  'OR':  { s2: 0, s1: 0, s0: 1, code: '001' },
  'XOR': { s2: 0, s1: 1, s0: 1, code: '011' },
  'NOT': { s2: 1, s1: 0, s0: 1, code: '101' },
};

export const ControlCodeTable = ({ selectedOperation }: ControlCodeTableProps) => {
  return (
    <Card className="p-6 bg-card border-2 border-accent/30">
      <h3 className="text-lg font-bold text-accent mb-4">ALU Control Codes</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3">Operation</th>
              <th className="text-center py-2 px-3">S2</th>
              <th className="text-center py-2 px-3">S1</th>
              <th className="text-center py-2 px-3">S0</th>
              <th className="text-center py-2 px-3">Code</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(controlCodes).map(([op, codes]) => {
              const isSelected = selectedOperation === op;
              return (
                <tr
                  key={op}
                  className={`
                    border-b border-border/50 transition-all
                    ${isSelected 
                      ? 'bg-accent/20 text-accent font-bold' 
                      : 'text-muted-foreground'
                    }
                  `}
                >
                  <td className="py-2 px-3">{op}</td>
                  <td className="text-center py-2 px-3">
                    <span className={`
                      inline-block w-8 h-8 leading-8 rounded
                      ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted'}
                    `}>
                      {codes.s2}
                    </span>
                  </td>
                  <td className="text-center py-2 px-3">
                    <span className={`
                      inline-block w-8 h-8 leading-8 rounded
                      ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted'}
                    `}>
                      {codes.s1}
                    </span>
                  </td>
                  <td className="text-center py-2 px-3">
                    <span className={`
                      inline-block w-8 h-8 leading-8 rounded
                      ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted'}
                    `}>
                      {codes.s0}
                    </span>
                  </td>
                  <td className="text-center py-2 px-3 font-mono">{codes.code}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
