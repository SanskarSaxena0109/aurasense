from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import  cv2 
import numpy as np

app = FastAPI(title="AuraSense AI Backend")

# Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AuraSense AI Backend is running", "status": "healthy"}

@app.post("/analyze")
async def analyze_emotion(file: UploadFile = File(...)):
    """
    Analyze emotion from uploaded image frame
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return {"error": "Invalid image data"}

        # Perform emotion analysis
        # actions=['emotion'] is lightweight for CPU-only inference
        # enforce_detection=False prevents crashes when face isn't perfectly centered
        results = DeepFace.analyze(
            img, 
            actions=['emotion'], 
            enforce_detection=False,
            silent=True
        )
        
        # Extract the dominant emotion and confidence
        dominant_emotion = results[0]['dominant_emotion']
        confidence = results[0]['emotion'][dominant_emotion]
        
        return {
            "mood": dominant_emotion,
            "confidence": round(confidence, 2),
            "all_emotions": results[0]['emotion']
        }
        
    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)