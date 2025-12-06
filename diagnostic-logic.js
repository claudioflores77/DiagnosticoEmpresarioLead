// ========================================================================
// DIAGNÓSTICO INTEGRAL - MÉTODO P.U.D.E.R.
// 9 Dimensiones Empresariales + 8 Creencias para Conversión
// ========================================================================

// Variable global para almacenar respuestas
let diagnosticData = {};

// ========================================================================
// FUNCIÓN PRINCIPAL: Proceder al formulario de contacto
// ========================================================================
function proceedToContactForm() {
    console.log('📝 Iniciando validación del diagnóstico...');
    
    // Lista de todas las preguntas obligatorias
    const radioQuestions = [
        // Sección 1: Organización y Planificación
        'q1_1', 'q1_2', 'q1_3', 'q1_4', 'q1_5',
        // Sección 2: Motor Comercial
        'q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6',
        // Sección 3: Gestión Económica y Financiera
        'q3_1', 'q3_2', 'q3_3', 'q3_4', 'q3_5',
        // Sección 4: Liderazgo y Comunicación
        'q4_1', 'q4_2', 'q4_3', 'q4_4', 'q4_5',
        // Sección 5: Costo Personal
        'q5_1', 'q5_2', 'q5_3', 'q5_4', 'q5_5', 'q5_6', 'q5_7', 'q5_8', 'q5_9'
    ];
    
    let allAnswered = true;
    let firstUnanswered = null;
    
    // Validar que todas las preguntas estén respondidas
    for (let q of radioQuestions) {
        if (!document.querySelector(`input[name="${q}"]:checked`)) {
            allAnswered = false;
            if (!firstUnanswered) firstUnanswered = q;
        }
    }

    if (!allAnswered) {
        alert(`⚠️ Por favor, responde todas las preguntas antes de continuar.\n\nPrimera pregunta sin responder: ${firstUnanswered}`);
        
        // Scroll a la pregunta faltante
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
    
    // Recopilar datos del diagnóstico
    diagnosticData = collectDiagnosticData();
    console.log('💾 Datos recopilados:', diagnosticData);

    // Ocultar formulario de diagnóstico y mostrar formulario de contacto
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
    
    // ============================================================
    // DIMENSIÓN 1: ORGANIZACIÓN Y PLANIFICACIÓN (20%)
    // ============================================================
    const organizacion = {
        score: data.q1_1 + data.q1_2 + data.q1_3 + data.q1_4 + data.q1_5,
        maxScore: 25,
        weight: 0.20,
        name: 'Organización y Planificación'
    };
    
    // ============================================================
    // DIMENSIÓN 2: CAPTACIÓN DE CLIENTES (10%)
    // ============================================================
    const captacion = {
        score: data.q2_1 + data.q2_2,
        maxScore: 10,
        weight: 0.10,
        name: 'Captación de Clientes'
    };
    
    // ============================================================
    // DIMENSIÓN 3: SATISFACCIÓN DE CLIENTES (8%)
    // ============================================================
    const satisfaccion = {
        score: data.q2_3 + data.q2_4,
        maxScore: 10,
        weight: 0.08,
        name: 'Satisfacción de Clientes'
    };
    
    // ============================================================
    // DIMENSIÓN 4: FIDELIZACIÓN DE CLIENTES (7%)
    // ============================================================
    const fidelizacion = {
        score: data.q2_5 + data.q2_6,
        maxScore: 10,
        weight: 0.07,
        name: 'Fidelización de Clientes'
    };
    
    // ============================================================
    // DIMENSIÓN 5: GESTIÓN ECONÓMICA (10%)
    // ============================================================
    const gestionEconomica = {
        score: data.q3_1 + data.q3_2 + data.q3_4,
        maxScore: 15,
        weight: 0.10,
        name: 'Gestión Económica'
    };
    
    // ============================================================
    // DIMENSIÓN 6: GESTIÓN FINANCIERA (10%)
    // ============================================================
    const gestionFinanciera = {
        score: data.q3_3 + data.q3_5,
        maxScore: 10,
        weight: 0.10,
        name: 'Gestión Financiera'
    };
    
    // ============================================================
    // DIMENSIÓN 7: LIDERAZGO (12%)
    // ============================================================
    const liderazgo = {
        score: data.q4_1 + data.q4_2 + data.q4_5,
        maxScore: 15,
        weight: 0.12,
        name: 'Liderazgo'
    };
    
    // ============================================================
    // DIMENSIÓN 8: COMUNICACIÓN (8%)
    // ============================================================
    const comunicacion = {
        score: data.q4_3 + data.q4_4,
        maxScore: 10,
        weight: 0.08,
        name: 'Comunicación'
    };
    
    // ============================================================
    // DIMENSIÓN 9: COSTO PERSONAL (15%)
    // ============================================================
    const costoPersonal = {
        score: data.q5_1 + data.q5_2 + data.q5_6,
        maxScore: 15,
        weight: 0.15,
        name: 'Balance Personal'
    };
    
    // ============================================================
    // CALCULAR SCORE TOTAL PONDERADO
    // ============================================================
    const dimensions = [
        organizacion, captacion, satisfaccion, fidelizacion,
        gestionEconomica, gestionFinanciera, liderazgo, 
        comunicacion, costoPersonal
    ];
    
    let totalScore = 0;
    dimensions.forEach(dim => {
        const percentage = (dim.score / dim.maxScore);
        totalScore += percentage * dim.weight * 150; // Normalizado a 150 puntos
    });
    
    totalScore = Math.round(totalScore);
    
    // ============================================================
    // IDENTIFICAR DIMENSIONES MÁS DÉBILES
    // ============================================================
    const weaknesses = dimensions
        .map(dim => ({
            name: dim.name,
            percentage: Math.round((dim.score / dim.maxScore) * 100),
            score: dim.score,
            maxScore: dim.maxScore
        }))
        .sort((a, b) => b.percentage - a.percentage);
    
    const weakestDimension = weaknesses[weaknesses.length - 1];
    const secondWeakest = weaknesses[weaknesses.length - 2];
    
    // ============================================================
    // CALCULAR COSTO ECONÓMICO (COHERENTE CON SCORE)
    // ============================================================
    const timeLostPercentage = data.q5_3; // Porcentaje de tiempo perdido
    const hourlyValue = data.q5_4; // Valor por hora
    const durationYears = data.q5_5; // Años en esta situación
    
    // Cálculos de tiempo y dinero
    const hoursPerWeek = 40;
    const weeksPerMonth = 4.33;
    const monthsPerYear = 12;
    
    // Calcular horas perdidas base
    let monthlyHoursLost = Math.round((timeLostPercentage / 100) * hoursPerWeek * weeksPerMonth);
    const yearlyHoursLost = Math.round((timeLostPercentage / 100) * hoursPerWeek * 52);
    
    // AJUSTAR costos según score para coherencia
    // LOW (0-45): Multiplica por 0.5-0.8 (oportunidad, no crisis)
    // MEDIUM (45-80): Multiplica por 0.8-1.2 (ineficiencia real)
    // HIGH (80-150): Multiplica por 1.2-2.0 (crisis severa)
    let costMultiplier = 1.0;
    
    if (totalScore <= 45) {
        // LOW: Empresarios consolidados - "oportunidad de optimización"
        costMultiplier = 0.5 + (totalScore / 45) * 0.3; // 0.5 a 0.8
    } else if (totalScore <= 80) {
        // MEDIUM: En crecimiento - ineficiencias reales
        costMultiplier = 0.8 + ((totalScore - 45) / 35) * 0.4; // 0.8 a 1.2
    } else {
        // HIGH: Crisis - pérdidas exponenciales
        costMultiplier = 1.2 + ((totalScore - 80) / 70) * 0.8; // 1.2 a 2.0
    }
    
    // Aplicar multiplicador
    monthlyHoursLost = Math.round(monthlyHoursLost * costMultiplier);
    
    const monthlyLoss = Math.round(monthlyHoursLost * hourlyValue);
    const yearlyLoss = Math.round(yearlyHoursLost * hourlyValue * costMultiplier);
    const accumulatedLoss = Math.round(yearlyLoss * durationYears);
    
    // ============================================================
    // ÍNDICES ESPECIALES
    // ============================================================
    const lonelinessIndex = data.q4_1 + data.q4_5; // Soledad del líder
    const urgencyIndex = data.q5_7; // Urgencia de cambio
    const investmentCapacity = data.q5_8; // Capacidad de inversión
    const supportIndex = data.q5_9; // Apoyo del entorno
    
    // ============================================================
    // DETERMINAR CATEGORÍA
    // ============================================================
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
    
    // ============================================================
    // IDENTIFICAR CAUSA DE MUERTE EMPRESARIAL PRINCIPAL
    // ============================================================
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
    
    // ============================================================
    // IDENTIFICAR PILAR P.U.D.E.R. MÁS DÉBIL
    // ============================================================
    const pilares = {
        'P_Planear': data.q1_3, // Planificación
        'U_Unico': data.q1_5, // Ser único
        'D_Desarrollarse': data.q1_4 + data.q4_1 + data.q4_2, // Liderazgo y equipo
        'E_Estandarizar': data.q1_2 + data.q2_4, // Sistemas y procesos
        'R_Repetir': data.q2_1 + data.q2_5 + data.q2_6 // Marketing y fidelización
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
    
    // ============================================================
    // RETORNAR TODOS LOS RESULTADOS
    // ============================================================
    return {
        totalScore: totalScore,
        category: category,
        categoryDescription: categoryDescription,
        weakestDimension: weakestDimension,
        secondWeakest: secondWeakest,
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
        
        // Índices especiales
        lonelinessIndex: lonelinessIndex,
        urgencyIndex: urgencyIndex,
        investmentCapacity: investmentCapacity,
        supportIndex: supportIndex,
        
        // Para segmentación de seguimiento
        isHighPriority: totalScore > 65 && urgencyIndex >= 3 && investmentCapacity >= 3,
        isMediumPriority: totalScore > 45 && totalScore <= 65,
        isLowPriority: totalScore <= 45
    };
}

// ========================================================================
// ENVIAR Y MOSTRAR RESULTADOS
// ========================================================================
async function submitAndShowResults() {
    console.log('🎯 Iniciando submitAndShowResults()');
    
    // Validar campos del formulario
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

    // Deshabilitar botón y mostrar loading
    const submitBtn = document.getElementById('submitBtn');
    const loadingMsg = document.getElementById('loadingMsg');
    submitBtn.disabled = true;
    loadingMsg.style.display = 'block';
    loadingMsg.textContent = 'Procesando tu diagnóstico...';

    try {
        console.log('📊 Calculando resultados...');

        // Calcular todos los resultados
        const results = calculateResults();
        console.log('✅ Resultados:', results);

        // ============================================================
        // GUARDAR EN LOCALSTORAGE
        // ============================================================
        const resultData = {
            // Datos básicos
            fullName: fullName,
            company: company,
            email: email,

            // Resultados principales
            totalScore: results.totalScore,
            category: results.category,
            categoryDescription: results.categoryDescription,
            mainCME: results.mainCME,
            weakestPillar: results.weakestPillar,

            // Dimensiones
            weakestDimension: results.weakestDimension,
            secondWeakest: results.secondWeakest,
            allDimensions: results.allDimensions,

            // Costos
            timeLostPercentage: results.timeLostPercentage,
            hourlyValue: results.hourlyValue,
            monthlyHoursLost: results.monthlyHoursLost,
            monthlyLoss: results.monthlyLoss,
            yearlyLoss: results.yearlyLoss,
            accumulatedLoss: results.accumulatedLoss,
            durationYears: results.durationYears,

            // Índices
            lonelinessIndex: results.lonelinessIndex,
            urgencyIndex: results.urgencyIndex,
            investmentCapacity: results.investmentCapacity,
            supportIndex: results.supportIndex,

            // Prioridad
            isHighPriority: results.isHighPriority,
            isMediumPriority: results.isMediumPriority
        };
        
        console.log('💾 Guardando en localStorage:', resultData);
        localStorage.setItem('diagnosticResults', JSON.stringify(resultData));
        console.log('✅ Guardado verificado');

        // ============================================================
        // PREPARAR DATOS PARA GOOGLE SHEETS
        // ============================================================
        const sheetData = {
            timestamp: new Date().toISOString(),
            fullName: fullName,
            company: company,
            position: position,
            email: email,
            phone: phone,
            yearsLeader: yearsLeader,
            employees: employees,

            // Resultados
            totalScore: results.totalScore,
            category: results.category,
            mainCME: results.mainCME,
            weakestPillar: results.weakestPillar,
            weakestDimension: results.weakestDimension.name,

            // Costos
            monthlyLoss: results.monthlyLoss,
            yearlyLoss: results.yearlyLoss,
            accumulatedLoss: results.accumulatedLoss,

            // Prioridad para seguimiento
            priority: results.isHighPriority ? 'HIGH' : (results.isMediumPriority ? 'MEDIUM' : 'LOW'),
            urgencyIndex: results.urgencyIndex,
            investmentCapacity: results.investmentCapacity,

            // Todas las respuestas
            ...diagnosticData
        };

        // ============================================================
        // ENVIAR A GOOGLE APPS SCRIPT (Y ESPERAR RESPUESTA)
        // ============================================================
        console.log('📤 Enviando a Google Sheets...');
        loadingMsg.textContent = 'Guardando tu información de forma segura...';
        
        const success = await sendToGoogleAppsScript(sheetData);

        if (success) {
            console.log('✅ Envío exitoso. Redirigiendo...');

            // ============================================================
            // REDIRIGIR A RESULTADOS SEGÚN SEGMENTO
            // ============================================================
            loadingMsg.textContent = 'Redirigiendo a tus resultados...';

            // Determinar template según score
            let resultsPage = 'results-rescue.html'; // Default: HIGH

            if (results.totalScore <= 45) {
                resultsPage = 'results-peak.html'; // LOW: Aspiracional
                console.log('📊 Segmento: PEAK (Empresario Consolidado)');
            } else if (results.totalScore <= 80) {
                resultsPage = 'results-growth.html'; // MEDIUM: Estratégico
                console.log('📊 Segmento: GROWTH (Oportunidad de Crecimiento)');
            } else {
                console.log('📊 Segmento: RESCUE (Rescate Estratégico)');
            }

            window.location.href = resultsPage;

        } else {
            throw new Error('El servidor no pudo guardar los datos.');
        }

    } catch (error) {
        console.error('❌ Error en el proceso de envío:', error);
        alert('Hubo un error al guardar tu diagnóstico. Por favor, revisa tu conexión a internet e inténtalo de nuevo.');

        // Re-habilitar el botón para que el usuario pueda reintentar
        submitBtn.disabled = false;
        loadingMsg.style.display = 'none';
    }
}

// ========================================================================
// ENVIAR A GOOGLE APPS SCRIPT
// ========================================================================
async function sendToGoogleAppsScript(sheetData) {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5H3FHicn9hvZ9xBjqInUf0oS0XihavSkevzP9nQLQTLf9ld_-Xijzn9e5NlXgtTJRTQ/exec';
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sheetData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Respuesta del servidor:', result);
            return result.success; // Devuelve true si el script de Google confirma el éxito
        } else {
            // Manejar errores de red o HTTP (e.g., 404, 500)
            console.error('❌ Error de Red/HTTP:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        // Manejar errores en la petición fetch (e.g., no hay conexión, error de DNS)
        console.error('❌ Error en la función fetch:', error);
        throw error; // Propagar el error para que submitAndShowResults lo capture y muestre un mensaje
    }
}

// ========================================================================
// ACTUALIZAR INDICADOR DE PROGRESO (OPCIONAL)
// ========================================================================
function updateProgress() {
    // Esta función puede usarse para mostrar progreso visual
    // mientras el usuario completa el diagnóstico
}
