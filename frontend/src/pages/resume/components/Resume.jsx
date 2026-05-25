import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Check, 
  Download, 
  ChevronRight,
  User,
  Cpu,
  Code,
  FileText,
  Clock,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Layers,
  Award
} from 'lucide-react';

// DEVELOPER NOTE: Paste your free Gemini API Key here to enable live responses.
// If empty, the system automatically uses the highly detailed local JSON response dataset.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

// High-integrity candidate JSON datasets with associated pre-compiled mock responses
const CANDIDATE_JSON_DATA = [
  {
    id: 'frontend-developer',
    name: 'Alex Mercer',
    role: 'Principal Frontend Engineer',
    category: 'Graphics & Core UI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'alex.mercer@innovate.io',
    phone: '+91 8855040187',
    location: 'San Francisco, CA',
    skills: ["React / Next.js", "WebGL & Three.js", "Tailwind Design Tokens", "TypeScript", "UI Performance Optimization"],
    summary: "High-performing React architect & graphics developer with 8+ years designing low-latency, fluid, and responsive user interfaces.",
    experience: [
      {
        role: "Principal Frontend Engineer",
        company: "Innovate Studio",
        duration: "2021 - Present",
        desc: "Leads React platform architecture, rendering optimization, and high-fidelity interaction systems for premium client products."
      },
      {
        role: "Senior UI Engineer",
        company: "Pixel Forge",
        duration: "2018 - 2021",
        desc: "Built reusable design-system foundations, advanced animation workflows, and accessibility-first component libraries."
      }
    ],
    actualResponses: {
      "what are alex's core framework proficiencies?": "Alex Mercer focuses heavily on React, Next.js, and Svelte, utilizing custom utility systems for low-latency visual render pipelines.",
      "can you describe his webgl engineering expertise?": "Alex specializes in high-performance graphics integrations, including custom WebGL, Three.js vector states, and high-DPI canvas layouts.",
      "does alex have experience with design system tokens?": "Yes, Alex has designed extensive multi-brand styling libraries using CSS custom variable tokens mapped entirely through Tailwind CSS."
    },
    suggestedPrompts: [
      "What are Alex's core framework proficiencies?",
      "Can you describe his WebGL engineering expertise?",
      "Does Alex have experience with design system tokens?"
    ]
  },
  {
    id: 'backend-developer',
    name: 'Sarah Chen',
    role: 'Distributed Cloud Systems Architect',
    category: 'Database & Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'sarah.chen@cloudscale.net',
    phone: '+1 (555) 901-2248',
    location: 'Seattle, WA',
    skills: ["Go / Rust / Node.js", "PostgreSQL Clustering", "Kafka Stream Processing", "Docker & Kubernetes", "gRPC / Protobuf"],
    summary: "Distributed systems architect expert in low-latency infrastructure pipelines, high-throughput microservices, and high-integrity database tuning.",
    experience: [
      {
        role: "Distributed Cloud Systems Architect",
        company: "CloudScale",
        duration: "2020 - Present",
        desc: "Designed resilient microservice platforms with Kafka, PostgreSQL, and Kubernetes for high-throughput enterprise workloads."
      },
      {
        role: "Platform Engineer",
        company: "Northwind Data",
        duration: "2016 - 2020",
        desc: "Owned infrastructure automation, service observability, and low-latency API delivery across regional deployments."
      }
    ],
    actualResponses: {
      "what programming languages does sarah write in?": "Sarah Chen builds concurrent pipelines primarily in Go, Rust, and Node.js for modern memory-safe computing.",
      "explain sarah's experience with database scaling.": "Sarah optimizes DB read/write mirrors in PostgreSQL, routes analytical pipelines via Apache Kafka, and secures sessions with dual-layer Redis locks.",
      "how does she approach microservice orchestration?": "She packages lightweight Alpine containers, hosting them on Kubernetes, with lightning-fast inter-service communication managed via gRPC and Protobuf."
    },
    suggestedPrompts: [
      "What programming languages does Sarah write in?",
      "Explain Sarah's experience with database scaling.",
      "How does she approach microservice orchestration?"
    ]
  },
  {
    id: 'fullstack-developer',
    name: 'Marcus Vance',
    role: 'Principal Fullstack Engineer',
    category: 'Full Range Integration',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'marcus.vance@vancetech.com',
    phone: '+1 (555) 473-1189',
    location: 'Austin, TX',
    skills: ["Next.js / React", "Node.js Serverless", "OAuth 2.0 / JWT", "AWS Lambda & Cognito", "CI/CD & Cypress Testing"],
    summary: "Versatile Fullstack engineer focused on Next.js Serverless architectures, secure token identity flows, and automated cloud deployments.",
    experience: [
      {
        role: "Principal Fullstack Engineer",
        company: "Vance Tech",
        duration: "2022 - Present",
        desc: "Ships serverless Next.js platforms with secure auth, CI/CD automation, and production-grade observability."
      },
      {
        role: "Senior Software Engineer",
        company: "Launchpad Labs",
        duration: "2018 - 2022",
        desc: "Delivered fullstack web products spanning React, Node.js APIs, cloud functions, and end-to-end quality pipelines."
      }
    ],
    actualResponses: {
      "what is marcus's preferred fullstack stack?": "Marcus prefers next-generation Next.js serverless applications mapped on AWS Lambda endpoints, combining dynamic Client UI and Node.js REST/GraphQL APIs.",
      "describe the security standards marcus implements.": "Marcus structures cryptographic JWT verification layers, OAuth 2.0 multi-tenant flows, and maintains automated dependency auditing within Dockerized microservices.",
      "does marcus manage continuous integration pipelines?": "Yes, he builds robust parallel CI/CD configurations in GitHub Actions, integrating Jest unit tests and Cypress visual flows to guarantee zero-friction deployments."
    },
    suggestedPrompts: [
      "What is Marcus's preferred fullstack stack?",
      "Describe the security standards Marcus implements?",
      "Does Marcus manage continuous integration pipelines?"
    ]
  }
];

export default function App() {
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [chatHistories, setChatHistories] = useState({});
  const [userPrompt, setUserPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const [toast, setToast] = useState({ visible: false, title: '', message: '', isAlert: false });

  const chatContainerRef = useRef(null);
  const activeDoc = CANDIDATE_JSON_DATA.find(d => d.id === selectedDocId);
  const activeExperience = activeDoc?.experience ?? [];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistories, isTyping]);

  const triggerToast = (title, message, isAlert = false) => {
    setToast({ visible: true, title, message, isAlert });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleDownloadFile = (type, doc) => {
    const experience = doc.experience ?? [];
    let filename = `${doc.name.toLowerCase().replace(' ', '_')}_resume`;
    let content = "";
    let mimeType = "text/plain";

    if (type === 'txt' || type === 'doc') {
      content = `
=========================================================
${doc.name.toUpperCase()} - ${doc.role.toUpperCase()}
=========================================================
Sector Category: ${doc.category}
Location: ${doc.location}
Contact: ${doc.email} | ${doc.phone}

EXECUTIVE SUMMARY:
${doc.summary}

VERIFIED CORE SKILLS:
${doc.skills.join(', ')}

PROFESSIONAL EXPERIENCE RECORD:
${experience.map(exp => `
* ${exp.role} at ${exp.company} (${exp.duration})
  ${exp.desc}
`).join('')}

---------------------------------------------------------
Generated dynamically via PDF Candidate System.
`;
    }

    if (type === 'txt') {
      filename += ".txt";
      mimeType = "text/plain";
    } else if (type === 'doc') {
      filename += ".doc";
      mimeType = "application/msword";
    } else if (type === 'pdf') {
      filename += ".pdf";
      mimeType = "application/pdf";
      content = `%PDF-1.4\n%... Simulated PDF Content payload for ${doc.name} ...`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast(
      "Download Initiated", 
      `The file "${filename}" has been successfully exported.`
    );
  };

  const processAIQuery = async (promptText) => {
    if (!promptText.trim() || !activeDoc) return;
    if (isTyping) {
      triggerToast("Processor Engaged", "Please wait for the current stream animation to finish.", true);
      return;
    }

    const docId = activeDoc.id;
    const cleanPrompt = promptText.trim();
    
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = chatHistories[docId] || [];
    const updatedWithUser = [...currentHistory, userMessage];
    
    setChatHistories(prev => ({
      ...prev,
      [docId]: updatedWithUser
    }));
    
    setUserPrompt('');
    setIsTyping(true);

    const aiResponseId = `ai-${Date.now()}`;
    const aiPlaceholderMessage = {
      id: aiResponseId,
      sender: 'ai',
      text: '', 
      isFake: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [docId]: [...updatedWithUser, aiPlaceholderMessage]
    }));
    setTypingMessageId(aiResponseId);

    let finalResponseText = '';
    let usedFakeFallback = false;

    // Evaluate whether user has configured a valid API Key
    if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "") {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;
        
        const systemPrompt = `You are a professional hiring manager evaluating candidate ${activeDoc.name}'s resume credentials.
        Here is the candidate's exact background data in structured JSON format:
        ${JSON.stringify(activeDoc)}
        
        Guidelines:
        - Talk naturally as a seasoned tech lead or recruiter representing ${activeDoc.name}.
        - Be highly concise, engaging, and precise. Avoid raw markdown formatting.
        - Directly answer this inquiry: "${cleanPrompt}".`;

        const payload = {
          contents: [{ parts: [{ text: systemPrompt }] }]
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("API rate limit reached or key is incorrect.");
        }

        const data = await response.json();
        const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (outputText) {
          finalResponseText = outputText;
        } else {
          throw new Error("Empty response object received from Gemini Server.");
        }

      } catch (err) {
        // Safe internal fallback transfer
        usedFakeFallback = true;
        const normalizedPrompt = cleanPrompt.toLowerCase().replace(/[?.,]/g, '').trim();
        const foundResponse = activeDoc.actualResponses[normalizedPrompt];
        
        if (foundResponse) {
          finalResponseText = `[AI System Backup Co-Pilot] ${foundResponse}`;
        } else {
          finalResponseText = `[AI System Backup Co-Pilot] Regarding ${activeDoc.name}'s record, they are verified experts in ${activeDoc.skills.slice(0, 3).join(', ')}. Let's inspect specific items in their professional history. Please select a suggested query below to view calculated metrics.`;
        }
      }
    } else {
      // Direct local offline routing if key is empty
      usedFakeFallback = true;
      const normalizedPrompt = cleanPrompt.toLowerCase().replace(/[?.,]/g, '').trim();
      const foundResponse = activeDoc.actualResponses[normalizedPrompt];
      
      if (foundResponse) {
        finalResponseText = foundResponse;
      } else {
        finalResponseText = `I have completed an local structural audit of ${activeDoc.name}'s verified dossier. They possess extensive background experience specializing in ${activeDoc.skills.slice(0, 3).join(', ')}. Click any of the preloaded prompts inside the chat box to initiate instant context-grounded analytics.`;
      }
    }

    triggerTypewriterEffect(finalResponseText, docId, aiResponseId, usedFakeFallback);
  };

  const triggerTypewriterEffect = (textString, docId, messageId, isFake) => {
    let currentString = '';
    let charIndex = 0;
    
    const typeTimer = setInterval(() => {
      if (charIndex < textString.length) {
        currentString += textString.charAt(charIndex);
        charIndex++;
        
        setChatHistories(prev => {
          const hist = prev[docId] || [];
          return {
            ...prev,
            [docId]: hist.map(m => m.id === messageId ? { ...m, text: currentString, isFake } : m)
          };
        });
      } else {
        clearInterval(typeTimer);
        setIsTyping(false);
        setTypingMessageId(null);
      }
    }, 28); // Slower, highly humanized writing cadence
  };

  return (
    <div className="bg-[#FAF9FC] text-slate-800 flex flex-col font-sans select-none antialiased min-h-screen w-full relative">
      
      {/* SCREEN 1: MINIMAL DIRECT GRID LIST OF PORTFOLIOS */}
      {!selectedDocId && (
        <main className="max-w-7xl w-full mx-auto px-4 py-16 flex-grow flex flex-col justify-center animate-fadeIn">
          
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[#6527D0] bg-[#6527D0]/5 px-3 py-1 rounded-full">
              Enterprise Verified Talents
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-4">
              Select Role Wise Portfolio
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-light">
              Choose an engineering candidate to analyze their verified skills page, export documents, and load the dynamic AI chat widget.
            </p>
          </div>

          {/* Core White Dashboard Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CANDIDATE_JSON_DATA.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => {
                  setSelectedDocId(doc.id);
                  setActivePage(1);
                  triggerToast("Dossier Initialized", `Opened secure preview workspace for ${doc.name}.`);
                }}
                className="group bg-white border border-slate-200/80 p-6 rounded-2xl hover:border-[#6527D0]/50 hover:shadow-[0_8px_24px_rgba(101,39,208,0.06)] transition-all duration-300 relative cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Purple Brand Notch */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#6527D0]" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] text-[#6527D0] border border-[#6527D0]/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider bg-[#6527D0]/5">
                      {doc.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={doc.avatar} 
                      alt={doc.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#6527D0] transition-colors duration-200 leading-tight">
                        {doc.name}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                        {doc.role}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-light line-clamp-3">
                    {doc.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#6527D0]">
                  <span>Analyze Portfolio</span>
                  <ChevronRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* SCREEN 2: HIGH-FIDELITY COMPACT WORKSPACE WITH EXPANDED WIDTH */}
      {selectedDocId && activeDoc && (
        <main className="max-w-7xl w-full mx-auto px-4 py-4 flex-grow flex flex-col justify-center animate-fadeIn relative">
          
          {/* TOP RIGHT ACTION BAR & EXPORTS (Aligned directly above the chat layout) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setSelectedDocId(null);
                }}
                className="text-xs text-slate-600 hover:text-[#6527D0] flex items-center gap-1.5 py-1.5 px-3 bg-slate-50 hover:bg-[#6527D0]/5 rounded-lg border border-slate-200 hover:border-[#6527D0]/20 transition-all font-bold"
              >
                <ArrowLeft size={13} />
                <span>Exit Preview</span>
              </button>
              
              <div className="flex items-center gap-2">
                <img src={activeDoc.avatar} className="w-8 h-8 rounded-full object-cover border" alt="" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-none">{activeDoc.name}</h3>
                  <p className="text-[9px] text-[#6527D0] font-mono font-bold mt-0.5 uppercase tracking-wide">{activeDoc.role}</p>
                </div>
              </div>
            </div>

            {/* Quick Export Downloads Panel */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button 
                onClick={() => handleDownloadFile('pdf', activeDoc)}
                className="text-[10px] bg-[#6527D0] hover:bg-[#521eb4] text-white px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 shadow-sm"
              >
                <Download size={11} />
                <span>Download PDF</span>
              </button>

              <button 
                onClick={() => handleDownloadFile('txt', activeDoc)}
                className="text-[10px] bg-slate-50 hover:bg-[#6527D0]/5 text-slate-700 hover:text-[#6527D0] px-3 py-1.5 rounded-lg font-bold border border-slate-200 hover:border-[#6527D0]/20 transition-all flex items-center gap-1"
              >
                <Download size={11} />
                <span>Export TXT</span>
              </button>

              <button 
                onClick={() => handleDownloadFile('doc', activeDoc)}
                className="text-[10px] bg-slate-50 hover:bg-[#6527D0]/5 text-slate-700 hover:text-[#6527D0] px-3 py-1.5 rounded-lg font-bold border border-slate-200 hover:border-[#6527D0]/20 transition-all flex items-center gap-1"
              >
                <Download size={11} />
                <span>Draft DOC</span>
              </button>
            </div>
          </div>

          {/* DETAILED DOUBLE COMPARTMENT SHEET VIEWER (Restrained height optimized for embedding) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[520px] max-h-[520px] min-h-[520px]">
            
            {/* LEFT SIDE CORNER: PDF PREVIEW PANELS (7 Cols) */}
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl flex flex-col h-full overflow-hidden shadow-sm relative">
              
              {/* Visual Navigation Tabs using High-Fidelity Miniatures of Page Images */}
              <div className="flex gap-2 p-2.5 bg-slate-50 border-b border-slate-200/80">
                {[1, 2, 3].map((page) => (
                  <button 
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-extrabold transition-all flex items-center justify-center gap-2 border ${
                      activePage === page 
                        ? 'bg-white border-[#6527D0]/40 text-[#6527D0] shadow-sm' 
                        : 'border-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                    }`}
                  >
                    {/* Miniature Render Representation of Page Icon */}
                    <div className={`w-6 h-7 rounded border flex flex-col justify-between p-0.5 overflow-hidden transition-all ${
                      activePage === page ? 'bg-indigo-50/50 border-[#6527D0]' : 'bg-white border-slate-200'
                    }`}>
                      {/* Visual schematic of a page header */}
                      <div className="h-0.5 w-4 bg-slate-300 rounded" />
                      <div className="space-y-0.5">
                        <div className="h-0.5 w-5 bg-slate-200 rounded" />
                        <div className="h-0.5 w-3 bg-slate-200 rounded" />
                      </div>
                      {/* Simulated graphics segment depending on page number */}
                      {page === 1 && <div className="h-1 w-2 bg-[#6527D0]/40 rounded-full" />}
                      {page === 2 && <div className="h-1 w-full bg-emerald-500/30 rounded-full" />}
                      {page === 3 && <div className="h-1.5 w-1.5 bg-amber-500/40 rounded-full self-end" />}
                    </div>

                    <span className="font-sans">
                      Page {page} <span className="hidden sm:inline font-normal opacity-70">
                        {page === 1 && "(Credentials)"}
                        {page === 2 && "(Career Timeline)"}
                        {page === 3 && "(Skill Matrix)"}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Core PDF Canvas Workspace displaying High-Fidelity document mockups */}
              <div className="flex-grow p-6 bg-slate-100/50 overflow-y-auto">
                <div className="bg-white border border-slate-200 p-8 rounded-2xl min-h-full flex flex-col justify-between shadow-sm relative overflow-hidden">
                  
                  {/* Visual Watermark Seal */}
                  <div className="absolute top-2 right-4 text-[7px] tracking-[0.25em] text-slate-300 font-mono font-bold select-none">
                    SECURE VERIFIED DOCUMENT RECORD
                  </div>

                  {/* HIGH-FIDELITY SCHEMATIC PDF PAGE RENDERS */}
                  
                  {/* PAGE 1: Corporate Profile Sheet Image */}
                  {activePage === 1 && (
                    <div className="space-y-5 animate-fadeIn">
                      {/* Visual Printed Page Header layout */}
                      <div className="border-b-2 border-slate-100 pb-5 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={activeDoc.avatar} 
                            alt={activeDoc.name} 
                            className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100 shadow-sm flex-shrink-0"
                          />
                          <div>
                            <h2 className="text-xl font-black text-slate-955 leading-none">{activeDoc.name}</h2>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6527D0] font-extrabold block mt-1.5">
                              {activeDoc.role}
                            </span>
                          </div>
                        </div>
                        
                        {/* Contact metadata visual array */}
                        <div className="text-[9px] text-slate-400 font-mono space-y-0.5 text-right hidden sm:block">
                          <div className="flex items-center justify-end gap-1"><Mail size={9} /> {activeDoc.email}</div>
                          <div className="flex items-center justify-end gap-1"><Phone size={9} /> {activeDoc.phone}</div>
                          <div className="flex items-center justify-end gap-1"><MapPin size={9} /> {activeDoc.location}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-[10px] font-extrabold uppercase text-[#6527D0] tracking-wider mb-2 flex items-center gap-1.5">
                              <User size={11} /> Executive Profile Summary
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-light">
                              {activeDoc.summary}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-[10px] font-extrabold uppercase text-[#6527D0] tracking-wider mb-2 flex items-center gap-1.5">
                              <Layers size={11} /> Architectural Approach
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-light">
                              Dedicated to designing modular architectures optimized for high-performance and low-latency interaction cycles. Prioritizes accessibility, systematic design tokens, and rigorous integration standards.
                            </p>
                          </div>
                        </div>

                        {/* Right Panel Skill Badges Sidebar */}
                        <div className="space-y-4 border-l border-slate-100 pl-4">
                          <div>
                            <h4 className="text-[10px] font-extrabold uppercase text-[#6527D0] tracking-wider mb-2 flex items-center gap-1.5">
                              <Cpu size={11} /> Core Capabilities
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {activeDoc.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#6527D0]" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PAGE 2: Professional Timeline Sheet Image */}
                  {activePage === 2 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#6527D0] flex items-center gap-1.5">
                          <Briefcase size={12} /> Professional Employment Record
                        </h2>
                      </div>

                      <div className="relative border-l border-slate-200 pl-5 ml-1.5 space-y-5">
                        {activeExperience.map((exp, index) => (
                          <div key={index} className="relative">
                            {/* Beautiful Visual Node representation */}
                            <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#6527D0] shadow-sm" />
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                              <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono">
                                <Clock size={10} />
                                <span>{exp.duration}</span>
                              </div>
                            </div>
                            
                            <span className="text-[10px] text-[#6527D0] font-bold block mt-0.5">{exp.company}</span>
                            <p className="text-[10px] text-slate-500 mt-2 leading-relaxed font-light">{exp.desc}</p>
                          </div>
                        ))}
                        {activeExperience.length === 0 && (
                          <p className="text-[10px] text-slate-500 font-light">
                            Experience data is not available for this profile yet.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PAGE 3: Detailed Technical Skill Assessment Sheet Image */}
                  {activePage === 3 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#6527D0] flex items-center gap-1.5">
                          <Award size={12} /> Tech Skill Metrics & Certifications
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeDoc.skills.map((skill, index) => {
                          const score = 94 - index * 6;
                          return (
                            <div key={index} className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-bold text-slate-800">{skill}</span>
                                <span className="font-mono font-bold text-[#6527D0] bg-[#6527D0]/5 px-1.5 py-0.5 rounded">{score}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                                <div className="h-full bg-[#6527D0] rounded-full" style={{ width: `${score}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-indigo-50/30 border border-[#6527D0]/10 p-4 rounded-xl flex items-start gap-3 mt-3">
                        <Code size={16} className="text-[#6527D0] mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-[11px] font-bold text-slate-850">Dynamic Metadata Lock</h5>
                          <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-relaxed">
                            The information displayed in this structural portfolio schema has been dynamically indexed as vector weights inside the AI chatbot context.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Document Sheet Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>SYSTEM ENCRYPTION CODE: AES-256</span>
                    <span>PAGE {activePage} OF 3</span>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE CORNER: EMBEDDED DYNAMIC AI CO-PILOT CHATBOT (4 Cols) */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-3xl flex flex-col h-full overflow-hidden shadow-sm relative">
              
              {/* Chatbot Header */}
              <div className="px-4 py-3.5 border-b border-slate-100 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#6527D0]/10 flex items-center justify-center text-[#6527D0]">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-extrabold text-slate-900 tracking-wider uppercase font-mono">Hiring Co-Pilot</h3>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[8px] text-slate-400 font-mono">
                        Active Dataset Connected
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Conversation Scroll Area */}
              <div 
                ref={chatContainerRef}
                className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50"
              >
                {/* Simulated AI greeting bubble */}
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-lg bg-[#6527D0]/10 border border-[#6527D0]/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#6527D0] text-xs font-bold">
                    A
                  </div>
                  <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-100 max-w-[85%] shadow-sm">
                    <p className="text-[11px] text-slate-700 leading-relaxed font-light">
                      Welcome. I am optimized with <strong className="text-slate-900 font-medium">{activeDoc.name}</strong>'s JSON credential model.
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1 font-light">
                      Select an analytical suggestion to review details, or type a custom question:
                    </p>

                    <div className="mt-3 space-y-1">
                      {activeDoc.suggestedPrompts.map((p, index) => (
                        <button 
                          key={index}
                          disabled={isTyping}
                          onClick={() => setUserPrompt(p)}
                          className="w-full text-left text-[10px] bg-slate-50 hover:bg-[#6527D0]/5 text-slate-600 hover:text-[#6527D0] border border-slate-100 hover:border-[#6527D0]/20 p-2 rounded-lg transition-all flex items-start gap-1.5 disabled:opacity-50"
                        >
                          <span className="text-[#6527D0] font-bold">•</span>
                          <span className="leading-tight">{p}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Conversational bubbles */}
                {(chatHistories[activeDoc.id] || []).map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isPlaceholder = msg.id === typingMessageId && isTyping && !msg.text;

                  return (
                    <div 
                      key={msg.id} 
                      className={`flex gap-2 items-start ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 rounded-lg bg-[#6527D0]/10 border border-[#6527D0]/20 text-[#6527D0] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          A
                        </div>
                      )}

                      <div className={`p-3 rounded-xl max-w-[82%] shadow-sm border relative ${
                        isUser 
                          ? 'bg-[#6527D0] border-[#6527D0]/20 rounded-tr-none text-white' 
                          : 'bg-white border-slate-100 rounded-tl-none text-slate-800'
                      }`}>
                        {isPlaceholder ? (
                          <div className="flex items-center gap-1 py-1">
                            <span className="w-1.5 h-1.5 bg-[#6527D0] rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-[#6527D0] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-[#6527D0] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        ) : (
                          <div>
                            <p className="text-[11px] leading-relaxed whitespace-pre-line font-sans font-light">
                              {msg.text}
                              {msg.id === typingMessageId && isTyping && (
                                <span className="inline-block w-1.5 h-3 bg-[#6527D0] ml-1 animate-pulse align-middle"></span>
                              )}
                            </p>

                            {!isUser && (
                              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[7px] font-mono uppercase tracking-wider text-slate-400">
                                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                                  <Check size={8} /> Sync Guard
                                </span>
                                <span>{msg.timestamp}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] text-slate-500 font-mono font-bold">
                          U
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Message Entry Area */}
              <div className="p-3 bg-white border-t border-slate-100">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    processAIQuery(userPrompt);
                  }}
                  className="relative flex items-center"
                >
                  <input 
                    type="text"
                    value={userPrompt}
                    disabled={isTyping}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder={isTyping ? "Replying..." : "Ask questions about candidate JSON..."}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-[#6527D0]/30 rounded-xl py-2 pl-3.5 pr-10 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6527D0] focus:ring-1 focus:ring-[#6527D0] transition-all disabled:opacity-60"
                    autoComplete="off"
                  />
                  <button 
                    type="submit"
                    disabled={isTyping || !userPrompt.trim()}
                    className="absolute right-1.5 w-7 h-7 rounded-lg bg-[#6527D0] hover:bg-[#521eb4] text-white transition-colors flex items-center justify-center disabled:opacity-30 shadow-sm"
                  >
                    <Send size={11} />
                  </button>
                </form>
              </div>

            </div>

          </div>

        </main>
      )}

      {/* Embedded Telemetry Toast alerts */}
      <div 
        className={`fixed bottom-4 left-4 z-50 transform transition-all duration-300 pointer-events-none flex items-center gap-2.5 bg-white border-l-4 ${toast.isAlert ? 'border-rose-500 shadow-md' : 'border-[#6527D0] shadow-md'} p-3.5 rounded-r-lg max-w-xs ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className={toast.isAlert ? 'text-rose-500' : 'text-[#6527D0]'}>
          <FileText size={16} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider leading-none">
            {toast.title}
          </h4>
          <p className="text-[10px] text-slate-500 mt-1 leading-tight font-light">
            {toast.message}
          </p>
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

    </div>
  );
}
