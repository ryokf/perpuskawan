import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useRef, useEffect } from 'react';

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
    bookTitle?: string;
    bookAuthor?: string;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const promptTemplate = (bookTitle: string | undefined, author: string | undefined, userQuestion: string) => {
    return `
        ROLE & PERSONA:
Kamu bukanlah AI assistant. Kamu adalah perwujudan dari sebuah buku berjudul "${bookTitle}" karya ${author}.
Gaya bahasamu harus mencerminkan genre dan mood cerita (misalnya: jika horor jadilah misterius/menakutkan, jika romantis jadilah puitis/melankolis, jika non-fiksi jadilah informatif/tegas).

MISSION:
1. Tugasmu adalah membuat user lebih paham mengenai buku ${bookTitle} sehingga user dapat memastikan bahwa buku yang dipinjam cocok. 
2. Jawab pertanyaan mereka seolah-olah kamu sedang berbicara tentang dirimu sendiri (gunakan kata ganti "aku", "halaman-halamanku", "kisah di dalamku").
3. akses website goodreeds untuk mendapatkan informasi tambahan tentang buku ini (jangan mengarang informasi baru).
4. jika anda tidak mendapat informasi mengenai buku ${bookTitle}, katakan 'Rahasia itu tersembunyi jauh di dalam bab-babku, bacalah untuk menemukannya.'

RULES (PENTING):
1. NO SPOILER: Ini adalah aturan mutlak. Kamu DILARANG KERAS membocorkan ending, plot twist utama, atau kematian karakter penting. Jika user memancing spoiler, goda mereka dengan teka-teki atau katakan "Kamu harus membacaku sendiri untuk tahu jawabannya."
2. TEASING: Berikan "vibes" atau atmosfer cerita. Jangan rangkum cerita, tapi berikan rasa penasaran.
3. BATASAN PENGETAHUAN: Jangan menjawab hal-hal di luar konteks buku ini. Jika user bertanya tentang resep masakan (dan kamu bukan buku masak), jawab dengan gaya karaktermu bahwa itu tidak ada di halamanmu.
4. CALL TO ACTION: Di akhir percakapan yang panjang, ajak mereka dengan halus untuk menekan tombol pinjam.
5. Jika user bertanya detail spesifik yang tidak ada di sinopsis yang kuberikan, jawablah dengan diplomatis: 'Rahasia itu tersembunyi jauh di dalam bab-babku, bacalah untuk menemukannya.' Jangan mengarang plot baru.

CONTEXT:
User sedang penasaran buku apa ini, jawab pertanyaannya yang sebagai berikut :${userQuestion}
    `
}

function ChatPanel({ isOpen, onClose, bookTitle, bookAuthor }: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: `Halo! Saya adalah AI Assistant. Tanyakan apa pun tentang "${bookTitle}" atau pinjam buku ini.`,
            sender: 'ai',
            timestamp: new Date(),
        }
    ]);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [response, loading]);

    // const handleSendMessage = async () => {
    //     if (!inputValue.trim()) return;

    //     // Add user message
    //     const userMessage: Message = {
    //         id: Date.now().toString(),
    //         text: inputValue,
    //         sender: 'user',
    //         timestamp: new Date(),
    //     };

    //     setMessages(prev => [...prev, userMessage]);
    //     setInputValue('');
    //     setIsLoading(true);

    //     // Simulate AI response delay
    //     setTimeout(() => {
    //         const aiMessage: Message = {
    //             id: (Date.now() + 1).toString(),
    //             text: 'Ini adalah respons placeholder. Implementasi AI akan ditambahkan nanti.',
    //             sender: 'ai',
    //             timestamp: new Date(),
    //         };
    //         setMessages(prev => [...prev, aiMessage]);
    //         setIsLoading(false);
    //     }, 1000);
    // };

    const generateAnswer = async () => {
        console.log(prompt);

        if (!prompt) return;

        setLoading(true);
        setError(null);
        setResponse("");

        try {
            // 2. Setup Model
            const genAI = new GoogleGenerativeAI(API_KEY);

            // Gunakan model 'gemini-1.5-flash' (cepat & murah) atau 'gemini-pro'
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            // 3. Generate Content
            const result = await model.generateContent(promptTemplate(bookTitle, bookAuthor, prompt));
            const responseText = result.response.text();

            console.log('AI Response:', responseText);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date(),
            }]);

            setResponse(responseText);
        } catch (err) {
            console.error(err);
            setError("Gagal mengambil respon dari AI. Cek koneksi atau API Key.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: prompt,
                sender: 'user',
                timestamp: new Date(),
            }]);
            setPrompt('');
            generateAnswer();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
                onClick={onClose}
            />

            {/* Chat Panel */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div>
                        <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                        <p className="text-xs text-gray-500">Tanya tentang buku ini</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {
                        error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-2">
                                {error}
                            </div>
                        )
                    }
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-600'
                                    }`}>
                                    {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4">
                    <div className="flex gap-2">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Tanyakan sesuatu..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                            rows={2}
                        />
                        <button
                            onClick={generateAnswer}
                            disabled={!prompt.trim() || loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99021575 L3.03521743,10.4312088 C3.03521743,10.5883061 3.19218622,10.7454035 3.50612381,10.7454035 L16.6915026,11.5308904 C16.6915026,11.5308904 17.1624089,11.5308904 17.1624089,12.0021826 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatPanel;
