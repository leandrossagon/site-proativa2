import re
with open('src/types.ts', 'r') as f:
    content = f.read()

replacement = """export interface LeadItem {
  id: string;
  perfil?: 'b2b' | 'b2c';
  nome: string;
  empresa?: string;
  whatsapp: string;
  email?: string;
  setor: SectorId | string;
  detalhes: string;
  porteProjeto?: 'pequeno' | 'medio' | 'grande' | 'corporativo' | string;
  tipoImovel?: string;
  necessidadeB2C?: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
  estimatedBudget?: string;
}"""

content = re.sub(r'export interface LeadItem \{.*?estimatedBudget\?: string;\n\}', replacement, content, flags=re.DOTALL)

with open('src/types.ts', 'w') as f:
    f.write(content)
