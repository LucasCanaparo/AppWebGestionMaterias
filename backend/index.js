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
    const A1 = await materias.create({ nombre: "Análisis Matemático 1" , anio: 1});
    const AGA = await materias.create({ nombre: "Álgebra y Geometria Analitica" , anio: 1 });
    const F1 = await materias.create({ nombre: "Física 1" , anio: 1 });
    const F2 = await materias.create({ nombre: "Física 2", anio: 2  });
    const A2 = await materias.create({ nombre: "Analisis Matematico 2" , anio: 2 });
    const M = await materias.create({ nombre: "Ingenieria Mecánica" , anio: 1 });
    const QG = await materias.create({ nombre: "Quimica General" , anio: 1 });
    const IyS = await materias.create({ nombre: "Ingenieria y Sociedad" , anio: 1 });
    const SdR = await materias.create({ nombre: "Sistemas de Representación" , anio: 1 });
    const FdI = await materias.create({ nombre: "Fundamentos de Informatica" , anio: 1 });
    const QA = await materias.create({ nombre: "Quimica Aplicada", anio: 2  });
    const E1 = await materias.create({ nombre: "Estabilidad 1", anio: 2  });
    const MM = await materias.create({ nombre: "Materiales Mecanicos", anio: 2  });
    const IAySI = await materias.create({ nombre: "Ingenieria Ambiental y Seguridad Industrial", anio: 2  });
    const M2 = await materias.create({ nombre: "Ingenieria Mecánica 2", anio: 2  });
    const I1 = await materias.create({ nombre: "Ingles 1", anio: 2  });


    // Asignar correlativas
    await F2.addCorrelativas([F1, A1]);
    await A2.addCorrelativas([A1, AGA]);
    await QA.addCorrelativas([QG]);
    await E1.addCorrelativas([AGA, F1]);
    await MM.addCorrelativas([QG]);
    await IAySI.addCorrelativas([QG]);
    await M2.addCorrelativas([A1, F1, M]);


};

dbInit().then(() => {
    app.listen(4000, async () => {
        console.log('Sincronizando base de datos')
    })
})