<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exploradores de IA - Museo 3D</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Import Maps para módulos de React, Three y Drei -->
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "lucide-react": "https://esm.sh/lucide-react@0.292.0",
        "three": "https://esm.sh/three@0.160.0",
        "@react-three/fiber": "https://esm.sh/@react-three/fiber@8.15.12?deps=three@0.160.0,react@18.2.0,react-dom@18.2.0",
        "@react-three/drei": "https://esm.sh/@react-three/drei@9.96.1?deps=three@0.160.0,react@18.2.0,react-dom@18.2.0,@react-three/fiber@8.15.12"
      }
    }
  </script>
  <!-- Babel para compilar JSX en el navegador -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #0f172a; }
    #root { width: 100%; height: 100%; }
  </style>
</head>

<body class="text-slate-800">
  <div id="root"></div>
  <script type="text/babel" data-type="module">
    import React, { useState, useEffect, useRef, Suspense } from 'react';
    import { createRoot } from 'react-dom/client';
    import { Canvas, useFrame, useThree } from '@react-three/fiber';
    import { Text, Html, Environment, ContactShadows, Float, useCursor, Stars, CameraControls } from '@react-three/drei';
    import * as THREE from 'three';
    import {
      BrainCircuit, Sparkles, ShieldAlert, HeartHandshake, User,
      Users, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle,
      Image as ImageIcon, MessageSquare, Search, Lock, Smartphone,
      BookOpen, Lightbulb, Gamepad2, XCircle, CheckCircle, GraduationCap, Smile,
      MessageCircle, PlayCircle, Info, ArrowLeft, X
    } from 'lucide-react';
