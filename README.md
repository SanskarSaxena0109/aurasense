# AuraSense AI - Real-time Emotion Analytics Dashboard

A web-based emotion analytics dashboard that processes facial gestures locally using AI.

## 🎯 Features

- **Real-time Emotion Detection**: Analyzes emotions every 2 seconds
- **7 Emotion Categories**: Happy, Sad, Angry, Surprise, Fear, Disgust, Neutral
- **Dynamic UI**: Background color changes based on detected mood
- **Confidence Scores**: Visual confidence bar and percentage
- **Local Processing**: All analysis happens on your machine
- **CPU-Optimized**: Works without GPU using DeepFace

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- react-webcam (camera access)
- Axios (API calls)

**Backend:**
- FastAPI (high performance)
- DeepFace (pre-trained emotion models)
- OpenCV (image processing)
- TensorFlow/Keras

## 📁 Project Structure

```
AuraSense/
├── backend/
│   ├── main.py              # FastAPI server
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js          # Main React component
    │   ├── index.js        # Entry point
    │   └── index.css       # Tailwind styles
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Webcam

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend will start at `http://localhost:8000`

**Verify backend is running:**
Visit `http://localhost:8000` in your browser - you should see:
```json
{"message": "AuraSense AI Backend is running", "status": "healthy"}
```

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install npm dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 🎮 Usage

1. **Grant Camera Permission**: When prompted, allow the browser to access your webcam
2. **Position Yourself**: Make sure your face is visible in the webcam feed
3. **Watch the Magic**: The app will automatically analyze your emotions every 2 seconds
4. **See Results**: 
   - Dominant emotion displayed with emoji
   - Confidence percentage and bar
   - Background color changes based on mood

## 🎨 Mood Color Scheme

- **Happy** 😊: Yellow background
- **Sad** 😢: Blue background
- **Angry** 😠: Red background
- **Surprise** 😲: Purple background
- **Fear** 😨: Gray background
- **Disgust** 🤢: Green background
- **Neutral** 😐: Light gray background

## ⚙️ Technical Details

### Backend API Endpoints

**GET /** - Health check
```json
{
  "message": "AuraSense AI Backend is running",
  "status": "healthy"
}
```

**POST /analyze** - Analyze emotion from image
- **Input**: multipart/form-data with image file
- **Output**:
```json
{
  "mood": "happy",
  "confidence": 92.5,
  "all_emotions": {
    "angry": 0.1,
    "disgust": 0.05,
    "fear": 0.2,
    "happy": 92.5,
    "sad": 1.8,
    "surprise": 3.2,
    "neutral": 2.15
  }
}
```

### Performance Optimizations

1. **enforce_detection=False**: Prevents crashes when face isn't perfectly centered
2. **actions=['emotion']**: Only analyzes emotion (not age, gender, race) for speed
3. **Single worker**: Prevents RAM overload on 16GB systems
4. **2-second interval**: Balances real-time feel with CPU usage

### System Requirements

- **CPU**: Intel i7 or equivalent (GPU not required)
- **RAM**: 16GB recommended
- **Webcam**: Any USB or integrated webcam
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed: `python --version`
- Check if port 8000 is available
- Try installing dependencies one by one if bulk install fails

### Frontend can't connect to backend
- Verify backend is running at `http://localhost:8000`
- Check browser console for CORS errors
- Ensure no firewall is blocking localhost connections

### Webcam not working
- Grant camera permissions in browser settings
- Check if another app is using the webcam
- Try a different browser

### Low accuracy
- Ensure good lighting
- Face the camera directly
- Keep your face in the center of the frame
- Avoid extreme angles

### High CPU usage
- Increase the analysis interval (change 2000ms to 3000ms or 4000ms in App.js)
- Close other resource-intensive applications

## 🔒 Privacy & Security

- **100% Local**: All processing happens on your machine
- **No Cloud**: No images are sent to external servers
- **No Storage**: Images are analyzed in real-time and immediately discarded
- **Open Source**: You can audit the entire codebase

## 📝 Customization

### Change Analysis Frequency
Edit `frontend/src/App.js`:
```javascript
const interval = setInterval(capture, 3000); // Change 2000 to 3000 for 3 seconds
```

### Modify Mood Colors
Edit the `moodColors` object in `App.js`:
```javascript
const moodColors = {
  happy: 'bg-yellow-100', // Change to any Tailwind color
  // ...
};
```

### Add More Emotions
DeepFace supports: angry, disgust, fear, happy, sad, surprise, neutral

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **DeepFace**: For the amazing pre-trained models
- **FastAPI**: For the blazing-fast backend framework
- **React**: For the powerful frontend library
- **Tailwind CSS**: For the beautiful styling utilities

## 📧 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the console logs (browser and terminal)
3. Ensure all dependencies are correctly installed

---

**Built with ❤️ for real-time emotion analytics**