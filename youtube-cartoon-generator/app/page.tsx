'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [script, setScript] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('cartoon');
  const [selectedVoice, setSelectedVoice] = useState('friendly');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cartoonStyles = [
    { id: 'cartoon', name: 'Classic Cartoon', emoji: '🎨' },
    { id: 'anime', name: 'Anime Style', emoji: '⚡' },
    { id: 'pixar', name: 'Pixar 3D', emoji: '🎬' },
    { id: 'comic', name: 'Comic Book', emoji: '💥' },
  ];

  const voiceStyles = [
    { id: 'friendly', name: 'Friendly Narrator' },
    { id: 'energetic', name: 'Energetic Host' },
    { id: 'professional', name: 'Professional Voice' },
    { id: 'kid', name: 'Kid-Friendly' },
  ];

  const generateVideo = async () => {
    if (!script.trim()) {
      alert('Please enter a script for your video!');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setVideoUrl('');

    // Simulate video generation process
    const totalSteps = 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Generate animation on canvas
    setTimeout(() => {
      generateAnimation();
    }, 1000);

    // Simulate completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsGenerating(false);

      // Create a blob URL for the generated video
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
          }
        });
      }
    }, 5000);
  };

  const generateAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const maxFrames = 120;

    const animate = () => {
      if (frame >= maxFrames) return;

      // Clear canvas
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#bae6fd');
      gradient.addColorStop(1, '#7dd3fc');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated character
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const bounce = Math.sin(frame * 0.1) * 20;

      // Character body
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(centerX, centerY + bounce, 60, 0, Math.PI * 2);
      ctx.fill();

      // Character eyes
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.arc(centerX - 20, centerY - 10 + bounce, 8, 0, Math.PI * 2);
      ctx.arc(centerX + 20, centerY - 10 + bounce, 8, 0, Math.PI * 2);
      ctx.fill();

      // Character smile
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY + 10 + bounce, 25, 0, Math.PI);
      ctx.stroke();

      // Arms
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(centerX - 60, centerY + 20 + bounce);
      ctx.lineTo(centerX - 90, centerY + Math.sin(frame * 0.2) * 30 + bounce);
      ctx.moveTo(centerX + 60, centerY + 20 + bounce);
      ctx.lineTo(centerX + 90, centerY + Math.sin(frame * 0.2 + Math.PI) * 30 + bounce);
      ctx.stroke();

      // Add text with script preview
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      const words = script.split(' ');
      const wordIndex = Math.floor((frame / maxFrames) * words.length);
      const displayText = words.slice(0, wordIndex + 1).join(' ');

      // Word wrapping
      const maxWidth = canvas.width - 40;
      const words2 = displayText.split(' ');
      let line = '';
      let y = canvas.height - 100;

      for (let n = 0; n < Math.min(words2.length, 15); n++) {
        const testLine = line + words2[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, centerX, y);
          line = words2[n] + ' ';
          y += 30;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, centerX, y);

      // Add sparkles
      for (let i = 0; i < 5; i++) {
        const sparkleX = centerX + Math.cos(frame * 0.1 + i) * 120;
        const sparkleY = centerY + Math.sin(frame * 0.1 + i) * 120;
        const sparkleSize = Math.abs(Math.sin(frame * 0.2 + i)) * 5;

        ctx.fillStyle = '#fcd34d';
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  };

  const downloadVideo = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'youtube-cartoon-animation.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎬 YouTube AI Cartoon Animation Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Create engaging animated videos for YouTube with AI-powered cartoon animations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Video Script
              </label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter your video script here... Tell a story, explain a concept, or create an entertaining narrative!"
                className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎨 Animation Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {cartoonStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedStyle === style.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-3xl mb-1">{style.emoji}</div>
                    <div className="text-sm font-medium">{style.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎤 Voice Style
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              >
                {voiceStyles.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateVideo}
              disabled={isGenerating || !script.trim()}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all ${
                isGenerating || !script.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:scale-105'
              }`}
            >
              {isGenerating ? '🎬 Generating Animation...' : '✨ Generate Video'}
            </button>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎥 Animation Preview
            </h2>

            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden aspect-video mb-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-full object-contain"
              />

              {!isGenerating && !videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-lg font-medium">Your animation will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {videoUrl && (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-green-800 font-medium flex items-center gap-2">
                    <span>✅</span>
                    <span>Animation generated successfully!</span>
                  </p>
                </div>

                <button
                  onClick={downloadVideo}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  📥 Download Animation
                </button>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-900 mb-2">📊 Video Details:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Style: {cartoonStyles.find(s => s.id === selectedStyle)?.name}</li>
                    <li>• Voice: {voiceStyles.find(v => v.id === selectedVoice)?.name}</li>
                    <li>• Duration: ~{Math.ceil(script.split(' ').length / 3)} seconds</li>
                    <li>• Format: Animated Canvas (800x600)</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-2">💡 Pro Tips:</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Keep scripts short and engaging (50-200 words)</li>
                <li>• Use simple, clear language</li>
                <li>• Include a hook in the first few seconds</li>
                <li>• Add emojis for extra engagement 🎉</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Created with Next.js, React & Canvas API • Perfect for YouTube content creators 🚀</p>
        </div>
      </div>
    </div>
  );
}
