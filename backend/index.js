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

    // Crear materias base
    //1er año
    const A1 = await materias.create({ nombre: "Análisis Matemático 1" , anio: 1});
    const AGA = await materias.create({ nombre: "Álgebra y Geometria Analitica" , anio: 1 });
    const F1 = await materias.create({ nombre: "Física 1" , anio: 1 });
    const F2 = await materias.create({ nombre: "Física 2", anio: 2  });
    const M1 = await materias.create({ nombre: "Ingenieria Mecánica" , anio: 1 });
    const QG = await materias.create({ nombre: "Quimica General" , anio: 1 });
    const IyS = await materias.create({ nombre: "Ingenieria y Sociedad" , anio: 1 });
    const SdR = await materias.create({ nombre: "Sistemas de Representación" , anio: 1 });
    const FdI = await materias.create({ nombre: "Fundamentos de Informatica" , anio: 1 });

    //2do año
    const A2 = await materias.create({ nombre: "Analisis Matematico 2" , anio: 2 });
    const QA = await materias.create({ nombre: "Quimica Aplicada", anio: 2  });
    const E1 = await materias.create({ nombre: "Estabilidad 1", anio: 2  });
    const MM = await materias.create({ nombre: "Materiales Metalicos", anio: 2  });
    const IAySI = await materias.create({ nombre: "Ingenieria Ambiental y Seguridad Industrial", anio: 2  });
    const M2 = await materias.create({ nombre: "Ingenieria Mecánica 2", anio: 2  });
    const I1 = await materias.create({ nombre: "Ingles 1", anio: 2  });

    //3er año
    const T = await materias.create({ nombre: "Termodinamica" , anio: 3 });
    const MR = await materias.create({ nombre: "Mecanica Racional" , anio: 3 });
    const MyE = await materias.create({ nombre: "Mediciones y Ensayos" , anio: 3 });
    const DM = await materias.create({ nombre: "Diseño Mecanico" , anio: 3 });
    const CA = await materias.create({ nombre: "Calculo Avanzado" , anio: 3 });
    const M3 = await materias.create({ nombre: "Ingenieria Mecanica 3" , anio: 3 });
    const PyE = await materias.create({ nombre: "Probabilidad y Estadistica" , anio: 3 });
    const E2 = await materias.create({ nombre: "Estabilidad 2" , anio: 3 });
    const I2 = await materias.create({ nombre: "Ingles 2" , anio: 3 });

    //4to año
    const E = await materias.create({ nombre: "Economia" , anio: 4 });
    const EM = await materias.create({ nombre: "Elementos de Maquina" , anio: 4 });
    const TC = await materias.create({ nombre: "Tecnologia del Calor" , anio: 4 });
    const MeIC = await materias.create({ nombre: "Metrologia e Ingenieria de Calidad" , anio: 4 });
    const MF = await materias.create({ nombre: "Mecanica de los Fluidos" , anio: 4 });
    const EyME = await materias.create({ nombre: "Electrotecnia y Maquinas Electricas" , anio: 4 });
    const EySC = await materias.create({ nombre: "Electronica y Sistemas de Control" , anio: 4 });
    const TF = await materias.create({ nombre: "Tecnologia de Fabricacion" , anio: 4 });

    //5to año
    const MT = await materias.create({ nombre: "Mantenimiento" , anio: 5 });
    const MAyTM = await materias.create({ nombre: "Maquinas Alternadas y Turbo Maquinas" , anio: 5 });
    const II = await materias.create({ nombre: "Instalaciones Industriales" , anio: 5 });
    const OI = await materias.create({ nombre: "Organizacion Industrial" , anio: 5 });
    const L = await materias.create({ nombre: "Legislacion" , anio: 5 });
    const PF = await materias.create({ nombre: "Proyecto Final" , anio: 5 });


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
    await EyME.addCorrelativas([A2, F2 ]);
    await EySC.addCorrelativas([A2, F2]);
    await TF.addCorrelativas([QA, MM, DM]);

    //5to año
    await MT.addCorrelativas([EM, EyME]);
    await MAyTM.addCorrelativas([TC, MF]);
    await II.addCorrelativas([MF, EyME, EySC]);
    await OI.addCorrelativas([E]);
    await L.addCorrelativas([M2]);
    await PF.addCorrelativas([EM, DM, CA, E2, I2]);

};

dbInit().then(() => {
    app.listen(4000, async () => {
        console.log('Sincronizando base de datos')
    })
})