#!/bin/bash
# Remove absolute close button from AdminLogin since AdminPanel has one
sed -i '/<button/,/<\/button>/d' src/components/AdminLogin.tsx
