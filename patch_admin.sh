#!/bin/bash
sed -i 's/className="glass-panel-elevated w-full max-w-5xl rounded-2xl shadow-2xl border border-white\/15 overflow-hidden flex flex-col max-h-\[90vh\] text-white"/className={`glass-panel-elevated w-full ${!isAuthenticated ? '\''max-w-md'\'' : '\''max-w-5xl'\''} rounded-2xl shadow-2xl border border-white\/15 overflow-hidden flex flex-col max-h-[90vh] text-white transition-all duration-300`}/g' src/components/AdminPanel.tsx

sed -i 's/className="bg-\[#081020\] text-white px-6 py-4 flex items-center justify-between border-b border-white\/10"/className={`bg-[#081020] text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center ${!isAuthenticated ? '\''justify-center text-center'\'' : '\''justify-between'\''} border-b border-white\/10 relative`}/g' src/components/AdminPanel.tsx

sed -i 's/className="flex items-center gap-3"/className={`flex items-center ${!isAuthenticated ? '\''flex-col gap-2'\'' : '\''gap-3'\''}`}/g' src/components/AdminPanel.tsx

sed -i 's/className="flex items-center gap-4"/className={`flex items-center gap-4 ${!isAuthenticated ? '\''absolute right-2 top-2'\'' : '\'\''}`}/g' src/components/AdminPanel.tsx

