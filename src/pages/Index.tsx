import { useState } from "react";
import { BinaryInput } from "@/components/BinaryInput";
import { ControlPanel, Operation } from "@/components/ControlPanel";
import { ALUDiagram } from "@/components/ALUDiagram";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Cpu } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [inputA, setInputA] = useState(42); // 00101010
  const [inputB, setInputB] = useState(15); // 00001111
  const [operation, setOperation] = useState<Operation>('ADD');
  const [result, setResult] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const calculateResult = () => {
    let output = 0;
    
    switch (operation) {
      case 'ADD':
        output = (inputA + inputB) & 0xFF; // Keep 8-bit
        break;
      case 'SUB':
        output = (inputA - inputB) & 0xFF;
        break;
      case 'AND':
        output = inputA & inputB;
        break;
      case 'OR':
        output = inputA | inputB;
        break;
      case 'XOR':
        output = inputA ^ inputB;
        break;
      case 'NOT':
        output = ~inputA & 0xFF; // Only NOT input A
        break;
    }
    
    return output;
  };

  const handleExecute = () => {
    setIsProcessing(true);
    setShowResult(false);
    
    toast.loading("Processing operation...", {
      duration: 1500,
    });

    // Simulate processing delay
    setTimeout(() => {
      const output = calculateResult();
      setResult(output);
      setShowResult(true);
      setIsProcessing(false);
      
      toast.success(`Operation complete! Result: ${output}`, {
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Cpu className="w-12 h-12 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Interactive ALU Simulator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Visualize how an Arithmetic Logic Unit processes binary data in real-time
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <BinaryInput
            label="Input A"
            value={inputA}
            onChange={setInputA}
            animate={isProcessing}
          />
          <BinaryInput
            label="Input B"
            value={inputB}
            onChange={setInputB}
            animate={isProcessing}
          />
        </div>

        {/* Control and Diagram Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ControlPanel
              selectedOperation={operation}
              onOperationChange={setOperation}
              onExecute={handleExecute}
              isProcessing={isProcessing}
            />
          </div>
          <div className="lg:col-span-2">
            <ALUDiagram
              operation={operation}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Result Section */}
        <ResultDisplay result={result} show={showResult} />

        {/* Info Section */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
          <p>Click bits to toggle them • Select an operation • Press EXECUTE to see the magic happen ✨</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
