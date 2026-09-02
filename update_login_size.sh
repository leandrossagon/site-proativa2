#!/bin/bash
# Aumentando largura container
sed -i 's/max-w-md/max-w-lg/g' src/components/AdminLogin.tsx
# Aumentando padding interno
sed -i 's/p-6 sm:p-8/p-8 sm:p-12/g' src/components/AdminLogin.tsx
# Aumentando inputs
sed -i 's/px-4 py-4 text-base/px-6 py-5 text-lg/g' src/components/AdminLogin.tsx
# Aumentando labels
sed -i 's/text-sm font-bold text-slate-400/text-sm font-bold text-slate-400/g' src/components/AdminLogin.tsx
# Aumentando botoes
sed -i 's/py-4 rounded-xl flex/py-5 text-base rounded-xl flex/g' src/components/AdminLogin.tsx
