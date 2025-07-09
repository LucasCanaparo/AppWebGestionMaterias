import express from 'express'
import cors from 'cors'
import db from './data/dbInit.js'
import router from './routes/routes.js'
import materias from './models/materias.model.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

async function dbInit() {
    await db.sync({ force: true })

    // Crear materias base generales y de mecanica
    //1er año
    const A1 = await materias.create({ nombre: "Análisis Matemático 1", anio: 1, carrera: null });
    const AGA = await materias.create({ nombre: "Álgebra y Geometria Analitica", anio: 1, carrera: null });
    const F1 = await materias.create({ nombre: "Física 1", anio: 1, carrera: null });
    const M1 = await materias.create({ nombre: "Ingenieria Mecánica", anio: 1, carrera: 1 });
    const QG = await materias.create({ nombre: "Quimica General", anio: 1, carrera: 1 });
    const IyS = await materias.create({ nombre: "Ingenieria y Sociedad", anio: 1, carrera: null });
    const SdR = await materias.create({ nombre: "Sistemas de Representación", anio: 1, carrera: 1 });
    const FdI = await materias.create({ nombre: "Fundamentos de Informatica", anio: 1, carrera: 1 });

    //2do año
    const A2 = await materias.create({ nombre: "Analisis Matematico 2", anio: 2, carrera: null });
    const F2 = await materias.create({ nombre: "Física 2", anio: 2, carrera: 1, carrera: null });
    const QA = await materias.create({ nombre: "Quimica Aplicada", anio: 2, carrera: 1 });
    const E1 = await materias.create({ nombre: "Estabilidad 1", anio: 2, carrera: 1 });
    const MM = await materias.create({ nombre: "Materiales Metalicos", anio: 2, carrera: 1 });
    const IAySI = await materias.create({ nombre: "Ingenieria Ambiental y Seguridad Industrial", anio: 2, carrera: 1 });
    const M2 = await materias.create({ nombre: "Ingenieria Mecánica 2", anio: 2, carrera: 1 });
    const I1 = await materias.create({ nombre: "Ingles 1", anio: 2, carrera: 1 });

    //3er año
    const T = await materias.create({ nombre: "Termodinamica", anio: 3, carrera: 1 });
    const MR = await materias.create({ nombre: "Mecanica Racional", anio: 3, carrera: 1 });
    const MyE = await materias.create({ nombre: "Mediciones y Ensayos", anio: 3, carrera: 1 });
    const DM = await materias.create({ nombre: "Diseño Mecanico", anio: 3, carrera: 1 });
    const CA = await materias.create({ nombre: "Calculo Avanzado", anio: 3, carrera: 1 });
    const M3 = await materias.create({ nombre: "Ingenieria Mecanica 3", anio: 3, carrera: 1 });
    const PyE = await materias.create({ nombre: "Probabilidad y Estadistica", anio: 3, carrera: 1 });
    const E2 = await materias.create({ nombre: "Estabilidad 2", anio: 3, carrera: 1 });
    const I2 = await materias.create({ nombre: "Ingles 2", anio: 3, carrera: 1 });

    //4to año
    const E = await materias.create({ nombre: "Economia", anio: 4, carrera: 1 });
    const EM = await materias.create({ nombre: "Elementos de Maquina", anio: 4, carrera: 1 });
    const TC = await materias.create({ nombre: "Tecnologia del Calor", anio: 4, carrera: 1 });
    const MeIC = await materias.create({ nombre: "Metrologia e Ingenieria de Calidad", anio: 4, carrera: 1 });
    const MF = await materias.create({ nombre: "Mecanica de los Fluidos", anio: 4, carrera: 1 });
    const EyME = await materias.create({ nombre: "Electrotecnia y Maquinas Electricas", anio: 4, carrera: 1 });
    const EySC = await materias.create({ nombre: "Electronica y Sistemas de Control", anio: 4, carrera: 1 });
    const TF = await materias.create({ nombre: "Tecnologia de Fabricacion", anio: 4, carrera: 1 });

    //5to año
    const MT = await materias.create({ nombre: "Mantenimiento", anio: 5, carrera: 1 });
    const MAyTM = await materias.create({ nombre: "Maquinas Alternadas y Turbo Maquinas", anio: 5, carrera: 1 });
    const II = await materias.create({ nombre: "Instalaciones Industriales", anio: 5, carrera: 1 });
    const OI = await materias.create({ nombre: "Organizacion Industrial", anio: 5, carrera: 1 });
    const L = await materias.create({ nombre: "Legislacion", anio: 5, carrera: 1 });
    const PF = await materias.create({ nombre: "Proyecto Final", anio: 5, carrera: 1 });


    // Asignar correlativas
    //2do año
    await F2.addCorrelativas([F1, A1]);
    await A2.addCorrelativas([A1, AGA]);
    await QA.addCorrelativas([QG]);
    await E1.addCorrelativas([AGA, F1]);
    await MM.addCorrelativas([QG]);
    await IAySI.addCorrelativas([QG]);
    await M2.addCorrelativas([A1, F1, M1]);

    //3er año
    await T.addCorrelativas([A2, F2]);
    await MR.addCorrelativas([E1, A2]);
    await MyE.addCorrelativas([MM, F2]);
    await DM.addCorrelativas([M1, SdR]);
    await CA.addCorrelativas([A2]);
    await M3.addCorrelativas([FdI, QA, MM, M2]);
    await PyE.addCorrelativas([A1, AGA]);
    await E2.addCorrelativas([E1, A2]);
    await I2.addCorrelativas([I1]);

    //4to año
    await E.addCorrelativas([M2, IyS]);
    await EM.addCorrelativas([MR, M3, E2, I1]);
    await TC.addCorrelativas([T]);
    await MeIC.addCorrelativas([MyE, PyE]);
    await MF.addCorrelativas([T]);
    await EyME.addCorrelativas([A2, F2]);
    await EySC.addCorrelativas([A2, F2]);
    await TF.addCorrelativas([QA, MM, DM]);

    //5to año
    await MT.addCorrelativas([EM, EyME]);
    await MAyTM.addCorrelativas([TC, MF]);
    await II.addCorrelativas([MF, EyME, EySC]);
    await OI.addCorrelativas([E]);
    await L.addCorrelativas([M2]);
    await PF.addCorrelativas([EM, DM, CA, E2, I2]);


    //Creando materias para sistemas
    //1er año
    const LED = await materias.create({ nombre: "Lógica y Estructuras Discretas", anio: 1, carrera: 2 });
    const AED = await materias.create({ nombre: "Algoritmos y Estructuras de Datos", anio: 1, carrera: 2 });
    const ACO = await materias.create({ nombre: "Arquitectura de Computadoras", anio: 1, carrera: 2 });
    const SPN = await materias.create({ nombre: "Sistemas y Procesos de Negocio", anio: 1, carrera: 2 });
    const I1s = await materias.create({ nombre: "Inglés 1", anio: 1, carrera: 2 });

    //2do año
    const I2s = await materias.create({ nombre: "Inglés 2", anio: 2 , carrera: 2});
    const SSL = await materias.create({ nombre: "Sintaxis y Semántica de los Lenguajes", anio: 2, carrera: 2 });
    const PPR = await materias.create({ nombre: "Paradigmas de Programación", anio: 2, carrera: 2 });
    const SOP = await materias.create({ nombre: "Sistemas Operativos", anio: 2, carrera: 2 });
    const ASI = await materias.create({ nombre: "Análisis de Sistemas de Información", anio: 2, carrera: 2 });
    const PyEs = await materias.create({ nombre: "Probabilidad y Estadística", anio: 2 , carrera: 2});

    //3er año
    const ECO = await materias.create({ nombre: "Economía", anio: 3, carrera: 2 });
    const BDD = await materias.create({ nombre: "Bases de Datos", anio: 3, carrera: 2 });
    const DDS = await materias.create({ nombre: "Desarrollo de Software", anio: 3 , carrera: 2});
    const COM = await materias.create({ nombre: "Comunicación de Datos", anio: 3 , carrera: 2});
    const AN = await materias.create({ nombre: "Análisis Numérico", anio: 3 , carrera: 2});
    const DSI = await materias.create({ nombre: "Diseño de Sistemas de Información", anio: 3, carrera: 2 });

    //4to año
    const LEG = await materias.create({ nombre: "Legislación", anio: 4, carrera: 2 });
    const ICS = await materias.create({ nombre: "Ingeniería y Calidad de Software", anio: 4, carrera: 2 });
    const RDA = await materias.create({ nombre: "Redes de Datos", anio: 4 , carrera: 2});
    const IOP = await materias.create({ nombre: "Investigación Operativa", anio: 4 , carrera: 2});
    const SIM = await materias.create({ nombre: "Simulación", anio: 4 , carrera: 2});
    const TPA = await materias.create({ nombre: "Tecnologías para la Automatización", anio: 4, carrera: 2 });
    const ADSI = await materias.create({ nombre: "Administración de Sistemas de Información", anio: 4 , carrera: 2});

    //5to año
    const IA = await materias.create({ nombre: "Inteligencia Artificial", anio: 5 , carrera: 2});
    const CDATOS = await materias.create({ nombre: "Ciencia de Datos", anio: 5, carrera: 2 });
    const SG = await materias.create({ nombre: "Sistemas de Gestión", anio: 5, carrera: 2 });
    const GG = await materias.create({ nombre: "Gestión Gerencial", anio: 5 , carrera: 2});
    const SSI = await materias.create({ nombre: "Seguridad en los Sistemas de Información", anio: 5, carrera: 2 });
    const PFs = await materias.create({ nombre: "Proyecto Final", anio: 5, carrera: 2 });

    //Asignar correlativas
    //2do año
    await I2s.addCorrelativas([I1s]);
    await SSL.addCorrelativas([LED, AED]);
    await PPR.addCorrelativas([LED, AED]);
    await SOP.addCorrelativas([ACO]);
    await ASI.addCorrelativas([AED, SPN]);
    await PyEs.addCorrelativas([A1, AGA]);

    //3er año
    await ECO.addCorrelativas([A1, AGA]);
    await BDD.addCorrelativas([SSL, PPR]);
    await DDS.addCorrelativas([PPR, ASI]);
    await COM.addCorrelativas([F1, ACO]);
    await AN.addCorrelativas([A2, AGA]);
    await DSI.addCorrelativas([PPR, ASI, I1s]);

    //4to año
    await LEG.addCorrelativas([IyS]);
    await ICS.addCorrelativas([BDD, DDS, DSI]);
    await RDA.addCorrelativas([SOP, COM]);
    await IOP.addCorrelativas([PyEs, AN]);
    await SIM.addCorrelativas([PyEs, A2]);
    await TPA.addCorrelativas([F2, AN]);
    await ADSI.addCorrelativas([ECO, DSI]);

    //5to año
    await IA.addCorrelativas([SIM, PyEs, AN]);
    await CDATOS.addCorrelativas([SIM, PyEs, BDD]);
    await SG.addCorrelativas([ECO, IOP, DSI]);
    await GG.addCorrelativas([LEG, ADSI]);
    await SSI.addCorrelativas([RDA, ADSI, DDS, COM]);
    await PFs.addCorrelativas([ICS, RDA, ADSI]);

};

dbInit().then(() => {
    app.listen(4000, async () => {
        console.log('Sincronizando base de datos')
    })
})