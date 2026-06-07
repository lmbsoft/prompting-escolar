import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const assetDir = path.join(root, 'assets', 'aa_i_visuals_web');

const assetFiles = {
  opportunity: 'oportunidad_casa.jpg',
  brochure: 'folleto_base.jpg',
  transformation: 'antes_despues.jpg',
  planning: 'mesa_proyecto.jpg',
  renovation_00: 'reforma_00.jpg',
  renovation_01: 'reforma_01.jpg',
  renovation_02: 'reforma_02.jpg',
  renovation_03: 'reforma_03.jpg',
  renovation_04: 'reforma_04.jpg',
  renovation_05: 'reforma_05.jpg',
  renovation_06: 'reforma_06.jpg',
  development_00: 'desarrollo_00.jpg',
  development_01: 'desarrollo_01.jpg',
  development_02: 'desarrollo_02.jpg',
  development_03: 'desarrollo_03.jpg',
  development_04: 'desarrollo_04.jpg',
  development_05: 'desarrollo_05.jpg',
  development_06: 'desarrollo_06.jpg'
};

const imageAssets = Object.fromEntries(
  Object.entries(assetFiles).map(([id, file]) => {
    const base64 = fs.readFileSync(path.join(assetDir, file)).toString('base64');
    return [id, { src: `data:image/jpeg;base64,${base64}` }];
  })
);

const imageExamples = [
  {
    id: 'opportunity',
    title: 'Detectar potencial sin ocultar el estado real',
    caption: 'Una propiedad deteriorada puede ser una oportunidad, pero la imagen inicial debe mostrarla con honestidad. Sirve para pensar posibilidades antes de diseñar.',
    prompt: 'Fotografía editorial realista de una casa urbana antigua y desgastada, estructuralmente creíble, con jardín descuidado y potencial de reforma. Un desarrollador la observa con una carpeta, luz suave de mañana, sin texto ni carteles.'
  },
  {
    id: 'brochure',
    title: 'Folleto inmobiliario editable',
    caption: 'La IA organiza la jerarquía visual y reserva espacios. Precio, superficie, dirección, disponibilidad y contacto se agregan después con datos verificados.',
    prompt: 'Base cuadrada de brochure inmobiliario moderno con render de living renovado, miniatura de fachada, muestras de materiales y bloques vacíos para datos. Paleta blanco cálido, grafito y terracota, sin texto ni números.'
  },
  {
    id: 'transformation',
    title: 'Antes y después comparable',
    caption: 'El valor pedagógico está en conservar la misma geometría y el mismo punto de vista. Así se ve qué cambió realmente y qué sería solo una promesa visual.',
    prompt: 'Comparación dividida del mismo living antes y después de una reforma. Misma cámara, ventanas, puertas y muros; izquierda deteriorada, derecha renovada con terminaciones realistas de costo medio.'
  },
  {
    id: 'planning',
    title: 'Decidir con imágenes y datos',
    caption: 'Comprar, reformar y vender requiere combinar planos, costos, materiales, registro fotográfico y comunicación. La imagen muestra ese sistema de trabajo.',
    prompt: 'Mesa de planificación inmobiliaria con planos sin texto, muestras de materiales, calculadora, notebook con grilla abstracta, celular con fotos de propiedades, cinta métrica, llaves y maqueta.'
  }
];

const imageSequences = [
  {
    id: 'renovation',
    title: 'Secuencia 1: de casa deteriorada a propiedad renovada y comunicable',
    intro: 'Esta genealogía muestra que una reforma no debe aparecer como un salto mágico. Cada prompt agrega una decisión: registrar el estado, medir, intervenir, terminar, ambientar y recién entonces diseñar la pieza comercial.',
    steps: [
      {
        asset: 'renovation_00',
        step: '0',
        title: 'Estado de compra',
        change: 'Se registra un ambiente anticuado, oscuro y desgastado, pero todavía legible y estructuralmente plausible.',
        prompt: 'Mostrá el living-comedor de una casa recién comprada en malas condiciones: paredes manchadas, piso antiguo, cortinas pesadas, muebles abandonados y desgaste visible. Fotografía de inspección honesta, sin dramatizar una ruina.',
        lesson: 'La primera imagen debe documentar lo que hay. Si embellece el punto de partida, después no se puede evaluar la mejora.'
      },
      {
        asset: 'renovation_01',
        step: '1',
        title: 'Vaciar, medir y diagnosticar',
        change: 'El ambiente queda despejado y aparecen marcas de inspección, herramientas de medición y puntos a revisar.',
        prompt: 'Conservá exactamente la geometría, puertas, ventanas y piso. Retirá muebles y cortinas. Mostrá el ambiente vacío con cinta de marcado, escalera, cinta métrica y carpeta de relevamiento. Todavía no reformes.',
        lesson: 'Antes de generar soluciones conviene fijar qué se conserva y qué requiere verificación profesional.'
      },
      {
        asset: 'renovation_02',
        step: '2',
        title: 'Demolición controlada',
        change: 'Se retiran terminaciones deterioradas y el espacio se transforma en una obra ordenada, sin destruir elementos innecesarios.',
        prompt: 'Mantené la arquitectura. Mostrá demolición y preparación controlada: revoques flojos retirados, piso protegido, bolsas de escombro ordenadas, herramientas y puntos eléctricos expuestos de forma segura.',
        lesson: 'Pedir una etapa intermedia evita que la IA salte directamente a un resultado final imposible de auditar.'
      },
      {
        asset: 'renovation_03',
        step: '3',
        title: 'Reparaciones e instalaciones',
        change: 'Los muros se nivelan, se ordenan instalaciones y se prepara la iluminación sin ocultar que la obra continúa.',
        prompt: 'Avanzá a reparaciones e instalaciones: paredes parcheadas y niveladas, cajas eléctricas y conducciones prolijas, techo preparado para iluminación simple, piso todavía protegido. Sin decoración.',
        lesson: 'La secuencia visual puede servir para explicar proceso y controlar que cada decisión tenga una etapa real.'
      },
      {
        asset: 'renovation_04',
        step: '4',
        title: 'Terminaciones sobrias',
        change: 'Aparecen paredes cálidas, piso claro, iluminación y carpinterías mejoradas, con el ambiente todavía vacío.',
        prompt: 'Conservá la geometría. Aplicá terminaciones realistas de costo medio: paredes blanco cálido, piso de madera clara, iluminación simple, zócalos y carpinterías prolijas. Dejá el ambiente vacío.',
        lesson: 'Evaluar materiales sin muebles permite separar la calidad de la reforma del atractivo de la ambientación.'
      },
      {
        asset: 'renovation_05',
        step: '5',
        title: 'Ambientación para venta',
        change: 'Pocos muebles ayudan a entender escala, circulación y uso sin convertir la propiedad en una fantasía de lujo.',
        prompt: 'Ambientá modestamente el espacio renovado: sofá compacto, mesa baja, alfombra neutra, planta y comedor simple. Respetá escala y circulación. No cambies arquitectura ni vistas.',
        lesson: 'La ambientación debe ayudar a imaginar el uso, no exagerar superficie, categoría ni prestaciones.'
      },
      {
        asset: 'renovation_06',
        step: '6',
        title: 'Ficha comercial verificable',
        change: 'La imagen renovada se integra con fachada y plano dentro de una composición preparada para datos reales.',
        prompt: 'Convertí el resultado en una presentación comercial horizontal: imagen interior protagonista, miniatura de fachada, plano abstracto y bloques vacíos para precio, superficie y contacto. Sin texto ni números.',
        lesson: 'La IA compone la pieza; los datos sensibles y la aclaración de imagen ilustrativa se agregan y verifican al final.'
      }
    ]
  },
  {
    id: 'development',
    title: 'Secuencia 2: de oportunidad urbana a desarrollo de departamentos y campaña',
    intro: 'Esta cadena recorre otra escala del oficio: detectar un lote, estudiar una volumetría, construir, definir una identidad arquitectónica y traducirla en un sistema de venta.',
    steps: [
      {
        asset: 'development_00',
        step: '0',
        title: 'Inmueble y lote existente',
        change: 'Se ve una construcción obsoleta dentro de su contexto real, con vecinos, vereda, árbol y ancho de lote reconocibles.',
        prompt: 'Fotografía frontal de un lote urbano angosto en Mar del Plata con una construcción baja obsoleta, edificios vecinos y equipo de relevamiento. Estado realista, sin carteles ni texto.',
        lesson: 'El contexto importa: una propuesta creíble empieza por registrar medianeras, escala de calle y restricciones visibles.'
      },
      {
        asset: 'development_01',
        step: '1',
        title: 'Estudio de factibilidad visual',
        change: 'Una volumetría translúcida permite discutir altura, retiros y ritmo de balcones sin fingir que el proyecto ya está definido.',
        prompt: 'Sobre la misma vista, superponé un estudio conceptual translúcido para un edificio compacto de cinco pisos, con retiros y balcones indicados mediante líneas limpias. Que se note que es una hipótesis.',
        lesson: 'Conviene diferenciar idea preliminar, anteproyecto y render comercial para no presentar como aprobado lo que todavía está en estudio.'
      },
      {
        asset: 'development_02',
        step: '2',
        title: 'Inicio de obra',
        change: 'El lote se convierte en una obra temprana ordenada, con excavación, fundaciones y protección del entorno.',
        prompt: 'Mostrá el mismo lote al inicio de obra: excavación y fundaciones de hormigón, cerco seguro, materiales ordenados y vecinos protegidos. Fotografía documental.',
        lesson: 'Las imágenes de avance funcionan mejor cuando muestran un hito concreto y no una obra genérica.'
      },
      {
        asset: 'development_03',
        step: '3',
        title: 'Estructura y cerramientos',
        change: 'La escala final comienza a ser visible a través de la estructura, mampostería y ritmo de balcones.',
        prompt: 'Mostrá el edificio compacto a mitad de obra: cinco niveles de hormigón, cerramientos parciales, barandas provisorias y andamios ordenados. Mantené una escala urbana creíble.',
        lesson: 'Nombrar la etapa permite producir material útil para seguimiento, compradores e informes de avance.'
      },
      {
        asset: 'development_04',
        step: '4',
        title: 'Fachada terminada',
        change: 'La identidad aparece mediante blanco cálido, grafito y terracota, integrada con los edificios vecinos.',
        prompt: 'Completá el edificio con arquitectura contemporánea sobria: revoque blanco cálido, barandas grafito, detalles terracota, balcones regulares y acceso transparente. Sin carteles.',
        lesson: 'Una fachada comercial puede ser atractiva sin inventar escala, entorno, vistas ni materiales que no se entregarán.'
      },
      {
        asset: 'development_05',
        step: '5',
        title: 'Unidad tipo coherente',
        change: 'El interior repite la paleta de la fachada y muestra un departamento compacto, luminoso y alcanzable.',
        prompt: 'Generá el living-comedor-cocina de una unidad de dos ambientes coherente con el edificio: blanco cálido, madera clara, marcos grafito y acento terracota. Vista urbana ordinaria y escala realista.',
        lesson: 'La coherencia entre exterior, interior y materiales evita que cada render parezca pertenecer a un proyecto distinto.'
      },
      {
        asset: 'development_06',
        step: '6',
        title: 'Sistema de folletería',
        change: 'Fachada e interior se convierten en brochure, post, historia móvil y ficha comercial con una identidad común.',
        prompt: 'Diseñá un kit comercial con brochure A4, post cuadrado, historia vertical, tarjeta y ficha de venta usando la fachada y el interior. Reservá áreas vacías para datos verificados.',
        lesson: 'El objetivo final no es un render aislado, sino un sistema adaptable por canal y fácil de actualizar.'
      }
    ]
  }
];

const payload = { imageAssets, imageExamples, imageSequences };
const output = `window.aaIVisuals = ${JSON.stringify(payload)};\n`;
fs.writeFileSync(path.join(root, 'aa_i_visual_sequences.js'), output);
