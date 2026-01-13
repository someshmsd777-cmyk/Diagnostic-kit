import React, { useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [mode, setMode] = useState(null);
  
  const webcamRef = useRef(null);

  // --- CAMERA LOGIC ---
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  // --- UPLOAD LOGIC ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setDiagnosis(null);
    }
  };

  const resetScan = () => {
    setImage(null);
    setDiagnosis(null);
    setMode(null);
  };

  // --- ANALYZE LOGIC (Updated with Shopping Links) ---
  const scanLeaf = () => {
    if (!image) return alert("Please capture or upload an image first!");
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // MOCK DATABASE WITH PRODUCTS & LINKS
      const mockResults = [
        { 
          name: "Early Blight (Fungus)", 
          cure: "Apply Fungicide (Mancozeb) every 7 days.",
          product: "Mancozeb M-45 Fungicide",
          link: "https://www.amazon.in/s?k=mancozeb+fungicide"
        },
        { 
          name: "Yellow Leaf Curl Virus", 
          cure: "Control whiteflies using sticky traps.",
          product: "Yellow Sticky Traps (Pack of 10)",
          link: "https://www.amazon.in/s?k=yellow+sticky+traps+for+plants"
        },
        { 
          name: "Bacterial Spot", 
          cure: "Use Copper-based bactericides spray.",
          product: "Blitox Copper Fungicide",
          link: "https://www.amazon.in/s?k=copper+fungicide+for+plants"
        },
        { 
          name: "Healthy Leaf", 
          cure: "No action needed. Keep watering regularly.",
          product: "Organic Seaweed Fertilizer (Growth Booster)",
          link: "https://www.amazon.in/s?k=organic+liquid+fertilizer"
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDiagnosis(randomResult);
    }, 2000);
  };

  return (
    <div className="container">
      <h2>🍃 Dr. Leaf: Disease Detector</h2>
      <p>Choose how you want to analyze the leaf:</p>

      {/* Mode Selection */}
      {!image && !mode && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <button onClick={() => setMode('camera')} style={{ background: '#0284c7' }}>
            📷 Open Camera
          </button>
          <button onClick={() => setMode('upload')} style={{ background: '#d97706' }}>
            📂 Upload File
          </button>
        </div>
      )}

      {/* Camera View */}
      {mode === 'camera' && !image && (
        <div className="camera-box">
           <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="webcam-view" />
          <button onClick={capture}>📸 Capture Photo</button>
          <button onClick={() => setMode(null)} style={{background: '#64748b', marginTop: '5px'}}>Cancel</button>
        </div>
      )}

      {/* Upload View */}
      {mode === 'upload' && !image && (
        <div className="upload-box">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={() => setMode(null)} style={{background: '#64748b'}}>Cancel</button>
        </div>
      )}

      {/* Preview */}
      {image && (
        <div>
          <h3>Preview:</h3>
          <img src={image} alt="Leaf Preview" className="preview" />
          <br />
          {!diagnosis && (
            <div style={{display: 'flex', gap: '10px'}}>
               <button onClick={scanLeaf} disabled={loading}>
                {loading ? "Scanning AI..." : "🔍 Analyze Leaf"}
              </button>
              <button onClick={resetScan} style={{background: '#ef4444'}}>
                ❌ Retake
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- UPDATED RESULTS SECTION --- */}
      {diagnosis && (
        <div className="result-box" style={{ borderColor: diagnosis.name.includes("Healthy") ? "green" : "red" }}>
          <h3>🔍 Diagnosis: {diagnosis.name}</h3>
          <p><strong>💊 Suggested Cure:</strong> {diagnosis.cure}</p>
          
          {/* Shopping Card */}
          <div className="product-card">
            <h4>🛍 Recommended Product:</h4>
            <p style={{fontWeight: 'bold', color: '#333'}}>{diagnosis.product}</p>
            
            <a href={diagnosis.link} target="_blank" rel="noopener noreferrer" className="buy-btn">
              🛒 Buy on Amazon
            </a>
          </div>

          <button onClick={resetScan} style={{marginTop: '15px', background: '#334155'}}>Check Another Leaf</button>
        </div>
      )}
    </div>
  );
}

export default DiseaseDetection;