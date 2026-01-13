import React, { useState } from 'react';

function SoilAnalysis() {
  // 1. State Variables (Empty strings by default)
  const [ph, setPh] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [boron, setBoron] = useState('');
  const [zinc, setZinc] = useState('');
  const [magnesium, setMagnesium] = useState('');
  const [iron, setIron] = useState('');

  const [result, setResult] = useState(null);

  const analyzeSoil = () => {
    // Check if EVERYTHING is empty (Oru value kooda illana mattum alert panlam)
    if (!ph && !nitrogen && !phosphorus && !potassium && !boron && !zinc && !magnesium && !iron) {
      alert("Please enter at least one value to analyze!");
      return;
    }

    // Helper function to safely parse numbers
    // Value irundha number aakum, illana NaN (Not a Number) nu return pannum
    const parseVal = (val) => val === '' ? NaN : parseFloat(val);

    const val = {
      ph: parseVal(ph),
      n: parseVal(nitrogen),
      p: parseVal(phosphorus),
      k: parseVal(potassium),
      b: parseVal(boron),
      zn: parseVal(zinc),
      mg: parseVal(magnesium),
      fe: parseVal(iron)
    };

    let cropRecommendation = "Enter pH level to get crop suggestions.";
    let fertilizerTip = [];

    // --- STEP 1: Crop Suggestion (Only if pH is provided) ---
    if (!isNaN(val.ph)) {
      if (val.ph < 5.5) {
        cropRecommendation = "🥔 Potato, Sweet Potato, Blueberries (Acidic Soil)";
      } else if (val.ph >= 5.5 && val.ph <= 7.0) {
        cropRecommendation = "🌾 Rice, Wheat, Corn, Tomato (Neutral Soil)";
      } else if (val.ph > 7.0) {
        cropRecommendation = "🥬 Spinach, Garlic, Onions, Beetroot (Alkaline Soil)";
      }
    }

    // --- STEP 2: Nutrient Logic (Only check if value exists) ---
    
    // Macro Nutrients
    if (!isNaN(val.n) && val.n < 50) fertilizerTip.push("⚠ Low Nitrogen: Add Urea or Compost.");
    if (!isNaN(val.p) && val.p < 20) fertilizerTip.push("⚠ Low Phosphorus: Add Superphosphate.");
    if (!isNaN(val.k) && val.k < 100) fertilizerTip.push("⚠ Low Potassium: Add Red Potash.");

    // Micro Nutrients
    if (!isNaN(val.b) && val.b < 0.5) fertilizerTip.push("🧪 Low Boron: Spray Borax (0.2%).");
    if (!isNaN(val.zn) && val.zn < 0.6) fertilizerTip.push("🧪 Low Zinc: Apply Zinc Sulphate.");
    if (!isNaN(val.mg) && val.mg < 10) fertilizerTip.push("🧪 Low Magnesium: Use Epsom Salt.");
    if (!isNaN(val.fe) && val.fe < 4.5) fertilizerTip.push("🧪 Low Iron: Apply Iron Chelate.");

    // If user entered values but everything is sufficient
    if (fertilizerTip.length === 0 && (!isNaN(val.n) || !isNaN(val.p) || !isNaN(val.k))) {
      fertilizerTip.push("✅ Based on provided data, nutrient levels look good!");
    } else if (fertilizerTip.length === 0) {
        fertilizerTip.push("ℹ Enter nutrient values to get fertilizer tips.");
    }

    setResult({
      crops: cropRecommendation,
      tips: fertilizerTip
    });
  };

  return (
    <div className="container">
      <h2>🌍 Flexible Soil Health Lab</h2>
      <p>Enter <strong>whatever values</strong> are available in your report:</p>
      
      {/* Grid Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '15px', 
        textAlign: 'left' 
      }}>
        
        {/* pH Level */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>pH Level</label>
          <input type="number" placeholder="Ex: 6.5" value={ph} onChange={(e) => setPh(e.target.value)}/>
        </div>

        {/* Nitrogen */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Nitrogen (N)</label>
          <input type="number" placeholder="Ex: 50" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)}/>
        </div>

        {/* Phosphorus */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Phosphorus (P)</label>
          <input type="number" placeholder="Ex: 25" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)}/>
        </div>

        {/* Potassium */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Potassium (K)</label>
          <input type="number" placeholder="Ex: 150" value={potassium} onChange={(e) => setPotassium(e.target.value)}/>
        </div>

        {/* Boron */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Boron (B)</label>
          <input type="number" placeholder="Ex: 0.5" value={boron} onChange={(e) => setBoron(e.target.value)}/>
        </div>

        {/* Zinc */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Zinc (Zn)</label>
          <input type="number" placeholder="Ex: 0.6" value={zinc} onChange={(e) => setZinc(e.target.value)}/>
        </div>

         {/* Magnesium */}
         <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Magnesium (Mg)</label>
          <input type="number" placeholder="Ex: 15" value={magnesium} onChange={(e) => setMagnesium(e.target.value)}/>
        </div>

        {/* Iron */}
        <div>
          <label style={{fontSize: '12px', fontWeight: 'bold'}}>Iron (Fe)</label>
          <input type="number" placeholder="Ex: 5.0" value={iron} onChange={(e) => setIron(e.target.value)}/>
        </div>

      </div>
      
      <button onClick={analyzeSoil} style={{marginTop: '20px'}}>Analyze Partial Data</button>

      {result && (
        <div className="result-box">
          <h3>🌱 Harvest Recommendation:</h3>
          <p style={{fontSize: '18px'}}>{result.crops}</p>
          
          <hr style={{borderColor: '#22c55e', opacity: 0.5}}/>
          
          <h3>💊 Treatment Plan:</h3>
          <ul style={{textAlign: 'left', listStyleType: 'none', padding: 0}}>
            {result.tips.map((tip, index) => (
              <li key={index} style={{padding: '5px 0', borderBottom: '1px dashed #aad5bb'}}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SoilAnalysis;