#!/bin/bash
sed -i '/export interface AdminUser {/a \  email?: string;\n  requirePasswordChange?: boolean;' src/types.ts
