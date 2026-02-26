    const App = () => {
      const [stage, setStage] = useState('hall'); // hall | level_selection | category_selection
      const [level, setLevel] = useState(null); // primary | secondary
      const [category, setCategory] = useState(null); // modules | gym | stories
      const [activeItem, setActiveItem] = useState(null);
      const [showOverlay, setShowOverlay] = useState(false);

      const reset = () => {
        setStage('hall');
        setLevel(null);
        setCategory(null);
        setActiveItem(null);
        setShowOverlay(false);
      };

      const handleItemClick = (item) => {
        setActiveItem(item);
        setShowOverlay(true);
      };

      const closeOverlay = () => {
        setShowOverlay(false);
        setActiveItem(null);
      };

      return (
        <div className="w-full h-full relative font-sans text-slate-800">
          {/* Header UI */}
          <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto cursor-pointer p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-colors" onClick={reset}>
              <BrainCircuit className="w-8 h-8 text-yellow-300" />
              <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-md hidden sm:block">Exploradores de IA - Museo 3D</h1>
            </div>
            
            <div className="flex gap-2 pointer-events-auto">
              {level && (
                 <button onClick={() => {setLevel(null); setCategory(null); setStage('hall');}} className="text-sm bg-indigo-500/80 hover:bg-indigo-600 px-4 py-2 rounded-full font-bold text-white backdrop-blur shadow-lg transition">
                   Cambiar Nivel
                 </button>
              )}
            </div>
          </header>

          {/* Contextual CTAs */}
          {!showOverlay && (
             <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none animate-bounce">
                <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl">
                   <p className="text-white font-bold text-lg flex items-center gap-2">
                     <Info className="w-5 h-5 text-yellow-400" />
                     {stage === 'hall' && "Toca un portal para entrar al museo"}
                     {stage === 'level_selection' && "¿Qué quieres explorar hoy? Toca una categoría"}
                     {stage === 'category_selection' && "Selecciona un elemento para leer"}
                   </p>
                </div>
             </div>
          )}

          {/* 3D Canvas */}
          <div className="w-full h-full bg-slate-900" ref={c => {if (c) container = c}}>
            <Canvas camera={{ position: [0, 2, 8], fov: 60 }} shadows>
               <Suspense fallback={null}>
                  <MainScene 
                     stage={stage} setStage={setStage} 
                     level={level} setLevel={setLevel} 
                     category={category} setCategory={setCategory} 
                     activeItem={activeItem} setActiveItem={handleItemClick}
                  />
               </Suspense>
            </Canvas>
          </div>

          {/* 2D Overlay for content */}
          {showOverlay && activeItem && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-y-auto">
                <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden border-4 border-indigo-400 relative">
                   <button onClick={closeOverlay} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors z-50">
                      <X className="w-6 h-6" />
                   </button>
                   
                   <div className="flex-1 overflow-y-auto p-6 md:p-10">
                      {category === 'modules' && (
                         <div className="prose max-w-none">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                               {activeItem.icon} {activeItem.title}
                            </h2>
                            <p className="text-xl text-slate-700 leading-relaxed mb-8">{activeItem.theory}</p>
                            
                            {activeItem.extendedTheory && (
                               <div className="mt-8 p-6 md:p-8 bg-slate-50 border-2 rounded-2xl shadow-inner border-dashed border-slate-300">
                                  {activeItem.extendedTheory}
                               </div>
                            )}

                            <div className="mt-10 p-6 md:p-8 bg-slate-100 rounded-2xl border border-slate-200">
                               <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
                                  <Sparkles className="text-indigo-500" />
                                  Zona Interactiva
                               </h3>
                               <ActivityEngine activity={activeItem.activity} isPrimary={level === 'primary'} />
                            </div>
                         </div>
                      )}

                      {category === 'gym' && (
                         <div className="space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                               {activeItem.subject}
                            </span>
                            <h2 className="text-3xl font-bold text-slate-800">{activeItem.title}</h2>
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                               <p className="text-slate-700 italic font-medium">"{activeItem.task}"</p>
                            </div>

                            <div className="space-y-4">
                               <h4 className="font-bold text-red-700 flex items-center gap-2">
                                  <XCircle className="w-5 h-5" /> El Camino del Perezoso ❌
                               </h4>
                               <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                  <p className="font-mono text-sm text-red-900 mb-3 bg-white p-2 rounded border border-red-200 shadow-inner">
                                     {activeItem.bad.prompt}
                                  </p>
                                  <p className="text-sm text-red-800">{activeItem.bad.reason}</p>
                               </div>
                            </div>

                            <div className="space-y-4 mt-6">
                               <h4 className="font-bold text-emerald-700 flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5" /> El Camino del Explorador ✅
                               </h4>
                               <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                  {activeItem.good.steps.map((step, idx) => (
                                     <div key={idx} className="mb-4 last:mb-0">
                                        <p className="text-sm font-bold text-emerald-800 mb-2">{step.title}</p>
                                        <p className="font-mono text-sm text-slate-800 mb-2 bg-white p-3 rounded-lg border border-slate-200 border-l-4 border-l-indigo-400">
                                           "{step.prompt}"
                                        </p>
                                     </div>
                                  ))}
                                  <p className="text-sm mt-4 pt-3 border-t border-emerald-200 text-emerald-800">
                                     <strong>Por qué funciona:</strong> {activeItem.good.reason}
                                  </p>
                               </div>
                            </div>
                         </div>
                      )}

                      {category === 'stories' && (
                         <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-slate-800">{activeItem.title}</h2>
                            <p className="text-slate-600 bg-slate-100 p-4 rounded-lg font-medium">Contexto: {activeItem.context}</p>
                            
                            <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-200 space-y-4">
                               {activeItem.messages.map((msg, idx) => (
                                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'ai' ? 'justify-start' : 'justify-center'}`}>
                                     {msg.role === 'user' && (
                                        <div className="max-w-[80%] p-4 rounded-2xl rounded-tr-sm bg-indigo-600 text-white shadow-md">
                                           <p className="font-medium">{msg.content}</p>
                                        </div>
                                     )}
                                     {msg.role === 'ai' && (
                                        <div className="max-w-[80%] flex items-start gap-3">
                                           <div className="p-2 bg-white rounded-full shadow-sm mt-1 shrink-0"><BrainCircuit className="w-5 h-5 text-indigo-600"/></div>
                                           <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-slate-200 shadow-sm text-slate-700">
                                              <p>{msg.content}</p>
                                           </div>
                                        </div>
                                     )}
                                     {msg.role === 'alert' && (
                                        <div className="w-full max-w-lg my-4 p-5 bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-md rotate-1">
                                           <p className="font-bold text-yellow-900 flex items-start gap-2">
                                              <Info className="w-5 h-5 shrink-0 text-yellow-600 mt-0.5" />
                                              <span>{msg.content}</span>
                                           </p>
                                        </div>
                                     )}
                                     {msg.role === 'action' && (
                                        <div className="w-full text-center my-2">
                                           <span className="inline-block px-4 py-2 bg-slate-200 text-slate-600 text-sm italic rounded-full border border-slate-300">
                                              {msg.content}
                                           </span>
                                        </div>
                                     )}
                                  </div>
                               ))}
                            </div>
                         </div>
                      )}
                   </div>
                   
                   {/* Overlay Footer */}
                   <div className="bg-slate-100 p-4 border-t flex justify-end">
                      <button onClick={closeOverlay} className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow hover:bg-indigo-700 transition">
                         Me Quedó Claro, Volver
                      </button>
                   </div>
                </div>
             </div>
          )}
        </div>
      );
    };

    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
