import { useState } from "react";
import { BinaryInput } from "@/components/BinaryInput";
import { ControlPanel, Operation } from "@/components/ControlPanel";
import { ALUDiagram } from "@/components/ALUDiagram";
import { ResultDisplay } from "@/components/ResultDisplay";
import { FlagRegister } from "@/components/FlagRegister";
import { ControlCodeTable } from "@/components/ControlCodeTable";
import { OperationHistory, HistoryEntry } from "@/components/OperationHistory";
import { StepByStepCalculation } from "@/components/StepByStepCalculation";
import { DecimalInput } from "@/components/DecimalInput";
import { Cpu } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [inputA, setInputA] = useState(42); // 00101010
  const [inputB, setInputB] = useState(15); // 00001111
  const [operation, setOperation] = useState<Operation>('ADD');
  const [result, setResult] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  // Flags
  const [zero, setZero] = useState(false);
  const [negative, setNegative] = useState(false);
  const [carry, setCarry] = useState(false);
  const [overflow, setOverflow] = useState(false);

  // Step by step mode
  const [stepMode, setStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 11; // Load inputs, control, 8 bits, output

  const calculateResult = () => {
    let output = 0;
    let carryFlag = false;
    let overflowFlag = false;
    
    switch (operation) {
      case 'ADD':
        output = inputA + inputB;
        carryFlag = output > 255;
        // Check for overflow: if both inputs have same sign but result has different sign
        const signA = (inputA >> 7) & 1;
        const signB = (inputB >> 7) & 1;
        const signResult = ((output & 0xFF) >> 7) & 1;
        overflowFlag = (signA === signB) && (signA !== signResult);
        output = output & 0xFF; // Keep 8-bit
        break;
      case 'SUB':
        output = inputA - inputB;
        carryFlag = output < 0;
        output = output & 0xFF;
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
    
    // Set flags
    setZero(output === 0);
    setNegative((output & 0x80) !== 0); // Check MSB
    setCarry(carryFlag);
    setOverflow(overflowFlag);
    
    return output;
  };

  const handleExecute = () => {
    setIsProcessing(true);
    setShowResult(false);
    setStepMode(false);
    setCurrentStep(0);
    
    toast.loading("Processing operation...", {
      duration: 1500,
    });

    // Simulate processing delay
    setTimeout(() => {
      const output = calculateResult();
      setResult(output);
      setShowResult(true);
      setIsProcessing(false);
      
      // Add to history
      const newEntry: HistoryEntry = {
        operation,
        inputA,
        inputB,
        result: output,
        timestamp: Date.now(),
      };
      setHistory([newEntry, ...history].slice(0, 10)); // Keep last 10
      
      toast.success(`Operation complete! Result: ${output}`, {
        duration: 3000,
      });
    }, 1500);
  };

  const handleStepByStep = () => {
    setStepMode(true);
    setCurrentStep(0);
    setShowResult(false);
    const output = calculateResult();
    setResult(output);
    toast.info("Step-by-step mode activated. Click 'Next Step' to proceed.");
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep === totalSteps - 2) {
        setShowResult(true);
        toast.success("Calculation complete!");
      }
    }
  };

  const handleResetStep = () => {
    setCurrentStep(0);
    setShowResult(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success("History cleared");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-[1600px] mx-auto space-y-8">
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

        {/* Decimal Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <DecimalInput label="Input A" value={inputA} onChange={setInputA} />
          <DecimalInput label="Input B" value={inputB} onChange={setInputB} />
        </div>

        {/* Binary Input Section */}
        <Tabs defaultValue="binary" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="binary">Binary View</TabsTrigger>
            <TabsTrigger value="step">Step-by-Step</TabsTrigger>
          </TabsList>
          
          <TabsContent value="binary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <BinaryInput
                label="Input A (Binary)"
                value={inputA}
                onChange={setInputA}
                animate={isProcessing}
              />
              <BinaryInput
                label="Input B (Binary)"
                value={inputB}
                onChange={setInputB}
                animate={isProcessing}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="step" className="space-y-6">
            {!stepMode ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Activate step-by-step mode to see bit-by-bit calculation with carry propagation
                </p>
                <button
                  onClick={handleStepByStep}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-bold hover:brightness-110 transition-all glow-green"
                >
                  Start Step-by-Step Mode
                </button>
              </div>
            ) : (
              <StepByStepCalculation
                operation={operation}
                inputA={inputA}
                inputB={inputB}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                onReset={handleResetStep}
                totalSteps={totalSteps}
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Control, Diagram, and Control Codes */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ControlPanel
              selectedOperation={operation}
              onOperationChange={setOperation}
              onExecute={handleExecute}
              isProcessing={isProcessing}
            />
            <ControlCodeTable selectedOperation={operation} />
          </div>
          <div className="lg:col-span-3">
            <ALUDiagram
              operation={operation}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Result and Flags */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ResultDisplay result={result} show={showResult} />
          <FlagRegister
            zero={zero}
            negative={negative}
            carry={carry}
            overflow={overflow}
            show={showResult}
          />
        </div>

        {/* Operation History */}
        <OperationHistory history={history} onClear={handleClearHistory} />

        {/* Info Section */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
          <p>Toggle bits • Enter decimals • Select operation • Execute or use step-by-step mode ✨</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
