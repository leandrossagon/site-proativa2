#!/bin/bash
sed -i 's/<div className="flex-1 flex items-center justify-center p-6 bg-slate-950\/20">/<div className="flex-1 p-6 sm:p-8 bg-slate-950\/40 flex flex-col items-center justify-center">/g' src/components/AdminLogin.tsx

sed -i 's/<div className="bg-slate-900 border border-white\/10 rounded-xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">/<div className="w-full max-w-sm animate-in fade-in zoom-in duration-200">/g' src/components/AdminLogin.tsx

sed -i 's/<div className="p-6">/<div>/g' src/components/AdminLogin.tsx
