    // --- 3D MUSEUM COMPONENTS ---

    // Constants for positions
    const POS = {
      primary: [-4, 0, -5],
      secondary: [4, 0, -5],
      theory: [-3, 1, -10],
      gym: [0, 1, -12],
      stories: [3, 1, -10]
    };

    const Portal = ({ position, label, color, onClick, isHovered, setHovered }) => {
      return (
        <group position={position}>
          <mesh 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
          >
            <boxGeometry args={[3, 4, 0.5]} />
            <meshStandardMaterial color={isHovered ? 'white' : color} emissive={color} emissiveIntensity={isHovered ? 0.8 : 0.2} roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 2.5, 0]} fontSize={0.6} color="white" anchorX="center" anchorY="bottom">
            {label}
          </Text>
        </group>
      );
    };

    const CategoryNode = ({ position, label, icon: IconComponent, color, onClick, isHovered, setHovered }) => {
      const ref = useRef();
      useFrame((state) => {
        if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      });

      return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group 
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
          >
            <mesh ref={ref}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={color} wireframe={!isHovered} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <Html center position={[0, 1.5, 0]}>
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <div className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ${isHovered ? 'scale-125' : 'scale-100'} transition-transform`}>
                  <IconComponent className={`w-8 h-8 text-${color}-400 drop-shadow-lg`} />
                </div>
                <span className={`mt-2 font-bold text-lg text-white drop-shadow-md bg-black/50 px-3 py-1 rounded-full ${isHovered ? 'scale-110' : 'scale-100'} transition-transform`}>{label}</span>
              </div>
            </Html>
          </group>
        </Float>
      );
    };

    const ItemCard = ({ position, item, onClick, isHovered, setHovered, colorClass }) => {
      return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
          <group 
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick(item); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
          >
            <Html transform center portal={container} style={{ width: '300px' }}>
              <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform ${isHovered ? 'scale-105 shadow-2xl z-50' : 'scale-100 shadow-lg'} bg-white ${colorClass.border}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full ${colorClass.bg} ${colorClass.text}`}>
                    {item.icon ? item.icon : <BookOpen className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-lg leading-tight text-slate-800">{item.title}</h3>
                </div>
                {item.task && <p className="text-sm text-slate-500 line-clamp-2 mt-2">{item.task}</p>}
                {item.context && <p className="text-sm text-slate-500 line-clamp-2 mt-2">{item.context}</p>}
                {item.subject && (
                   <span className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colorClass.bg} ${colorClass.text}`}>
                    {item.subject}
                   </span>
                )}
              </div>
            </Html>
          </group>
        </Float>
      );
    };

    // Global container ref for Html portals to ensure they render on top properly in 3D space
    let container;

    const SceneOptions = ({ level, category, setStage, activeItem, setActiveItem }) => {
       const isPrimary = level === 'primary';
       const colors = isPrimary ? { bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-200', hex: '#f97316' } 
                                : { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-200', hex: '#10b981' };
       
       const [hoveredIndex, setHoveredIndex] = useState(null);
       useCursor(hoveredIndex !== null);

       if (category === 'modules') {
          const items = content[level];
          return (
            <group position={[0,0,-20]}>
               {items.map((item, idx) => {
                 const x = (idx - (items.length - 1) / 2) * 4;
                 return (
                   <ItemCard 
                      key={item.id} position={[x, 0, idx % 2 === 0 ? 0 : 2]} 
                      item={item} onClick={setActiveItem}
                      isHovered={hoveredIndex === item.id} setHovered={(st) => setHoveredIndex(st ? item.id : null)}
                      colorClass={colors}
                   />
                 )
               })}
            </group>
          )
       }

       if (category === 'gym') {
          const items = gymData[level];
          // Truncating for 3D space, showing a few
          const displayItems = items.slice(0, 5); 
          return (
            <group position={[0,0,-20]}>
               {displayItems.map((item, idx) => {
                 const angle = (idx / displayItems.length) * Math.PI * 2;
                 const radius = 6;
                 return (
                   <ItemCard 
                      key={item.id} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius - 2]} 
                      item={item} onClick={setActiveItem}
                      isHovered={hoveredIndex === item.id} setHovered={(st) => setHoveredIndex(st ? item.id : null)}
                      colorClass={colors}
                   />
                 )
               })}
               <Text position={[0, 4, 0]} fontSize={1} color="white" anchorX="center" anchorY="bottom">
                  Selecciona un Reto
               </Text>
            </group>
          )
       }

       if (category === 'stories') {
          const items = storiesData[level];
          return (
            <group position={[0,0,-20]}>
               {items.map((item, idx) => {
                 const x = (idx - (items.length - 1) / 2) * 5;
                 return (
                   <ItemCard 
                      key={item.id} position={[x, Math.sin(x)*2, 0]} 
                      item={item} onClick={setActiveItem}
                      isHovered={hoveredIndex === item.id} setHovered={(st) => setHoveredIndex(st ? item.id : null)}
                      colorClass={colors}
                   />
                 )
               })}
            </group>
          )
       }

       return null;
    };

    const MainScene = ({ stage, setStage, level, setLevel, category, setCategory, activeItem, setActiveItem }) => {
      const controlsRef = useRef();
      const [hoveredPortal, setHoveredPortal] = useState(null);
      useCursor(hoveredPortal !== null);

      // Camera transitions
      useEffect(() => {
        if (!controlsRef.current) return;
        const ctrl = controlsRef.current;
        
        if (stage === 'hall') {
           ctrl.setLookAt(0, 2, 5, 0, 0, 0, true);
        } else if (stage === 'level_selection' && !category) {
           ctrl.setLookAt(0, 3, -2, 0, 1, -10, true);
        } else if (stage === 'category_selection' && !activeItem) {
           ctrl.setLookAt(0, 5, -10, 0, 0, -20, true);
        }
      }, [stage, category, activeItem]);

      return (
        <>
          <CameraControls ref={controlsRef} makeDefault minDistance={2} maxDistance={20} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={50} blur={2} far={10} />

          {/* HALL - Level Selection */}
          {stage === 'hall' && (
             <group>
               <Portal 
                  position={POS.primary} color="#f28500" label="Primaria"
                  isHovered={hoveredPortal === 'primary'} setHovered={(s) => setHoveredPortal(s ? 'primary' : null)}
                  onClick={() => { setLevel('primary'); setStage('level_selection'); }} 
               />
               <Portal 
                  position={POS.secondary} color="#10b981" label="Secundaria"
                  isHovered={hoveredPortal === 'secondary'} setHovered={(s) => setHoveredPortal(s ? 'secondary' : null)}
                  onClick={() => { setLevel('secondary'); setStage('level_selection'); }} 
               />
             </group>
          )}

          {/* LEVEL SELECTION - Category Selection */}
          {(stage === 'level_selection' || stage === 'category_selection') && (
            <group position={[0,0,-5]}>
                <CategoryNode 
                  position={POS.theory} color="#8b5cf6" label="Teoría" icon={GraduationCap}
                  isHovered={hoveredPortal === 'theory'} setHovered={(s) => setHoveredPortal(s ? 'theory' : null)}
                  onClick={() => { setCategory('modules'); setStage('category_selection'); }}
                />
                <CategoryNode 
                  position={POS.gym} color="#ec4899" label="Gimnasio" icon={Gamepad2}
                  isHovered={hoveredPortal === 'gym'} setHovered={(s) => setHoveredPortal(s ? 'gym' : null)}
                  onClick={() => { setCategory('gym'); setStage('category_selection'); }}
                />
                <CategoryNode 
                  position={POS.stories} color="#3b82f6" label="Historias" icon={MessageCircle}
                  isHovered={hoveredPortal === 'stories'} setHovered={(s) => setHoveredPortal(s ? 'stories' : null)}
                  onClick={() => { setCategory('stories'); setStage('category_selection'); }}
                />
            </group>
          )}

          {/* CATEGORY SELECTION - Display Items */}
          {stage === 'category_selection' && category && (
             <SceneOptions level={level} category={category} setStage={setStage} activeItem={activeItem} setActiveItem={setActiveItem} />
          )}

        </>
      );
    }
