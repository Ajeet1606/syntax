import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "./ThemeToggle";

const Translator = () => {
  const [inputLang, setInputLang] = useState("javascript");
  const [outputLang, setOutputLang] = useState("python");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

  const translateCode = () => {
    // Simulating Gemini API call
    setTimeout(() => {
      setOutputCode(
        `# This is a simulated translation to ${outputLang}\n# Original code was in ${inputLang}\n\n# Translated code would appear here`
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 dark:text-zinc-50 text-zinc-950 flex flex-col">
      <header className="flex p-6 bg-primary text-primary-foreground">
        <div className="w-[98%]">
          <h1 className="text-3xl font-bold text-center">Syntax</h1>
          <p className="text-center mt-2">
            Powered by Gemini AI, quick code translator
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Code</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={inputLang} onValueChange={setInputLang}>
                <SelectTrigger>
                  <SelectValue placeholder="Select input language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                className="mt-4 h-[300px]"
                placeholder="Enter your code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </CardContent>
          </Card>
          <div className="md:hidden flex justify-center">
            <Button size="lg" onClick={translateCode}>
              Translate
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Output Code</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={outputLang} onValueChange={setOutputLang}>
                <SelectTrigger>
                  <SelectValue placeholder="Select output language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                className="mt-4 h-[300px]"
                placeholder="Translated code will appear here..."
                value={outputCode}
                readOnly
              />
            </CardContent>
          </Card>
        </div>

        <div className="hidden mt-6 md:flex justify-center">
          <Button
            size="lg"
            onClick={translateCode}
          >
            Translate
          </Button>
        </div>
      </main>

      {/* <footer className="p-6 bg-secondary text-secondary-foreground text-center">
        <p>This is a demo project. In a real application, you would integrate with the Gemini API for actual code translation.</p>
      </footer> */}
    </div>
  );
};

export default Translator;
