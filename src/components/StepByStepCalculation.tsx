import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw } from "lucide-react";
import { Operation } from "./ControlPanel";

interface StepByStepCalculationProps {
  operation: Operation;
  inputA: number;
  inputB: number;
  currentStep: number;
  onNextStep: () => void;
  onReset: () => void;
  totalSteps: number;
}

export const StepByStepCalculation = ({
  operation,
  inputA,
  inputB,
  currentStep,
  onNextStep,
  onReset,
  totalSteps,
}: StepByStepCalculationProps) => {
  const binaryA = inputA.toString(2).padStart(8, '0');
  const binaryB = inputB.toString(2).padStart(8, '0');

  // Calculate carry for addition
  const calculateCarries = () => {
    const carries = [0];
    let carry = 0;
    for (let i = 7; i >= 0; i--) {
      const bitA = parseInt(binaryA[i]);
      const bitB = parseInt(binaryB[i]);
      const sum = bitA + bitB + carry;
      carry = sum > 1 ? 1 : 0;
      carries.unshift(carry);
    }
    return carries;
  };

  const calculateResult = () => {
    let result = 0;
    switch (operation) {
      case 'ADD':
        result = (inputA + inputB) & 0xFF;
        break;
      case 'SUB':
        result = (inputA - inputB) & 0xFF;
        break;
      case 'AND':
        result = inputA & inputB;
        break;
      case 'OR':
        result = inputA | inputB;
        break;
      case 'XOR':
        result = inputA ^ inputB;
        break;
      case 'NOT':
        result = ~inputA & 0xFF;
        break;
    }
    return result.toString(2).padStart(8, '0');
  };

  const carries = operation === 'ADD' ? calculateCarries() : [];
  const result = calculateResult();
  const isArithmetic = operation === 'ADD' || operation === 'SUB';

  const getExplanation = () => {
    if (currentStep === 0) {
      return `Step 1: Load inputs - A = ${binaryA} (${inputA}), B = ${binaryB} (${inputB})`;
    } else if (currentStep === 1) {
      return `Step 2: Control signal set for ${operation} operation (LSB to MSB processing)`;
    } else if (currentStep < totalSteps - 1) {
      const bitPos = currentStep - 2; // 0 to 7, representing bit position from LSB
      const stringIdx = 7 - bitPos; // Convert to string index (right to left)
      
      if (isArithmetic && operation === 'ADD') {
        const bitA = binaryA[stringIdx];
        const bitB = binaryB[stringIdx];
        const carryIn = carries[bitPos];
        const sum = parseInt(bitA) + parseInt(bitB) + carryIn;
        const resultBit = sum % 2;
        const carryOut = sum > 1 ? 1 : 0;
        return `Step ${currentStep + 1}: Bit ${bitPos} (LSB→MSB): ${bitA} + ${bitB} + carry(${carryIn}) = ${resultBit}, carry out = ${carryOut}`;
      } else if (operation === 'SUB') {
        const bitA = binaryA[stringIdx];
        const bitB = binaryB[stringIdx];
        const resultBit = result[stringIdx];
        return `Step ${currentStep + 1}: Bit ${bitPos} (LSB→MSB): ${bitA} - ${bitB} = ${resultBit}${bitPos === 7 ? ' (2\'s complement if negative)' : ''}`;
      } else {
        const bitA = binaryA[stringIdx];
        const bitB = binaryB[stringIdx];
        const resultBit = result[stringIdx];
        return `Step ${currentStep + 1}: Bit ${bitPos} (LSB→MSB): ${bitA} ${operation} ${bitB} = ${resultBit}`;
      }
    } else {
      const decimalValue = parseInt(result, 2);
      const is2sComplement = operation === 'SUB' && (inputA - inputB) < 0;
      const actualValue = is2sComplement ? -(256 - decimalValue) : decimalValue;
      return `Step ${currentStep + 1}: Output = ${result} (${decimalValue} in unsigned${is2sComplement ? `, ${actualValue} in signed 2's complement` : ''})`;
    }
  };

  return (
    <Card className="p-6 bg-card border-2 border-secondary/30">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-secondary">Bit-by-Bit Calculation</h3>
          <div className="flex gap-2">
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={onNextStep}
              disabled={currentStep >= totalSteps - 1}
              className="bg-secondary text-secondary-foreground hover:brightness-110"
              size="sm"
            >
              Next Step
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-muted-foreground">
            Progress: {currentStep + 1} / {totalSteps}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Carry Row (for addition) */}
        {operation === 'ADD' && currentStep > 1 && (
          <div className="font-mono">
            <div className="text-xs text-muted-foreground mb-1">Carry (LSB→MSB):</div>
            <div className="flex gap-2 justify-center">
              {carries.slice(0, -1).map((carry, idx) => {
                const bitPos = 7 - idx; // Convert string index to bit position
                const isActive = bitPos <= (currentStep - 2);
                return (
                  <div
                    key={idx}
                    className={`
                      w-8 h-8 flex items-center justify-center text-sm rounded
                      transition-all
                      ${isActive && carry === 1
                        ? 'bg-accent text-accent-foreground glow-amber'
                        : 'bg-muted/30 text-muted-foreground'
                      }
                    `}
                  >
                    {isActive ? carry : '·'}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Binary Calculation Display */}
        <div className="font-mono space-y-2">
          {/* Input A */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-8">A:</span>
            <div className="flex gap-2">
              {binaryA.split('').map((bit, idx) => {
                const bitPos = 7 - idx; // Bit position from LSB
                const isActive = currentStep > 1 && bitPos <= (currentStep - 2);
                return (
                  <div
                    key={idx}
                    className={`
                      w-8 h-8 flex items-center justify-center rounded
                      ${isActive
                        ? 'bg-primary/20 text-primary border border-primary'
                        : 'bg-muted/30 text-foreground'
                      }
                    `}
                  >
                    {bit}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operation Symbol + Input B */}
          {operation !== 'NOT' && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-8">
                {operation === 'ADD' ? '+' : operation === 'SUB' ? '-' : operation.toLowerCase()}:
              </span>
              <div className="flex gap-2">
                {binaryB.split('').map((bit, idx) => {
                  const bitPos = 7 - idx;
                  const isActive = currentStep > 1 && bitPos <= (currentStep - 2);
                  return (
                    <div
                      key={idx}
                      className={`
                        w-8 h-8 flex items-center justify-center rounded
                        ${isActive
                          ? 'bg-primary/20 text-primary border border-primary'
                          : 'bg-muted/30 text-foreground'
                        }
                      `}
                    >
                      {bit}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t-2 border-secondary ml-12" />

          {/* Result */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary w-8">=</span>
            <div className="flex gap-2">
              {result.split('').map((bit, idx) => {
                const bitPos = 7 - idx;
                const isActive = currentStep > 1 && bitPos <= (currentStep - 2);
                return (
                  <div
                    key={idx}
                    className={`
                      w-8 h-8 flex items-center justify-center rounded font-bold
                      ${isActive
                        ? 'bg-secondary text-secondary-foreground glow-green animate-pulse-glow'
                        : 'bg-muted/30 text-muted-foreground'
                      }
                    `}
                  >
                    {isActive ? bit : '·'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <div className="text-sm text-foreground">{getExplanation()}</div>
        </div>
      </div>
    </Card>
  );
};
