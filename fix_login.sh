#!/bin/bash
sed -i 's/max-w-lg/max-w-md/g' src/components/AdminLogin.tsx
sed -i 's/px-4 py-4 text-white text-base/px-5 py-4 text-white text-lg/g' src/components/AdminLogin.tsx
sed -i 's/p-6 sm:p-8/p-8 sm:p-10/g' src/components/AdminLogin.tsx
