// ========================================================================
// DIAGNÓSTICO INTEGRAL - MÉTODO P.U.D.E.R.
// VERSIÓN ACTUALIZADA CON QUICK WINS Y PROYECCIONES
// ========================================================================

// Variable global para almacenar respuestas
let diagnosticData = {};

// ========================================================================
// QUICK WINS PERSONALIZADOS POR DIMENSIÓN
// ========================================================================
const quickWinActions = {
    'Organización y Planificación': {
        action: 'Documenta TUS 3 procesos críticos esta semana usando la regla QQMC (Qué hace, Quién lo hace, Cuándo, Cómo se hace). Empieza por los que SOLO TÚ sabes hacer.',
        impact: 'Recuperarás entre 8-12 horas/mes al poder delegar con claridad',
        warning: 'Documentar es solo el 15% del camino. Sistematizar, optimizar y delegar efectivamente requiere estrategia completa.',
        pillar: 'ESTANDARIZAR'
    },
    'Captación de Clientes': {
        action: 'Calcula tu CAC (Costo de Adquisición de Cliente) REAL. Divide TODO lo que gastas en marketing y ventas del mes pasado entre los clientes nuevos que cerraste.',
        impact: 'Sabrás si estás ganando o perdiendo dinero en cada venta nueva',
        warning: 'Conocer el número es solo el 10%. Optimizar tu embudo de ventas para reducir el CAC y aumentar conversión requiere metodología probada.',
        pillar: 'REPETIR'
    },
    'Satisfacción de Clientes': {
        action: 'Implementa HOY una encuesta NPS de 2 preguntas a tus últimos 10 clientes: "Del 0-10, ¿nos recomendarías?" y "¿Por qué?"',
        impact: 'Descubrirás las 3 razones por las que te eligen (o te abandonan)',
        warning: 'Medir satisfacción es el primer paso. Crear sistemas que GARANTICEN excelencia consistente requiere transformación cultural.',
        pillar: 'ÚNICO'
    },
    'Fidelización de Clientes': {
        action: 'Crea una lista de tus 20 mejores clientes y contacta a 5 esta semana solo para preguntarles: "¿Cómo podemos servirte mejor?"',
        impact: 'Recuperarás relación con clientes de alto valor y descubrirás oportunidades de venta adicional',
        warning: 'El contacto ocasional genera buenos momentos. Un programa estructurado de fidelización genera clientes de por vida.',
        pillar: 'REPETIR'
    },
    'Gestión Económica': {
        action: 'Calcula el margen de contribución REAL de tus 3 productos/servicios principales. Resta TODOS los costos directos del precio de venta.',
        impact: 'Descubrirás si estás subsidiando productos no rentables con tu esfuerzo',
        warning: 'Saber cuánto ganas es básico. Diseñar arquitectura de rentabilidad sostenible requiere visión financiera estratégica.',
        pillar: 'PLANEAR'
    },
    'Gestión Financiera': {
        action: 'Proyecta tu flujo de caja para los próximos 90 días: ingresos esperados vs gastos comprometidos. Identifica los "huecos".',
        impact: 'Dormirás tranquilo sabiendo qué necesitas vender para cubrir obligaciones',
        warning: 'Proyectar 90 días evita sorpresas. Construir salud financiera de 12-24 meses requiere arquitectura completa.',
        pillar: 'PLANEAR'
    },
    'Liderazgo': {
        action: 'Agenda una reunión 1-a-1 de 30 minutos esta semana con cada miembro clave de tu equipo. Pregunta: "¿Qué necesitas de mí para tener éxito?"',
        impact: 'Descubrirás obstáculos ocultos y construirás confianza real',
        warning: 'Las conversaciones 1-a-1 abren puertas. Desarrollar liderazgo transformacional que inspire excelencia requiere método.',
        pillar: 'DESARROLLARSE'
    },
    'Comunicación': {
        action: 'Implementa una reunión semanal de 15 minutos con tu equipo clave: 3 victorias, 3 desafíos, 3 prioridades para la semana.',
        impact: 'Alinearás al equipo y reducirás malentendidos en un 50%',
        warning: 'Reuniones semanales crean ritmo. Construir cultura de comunicación radical y transparencia total requiere transformación.',
        pillar: 'DESARROLLARSE'
    },
    'Balance Personal': {
        action: 'Bloquea 2 horas ESTA SEMANA en tu calendario (sin interrupciones) solo para trabajo estratégico. Apaga notificaciones y avisa que no estás disponible.',
        impact: 'Recuperarás claridad mental y tomarás al menos una decisión importante que venías postergando',
        warning: 'Dos horas de estrategia son un respiro. Recuperar tu vida completa mientras creces tu empresa requiere rediseño sistémico.',
        pillar: 'PLANEAR'
    }
};

// ========================================================================
// FUNCIÓN PRINCIPAL: Proceder al formulario de contacto
// ========================================================================
function proceedToContactForm() {
    console.log('📝 Iniciando validación del diagnóstico...');
    
    const radioQuestions = [
        'q1_1', 'q1_2', 'q1_3', 'q1_4', 'q1_5',
        'q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6',
        'q3_1', 'q3_2', 'q3_3', 'q3_4', 'q3_5',
        'q4_1', 'q4_2', 'q4_3', 'q4_4', 'q4_5',
        'q5_1', 'q5_2', 'q5_3', 'q5_4', 'q5_5', 'q5_6', 'q5_7', 'q5_8', 'q5_9'
    ];
    
    let allAnswered = true;
    let firstUnanswered = null;
    
    for (let q of radioQuestions) {
        if (!document.querySelector(`input[name="${q}"]:checked`)) {
            allAnswered = false;
            if (!firstUnanswered) firstUnanswered = q;
        }
    }

    if (!allAnswered) {
        alert(`⚠️ Por favor, responde todas las preguntas antes de continuar.\n\nPrimera pregunta sin responder: ${firstUnanswered}`);
        
        const element = document.querySelector(`input[name="${firstUnanswered}"]`);
        if (element) {
            element.closest('.question').scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.closest('.question').style.background = '#ffe6e6';
            setTimeout(() => {
                element.closest('.question').style.background = '#f8f9fa';
            }, 2000);
        }
        return;
    }

    console.log('✅ Todas las preguntas respondidas');
    
    diagnosticData = collectDiagnosticData();
    console.log('💾 Datos recopilados:', diagnosticData);

    document.getElementById('diagnostic-form').style.display = 'none';
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
}

// ========================================================================
// RECOPILAR DATOS DEL DIAGNÓSTICO
// ========================================================================
function collectDiagnosticData() {
    const data = {};
    
    const radioQuestions = [
        'q1_1', 'q1_2', 'q1_3', 'q1_4', 'q1_5',
        'q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6',
        'q3_1', 'q3_2', 'q3_3', 'q3_4', 'q3_5',
        'q4_1', 'q4_2', 'q4_3', 'q4_4', 'q4_5',
        'q5_1', 'q5_2', 'q5_3', 'q5_4', 'q5_5', 'q5_6', 'q5_7', 'q5_8', 'q5_9'
    ];
    
    radioQuestions.forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        data[q] = selected ? parseFloat(selected.value) : 0;
    });

    return data;
}

// ========================================================================
// CALCULAR RESULTADOS POR DIMENSIÓN
// ========================================================================
function calculateResults() {
    const data = diagnosticData;
    
    const organizacion = {
        score: data.q1_1 + data.q1_2 + data.q1_3 + data.q1_4 + data.q1_5,
        maxScore: 25,
        weight: 0.20,
        name: 'Organización y Planificación'
    };
    
    const captacion = {
        score: data.q2_1 + data.q2_2,
        maxScore: 10,
        weight: 0.10,
        name: 'Captación de Clientes'
    };
    
    const satisfaccion = {
        score: data.q2_3 + data.q2_4,
        maxScore: 10,
        weight: 0.08,
        name: 'Satisfacción de Clientes'
    };
    
    const fidelizacion = {
        score: data.q2_5 + data.q2_6,
        maxScore: 10,
        weight: 0.07,
        name: 'Fidelización de Clientes'
    };
    
    const gestionEconomica = {
        score: data.q3_1 + data.q3_2 + data.q3_4,
        maxScore: 15,
        weight: 0.10,
        name: 'Gestión Económica'
    };
    
    const gestionFinanciera = {
        score: data.q3_3 + data.q3_5,
        maxScore: 10,
        weight: 0.10,
        name: 'Gestión Financiera'
    };
    
    const liderazgo = {
        score: data.q4_1 + data.q4_2 + data.q4_5,
        maxScore: 15,
        weight: 0.12,
        name: 'Liderazgo'
    };
    
    const comunicacion = {
        score: data.q4_3 + data.q4_4,
        maxScore: 10,
        weight: 0.08,
        name: 'Comunicación'
    };
    
    const costoPersonal = {
        score: data.q5_1 + data.q5_2 + data.q5_6,
        maxScore: 15,
        weight: 0.15,
        name: 'Balance Personal'
    };
    
    const dimensions = [
        organizacion, captacion, satisfaccion, fidelizacion,
        gestionEconomica, gestionFinanciera, liderazgo, 
        comunicacion, costoPersonal
    ];
    
    let totalScore = 0;
    dimensions.forEach(dim => {
        const percentage = (dim.score / dim.maxScore);
        totalScore += percentage * dim.weight * 150;
    });
    
    totalScore = Math.round(totalScore);
    
    const weaknesses = dimensions
        .map(dim => ({
            name: dim.name,
            percentage: Math.round((dim.score / dim.maxScore) * 100),
            score: dim.score,
            maxScore: dim.maxScore
        }))
        .sort((a, b) => a.percentage - b.percentage);
    
    const weakestDimension = weaknesses[0];
    const secondWeakest = weaknesses[1];
    const thirdWeakest = weaknesses[2];
    
    // Calcular costos
    const timeLostPercentage = data.q5_3;
    const hourlyValue = data.q5_4;
    const durationYears = data.q5_5;
    
    const hoursPerWeek = 40;
    const weeksPerMonth = 4.33;
    
    let monthlyHoursLost = Math.round((timeLostPercentage / 100) * hoursPerWeek * weeksPerMonth);
    const yearlyHoursLost = Math.round((timeLostPercentage / 100) * hoursPerWeek * 52);
    
    let costMultiplier = 1.0;
    
    if (totalScore <= 45) {
        costMultiplier = 2.0 + (totalScore / 45) * 0.5;
    } else if (totalScore <= 80) {
        costMultiplier = 0.8 + ((totalScore - 45) / 35) * 0.4;
    } else {
        costMultiplier = 1.2 + ((totalScore - 80) / 70) * 0.8;
    }
    
    monthlyHoursLost = Math.round(monthlyHoursLost * costMultiplier);
    
    const monthlyLoss = Math.round(monthlyHoursLost * hourlyValue);
    const yearlyLoss = Math.round(yearlyHoursLost * hourlyValue * costMultiplier);
    const accumulatedLoss = Math.round(yearlyLoss * durationYears);
    
    // PROYECCIONES FUTURAS
    const projection6Months = Math.round(monthlyLoss * 6);
    const projection12Months = Math.round(yearlyLoss);
    const projection24Months = Math.round(yearlyLoss * 2);
    
    const lonelinessIndex = data.q4_1 + data.q4_5;
    const urgencyIndex = data.q5_7;
    const investmentCapacity = data.q5_8;
    const supportIndex = data.q5_9;
    
    let category = '';
    let categoryDescription = '';
    
    if (totalScore <= 30) {
        category = 'LÍDER ESTRATÉGICO CONSOLIDADO';
        categoryDescription = 'Tu empresa es un Motor de Crecimiento. Tienes sistemas sólidos y balance vida-trabajo.';
    } else if (totalScore <= 65) {
        category = 'EMPRESARIO EN EVOLUCIÓN';
        categoryDescription = 'Estás en el camino correcto pero hay áreas críticas que necesitan atención urgente.';
    } else if (totalScore <= 100) {
        category = 'CRISIS DE CRECIMIENTO ACTIVA';
        categoryDescription = 'Tu empresa consume tu vida. Necesitas transformación sistémica AHORA.';
    } else {
        category = 'EMPRESARIO EN CRISIS SEVERA';
        categoryDescription = 'Situación crítica. Estás al borde del colapso personal y empresarial.';
    }
    
    let mainCME = '';
    
    if (organizacion.score >= 15) {
        mainCME = 'Falta de Sistemas y Dependencia Total del Dueño';
    } else if (captacion.score >= 7 || fidelizacion.score >= 7) {
        mainCME = 'Motor Comercial Débil - Falta de Clientes Sostenible';
    } else if (gestionEconomica.score >= 10 || gestionFinanciera.score >= 7) {
        mainCME = 'Caos Financiero y Económico';
    } else if (liderazgo.score >= 10 || comunicacion.score >= 7) {
        mainCME = 'Falta de Liderazgo y Comunicación Efectiva';
    } else {
        mainCME = 'Agotamiento y Pérdida de Balance Vida-Trabajo';
    }
    
    const pilares = {
        'P_Planear': data.q1_3,
        'U_Unico': data.q1_5,
        'D_Desarrollarse': data.q1_4 + data.q4_1 + data.q4_2,
        'E_Estandarizar': data.q1_2 + data.q2_4,
        'R_Repetir': data.q2_1 + data.q2_5 + data.q2_6
    };
    
    let weakestPillar = 'D_Desarrollarse';
    let maxPillarScore = pilares['D_Desarrollarse'];
    
    for (const [pillar, score] of Object.entries(pilares)) {
        if (score > maxPillarScore) {
            maxPillarScore = score;
            weakestPillar = pillar;
        }
    }
    
    const pillarNames = {
        'P_Planear': 'Planear',
        'U_Unico': 'Único',
        'D_Desarrollarse': 'Desarrollarse',
        'E_Estandarizar': 'Estandarizar',
        'R_Repetir': 'Repetir'
    };
    
    // OBTENER QUICK WIN PARA LA DIMENSIÓN MÁS DÉBIL
    const quickWin = quickWinActions[weakestDimension.name] || {
        action: 'Agenda una sesión estratégica para identificar tu acción de mayor impacto',
        impact: 'Claridad sobre por dónde empezar',
        warning: 'La transformación real requiere estrategia completa.',
        pillar: 'PLANEAR'
    };
    
    return {
        totalScore: totalScore,
        category: category,
        categoryDescription: categoryDescription,
        weakestDimension: weakestDimension,
        secondWeakest: secondWeakest,
        thirdWeakest: thirdWeakest,
        allDimensions: weaknesses,
        mainCME: mainCME,
        weakestPillar: pillarNames[weakestPillar],
        
        // Costos económicos
        timeLostPercentage: timeLostPercentage,
        hourlyValue: hourlyValue,
        monthlyHoursLost: monthlyHoursLost,
        yearlyHoursLost: yearlyHoursLost,
        monthlyLoss: monthlyLoss,
        yearlyLoss: yearlyLoss,
        accumulatedLoss: accumulatedLoss,
        durationYears: durationYears,
        
        // PROYECCIONES FUTURAS
        projection6Months: projection6Months,
        projection12Months: projection12Months,
        projection24Months: projection24Months,
        
        // QUICK WIN
        quickWinAction: quickWin.action,
        quickWinImpact: quickWin.impact,
        quickWinWarning: quickWin.warning,
        quickWinPillar: quickWin.pillar,
        
        // Índices especiales
        lonelinessIndex: lonelinessIndex,
        urgencyIndex: urgencyIndex,
        investmentCapacity: investmentCapacity,
        supportIndex: supportIndex,
        
        isHighPriority: totalScore > 65 && urgencyIndex >= 3 && investmentCapacity >= 3,
        isMediumPriority: totalScore > 45 && totalScore <= 65,
        isLowPriority: totalScore <= 45
    };
}

// ========================================================================
// ENVIAR Y MOSTRAR RESULTADOS
// ========================================================================
function submitAndShowResults() {
    console.log('🎯 Iniciando submitAndShowResults()');
    
    const fullName = document.getElementById('fullName').value.trim();
    const company = document.getElementById('company').value.trim();
    const position = document.getElementById('position').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const yearsLeader = document.getElementById('yearsLeader').value;
    const employees = document.getElementById('employees').value;

    if (!fullName || !company || !position || !email || !phone || !yearsLeader || !employees) {
        alert('Por favor, completa todos los campos para continuar.');
        return;
    }

    if (!email.includes('@')) {
        alert('Por favor, ingresa un email válido.');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const loadingMsg = document.getElementById('loadingMsg');
    submitBtn.disabled = true;
    loadingMsg.style.display = 'block';
    loadingMsg.textContent = 'Procesando tu diagnóstico...';

    console.log('📊 Calculando resultados...');

    const results = calculateResults();
    console.log('✅ Resultados:', results);

    const resultData = {
        fullName: fullName,
        company: company,
        email: email,
        
        totalScore: results.totalScore,
        category: results.category,
        categoryDescription: results.categoryDescription,
        mainCME: results.mainCME,
        weakestPillar: results.weakestPillar,
        
        weakestDimension: results.weakestDimension,
        secondWeakest: results.secondWeakest,
        thirdWeakest: results.thirdWeakest,
        allDimensions: results.allDimensions,
        
        timeLostPercentage: results.timeLostPercentage,
        hourlyValue: results.hourlyValue,
        monthlyHoursLost: results.monthlyHoursLost,
        monthlyLoss: results.monthlyLoss,
        yearlyLoss: results.yearlyLoss,
        accumulatedLoss: results.accumulatedLoss,
        durationYears: results.durationYears,
        
        projection6Months: results.projection6Months,
        projection12Months: results.projection12Months,
        projection24Months: results.projection24Months,
        
        quickWinAction: results.quickWinAction,
        quickWinImpact: results.quickWinImpact,
        quickWinWarning: results.quickWinWarning,
        quickWinPillar: results.quickWinPillar,
        
        lonelinessIndex: results.lonelinessIndex,
        urgencyIndex: results.urgencyIndex,
        investmentCapacity: results.investmentCapacity,
        supportIndex: results.supportIndex,
        
        isHighPriority: results.isHighPriority,
        isMediumPriority: results.isMediumPriority
    };
    
    console.log('💾 Guardando en localStorage:', resultData);
    localStorage.setItem('diagnosticResults', JSON.stringify(resultData));
    console.log('✅ Guardado verificado');

    const sheetData = {
        timestamp: new Date().toISOString(),
        fullName: fullName,
        company: company,
        position: position,
        email: email,
        phone: phone,
        yearsLeader: yearsLeader,
        employees: employees,
        
        totalScore: results.totalScore,
        category: results.category,
        mainCME: results.mainCME,
        weakestPillar: results.weakestPillar,
        weakestDimension: results.weakestDimension.name,
        
        monthlyLoss: results.monthlyLoss,
        yearlyLoss: results.yearlyLoss,
        accumulatedLoss: results.accumulatedLoss,
        
        priority: results.isHighPriority ? 'HIGH' : (results.isMediumPriority ? 'MEDIUM' : 'LOW'),
        urgencyIndex: results.urgencyIndex,
        investmentCapacity: results.investmentCapacity,
        
        ...diagnosticData
    };

    console.log('📤 Enviando a Google Sheets...');
    sendToGoogleAppsScript(sheetData);
    
    loadingMsg.textContent = 'Redirigiendo a tus resultados...';
    setTimeout(() => {
        console.log('🔄 Redirigiendo...');
        
        let resultsPage = 'results-rescue.html';
        
        if (results.totalScore <= 45) {
            resultsPage = 'results-peak.html';
            console.log('📊 Segmento: PEAK (Empresario Consolidado)');
        } else if (results.totalScore <= 80) {
            resultsPage = 'results-growth.html';
            console.log('📊 Segmento: GROWTH (Oportunidad de Crecimiento)');
        } else {
            console.log('📊 Segmento: RESCUE (Rescate Estratégico)');
        }
        
        window.location.href = resultsPage;
    }, 1000);
}

// ========================================================================
// ENVIAR A GOOGLE APPS SCRIPT
// ========================================================================
function sendToGoogleAppsScript(sheetData) {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwKhvadGq6WxlBNTdMPehTYZiz8x1I6uiEiFRqdf4sfe1jhDnv-rDMdjgBI6yYrWnwrpA/exec';
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sheetData)
    }).then(() => console.log('✅ Datos enviados y email en camino'))
      .catch(e => console.error('❌ Error:', e));
}

function updateProgress() {
    // Función para mostrar progreso visual
}
