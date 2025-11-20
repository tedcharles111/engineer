var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: "/styles/index.css" }
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("title", { children: "Multiverse - AI Web App Builder" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2("div", { className: "multiverse-app", children: [
        /* @__PURE__ */ jsxDEV2("header", { className: "app-header", children: [
          /* @__PURE__ */ jsxDEV2("h1", { children: "\u{1F680} Multiverse AI Builder" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 21,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV2("p", { children: "Create web apps with the power of multiple AI models" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 22,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 20,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV2("main", { children: /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 25,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("script", { src: "https://code.responsivevoice.org/responsivevoice.js?key=WkAsgle4" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/routes/api.chat.ts
var api_chat_exports = {};
__export(api_chat_exports, {
  action: () => action
});
import { json } from "@remix-run/node";

// app/lib/llm/mistralService.ts
import { Mistral } from "@mistralai/mistralai";
import { HfInference } from "@huggingface/inference";
var MISTRAL_API_KEY = "8sco68RTiZlzi3DbcmOMM8uYKiJwbOvu", HUGGINGFACE_API_KEY = "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", MultiverseAIService = class {
  mistral;
  hf;
  models = {
    free: {
      "nebula-mistral": "mistral-large-latest",
      "quantum-kimi": "mistralai/Mistral-7B-Instruct-v0.2"
    },
    premium: {
      "stellar-coder": "Qwen/Qwen2.5-Coder-32B-Instruct",
      "cosmos-vision": "Qwen/Qwen2-VL-72B-Instruct",
      "pulsar-deepseek": "deepseek-ai/DeepSeek-Coder-V2-Instruct",
      "nova-r1": "deepseek-ai/DeepSeek-R1"
    }
  };
  constructor() {
    this.mistral = new Mistral({ apiKey: MISTRAL_API_KEY }), this.hf = new HfInference(HUGGINGFACE_API_KEY);
  }
  async generateStream(messages, modelId, onChunk) {
    let modelName = { ...this.models.free, ...this.models.premium }[modelId];
    if (!modelName)
      throw new Error(`Model ${modelId} not found`);
    try {
      modelId === "nebula-mistral" ? await this.generateMistralStream(messages, modelName, onChunk) : await this.generateHuggingFaceStream(messages, modelName, onChunk);
    } catch (error) {
      console.error(`Error with model ${modelId}:`, error), onChunk(`

Error: Failed to generate response from ${modelId}. Please try again.`);
    }
  }
  async generateMistralStream(messages, model, onChunk) {
    let stream = await this.mistral.chat.stream({
      model,
      messages,
      maxTokens: 8e3,
      temperature: 0.7
    });
    for await (let chunk of stream)
      chunk.data?.choices[0]?.delta?.content && onChunk(chunk.data.choices[0].delta.content);
  }
  async generateHuggingFaceStream(messages, model, onChunk) {
    let prompt = messages.map((m) => `${m.role}: ${m.content}`).join(`
`), response = await this.hf.textGenerationStream({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 8e3,
        temperature: 0.7,
        return_full_text: !1
      }
    });
    for await (let chunk of response)
      chunk.token.text && onChunk(chunk.token.text);
  }
  async generateWithAllModels(messages, onProgress) {
    let promises = Object.keys({ ...this.models.free, ...this.models.premium }).map(
      (modelId) => this.generateStream(messages, modelId, (chunk) => {
        onProgress(modelId, chunk);
      }).catch((error) => {
        console.error(`Model ${modelId} failed:`, error), onProgress(modelId, `
Error: ${error.message}`);
      })
    );
    await Promise.allSettled(promises);
  }
  async generateMarketingAd(projectDescription) {
    let prompt = `Create a compelling marketing advertisement for this web application: ${projectDescription}. 
    Make it engaging, include benefits, and make it suitable for social media platforms.`, adContent = "";
    return await this.generateMistralStream(
      [{ role: "user", content: prompt }],
      "mistral-large-latest",
      (chunk) => {
        adContent += chunk;
      }
    ), adContent;
  }
};

// app/routes/api.chat.ts
async function action({ request }) {
  if (request.method !== "POST")
    return json({ error: "Method not allowed" }, { status: 405 });
  let { messages, model } = await request.json();
  try {
    let aiService = new MultiverseAIService(), stream = new ReadableStream({
      async start(controller) {
        await aiService.generateStream(
          messages,
          model,
          (chunk) => {
            controller.enqueue(`data: ${JSON.stringify({ chunk })}

`);
          }
        ), controller.close();
      }
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    });
  } catch {
    return json({ error: "Generation failed" }, { status: 500 });
  }
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});

// app/components/chat/BaseChat.tsx
import { useState as useState2, useRef as useRef2, useEffect } from "react";

// app/hooks/useSpeechToText.ts
import { useState, useRef, useCallback } from "react";
var useSpeechToText = () => {
  let [isListening, setIsListening] = useState(!1), [transcript, setTranscript] = useState(""), [isSupported, setIsSupported] = useState(!0), recognitionRef = useRef(null), startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setIsSupported(!1), alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition(), recognitionRef.current.continuous = !0, recognitionRef.current.interimResults = !0, recognitionRef.current.lang = "en-US", recognitionRef.current.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript2 = event.results[i][0].transcript;
        event.results[i].isFinal && (finalTranscript += transcript2 + " ");
      }
      finalTranscript && setTranscript((prev) => prev + finalTranscript);
    }, recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error), setIsListening(!1), event.error === "not-allowed" && alert("Microphone access denied. Please allow microphone permissions.");
    }, recognitionRef.current.onend = () => {
      setIsListening(!1);
    }, recognitionRef.current.start(), setIsListening(!0);
  }, []), stopListening = useCallback(() => {
    recognitionRef.current && (recognitionRef.current.stop(), setIsListening(!1));
  }, []), resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);
  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

// app/lib/githubService.ts
import { Octokit } from "octokit";
var GitHubService = class {
  octokit;
  constructor(accessToken) {
    this.octokit = new Octokit({ auth: accessToken });
  }
  async createRepository(name, description, isPrivate = !1) {
    try {
      return (await this.octokit.rest.repos.createForAuthenticatedUser({
        name: name.replace(/[^a-zA-Z0-9-_]/g, "-"),
        description,
        private: isPrivate,
        auto_init: !0
      })).data;
    } catch (error) {
      throw console.error("GitHub repository creation failed:", error), new Error("Failed to create GitHub repository");
    }
  }
  async pushFiles(repo, owner, files) {
    try {
      for (let file of files)
        await this.octokit.rest.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: file.path,
          message: `Add ${file.path}`,
          content: Buffer.from(file.content).toString("base64")
        });
      return !0;
    } catch (error) {
      throw console.error("GitHub file push failed:", error), new Error("Failed to push files to GitHub");
    }
  }
  async deployToPages(repo, owner) {
    try {
      return (await this.octokit.rest.repos.createPagesSite({
        owner,
        repo,
        source: {
          branch: "main",
          path: "/"
        }
      })).data;
    } catch (error) {
      throw console.error("GitHub Pages deployment failed:", error), new Error("Failed to deploy to GitHub Pages");
    }
  }
  async createProjectFromCode(files, projectName, description) {
    let repo = await this.createRepository(projectName, description);
    await this.pushFiles(repo.name, repo.owner.login, files);
    let pages = await this.deployToPages(repo.name, repo.owner.login);
    return {
      repoUrl: repo.html_url,
      pagesUrl: `https://${repo.owner.login}.github.io/${repo.name}`,
      repoName: repo.name
    };
  }
};

// app/components/chat/BaseChat.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function BaseChat() {
  let [messages, setMessages] = useState2([]), [input, setInput] = useState2(""), [isGenerating, setIsGenerating] = useState2(!1), [selectedModels, setSelectedModels] = useState2(["nebula-mistral"]), [generatedCode, setGeneratedCode] = useState2(""), [githubToken, setGithubToken] = useState2(""), aiServiceRef = useRef2(new MultiverseAIService()), { isListening, transcript, isSupported, startListening, stopListening } = useSpeechToText();
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);
  let handleSubmit = async (e) => {
    if (e.preventDefault(), !input.trim() || isGenerating)
      return;
    let userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };
    setMessages((prev) => [...prev, userMessage]), setInput(""), setIsGenerating(!0);
    let responses = /* @__PURE__ */ new Map();
    try {
      await aiServiceRef.current.generateWithAllModels(
        [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        (model, chunk) => {
          let newContent = (responses.get(model) || "") + chunk;
          responses.set(model, newContent), setMessages((prev) => {
            let newMessages = [...prev], existingAssistantMsgIndex = newMessages.findIndex(
              (m) => m.role === "assistant" && m.model === model
            );
            return existingAssistantMsgIndex !== -1 ? newMessages[existingAssistantMsgIndex].content = newContent : newMessages.push({
              id: `${model}-${Date.now()}`,
              role: "assistant",
              model,
              content: newContent,
              isCode: newContent.includes("```") || newContent.includes("function") || newContent.includes("const ")
            }), newMessages;
          });
        }
      );
      let allCode = "";
      responses.forEach((content, model) => {
        allCode += `// Generated by ${model}
${content}

`;
      }), setGeneratedCode(allCode);
    } catch (error) {
      console.error("Generation error:", error), setMessages((prev) => [...prev, {
        id: "error",
        role: "assistant",
        content: "Sorry, there was an error generating the response. Please try again.",
        model: "system"
      }]);
    } finally {
      setIsGenerating(!1);
    }
  }, speakText = (text) => {
    typeof window < "u" && window.responsiveVoice && window.responsiveVoice.speak(text, "UK English Female", {
      rate: 0.9,
      pitch: 1,
      volume: 1
    });
  }, deployToGitHub = async () => {
    if (!githubToken) {
      alert("Please enter your GitHub personal access token");
      return;
    }
    if (!generatedCode) {
      alert("No code generated yet");
      return;
    }
    try {
      let githubService = new GitHubService(githubToken), files = [
        {
          path: "index.html",
          content: `<!DOCTYPE html>
<html>
<head>
    <title>Multiverse Generated App</title>
    <style>body { font-family: Arial, sans-serif; margin: 40px; }</style>
</head>
<body>
    <h1>Welcome to Your Multiverse App</h1>
    <div id="app">${generatedCode}</div>
    <div class="multiverse-edit">
        <a href="https://your-multiverse-domain.com" target="_blank">Edit with Multiverse</a>
    </div>
</body>
</html>`
        },
        {
          path: "README.md",
          content: `# Multiverse Generated App

This app was generated using Multiverse AI Builder.`
        }
      ], result = await githubService.createProjectFromCode(
        files,
        `multiverse-app-${Date.now()}`,
        "Web app generated by Multiverse AI Builder"
      );
      alert(`Successfully deployed to GitHub!
Repository: ${result.repoUrl}
Live Site: ${result.pagesUrl}`);
    } catch (error) {
      console.error("GitHub deployment failed:", error), alert("Failed to deploy to GitHub. Please check your token and try again.");
    }
  };
  return /* @__PURE__ */ jsxDEV3("div", { className: "chat-container", children: [
    /* @__PURE__ */ jsxDEV3("div", { className: "models-selector", children: [
      /* @__PURE__ */ jsxDEV3("h3", { children: "\u{1F680} Galaxian Models" }, void 0, !1, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "model-toggles", children: [
        Object.entries(aiServiceRef.current.models.free).map(([id, name]) => /* @__PURE__ */ jsxDEV3("label", { className: "model-toggle", children: [
          /* @__PURE__ */ jsxDEV3(
            "input",
            {
              type: "checkbox",
              checked: selectedModels.includes(id),
              onChange: (e) => {
                e.target.checked ? setSelectedModels((prev) => [...prev, id]) : setSelectedModels((prev) => prev.filter((m) => m !== id));
              }
            },
            void 0,
            !1,
            {
              fileName: "app/components/chat/BaseChat.tsx",
              lineNumber: 162,
              columnNumber: 15
            },
            this
          ),
          id,
          " (Free)"
        ] }, id, !0, {
          fileName: "app/components/chat/BaseChat.tsx",
          lineNumber: 161,
          columnNumber: 13
        }, this)),
        Object.entries(aiServiceRef.current.models.premium).map(([id, name]) => /* @__PURE__ */ jsxDEV3("label", { className: "model-toggle premium", children: [
          /* @__PURE__ */ jsxDEV3(
            "input",
            {
              type: "checkbox",
              checked: selectedModels.includes(id),
              onChange: (e) => {
                e.target.checked ? setSelectedModels((prev) => [...prev, id]) : setSelectedModels((prev) => prev.filter((m) => m !== id));
              }
            },
            void 0,
            !1,
            {
              fileName: "app/components/chat/BaseChat.tsx",
              lineNumber: 178,
              columnNumber: 15
            },
            this
          ),
          id,
          " \u2B50"
        ] }, id, !0, {
          fileName: "app/components/chat/BaseChat.tsx",
          lineNumber: 177,
          columnNumber: 13
        }, this))
      ] }, void 0, !0, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 159,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 157,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "messages-container", children: messages.map((message) => /* @__PURE__ */ jsxDEV3("div", { className: `message ${message.role} ${message.isCode ? "code-message" : ""}`, children: [
      /* @__PURE__ */ jsxDEV3("strong", { children: [
        message.role === "assistant" ? `\u{1F916} ${message.model}` : "\u{1F464} You",
        ":"
      ] }, void 0, !0, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 198,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3("pre", { children: message.content }, void 0, !1, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 199,
        columnNumber: 13
      }, this),
      message.role === "assistant" && /* @__PURE__ */ jsxDEV3("button", { onClick: () => speakText(message.content), className: "speak-btn", children: "\u{1F50A} Speak" }, void 0, !1, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 201,
        columnNumber: 15
      }, this)
    ] }, message.id, !0, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 197,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 195,
      columnNumber: 7
    }, this),
    generatedCode && /* @__PURE__ */ jsxDEV3("div", { className: "deployment-section", children: [
      /* @__PURE__ */ jsxDEV3("h4", { children: "\u{1F680} Deployment Options" }, void 0, !1, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 211,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "github-deploy", children: [
        /* @__PURE__ */ jsxDEV3(
          "input",
          {
            type: "password",
            placeholder: "GitHub Personal Access Token",
            value: githubToken,
            onChange: (e) => setGithubToken(e.target.value),
            className: "token-input"
          },
          void 0,
          !1,
          {
            fileName: "app/components/chat/BaseChat.tsx",
            lineNumber: 213,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV3("button", { onClick: deployToGitHub, className: "deploy-btn", children: "Deploy to GitHub Pages" }, void 0, !1, {
          fileName: "app/components/chat/BaseChat.tsx",
          lineNumber: 220,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 212,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 210,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("form", { onSubmit: handleSubmit, className: "input-form", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "input-container", children: [
        /* @__PURE__ */ jsxDEV3(
          "textarea",
          {
            value: input,
            onChange: (e) => setInput(e.target.value),
            placeholder: "Describe your web app or use voice input...",
            rows: 3,
            disabled: isGenerating
          },
          void 0,
          !1,
          {
            fileName: "app/components/chat/BaseChat.tsx",
            lineNumber: 229,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV3("div", { className: "voice-controls", children: isSupported ? /* @__PURE__ */ jsxDEV3(
          "button",
          {
            type: "button",
            onClick: isListening ? stopListening : startListening,
            className: `voice-btn ${isListening ? "listening" : ""}`,
            children: isListening ? "\u{1F6D1} Stop" : "\u{1F3A4} Speak"
          },
          void 0,
          !1,
          {
            fileName: "app/components/chat/BaseChat.tsx",
            lineNumber: 239,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ jsxDEV3("span", { className: "voice-unsupported", children: "\u{1F3A4} Not Supported" }, void 0, !1, {
          fileName: "app/components/chat/BaseChat.tsx",
          lineNumber: 247,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/components/chat/BaseChat.tsx",
          lineNumber: 237,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/chat/BaseChat.tsx",
        lineNumber: 228,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(
        "button",
        {
          type: "submit",
          disabled: !input.trim() || isGenerating,
          className: "send-button",
          children: isGenerating ? "\u{1F680} Generating..." : "Send to All Models"
        },
        void 0,
        !1,
        {
          fileName: "app/components/chat/BaseChat.tsx",
          lineNumber: 252,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 227,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "preview-tag", children: /* @__PURE__ */ jsxDEV3("small", { children: "\u2728 Edit with Multiverse" }, void 0, !1, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 262,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/chat/BaseChat.tsx",
      lineNumber: 261,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/chat/BaseChat.tsx",
    lineNumber: 156,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Index() {
  return /* @__PURE__ */ jsxDEV4("div", { className: "home-page", children: /* @__PURE__ */ jsxDEV4("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV4(BaseChat, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 7,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { className: "features-sidebar", children: /* @__PURE__ */ jsxDEV4("div", { className: "preview-tag", children: /* @__PURE__ */ jsxDEV4("small", { children: "\u2728 Edit with Multiverse" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 10,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 9,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-U44L3LER.js", imports: ["/build/_shared/chunk-E7M3BA4B.js", "/build/_shared/chunk-SEO3TMGE.js", "/build/_shared/chunk-XWF3ZD7Y.js", "/build/_shared/chunk-KT3LPTEA.js", "/build/_shared/chunk-EP4XMMZI.js", "/build/_shared/chunk-SB75QH3H.js", "/build/_shared/chunk-XM7BYOO4.js", "/build/_shared/chunk-MVCI6HVQ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-NMGDY7UE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-T26MIHIV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.chat": { id: "routes/api.chat", parentId: "root", path: "api/chat", index: void 0, caseSensitive: void 0, module: "/build/routes/api.chat-5P2RKJZH.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "1f86a1cf", hmr: { runtime: "/build/_shared/chunk-XWF3ZD7Y.js", timestamp: 1763640378091 }, url: "/build/manifest-1F86A1CF.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.chat": {
    id: "routes/api.chat",
    parentId: "root",
    path: "api/chat",
    index: void 0,
    caseSensitive: void 0,
    module: api_chat_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
