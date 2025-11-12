// Función para mapear respuestas a Causa de Muerte Empresarial y Pilar P.U.D.E.R.
function identifyMainCauseAndPillar() {
    const data = {};
    
    // Recopilar todas las respuestas
    const questions = ['q1_1', 'q1_2', 'q1_3', 'q1_4', 'q1_5', 'q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6', 'q3_1', 'q3_2', 'q3_4', 'q4_1', 'q4_2', 'q4_3', 'q4_4', 'q4_5'];
    
    questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        data[q] = selected ? parseInt(selected.value) : 0;
    });
    
    // Mapeo de preguntas a Causas de Muerte Empresarial (CME)
    const cmeScores = {
        'CME1_PlanLargoPlazo': data.q1_1,
        'CME2_SerUnico': data.q1_5,
        'CME3_AdaptacionRoles': data.q1_2 + data.q1_3 + data.q1_4 + data.q2_3 + data.q3_1,
        'CME4_GestionFinanciera': data.q3_2 + data.q4_1,
        'CME5_Innovacion': data.q2_1
    };
    
    // Mapeo de preguntas a Pilares P.U.D.E.R.
    const pillarScores = {
        'P_Planear': data.q1_1,
        'U_Unico': data.q1_5,
        'D_Desarrollarse': data.q1_2 + data.q1_3 + data.q1_4 + data.q3_2 + data.q4_1 + data.q4_2,
        'E_Estandarizar': data.q3_1 + data.q2_4,
        'R_Repetir': data.q2_1
    };
    
    // Identificar CME principal (mayor puntuación)
    let mainCME = 'CME3_AdaptacionRoles';
    let maxCMEScore = cmeScores['CME3_AdaptacionRoles'];
    
    for (const [cme, score] of Object.entries(cmeScores)) {
        if (score > maxCMEScore) {
            maxCMEScore = score;
            mainCME = cme;
        }
    }
    
    // Identificar Pilar más débil (mayor puntuación = más débil)
    let weakestPillar = 'D_Desarrollarse';
    let maxPillarScore = pillarScores['D_Desarrollarse'];
    
    for (const [pillar, score] of Object.entries(pillarScores)) {
        if (score > maxPillarScore) {
            maxPillarScore = score;
            weakestPillar = pillar;
        }
    }
    
    // Mapeo de CME a nombres legibles
    const cmeNames = {
        'CME1_PlanLargoPlazo': 'Falta de Plan a Largo Plazo',
        'CME2_SerUnico': 'Falta de ser Único',
        'CME3_AdaptacionRoles': 'Falta de Adaptación al Cambio de Roles',
        'CME4_GestionFinanciera': 'Falta de Gestión Financiera',
        'CME5_Innovacion': 'Falta de Gestión de Innovación'
    };
    
    // Mapeo de Pilares a nombres legibles
    const pillarNames = {
        'P_Planear': 'Planear',
        'U_Unico': 'Único',
        'D_Desarrollarse': 'Desarrollarse',
        'E_Estandarizar': 'Estandarizar',
        'R_Repetir': 'Repetir'
    };
    
    return {
        mainCME: cmeNames[mainCME],
        weakestPillar: pillarNames[weakestPillar],
        cmeScores: cmeScores,
        pillarScores: pillarScores
    };
}

// Función para calcular el Costo del Caos
function calculateCostOfChaos() {
    const timeLostPercentage = parseInt(document.querySelector('input[name="q3_1"]:checked').value);
    const hourlyValue = parseFloat(document.querySelector('input[name="q3_2"]:checked').value);
    
    // Convertir porcentaje a horas semanales (40 horas base)
    const weeksPerMonth = 4.33;
    const monthlyHours = (timeLostPercentage / 100) * 40 * weeksPerMonth;
    const monthlyCost = Math.round(monthlyHours * hourlyValue);
    const yearlyCost = Math.round(monthlyCost * 12);
    
    return {
        monthlyCost: monthlyCost,
        yearlyCost: yearlyCost,
        monthlyHours: Math.round(monthlyHours),
        timeLostPercentage: timeLostPercentage
    };
}

// Función para guardar datos en localStorage y redirigir a results.html
function redirectToResults(results, costOfChaos, diagnosis) {
    const resultData = {
        totalScore: results.totalScore,
        category: results.category,
        monthlyLoss: results.monthlyLoss,
        yearlyLoss: results.yearlyLoss,
        mainCME: diagnosis.mainCME,
        weakestPillar: diagnosis.weakestPillar,
        monthlyCost: costOfChaos.monthlyCost,
        yearlyCost: costOfChaos.yearlyCost,
        monthlyHours: costOfChaos.monthlyHours,
        timeLostPercentage: costOfChaos.timeLostPercentage
    };
    
    localStorage.setItem('diagnosticResults', JSON.stringify(resultData));
    window.location.href = 'results.html';
}
