import { useState, useRef } from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "./components/theme-toggle";

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export default function App() {
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showError = (message: string) => {
    setError(message);
    setOpenDialog(true);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(json) as JSONValue;
      const formatted = JSON.stringify(parsed, null, 2);
      setJson(formatted);
      setError("");
    } catch {
      showError("Invalid JSON");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(json) as JSONValue;
      const minified = JSON.stringify(parsed);
      setJson(minified);
      setError("");
    } catch {
      showError("Invalid JSON");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
  };

  // Find functions - basic prompt find inside the textarea content
  const handleFind = () => {
    const query = prompt("Find:");
    if (!query) return;

    if (textareaRef.current) {
      const index = json.indexOf(query);
      if (index === -1) {
        showError(`'${query}' not found.`);
      } else {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(index, index + query.length);
      }
    }
  };

  const handleFindNext = () => {
    const query = prompt("Find Next:");
    if (!query) return;

    if (textareaRef.current) {
      const startPos = textareaRef.current.selectionEnd || 0;
      const index = json.indexOf(query, startPos);
      if (index === -1) {
        showError(`No further occurrence of '${query}' found.`);
      } else {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(index, index + query.length);
      }
    }
  };

  const handleFindPrevious = () => {
    const query = prompt("Find Previous:");
    if (!query) return;

    if (textareaRef.current) {
      const startPos = textareaRef.current.selectionStart || 0;
      const beforeText = json.slice(0, startPos);
      const index = beforeText.lastIndexOf(query);
      if (index === -1) {
        showError(`No previous occurrence of '${query}' found.`);
      } else {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(index, index + query.length);
      }
    }
  };

  const handleCut = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;

      if (start === end) return; // no selection

      const selectedText = json.slice(start, end);
      navigator.clipboard.writeText(selectedText).then(() => {
        // Remove the selected text
        const newText = json.slice(0, start) + json.slice(end);
        setJson(newText);
        // Move cursor to start position
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart =
              textareaRef.current.selectionEnd = start;
          }
        }, 0);
      });
    }
  };

  const handlePaste = async () => {
    if (textareaRef.current) {
      const clipboardText = await navigator.clipboard.readText();
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;

      // Insert clipboard text replacing selection
      const newText = json.slice(0, start) + clipboardText + json.slice(end);
      setJson(newText);

      // Move cursor after pasted text
      setTimeout(() => {
        if (textareaRef.current) {
          const pos = start + clipboardText.length;
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = pos;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-zinc-900 text-black dark:text-white">
      <div className="flex items-center justify-between px-4 my-2 mb-0">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger onClick={handleFormat}>Format</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger onClick={handleMinify}>Minify</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger onClick={handleCopy}>Copy</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger onClick={handleCut}>Cut</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger onClick={handlePaste}>Paste</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Find</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleFind}>Find...</MenubarItem>
              <MenubarItem onClick={handleFindNext}>Find Next</MenubarItem>
              <MenubarItem onClick={handleFindPrevious}>
                Find Previous
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="flex-1 p-4 ">
          <Textarea
            ref={textareaRef}
            className="w-full h-full resize-none"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder="Paste or write your JSON here..."
          />

          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Error</AlertDialogTitle>
                <AlertDialogDescription>{error}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
