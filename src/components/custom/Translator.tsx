import { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Loader2 } from "lucide-react";
import { languagesList } from "@/utils";

const Translator = () => {
  const [inputLang, setInputLang] = useState("javascript");
  const [outputLang, setOutputLang] = useState("python");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputCode);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The translated code has been copied to your clipboard.",
        variant: "default",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "There was an error copying the code to your clipboard.",
        variant: "destructive",
      });
    }
  };

  const translateCode = async () => {
    if (inputCode === "") {
      return toast({
        title: "Input Code can't be empty",
        description: "",
        variant: "destructive",
      });
    }

    setIsLoading(true);
    setOutputCode("");
    fetch(`http://localhost:8000/api/v1/translation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputCode,
        inputLang,
        outputLang,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOutputCode(data.output);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLanguageChange = (language: string, field: string) => {
    if (field === "input") {
      setInputLang(language);
      setInputCode("");
    } else {
      setOutputLang(language);
      setOutputCode("");
    }
  };

  if (!mounted) return null;

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
              <Select
                value={inputLang}
                onValueChange={(e) => handleLanguageChange(e, "input")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select input language" />
                </SelectTrigger>
                <SelectContent>
                  {languagesList.map((cur) => (
                    <SelectItem value={cur.key} key={cur.key}>
                      {cur.label}
                    </SelectItem>
                  ))}
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
            <Button
              size="lg"
              onClick={translateCode}
              className="dark:text-white bg-transparent"
              variant="outline"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Output Code</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                aria-label="Copy translated code to clipboard"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <Select
                value={outputLang}
                onValueChange={(e) => handleLanguageChange(e, "output")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select output language" />
                </SelectTrigger>
                <SelectContent>
                  {languagesList.map((cur) => (
                    <SelectItem value={cur.key} key={cur.key}>
                      {cur.label}
                    </SelectItem>
                  ))}
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
            className="dark:text-white bg-transparent"
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              "Translate"
            )}
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
