import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const App = () => {
  const webcamRef = useRef(null);
  const [mood, setMood] = useState('neutral');
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Mood to color mapping
  const moodColors = {
    happy: 'bg-yellow-100',
    sad: 'bg-blue-200',
    angry: 'bg-red-200',
    surprise: 'bg-purple-200',
    fear: 'bg-gray-300',
    disgust: 'bg-green-200',
    neutral: 'bg-gray-100'
  };

  // Mood to emoji mapping
  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprise: '😲',
    fear: '😨',
    disgust: '🤢',
    neutral: '😐'
  };

  const capture = async () => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert Base64 to Blob
      const blob = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();
      formData.append('file', blob, 'frame.jpg');

      // Send to backend
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000 // 10 second timeout
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMood(response.data.mood.toLowerCase());
        setConfidence(response.data.confidence);
      }
    } catch (err) {
      console.error("Analysis failed", err);
      setError("Failed to analyze emotion. Make sure the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Analyze every 2 seconds
    const interval = setInterval(capture, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${moodColors[mood] || 'bg-gray-100'}`}>
      <div className="max-w-4xl w-full px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            AuraSense AI
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time Emotion Analytics Dashboard
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Webcam Feed */}
          <div className="flex justify-center mb-6">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-xl max-w-full"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user"
              }}
            />
          </div>

          {/* Emotion Display */}
          <div className="text-center">
            <div className="mb-4">
              <span className="text-8xl">{moodEmojis[mood] || '😐'}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </h2>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="text-lg text-gray-600">
                Confidence: {confidence.toFixed(1)}%
              </div>
              {isAnalyzing && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
              )}
            </div>

            {/* Confidence Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Status Indicator */}
            <div className="mt-6 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Analysis Active
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Powered by DeepFace AI • Analyzing every 2 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;